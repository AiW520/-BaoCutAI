import fs from 'node:fs/promises';
import { refOf, RpcError } from '@baocut/protocol';
import { RcExport } from '@baocut/protocol/messages/runtime-core';
import { DestinationError } from './export-publish.ts';

/** 目标盘上的暂存和 Runtime 的持久产物副本分开检查；预留 1 GiB，不把别的磁盘的空闲量算进来。 */
export const EXPORT_DISK_RESERVE = 1024 ** 3;
export type ExportStorageRole = 'temporary' | 'artifact';

export function formatExportBytes(bytes: number): string {
  return bytes >= 1024 ** 3 ? `${(bytes / 1024 ** 3).toFixed(1)} GiB` : `${Math.ceil(bytes / 1024 ** 2)} MiB`;
}

export async function checkExportSpace(
  dir: string,
  bytes: number,
  storage: ExportStorageRole = 'temporary',
  statfs: (dir: string) => Promise<{ bavail: number | bigint; bsize: number | bigint }> = fs.statfs,
): Promise<void> {
  if (bytes <= 0) return;
  let stat;
  try {
    stat = await statfs(dir);
  } catch (error) {
    throw new DestinationError('EXPORT_DESTINATION_UNWRITABLE', RcExport.destinationWriteFailed({ reason: (error as NodeJS.ErrnoException).code ?? String(error) }), dir).toRpc();
  }
  const available = Number(stat.bavail) * Number(stat.bsize);
  const required = Math.ceil(bytes) + EXPORT_DISK_RESERVE;
  if (available >= required) return;
  const params = { dir, required: formatExportBytes(required), available: formatExportBytes(available) };
  const message = storage === 'temporary' ? RcExport.temporarySpaceInsufficient(params) : RcExport.artifactSpaceInsufficient(params);
  const recovery = storage === 'temporary' ? RcExport.temporarySpaceRecovery() : RcExport.artifactSpaceRecovery();
  throw new RpcError('conflict', message, {
    code: 'EXPORT_INSUFFICIENT_SPACE', dir, required, available, storage,
    recovery: recovery.text, recoveryRef: refOf(recovery),
  });
}
