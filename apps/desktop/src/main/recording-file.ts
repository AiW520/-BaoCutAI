import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

/**
 * 我的声音 › 克隆新音色（架构设计 §5.9）：界面里录好的样本与授权声明录音是 WAV 字节，Runtime 的 `library.put` 只收路径，
 * 所以先写进系统临时目录下的 `baocut-recordings/`。文件名由这里起，不收渲染进程给的名字；Runtime 拷进用户库之后这份就没用了，
 * 每次写之前顺手删掉一天前的。
 */

/** 样本 30 秒、48 kHz、16 位单声道约 2.9 MB；留足余量，超过的不收。 */
export const RECORDING_MAX_BYTES = 16 * 1024 * 1024;
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

/** 只收 RIFF/WAVE 开头、不超过上限的 Uint8Array。 */
export function recordingData(value: unknown): Uint8Array {
  if (!(value instanceof Uint8Array)) throw new Error('the recording is missing');
  if (value.byteLength > RECORDING_MAX_BYTES) throw new Error('the recording is too large');
  const head = Buffer.from(value.buffer, value.byteOffset, Math.min(12, value.byteLength)).toString('latin1');
  if (value.byteLength <= 44 || !head.startsWith('RIFF') || head.slice(8, 12) !== 'WAVE')
    throw new Error('the recording is not a WAV file');
  return value;
}

export function recordingDir(tmp = os.tmpdir()): string {
  return path.join(tmp, 'baocut-recordings');
}

/** 写下一段录音，返回绝对路径。 */
export async function writeRecording(raw: unknown, dir = recordingDir(), now = Date.now()): Promise<string> {
  const data = recordingData(raw);
  await fs.mkdir(dir, { recursive: true });
  await pruneRecordings(dir, now);
  const file = path.join(dir, `${randomUUID()}.wav`);
  await fs.writeFile(file, data);
  return file;
}

async function pruneRecordings(dir: string, now: number): Promise<void> {
  const names = await fs.readdir(dir).catch(() => [] as string[]);
  await Promise.all(
    names
      .filter((name) => name.endsWith('.wav'))
      .map(async (name) => {
        const file = path.join(dir, name);
        const stat = await fs.stat(file).catch(() => null);
        if (stat && now - stat.mtimeMs > MAX_AGE_MS) await fs.rm(file, { force: true });
      }),
  );
}
