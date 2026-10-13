import type { RcSemanticMessages } from './rc-semantic.ts';

export const vi: RcSemanticMessages = {
  modelNotInstalled: 'Tìm kiếm ngữ nghĩa cần mô hình tìm kiếm văn bản. Hãy cài trong Cài đặt › Chỉ mục ngữ nghĩa',
  modelUnavailable: 'Không chạy được mô hình tìm kiếm văn bản',
  profileIncompatible: 'Chỉ mục ngữ nghĩa được tạo bằng một mô hình khác và cần tạo lại',
  inputTooLong: (p) => `Truy vấn quá dài (hơn ${p.max} ký tự)`,
  sourceMissing: 'Nguồn của kết quả này không còn nữa',
  indexNotReady: 'Chỉ mục ngữ nghĩa chưa sẵn sàng. Hãy tạo trong Cài đặt › Chỉ mục ngữ nghĩa',
  indexPartial: 'Chỉ mục ngữ nghĩa chỉ bao phủ một phần phạm vi này; kết quả có thể chưa đủ',
  staleRevision: 'Video đã thay đổi sau khi tìm thấy kết quả này',
  cursorStale: 'Kết quả đã thay đổi. Hãy tìm lại',
  searchCancelled: 'Đã hủy tìm kiếm',
  resourceExhausted: 'Hiện không đủ bộ nhớ hoặc năng lực tính toán để chạy mô hình tìm kiếm',
  appearanceUnavailable: 'Chưa thể tìm những gì nhìn thấy trong video hoàn chỉnh',
  channelUnavailable: 'Chưa thể tìm hình ảnh và âm thanh',
  storeUnavailable: 'Không mở được chỉ mục ngữ nghĩa',
  hitInvalid: 'Không tìm thấy kết quả này. Hãy tìm lại',
  needsTextChannel: 'Hãy chọn nội dung lời nói: hiện chỉ tìm được những gì được nói',
};
