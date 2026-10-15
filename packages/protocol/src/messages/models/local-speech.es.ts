import type { ModelsLocalSpeechMessages } from './local-speech.ts';
export const es: ModelsLocalSpeechMessages = {
  referenceTranscriptRequired: "Introduce la transcripción de la grabación de referencia",
 paceQwen06: 'unas 7 veces más lento que en tiempo real, por lo que una frase de 10 segundos tarda algo más de un minuto',
 paceQwen17: 'se espera que sea más lento que 0.6B (unas 7 veces más lento que en tiempo real); este no se ha medido',
 paceIndexTts2: '30–60 veces más lento que en tiempo real, por lo que una frase de 10 segundos tarda de cinco a diez minutos',
 paceIndexTts25: 'se espera que sea similar a IndexTTS2 (30–60 veces más lento que en tiempo real); este no se ha medido',
 paceDefault: 'su velocidad no se ha medido',
 cpuNote: (p) => `Sintetiza en la CPU de este ordenador usando solo unos pocos núcleos: ${p.pace}. Es mucho más rápido con una GPU NVIDIA (CUDA): en una RTX 3060, más o menos en tiempo real`,
 oneVoiceSource: 'Proporciona solo uno de voice, reference y voiceDescription', modeUnsupported: (p) => `El modelo ${p.modelId} no admite ${p.what} (${p.mode})`, modeClone: 'clonar a partir de una grabación de referencia', modeDescribe: 'crear una voz a partir de una descripción',
 noReferenceTranscript: (p) => `El modelo ${p.modelId} no lee la transcripción de la grabación de referencia (reference.transcript)`, descriptionEmpty: 'La descripción no puede estar vacía',
 noPresetVoice: (p) => `El modelo ${p.modelId} no tiene voces predefinidas; proporciona ${p.need}`, noSuchVoice: (p) => `El modelo ${p.modelId} no tiene la voz ${p.voice}`, noDefaultVoice: (p) => `El modelo ${p.modelId} no tiene una voz predeterminada; especifica voice`,
 termNotInVocabulary: (p) => `Las descripciones de voz del modelo ${p.modelId} solo aceptan palabras de su vocabulario: «${p.term}» no está en él`, onePerCategory: (p) => `Las descripciones de voz del modelo ${p.modelId} admiten como máximo un término por categoría (${p.category})`,
 builtinReferenceLabel: 'grabación de voz integrada', referenceUnreadable: (p) => `No se puede leer la grabación de referencia «${p.name}»: falta, no es un archivo o no se puede leer. Prueba otra grabación`,
};
