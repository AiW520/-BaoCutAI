import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { findCargoBinary } from './cargo-target.ts';

const roots: string[] = [];
function tmp(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cargo-target-'));
  roots.push(dir);
  return dir;
}
afterEach(() => {
  for (const dir of roots.splice(0)) fs.rmSync(dir, { recursive: true, force: true });
});

function touch(file: string): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, '');
}

describe('findCargoBinary', () => {
  it('finds the binary under the default target directory', () => {
    const root = tmp();
    touch(path.join(root, 'target/debug/tool'));
    expect(findCargoBinary(path.join(root, 'a/b'), 'tool', {})).toBe(path.join(root, 'target/debug/tool'));
  });

  it('follows build.target-dir from config.local.toml', () => {
    const root = tmp();
    const external = tmp();
    fs.mkdirSync(path.join(root, '.cargo'));
    fs.writeFileSync(path.join(root, '.cargo/config.local.toml'), `[build]\ntarget-dir = "${external}"\n`);
    touch(path.join(external, 'release/tool'));
    expect(findCargoBinary(path.join(root, 'a'), 'tool', {})).toBe(path.join(external, 'release/tool'));
  });

  it('prefers CARGO_TARGET_DIR and returns null when nothing is built', () => {
    const root = tmp();
    const env = tmp();
    touch(path.join(env, 'debug/tool'));
    expect(findCargoBinary(root, 'tool', { CARGO_TARGET_DIR: env })).toBe(path.join(env, 'debug/tool'));
    expect(findCargoBinary(root, 'nope', {})).toBeNull();
  });

  it.each(['debug', 'release'])('uses the newer %s build when both profiles exist', (profile) => {
    const root = tmp();
    const release = path.join(root, 'target/release/model-worker');
    const debug = path.join(root, 'target/debug/model-worker');
    touch(release);
    touch(debug);
    fs.utimesSync(release, 1000, profile === 'release' ? 2000 : 1000);
    fs.utimesSync(debug, 1000, profile === 'debug' ? 2000 : 1000);
    expect(findCargoBinary(root, 'model-worker', {})).toBe(profile === 'debug' ? debug : release);
  });

  it('prefers release when both builds have the same timestamp', () => {
    const root = tmp();
    const release = path.join(root, 'target/release/tool');
    const debug = path.join(root, 'target/debug/tool');
    touch(release);
    touch(debug);
    fs.utimesSync(release, 1000, 1000);
    fs.utimesSync(debug, 1000, 1000);
    expect(findCargoBinary(root, 'tool', {})).toBe(release);
  });

  it('preserves target directory priority even if another directory has a newer build', () => {
    const root = tmp();
    const external = tmp();
    const selected = path.join(external, 'release/tool');
    const fallback = path.join(root, 'target/debug/tool');
    touch(selected);
    touch(fallback);
    fs.utimesSync(selected, 1000, 1000);
    fs.utimesSync(fallback, 2000, 2000);
    expect(findCargoBinary(root, 'tool', { CARGO_TARGET_DIR: external })).toBe(selected);
  });

  it('skips directories named like a binary', () => {
    const root = tmp();
    fs.mkdirSync(path.join(root, 'target/release/tool'), { recursive: true });
    touch(path.join(root, 'target/debug/tool'));
    expect(findCargoBinary(root, 'tool', {})).toBe(path.join(root, 'target/debug/tool'));
  });
});
