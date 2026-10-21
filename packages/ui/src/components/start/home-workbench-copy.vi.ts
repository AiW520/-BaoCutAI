import { pluralForm } from '@baocut/protocol';
import type { WorkbenchMessages } from './home-workbench-copy.ts';

export const vi: WorkbenchMessages = {
  eyebrow: "Tuzi · Không gian sáng tạo",
  title: "Biến ý tưởng thành video tiếp theo.",
  intro: "Mô tả ý tưởng, thêm tư liệu hoặc tiếp tục công việc trước đó.",
  recentTitle: "Dự án gần đây",
  recentHint: "Tiếp tục từ nơi bạn dừng lại",
  browse: "Xem mọi tác phẩm",
  continueVideo: "Tiếp tục chỉnh sửa",
  continueSession: "Tiếp tục phiên",
  startSession: "Bắt đầu phiên",
  empty: "Tạo dự án để quản lý video và các phiên sáng tạo cùng nhau.",
  videos: (n: number) => `${n} ${pluralForm('vi', n, { other: "video" })}`,
  sessions: (n: number) => `${n} ${pluralForm('vi', n, { other: "phiên" })}`,
};
