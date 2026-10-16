import type { ModelsLocalSpeechMessages } from './local-speech.ts';

export const vi: ModelsLocalSpeechMessages = {
  cpuNote: (p: { pace: string }) => `Tổng hợp trên CPU của máy tính này, chậm hơn nhiều so với GPU: ${p.pace}`,
  paceOmnivoice: 'mất khoảng 9 lần thời lượng âm thanh nên câu dài 10 giây mất khoảng một phút rưỡi',
  paceDefault: 'chưa đo tốc độ trên CPU',
  referenceTranscriptRequired: "Nhập bản chép lời của bản ghi tham chiếu",
oneVoiceSource: 'Chỉ cung cấp một trong voice, reference và voiceDescription', modeUnsupported: (p) => `Mô hình ${p.modelId} không hỗ trợ ${p.what} (${p.mode})`, modeClone: 'nhân bản từ bản ghi tham chiếu', modeDescribe: 'tạo giọng từ mô tả', noReferenceTranscript: (p) => `Mô hình ${p.modelId} không đọc bản chép lời của bản ghi tham chiếu (reference.transcript)`, descriptionEmpty: 'Mô tả không được rỗng', noPresetVoice: (p) => `Mô hình ${p.modelId} không có giọng thiết lập sẵn; cung cấp ${p.need}`, noSuchVoice: (p) => `Mô hình ${p.modelId} không có giọng ${p.voice}`, noDefaultVoice: (p) => `Mô hình ${p.modelId} không có giọng mặc định; chỉ định voice`, termNotInVocabulary: (p) => `Mô tả giọng cho mô hình ${p.modelId} chỉ nhận từ trong từ vựng: “${p.term}” không có trong đó`, onePerCategory: (p) => `Mô tả giọng cho mô hình ${p.modelId} nhận tối đa một thuật ngữ mỗi loại (${p.category})`, builtinReferenceLabel: 'bản ghi giọng có sẵn', referenceUnreadable: (p) => `Không đọc được bản ghi tham chiếu “${p.name}”: bị thiếu, không phải tệp hoặc không thể đọc. Thử bản ghi khác`,
};
