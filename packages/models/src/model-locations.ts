import { readFileSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * 模型仓库的存放位置（架构设计 §6.3）：下载时选了模型目录以外的文件夹的仓库，记在 Runtime Home 的 `store/model-locations.json`：
 * `{ "format_version": 1, "repos": { "<owner>/<repo>": "<文件夹的绝对路径>" } }`。仓库在 `<文件夹>/<owner>/<repo>/`，布局与模型目录
 * 相同（清单、暂存区 `<文件夹>/.bcut-staging/`）；没有记录的仓库在模型目录里。
 *
 * 记录放在 Runtime Home 而不是模型目录里：外置盘没接上时也读得到，移动或更换模型目录时不跟着走（这些仓库留在原处）。
 * 文件坏了按空记录处理（这些仓库报告为没装，重新下载时再选位置）。
 */

export const MODEL_LOCATIONS_FORMAT = 1;

export class ModelLocations {
  readonly #file: string | null;
  readonly #repos = new Map<string, string>();
  #writing: Promise<void> = Promise.resolve();

  /** `file` 为 null 时只在内存里（测试与不持久化的目录）。读文件是同步的：模型目录构造时就要知道仓库在哪。 */
  constructor(file: string | null) {
    this.#file = file;
    if (!file) return;
    try {
      const raw = JSON.parse(readFileSync(file, 'utf8')) as { format_version?: unknown; repos?: unknown };
      if (raw.format_version !== MODEL_LOCATIONS_FORMAT || typeof raw.repos !== 'object' || raw.repos === null || Array.isArray(raw.repos)) return;
      for (const [repo, dir] of Object.entries(raw.repos as Record<string, unknown>)) {
        if (typeof dir === 'string' && path.isAbsolute(dir)) this.#repos.set(repo, path.resolve(dir));
      }
    } catch {
      // 没有或坏了：空记录。
    }
  }

  /** 记下的文件夹；没有记录时 null。 */
  get(repo: string): string | null {
    return this.#repos.get(repo) ?? null;
  }

  entries(): Array<[string, string]> {
    return [...this.#repos.entries()];
  }

  /** 记下（`dir`）或清掉（null）一个仓库的位置。内存里立即生效；写盘串行，写临时文件再改名。 */
  set(repo: string, dir: string | null): Promise<void> {
    const next = dir === null ? null : path.resolve(dir);
    if ((this.#repos.get(repo) ?? null) === next) return this.#writing;
    if (next === null) this.#repos.delete(repo);
    else this.#repos.set(repo, next);
    const file = this.#file;
    if (!file) return Promise.resolve();
    const body = `${JSON.stringify({ format_version: MODEL_LOCATIONS_FORMAT, repos: Object.fromEntries([...this.#repos].sort(([a], [b]) => a.localeCompare(b))) }, null, 2)}\n`;
    this.#writing = this.#writing
      .catch(() => {})
      .then(async () => {
        await fs.mkdir(path.dirname(file), { recursive: true });
        const tmp = `${file}.${process.pid}.tmp`;
        await fs.writeFile(tmp, body);
        await fs.rename(tmp, file);
      });
    return this.#writing;
  }
}
