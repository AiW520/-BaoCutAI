/**
 * 幻灯片编辑器（iframe 里的宿主 shim）与 BaoCut 界面（父窗口）之间的 postMessage 协议（docs/design/slides §5、§8.2）。
 * 两边都只认这里列出的消息类型；消息里只有标注要的位置与文字，不带 deck 文件的内容。
 *
 * - iframe → 父窗口用 `targetOrigin: "*"`（桌面端父页面是 file://，origin 为 null），父窗口按
 *   `event.source === iframe.contentWindow` 认消息；父窗口 → iframe 指定编辑器地址的 origin，shim 按
 *   `event.source === window.parent` 认消息。
 * - 本文件不依赖 DOM 与 Node，界面与编辑器两边都能导入（`@baocut/slides/editor-messages`）。
 */

/** 批注框旁边要的位置：iframe 视口里的坐标（CSS 像素）。 */
export interface EditorPoint {
  x: number;
  y: number;
}

/** 运行时为一处标注给出的描述。`label` 给人看，`detail` 给模型看，`area` 表示框选的区域。 */
export interface AnchorDescription {
  label: string;
  detail?: string;
  area?: boolean;
}

/** 编辑器里画编号标记用的一条标注：`n` 是在整份草稿里的序号（与 composer 列表一致）。 */
export interface EditorThread {
  id: string;
  anchor: string;
  n: number;
}

/** iframe → 父窗口。 */
export type EditorToHostMessage =
  /** 运行时启动了；`canEdit` 为 false 时编辑器只读（Web 服务的只读模式）。 */
  | { type: 'slides:ready'; canEdit: boolean }
  /** 标注模式开关变了（运行时自己的按钮、快捷键 C，或父窗口的 `slides:set-mode`）。 */
  | { type: 'slides:mode'; on: boolean }
  /** 用户点了一个元素或框了一块区域：父窗口在 `point` 旁弹出批注框，并回 `slides:compose-result`。 */
  | ({ type: 'slides:compose'; requestId: string; anchor: string; point: EditorPoint } & AnchorDescription)
  /** 回应 `slides:flush`：未保存的改动都发布完了（`saved` 为 false 表示有改动没能保存）。 */
  | { type: 'slides:flushed'; requestId: string; saved: boolean }
  /** deck 被编辑器以外的东西改了，编辑器要重新载入。 */
  | { type: 'slides:external-change'; paths: string[] }
  /** 运行时请父窗口把一段提示放进这个会话的输入框（「让智能体修好这页」等），父窗口回 `slides:suggest-prompt-result`。 */
  | { type: 'slides:suggest-prompt'; requestId: string; prompt: string };

/** 父窗口 → iframe。 */
export type HostToEditorMessage =
  /** 当前会话草稿里属于这份 deck 的标注，编辑器据此画编号标记。 */
  | { type: 'slides:threads'; threads: EditorThread[] }
  /** 批注框打开了没有（没打开时运行时撤掉选中）。 */
  | { type: 'slides:compose-result'; requestId: string; opened: boolean }
  /** 批注框关了（添加或取消），运行时结束这一次标注。 */
  | { type: 'slides:composer-closed'; requestId: string }
  /** 跳到这条标注所在的页。 */
  | { type: 'slides:reveal'; id: string }
  /** 打开或关上标注模式（标签条上的标注开关）。 */
  | { type: 'slides:set-mode'; on: boolean }
  /** 发送消息前：把编辑器里未保存的改动发布完再回 `slides:flushed`。 */
  | { type: 'slides:flush'; requestId: string }
  /** 回应 `slides:suggest-prompt`：提示放进输入框了没有（标签页不属于会话时为 false，运行时改为复制到剪贴板）。 */
  | { type: 'slides:suggest-prompt-result'; requestId: string; ok: boolean };

const EDITOR_TYPES = new Set<EditorToHostMessage['type']>([
  'slides:ready',
  'slides:mode',
  'slides:compose',
  'slides:flushed',
  'slides:external-change',
  'slides:suggest-prompt',
]);
const HOST_TYPES = new Set<HostToEditorMessage['type']>([
  'slides:threads',
  'slides:compose-result',
  'slides:composer-closed',
  'slides:reveal',
  'slides:set-mode',
  'slides:flush',
  'slides:suggest-prompt-result',
]);

