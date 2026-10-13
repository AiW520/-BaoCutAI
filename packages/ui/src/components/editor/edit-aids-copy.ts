import { defineMessages } from '@baocut/protocol';
import { zhHans } from './edit-aids-copy.zh-Hans.ts';
import { zhHant } from './edit-aids-copy.zh-Hant.ts';
import { ja } from './edit-aids-copy.ja.ts';
import { ko } from './edit-aids-copy.ko.ts';
import { es } from './edit-aids-copy.es.ts';
import { fr } from './edit-aids-copy.fr.ts';
import { de } from './edit-aids-copy.de.ts';
import { nl } from './edit-aids-copy.nl.ts';
import { ptBR } from './edit-aids-copy.pt-BR.ts';
import { it } from './edit-aids-copy.it.ts';
import { ru } from './edit-aids-copy.ru.ts';
import { pl } from './edit-aids-copy.pl.ts';
import { tr } from './edit-aids-copy.tr.ts';
import { vi } from './edit-aids-copy.vi.ts';

/**
 * 润色的术语候选、从文稿发现的术语与找可剪的口的重录（ai-tools-edit-aids.tsx）的文案。英文是键与类型的来源，译文在
 * `edit-aids-copy.<语言>.ts`。
 */
const en = {
  termOption: 'Find likely mishearings with the glossary',
  termOptionSub: 'Lists spellings that look or mean nearly the same as a glossary term; nothing changes until you check them',
  termOff: 'Glossary candidates are turned off in Settings › Semantic index',
  termTitle: (n: number) => (n === 1 ? '1 glossary candidate' : `${n} glossary candidates`),
  termIntro: 'Possible mishearings of glossary terms. The ones you check are replaced in one edit you can undo; the rest stay as they are.',
  termLoading: 'Looking for likely mishearings…',
  termNoGlossary: 'No transcription glossary is enabled for this video, so there’s nothing to compare against.',
  termNone: 'No likely mishearings found.',
  termPlaces: (n: number) => (n === 1 ? '1 place' : `${n} places`),
  termExact: 'A misheard spelling saved in the glossary',
  termSemantic: (glossary: string) => `Looks and means nearly the same as a term in “${glossary}”`,
  termReplace: (from: string, to: string) => `Change “${from}” to “${to}”`,
  termApply: (n: number) => (n === 0 ? 'Replace checked' : n === 1 ? 'Replace 1 checked place' : `Replace ${n} checked places`),
  termApplied: (n: number) => (n === 1 ? 'Replaced 1 place from the glossary' : `Replaced ${n} places from the glossary`),
  failed: (message: string) => `Couldn’t look: ${message}`,
  retry: 'Try again',
  discoverTitle: (n: number) => (n === 1 ? '1 term found in the transcript' : `${n} terms found in the transcript`),
  discoverIntro: 'Names that repeat or are spelled more than one way. Add the ones you want to a glossary so later videos get them right too.',
  discoverForm: (text: string, n: number) => `“${text}” ×${n}`,
  discoverAdd: 'Add to glossary',
  discoverAdded: (term: string, glossary: string) => `Added “${term}” to “${glossary}”`,
  discoverMerged: (term: string, glossary: string) => `“${term}” is already in “${glossary}”; added its other spellings`,
  discoverFailed: (message: string) => `Couldn’t add to the glossary: ${message}`,
  discoverNoGlossary: 'There’s no transcription glossary to add to yet.',
  glossaries: 'Glossaries…',
  retakeOption: 'Retakes',
  retakeOptionSub: 'The same sentence recorded more than once: listed in groups, you pick which take stays',
  retakeTitle: (n: number) => (n === 1 ? '1 retake group' : `${n} retake groups`),
  retakeIntro: 'The same sentence recorded several times. Each group only suggests a take to keep; nothing is checked. Confirmed groups are cut in one edit you can undo.',
  retakeLoading: 'Looking for retakes…',
  retakeNone: 'No retakes found.',
  retakeDiffer: 'Similar but different',
  retakeConfirm: 'Confirm this group',
  retakeConfirmDiffer: 'Treat as retakes anyway',
  retakeDifference: { number: 'numbers', negation: 'negation', name: 'names' },
  retakeDiffers: (kinds: string) => `Different ${kinds}`,
  retakeGroup: (time: string, n: number) => `${time} · ${n} takes`,
  retakeMeta: (seconds: string, complete: boolean) => `${seconds} s · ${complete ? 'complete' : 'unfinished'}`,
  retakeKept: 'Keep this take',
  retakeKeep: 'Keep this one instead',
  retakeSuggest: (time: string) => `Suggests keeping the take at ${time}; nothing is cut until you confirm.`,
  retakeDifferHint: 'These takes say different numbers, negations or names, so they may not be the same sentence. Listen before deciding.',
  retakeApply: (n: number) => (n === 0 ? 'Cut confirmed' : n === 1 ? 'Cut the other takes in 1 confirmed group' : `Cut the other takes in ${n} confirmed groups`),
  retakePending: (takes: number, seconds: string) => (takes === 1 ? `1 take · ${seconds} s` : `${takes} takes · ${seconds} s`),
  retakeNoneConfirmed: 'No group confirmed yet',
};

export type EditAidsMessages = typeof en;
export const EDIT_AIDS_COPY = defineMessages(en, { 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja, ko, es, fr, de, nl, 'pt-BR': ptBR, it, ru, pl, tr, vi });
