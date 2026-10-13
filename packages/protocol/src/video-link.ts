/*
 * 回答里的「视频某一刻」链接（产品设计 §3.2.2；创作辅助集成设计 §2.9、§3.9）：`/videos/<videoId>?t=<秒>`，秒是时间线（序列时钟）上的。
 * 地址由 Runtime 在工具结果里给（只给按当前版本还在时间线上的位置），智能体照抄、不自己拼；界面与 Runtime 用同一份写法与解析。
 */

/** 时间线上这一刻的链接；秒取到毫秒。 */
export function videoTimeHref(videoId: string, seconds: number): string {
  return `/videos/${encodeURIComponent(videoId)}?t=${Math.round(Math.max(0, seconds) * 1000) / 1000}`;
}

/** 严格解析 `videoTimeHref` 的写法；别的形状（多余参数、负数、空 ID）null。 */
export function parseVideoTimeHref(href: string): { videoId: string; seconds: number } | null {
  const match = /^\/videos\/([A-Za-z0-9_%-]+)\?t=(\d+(?:\.\d+)?)$/.exec(href);
  if (!match) return null;
  let videoId: string;
  try {
    videoId = decodeURIComponent(match[1]!);
  } catch {
    return null;
  }
  const seconds = Number(match[2]);
  return videoId && Number.isFinite(seconds) ? { videoId, seconds } : null;
}
