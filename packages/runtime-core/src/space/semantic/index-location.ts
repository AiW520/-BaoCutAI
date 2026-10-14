import fs from 'node:fs/promises';
import path from 'node:path';
import { dirAccess, diskFreeBytes, nestedDirs, sameVolume } from '@baocut/models';
import { RpcError, type SemanticIndexDirMode } from '@baocut/protocol';
import { RcModels, RcSpace } from '@baocut/protocol/messages/runtime-core';

/**
 * 语义索引换位置（`space.indexSetDir`，检索规格 §8.1）：查目标文件夹、量库多大、搬文件。库在 `<文件夹>/v1/`，库关着的时候才搬
 * （SQLite 的 `-wal` / `-shm` 一起走）。关键帧缓存在应用缓存里，不搬。
 */

/** 文件夹里放库的那一层。 */
export const INDEX_LEAF = 'v1';

/** 移过去时目标盘至少要空出库大小的这么多倍（SQLite 打开、写日志要一点余量）。 */
const MOVE_HEADROOM = 1.1;

/** 一个目录下所有文件的字节数；不在时 0。 */
export async function dirBytes(dir: string): Promise<number> {
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => null);
  if (!entries) return 0;
  let total = 0;
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) total += await dirBytes(full);
    else if (entry.isFile()) total += (await fs.stat(full).catch(() => null))?.size ?? 0;
  }
  return total;
}

async function nonEmpty(dir: string): Promise<boolean> {
  const entries = await fs.readdir(dir).catch(() => null);
  return !!entries && entries.length > 0;
}

/**
 * 能不能换到 `to`：不能互相包含、要在、要能写；移过去时那里不能已经有库，跨盘时要放得下。缺省位置不在时先建出来。
 * 返回要搬的字节数与是不是同一个盘（同盘改名，跨盘复制）。
 */
export async function checkIndexTarget(
  from: string,
  to: string,
  mode: SemanticIndexDirMode,
  options: {
    isDefault: boolean;
    freeBytes?: (dir: string) => Promise<number | null>;
    sameDisk?: (a: string, b: string) => Promise<boolean>;
  },
): Promise<{ bytes: number; sameDisk: boolean }> {
  if (nestedDirs(from, to) === 'nested') {
    throw new RpcError('conflict', RcSpace.indexDirNested(), { code: 'SEMANTIC_INDEX_DIR_NESTED', path: to });
  }
  if (options.isDefault) await fs.mkdir(to, { recursive: true }).catch(() => {});
  const access = await dirAccess(to);
  if (!access.exists) throw new RpcError('conflict', RcModels.folderMissing(), { code: 'SEMANTIC_INDEX_DIR_MISSING', path: to });
  if (!access.writable) throw new RpcError('conflict', RcModels.folderNotWritable(), { code: 'SEMANTIC_INDEX_DIR_NOT_WRITABLE', path: to });
  const bytes = mode === 'move' ? await dirBytes(path.join(from, INDEX_LEAF)) : 0;
  if (mode !== 'move') return { bytes, sameDisk: false };
  if (await nonEmpty(path.join(to, INDEX_LEAF))) {
    throw new RpcError('conflict', RcSpace.indexDirOccupied(), { code: 'SEMANTIC_INDEX_DIR_OCCUPIED', path: to });
  }
  const sameDisk = await (options.sameDisk ?? sameVolume)(from, to);
  if (!sameDisk && bytes > 0) {
    const free = await (options.freeBytes ?? diskFreeBytes)(to);
    if (free !== null && free < bytes * MOVE_HEADROOM) {
      throw new RpcError('conflict', RcSpace.indexDirNoSpace(), {
        code: 'SEMANTIC_INDEX_DIR_NO_SPACE',
        requiredBytes: Math.ceil(bytes * MOVE_HEADROOM),
        availableBytes: free,
      });
    }
  }
  return { bytes, sameDisk };
}

/** 逐个文件复制一个目录，每复制完一个报一次累计的字节数。 */
export async function copyDir(from: string, to: string, onBytes: (n: number) => void): Promise<void> {
  await fs.mkdir(to, { recursive: true });
  for (const entry of await fs.readdir(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) await copyDir(src, dst, onBytes);
    else if (entry.isFile()) {
      await fs.copyFile(src, dst);
      onBytes((await fs.stat(dst)).size);
    }
  }
}
