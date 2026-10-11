/**
 * 幻灯片编辑器的 HTTP 路由（docs/design/slides §6.2）。Runtime 网关与 Web 服务各挂一份，共用同一个 SlidesServer，
 * 所以同一份 deck 只有一个 DeckStore（发布串行）与一个目录监听。
 *
 *   /slides/<grant>/                       编辑器页面（apps/slides-editor 的构建产物，不含 node/）
 *   /slides/<grant>/_files.json            清单
 *   /slides/<grant>/project/<路径>          deck 文件
 *   /slides/<grant>/__deck/publish         POST 发布
 *   /slides/<grant>/__deck/assets          POST 上传素材
 *   /slides/<grant>/__deck/events          SSE：外部改动
 *   /slides/<grant>/__deck/session         这次打开能不能编辑
 *   /slides/<grant>/_blob/<id>、/_blob/<id> 素材；根级的在所有已打开的 deck 里找（id 是内容哈希）
 *
 * grant 是不可猜的凭证，只在内存里；Runtime 重启后由界面重新打开。
 */
import { createHash, randomBytes } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { lstat, readFile, realpath, stat } from 'node:fs/promises';
import type { IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import { contentTypeOf, DeckStore, watchExternalEdits } from './deck-store.ts';
import { DECK_ROUTES, type DeckChangeEvent, type GenericPublishError, type WireEntry } from './file-protocol.ts';

/** 这次请求的权限与响应头（网关与 Web 服务不同）。 */
export interface DeckRouteOptions {
  /** 能不能发布与上传；Web 服务只读模式下为 false。 */
  canEdit: boolean;
  /** CSP 的 frame-ancestors 来源列表；不给时不限制（网关：grant 本身就是凭证，桌面界面是 file:// 页面）。 */
  frameAncestors?: string;
}

export interface SlidesServerOptions {
  /** 编辑器构建产物目录；返回 null 时页面给不可用的说明。每次请求都问，构建后不用重启。 */
  editorDist: () => string | null;
  onError?: (message: string, error: unknown) => void;
  /** 同时打开的 deck 上限，超过时丢掉最早打开、没有编辑器连着的。 */
  maxDecks?: number;
}

interface OpenDeck {
  grant: string;
  dir: string;
  store: DeckStore;
  clients: Set<ServerResponse>;
  stopWatch: (() => void) | null;
}

/** 发布请求体上限：base64 后的整批文件。 */
const MAX_PUBLISH_BYTES = 64 * 1024 * 1024;
/** 素材上限（视频也走这里）。 */
const MAX_ASSET_BYTES = 256 * 1024 * 1024;
const SSE_KEEPALIVE_MS = 25_000;
const GRANT_PATTERN = /^[A-Za-z0-9_-]{16,64}$/;
const BLOB_PATH = /^_blob\/([0-9a-f]{32})$/;

/** 素材与 deck 文件按「数据」给：不当页面执行（例如 SVG 被直接打开）。 */
const DATA_CSP = "sandbox; default-src 'none'; style-src 'unsafe-inline'; img-src data:";

/** 编辑器页面的 CSP：运行时要执行脚本、加载 Google Fonts、显示素材与 data:/blob: 图片、用 blob: Worker 转码视频。 */
export function editorCsp(inlineScriptHashes: readonly string[], frameAncestors?: string): string {
  const fonts = 'https://fonts.googleapis.com https://fonts.gstatic.com';
  return [
    "default-src 'self'",
    `script-src 'self' ${inlineScriptHashes.map(h => `'${h}'`).join(' ')}`.trim(),
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "media-src 'self' blob:",
    "worker-src 'self' blob:",
    `connect-src 'self' ${fonts}`,
    "frame-src 'self' blob: data:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    ...(frameAncestors ? [`frame-ancestors ${frameAncestors}`] : []),
  ].join('; ');
}

/** index.html 里内联 `<script>` 的 sha256（CSP 用）。 */
export function inlineScriptHashes(html: string): string[] {
  const hashes: string[] = [];
  for (const match of html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi)) {
    if (/\ssrc\s*=/i.test(match[1] ?? '')) continue;
    hashes.push('sha256-' + createHash('sha256').update(match[2]!, 'utf8').digest('base64'));
  }
  return hashes;
}

const STATIC_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.wasm': 'application/wasm',
  '.map': 'application/json; charset=utf-8',
};

function sendJson(response: ServerResponse, status: number, body: unknown, headers: Record<string, string> = {}): void {
  const text = JSON.stringify(body);
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(text),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    ...headers,
  });
  response.end(text);
}

