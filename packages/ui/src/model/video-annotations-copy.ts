import { defineMessages } from '@baocut/protocol';
import { zhHans } from './video-annotations-copy.zh-Hans.ts';
import { zhHant } from './video-annotations-copy.zh-Hant.ts';
import { ja } from './video-annotations-copy.ja.ts';
import { ko } from './video-annotations-copy.ko.ts';
import { es } from './video-annotations-copy.es.ts';
import { fr } from './video-annotations-copy.fr.ts';
import { de } from './video-annotations-copy.de.ts';
import { nl } from './video-annotations-copy.nl.ts';
import { ptBR } from './video-annotations-copy.pt-BR.ts';
import { it } from './video-annotations-copy.it.ts';
import { ru } from './video-annotations-copy.ru.ts';
import { pl } from './video-annotations-copy.pl.ts';
import { tr } from './video-annotations-copy.tr.ts';
import { vi } from './video-annotations-copy.vi.ts';

/**
 * 视频标注的界面文案（产品设计 §3.2.3「视频标注」、§5.3「标注」；原型 stage-notes.jsx、model-stage-notes.js）：舞台工具条的
 * 「标注」钮、画面上方的小工具条、批注框、画面上的标记，与 composer 上方、已发送消息里的「视频标注 · N 条」。
 * 标签与标注列表的键名与设计稿的 `DESIGN` 对齐（`AnnotationsToken` 共用）。英文写在这里，译文在 `video-annotations-copy.zh-Hans.ts` 等。
 */
const en = {
  /** 舞台工具条上的开关：没开时的提示与读屏名、开着时的提示。 */
  annotate: 'Annotate',
  exitAnnotate: 'Exit annotation',
  /** 画面上方小工具条的读屏名、种类那一组的读屏名。 */
  toolbar: 'Video annotation',
  kindGroup: 'Annotation type',
  /** 四种标注（给模型看的 kind 是英文的 box / arrow / text / pin，不随界面语言变）。 */
  kinds: { box: 'Box', arrow: 'Arrow', text: 'Text', pin: 'Number' },
  hints: {
    box: 'Drag out a box',
    arrow: 'Drag from the start to where it points',
    text: 'Click a spot in the picture',
    pin: 'Click a spot in the picture',
  },
  /** 小工具条的状态行：当前种类的提示、这一帧的时码、不在这一帧上的有几条。 */
  status: (hint: string, timecode: string, away: number) =>
    `${hint} · frame at ${timecode}${away ? ` · ${away} more at other times` : ''} · Esc to exit`,
  done: 'Done',
  /** 画面九宫位置（按标注的中心点）。 */
  places: {
    topLeft: 'top left',
    top: 'top',
    topRight: 'top right',
    left: 'left',
    center: 'center',
    right: 'right',
    bottomLeft: 'bottom left',
    bottom: 'bottom',
    bottomRight: 'bottom right',
  },
  /** 给人看的位置：「00:42.3 · 框 · 画面右上」。 */
  label: (timecode: string, kind: string, place: string) => `${timecode} · ${kind} · ${place} of the frame`,
  /** 批注框：弹层与输入框的读屏名称、占位、两个按钮。 */
  addTitle: 'Add annotation',
  noteLabel: 'Annotation',
  notePlaceholder: 'What should change?',
  addToChat: 'Add to chat',
  cancel: 'Cancel',
  /** 画面上的标记：编号钮的读屏名、弹层里的移除。 */
  mark: (n: number, text: string) => `Annotation ${n}: ${text}`,
  removeFromChat: 'Remove from chat',
  /** composer 上方与已发送消息里的那一行。 */
  token: (n: number) => `Video annotations · ${n}`,
  added: (token: string) => `Added to chat · ${token}`,
  removeAll: 'Remove all video annotations',
  removeOne: (n: number) => `Remove annotation ${n}`,
  /** 列表里一条的读屏名称。 */
  item: (n: number, label: string, text: string) => `Annotation ${n}, ${label}: ${text}`,
  empty: 'Write an annotation first, then add it to the chat',
  tooLong: (max: number) => `An annotation can be at most ${max} characters`,
  tooMany: (max: number) => `A message can carry at most ${max} video annotations. Send these first.`,
  /** 框与箭头只点了一下、没有拖开。 */
  noArea: 'Drag out a box with some area',
  noArrowEnd: 'Drag the arrow to where it points',
  /** 点列表里的一条，那部视频已经找不到了。 */
  gone: 'This video has been moved or deleted',
  /** 只带标注、没写话时发给智能体的那句。 */
  message: 'Please revise the video according to these annotations.',
};
export type VideoAnnotationMessages = typeof en;
export const VIDEO_NOTES = defineMessages(en, { 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja, ko, es, fr, de, nl, 'pt-BR': ptBR, it, ru, pl, tr, vi });
