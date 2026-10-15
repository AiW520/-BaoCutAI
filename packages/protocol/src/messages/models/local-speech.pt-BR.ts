import type { ModelsLocalSpeechMessages } from './local-speech.ts';

export const ptBR: ModelsLocalSpeechMessages = {
  referenceTranscriptRequired: "Insira a transcrição da gravação de referência",
  paceQwen06: 'cerca de 7 vezes mais lento que o tempo real; uma frase de 10 segundos leva pouco mais de um minuto',
  paceQwen17: 'espera-se que seja mais lento que o 0.6B (cerca de 7 vezes mais lento que o tempo real); este não foi medido',
  paceIndexTts2: '30–60 vezes mais lento que o tempo real; uma frase de 10 segundos leva de cinco a dez minutos',
  paceIndexTts25: 'espera-se que seja semelhante ao IndexTTS2 (30–60 vezes mais lento que o tempo real); este não foi medido',
  paceDefault: 'a velocidade não foi medida',
  cpuNote: (p) => `Sintetiza na CPU deste computador usando somente alguns núcleos: ${p.pace}. É muito mais rápido com uma GPU NVIDIA (CUDA): em uma RTX 3060, mais ou menos em tempo real`,
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
