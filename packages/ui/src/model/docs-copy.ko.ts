import type { DocsMessages } from './docs-copy.ts';

const list = (labels: readonly string[]) => new Intl.ListFormat('ko', { type: 'conjunction' }).format(labels);

export const ko: DocsMessages = {
  tabs: (n) => `탭 ${n}개`,
  paneLabel: (name) => `공동 문서 “${name}”`,
  frameTitle: (name) => `공동 문서 편집기: ${name}`,
  opening: '공동 문서 여는 중…',
  unavailableTitle: '공동 문서 편집기를 사용할 수 없음',
  unavailableBody: '이 BaoCut 빌드에는 공동 문서 편집기가 포함되어 있지 않습니다. 공동 문서 파일은 폴더에 그대로 있습니다.',
  openFailed: (reason) => `공동 문서를 열 수 없습니다: ${reason}`,
  open: '공동 문서 열기',
  openCard: (name) => `공동 문서 “${name}” 열기`,
  openInEditor: '공동 문서 편집기로 열기',
  comment: '댓글',
  ask: '요청',
  token: (n) => `공동 문서 주석 · ${n}개`,
  added: (token) => `대화에 추가함 · ${token}`,
  removeAll: '공동 문서 주석 모두 제거',
  removeOne: (n) => `주석 ${n} 제거`,
  item: (n, label, text) => `주석 ${n}, ${label}: ${text}`,
  empty: '이 댓글은 비어 있어 대화에 추가하지 않았습니다',
  tooLong: (max) => `주석은 최대 ${max}자까지 쓸 수 있습니다`,
  tooMany: (max) => `메시지 하나에 공동 문서 주석은 최대 ${max}개까지 붙일 수 있습니다. 먼저 이것들을 보내세요.`,
  noConversation: '이 탭은 아직 세션에 속해 있지 않습니다. 메시지를 보내 세션을 시작한 뒤 댓글을 Agent에게 보내세요.',
  message: '이 공동 문서의 댓글과 요청을 처리해 주세요.',
  flushFailed: (names) =>
    `공동 문서 ${list(names.map((n) => `“${n}”`))}의 변경 사항이 아직 저장되지 않아 메시지를 보내지 않았습니다. 다시 보내거나 공동 문서 주석을 먼저 제거하세요.`,
};
