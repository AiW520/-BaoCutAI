import type { DocsMessages } from './docs-copy.ts';

export const ja: DocsMessages = {
  tabs: (n) => `タブ ${n} 個`,
  paneLabel: (name) => `共同編集ドキュメント「${name}」`,
  frameTitle: (name) => `共同編集ドキュメントエディタ：${name}`,
  opening: '共同編集ドキュメントを開いています…',
  unavailableTitle: '共同編集ドキュメントエディタを利用できません',
  unavailableBody: 'この BaoCut には共同編集ドキュメントエディタが含まれていません。ドキュメントのファイルはフォルダに残っています。',
  openFailed: (reason) => `共同編集ドキュメントを開けませんでした：${reason}`,
  open: '共同編集ドキュメントを開く',
  openCard: (name) => `共同編集ドキュメント「${name}」を開く`,
  openInEditor: '共同編集ドキュメントエディタで開く',
  comment: 'コメント',
  ask: 'リクエスト',
  token: (n) => `共同編集ドキュメントの注釈 · ${n} 件`,
  added: (token) => `会話に追加しました · ${token}`,
  removeAll: '共同編集ドキュメントの注釈をすべて削除',
  removeOne: (n) => `注釈 ${n} を削除`,
  item: (n, label, text) => `注釈 ${n}、${label}：${text}`,
  empty: 'このコメントは空のため、会話に追加しませんでした',
  tooLong: (max) => `注釈は ${max} 文字までです`,
  tooMany: (max) => `1 つのメッセージに付けられる共同編集ドキュメントの注釈は ${max} 件までです。先にこれらを送信してください。`,
  noConversation: 'このタブはまだセッションに属していません。メッセージを送ってセッションを始めてから、コメントを Agent に送ってください。',
  message: 'これらの共同編集ドキュメントのコメントとリクエストに対応してください。',
  flushFailed: (names) =>
    `共同編集ドキュメント${names.map((n) => `「${n}」`).join('、')}の変更の保存が終わっていないため、メッセージは送信されませんでした。もう一度送信するか、先に共同編集ドキュメントの注釈を削除してください。`,
};