/** `slides:suggest-prompt` 的提示最长多少字符（运行时的修复提示远小于这个数）。 */
export const SUGGESTED_PROMPT_MAX = 20_000;

/** 编辑器地址上带 BaoCut 界面语言的查询参数（值是 `Locale`，如 `zh-Hans`）：标注位置标签按它写（editor/comment-labels.ts）。 */
export const EDITOR_LOCALE_PARAM = 'lang';

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
const isString = (value: unknown, max = 4096): value is string => typeof value === 'string' && value.length <= max;
const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

/** 父窗口收到的数据是不是一条合法的编辑器消息（字段类型与长度都核对，不信任 iframe）。 */
export function readEditorMessage(data: unknown): EditorToHostMessage | null {
  if (!isRecord(data) || !EDITOR_TYPES.has(data.type as EditorToHostMessage['type'])) return null;
  switch (data.type) {
    case 'slides:ready':
      return typeof data.canEdit === 'boolean' ? { type: data.type, canEdit: data.canEdit } : null;
    case 'slides:mode':
      return typeof data.on === 'boolean' ? { type: data.type, on: data.on } : null;
    case 'slides:compose': {
      const point = data.point;
      if (!isString(data.requestId, 100) || !isString(data.anchor) || !isString(data.label, 1000)) return null;
      if (!isRecord(point) || !isFiniteNumber(point.x) || !isFiniteNumber(point.y)) return null;
      if (data.detail !== undefined && !isString(data.detail)) return null;
      if (data.area !== undefined && typeof data.area !== 'boolean') return null;
      return {
        type: data.type,
        requestId: data.requestId,
        anchor: data.anchor,
        point: { x: point.x, y: point.y },
        label: data.label,
        ...(data.detail !== undefined ? { detail: data.detail as string } : {}),
        ...(data.area === true ? { area: true } : {}),
      };
    }
    case 'slides:flushed':
      return isString(data.requestId, 100) && typeof data.saved === 'boolean' ? { type: data.type, requestId: data.requestId, saved: data.saved } : null;
    case 'slides:external-change':
      return Array.isArray(data.paths) && data.paths.length <= 1000 && data.paths.every(p => isString(p, 1000))
        ? { type: data.type, paths: data.paths as string[] }
        : null;
    case 'slides:suggest-prompt':
      return isString(data.requestId, 100) && isString(data.prompt, SUGGESTED_PROMPT_MAX) && data.prompt.trim() !== ''
        ? { type: data.type, requestId: data.requestId, prompt: data.prompt }
        : null;
    default:
      return null;
  }
}

/** 编辑器收到的数据是不是一条合法的父窗口消息。 */
export function readHostMessage(data: unknown): HostToEditorMessage | null {
  if (!isRecord(data) || !HOST_TYPES.has(data.type as HostToEditorMessage['type'])) return null;
  switch (data.type) {
    case 'slides:threads':
      return Array.isArray(data.threads) &&
        data.threads.every(t => isRecord(t) && isString(t.id, 100) && isString(t.anchor) && isFiniteNumber(t.n))
        ? { type: data.type, threads: (data.threads as EditorThread[]).map(t => ({ id: t.id, anchor: t.anchor, n: t.n })) }
        : null;
    case 'slides:compose-result':
      return isString(data.requestId, 100) && typeof data.opened === 'boolean' ? { type: data.type, requestId: data.requestId, opened: data.opened } : null;
    case 'slides:composer-closed':
    case 'slides:flush':
      return isString(data.requestId, 100) ? { type: data.type, requestId: data.requestId } : null;
    case 'slides:reveal':
      return isString(data.id, 100) ? { type: data.type, id: data.id } : null;
    case 'slides:set-mode':
      return typeof data.on === 'boolean' ? { type: data.type, on: data.on } : null;
    case 'slides:suggest-prompt-result':
      return isString(data.requestId, 100) && typeof data.ok === 'boolean' ? { type: data.type, requestId: data.requestId, ok: data.ok } : null;
    default:
      return null;
  }
}
