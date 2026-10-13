import fs from 'node:fs/promises';
import { CITATIONS_SCHEMA, type CitationsFile, type SpaceEntry } from '@baocut/protocol';

/**
 * `space.citations`（创作辅助集成设计 §3.4）：写作结果文档条目的出处旁文件（`baocut.citations/1`）。条目上的
 * `citations.artifactId` 指向任务产物库里的一个 JSON；读不到、太大、不是这个格式时回答 null，不报错（出处是附加信息，
 * 正文照常可读）。可见性由调用方先按 `space.get` 的规则核对。
 */

export interface CitationArtifacts {
  locate(artifactId: string): Promise<string | null>;
}

/** 旁文件的大小上限：出处只是段落与原句，远小于这个数。 */
const CITATIONS_MAX_BYTES = 16 * 1024 * 1024;

export async function readCitations(entry: SpaceEntry, artifacts: CitationArtifacts | null): Promise<CitationsFile | null> {
  const artifactId = entry.citations?.artifactId;
  if (!artifactId || !artifacts) return null;
  const file = await artifacts.locate(artifactId).catch(() => null);
  if (!file) return null;
  try {
    const stat = await fs.stat(file);
    if (!stat.isFile() || stat.size > CITATIONS_MAX_BYTES) return null;
    const value = JSON.parse(await fs.readFile(file, 'utf8')) as Partial<CitationsFile> | null;
    if (!value || value.schema !== CITATIONS_SCHEMA || !Array.isArray(value.paragraphs) || !Array.isArray(value.videoIds)) return null;
    return value as CitationsFile;
  } catch {
    return null;
  }
}
