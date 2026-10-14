import { defineMessages } from '@baocut/protocol';
import { zhHans } from './archived-copy.zh-Hans.ts';
import { zhHant } from './archived-copy.zh-Hant.ts';
import { ja } from './archived-copy.ja.ts';
import { ko } from './archived-copy.ko.ts';
import { es } from './archived-copy.es.ts';
import { fr } from './archived-copy.fr.ts';
import { de } from './archived-copy.de.ts';
import { nl } from './archived-copy.nl.ts';
import { ptBR } from './archived-copy.pt-BR.ts';
import { it } from './archived-copy.it.ts';
import { ru } from './archived-copy.ru.ts';
import { pl } from './archived-copy.pl.ts';
import { tr } from './archived-copy.tr.ts';
import { vi } from './archived-copy.vi.ts';

/**
 * Home ›「已归档会话」、归档提示条与已归档会话横幅的文案（产品设计 §3.1）。英文是键与类型的来源，
 * 译文在 `archived-copy.<语言>.ts`；用词见 docs/glossary.md（Archive / Restore / Delete）。
 */
const en = {
  title: 'Archived sessions',
  intro: 'Archived sessions are hidden from the sidebar. Their videos, files, and changes are all still there. A restored session goes back under its project.',
  search: 'Search archived sessions',
  filterLabel: 'Filter by project',
  allProjects: 'All projects',
  noProject: 'Not in a project',
  sessionCount: (n: number) => (n === 1 ? '1 session' : `${n} sessions`),
  /** `archived`、`active` 是相对时间（刚刚、5 分钟前、昨天或日期）。 */
  meta: (archived: string, active: string) => `Archived: ${archived} · Last active: ${active}`,
  restore: 'Restore',
  restoreNamed: (title: string) => `Restore “${title}”`,
  deleteNamed: (title: string) => `Delete “${title}”`,
  deleteAll: 'Delete all',
  deleteAllTitle: (n: number) => (n === 1 ? 'Delete 1 archived session?' : `Delete all ${n} archived sessions?`),
  deleteAllBody:
    'Their history will be removed from BaoCut, and any running task will be stopped first. This can’t be undone. Files in project folders are not affected.',
  restored: (title: string) => `Restored “${title}”`,
  open: 'Open',
  restoreFailed: (message: string) => `Couldn’t restore: ${message}`,
  deleted: (title: string) => `Deleted “${title}”`,
  deletedAll: (n: number) => (n === 1 ? 'Deleted 1 archived session' : `Deleted ${n} archived sessions`),
  /** 全部删除时有的没删掉：`done` 删掉了几个，`total` 一共几个。 */
  deletedSome: (done: number, total: number) => `Deleted ${done} of ${total} archived sessions. The rest couldn’t be deleted.`,
  emptyTitle: 'No archived sessions',
  emptyBody: 'Archive a session from its row in the sidebar to move it here. You can restore it later.',
  noMatchTitle: 'No matching sessions',
  noMatchBody: 'Try a different search, or set the project filter back to All projects.',
  banner: 'This session is archived and hidden from the sidebar.',
  viewAll: 'View all archived',
  /** 归档提示条上的按钮：去已归档会话页并高亮刚归档的那条。 */
  viewArchived: 'View archived',
};

export type ArchivedMessages = typeof en;

export const ARCHIVED = defineMessages(en, { 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja, ko, es, fr, de, nl, 'pt-BR': ptBR, it, ru, pl, tr, vi });
