import { spawnSync } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { editorWasmAvailable, sfxRecipes, sfxRender } from '@baocut/editor-wasm';
import { ANALYSIS_DIR, AudioTools, SFX_RECIPES } from './audio-tools.ts';
import type { ToolPrincipal, ToolScope } from './tool-scope.ts';

/** `assets_analyze` 走真的 ffmpeg 解码与编辑语义 WASM；`assets_sfx` 的配方表与 WASM 里的一致。 */

const ffmpeg = process.env.BAOCUT_FFMPEG ?? 'ffmpeg';
const ready = editorWasmAvailable() && spawnSync(ffmpeg, ['-version']).status === 0;

const agent = { kind: 'agent' } as unknown as ToolPrincipal;
let dir: string;

function tools() {
  const video = { assets: {}, rootSequenceId: 's', sequences: { s: { fps: { num: 30, den: 1 }, items: [] } } };
  const scope = {
    authorize: (principal: ToolPrincipal) => ({ principal }),
    saveRoot: () => dir,
    importBase: () => ({ cwd: dir, confine: null }),
    open: async () => ({ ref: { videoId: 'v1' }, snapshot: { video } }),
  } as unknown as ToolScope;
  return new AudioTools({ videos: { mirror: () => undefined } as never, scope, ffmpeg: () => ffmpeg });
}

beforeAll(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-audio-tools-'));
});

afterAll(async () => {
  await fs.rm(dir, { recursive: true, force: true });
});

describe.skipIf(!ready)('audio tools', () => {
  it('lists the same recipes as the DSP crate', () => {
    expect(sfxRecipes().map((r) => r.name)).toEqual([...SFX_RECIPES]);
  });

  it('analyzes a file in the working directory and writes the full result', async () => {
    // 四下 kick，每 0.5 秒一下。
    const kick = sfxRender({ recipe: 'kick', seconds: 0.5 });
    const parts = await Promise.all(
      [0, 1, 2, 3].map(async (n) => {
        const file = path.join(dir, `kick-${n}.wav`);
        await fs.writeFile(file, kick);
        return file;
      }),
    );
    const track = path.join(dir, 'kicks.wav');
    const concat = spawnSync(ffmpeg, [
      '-v',
      'error',
      ...parts.flatMap((file) => ['-i', file]),
      '-filter_complex',
      'concat=n=4:v=0:a=1',
      '-y',
      track,
    ]);
    expect(concat.status, String(concat.stderr)).toBe(0);

    const result = (await tools().dispatch('assets_analyze', { video: 'demo', path: 'kicks.wav', beats: false }, agent)) as {
      file: string;
      fps: number;
      frameCount: number;
      onsets: Array<{ t: number }>;
      beats: unknown;
    };
    expect(result.fps).toBe(30);
    expect(result.frameCount).toBe(60);
    // 第一下在 0 秒：没有之前的帧可比，不算起音；其余三下落在 ±20 ms 里。
    expect(result.onsets.map((o) => Math.round(o.t * 50) / 50)).toEqual([0.5, 1, 1.5]);
    expect(result.beats).toBeNull();
    expect(path.relative(await fs.realpath(dir), result.file)).toBe(path.join(ANALYSIS_DIR, 'v1', 'kicks.json'));
    const saved = JSON.parse(await fs.readFile(result.file, 'utf8')) as { schema: string; frames: { level: number[] } };
    expect(saved.schema).toBe('baocut.audio-analysis/1');
    expect(saved.frames.level).toHaveLength(60);
  });

  it('reports a file with no audio and needs exactly one source', async () => {
    const still = path.join(dir, 'still.png');
    expect(spawnSync(ffmpeg, ['-v', 'error', '-f', 'lavfi', '-i', 'color=c=red:s=16x16', '-frames:v', '1', '-y', still]).status).toBe(0);
    await expect(tools().dispatch('assets_analyze', { video: 'demo', path: 'still.png' }, agent)).rejects.toMatchObject({
      code: 'AUDIO_NO_STREAM',
    });
    await expect(tools().dispatch('assets_analyze', { video: 'demo' }, agent)).rejects.toMatchObject({ code: 'INVALID_ARGUMENTS' });
  });
});
