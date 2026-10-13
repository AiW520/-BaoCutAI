import type { RcSemanticMessages } from './rc-semantic.ts';

export const ko: RcSemanticMessages = {
  modelNotInstalled: '의미 검색에는 텍스트 검색 모델이 필요합니다. 설정 › 의미 색인에서 설치하세요',
  modelUnavailable: '텍스트 검색 모델을 실행할 수 없습니다',
  profileIncompatible: '의미 색인이 다른 모델로 만들어져 다시 만들어야 합니다',
  inputTooLong: (p) => `검색어가 너무 깁니다(${p.max}자 초과)`,
  sourceMissing: '이 결과의 원본이 더 이상 없습니다',
  indexNotReady: '의미 색인이 아직 준비되지 않았습니다. 설정 › 의미 색인에서 만드세요',
  indexPartial: '의미 색인이 이 범위의 일부만 다루므로 결과가 불완전할 수 있습니다',
  staleRevision: '이 결과를 찾은 뒤 영상이 바뀌었습니다',
  cursorStale: '결과가 바뀌었습니다. 다시 검색하세요',
  searchCancelled: '검색이 취소되었습니다',
  resourceExhausted: '지금은 메모리나 연산 자원이 부족해 검색 모델을 실행할 수 없습니다',
  appearanceUnavailable: '완성된 영상에 보이는 모습 검색은 아직 지원되지 않습니다',
  channelUnavailable: '화면과 소리 검색은 아직 지원되지 않습니다',
  storeUnavailable: '의미 색인을 열 수 없습니다',
  hitInvalid: '이 결과를 찾을 수 없습니다. 다시 검색하세요',
  needsTextChannel: '말한 내용을 선택하세요. 지금은 말한 내용만 검색할 수 있습니다',
};
