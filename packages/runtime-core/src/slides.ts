import fsp from 'node:fs/promises';
import type { IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import { RpcError, type FileTarget, type SlideAnnotation, type SlidesOpenResult } from '@baocut/protocol';
import { RcRuntime, RcSlides } from '@baocut/protocol/messages/runtime-core';
import type { Logger, ResolvedSlideAnnotation } from '@baocut/harness';
import {
  compilerAvailable,
  DeckStore,
  loadSlidesCompiler,
  readDeckSummary,
  resolveSlidesEditorDist,
  SlidesServer,
  type SlidesRuntime,
} from '@baocut/slides';
import { isIgnoredName } from './space-catalog.ts';

/**
 * 会话里的幻灯片（docs/design/slides §6）：`slides.open` 发编辑器地址，`/slides/<grant>/…` 与 `/_blob/<id>` 由
 * `@baocut/slides` 的 SlidesServer 处理。网关与 Web 服务共用一个 SlidesServer：同一份 deck 只有一个存储（发布串行）。
 */

/** 处理函数用的入口：地址的基址各不相同（网关是 `http://127.0.0.1:<端口>`，Web 服务是同源的相对地址）。 */
export interface SlidesOpener {
  /** 打开来源目录 `root` 里的 deck 目录 `rel`。 */
  open(root: string, rel: string): Promise<SlidesOpenResult>;
}

function isInside(rootReal: string, target: string): boolean {
  if (target === rootReal) return true;
  const prefix = rootReal.endsWith(path.sep) ? rootReal : rootReal + path.sep;
  return target.startsWith(prefix);
}

/** 来源目录里的 deck 目录：防越界（按真实路径）、不进隐藏与依赖目录、必须是有合法 deck.json 的目录。返回真实路径。 */
export async function resolveDeckDir(root: string, rel: string): Promise<string> {
  if (rel.includes('\0')) throw new RpcError('invalid-request', RcRuntime.folderPathInvalid());
  if (path.isAbsolute(rel)) throw new RpcError('invalid-request', RcRuntime.folderPathMustBeRelative());
  const relNative = path.relative(root, path.resolve(root, rel));
  if (relNative === '..' || relNative.startsWith(`..${path.sep}`) || path.isAbsolute(relNative)) {
    throw new RpcError('invalid-request', RcRuntime.folderOutsideProject());
  }
  if (relNative.split(path.sep).filter(Boolean).some(isIgnoredName)) throw new RpcError('invalid-request', RcRuntime.folderNotBrowsable());
  let rootReal: string;
  let real: string;
  try {
    rootReal = await fsp.realpath(root);
    real = await fsp.realpath(path.join(root, relNative));
  } catch {
    throw new RpcError('not-found', RcRuntime.folderNotFound());
  }
  if (!isInside(rootReal, real)) throw new RpcError('invalid-request', RcRuntime.folderOutsideProject());
  const stat = await fsp.stat(real).catch(() => null);
  if (!stat) throw new RpcError('not-found', RcRuntime.folderNotFound());
  if (!stat.isDirectory()) throw new RpcError('invalid-request', RcRuntime.notAFolder());
  return real;
}

/**
 * 消息带的幻灯片标注（docs/design/slides §9）：每条的 deck 换成相对会话工作目录的路径（`/` 分隔、以 `/` 结尾），
 * 交给 Harness 拼给智能体。不在工作目录里（例如另一个项目的 Space 条目）时用绝对路径。
 * deck 的位置找不到（Space 条目、项目已不在）时由 `locate` 抛 `not-found`。没有标注时为 undefined。
 */
export function resolveSlideAnnotations(
  annotations: readonly SlideAnnotation[] | undefined,
  cwd: string,
  locate: (target: FileTarget) => { root: string; file: string },
): ResolvedSlideAnnotation[] | undefined {
  if (!annotations?.length) return undefined;
  return annotations.map((annotation) => {
    const { root, file } = locate(annotation.deck);
    const dir = path.resolve(root, file);
    const rel = path.relative(cwd, dir);
    const outside = rel === '..' || rel.startsWith(`..${path.sep}`) || path.isAbsolute(rel);
    const deckPath = outside ? dir : rel.split(path.sep).filter(Boolean).join('/');
    return { annotation, deckPath: deckPath ? `${deckPath.replace(/[\\/]+$/, '')}/` : './' };
  });
}

export class SlidesService {
  readonly server: SlidesServer;
  readonly #editorDist: () => string | null;
  #baseUrl = '';

  constructor(options: { log: Logger; editorDist?: () => string | null }) {
    const log = options.log.child('slides');
    this.#editorDist = options.editorDist ?? (() => resolveSlidesEditorDist());
    this.server = new SlidesServer({
      editorDist: this.#editorDist,
      onError: (message, error) => log.warn(message, { error: (error as Error)?.name }),
    });
  }

  /** 网关的 HTTP 基址（监听之后才知道端口）。 */
  setBaseUrl(url: string): void {
    this.#baseUrl = url;
  }

  /** 网关上的路由：桌面界面与 CLI 一侧，能编辑；grant 本身就是凭证（同 `/media/`），桌面界面是 file:// 页面，不限制嵌入。 */
  handle(request: IncomingMessage, response: ServerResponse): boolean {
    return this.server.handle(request, response, { canEdit: true });
  }

  /** 给处理函数用的入口。`baseUrl` 不给时用网关的基址。 */
  opener(baseUrl: () => string = () => this.#baseUrl): SlidesOpener {
    return {
      open: async (root, rel) => {
        const dir = await resolveDeckDir(root, rel);
        const deck = await readDeckSummary(dir);
        if (!deck) throw new RpcError('invalid-request', RcSlides.notADeck(), { code: 'SLIDES_NOT_A_DECK' });
        const grant = await this.server.open(dir);
        return { url: `${baseUrl()}/slides/${grant}/`, deck, editorAvailable: this.#editorDist() !== null };
      },
    };
  }

  /** `slides_check` 用的编译器（编辑器构建里的 node/compiler.cjs）；没有构建时 null。 */
  compiler(): SlidesRuntime | null {
    const dist = this.#editorDist();
    return compilerAvailable(dist) ? loadSlidesCompiler(dist) : null;
  }

  /** deck 目录（真实路径）的存储：编辑器开着这份 deck 时用它那一个，素材登记与发布串行；否则新建一个。 */
  store(dir: string): DeckStore {
    return this.server.storeOf(dir) ?? new DeckStore(dir);
  }

  close(): void {
    this.server.close();
  }
}
