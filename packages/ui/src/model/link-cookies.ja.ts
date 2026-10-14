import type { LinkCookiesMessages } from './link-cookies.ts';

export const ja: LinkCookiesMessages = {
  chromeStoreMissing: "Chrome の Cookie ストアが見つかりませんでした。Chrome のログイン情報を使うには、Chrome で対象サイトにログインしてから「ブラウザを再検出」をクリックしてください。",
  macAccessDenied: (names) => `BaoCut には ${names.join('、')} のブラウザデータにアクセスする権限がありません。BaoCut を実行しているコンピュータで「システム設定 › プライバシーとセキュリティ › フルディスクアクセス」を開き、BaoCut を追加して有効にしてください。BaoCut を完全に終了して再起動し、「ブラウザを再検出」をクリックしてください。`,
  accessDenied: (names) => `BaoCut には ${names.join('、')} のブラウザデータにアクセスする権限がありません。BaoCut を実行しているコンピュータで、これらのブラウザのデータフォルダへのアクセスを BaoCut に許可し、ブラウザを再検出してください。`,
  noneChecked:
    'どれにもチェックを入れなければ匿名でダウンロードします。サイトでサインインや認証を求められた場合は、先にブラウザでそのサイトにサインインしてから、そのブラウザにチェックを入れてください。',
  oneChecked: (name: string) => `${name} の Cookie を使ってサイトにアクセスします。`,
  manyChecked: (names: readonly string[]) =>
    `${names.join(' → ')} の順に試します：ブラウザの Cookie を読み取れない場合や、サイトがまだサインインを求める場合は次に進み、最初にうまくいったところで止めます。どれを使ったかは結果に表示されます。`,
  privacy: 'チェックを入れたブラウザだけを読み取ります。yt-dlp はこのコンピュータ上の Cookie を読み取り、サイトへのアクセスにだけ使います。BaoCut が記憶するのはブラウザ名だけで、Cookie は保存しません。',
  keychain: (names: readonly string[]) =>
    `macOS が ${names.join('、')}${names.length > 1 ? ' のそれぞれ' : ' '}についてキーチェーンへのアクセスを 1 回求めます。「常に許可」を選ぶと、次からは求められません。`,
  safariAccess: 'Safari の Cookie を読み取るには、先に「システム設定 › プライバシーとセキュリティ › フルディスクアクセス」で BaoCut を許可してください。',
  chromiumLocked: (names: readonly string[]) =>
    names.length > 1
      ? `${names.join('、')} を開いている間は Cookie データベースがロックされ、読み取れません。ダウンロードの前に、バックグラウンドで動いているものも含めてこれらのブラウザを完全に終了してください。`
      : `${names[0]} を開いている間は Cookie データベースがロックされ、読み取れません。ダウンロードの前に、バックグラウンドで動いている場合も含めてこのブラウザを完全に終了してください。`,
  appBound: (names: readonly string[]) =>
    `Windows では、${names.join('、')} は通常 App-Bound Encryption で Cookie を保護しているため、ブラウザを終了しても yt-dlp が読み取れないことがあります。`,
  firefoxTip: 'サインインが必要な場合は、Firefox でサイトにサインインし、代わりに Firefox にチェックを入れてください。',
  noBrowsers: 'このコンピュータにはブラウザの Cookie が見つからないため、匿名でしかダウンロードできません。ブラウザでサイトにサインインしたら、「ブラウザを再検出」をクリックしてください。',
  anonymous: 'オフ（匿名でダウンロード）',
  subOne: (name: string) => `${name} の Cookie を使用`,
  subMany: (names: readonly string[]) => `${names.join('、')} の Cookie を順に試す`,
  summary: (text: string) => `Web サイトへのサインイン：${text}`,
  used: (name: string) => `${name} の Cookie を使用しました`,
};
