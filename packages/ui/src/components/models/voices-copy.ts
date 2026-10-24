import { defineMessages, live } from '@baocut/protocol';
import { zhHans } from './voices-copy.zh-Hans.ts';
import { zhHant } from './voices-copy.zh-Hant.ts';
import { ja } from './voices-copy.ja.ts';
import { ko } from './voices-copy.ko.ts';
import { es } from './voices-copy.es.ts';
import { fr } from './voices-copy.fr.ts';
import { de } from './voices-copy.de.ts';
import { nl } from './voices-copy.nl.ts';
import { ptBR } from './voices-copy.pt-BR.ts';
import { it } from './voices-copy.it.ts';
import { ru } from './voices-copy.ru.ts';
import { pl } from './voices-copy.pl.ts';
import { tr } from './voices-copy.tr.ts';
import { vi } from './voices-copy.vi.ts';

/**
 * 模型 › 语音合成 › 我的声音（设计稿 settings-voices.jsx）的文字。页标题与导语在 models-copy.ts 的 `VOICES_COPY`；
 * 这里是列表、对话框与提示。录音与「从视频里分人取一段」还没有接上，置灰的原因写成如实的一句。
 * 英文是键与类型的来源，译文在 `voices-copy.<语言>.ts`。
 */
const en = {
  myVoices: {
    offline: 'Voices appear once the Runtime is connected.',
    add: 'Add voice',
    fromFile: 'New from audio file…',
    fromFileHint: 'WAV, MP3 or FLAC, up to 20 MB; one full sentence of 5–12 seconds works best',
    importPackage: 'Import voice pack…',
    importHint: 'A .bcvoice someone exported',
    record: 'Record with microphone',
    recordWhy:
      'Recording in the app isn’t available yet: a recording has to be saved as a file before it can go to the Runtime, and that step isn’t built. Record with another app first (WAV, MP3 or FLAC), then use “New from audio file”.',
    /** `recordWhy` 加上导入音色包为什么不可用（窗口不能打开文件对话框时）。 */
    recordWhyNoPicker:
      'Recording in the app isn’t available yet: a recording has to be saved as a file before it can go to the Runtime, and that step isn’t built. Record with another app first (WAV, MP3 or FLAC), then use “New from audio file”. Importing a voice pack: this window can’t open the system file dialog; use the desktop app.',
    noPicker: 'This window can’t open the system file dialog; use the desktop app.',
    pickAudioTitle: 'Choose a reference recording',
    pickAudioFilter: 'Audio (WAV, MP3, FLAC)',
    pickPackageTitle: 'Choose a voice pack',
    pickPackageFilter: 'Voice pack',
    pickButton: 'Choose',
    notAudio: 'Reference recordings must be WAV, MP3 or FLAC files.',
    imported: (name: string) => `Imported “${name}” · available when generating speech and voice-overs`,
    importFailed: (text: string) => `Couldn't import: ${text}`,
    foot:
      'A voice = a reference recording + what it says + a consent statement. The reference recording stays on this computer; an exported voice pack (name.bcvoice) includes the recording and can be sent to others to import, but clones don’t travel with it. ' +
      'Voices without a statement on whether they’re the speaker’s own are never uploaded to any third party.',
    // 一行
    play: (name: string) => `Preview ${name}`,
    stop: (name: string) => `Stop previewing ${name}`,
    playFailed: (text: string) => `Couldn't preview: ${text}`,
    more: (name: string) => `More · ${name}`,
    edit: 'Edit…',
    cloneTo: (label: string) => `Upload to ${label} to clone…`,
    recloneTo: (label: string) => `Upload to ${label} again…`,
    recloneHint: 'The reference recording changed, so the old clone is out of date',
    removeClone: (label: string) => `Delete clone from ${label}…`,
    export: 'Export voice pack…',
    remove: 'Delete…',
    cloning: (label: string) => `Uploading to ${label} to clone…`,
    cloneFailed: (label: string, text: string) => `The last clone on ${label} didn't succeed: ${text}`,
    loadingMeta: 'Loading…',
    // 新建与编辑
    createTitle: 'New voice',
    editTitle: (name: string) => `Edit “${name}”`,
    referenceFile: (file: string) => `Reference recording: ${file}`,
    name: 'Name',
    language: 'Language',
    languageHint: 'The language spoken in the reference recording',
    transcript: 'Transcript',
    transcriptHint: 'What’s said in the reference recording. Some engines need it to clone; leave it empty if you’re not sure.',
    consentHint: 'You can save without checking this, but the voice won’t be uploaded to any third party for cloning.',
    save: 'Save as voice',
    saveEdit: 'Save',
    cancel: 'Cancel',
    loading: 'Loading voice…',
    loadFailed: (text: string) => `Couldn't load this voice: ${text}`,
    saved: (name: string) => `Saved “${name}” · available when generating speech and voice-overs`,
    updated: (name: string) => `Saved “${name}”`,
    unchanged: 'No changes',
    // 克隆
    uploadTitle: (label: string) => `Upload to ${label}?`,
    upload: 'Upload',
    cloneStarted: (label: string) => `Uploading to ${label} · progress is in Background tasks`,
    cloneRejected: (text: string) => `Couldn't start cloning: ${text}`,
    removeCloneTitle: (label: string) => `Delete the clone from ${label}?`,
    removeCloneBody: (label: string) =>
      `${label} will be asked to delete this cloned voice. To use this voice on ${label} afterwards, you’ll need to upload it again.`,
    removeCloneConfirm: 'Delete clone',
    cloneRemoved: (label: string) => `Deleted the clone from ${label}`,
    cloneGoneRemote: (label: string) => `${label} no longer has this clone; the record on this computer was cleared too`,
    cloneRemoveFailed: (text: string) => `Couldn't delete the clone: ${text}`,
    // 导出
    exportTitle: 'Export voice pack',
    exportButton: 'Export',
    exported: (path: string) => `Exported to ${path}`,
    exportFailed: (text: string) => `Couldn't export: ${text}`,
    exportExists: 'OpenFox doesn’t overwrite existing files. Choose another name or location and export again.',
    /** 目标已存在时的整句（`exportFailed` 加上 `exportExists`）。 */
    exportFailedExists: (text: string) =>
      `Couldn't export: ${text}. OpenFox doesn’t overwrite existing files. Choose another name or location and export again.`,
    // 删除
    deleteTitle: (name: string) => `Delete “${name}”?`,
    deleteConfirm: 'Delete',
    deleted: (name: string) => `Deleted “${name}”`,
    deleteFailed: (text: string) => `Couldn't delete: ${text}`,
    localOnlyTitle: (label: string) => `The clone on ${label} wasn't deleted`,
    localOnlyBody: (label: string, text: string) =>
      `${text}\n\nThe voice is still here. You can try again later, or delete only the record and voice on this computer. The clone in your ${label} account will then remain, and you’ll need to delete it on ${label} yourself.`,
    localOnlyConfirm: 'Delete only on this computer',
    later: 'Try again later',
  },
  /** 我的声音 › 克隆新音色（设计稿 settings-voice-capture.jsx）、补录授权声明、行上的 ID 与模型页那一行。 */
  capture: {
    newVoice: 'Clone a new voice',
    newVoiceHint: 'Record or upload a sample, then pick the models it’s for',
    back: 'My voices',
    steps: 'Steps',
    stepModels: 'Choose models',
    stepSample: 'Record a sample',
    stepConsent: 'Consent statement',
    stepSave: 'Save',
    modelsLede:
      'Pick the models this voice is for. Local engines only need the sample and keep the same speaker with a fixed seed; cloud providers get the sample to create a clone and keep its voice ID. Some providers also need the speaker to read a consent statement. You can add any of this later from the voice’s ⋯ menu.',
    local: 'On this computer',
    cloud: 'Cloud',
    needsConsent: 'needs consent statement',
    notConnected: 'not connected',
    noLocal: 'No installed local model can clone yet',
    noCloud: 'No provider here can clone',
    modelsNote:
      'You can pick providers without a key too: the sample is kept, and the clone is created the first time you use it after connecting. Picking nothing is fine as well.',
    sampleLede: (min: number, good: number, target: number) =>
      `About ${target} seconds of one person speaking in a quiet room. ${min} seconds is enough to save; cloud providers need ${good} seconds or more. Recording stops at ${target} seconds.`,
    language: 'Language',
    scriptTail: (target: number) => `After these lines, keep talking (introduce yourself, describe your day) until the timer reaches ${target} seconds.`,
    source: 'Source',
    mic: 'Microphone',
    upload: 'Upload a file',
    device: 'Input device',
    defaultDevice: 'System default',
    level: 'Input level',
    start: 'Start recording',
    stop: 'Stop',
    again: 'Record again',
    otherFile: 'Choose another',
    play: 'Play back',
    stopPlay: 'Stop playback',
    progress: 'Recording progress',
    needMore: (seconds: string) => `${seconds} s more needed`,
    enoughBest: (target: string) => `Enough · best at ${target}`,
    left: (seconds: string) => `${seconds} s left`,
    autoStop: 'Stops automatically',
    stoppedAtMax: (max: number) => `Stopped at ${max} seconds · play it back and record again if you’re not happy`,
    checkTake: 'Play it back: listen for noise or misread words, and record again if you’re not happy.',
    pickFile: 'Choose an audio file',
    uploadHint: (min: number, target: number) => `WAV, MP3, M4A or FLAC · ${min} s or more, ${target} s is best · one person speaking, no music`,
    trimmed: (max: number) => `Longer than ${max} seconds, so only the first ${max} seconds are used`,
    reading: 'Reading the audio…',
    readFailed: (message: string) => `Couldn’t read this audio: ${message}`,
    micFailed: (message: string) => `Couldn’t start the microphone: ${message}`,
    micDenied: 'OpenFox can’t use the microphone. Allow it in system settings, or upload a recording instead.',
    sampleShort: (seconds: string, min: number) => `Only ${seconds} seconds; at least ${min} seconds are needed. Record again.`,
    sampleLocal: 'Enough for local engines · a little longer and cloud providers can use it too',
    sampleOk: (target: number) => `Enough · ${target} seconds is best`,
    sampleBest: 'Enough',
    consentLede: (names: string) =>
      `${names} needs the same person to read a fixed consent statement, and checks that it matches the sample. Recording with the same microphone in the same room helps it pass.`,
    consentLedeAny:
      'Some providers need the same person to read a fixed consent statement and check that it matches the sample. Recording with the same microphone in the same room helps it pass.',
    recommended: 'recommended',
    moreLanguages: 'More languages',
    custom: 'Custom sentence',
    customLabel: 'Custom consent statement',
    customPlaceholder: 'Write a sentence granting consent, then read it aloud',
    customWarning: 'Providers that check consent only accept the official text, so a custom sentence won’t pass. It’s kept for other providers.',
    flaky: 'Officially supported, but it often fails the check in practice. If you’re not in a hurry, read the English one.',
    untested: 'Officially supported, not tested yet. If you’re not in a hurry, read the English one.',
    consentHint: 'Read the whole sentence in one go; no need to rush',
    consentShort: (seconds: string) => `Only ${seconds} seconds · read the whole sentence`,
    consentGood: 'Play it back; reading the whole sentence clearly is enough',
    skipConsent: 'Skip for now and save',
    name: 'Name',
    namePlaceholder: 'My voice',
    seed: 'Seed',
    reroll: 'New seed',
    rerollLabel: (engine: string) => `New seed for ${engine}`,
    seedNote:
      'Local engines have no voice ID: the same reference plus this seed gives the same speaker every time, one seed per engine. Cloud providers keep the voice ID they return.',
    landingLocal: (names: string) => `${names} · this sample is the reference, each with its own fixed seed`,
    landingCloud: 'The sample is uploaded to create a clone the first time you use it · keeps the voice ID',
    landingCloudOff: 'Not connected · the clone is created the first time you use it after connecting',
    landingConsentMissing: 'Needs the consent statement before it can be used',
    prev: 'Back',
    next: 'Next',
    save: 'Save voice',
    cancel: 'Cancel',
    footModels: (names: string) => `For ${names}`,
    footModelsNone: 'Nothing picked: the voice is still saved and can be used later',
    footSample: 'The sample is the base of this voice: cloud providers clone from all of it, local engines use it as the reference',
    footSampleTaken: (seconds: string) => `Sample ${seconds} s`,
    footConsent: (names: string) => `You can skip this and save; ${names} can’t be used until it’s recorded`,
    footSave: (sample: string) => `Saves the ${sample} s sample`,
    footSaveConsent: (sample: string, consent: string) => `Saves the ${sample} s sample and the ${consent} s consent recording`,
    saved: (name: string) => `Saved “${name}”`,
    saveFailed: (message: string) => `Couldn’t save: ${message}`,
    consentTitle: (name: string) => `Record consent statement · ${name}`,
    consentTitleRedo: (name: string) => `Re-record consent statement · ${name}`,
    saveClip: 'Save recording',
    sameSpeaker: (names: string) =>
      `It must be the same person as in the sample. If the sample came from a video, the speaker has to record this part, otherwise ${names} can’t be used.`,
    sameSpeakerAny: 'It must be the same person as in the sample. If the sample came from a video, the speaker has to record this part.',
    consentSaved: (name: string) => `Saved the consent statement for “${name}”`,
    ids: 'Seeds and voice IDs',
    seedGroup: (value: number, engines: string) => `Seed ${value} (${engines})`,
    otherEngines: 'other local engines',
    allEngines: 'local engines',
    voiceIdStale: 'reference changed',
    consentClip: (language: string, seconds: string) => `Consent statement ${language} ${seconds} s`,
    consentClipNoLength: (language: string) => `Consent statement ${language}`,
    customLanguage: 'custom',
    reseed: (engine: string) => `Change seed · ${engine}`,
    reseedNow: (value: number) => `Now ${value}`,
    recordConsent: 'Record consent statement',
    redoConsent: 'Re-record consent statement',
    consentMenuHint: 'Needed by providers that check the speaker’s consent',
    reseeded: (engine: string, value: number) => `${engine} now uses seed ${value}`,
    reseedFailed: (message: string) => `Couldn’t change the seed: ${message}`,
    lineLabel: 'Cloned voices',
    lineNone: 'None yet',
    lineNoneCloud: 'None created with this provider yet',
    lineNew: 'Clone a new voice',
    lineFirst: 'Clone one',
    lineSeed: (value: number) => `seed ${value}`,
    lineSeedRandom: 'random seed',
    handoffFromModel: (name: string) => `From the “${name}” models page · you can go back once it’s saved`,
    handoffSavedModel: (name: string) => `Saved · go back to “${name}”`,
  },
};

export type VoicesMessages = typeof en;

const M = defineMessages(en, { 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja, ko, es, fr, de, nl, 'pt-BR': ptBR, it, ru, pl, tr, vi });

export const MY_VOICES_COPY = live(() => M.myVoices);
export const CAPTURE_COPY = live(() => M.capture);
