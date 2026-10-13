import { defineMessages } from '@baocut/protocol';
import { zhHans } from './writing-topic-copy.zh-Hans.ts';
import { zhHant } from './writing-topic-copy.zh-Hant.ts';
import { ja } from './writing-topic-copy.ja.ts';
import { ko } from './writing-topic-copy.ko.ts';
import { es } from './writing-topic-copy.es.ts';
import { fr } from './writing-topic-copy.fr.ts';
import { de } from './writing-topic-copy.de.ts';
import { nl } from './writing-topic-copy.nl.ts';
import { ptBR } from './writing-topic-copy.pt-BR.ts';
import { it } from './writing-topic-copy.it.ts';
import { ru } from './writing-topic-copy.ru.ts';
import { pl } from './writing-topic-copy.pl.ts';
import { tr } from './writing-topic-copy.tr.ts';
import { vi } from './writing-topic-copy.vi.ts';

/**
 * 写作「按主题」选材、系列文章与生成章节的边界（ai-tools-topic.tsx）的文案。英文是键与类型的来源，译文在
 * `writing-topic-copy.<语言>.ts`。
 */
const en = {
  scopeTopic: 'By topic',
  topicLabel: 'Topic',
  topicPlaceholder: 'Optional, e.g. how we chose the model',
  topicHow: 'Passages related to the topic are picked on this computer and sent to the model in time order. Without a topic, the prompt is used.',
  topicPicked: (n: number, chapters: number) =>
    `Picked ${n === 1 ? '1 passage' : `${n} passages`}${chapters ? `, covering ${chapters === 1 ? '1 chapter' : `${chapters} chapters`}` : ''}, in time order`,
  topicNeedsTopic: 'Write a topic to see which passages are picked.',
  topicLoading: 'Picking passages…',
  topicNone: 'Nothing related was found. Try other words.',
  topicFailed: (message: string) => `Couldn’t pick passages: ${message}`,
  topicView: 'View picked passages',
  topicDialogTitle: 'Picked passages',
  topicDialogLead: 'Picked on this computer by the topic, in time order. Uncheck what the model shouldn’t see. This only decides what the model reads; the transcript isn’t changed.',
  topicWeak: 'Loosely related',
  topicUse: (n: number) => (n === 1 ? 'Use this 1' : `Use these ${n}`),
  cancel: 'Cancel',
  topicDefaultLong: 'This video is over 30 minutes, so it starts with by topic.',
  topicDefaultShort: 'This video is short, so it starts with the whole text. Over 30 minutes it starts with by topic.',
  contextTopic: (n: number, chapters: number) =>
    `transcript ${n === 1 ? '1 passage' : `${n} passages`} (picked by topic${chapters ? `, ${chapters === 1 ? '1 chapter' : `${chapters} chapters`}` : ''})`,
  contextTopicPending: 'transcript passages picked by topic',
  contextSeries: (n: number) => `series of ${n} videos`,
  seriesLabel: 'Videos',
  seriesOnlyThis: 'Only this one',
  seriesWith: (names: string) => `This one + ${names}`,
  seriesAdd: 'Add from this project…',
  seriesChange: 'Change…',
  seriesTitle: 'Videos to write from',
  seriesLead: (max: number) =>
    `Videos in the same project. Passages are picked across them and citations name the video; the result is still one document. Up to ${max} more.`,
  seriesThis: (name: string) => `${name} (this one)`,
  seriesDerived: 'Cut from another video, so its content is already in the source video',
  seriesNone: 'There are no other videos in this project.',
  seriesLoading: 'Loading videos…',
  seriesFailed: (message: string) => `Couldn’t list videos: ${message}`,
  seriesDone: 'Done',
  boundaryLabel: 'Boundaries',
  boundaryTopic: 'Detect by topic',
  boundaryModel: 'Let the model decide',
  boundaryTopicSub: 'Topic shifts are found on this computer first; the model only splits and names chapters there. Rerunning changes titles, not boundaries.',
  boundaryModelSub: 'The whole text goes to the model, which decides boundaries and titles together. Long videos may split differently each run.',
  boundaryOff: 'Detecting by topic needs the local semantic model, so the model decides the boundaries.',
};

export type WritingTopicMessages = typeof en;
export const WRITING_TOPIC_COPY = defineMessages(en, { 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja, ko, es, fr, de, nl, 'pt-BR': ptBR, it, ru, pl, tr, vi });
