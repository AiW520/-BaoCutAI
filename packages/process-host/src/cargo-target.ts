import fs from 'node:fs';
import path from 'node:path';

/** 读 `.cargo/<file>` 里 `[build]` 段的 `target-dir`（只认单行字符串；够用即可，不引入 TOML 依赖）。 */
function readConfiguredTargetDir(cargoDir: string): string | null {
  for (const file of ['config.local.toml', 'config.toml']) {
    let text: string;
    try {
      text = fs.readFileSync(path.join(cargoDir, file), 'utf8');
    } catch {
      continue;
    }
    let inBuild = false;
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.trim();
      const section = /^\[([^\]]+)\]$/.exec(line);
      if (section) inBuild = section[1]?.trim() === 'build';
      else if (inBuild) {
        const match = /^target-dir\s*=\s*(["'])(.*?)\1/.exec(line);
        if (match?.[2] !== undefined) return match[2];
      }
    }
  }
  return null;
}

/**
 * 从 `startDir` 往上，列出可能存放 cargo 产物的目录：`CARGO_TARGET_DIR`，各级 `.cargo/config*.toml`
 * 里的 `build.target-dir`（本机可通过不入库的 `config.local.toml` 把它挪到外置盘），以及默认的 `<dir>/target`。
 */
export function* cargoTargetDirs(startDir: string, env: NodeJS.ProcessEnv = process.env): Generator<string> {
  if (env.CARGO_TARGET_DIR) yield path.resolve(env.CARGO_TARGET_DIR);
  let dir = startDir;
  for (;;) {
    const configured = readConfiguredTargetDir(path.join(dir, '.cargo'));
    if (configured) yield path.resolve(dir, configured);
    yield path.join(dir, 'target');
    const parent = path.dirname(dir);
    if (parent === dir) return;
    dir = parent;
  }
}

/** 在第一个有产物的 cargo 目录里取较新的 `{release,debug}/<exe>`；时间相同优先 release。 */
export function findCargoBinary(startDir: string, exe: string, env: NodeJS.ProcessEnv = process.env): string | null {
  for (const targetDir of cargoTargetDirs(startDir, env)) {
    let newest: { file: string; mtimeMs: number } | null = null;
    for (const profile of ['release', 'debug']) {
      const candidate = path.join(targetDir, profile, exe);
      try {
        const stat = fs.statSync(candidate);
        if (stat.isFile() && (!newest || stat.mtimeMs > newest.mtimeMs)) {
          newest = { file: candidate, mtimeMs: stat.mtimeMs };
        }
      } catch {
        // 产物不存在或构建时正在替换，继续找其他候选。
      }
    }
    if (newest) return newest.file;
  }
  return null;
}