function publishError(response: ServerResponse, status: number, code: GenericPublishError['code'], message: string): void {
  sendJson(response, status, { code, message } satisfies GenericPublishError);
}

class TooLarge extends Error {}

function readBody(request: IncomingMessage, limit: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const declared = Number(request.headers['content-length']);
    if (Number.isFinite(declared) && declared > limit) {
      reject(new TooLarge());
      request.resume();
      return;
    }
    const chunks: Buffer[] = [];
    let size = 0;
    request.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > limit) {
        reject(new TooLarge());
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on('end', () => resolve(Buffer.concat(chunks)));
    request.on('error', reject);
  });
}

/** POST 只接受同源（编辑器页面自己的 fetch）或不带 Origin 的请求：别的网页即使知道 grant 也写不进来。 */
function sameOrigin(request: IncomingMessage): boolean {
  const origin = request.headers.origin;
  if (origin === undefined) return true;
  const host = request.headers.host;
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function isWireEntry(value: unknown): value is WireEntry {
  if (value === null) return true;
  if (typeof value !== 'object' || Array.isArray(value)) return false;
  const entry = value as Record<string, unknown>;
  if (entry.ifMatch !== undefined && typeof entry.ifMatch !== 'string') return false;
  if (entry.delete === true) return true;
  return typeof entry.base64 === 'string' && typeof entry.contentType === 'string';
}

export class SlidesServer {
  readonly #editorDist: () => string | null;
  readonly #onError: (message: string, error: unknown) => void;
  readonly #maxDecks: number;
  readonly #byGrant = new Map<string, OpenDeck>();
  readonly #byDir = new Map<string, OpenDeck>();
  #indexCache: { file: string; mtimeMs: number; html: string; hashes: string[] } | null = null;

  constructor(options: SlidesServerOptions) {
    this.#editorDist = options.editorDist;
    this.#onError = options.onError ?? (() => {});
    this.#maxDecks = options.maxDecks ?? 64;
  }

  /** 编辑器构建产物在不在（不在时界面显示不可用的说明）。 */
  editorAvailable(): boolean {
    return this.#editorDist() !== null;
  }

  /** 为 deck 目录发 grant；同一个目录（真实路径）复用同一个。返回 grant。调用方先校验目录是 deck。 */
  async open(deckDir: string): Promise<string> {
    const dir = await realpath(deckDir);
    const existing = this.#byDir.get(dir);
    if (existing) return existing.grant;
    this.#prune();
    const deck: OpenDeck = { grant: randomBytes(24).toString('base64url'), dir, store: new DeckStore(dir), clients: new Set(), stopWatch: null };
    this.#byGrant.set(deck.grant, deck);
    this.#byDir.set(dir, deck);
    return deck.grant;
  }

  /** 已打开的 deck 的存储（slides_check 等也用同一个，免得与编辑器的发布交错）。 */
  storeOf(deckDir: string): DeckStore | null {
    for (const deck of this.#byDir.values()) if (deck.dir === deckDir || deck.store.root === deckDir) return deck.store;
    return null;
  }

  /** 关掉所有事件流与目录监听。 */
  close(): void {
    for (const deck of this.#byGrant.values()) this.#release(deck);
    this.#byGrant.clear();
    this.#byDir.clear();
  }

  /** 处理 `/slides/…` 与 `/_blob/…`；不是这两个前缀返回 false。 */
  handle(request: IncomingMessage, response: ServerResponse, options: DeckRouteOptions): boolean {
    const url = new URL(request.url ?? '/', 'http://localhost');
    const pathname = url.pathname;
    const root = BLOB_PATH.exec(pathname.slice(1));
    if (root) {
      void this.#guard(response, () => this.#serveBlob(request, response, root[1]!, null));
      return true;
    }
    const match = /^\/slides\/([^/]+)(\/.*)?$/.exec(pathname);
    if (!match) return false;
    const deck = GRANT_PATTERN.test(match[1]!) ? this.#byGrant.get(match[1]!) : undefined;
    if (!deck) {
      response.writeHead(404, { 'Cache-Control': 'no-store' }).end();
      return true;
    }
    if (match[2] === undefined) {
      // 运行时用相对地址取 `_files.json`、`project/…`：页面地址必须以 / 结尾
      response.writeHead(308, { Location: `/slides/${deck.grant}/${url.search}`, 'Cache-Control': 'no-store' }).end();
      return true;
    }
    let rest: string;
    try {
      rest = decodeURIComponent(match[2].slice(1));
    } catch {
      response.writeHead(400).end();
      return true;
    }
    void this.#guard(response, () => this.#route(deck, rest, request, response, options));
    return true;
  }

  async #guard(response: ServerResponse, work: () => Promise<void>): Promise<void> {
    try {
      await work();
    } catch (error) {
      if (error instanceof TooLarge) {
        if (!response.headersSent) publishError(response, 413, 'too_large', 'request body is too large');
        return;
      }
      this.#onError('Slides request failed', error);
      if (!response.headersSent) publishError(response, 500, 'upstream_error', 'internal error');
      else response.destroy();
    }
  }

  async #route(deck: OpenDeck, rest: string, request: IncomingMessage, response: ServerResponse, options: DeckRouteOptions): Promise<void> {
    const method = request.method ?? 'GET';
    if (rest === DECK_ROUTES.publish || rest === DECK_ROUTES.assets) {
      if (method !== 'POST') {
        response.writeHead(405, { Allow: 'POST' }).end();
        return;
      }
      if (!sameOrigin(request)) {
        request.resume();
        publishError(response, 403, 'not_writer', 'cross-origin request');
        return;
      }
      if (!options.canEdit) {
        request.resume();
        publishError(response, 403, 'not_writer', 'this session is read-only');
        return;
      }
      if (rest === DECK_ROUTES.publish) await this.#publish(deck, request, response);
      else await this.#upload(deck, request, response);
      return;
    }
    if (method !== 'GET' && method !== 'HEAD') {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    if (rest === DECK_ROUTES.listing) {
      sendJson(response, 200, await deck.store.listing());
      return;
    }
    if (rest === DECK_ROUTES.session) {
      sendJson(response, 200, { canEdit: options.canEdit });
      return;
    }
    if (rest === DECK_ROUTES.events) {
      this.#events(deck, request, response);
      return;
    }
    if (rest.startsWith('project/')) {
      const bytes = await deck.store.readProjectFile(rest);
      if (bytes === null) {
        response.writeHead(404, { 'Cache-Control': 'no-store' }).end();
        return;
      }
      response.writeHead(200, {
        'Content-Type': contentTypeOf(rest),
        'Content-Length': bytes.byteLength,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': DATA_CSP,
      });
      response.end(method === 'HEAD' ? undefined : bytes);
      return;
    }
    const blob = BLOB_PATH.exec(rest);
    if (blob) {
      await this.#serveBlob(request, response, blob[1]!, deck);
      return;
    }
    await this.#serveEditor(rest, request, response, options);
  }

  async #publish(deck: OpenDeck, request: IncomingMessage, response: ServerResponse): Promise<void> {
    if (!/^application\/json\b/i.test(request.headers['content-type'] ?? '')) {
      publishError(response, 415, 'invalid_content', 'expected application/json');
      return;
    }
    const raw = await readBody(request, MAX_PUBLISH_BYTES);
    let files: Record<string, WireEntry>;
    try {
      const body = JSON.parse(raw.toString('utf8')) as { files?: unknown };
      if (typeof body?.files !== 'object' || body.files === null || Array.isArray(body.files)) throw new Error('files');
      if (!Object.values(body.files).every(isWireEntry)) throw new Error('entry');
      files = body.files as Record<string, WireEntry>;
    } catch {
      publishError(response, 400, 'invalid_content', 'malformed publish request');
      return;
    }
    const outcome = await deck.store.publish(files);
    sendJson(response, outcome.status, outcome.body);
  }

  async #upload(deck: OpenDeck, request: IncomingMessage, response: ServerResponse): Promise<void> {
    const bytes = await readBody(request, MAX_ASSET_BYTES);
    if (bytes.length === 0) {
      publishError(response, 400, 'invalid_content', 'empty upload');
      return;
    }
    sendJson(response, 200, await deck.store.putBlob(bytes, request.headers['content-type'] ?? 'application/octet-stream'));
  }

  #events(deck: OpenDeck, request: IncomingMessage, response: ServerResponse): void {
    response.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-store',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    });
    response.write(': connected\n\n');
    deck.clients.add(response);
    deck.stopWatch ??= watchExternalEdits(
      deck.store,
      event => this.#broadcast(deck, event),
      error => this.#onError('Watching a deck failed', error),
    );
    const keepAlive = setInterval(() => response.write(': ping\n\n'), SSE_KEEPALIVE_MS);
    keepAlive.unref?.();
    const done = () => {
      clearInterval(keepAlive);
      deck.clients.delete(response);
      if (deck.clients.size === 0) {
        deck.stopWatch?.();
        deck.stopWatch = null;
      }
    };
    request.on('close', done);
    response.on('close', done);
  }

  #broadcast(deck: OpenDeck, event: DeckChangeEvent): void {
    const frame = `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`;
    for (const client of deck.clients) client.write(frame);
  }

  async #serveBlob(request: IncomingMessage, response: ServerResponse, id: string, deck: OpenDeck | null): Promise<void> {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    const decks = deck ? [deck] : [...this.#byGrant.values()];
    for (const candidate of decks) {
      const found = await candidate.store.blobFile(id);
      if (found === null) continue;
      const info = await stat(found.file).catch(() => null);
      if (!info?.isFile()) continue;
      response.writeHead(200, {
        'Content-Type': found.contentType,
        'Content-Length': info.size,
        // 内容寻址：同一个 id 的内容不会变
        'Cache-Control': 'private, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': DATA_CSP,
      });
      if (request.method === 'HEAD') {
        response.end();
        return;
      }
      const stream = createReadStream(found.file);
      stream.on('error', () => response.destroy());
      response.on('close', () => stream.destroy());
      stream.pipe(response);
      return;
    }
    response.writeHead(404, { 'Cache-Control': 'no-store' }).end();
  }

  async #serveEditor(rest: string, request: IncomingMessage, response: ServerResponse, options: DeckRouteOptions): Promise<void> {
    const dist = this.#editorDist();
    const parts = rest === '' ? ['index.html'] : rest.split('/');
    // 构建目录里的 node/ 是给 Runtime 用的编译器，不对外
    const invalid = parts.some(p => p === '' || p === '.' || p === '..' || p.startsWith('.') || p.includes('\\')) || parts[0] === 'node';
    if (dist === null || invalid) {
      if (dist === null && parts[0] === 'index.html') {
        response.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }).end('Slides editor is not built');
        return;
      }
      response.writeHead(404, { 'Cache-Control': 'no-store' }).end();
      return;
    }
    const realDist = await realpath(dist).catch(() => null);
    const file = realDist === null ? null : path.join(realDist, ...parts);
    const real = file === null ? null : await realpath(file).catch(() => null);
    const info = real === null ? null : await lstat(real).catch(() => null);
    if (file === null || real !== file || !info?.isFile()) {
      response.writeHead(404, { 'Cache-Control': 'no-store' }).end();
      return;
    }
    const type = STATIC_TYPES[path.extname(file).toLowerCase()] ?? 'application/octet-stream';
    if (parts.length === 1 && parts[0] === 'index.html') {
      const page = await this.#indexHtml(file, info.mtimeMs);
      const body = Buffer.from(page.html);
      response.writeHead(200, {
        'Content-Type': type,
        'Content-Length': body.length,
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'no-referrer',
        'Content-Security-Policy': editorCsp(page.hashes, options.frameAncestors),
      });
      response.end(request.method === 'HEAD' ? undefined : body);
      return;
    }
    response.writeHead(200, {
      'Content-Type': type,
      'Content-Length': info.size,
      // vite 产物的文件名带内容哈希
      'Cache-Control': parts[0] === 'assets' ? 'private, max-age=31536000, immutable' : 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    });
    if (request.method === 'HEAD') {
      response.end();
      return;
    }
    const stream = createReadStream(file);
    stream.on('error', () => response.destroy());
    response.on('close', () => stream.destroy());
    stream.pipe(response);
  }

  async #indexHtml(file: string, mtimeMs: number): Promise<{ html: string; hashes: string[] }> {
    const cached = this.#indexCache;
    if (cached && cached.file === file && cached.mtimeMs === mtimeMs) return cached;
    const html = await readFile(file, 'utf8');
    const next = { file, mtimeMs, html, hashes: inlineScriptHashes(html) };
    this.#indexCache = next;
    return next;
  }

  #release(deck: OpenDeck): void {
    deck.stopWatch?.();
    deck.stopWatch = null;
    for (const client of deck.clients) client.end();
    deck.clients.clear();
  }

  #prune(): void {
    while (this.#byGrant.size >= this.#maxDecks) {
      const idle = [...this.#byGrant.values()].find(d => d.clients.size === 0) ?? this.#byGrant.values().next().value;
      if (!idle) return;
      this.#release(idle);
      this.#byGrant.delete(idle.grant);
      this.#byDir.delete(idle.dir);
    }
  }
}
