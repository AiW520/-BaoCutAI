import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { RECORDING_MAX_BYTES, recordingData, writeRecording } from './recording-file.ts';

function wav(bytes = 64): Uint8Array {
  const data = new Uint8Array(44 + bytes);
  data.set(Buffer.from('RIFF\0\0\0\0WAVEfmt ', 'latin1'));
  return data;
}

describe('克隆新音色的录音文件', () => {
  let dir: string;
  beforeEach(async () => {
    dir = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-recording-test-'));
  });
  afterEach(async () => {
    await fs.rm(dir, { recursive: true, force: true });
  });

  it('只收 WAV 字节，有上限', () => {
    expect(() => recordingData('RIFF')).toThrow(/missing/);
    expect(() => recordingData(new Uint8Array(100))).toThrow(/not a WAV/);
    expect(() => recordingData(new Uint8Array(RECORDING_MAX_BYTES + 1))).toThrow(/too large/);
    expect(recordingData(wav())).toBeInstanceOf(Uint8Array);
  });

  it('写进临时目录，名字由主进程起；顺手删掉一天前的', async () => {
    const old = path.join(dir, 'old.wav');
    await fs.writeFile(old, wav());
    const day = 24 * 60 * 60 * 1000;
    const stat = await fs.stat(old);
    const file = await writeRecording(wav(8), dir, stat.mtimeMs + day + 1000);
    expect(path.dirname(file)).toBe(dir);
    expect(file).toMatch(/[0-9a-f-]{36}\.wav$/);
    expect((await fs.readFile(file)).byteLength).toBe(52);
    await expect(fs.stat(old)).rejects.toThrow();
  });
});
