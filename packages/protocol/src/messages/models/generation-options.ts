import { defineCatalog } from '../../message-ref.ts';
import { zhHans } from './generation-options.zh-Hans.ts';
import { zhHant } from './generation-options.zh-Hant.ts';
import { ja } from './generation-options.ja.ts';
import { ko } from './generation-options.ko.ts';
import { es } from './generation-options.es.ts';
import { fr } from './generation-options.fr.ts';
import { de } from './generation-options.de.ts';
import { nl } from './generation-options.nl.ts';
import { ptBR } from './generation-options.pt-BR.ts';
import { it } from './generation-options.it.ts';
import { ru } from './generation-options.ru.ts';
import { pl } from './generation-options.pl.ts';
import { tr } from './generation-options.tr.ts';
import { vi } from './generation-options.vi.ts';

/** `packages/models/src/generation-options.ts` 给人看的文字：语音合成与文生图的参数检查。 */
const en = {
  notLocalOnly: (p: { modelId: string; key: string }) => `Model ${p.modelId} doesn't accept ${p.key} (only local models do)`,
  textEmpty: "Text can't be empty",
  textTooLong: (p: { length: number; modelId: string; limit: number }) => `The text has ${p.length} characters, over the ${p.limit}-character limit per call of model ${p.modelId}. Submit it in parts.`,
  noDefaultVoice: (p: { modelId: string }) => `Model ${p.modelId} has no default voice; specify voice`,
  noSuchVoice: (p: { modelId: string; voice: string }) => `Model ${p.modelId} has no voice ${p.voice}`,
  badLanguageTag: (p: { tag: string }) => `Not a valid BCP 47 language tag: ${p.tag}`,
  languageUnsupported: (p: { modelId: string; language: string }) => `Model ${p.modelId} doesn't support language ${p.language}`,
  formatUnsupported: (p: { modelId: string; format: string }) => `Model ${p.modelId} doesn't output ${p.format}`,
  noInstructions: (p: { modelId: string }) => `Model ${p.modelId} doesn't accept tone instructions (instructions)`,
  noSpeed: (p: { modelId: string }) => `Model ${p.modelId} doesn't accept a speaking rate (speed)`,
  speedRange: (p: { min: number; max: number }) => `Speaking rate must be between ${p.min} and ${p.max}`,
  knobUnsupported: (p: { modelId: string; key: string }) => `Model ${p.modelId} doesn't accept ${p.key}`,
  knobRange: (p: { key: string; min: number; max: number }) => `${p.key} must be between ${p.min} and ${p.max}`,
  promptEmpty: "Prompt can't be empty",
  promptTooLong: (p: { length: number; modelId: string; limit: number }) => `The prompt has ${p.length} characters, over the ${p.limit}-character limit of model ${p.modelId}`,
  aspectUnsupported: (p: { modelId: string; ratio: string }) => `Model ${p.modelId} doesn't support aspect ratio ${p.ratio}`,
  sizeUnsupported: (p: { modelId: string; size: string }) => `Model ${p.modelId} doesn't support size ${p.size}`,
  maxCount: (p: { modelId: string; max: number }) => `Model ${p.modelId} generates at most ${p.max} images at a time`,
  noSteps: (p: { modelId: string }) => `Model ${p.modelId} doesn't accept steps (only local models do)`,
  stepsRange: (p: { min: number; max: number }) => `steps must be a whole number between ${p.min} and ${p.max}`,
  stepsFixed: (p: { modelId: string; steps: number }) => `Model ${p.modelId} only runs at ${p.steps} steps; leave steps out or pass ${p.steps}`,
  noSeed: (p: { modelId: string }) => `Model ${p.modelId} doesn't accept seed`,
  styleEmpty: 'Style can\'t be empty',
  styleTooLong: (p: { length: number; modelId: string; limit: number }) => `The style has ${p.length} characters, over the ${p.limit}-character limit of model ${p.modelId}`,
  lyricsEmpty: 'A song needs lyrics; use mode instrumental for a track without vocals',
  lyricsTooLong: (p: { length: number; modelId: string; limit: number }) => `The lyrics have ${p.length} characters, over the ${p.limit}-character limit of model ${p.modelId}`,
  lyricsNotInstrumental: 'Instrumental mode takes no lyrics',
  modeUnsupported: (p: { modelId: string; mode: string }) => `Model ${p.modelId} doesn't support mode ${p.mode}`,
  durationRange: (p: { modelId: string; max: number }) => `Duration must be a positive number of seconds, at most ${p.max} for model ${p.modelId}`,
  targetOverMax: 'targetDurationSec can\'t exceed maxDurationSec',
  planningUnsupported: (p: { modelId: string; planning: string; options: string }) => `Model ${p.modelId} doesn't support planning ${p.planning} (options: ${p.options})`,
  imagesUnsupported: (p: { modelId: string }) => `Model ${p.modelId} doesn't take input images`,
  imagesTooMany: (p: { modelId: string; count: number; max: number }) => `Model ${p.modelId} takes at most ${p.max} input images; ${p.count} were given`,
  img2imgUnsupported: (p: { modelId: string }) => `Model ${p.modelId} can't redraw from an image (imageMode img2img)`,
  img2imgCount: (p: { count: number }) => `With imageMode img2img the number of images follows the input images (${p.count}); leave count out`,
  strengthRange: (p: { min: number; max: number }) => `strength must be between ${p.min} and ${p.max}`,
  imageTooLarge: (p: { name: string; modelId: string; limitMb: string }) => `Input image ${p.name} is over the ${p.limitMb} MB limit of model ${p.modelId}`,
  imagesTooLarge: (p: { modelId: string; limitMb: string }) => `The input images add up to more than ${p.limitMb} MB, the limit of model ${p.modelId}`,
  imageUnreadable: (p: { name: string }) => `Can't read input image ${p.name}`,
  imageFormatUnsupported: (p: { name: string }) => `Input image ${p.name} isn't a PNG, JPEG or WebP file`,
  imageChanged: (p: { name: string }) => `Input image ${p.name} changed after the task was submitted`,
};

export type ModelsGenerationOptionsMessages = typeof en;

export const ModelsGenerationOptions = defineCatalog('modelsGenerationOptions', en, { 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja, ko, es, fr, de, nl, 'pt-BR': ptBR, it, ru, pl, tr, vi });
