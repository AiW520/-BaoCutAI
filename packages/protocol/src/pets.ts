import type { Id } from './domain.ts';
import type { EditResult } from './methods.ts';
import type { MessageRef } from './message-ref.ts';
import { COMMUNITY_PETS, OFFICIAL_PETS, PET_CATEGORIES } from './pet-catalog.ts';
import type { EditOperation, Revision } from './video.ts';

/**
 * Codex Pets（元素面板动态贴纸里的「Codex Pets」）：Codex 桌面端桌宠的精灵图。一张 WebP 图集，8 列、每格 192×208，
 * v1 九行、v2 十一行，每行一种状态；贴进视频的是待机那一行编成的循环 APNG（`pets.applyToVideo`，命令与协议规范
 * `pets` 一行）。目录有两份，数据在 `pet-catalog.ts`（由原型 `designs/baocut/app/model-pet-catalog.js` 转写）：
 *
 * - 官方 9 只（OpenAI）：图集不随包，放在素材 CDN 的 `pets/official/<id>/spritesheet.webp`，按这里的大小与 sha256 核对。
 * - 社区 239 只：awesome-codex-pet 的索引。图集与缩略图不转存，用到时从上游取；各自的许可（多为 CC BY-NC 4.0）与作者
 *   必须随格子显示。
 */

export interface OfficialPet {
  id: string;
  name: string;
  description: string;
  /** 图集版本：1 是九行，2 是十一行。 */
  version: 1 | 2;
  /** 图集文件的大小与 sha256（CDN 上的那份）。 */
  bytes: number;
  sha256: string;
}

export interface PetCategory {
  slug: string;
  /** 分类名：英文与中文原文，界面按语言挑，非中文界面用英文。 */
  name: string;
  zh: string;
}

export interface CommunityPet {
  /** awesome-codex-pet 里的目录名，`<名字>--<作者>`。 */
  slug: string;
  name: string;
  /** 中文名；没有时是空串。 */
  zh: string;
  author: string;
  /** 作者主页；没有时是空串。 */
  url: string;
  /** `PET_CATEGORIES` 的 slug。 */
  category: string;
  /** 作者自报的许可原文。 */
  license: string;
  version: 1 | 2;
}

export { COMMUNITY_PETS, OFFICIAL_PETS, PET_CATEGORIES };

/** 一只 pet：官方的按 ID，社区的按 slug。 */
export type PetRef = { source: 'official'; id: string } | { source: 'community'; slug: string };

/** 图集的格子与待机那一行的帧时长（毫秒）。 */
export const PET_SHEET = {
  columns: 8,
  cellWidth: 192,
  cellHeight: 208,
  idleDelaysMs: [280, 110, 110, 140, 140, 320] as readonly number[],
} as const;

/** 待机一圈多长（毫秒）。 */
export const PET_IDLE_MS = PET_SHEET.idleDelaysMs.reduce((sum, ms) => sum + ms, 0);

/** 图集版本对应的整图尺寸。 */
export function petSheetSize(version: 1 | 2): { width: number; height: number } {
  return { width: PET_SHEET.columns * PET_SHEET.cellWidth, height: (version === 2 ? 11 : 9) * PET_SHEET.cellHeight };
}

const OFFICIAL_BY_ID = new Map(OFFICIAL_PETS.map((pet) => [pet.id, pet] as const));
const COMMUNITY_BY_SLUG = new Map(COMMUNITY_PETS.map((pet) => [pet.slug, pet] as const));

export function officialPet(id: string): OfficialPet | null {
  return OFFICIAL_BY_ID.get(id) ?? null;
}

export function communityPet(slug: string): CommunityPet | null {
  return COMMUNITY_BY_SLUG.get(slug) ?? null;
}

/** 官方 pet 的图集在素材 CDN 与本机缓存里的相对路径。 */
export function officialPetSheetPath(id: string): string {
  return `pets/official/${id}/spritesheet.webp`;
}

const COMMUNITY_PREVIEWS = 'https://codexpet.top/assets/previews/';
const COMMUNITY_RAW = 'https://raw.githubusercontent.com/legeling/awesome-codex-pet/main/pets/';
/** awesome-codex-pet 仓库（社区目录的出处）。 */
export const COMMUNITY_PETS_REPO = 'https://github.com/legeling/awesome-codex-pet';

/** 社区 pet 的静态缩略图（待机第 0 帧，上游站点预渲染）。 */
export function communityPetThumbnailUrl(slug: string): string {
  return `${COMMUNITY_PREVIEWS}${encodeURIComponent(slug)}/thumbnail.webp`;
}

/** 社区 pet 待机那一行的动图（上游站点预渲染的 WebP 动画，格子悬停时放）。 */
export function communityPetPreviewUrl(slug: string): string {
  return `${COMMUNITY_PREVIEWS}${encodeURIComponent(slug)}/webp/idle.webp`;
}

/** 社区 pet 的整张图集。 */
export function communityPetSheetUrl(slug: string): string {
  return `${COMMUNITY_RAW}${encodeURIComponent(slug)}/spritesheet.webp`;
}

/** 社区 pet 在仓库里的目录页。 */
export function communityPetPageUrl(slug: string): string {
  return `${COMMUNITY_PETS_REPO}/tree/main/pets/${encodeURIComponent(slug)}`;
}

/** 许可是不是明确不许商用（CC BY-NC 或手写的 non-commercial）。 */
export function petLicenseNonCommercial(license: string): boolean {
  return /\bnc\b|non-?commercial|非商/i.test(license);
}

/** 拷进视频的 pet 素材的来源（视频格式规范 §4.5）：`origin` 与 `source.codexPet`。 */
export const CODEX_PET_ORIGIN = 'codex-pet';

export interface PetHandleParams {
  pet: PetRef;
  /**
   * `sheet` 是整张图集（官方的从素材 CDN、社区的从上游取进本机缓存）；`thumbnail`（静止的第 0 帧）与 `preview`（待机
   * 那一行的动图）是社区 pet 上游预渲染的，官方的没有（界面从图集裁格子、自己按帧时长放）。
   */
  file: 'sheet' | 'thumbnail' | 'preview';
}

export interface PetApplyParams {
  videoId: Id;
  pet: PetRef;
  commandId: Id;
  /** 不给时以视频的当前版本提交。 */
  expectedRevision?: Revision;
  /** 素材的名字；不给时用 pet 的名字。 */
  name?: string;
  /** 同 `stickers.applyToVideo`：导入的素材在这些操作里是 `assetImportRef: 'asset'`，一起提交、一步撤销。 */
  operations?: EditOperation[];
  /** 这笔事务给人看的修改名与它的消息引用；不给时是「添加贴纸」。 */
  label?: string;
  labelRef?: MessageRef;
}

export interface PetApplyResult extends EditResult {
  /** 拷进来的素材（`.apng`，待机那一行，无限循环）。 */
  assetId: Id;
}
