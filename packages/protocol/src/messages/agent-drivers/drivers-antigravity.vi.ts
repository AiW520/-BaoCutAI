import type { DriversAntigravityMessages } from './drivers-antigravity.ts';

export const vi: DriversAntigravityMessages = {
  invalidOutput: "Antigravity trả về dữ liệu luồng không hợp lệ",
  invalidModels: "Antigravity trả về danh sách mô hình không hợp lệ",
  resumeMismatch: "Antigravity đã khôi phục một cuộc trò chuyện khác",
  mcpUnavailable: "Antigravity không thể nhận cấu hình MCP tạm thời của BaoCut. Không thể dùng công cụ BaoCut trong phiên này.",
  effortUnsupported: "Antigravity chọn mức suy luận qua ID mô hình; hãy chọn một mô hình",
  turnFailed: "Lượt Antigravity thất bại",
  denied: (p) => `Chính sách riêng của Antigravity đã từ chối các thao tác này: ${p.actions}`,
  fullAccessOnly: (p) => `Antigravity không thể hỏi trước từng hành động nên BaoCut chỉ chạy được ở chế độ “${p.mode}”: không hỏi bạn trước khi chạy lệnh hoặc sửa tệp.`,
};
