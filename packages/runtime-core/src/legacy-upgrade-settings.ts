import type { SettingKey } from '@baocut/protocol';
import { localeOfTag } from '@baocut/protocol';
import { settingValueSchemas } from '@baocut/protocol/schemas';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';
import { MODELSCOPE_ENDPOINT, readManifest } from '@baocut/models';
import { SettingsStore } from '@baocut/runtime-storage';
import { legacyPath, type LegacyObject, type LegacySource } from './legacy-upgrade-sources.ts';

/** Only settings with the same meaning in v3 are adopted; target user values win. */
export async function importLegacySettings(
  store: SettingsStore,
  source: LegacySource,
  v1: LegacyObject = {},
  platform = process.platform,
  userHome = os.homedir(),
  currentModelsDir?: string,
): Promise<string[]> {
  const { config: c, preferences: p } = source;
  const language = p.language ?? v1['vk-lang'];
  const patch: Partial<Record<SettingKey, unknown>> = {
    'models.dir': store.snapshot(['models.dir']).sources['models.dir'] === 'user' ? null :
      (legacyPath(c['models.dir'] ?? v1['vk-models-dir'], source.root, undefined, platform)
        ?? await legacyDefaultModelsDirectory(source.root, platform, currentModelsDir)),
    'downloads.directory': legacyDownloads(p['vk-url-savedir'] ?? c['download.dir'] ?? v1['vk-url-savedir'], source.root, platform, userHome),
    'ui.language': language === 'system' ? 'system' : localeOfTag(typeof language === 'string' ? language : undefined),
    'updates.autoDownload': p.appAutoUpdate,
    'agent.defaultDriver': p.agentChatDefaults?.provider,
    'agent.defaultModel': p.agentChatDefaults?.model,
    'agent.defaultEffort': p.agentChatDefaults?.effort,
    'agent.defaultAccessMode': p.agentLastMode,
  };
  // The old endpoint is an enum, not a URL. HF and ModelScope have v3 base URLs; the old CDN does not carry v3 repositories.
  const endpoint = c['models.endpoint'] ?? (v1['vk-download-source'] === 'custom' ? v1['vk-custom-mirror'] : v1['vk-download-source']);
  if (endpoint === 'hf' || endpoint === 'huggingface') patch['models.downloadEndpoint'] = 'https://huggingface.co';
  else if (endpoint === 'modelscope') patch['models.downloadEndpoint'] = MODELSCOPE_ENDPOINT;
  else if (typeof endpoint === 'string' && /^https?:\/\//.test(endpoint)) patch['models.downloadEndpoint'] = endpoint;
  const accepted: Partial<Record<SettingKey, unknown>> = {};
  for (const [key, value] of Object.entries(patch) as [SettingKey, unknown][]) {
    if (value == null || store.snapshot([key]).sources[key] === 'user') continue;
    const parsed = settingValueSchemas[key].safeParse(value);
    if (parsed.success) accepted[key] = parsed.data;
  }
  await store.set(accepted);
  return Object.keys(accepted);
}

/** Adopt an old repository cache only when the current directory has no model files to displace. */
export async function legacyDefaultModelsDirectory(root: string, platform: NodeJS.Platform, currentModelsDir?: string): Promise<string | null> {
  const paths = platform === 'win32' ? path.win32 : path.posix;
  const candidate = paths.join(root, 'models');
  if (currentModelsDir && await hasModelFiles(currentModelsDir, paths, false)) return null;
  return await hasModelFiles(candidate, paths, true) ? candidate : null;
}

/** Inspect repository files and paused downloads: Finder metadata and empty trees are not model caches. */
async function hasModelFiles(dir: string, paths: typeof path.posix, requireManifest: boolean): Promise<boolean> {
  const directories = async (parent: string): Promise<string[]> => {
    try {
      return (await fs.readdir(parent, { withFileTypes: true }))
        .filter((entry) => !entry.name.startsWith('.') && (entry.isDirectory() || entry.isSymbolicLink()))
        .map((entry) => paths.join(parent, entry.name));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
      throw error;
    }
  };
  for (const owner of await directories(dir)) {
    for (const repo of await directories(owner)) {
      const manifest = await readManifest(repo);
      if (!requireManifest && manifest) {
        for (const file of manifest.files) if (await isModelFile(paths.join(repo, ...file.path.split('/')))) return true;
      }
      if (requireManifest) {
        if (!manifest || manifest.repo !== `${paths.basename(owner)}/${paths.basename(repo)}`) continue;
        for (const file of manifest.files) {
          if (await isModelFile(paths.join(repo, ...file.path.split('/')))) return true;
        }
      } else {
        // Preserve incomplete current repositories too; a missing manifest must not hide a user's downloaded weights.
        if (await cacheTreeHasFiles(repo, 0)) return true;
      }
    }
  }
  if (!requireManifest && await cacheTreeHasFiles(paths.join(dir, '.bcut-staging'), 0)) return true;
  return false;
}

/** Retain downloaded bytes, but not empty trees. Never follow directory symlinks inside a repository. */
async function cacheTreeHasFiles(dir: string, depth: number): Promise<boolean> {
  if (depth > 8) return false;
  let entries;
  try { entries = await fs.readdir(dir, { withFileTypes: true }); }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return false;
    throw error;
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const file = path.join(dir, entry.name);
    if (entry.isFile() && (await fs.stat(file)).size > 0) return true;
    if (entry.isSymbolicLink() && await isModelFile(file)) return true;
    if (entry.isDirectory() && await cacheTreeHasFiles(file, depth + 1)) return true;
  }
  return false;
}

async function isModelFile(file: string): Promise<boolean> {
  try { return (await fs.stat(file)).isFile(); }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return false;
    throw error;
  }
}

/**
 * The old default (`~/Downloads`) is not a user choice: leave the setting empty so v3 follows the host's Downloads folder,
 * including a relocated Windows known folder.
 */
function legacyDownloads(value: unknown, root: string, platform: NodeJS.Platform, userHome: string): string | null {
  const resolved = legacyPath(value, root, userHome, platform);
  if (resolved === null) return null;
  const paths = platform === 'win32' ? path.win32 : path.posix;
  const fallback = paths.join(userHome, 'Downloads');
  const same = platform === 'linux' ? resolved === fallback : resolved.toLowerCase() === fallback.toLowerCase();
  return same ? null : resolved;
}
