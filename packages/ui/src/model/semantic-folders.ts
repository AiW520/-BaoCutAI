import type { SemanticFolderStatus } from '@baocut/protocol';
import { M } from './semantic-copy.ts';

/*
 * 设置 › 语义索引 › 索引范围里的索引文件夹（检索规格 §9.1；设计稿 model-space-index.js 的 folderStatus / folderNote）：
 * 每个文件夹一行，写建到哪了、里面认出了什么、跳过了什么，以及要用户知道的提醒（文件夹不在、只扫了前面的、旧版视频不读）。
 */

export interface FolderRowView {
  /** 右边那一句：画面进度、只按讲话内容建，或文件夹不在。 */
  line: string;
  tone: 'notice' | null;
  /** 认出的与跳过的。 */
  what: string;
  notes: string[];
}

export function folderRowView(folder: SemanticFolderStatus, visualOn: boolean): FolderRowView {
  const F = M.folders;
  const n = folder.counts;
  const found = [
    n.videos ? F.videos(n.videos) : null,
    n.videoFiles ? F.videoFiles(n.videoFiles) : null,
    n.images ? F.images(n.images) : null,
  ]
    .filter((x): x is string => x !== null)
    .join(F.listSeparator);
  const skipped = [
    n.exports ? F.exportsSkipped(n.exports) : null,
    n.duplicates ? F.duplicates(n.duplicates) : null,
    n.legacy ? F.legacy(n.legacy) : null,
  ].filter((x): x is string => x !== null);
  const what = [found || F.nothing, ...skipped].join(F.separator);
  if (!folder.exists) return { line: F.missing, tone: 'notice', what, notes: [F.missingNote] };
  const notes: string[] = [];
  if (folder.issue?.kind === 'truncated') notes.push(folder.issue.limit ? F.truncatedNote(folder.issue.limit) : F.truncatedNoteNoLimit);
  if (folder.issue?.kind === 'unreadable') notes.push(F.unreadableNote);
  if (n.legacy) notes.push(F.legacyNote);
  const v = folder.visual;
  // 画面开着时写画面的进度（这个文件夹里没有要建画面的也算就绪）；没开时按里面有没有 BaoCut 视频说文字建到哪。
  const line =
    visualOn && v ? (v.done >= v.total ? F.visualReady : F.visualProgress(v.done, v.total)) : n.videos ? F.textOnly : F.visualOff;
  return { line, tone: null, what, notes };
}
