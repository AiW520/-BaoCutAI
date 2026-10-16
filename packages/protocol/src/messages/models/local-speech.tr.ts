import type { ModelsLocalSpeechMessages } from './local-speech.ts';

export const tr: ModelsLocalSpeechMessages = {
  cpuNote: (p: { pace: string }) => `Bu bilgisayarın CPU biriminde sentezler, GPU'ya göre çok daha yavaştır: ${p.pace}`,
  paceOmnivoice: 'sesin süresinin yaklaşık 9 katı sürer; 10 saniyelik cümle yaklaşık bir buçuk dakika sürer',
  paceDefault: 'CPU üzerindeki hızı henüz ölçülmedi',
  referenceTranscriptRequired: "Referans kaydın metnini girin",
oneVoiceSource: "Voice, reference ve voiceDescription değerlerinden yalnızca birini verin", modeUnsupported: (p) => `${p.modelId} modeli ${p.what} desteklemiyor (${p.mode})`, modeClone: 'referans kayıttan klonlama', modeDescribe: 'tariften ses oluşturma', noReferenceTranscript: (p) => `${p.modelId} modeli referans kaydının dökümünü okumaz (reference.transcript)`, descriptionEmpty: 'Tarif boş olamaz', noPresetVoice: (p) => `${p.modelId} modelinde ön ayarlı ses yok; ${p.need} verin`, noSuchVoice: (p) => `${p.modelId} modelinde ${p.voice} sesi yok`, noDefaultVoice: (p) => `${p.modelId} modelinin varsayılan sesi yok; voice belirtin`, termNotInVocabulary: (p) => `${p.modelId} modelinin ses tarifleri yalnızca söz dağarcığındaki sözcükleri kabul eder: “${p.term}” içinde yok`, onePerCategory: (p) => `${p.modelId} modelinin ses tarifleri her kategoride en fazla bir terim kabul eder (${p.category})`, builtinReferenceLabel: 'yerleşik ses kaydı', referenceUnreadable: (p) => `“${p.name}” referans kaydı okunamıyor: eksik, dosya değil veya okunabilir değil. Başka kayıt deneyin`,
};
