import { pluralForm } from '@baocut/protocol';
import type { WorkbenchMessages } from './home-workbench-copy.ts';

export const ptBR: WorkbenchMessages = {
  eyebrow: "Tuzi · Espaço criativo",
  title: "Transforme uma ideia no seu próximo vídeo.",
  intro: "Descreva uma ideia, adicione mídia ou continue seu trabalho.",
  recentTitle: "Projetos recentes",
  recentHint: "Continue de onde parou",
  browse: "Ver todos os trabalhos",
  continueVideo: "Continuar edição",
  continueSession: "Continuar sessão",
  startSession: "Iniciar sessão",
  empty: "Crie um projeto para reunir seus vídeos e sessões criativas.",
  videos: (n: number) => `${n} ${pluralForm('pt-BR', n, { one: "vídeo", other: "vídeos" })}`,
  sessions: (n: number) => `${n} ${pluralForm('pt-BR', n, { one: "sessão", other: "sessões" })}`,
};
