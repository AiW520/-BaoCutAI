import type { DocsMessages } from './docs-copy.ts';

const list = (labels: readonly string[]) => new Intl.ListFormat('vi', { type: 'conjunction' }).format(labels);

export const vi: DocsMessages = {
  tabs: (n) => `${n} thẻ`,
  paneLabel: (name) => `Tài liệu cộng tác “${name}”`,
  frameTitle: (name) => `Trình chỉnh sửa tài liệu cộng tác: ${name}`,
  opening: 'Đang mở tài liệu cộng tác…',
  unavailableTitle: 'Không dùng được trình chỉnh sửa tài liệu cộng tác',
  unavailableBody: 'Bản BaoCut này không kèm trình chỉnh sửa tài liệu cộng tác. Các tệp của tài liệu vẫn nằm trong thư mục của chúng.',
  openFailed: (reason) => `Không mở được tài liệu cộng tác: ${reason}`,
  open: 'Mở tài liệu cộng tác',
  openCard: (name) => `Mở tài liệu cộng tác “${name}”`,
  openInEditor: 'Mở bằng trình chỉnh sửa tài liệu cộng tác',
  comment: 'Bình luận',
  ask: 'Yêu cầu',
  token: (n) => `Chú thích tài liệu · ${n}`,
  added: (token) => `Đã thêm vào cuộc trò chuyện · ${token}`,
  removeAll: 'Gỡ mọi chú thích tài liệu',
  removeOne: (n) => `Gỡ chú thích ${n}`,
  item: (n, label, text) => `Chú thích ${n}, ${label}: ${text}`,
  empty: 'Bình luận này trống nên chưa được thêm vào cuộc trò chuyện',
  tooLong: (max) => `Mỗi chú thích dài tối đa ${max} ký tự`,
  tooMany: (max) => `Mỗi tin nhắn mang tối đa ${max} chú thích tài liệu. Hãy gửi những chú thích này trước.`,
  noConversation: 'Thẻ này chưa thuộc phiên nào. Gửi một tin nhắn để bắt đầu phiên, rồi gửi bình luận cho Agent.',
  message: 'Hãy xử lý các bình luận và yêu cầu này trong tài liệu.',
  flushFailed: (names) =>
    `Thay đổi trên tài liệu cộng tác ${list(names.map((n) => `“${n}”`))} chưa lưu xong nên tin nhắn chưa được gửi. Hãy thử lại hoặc gỡ chú thích tài liệu trước.`,
};
