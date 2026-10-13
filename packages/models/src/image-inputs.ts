import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { RpcError, type FrozenImageInput, type ImageInputMediaType } from '@baocut/protocol';
import { ModelsGenerationOptions as M } from '@baocut/protocol/messages/models/generation-options.ts';
import { sha256File } from './model-catalog.ts';
import { ProviderFailure } from './transcribe-provider.ts';

/**
 * 生图的输入图（架构设计 §6.1「生图的输入图」）：提交时读出摘要、大小与格式并冻结，执行前按摘要再核对一次。格式按文件头判断，
 * 扩展名不算数；只收 PNG、JPEG、WebP。
 */

/** 一张要冻结的输入图：已经换成本机文件（Space 条目与素材在方法层或 JobManager 里换好）。 */
export interface ImageInputToFreeze {
  source: FrozenImageInput['source'];
  path: string;
  /** 给人看的名字；不给时用文件名。 */
  name?: string;
  entryId?: string;
  assetId?: string;
  revision?: string;
}

/** 文件头 → 媒体类型；不是这三种时 null。 */
export function sniffImageMediaType(head: Uint8Array): ImageInputMediaType | null {
  const at = (i: number, bytes: number[]) => bytes.every((b, k) => head[i + k] === b);
  if (at(0, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return 'image/png';
  if (at(0, [0xff, 0xd8, 0xff])) return 'image/jpeg';
  // RIFF....WEBP
  if (at(0, [0x52, 0x49, 0x46, 0x46]) && at(8, [0x57, 0x45, 0x42, 0x50])) return 'image/webp';
  return null;
}

async function readHead(file: string): Promise<Uint8Array> {
  const handle = await fs.open(file, 'r');
  try {
    const buffer = Buffer.alloc(16);
    const { bytesRead } = await handle.read(buffer, 0, 16, 0);
    return buffer.subarray(0, bytesRead);
  } finally {
    await handle.close();
  }
}

/**
 * 读出一张输入图的摘要、大小与格式。读不出（不存在、不是文件）是 `invalid-request`（`INPUT_UNREADABLE`），不是这三种格式是
 * `invalid-request`（`INPUT_FORMAT_UNSUPPORTED`）。
 */
export async function freezeImageInput(input: ImageInputToFreeze): Promise<FrozenImageInput> {
  const name = input.name?.trim() || path.basename(input.path);
  const unreadable = () => new RpcError('invalid-request', M.imageUnreadable({ name }), { code: 'INPUT_UNREADABLE', name });
  const stat = await fs.stat(input.path).catch(() => null);
  if (!stat?.isFile()) throw unreadable();
  const head = await readHead(input.path).catch(() => null);
  if (!head) throw unreadable();
  const mediaType = sniffImageMediaType(head);
  if (!mediaType) {
    throw new RpcError('invalid-request', M.imageFormatUnsupported({ name }), {
      code: 'INPUT_FORMAT_UNSUPPORTED',
      name,
      accepted: ['image/png', 'image/jpeg', 'image/webp'],
    });
  }
  const hex = await sha256File(input.path).catch(() => null);
  if (hex === null) throw unreadable();
  return {
    source: input.source,
    path: input.path,
    sha256: `sha256:${hex}`,
    byteLength: stat.size,
    mediaType,
    name,
    ...(input.entryId ? { entryId: input.entryId } : {}),
    ...(input.assetId ? { assetId: input.assetId } : {}),
    ...(input.revision ? { revision: input.revision } : {}),
  };
}

/**
 * 执行前读出冻结的输入图：读不出、摘要与提交时不同都是 `input-unreadable` 的失败（任务以 `ASSET_MISSING` 结束，`reason` 说明
 * 是哪种），不换图、不重试。
 * 返回的字节就是核对过的那一份。
 */
export async function readFrozenImage(input: FrozenImageInput): Promise<Buffer> {
  const details = { name: input.name, expected: input.sha256 };
  const bytes = await fs.readFile(input.path).catch(() => null);
  if (!bytes) throw new ProviderFailure('input-unreadable', M.imageUnreadable({ name: input.name }), { ...details, reason: 'unreadable' });
  const actual = `sha256:${crypto.createHash('sha256').update(bytes).digest('hex')}`;
  if (actual !== input.sha256) throw new ProviderFailure('input-unreadable', M.imageChanged({ name: input.name }), { ...details, reason: 'changed' });
  return bytes;
}

/** 字节数写成 MB（十进制，至多一位小数）。 */
export function megabytes(bytes: number): string {
  const mb = bytes / 1_000_000;
  return Number.isInteger(mb) ? String(mb) : mb.toFixed(1);
}
