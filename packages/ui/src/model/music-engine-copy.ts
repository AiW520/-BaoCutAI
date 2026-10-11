import { defineMessages } from '@baocut/protocol';
import { zhHans } from './music-engine-copy.zh-Hans.ts';
import { zhHant } from './music-engine-copy.zh-Hant.ts';
import { ja } from './music-engine-copy.ja.ts';
import { ko } from './music-engine-copy.ko.ts';
import { es } from './music-engine-copy.es.ts';
import { fr } from './music-engine-copy.fr.ts';
import { de } from './music-engine-copy.de.ts';
import { nl } from './music-engine-copy.nl.ts';
import { ptBR } from './music-engine-copy.pt-BR.ts';
import { it } from './music-engine-copy.it.ts';
import { ru } from './music-engine-copy.ru.ts';
import { pl } from './music-engine-copy.pl.ts';
import { tr } from './music-engine-copy.tr.ts';
import { vi } from './music-engine-copy.vi.ts';

/** 设置 › 音乐生成 › 音乐引擎（audio.cpp）一行的文案（英文是键与类型的来源，译文在 `music-engine-copy.<语言>.ts`）。 */
const en = {
  heading: 'Music engine',
  badge: {
    checking: 'Checking',
    unknown: "Couldn't check",
    install: 'Not installed',
    installing: 'Installing',
    blocked: 'Unavailable',
    broken: "Can't run",
    ready: 'Installed',
  },
  checkingBody: 'Checking whether the engine is on this computer…',
  unknownBody: (message: string) => `Couldn't check the engine: ${message}`,
  installBody: 'Music models run on the audio.cpp engine on this computer. Install it once before generating music.',
  vulkanNote: 'On Windows and Linux it needs a Vulkan graphics driver.',
  installingBody: 'Downloading and verifying the engine…',
  readyBody: 'Music models use this engine to generate on this computer.',
  blockedWhy: 'No download is available for this computer.',
  blockedBody: (why: string) => `The engine can't be installed here. ${why}`,
  brokenBody: (reason: string | null, remedy: string | null) =>
    [`The engine can't run${reason ? `: ${reason}` : '.'}`, remedy].filter(Boolean).join(' '),
  install: 'Install engine',
  reinstall: 'Reinstall engine',
  recheck: 'Check again',
  pick: 'Use my own build…',
  pickTitle: 'Choose audiocpp_cli',
  pickButton: 'Use this engine',
  progress: 'Installing the music engine',
  factVersion: (version: string, size: string | null) => (size ? `audio.cpp ${version} · ${size}` : `audio.cpp ${version}`),
  factSource: (license: string | null, host: string | null) =>
    [license ? `${license} license` : null, host ? `Downloaded from ${host} and checked with SHA-256` : null].filter(Boolean).join(' · '),
  installed: (version: string | null) => (version ? `audio.cpp ${version} installed` : 'Music engine installed'),
  installFailed: (message: string) => `Couldn't install the engine: ${message}`,
  installFailedFallback: 'The download didn’t finish',
  pickFailed: (message: string) => `Couldn't use this engine: ${message}`,
  webNote: 'Install the audio.cpp engine from the BaoCut desktop app, or run `baocut external-tools install audiocpp` on the computer running BaoCut.',
};

export type MusicEngineMessages = typeof en;

export const M = defineMessages(en, { 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja, ko, es, fr, de, nl, 'pt-BR': ptBR, it, ru, pl, tr, vi });
