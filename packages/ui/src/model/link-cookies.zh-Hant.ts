import type { LinkCookiesMessages } from './link-cookies.ts';

export const zhHant: LinkCookiesMessages = {
  chromeStoreMissing: "沒有找到 Chrome 的 Cookie 資料庫。若要使用 Chrome 的網站登入，請在 Chrome 登入目標網站，再按「重新偵測瀏覽器」。",
  macAccessDenied: (names) => `BaoCut 沒有權限存取 ${names.join('、')} 的瀏覽器資料。在執行 BaoCut 的電腦上，開啟「系統設定 › 隱私權與安全性 › 完整磁碟取用權限」，加入並啟用 BaoCut；完全結束並重新開啟 BaoCut，再按「重新偵測瀏覽器」。`,
  accessDenied: (names) => `BaoCut 沒有權限存取 ${names.join('、')} 的瀏覽器資料。在執行 BaoCut 的電腦上，允許 BaoCut 存取這些瀏覽器的資料目錄，再按「重新偵測瀏覽器」。`,
  noneChecked: '全部不勾選即可匿名下載。如果網站要求登入或驗證，請先在瀏覽器中登入該網站，再勾選那個瀏覽器。',
  oneChecked: (name: string) => `使用 ${name} 的 Cookie 存取網站。`,
  manyChecked: (names: readonly string[]) =>
    `依 ${names.join(' → ')} 的順序嘗試：如果無法讀取某個瀏覽器的 Cookie，或網站仍要求登入，就換下一個，遇到第一個可用的就停止。結果會說明使用了哪一個。`,
  privacy: '只會讀取你勾選的瀏覽器。yt-dlp 會讀取這台電腦上的 Cookie，只用於存取網站；BaoCut 只會記住瀏覽器名稱，絕不儲存 Cookie。',
  keychain: (names: readonly string[]) =>
    `macOS 會為 ${names.join('、')}${names.length > 1 ? ' 各' : ' '}要求一次鑰匙圈存取權限。選擇「永遠允許」後就不會再詢問。`,
  safariAccess: '若要讀取 Safari 的 Cookie，請先在「系統設定 › 隱私權與安全性 › 完整磁碟取用權限」中允許 BaoCut。',
  chromiumLocked: (names: readonly string[]) =>
    `${names.join('、')} 開啟時，Cookie 資料庫會被鎖定而無法讀取。下載前請完全結束${names.length > 1 ? '這些' : '這個'}瀏覽器，包括在背景執行的。`,
  appBound: (names: readonly string[]) =>
    `在 Windows 上，${names.join('、')} 通常會以應用程式綁定加密（App-Bound Encryption）保護 Cookie，yt-dlp 可能無法讀取，即使結束瀏覽器也一樣。`,
  firefoxTip: '如果需要登入，請改在 Firefox 中登入該網站，並勾選 Firefox。',
  noBrowsers: '在這台電腦上找不到瀏覽器 Cookie，因此只能匿名下載。在瀏覽器中登入該網站後，請點選「重新偵測瀏覽器」。',
  anonymous: '匿名下載',
  subOne: (name: string) => `使用 ${name} 的 Cookie`,
  subMany: (names: readonly string[]) => `依序嘗試 ${names.join('、')} 的 Cookie`,
  summary: (text: string) => `網站登入：${text}`,
  used: (name: string) => `已使用 ${name} 的 Cookie`,
};
