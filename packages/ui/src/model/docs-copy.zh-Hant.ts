import type { DocsMessages } from './docs-copy.ts';

export const zhHant: DocsMessages = {
  tabs: (n) => `${n} 個分頁`,
  paneLabel: (name) => `協作文件「${name}」`,
  frameTitle: (name) => `協作文件編輯器：${name}`,
  opening: '正在開啟協作文件…',
  unavailableTitle: '協作文件編輯器無法使用',
  unavailableBody: '這個版本的 BaoCut 沒有附帶協作文件編輯器。協作文件的檔案仍在它的資料夾裡。',
  openFailed: (reason) => `無法開啟這份協作文件：${reason}`,
  open: '開啟協作文件',
  openCard: (name) => `開啟協作文件「${name}」`,
  openInEditor: '用協作文件編輯器開啟',
  comment: '留言',
  ask: '請求',
  token: (n) => `協作文件標註 · ${n} 則`,
  added: (token) => `已加入對話 · ${token}`,
  removeAll: '移除全部協作文件標註',
  removeOne: (n) => `移除第 ${n} 則標註`,
  item: (n, label, text) => `第 ${n} 則，${label}：${text}`,
  empty: '這則留言是空的，沒有加入對話',
  tooLong: (max) => `一則標註最多 ${max} 字`,
  tooMany: (max) => `一則訊息最多帶 ${max} 則協作文件標註，先把這些送出`,
  noConversation: '這個分頁還沒有工作階段。先送出一句話開始工作階段，再把留言傳給 Agent。',
  message: '請處理這些協作文件裡的留言和請求。',
  flushFailed: (names) =>
    `協作文件${names.map((n) => `「${n}」`).join('、')}裡有修改還沒儲存好，訊息沒有送出。可以再送一次，或先移除協作文件標註。`,
};
