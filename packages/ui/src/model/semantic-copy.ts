import { defineMessages } from '@baocut/protocol';
import { zhHans } from './semantic-copy.zh-Hans.ts';
import { zhHant } from './semantic-copy.zh-Hant.ts';
import { ja } from './semantic-copy.ja.ts';
import { ko } from './semantic-copy.ko.ts';
import { es } from './semantic-copy.es.ts';
import { fr } from './semantic-copy.fr.ts';
import { de } from './semantic-copy.de.ts';
import { nl } from './semantic-copy.nl.ts';
import { ptBR } from './semantic-copy.pt-BR.ts';
import { it } from './semantic-copy.it.ts';
import { ru } from './semantic-copy.ru.ts';
import { pl } from './semantic-copy.pl.ts';
import { tr } from './semantic-copy.tr.ts';
import { vi } from './semantic-copy.vi.ts';

/**
 * 本机语义索引的文案（semantic-status.ts、设置 › 语义索引、各入口的那一句）。英文是键与类型的来源，译文在
 * `semantic-copy.<语言>.ts`。
 */
const en = {
  /** 原因码（`SemanticReason`，以及翻译记忆的 `DISABLED`、`MEMORY_UNAVAILABLE`）给人看的一句。 */
  reason: {
    MODEL_NOT_INSTALLED: 'The text search model isn’t installed',
    MODEL_UNAVAILABLE: 'The text search model couldn’t run',
    PROFILE_INCOMPATIBLE: 'The index was built with a different model and has to be rebuilt',
    INPUT_TOO_LONG: 'The text is too long for the model',
    SOURCE_MISSING: 'The source is gone',
    INDEX_NOT_READY: 'The semantic index isn’t ready yet',
    INDEX_PARTIAL: 'The semantic index covers only part of this scope',
    STALE_REVISION: 'The video changed after it was indexed',
    CURSOR_STALE: 'The results changed',
    SEARCH_CANCELLED: 'Canceled',
    RESOURCE_EXHAUSTED: 'Not enough memory to run the model right now',
    APPEARANCE_UNAVAILABLE: 'Searching how the finished video looks isn’t available yet',
    CHANNEL_UNAVAILABLE: 'Visuals and sounds aren’t indexed in this version',
    DISABLED: 'Turned off in Settings › Semantic index',
    MEMORY_UNAVAILABLE: 'Earlier translations couldn’t be read',
  },
  unknownReason: (code: string) => `Semantic features are unavailable (${code})`,
  /** 每个入口：没装模型时那一句；退回的那条路叫什么。 */
  entry: {
    search: { not: 'No local semantic model, so only exact text was matched', fallback: 'exact text' },
    topic: { not: 'Needs the local semantic model', fallback: 'the whole text or one chapter' },
    terms: { not: 'Exact matches only: looked for the misheard spellings saved in your glossary', fallback: 'exact matches' },
    tm: { not: 'Only sentences with identical source text reuse earlier translations', fallback: 'exact matches' },
    retakes: { not: 'Only retakes with identical text were found', fallback: 'identical text' },
    shorts: { not: 'Needs the local semantic model; without a topic the whole video is analyzed', fallback: 'whole-video analysis' },
    related: { not: 'No local semantic model, so videos with similar names are listed', fallback: 'similar names' },
  },
  note: {
    degraded: (fallback: string, why: string) => `Used ${fallback} only. ${why}`,
    stale: 'The index is updating; results may not include recent changes',
    paused: 'The index is paused; results may not include recent changes',
    openSettings: 'Settings…',
  },
  coverage: {
    none: 'No text index',
    empty: 'No videos',
    noTranscripts: 'No transcripts yet, so there’s no text index',
    notIncluded: 'No videos in this scope are in the semantic index, so only exact text is matched',
    ready: 'Text is ready',
    readyWith: (detail: string) => `Text is ready (${detail})`,
    partial: (done: number, total: number, detail: string) => `Text: ${done}/${total} videos${detail ? ` (${detail})` : ''}`,
    queued: (n: number) => `${n} queued`,
    failed: (n: number) => `${n} failed`,
    outdated: (n: number) => `${n} out of date`,
    missing: (n: number) => `${n} without a transcript`,
    excluded: (n: number) => `${n} not in the semantic index`,
    separator: ', ',
  },
  settings: {
    lead: 'Finds what was said by meaning. Space search, picking material by topic, glossary candidates, translation memory and retake candidates use it. The model and the index stay on this computer and are never uploaded.',
    modelGroup: 'Model',
    textName: 'Text search',
    textDesc: 'Searches what was said: transcripts, subtitles, translations and chapters.',
    multimodalName: 'Multimodal search',
    multimodalDesc: 'Includes text search, so you don’t need both. Searching visuals and sounds comes in a later version.',
    installed: 'Installed',
    inUse: 'In use',
    coveredBy: 'Included in multimodal search',
    notInstalled: 'Not installed',
    unsupported: 'Can’t run on this computer',
    install: (size: string | null) => (size ? `Install · ${size}` : 'Install'),
    resume: 'Resume download',
    remove: 'Remove',
    removeBody:
      'Removes the model files. Space search falls back to exact text and picking material by topic is unavailable. The semantic index stays until you clear it; after you reinstall, it’s reused or rebuilt from your transcripts.',
    installNote:
      'Installing doesn’t scan your files. Once it’s installed, only existing transcripts get a lightweight text index. Visuals and sounds will be turned on per project in a later version.',
    unsupportedTitle: 'This computer can’t run the local semantic model',
    unsupportedBody: 'Exact text search, the whole-text and chapter scopes for writing, and exact glossary matching work as usual.',
    indexGroup: 'Index',
    status: 'Status',
    state: { unavailable: 'Unavailable', paused: 'Paused', updating: 'Updating', ready: 'Up to date' },
    readyDesc: 'Every existing transcript has a text index.',
    pausedDesc: 'Nothing new is indexed while paused. Search still uses what’s indexed, so results may not include recent changes.',
    pause: 'Pause',
    resumeIndex: 'Resume',
    paused: 'Indexing paused',
    resumed: 'Indexing resumed',
    cache: 'Cache',
    cacheDesc: 'Vectors and the index, kept in the app’s data, not in your project folders.',
    clear: 'Clear',
    clearTitle: 'Clear the semantic index?',
    clearBody: (size: string) =>
      `Deletes ${size} of index and cache. The model stays. The index is rebuilt in the background from existing transcripts; until then, features that use it say the index is updating.`,
    cleared: 'Cleared. Rebuilding in the background.',
    controlFailed: (text: string) => `Couldn’t change the index: ${text}`,
    runsOn: 'Runs on',
    runsOnDesc: 'Chosen after the model’s self-check.',
    notLoaded: 'Not loaded yet',
    projectsGroup: 'Indexed projects',
    projectsLead: 'Text: videos with a transcript are indexed automatically. Visuals and sounds: turned on per project, not available in this version.',
    noProject: 'Videos outside projects',
    visual: 'Visuals',
    audio: 'Sounds',
    channelLater: 'Comes in a later version',
    channelNeedsMultimodal: 'Needs multimodal search; comes in a later version',
    featuresGroup: 'Features that use it',
    tm: 'Translation memory',
    tmDesc:
      'When translating, sentences whose source text matches one in your other videos reuse that translation and are marked “Reused” in subtitles; similar earlier translations go along as references.',
    tmDescLexical: 'Without the model, only sentences with identical source text reuse earlier translations.',
    terms: 'Glossary candidates',
    termsDesc: 'While polishing, near-identical spellings across your transcripts are listed as glossary candidates for you to choose from.',
    termsDescLexical: 'Without the model, only the misheard spellings saved in your glossary are matched.',
    loading: 'Reading the index status…',
    loadFailed: (text: string) => `Couldn’t read the index status: ${text}`,
  },
};

export type SemanticMessages = typeof en;
export const M = defineMessages(en, { 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja, ko, es, fr, de, nl, 'pt-BR': ptBR, it, ru, pl, tr, vi });
