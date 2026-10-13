import type { RcSemanticMessages } from './rc-semantic.ts';

export const zhHant: RcSemanticMessages = {
  modelNotInstalled: '語意搜尋需要文字搜尋模型，請在 設定 › 語意索引 裡安裝',
  modelUnavailable: '文字搜尋模型無法執行',
  profileIncompatible: '語意索引是用另一個模型建立的，需要重建',
  inputTooLong: (p) => `搜尋詞太長（超過 ${p.max} 個字元）`,
  sourceMissing: '這筆結果的來源已經不在了',
  indexNotReady: '語意索引還沒建好，請在 設定 › 語意索引 裡建立',
  indexPartial: '語意索引只涵蓋了這個範圍的一部分，結果可能不完整',
  staleRevision: '找到這筆結果之後影片改過了',
  cursorStale: '結果已經變了，請重新搜尋',
  searchCancelled: '搜尋已取消',
  resourceExhausted: '目前記憶體或運算資源不足，無法執行搜尋模型',
  appearanceUnavailable: '還不能搜尋成片裡看到的畫面',
  channelUnavailable: '還不能搜尋畫面與聲音',
  storeUnavailable: '無法開啟語意索引',
  hitInvalid: '找不到這筆結果，請重新搜尋',
  needsTextChannel: '請選擇講話內容：目前只能搜尋講話內容',
};
