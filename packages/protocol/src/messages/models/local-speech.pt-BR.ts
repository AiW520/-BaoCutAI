import type { ModelsLocalSpeechMessages } from './local-speech.ts';

export const ptBR: ModelsLocalSpeechMessages = {
  cpuNote: (p: { pace: string }) => `Sintetiza na CPU deste computador, muito mais devagar que em uma GPU: ${p.pace}`,
  paceOmnivoice: 'leva cerca de 9 vezes a duração do áudio; uma frase de 10 segundos leva cerca de um minuto e meio',
  paceDefault: 'a velocidade na CPU ainda não foi medida',
  referenceTranscriptRequired: "Insira a transcrição da gravação de referência",
  oneVoiceSource: 'Forneça somente um de voice, reference e voiceDescription',
  modeUnsupported: (p) => `O modelo ${p.modelId} não oferece suporte a ${p.what} (${p.mode})`,
  modeClone: 'clonagem de uma gravação de referência', modeDescribe: 'criação de uma voz por descrição',
  noReferenceTranscript: (p) => `O modelo ${p.modelId} não lê a transcrição da gravação de referência (reference.transcript)`,
  descriptionEmpty: 'A descrição não pode ficar vazia',
  noPresetVoice: (p) => `O modelo ${p.modelId} não tem vozes predefinidas; forneça ${p.need}`,
  noSuchVoice: (p) => `O modelo ${p.modelId} não tem a voz ${p.voice}`, noDefaultVoice: (p) => `O modelo ${p.modelId} não tem voz padrão; especifique voice`,
  termNotInVocabulary: (p) => `Descrições de voz do modelo ${p.modelId} só aceitam palavras do vocabulário: “${p.term}” não está nele`,
  onePerCategory: (p) => `Descrições de voz do modelo ${p.modelId} aceitam no máximo um termo por categoria (${p.category})`,
  builtinReferenceLabel: 'gravação de voz integrada',
  referenceUnreadable: (p) => `Não é possível ler a gravação de referência “${p.name}”: está ausente, não é um arquivo ou não permite leitura. Tente outra gravação`,
};
