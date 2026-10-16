import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AUDIO_CPP_CLI_ENV } from '@baocut/models';
import { BIN_DIR_ENV, executableName } from '@baocut/process-host';
import { resolveAudioCppCli } from './model-jobs.ts';

/** 内置 audio.cpp 引擎的位置（架构设计 §6.3）：开发者覆盖只用它；否则只找随应用分发的目录，不找 PATH、不下载。 */
describe('resolveAudioCppCli', () => {
  let dir: string;
  beforeEach(async () => {
    dir = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-audiocpp-'));
  });
  afterEach(async () => {
    await fs.rm(dir, { recursive: true, force: true });
  });

  it('BAOCUT_AUDIOCPP_CLI 给了就只用它：文件在时是它，不在时 null（不退回内置的）', async () => {
    const own = path.join(dir, 'own', 'audiocpp_cli');
    const bin = path.join(dir, 'bin');
    await fs.mkdir(path.join(bin, 'audiocpp'), { recursive: true });
    await fs.writeFile(path.join(bin, 'audiocpp', executableName('audiocpp_cli')), '');
    expect(resolveAudioCppCli({ [AUDIO_CPP_CLI_ENV]: own, [BIN_DIR_ENV]: bin })).toBeNull();
    await fs.mkdir(path.dirname(own), { recursive: true });
    await fs.writeFile(own, '');
    expect(resolveAudioCppCli({ [AUDIO_CPP_CLI_ENV]: own, [BIN_DIR_ENV]: bin })).toBe(own);
  });

  it('随应用分发的目录：`<bin>/audiocpp/audiocpp_cli`；没有时 null，不找 PATH', async () => {
    const bin = path.join(dir, 'bin');
    const onPath = path.join(dir, 'path');
    await fs.mkdir(onPath, { recursive: true });
    await fs.writeFile(path.join(onPath, executableName('audiocpp_cli')), '', { mode: 0o755 });
    expect(resolveAudioCppCli({ [BIN_DIR_ENV]: bin, PATH: onPath })).toBeNull();
    const cli = path.join(bin, 'audiocpp', executableName('audiocpp_cli'));
    await fs.mkdir(path.dirname(cli), { recursive: true });
    await fs.writeFile(cli, '');
    expect(resolveAudioCppCli({ [BIN_DIR_ENV]: bin, PATH: onPath })).toBe(cli);
  });
});
