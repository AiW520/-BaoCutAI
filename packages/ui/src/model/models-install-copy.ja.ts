import type { ModelsInstallMessages } from './models-install-copy.ts';

const KEEP = 'ダウンロード済みの部分は保持され、次回はその続きからダウンロードします。';
const SOURCE = '「設定 › 一般」のダウンロード元';

export const ja: ModelsInstallMessages = {
  planSize: (size) => `${size} をダウンロード`,
  planSizeEstimate: (size) => `約 ${size}（サイズ不明のファイルがあるため、登録されている見積もりを使用）`,
  amountEstimate: (size) => `約 ${size}`,
  noSpace: (need, have) =>
    `ディスクの空き容量が足りません：${need} 必要ですが、モデルフォルダのあるディスクの空きは ${have} しかありません。空き容量を確保してからダウンロードしてください。`,
  resumed: (size) => `前回ダウンロード済みの ${size} はそのまま使い、再ダウンロードしません。`,
  space: (size) => `ディスクの空き ${size}`,
  lineKeep: 'インストール済み。そのままにします',
  lineSize: (size, count) => `${size} · ファイル ${count} 個`,
  lineUnknown: (count) => `サイズ不明 · ファイル ${count} 個`,
  queued: 'ダウンロード待機中',
  downloading: (amount) => `${amount} をダウンロード中`,
  downloadingUnknown: (amount) => `ダウンロード中 · ${amount} 受信済み`,
  verifying: '検証して公開中',
  pausedKept: (amount) => `一時停止中 · ${amount} は保持済み。再開すると続きからダウンロードします`,
  paused: '一時停止中',
  remedyNoSpace: (need, have) =>
    `${need !== null && have !== null ? `${need} 必要ですが、空きは ${have} しかありません。` : ''}ディスクの空き容量を確保してから、もう一度ダウンロードしてください。${KEEP}`,
  remedyNetwork: `ネットワークを確認してから、もう一度ダウンロードしてください。${KEEP}既定のダウンロード元に接続できない場合は、${SOURCE}でミラーに切り替えてください。`,
  remedyIntegrity: `ダウンロード元のファイルがマニフェストのサイズまたは sha256 と一致しなかったため、不正なファイルを削除しました。別のダウンロード元（${SOURCE}）に切り替えてから、もう一度ダウンロードしてください。`,
  remedySource: (env) => `ダウンロード元にこのファイルがないか、アクセスが拒否されました。${SOURCE}（または環境変数 ${env}）で設定したミラーが完全かどうかを確認するか、別のダウンロード元に切り替えてください。`,
  remedyManifest: 'このモデルパッケージの内蔵マニフェストに信頼できる sha256 がないため、OpenFox が更新されるまでインストールできません。',
  remedyOffline: '厳格オフラインモードがオンのため、何もダウンロードしません。ダウンロードするには、先に設定で厳格オフラインモードをオフにしてください。',
  remedySizeChanged: 'ダウンロードサイズが変わりました。新しい内容でもう一度確認してください。',
  remedyInUse:
    'タスクがこのモデルパッケージを使用中です（文字起こし、合成、確認、インストールのいずれか）。終わるのを待つか、バックグラウンドタスクでキャンセルしてから、もう一度削除してください。',
  remedyUnavailable:
    'モデルパッケージは現在使用できません（インストールが不完全、無効になっている、またはこのコンピュータで非対応）。先に修復するか、もう一度有効にしてください。',
  remedyInstallFailed: `もう一度ダウンロードしてみてください。${KEEP}`,
  partFailed: (part) => `${part}をダウンロードできませんでした。`,
  partFailedFrom: (part, host) => `${part}を ${host} からダウンロードできませんでした。`,
  partKept: 'ダウンロード済みの部分は保持されるため、補完するときは足りない部分だけをダウンロードします。先にダウンロード元を切り替えることもできます。',
  sentences: (parts) => parts.join(''),
  problemText: (message, remedy) =>
    /[。！？]$/.test(message) ? `${message}${remedy}` : /[.!?]$/.test(message) ? `${message} ${remedy}` : `${message}。${remedy}`,
  removalBody: (unknown, frees, kept) =>
    [
      unknown ? 'このモデルパッケージだけが使うファイルを削除します。' : frees !== null ? `約 ${frees} の空きができます。` : null,
      ...kept.map((k) => `${k.repo} は ${k.usedBy.join('、')} がまだ使用しているため残します。`),
      'もう一度使うには、再ダウンロードが必要です。',
    ]
      .filter(Boolean)
      .join(''),
  removed: (bundleId) => `${bundleId} を削除しました`,
  removedKept: (bundleId, repos) => `${bundleId} を削除しました · ${repos.join('、')} はほかのモデルパッケージがまだ使用しているため残しました`,
  noSpaceFolder: (need, have) => `ディスクの空き容量が足りません：${need} 必要ですが、このフォルダのあるディスクの空きは ${have} しかありません。空き容量を確保するか、別のフォルダを選んでください。`,
  folder: {
    label: '保存先',
    modelsDirChip: 'モデルフォルダ',
    envChip: '環境変数',
    change: '変更…',
    pickTitle: '今回のダウンロードの保存先を選択',
    reset: 'モデルフォルダに戻す',
    pickedNote: '今回のダウンロードだけに使います。モデルフォルダは変わりません。',
    toolsNote: 'ツールとランタイムは OpenFox のツールフォルダに入り、ここには置きません。',
    envNote: 'モデルフォルダは環境変数 BAOCUT_MODELS_DIR で指定されているため、ダウンロードはそこに保存されます。',
    fixedNote: '一時停止したダウンロードは、開始したフォルダで再開します。',
    missingTitle: 'このフォルダが見つかりません',
    missingText: 'このフォルダは存在しません。外付けドライブが接続されていない場合にも起こります。接続するか、別のフォルダを選んでください。',
    notWritableTitle: 'このフォルダには書き込めません',
    notWritableText: 'OpenFox にはこのフォルダへの書き込み権限がありません。別のフォルダを選ぶか、先に権限を変更してください。',
  },
  storedAt: (path) => `${path} に保存 · モデルフォルダの外`,
};
