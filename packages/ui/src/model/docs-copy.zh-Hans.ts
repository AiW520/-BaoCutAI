import type { DocsMessages } from './docs-copy.ts';

export const zhHans: DocsMessages = {
  tabs: (n) => `${n} 个标签页`,
  paneLabel: (name) => `协作文档「${name}」`,
  frameTitle: (name) => `协作文档编辑器：${name}`,
  opening: '正在打开协作文档…',
  unavailableTitle: '协作文档编辑器不可用',
  unavailableBody: '这个版本的 BaoCut 没有带协作文档编辑器。协作文档的文件仍在它的文件夹里。',
  openFailed: (reason) => `打不开这份协作文档：${reason}`,
  open: '打开协作文档',
  openCard: (name) => `打开协作文档「${name}」`,
  openInEditor: '用协作文档编辑器打开',
  comment: '评论',
  ask: '请求',
  token: (n) => `协作文档标注 · ${n} 条`,
  added: (token) => `已添加到对话 · ${token}`,
  removeAll: '移除全部协作文档标注',
  removeOne: (n) => `移除第 ${n} 条标注`,
  item: (n, label, text) => `第 ${n} 条，${label}：${text}`,
  empty: '这条评论是空的，没有添加到对话',
  tooLong: (max) => `一条标注最多 ${max} 字`,
  tooMany: (max) => `一条消息最多带 ${max} 条协作文档标注，先把这些发出去`,
  noConversation: '这个标签页还没有会话。先发一句话开始会话，再把评论发给智能体。',
  message: '请处理这些协作文档里的评论和请求。',
  flushFailed: (names) =>
    `协作文档${names.map((n) => `「${n}」`).join('、')}里有改动还没保存好，消息没有发出。可以再发一次，或先移除协作文档标注。`,
};
