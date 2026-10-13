import type { CitationAnchor, CitationsFile, Id, VersionRef, VideoSnapshot } from '@baocut/protocol';
import { sequenceFrame } from './player.ts';

/*
 * 写博客的关键帧插图（创作辅助集成设计 §2.3、§3.5；原型 model-tool-semantic.js `illustrations`、`nextFrame`）。没有画面索引，
 * 只有退路：按段落第一处（这部视频的）出处的时间取帧，不按内容挑。每隔几段一张（同原型，缺省每两段），插在段落后面；
 * 「换一张」在同一时间附近轮换几个候选时间，「去掉」不再显示。插图只在结果页上，不写进存下的文档。
 */

/** 每几段有出处的段落配一张。 */
export const FIGURE_EVERY = 2;
/** 换一张时前后挪的秒数。 */
export const FIGURE_NUDGE_SECONDS = 2.5;

export interface FigurePlan {
  /** 插在哪一段后面（`CitationParagraph.index`）。 */
  index: number;
  anchor: CitationAnchor;
  /** 候选时间（与出处同一个时钟），第一个是出处的起点。 */
  candidates: number[];
}

/** 配图的段落：正文段、不是模型推断、有这部视频的出处；按顺序每 `every` 段取一段（第一段起）。系列里别的视频的出处不取。 */
export function figurePlans(file: CitationsFile, videoId: Id, every = FIGURE_EVERY): FigurePlan[] {
  const out: FigurePlan[] = [];
  let k = 0;
  for (const p of file.paragraphs) {
    if (p.role !== 'body' || p.inferred) continue;
    const anchor = p.cites.find((a) => a.videoId === videoId);
    if (!anchor || k++ % every) continue;
    const t = anchor.startSec;
    out.push({ index: p.index, anchor, candidates: [t, t + FIGURE_NUDGE_SECONDS, t - FIGURE_NUDGE_SECONDS].filter((x) => x >= 0) });
  }
  return out;
}

/** 一张插图在结果页上的状态：用第几个候选、去掉没有。 */
export interface FigureChoice {
  pick: number;
  dropped: boolean;
}

/** 现在用的时间。 */
export function figureTime(plan: FigurePlan, choice: FigureChoice | undefined): number {
  return plan.candidates[(choice?.pick ?? 0) % plan.candidates.length]!;
}

/** 换一张：下一个候选（转一圈回到第一个）。 */
export function nextFigure(choice: FigureChoice | undefined): FigureChoice {
  return { pick: (choice?.pick ?? 0) + 1, dropped: false };
}

/**
 * 插图那一帧在哪个素材的哪一秒：序列时钟的出处按主序列上看得见的那层换到源时间（同进度条的悬停画面）；源时钟的出处是转写所属素材
 * 自己的时间。落在没有画面的地方（纯音频、空隙、素材没有画面）时 null，不配图。
 */
export function figureFrame(anchor: CitationAnchor, t: number, video: Pick<VideoSnapshot, 'rootSequenceId' | 'sequences' | 'assets' | 'documents'>): { asset: VersionRef; at: number } | null {
  if (anchor.clock === 'sequence') {
    const sequence = video.sequences[video.rootSequenceId];
    return sequence ? sequenceFrame(sequence, video.assets, t) : null;
  }
  const assetId = anchor.documentId ? video.documents[anchor.documentId]?.sourceAssetId : undefined;
  const asset = assetId ? video.assets[assetId] : undefined;
  if (!asset?.revisions[asset.currentRevision]?.video) return null;
  return { asset: { id: asset.id, revision: asset.currentRevision }, at: t };
}
