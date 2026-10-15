import { defineCatalog } from '../../message-ref.ts';
import { zhHans } from './local-speech.zh-Hans.ts';
import { zhHant } from './local-speech.zh-Hant.ts';
import { ja } from './local-speech.ja.ts';
import { ko } from './local-speech.ko.ts';
import { es } from './local-speech.es.ts';
import { fr } from './local-speech.fr.ts';
import { de } from './local-speech.de.ts';
import { nl } from './local-speech.nl.ts';
import { ptBR } from './local-speech.pt-BR.ts';
import { it } from './local-speech.it.ts';
import { ru } from './local-speech.ru.ts';
import { pl } from './local-speech.pl.ts';
import { tr } from './local-speech.tr.ts';
import { vi } from './local-speech.vi.ts';

/** `packages/models/src/local-speech.ts` 给人看的文字：本地语音合成的耗时提示与提交时拒绝的原因。 */
const en = {
  referenceTranscriptRequired: "Enter the transcript of the reference recording",
  paceQwen06: 'about 5–6 times slower than real time, so a 10-second line takes about a minute',
  paceQwen17: 'about 7–8 times slower than real time, so a 10-second line takes a little over a minute',
  paceIndexTts2: 'about 25 times slower than real time, so a 10-second line takes about four minutes',
  paceIndexTts25: 'about 19 times slower than real time, so a 10-second line takes a little over three minutes',
  paceGptSovits: 'about 1.7 times slower than real time, so a 10-second line takes under 20 seconds',
  paceVoxcpm2: 'about 9 times slower than real time, so a 10-second line takes about a minute and a half',
  paceOmnivoice: 'about 8 times slower than real time, so a 10-second line takes nearly a minute and a half',
  paceDefault: 'this one has not been measured',
  cpuNote: (p: { pace: string }) => `Synthesizes on this computer's CPU: ${p.pace}. It is much faster with an NVIDIA GPU (CUDA): on an RTX 3060, Qwen3-TTS 0.6B and IndexTTS2 run at about real time`,
  oneVoiceSource: 'Give only one of voice, reference, and voiceDescription',
  modeUnsupported: (p: { modelId: string; what: string; mode: string }) => `Model ${p.modelId} does not support ${p.what} (${p.mode})`,
  modeClone: 'cloning from a reference recording',
  modeDescribe: 'creating a voice from a description',
  noReferenceTranscript: (p: { modelId: string }) => `Model ${p.modelId} does not read the transcript of the reference recording (reference.transcript)`,
  descriptionEmpty: 'The description cannot be empty',
  noPresetVoice: (p: { modelId: string; need: string }) => `Model ${p.modelId} has no preset voices; give ${p.need}`,
  noSuchVoice: (p: { modelId: string; voice: string }) => `Model ${p.modelId} has no voice ${p.voice}`,
  noDefaultVoice: (p: { modelId: string }) => `Model ${p.modelId} has no default voice; specify voice`,
  termNotInVocabulary: (p: { modelId: string; term: string }) => `Voice descriptions for model ${p.modelId} only accept words from its vocabulary: “${p.term}” is not in it`,
  onePerCategory: (p: { modelId: string; category: string }) => `Voice descriptions for model ${p.modelId} take at most one term per category (${p.category})`,
  builtinReferenceLabel: 'built-in voice recording',
  referenceUnreadable: (p: { name: string }) => `Can't read the reference recording “${p.name}”: it is missing, not a file, or not readable. Try a different recording`,
};

export type ModelsLocalSpeechMessages = typeof en;

export const ModelsLocalSpeech = defineCatalog('modelsLocalSpeech', en, { 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja, ko, es, fr, de, nl, 'pt-BR': ptBR, it, ru, pl, tr, vi });
