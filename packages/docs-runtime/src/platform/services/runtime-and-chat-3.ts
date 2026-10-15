/** BaoCut: platform runtime and chat from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  resolveEditorExtensionsJoin,
} from "../../prose-editor/platform/extensions-2";
import {
  resolveEditorAnchorsAndMentionsValue10,
} from "../../prose-editor/platform/anchors-and-mentions-1";
import {
  DataModelSchemasFamily,
  DataModelSchemasStyles,
  collectDataModelSchemasJoin,
  resolveDataModelSchemasReplace,
} from "../data/model-schemas-3";

var PlatformRuntimeAndChatStyles: string;

var PlatformRuntimeAndChatStyles2: string;

var EditorHostState: string;

var EditorHostReplace: string;

var EditorHostState2: string;

var EditorHostState3: string;

var EditorHostFade: {
    fade: number;
    exit: number;
    collapse: number;
};

var EditorHostMessage: string;

var resolveEditorHostMention: Dynamic;

var resolveEditorHostEnum: Dynamic;

var resolveEditorHostFloor: (editorHostFloor?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveEditorHostFloor2: (editorHostFloor2?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveEditorHostValue: (editorHostValue?: Dynamic, ..._extraArguments: unknown[]) => string;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformRuntimeAndChat3Step1(): void {
  (PlatformRuntimeAndChatStyles = `/**
 * GENERATED — do not edit. Run \`yarn workspace @ant/cds gen:tokens\`.
 *
 * \`--cds-*\` custom-property declarations, derived from \`packages/cds/tokens/\`,
 * the dark token scope's block (\`.cds-dark-scope\`, DARK_SCOPE_CLASS in
 * tokens/build.ts: what an element re-declares to render its subtree
 * against the dark palette without being a root), plus one
 * pipeline-emitted rule block at the end: the per-mode \`color-scheme\`
 * declarations (emitColorScheme in tokens/build.ts), keyed on the same
 * mode selectors as the declarations and on the dark scope.
 * \`__tests__/tokens-drift.test.ts\` snapshots the per-scope declaration
 * output and the color-scheme block, whose computed-style behaviour is
 * verifiable in real Chromium via test/color-scheme-cascade (run
 * locally until its web-ci step lands).
 *
 * This is the STANDALONE entry for Tailwind-v3-preset and non-Tailwind
 * consumers (\`import "@ant/cds/tokens.css"\`), so it — and the
 * component-base.css it @imports — must carry no Tailwind-named
 * \`@layer base|components|utilities\` block: Tailwind v3's postcss
 * plugin hard-errors on one in a stylesheet compiled without the
 * matching \`@tailwind\` directive, which is every standalone compile of
 * this file (gen.ts asserts it). The dark-mode compensation for bare
 * .font-* utilities (\`@layer utilities\`) and bare b/strong (\`@layer
 * components\`), both from emitFontWghtUtilities, therefore ship in
 * theme.css, the Tailwind v4 entry — as does the bare-bold
 * \`@layer components\` pin (emitBareBoldPin);
 * the color-scheme block is an ordinary unlayered rule and so is safe to
 * ship here.
 *
 * component-base.css (the non-token rules — btn-squish, cds-reset, cds-dot,
 * webkit input resets, keyframes) is @import-ed here so that consumers
 * that load \`@ant/cds/tokens.css\` without theme.css still get it.
 * theme.css @imports this file, so the v4 path picks it up transitively.
 */
@import "../component-base.css";

@property --cds-outset-x {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0px;
}
@property --cds-outset-y {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0px;
}

:root {
  --cds-radius: 0.25rem;
  --cds-border: currentColor;
  --cds-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --cds-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --cds-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --cds-shadow-drop-ring: inset 0 0 0 2px var(--cds-role-accent-fill);
  --cds-shadow-drop-ring-danger: inset 0 0 0 2px var(--cds-role-danger-fill);
  --cds-shadow-drop-glow: inset 0 0 24px -2px hsl(from var(--cds-role-accent-fill) h s l / 20%);
  --cds-shadow-drop-glow-danger: inset 0 0 24px -2px hsl(from var(--cds-role-danger-fill) h s l / 20%);
  --cds-font-mono: var(--cds-font-mono-override,) ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --cds-font-mono-ui: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --cds-font-system: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "PingFang SC", "PingFang TC", "Hiragino Sans", "Apple SD Gothic Neo", sans-serif;
  --cds-font-sans: var(--cds-font-system);
  --cds-font-sans-display: var(--cds-font-sans);
  --cds-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --cds-black: #000000;
  --cds-oncolor-200: hsl(60 6.7% 97.1% / 0.75);
  --cds-oncolor-300: hsl(60 6.7% 97.1% / 0.5);
  --cds-clay: #d97757;
  --cds-clay-emphasized: #c6613f;
  --cds-heather: #cbcadb;
  --cds-plum: #827dbd;
  --cds-cactus: #bcd1ca;
  --cds-mineral: #629987;
  --cds-pictogram-highlight-default: var(--cds-gray-80);
  --cds-pictogram-highlight-heather: var(--cds-heather);
  --cds-pictogram-highlight-cactus: var(--cds-cactus);
  --cds-font-weight-regular: 400;
  --cds-font-weight-medium: 500;
  --cds-font-weight-semibold: 580;
  --cds-font-weight-bold: 600;
  --cds-font-grad-semibold: 180;
  --cds-font-grad-bold: 200;
  --cds-opacity-icon-secondary: 0.4;
}

@media screen {
  [data-mode="dark"] {
    --cds-pictogram-highlight-default: var(--cds-gray-650);
    --cds-pictogram-highlight-heather: var(--cds-plum);
    --cds-pictogram-highlight-cactus: var(--cds-mineral);
  }
}

@media screen and (prefers-color-scheme: dark) {
  :root:not([data-mode="light"]) {
    --cds-pictogram-highlight-default: var(--cds-gray-650);
    --cds-pictogram-highlight-heather: var(--cds-plum);
    --cds-pictogram-highlight-cactus: var(--cds-mineral);
  }
}

:where(:root, :host) {
  --cds-theme-api: 1;
  --cds-gray-0: #ffffff;
  --cds-gray-10: #fcfcfb;
  --cds-gray-20: #f9f9f7;
  --cds-gray-30: #f6f6f4;
  --cds-gray-40: #f3f3f0;
  --cds-gray-50: #f0efec;
  --cds-gray-60: #edece8;
  --cds-gray-70: #eae9e4;
  --cds-gray-80: #e7e6e1;
  --cds-gray-90: #e4e3dd;
  --cds-gray-100: #e1e0d9;
  --cds-gray-150: #d2d1c7;
  --cds-gray-200: #c3c2b7;
  --cds-gray-250: #b4b3a8;
  --cds-gray-300: #a5a49a;
  --cds-gray-350: #97958d;
  --cds-gray-400: #898781;
  --cds-gray-450: #7b7974;
  --cds-gray-500: #6d6b67;
  --cds-gray-550: #5f5e5a;
  --cds-gray-600: #52514e;
  --cds-gray-650: #454442;
  --cds-gray-700: #383835;
  --cds-gray-750: #2c2c2a;
  --cds-gray-800: #20201f;
  --cds-gray-810: #1e1e1d;
  --cds-gray-820: #1c1c1b;
  --cds-gray-830: #1a1a19;
  --cds-gray-840: #181817;
  --cds-gray-850: #151515;
  --cds-gray-860: #131313;
  --cds-gray-870: #111111;
  --cds-gray-880: #0f0f0f;
  --cds-gray-890: #0d0d0d;
  --cds-gray-900: #0b0b0b;
  --cds-red-0: #ffffff;
  --cds-red-10: #fffbfb;
  --cds-red-20: #fef7f7;
  --cds-red-30: #fef3f3;
  --cds-red-40: #fdefef;
  --cds-red-50: #fbebeb;
  --cds-red-60: #fae7e7;
  --cds-red-70: #fae3e3;
  --cds-red-80: #fadfdf;
  --cds-red-90: #fadada;
  --cds-red-100: #fad6d6;
  --cds-red-150: #f7c1c1;
  --cds-red-200: #f4abab;
  --cds-red-250: #f09595;
  --cds-red-300: #ec7e7e;
  --cds-red-350: #e66767;
  --cds-red-400: #e34948;
  --cds-red-450: #d03b3b;
  --cds-red-500: #b93535;
  --cds-red-550: #a32c2c;
  --cds-red-600: #8e2626;
  --cds-red-650: #791e1e;
  --cds-red-700: #641919;
  --cds-red-750: #511212;
  --cds-red-800: #3c0e0e;
  --cds-red-810: #380d0d;
  --cds-red-820: #340c0c;
  --cds-red-830: #310b0b;
  --cds-red-840: #2d0a0a;
  --cds-red-850: #280a0a;
  --cds-red-860: #230b0a;
  --cds-red-870: #1d0b0a;
  --cds-red-880: #170c0b;
  --cds-red-890: #110c0b;
  --cds-red-900: #0b0b0b;
  --cds-orange-0: #ffffff;
  --cds-orange-10: #fefbfa;
  --cds-orange-20: #fdf7f5;
  --cds-orange-30: #fcf4f0;
  --cds-orange-40: #faf0ec;
  --cds-orange-50: #f9ece7;
  --cds-orange-60: #f8e9e2;
  --cds-orange-70: #f7e5dd;
  --cds-orange-80: #f7e1d7;
  --cds-orange-90: #f7dcd1;
  --cds-orange-100: #f7d8cb;
  --cds-orange-150: #f3c5b2;
  --cds-orange-200: #f4ae94;
  --cds-orange-250: #f09978;
  --cds-orange-300: #ec835a;
  --cds-orange-350: #eb6834;
  --cds-orange-400: #d95926;
  --cds-orange-450: #c25124;
  --cds-orange-500: #ae461c;
  --cds-orange-550: #993d19;
  --cds-orange-600: #863311;
  --cds-orange-650: #712b0f;
  --cds-orange-700: #5d230b;
  --cds-orange-750: #4b1b08;
  --cds-orange-800: #371407;
  --cds-orange-810: #341307;
  --cds-orange-820: #301106;
  --cds-orange-830: #2d1006;
  --cds-orange-840: #290f06;
  --cds-orange-850: #240e07;
  --cds-orange-860: #1f0e08;
  --cds-orange-870: #1a0e09;
  --cds-orange-880: #150d0a;
  --cds-orange-890: #100c0b;
  --cds-orange-900: #0b0b0b;
  --cds-yellow-0: #ffffff;
  --cds-yellow-10: #fefcf8;
  --cds-yellow-20: #fcf8f1;
  --cds-yellow-30: #fbf5ea;
  --cds-yellow-40: #f9f2e4;
  --cds-yellow-50: #f9eeda;
  --cds-yellow-60: #faebce;
  --cds-yellow-70: #fae7c2;
  --cds-yellow-80: #fae3b8;
  --cds-yellow-90: #f9e0b0;
  --cds-yellow-100: #f9dca4;
  --cds-yellow-150: #f9c868;
  --cds-yellow-200: #fab219;
  --cds-yellow-250: #eda100;
  --cds-yellow-300: #db9300;
  --cds-yellow-350: #c98500;
  --cds-yellow-400: #b77700;
  --cds-yellow-450: #a66a00;
  --cds-yellow-500: #945d00;
  --cds-yellow-550: #835100;
  --cds-yellow-600: #734500;
  --cds-yellow-650: #623900;
  --cds-yellow-700: #512e00;
  --cds-yellow-750: #412400;
  --cds-yellow-800: #311a00;
  --cds-yellow-810: #2e1800;
  --cds-yellow-820: #2b1700;
  --cds-yellow-830: #271500;
  --cds-yellow-840: #231402;
  --cds-yellow-850: #1f1204;
  --cds-yellow-860: #1b1106;
  --cds-yellow-870: #171007;
  --cds-yellow-880: #130e09;
  --cds-yellow-890: #0f0d0a;
  --cds-yellow-900: #0b0b0b;
  --cds-green-0: #ffffff;
  --cds-green-10: #fafdfa;
  --cds-green-20: #f5fbf4;
  --cds-green-30: #f0f9ef;
  --cds-green-40: #ebf7e9;
  --cds-green-50: #e5f4e4;
  --cds-green-60: #e0f2de;
  --cds-green-70: #dbf0d8;
  --cds-green-80: #d5eed3;
  --cds-green-90: #d0eccd;
  --cds-green-100: #caeac7;
  --cds-green-150: #aee0a9;
  --cds-green-200: #91d68b;
  --cds-green-250: #73cb6d;
  --cds-green-300: #55bf50;
  --cds-green-350: #35b231;
  --cds-green-400: #0ca30c;
  --cds-green-450: #009300;
  --cds-green-500: #008300;
  --cds-green-550: #007300;
  --cds-green-600: #006300;
  --cds-green-650: #005400;
  --cds-green-700: #074506;
  --cds-green-750: #0f350d;
  --cds-green-800: #11260f;
  --cds-green-810: #10230f;
  --cds-green-820: #10210f;
  --cds-green-830: #101e0f;
  --cds-green-840: #101b0f;
  --cds-green-850: #0f180e;
  --cds-green-860: #0e160e;
  --cds-green-870: #0e130d;
  --cds-green-880: #0d100d;
  --cds-green-890: #0c0e0c;
  --cds-green-900: #0b0b0b;
  --cds-aqua-0: #ffffff;
  --cds-aqua-10: #f9fdfb;
  --cds-aqua-20: #f3fbf8;
  --cds-aqua-30: #edf9f4;
  --cds-aqua-40: #e8f7f1;
  --cds-aqua-50: #e2f4ed;
  --cds-aqua-60: #dcf2ea;
  --cds-aqua-70: #d5f0e6;
  --cds-aqua-80: #ceefe2;
  --cds-aqua-90: #c7eddf;
  --cds-aqua-100: #bfebdb;
  --cds-aqua-150: #a0e1c9;
  --cds-aqua-200: #7ad7b4;
  --cds-aqua-250: #5acba0;
  --cds-aqua-300: #3bbd8c;
  --cds-aqua-350: #1baf7a;
  --cds-aqua-400: #199e70;
  --cds-aqua-450: #138e65;
  --cds-aqua-500: #0f7e5c;
  --cds-aqua-550: #0e6e53;
  --cds-aqua-600: #065f49;
  --cds-aqua-650: #095040;
  --cds-aqua-700: #034235;
  --cds-aqua-750: #02342b;
  --cds-aqua-800: #022720;
  --cds-aqua-810: #02241e;
  --cds-aqua-820: #02221c;
  --cds-aqua-830: #021f1a;
  --cds-aqua-840: #031c18;
  --cds-aqua-850: #051a16;
  --cds-aqua-860: #071713;
  --cds-aqua-870: #081411;
  --cds-aqua-880: #0a110f;
  --cds-aqua-890: #0b0e0d;
  --cds-aqua-900: #0b0b0b;
  --cds-blue-0: #ffffff;
  --cds-blue-10: #fafcff;
  --cds-blue-20: #f5f9fe;
  --cds-blue-30: #f0f7fe;
  --cds-blue-40: #ebf4fc;
  --cds-blue-50: #e7f1fb;
  --cds-blue-60: #e2eefa;
  --cds-blue-70: #ddebfa;
  --cds-blue-80: #d7e8fa;
  --cds-blue-90: #d2e5fa;
  --cds-blue-100: #cde2fb;
  --cds-blue-150: #b7d3f6;
  --cds-blue-200: #9ec5f4;
  --cds-blue-250: #86b6ef;
  --cds-blue-300: #6da7ec;
  --cds-blue-350: #5598e7;
  --cds-blue-400: #3987e5;
  --cds-blue-450: #2a78d6;
  --cds-blue-500: #256abf;
  --cds-blue-550: #1c5cab;
  --cds-blue-600: #184f95;
  --cds-blue-650: #104281;
  --cds-blue-700: #0d366b;
  --cds-blue-750: #062b57;
  --cds-blue-800: #032042;
  --cds-blue-810: #031e3d;
  --cds-blue-820: #021c39;
  --cds-blue-830: #021a36;
  --cds-blue-840: #021831;
  --cds-blue-850: #03162c;
  --cds-blue-860: #051426;
  --cds-blue-870: #07121f;
  --cds-blue-880: #091018;
  --cds-blue-890: #0a0d11;
  --cds-blue-900: #0b0b0b;
  --cds-violet-0: #ffffff;
  --cds-violet-10: #fcfbff;
  --cds-violet-20: #f8f8ff;
  --cds-violet-30: #f5f4ff;
  --cds-violet-40: #f2f1ff;
  --cds-violet-50: #efedff;
  --cds-violet-60: #ebeafe;
  --cds-violet-70: #e8e6fe;
  --cds-violet-80: #e5e2fd;
  --cds-violet-90: #e2dffd;
  --cds-violet-100: #dfdbfd;
  --cds-violet-150: #cfcafb;
  --cds-violet-200: #bfb9f5;
  --cds-violet-250: #b0a7f2;
  --cds-violet-300: #a096eb;
  --cds-violet-350: #9085e9;
  --cds-violet-400: #8173e3;
  --cds-violet-450: #7161e0;
  --cds-violet-500: #6250d6;
  --cds-violet-550: #5645be;
  --cds-violet-600: #4a3aa7;
  --cds-violet-650: #3e318e;
  --cds-violet-700: #322777;
  --cds-violet-750: #271e60;
  --cds-violet-800: #1d1649;
  --cds-violet-810: #1b1544;
  --cds-violet-820: #19133f;
  --cds-violet-830: #17123b;
  --cds-violet-840: #151036;
  --cds-violet-850: #130f32;
  --cds-violet-860: #110e2b;
  --cds-violet-870: #0f0e23;
  --cds-violet-880: #0e0d1b;
  --cds-violet-890: #0c0c13;
  --cds-violet-900: #0b0b0b;
  --cds-magenta-0: #ffffff;
  --cds-magenta-10: #fefbfc;
  --cds-magenta-20: #fef6f9;
  --cds-magenta-30: #fdf2f6;
  --cds-magenta-40: #fbeff3;
  --cds-magenta-50: #faebf0;
  --cds-magenta-60: #f9e6ed;
  --cds-magenta-70: #f9e2eb;
  --cds-magenta-80: #f9dee8;
  --cds-magenta-90: #f9d9e5;
  --cds-magenta-100: #f9d4e2;
  --cds-magenta-150: #f3c0d3;
  --cds-magenta-200: #f3a8c3;
  --cds-magenta-250: #ed93b4;
  --cds-magenta-300: #e87ba4;
  --cds-magenta-350: #e46191;
  --cds-magenta-400: #d55181;
  --cds-magenta-450: #c04873;
  --cds-magenta-500: #ad3d66;
  --cds-magenta-550: #993458;
  --cds-magenta-600: #862a4c;
  --cds-magenta-650: #722340;
  --cds-magenta-700: #5e1c34;
  --cds-magenta-750: #4c1429;
  --cds-magenta-800: #390f1f;
  --cds-magenta-810: #360d1c;
  --cds-magenta-820: #320c1a;
  --cds-magenta-830: #2f0b18;
  --cds-magenta-840: #2b0a16;
  --cds-magenta-850: #270a14;
  --cds-magenta-860: #220a12;
  --cds-magenta-870: #1c0b11;
  --cds-magenta-880: #170b0f;
  --cds-magenta-890: #110b0d;
  --cds-magenta-900: #0b0b0b;
  --cds-role-accent-50: var(--cds-blue-50);
  --cds-role-accent-100: var(--cds-blue-100);
  --cds-role-accent-250: var(--cds-blue-250);
  --cds-role-accent-300: var(--cds-blue-300);
  --cds-role-accent-400: var(--cds-blue-400);
  --cds-role-accent-450: var(--cds-blue-450);
  --cds-role-accent-600: var(--cds-blue-600);
  --cds-role-accent-700: var(--cds-blue-700);
  --cds-role-accent-800: var(--cds-blue-800);
  --cds-role-accent-850: var(--cds-blue-850);
  --cds-role-accent-fill: var(--cds-role-accent-450);
  --cds-role-accent-fill-hover: var(--cds-role-accent-400);
  --cds-role-accent-on: var(--cds-gray-0);
  --cds-role-danger-100: var(--cds-red-100);
  --cds-role-danger-250: var(--cds-red-250);
  --cds-role-danger-300: var(--cds-red-300);
  --cds-role-danger-400: var(--cds-red-400);
  --cds-role-danger-450: var(--cds-red-450);
  --cds-role-danger-600: var(--cds-red-600);
  --cds-role-danger-700: var(--cds-red-700);
  --cds-role-danger-800: var(--cds-red-800);
  --cds-role-danger-fill: var(--cds-role-danger-450);
  --cds-role-danger-fill-hover: var(--cds-role-danger-400);
  --cds-role-danger-on: var(--cds-gray-0);
  --cds-role-success-100: var(--cds-green-100);
  --cds-role-success-250: var(--cds-green-250);
  --cds-role-success-400: var(--cds-green-400);
  --cds-role-success-450: var(--cds-green-450);
  --cds-role-success-600: var(--cds-green-600);
  --cds-role-success-700: var(--cds-green-700);
  --cds-role-success-800: var(--cds-green-800);
  --cds-role-success-fill: var(--cds-role-success-450);
  --cds-role-success-fill-hover: var(--cds-role-success-400);
  --cds-role-success-on: var(--cds-gray-900);
  --cds-role-warning-100: var(--cds-yellow-100);
  --cds-role-warning-200: var(--cds-yellow-200);
  --cds-role-warning-250: var(--cds-yellow-250);
  --cds-role-warning-300: var(--cds-yellow-300);
  --cds-role-warning-600: var(--cds-yellow-600);
  --cds-role-warning-700: var(--cds-yellow-700);
  --cds-role-warning-800: var(--cds-yellow-800);
  --cds-role-warning-fill: var(--cds-role-warning-200);
  --cds-role-warning-fill-hover: var(--cds-role-warning-250);
  --cds-role-warning-on: var(--cds-gray-900);
  --cds-role-pro-100: var(--cds-violet-100);
  --cds-role-pro-250: var(--cds-violet-250);
  --cds-role-pro-300: var(--cds-violet-300);
  --cds-role-pro-400: var(--cds-violet-400);
  --cds-role-pro-450: var(--cds-violet-450);
  --cds-role-pro-600: var(--cds-violet-600);
  --cds-role-pro-700: var(--cds-violet-700);
  --cds-role-pro-800: var(--cds-violet-800);
  --cds-role-pro-fill: var(--cds-role-pro-450);
  --cds-role-pro-fill-hover: var(--cds-role-pro-400);
  --cds-role-pro-on: var(--cds-gray-0);
  --cds-role-tooltip-bg: var(--cds-gray-900);
  --cds-role-tooltip-fg: var(--cds-gray-0);
}

:where(
  :root,
  :host,
  .cds-root[data-mode],
  [data-mode] .cds-root:not([data-mode])
) {
  --cds-fill-git-added: #1a8633;
  --cds-fill-git-added-hover: #1e9b3b;
  --cds-fill-git-removed-hover: #de295f;
  --cds-fill-git-modified: #8b751c;
  --cds-fill-git-modified-hover: #a08720;
  --cds-fill-git-merged: #855fd6;
  --cds-fill-git-merged-hover: #9473db;
  --cds-fill-git-closed: #ed0b00;
  --cds-fill-git-closed-hover: #ff1307;
  --cds-fill-git-conflicting: #b85b19;
  --cds-fill-git-conflicting-hover: #c5621b;
  --cds-fill-git-draft-hover: #808080;
  --cds-text-git-added: #1e9e3c;
  --cds-text-git-removed: #cd2054;
  --cds-text-git-modified: #98801f;
  --cds-text-git-merged: #8e6bd9;
  --cds-text-git-closed: #ff3a30;
  --cds-text-git-conflicting: #c5621b;
  --cds-text-git-draft: #737373;
}

@media screen {
  :where(
    [data-mode="dark"] .cds-root:not([data-mode="light"]):not([data-mode="system"]),
    .cds-root[data-mode="dark"],
    .cds-dark-scope[data-mode="dark"]
  ) {
    --cds-fill-git-added: var(--cds-text-git-added);
    --cds-fill-git-added-hover: #27c840;
    --cds-fill-git-removed-hover: #ff1342;
    --cds-fill-git-modified: var(--cds-text-git-modified);
    --cds-fill-git-modified-hover: #fac800;
    --cds-fill-git-merged: var(--cds-text-git-merged);
    --cds-fill-git-merged-hover: #a67dff;
    --cds-fill-git-closed: var(--cds-text-git-closed);
    --cds-fill-git-closed-hover: #ff4940;
    --cds-fill-git-conflicting: var(--cds-text-git-conflicting);
    --cds-fill-git-conflicting-hover: #f97a1f;
    --cds-fill-git-draft-hover: #999999;
    --cds-text-git-added: #32d74b;
    --cds-text-git-removed: #ff2c56;
    --cds-text-git-modified: #ffd014;
    --cds-text-git-merged: #b796ff;
    --cds-text-git-closed: #ff6159;
    --cds-text-git-conflicting: #fa832e;
    --cds-text-git-draft: #a6a6a6;
  }
}

@media screen and (prefers-color-scheme: dark) {
  :where(
    [data-mode="system"]
      .cds-root:not([data-mode="light"]):not([data-mode="dark"]),
    .cds-root[data-mode="system"],
    .cds-root:not([data-mode]):not([data-mode] *)
  ) {
    --cds-fill-git-added: var(--cds-text-git-added);
    --cds-fill-git-added-hover: #27c840;
    --cds-fill-git-removed-hover: #ff1342;
    --cds-fill-git-modified: var(--cds-text-git-modified);
    --cds-fill-git-modified-hover: #fac800;
    --cds-fill-git-merged: var(--cds-text-git-merged);
    --cds-fill-git-merged-hover: #a67dff;
    --cds-fill-git-closed: var(--cds-text-git-closed);
    --cds-fill-git-closed-hover: #ff4940;
    --cds-fill-git-conflicting: var(--cds-text-git-conflicting);
    --cds-fill-git-conflicting-hover: #f97a1f;
    --cds-fill-git-draft-hover: #999999;
    --cds-text-git-added: #32d74b;
    --cds-text-git-removed: #ff2c56;
    --cds-text-git-modified: #ffd014;
    --cds-text-git-merged: #b796ff;
    --cds-text-git-closed: #ff6159;
    --cds-text-git-conflicting: #fa832e;
    --cds-text-git-draft: #a6a6a6;
  }
}

.cds-root {
  --cds-radius: calc(0.375rem * var(--cds-rem-scale, 1));
  --cds-radius-composer: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-h-control: calc(1.5rem * var(--cds-rem-scale, 1));
  --cds-h-control-nested: calc(1.125rem * var(--cds-rem-scale, 1));
  --cds-icon: calc(1rem * var(--cds-rem-scale, 1));
  --cds-pad-xs: calc(0.25rem * var(--cds-rem-scale, 1));
  --cds-pad-sm: calc(0.375rem * var(--cds-rem-scale, 1));
  --cds-pad-md: calc(0.5rem * var(--cds-rem-scale, 1));
  --cds-pad-lg: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-pad-xl: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-gap-xs: calc(0.375rem * var(--cds-rem-scale, 1));
  --cds-gap-sm: calc(0.5rem * var(--cds-rem-scale, 1));
  --cds-gap-md: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-gap-lg: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-gap-xl: calc(2rem * var(--cds-rem-scale, 1));
  --cds-border: var(--cds-alpha-2);
  --cds-border-accent: var(--cds-role-accent-250);
  --cds-border-danger: var(--cds-role-danger-250);
  --cds-border-success: var(--cds-role-success-250);
  --cds-border-warning: var(--cds-role-warning-250);
  --cds-border-pro: var(--cds-role-pro-250);
  --cds-border-editor-comment: var(--cds-yellow-400);
  --cds-border-editor-comment-target: var(--cds-yellow-450);
  --cds-border-git-added: color-mix(in srgb, var(--cds-text-git-added) 40%, transparent);
  --cds-border-git-removed: color-mix(in srgb, var(--cds-text-git-removed) 40%, transparent);
  --cds-border-git-modified: color-mix(in srgb, var(--cds-text-git-modified) 40%, transparent);
  --cds-border-git-merged: color-mix(in srgb, var(--cds-text-git-merged) 40%, transparent);
  --cds-border-git-closed: color-mix(in srgb, var(--cds-text-git-closed) 40%, transparent);
  --cds-border-git-conflicting: color-mix(in srgb, var(--cds-text-git-conflicting) 40%, transparent);
  --cds-border-git-draft: color-mix(in srgb, var(--cds-text-git-draft) 40%, transparent);
  --cds-border-git-opened: var(--cds-border-git-added);
  --cds-border-git-queued: var(--cds-border-git-modified);
  --cds-border-strong: var(--cds-alpha-3);
  --cds-border-stronger: hsl(from var(--cds-neutral-900) h s l / 40%);
  --cds-shadow-sm: 0 1px 2px 0 hsl(from var(--cds-gray-900) h s l / 6%), 0 2px 8px 0 var(--cds-shadow-color);
  --cds-shadow-md: 0 2px 4px 0 hsl(from var(--cds-gray-900) h s l / 7%), 0 6px 16px 0 var(--cds-shadow-color);
  --cds-shadow-lg: 0 4px 8px 0 hsl(from var(--cds-gray-900) h s l / 8%), 0 12px 28px -2px var(--cds-shadow-color);
  --cds-shadow-color: hsl(from var(--cds-gray-900) h s l / 8%);
  --cds-shadow-popover: 0 8px 24px rgb(0 0 0 / 0.12), 0 2px 6px rgb(0 0 0 / 0.08);
  --cds-shadow-drop-ring: inset 0 0 0 2px var(--cds-fill-accent);
  --cds-shadow-drop-ring-danger: inset 0 0 0 2px var(--cds-fill-danger);
  --cds-shadow-drop-glow: inset 0 0 24px -2px hsl(from var(--cds-fill-accent) h s l / 20%);
  --cds-shadow-drop-glow-danger: inset 0 0 24px -2px hsl(from var(--cds-fill-danger) h s l / 20%);
  --cds-ring-outer: 1px;
  --cds-ring-inner: 0px;
  --cds-ring-color: var(--cds-border);
  --cds-ring-hairline: 1px;
  --cds-focus-shadow: inset 0 0 0 1px var(--cds-page-bg), 0 0 0 1px var(--cds-fill-accent), 0 0 6px 1px var(--cds-bg-accent);
  --cds-focus-shadow-danger: inset 0 0 0 1px var(--cds-page-bg), 0 0 0 1px var(--cds-fill-danger), 0 0 6px 1px var(--cds-bg-danger);
  --cds-font-mono: var(--cds-font-mono-override,) var(--font-anthropic-mono, "SF Mono"), "SF Mono", ui-monospace, Menlo, Consolas, monospace;
  --cds-font-mono-ui: var(--font-anthropic-mono, "SF Mono"), "SF Mono", ui-monospace, Menlo, Consolas, monospace;
  --cds-font-sans: var(--font-anthropic-sans, var(--cds-font-system)), var(--cds-font-system);
  --cds-font-sans-display: var(--font-anthropic-sans-display, var(--cds-font-sans)), var(--cds-font-sans);
  --cds-font-voice: var(--font-anthropic-serif, ui-serif), ui-serif, Georgia, "Times New Roman", serif;
  --cds-ease-out: cubic-bezier(0.165, 0.84, 0.44, 1);
  --cds-ease-snap: cubic-bezier(0.32, 0.72, 0, 1);
  --cds-ease-overshoot: cubic-bezier(0.34, 1.3, 0.64, 1);
  --cds-dur-fast: 60ms;
  --cds-dur-snap: 120ms;
  --cds-dur-base: 200ms;
  --cds-dur-sheet: 300ms;
  --cds-dur-slow: 450ms;
  --cds-btn-spring: linear(0, 0.2459, 0.6526, 0.9468, 1.0764, 1.0915, 1.0585, 1.0219, 0.9993, 0.9914, 0.9921, 0.9957, 0.9988, 1.0004, 1);
  --cds-clay: #d97757;
  --cds-clay-emphasized: #c6613f;
  --cds-heather: #cbcadb;
  --cds-plum: #827dbd;
  --cds-cactus: #bcd1ca;
  --cds-mineral: #629987;
  --cds-pictogram-highlight-default: var(--cds-gray-80);
  --cds-pictogram-highlight-heather: var(--cds-heather);
  --cds-pictogram-highlight-cactus: var(--cds-cactus);
  --cds-cursor-interactive: pointer;
  --cds-neutral-0: var(--cds-gray-0);
  --cds-neutral-10: var(--cds-gray-10);
  --cds-neutral-20: var(--cds-gray-20);
  --cds-neutral-30: var(--cds-gray-30);
  --cds-neutral-40: var(--cds-gray-40);
  --cds-neutral-50: var(--cds-gray-50);
  --cds-neutral-60: var(--cds-gray-60);
  --cds-neutral-70: var(--cds-gray-70);
  --cds-neutral-80: var(--cds-gray-80);
  --cds-neutral-90: var(--cds-gray-90);
  --cds-neutral-100: var(--cds-gray-100);
  --cds-neutral-150: var(--cds-gray-150);
  --cds-neutral-200: var(--cds-gray-200);
  --cds-neutral-250: var(--cds-gray-250);
  --cds-neutral-300: var(--cds-gray-300);
  --cds-neutral-350: var(--cds-gray-350);
  --cds-neutral-400: var(--cds-gray-400);
  --cds-neutral-450: var(--cds-gray-450);
  --cds-neutral-500: var(--cds-gray-500);
  --cds-neutral-550: var(--cds-gray-550);
  --cds-neutral-600: var(--cds-gray-600);
  --cds-neutral-650: var(--cds-gray-650);
  --cds-neutral-700: var(--cds-gray-700);
  --cds-neutral-750: var(--cds-gray-750);
  --cds-neutral-800: var(--cds-gray-800);
  --cds-neutral-810: var(--cds-gray-810);
  --cds-neutral-820: var(--cds-gray-820);
  --cds-neutral-830: var(--cds-gray-830);
  --cds-neutral-840: var(--cds-gray-840);
  --cds-neutral-850: var(--cds-gray-850);
  --cds-neutral-860: var(--cds-gray-860);
  --cds-neutral-870: var(--cds-gray-870);
  --cds-neutral-880: var(--cds-gray-880);
  --cds-neutral-890: var(--cds-gray-890);
  --cds-neutral-900: var(--cds-gray-900);
  --cds-alpha-0: hsl(from var(--cds-neutral-900) h s l / 0%);
  --cds-alpha-1: hsl(from var(--cds-neutral-900) h s l / 5%);
  --cds-alpha-2: hsl(from var(--cds-neutral-900) h s l / 10%);
  --cds-alpha-3: hsl(from var(--cds-neutral-900) h s l / 20%);
  --cds-alpha-4: hsl(from var(--cds-neutral-900) h s l / 35%);
  --cds-alpha-5: hsl(from var(--cds-neutral-900) h s l / 50%);
  --cds-alpha-6: hsl(from var(--cds-neutral-900) h s l / 60%);
  --cds-alpha-7: hsl(from var(--cds-neutral-900) h s l / 70%);
  --cds-alpha-8: hsl(from var(--cds-neutral-900) h s l / 85%);
  --cds-alpha-9: hsl(from var(--cds-neutral-900) h s l / 95%);
  --cds-surface-0: var(--cds-gray-20);
  --cds-surface-1: var(--cds-gray-10);
  --cds-surface-2: var(--cds-gray-0);
  --cds-surface-3: var(--cds-gray-0);
  --cds-surface-popover: var(--cds-surface-3);
  --cds-surface-panel: var(--cds-surface-2);
  --cds-page-bg: var(--cds-surface-0);
  --cds-fill-accent: var(--cds-role-accent-fill);
  --cds-fill-accent-hover: var(--cds-role-accent-fill-hover);
  --cds-fill-danger: var(--cds-role-danger-fill);
  --cds-fill-danger-hover: var(--cds-role-danger-fill-hover);
  --cds-fill-success: var(--cds-role-success-fill);
  --cds-fill-success-hover: var(--cds-role-success-fill-hover);
  --cds-fill-warning: var(--cds-role-warning-fill);
  --cds-fill-warning-hover: var(--cds-role-warning-fill-hover);
  --cds-fill-pro: var(--cds-role-pro-fill);
  --cds-fill-pro-hover: var(--cds-role-pro-fill-hover);
  --cds-fill-git-removed: var(--cds-text-git-removed);
  --cds-fill-git-draft: var(--cds-text-git-draft);
  --cds-fill-git-opened: var(--cds-fill-git-added);
  --cds-fill-git-opened-hover: var(--cds-fill-git-added-hover);
  --cds-fill-git-queued: var(--cds-fill-git-modified);
  --cds-fill-git-queued-hover: var(--cds-fill-git-modified-hover);
  --cds-fill-brand: var(--cds-clay-emphasized);
  --cds-fill-brand-hover: var(--cds-clay);
  --cds-fill-primary: var(--cds-neutral-900);
  --cds-fill-primary-hover: var(--cds-neutral-750);
  --cds-fill-secondary: hsl(0 0% 100% / 0.1);
  --cds-fill-secondary-hover: var(--cds-alpha-1);
  --cds-fill-secondary-ring: var(--cds-border);
  --cds-fill-secondary-pressed-ring: var(--cds-border);
  --cds-fill-field: hsl(0 0% 100% / 0.5);
  --cds-fill-field-ring: var(--cds-border);
  --cds-fill-ghost-hover: var(--cds-alpha-1);
  --cds-fill-ghost-selected: var(--cds-alpha-2);
  --cds-fill-disabled: var(--cds-alpha-1);
  --cds-fill-control: var(--cds-alpha-2);
  --cds-fill-control-hover: var(--cds-alpha-3);
  --cds-bg-accent: var(--cds-role-accent-100);
  --cds-bg-accent-chip: var(--cds-bg-accent);
  --cds-bg-accent-muted: color-mix(in srgb, var(--cds-fill-accent) 10%, transparent);
  --cds-bg-danger: var(--cds-role-danger-100);
  --cds-bg-danger-chip: var(--cds-bg-danger);
  --cds-bg-success: var(--cds-role-success-100);
  --cds-bg-success-chip: var(--cds-bg-success);
  --cds-bg-warning: var(--cds-role-warning-100);
  --cds-bg-warning-chip: var(--cds-bg-warning);
  --cds-bg-pro: var(--cds-role-pro-100);
  --cds-bg-pro-chip: var(--cds-bg-pro);
  --cds-bg-tint-red: rgb(from var(--cds-red-100) calc((r - 163.8) / 0.35) calc((g - 163.8) / 0.35) calc((b - 163.15) / 0.35) / 35%);
  --cds-bg-tint-red-opaque: var(--cds-red-100);
  --cds-bg-tint-orange: rgb(from var(--cds-orange-100) calc((r - 163.8) / 0.35) calc((g - 163.8) / 0.35) calc((b - 163.15) / 0.35) / 35%);
  --cds-bg-tint-orange-opaque: var(--cds-orange-100);
  --cds-bg-tint-yellow: rgb(from var(--cds-yellow-100) calc((r - 163.8) / 0.35) calc((g - 163.8) / 0.35) calc((b - 163.15) / 0.35) / 35%);
  --cds-bg-tint-yellow-opaque: var(--cds-yellow-100);
  --cds-bg-tint-green: rgb(from var(--cds-green-100) calc((r - 163.8) / 0.35) calc((g - 163.8) / 0.35) calc((b - 163.15) / 0.35) / 35%);
  --cds-bg-tint-green-opaque: var(--cds-green-100);
  --cds-bg-tint-aqua: rgb(from var(--cds-aqua-100) calc((r - 163.8) / 0.35) calc((g - 163.8) / 0.35) calc((b - 163.15) / 0.35) / 35%);
  --cds-bg-tint-aqua-opaque: var(--cds-aqua-100);
  --cds-bg-tint-blue: rgb(from var(--cds-blue-100) calc((r - 163.8) / 0.35) calc((g - 163.8) / 0.35) calc((b - 163.15) / 0.35) / 35%);
  --cds-bg-tint-blue-opaque: var(--cds-blue-100);
  --cds-bg-tint-violet: rgb(from var(--cds-violet-100) calc((r - 163.8) / 0.35) calc((g - 163.8) / 0.35) calc((b - 163.15) / 0.35) / 35%);
  --cds-bg-tint-violet-opaque: var(--cds-violet-100);
  --cds-bg-tint-magenta: rgb(from var(--cds-magenta-100) calc((r - 163.8) / 0.35) calc((g - 163.8) / 0.35) calc((b - 163.15) / 0.35) / 35%);
  --cds-bg-tint-magenta-opaque: var(--cds-magenta-100);
  --cds-bg-git-added: color-mix(in srgb, var(--cds-text-git-added) 20%, transparent);
  --cds-bg-git-removed: color-mix(in srgb, var(--cds-text-git-removed) 20%, transparent);
  --cds-bg-git-modified: color-mix(in srgb, var(--cds-text-git-modified) 20%, transparent);
  --cds-bg-git-merged: color-mix(in srgb, var(--cds-text-git-merged) 20%, transparent);
  --cds-bg-git-closed: color-mix(in srgb, var(--cds-text-git-closed) 20%, transparent);
  --cds-bg-git-conflicting: color-mix(in srgb, var(--cds-text-git-conflicting) 20%, transparent);
  --cds-bg-git-draft: color-mix(in srgb, var(--cds-text-git-draft) 20%, transparent);
  --cds-bg-git-opened: var(--cds-bg-git-added);
  --cds-bg-git-queued: var(--cds-bg-git-modified);
  --cds-bg-highlight: color-mix(in srgb, var(--cds-fill-warning) 33%, transparent);
  --cds-bg-editor-canvas: var(--cds-neutral-60);
  --cds-bg-editor-claude-pending: color-mix(in srgb, var(--cds-clay) 22%, transparent);
  --cds-bg-editor-highlight-yellow: var(--cds-bg-highlight);
  --cds-bg-editor-highlight-green: color-mix(in srgb, var(--cds-green-300) 33%, transparent);
  --cds-bg-editor-highlight-blue: color-mix(in srgb, var(--cds-blue-300) 33%, transparent);
  --cds-bg-editor-highlight-magenta: color-mix(in srgb, var(--cds-magenta-300) 33%, transparent);
  --cds-bg-editor-highlight-violet: color-mix(in srgb, var(--cds-violet-300) 33%, transparent);
  --cds-bg-editor-highlight-gray: color-mix(in srgb, var(--cds-gray-300) 33%, transparent);
  --cds-bg-editor-collaborator-1: color-mix(in srgb, var(--cds-editor-collaborator-1) 22%, transparent);
  --cds-bg-editor-collaborator-2: color-mix(in srgb, var(--cds-editor-collaborator-2) 22%, transparent);
  --cds-bg-editor-collaborator-3: color-mix(in srgb, var(--cds-editor-collaborator-3) 22%, transparent);
  --cds-bg-editor-collaborator-4: color-mix(in srgb, var(--cds-editor-collaborator-4) 22%, transparent);
  --cds-bg-editor-collaborator-5: color-mix(in srgb, var(--cds-editor-collaborator-5) 22%, transparent);
  --cds-bg-editor-collaborator-6: color-mix(in srgb, var(--cds-editor-collaborator-6) 22%, transparent);
  --cds-bg-editor-comment: color-mix(in srgb, var(--cds-fill-warning) 20%, transparent);
  --cds-bg-editor-comment-active: color-mix(in srgb, var(--cds-fill-warning) 45%, transparent);
  --cds-bg-neutral: var(--cds-alpha-1);
  --cds-bg-neutral-hover: var(--cds-alpha-2);
  --cds-bg-neutral-chip: var(--cds-bg-neutral);
  --cds-bg-neutral-chip-hover: var(--cds-bg-neutral-hover);
  --cds-bg-user-message: var(--cds-bg-neutral);
  --cds-backdrop: rgb(0 0 0 / 0.4);
  --cds-text-accent: var(--cds-role-accent-600);
  --cds-text-danger: var(--cds-role-danger-600);
  --cds-text-success: var(--cds-role-success-600);
  --cds-text-warning: var(--cds-role-warning-600);
  --cds-text-pro: var(--cds-role-pro-600);
  --cds-text-tint-red: var(--cds-red-600);
  --cds-text-tint-orange: var(--cds-orange-600);
  --cds-text-tint-yellow: var(--cds-yellow-600);
  --cds-text-tint-green: var(--cds-green-600);
  --cds-text-tint-aqua: var(--cds-aqua-600);
  --cds-text-tint-blue: var(--cds-blue-600);
  --cds-text-tint-violet: var(--cds-violet-600);
  --cds-text-tint-magenta: var(--cds-magenta-600);
  --cds-text-git-opened: var(--cds-text-git-added);
  --cds-text-git-queued: var(--cds-text-git-modified);
  --cds-text-primary: var(--cds-neutral-900);
  --cds-text-secondary: var(--cds-neutral-600);
  --cds-text-muted: var(--cds-neutral-400);
  --cds-text-disabled: var(--cds-alpha-4);
  --cds-font-size-caption: calc(0.6875rem * var(--cds-rem-scale, 1));
  --cds-font-size-footnote: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-font-size-code: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-font-size-body: calc(0.8125rem * var(--cds-rem-scale, 1));
  --cds-font-size-prose: 0.875rem;
  --cds-font-size-heading: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-font-size-title: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-font-weight-regular: 400;
  --cds-font-weight-medium: 500;
  --cds-font-weight-semibold: 580;
  --cds-font-weight-bold: 600;
  --cds-font-wght-regular: normal;
  --cds-font-wght-medium: normal;
  --cds-font-wght-semibold: normal;
  --cds-font-wght-bold: normal;
  --cds-font-axis-wght-regular: ;
  --cds-font-axis-wght-medium: ;
  --cds-font-axis-wght-semibold: ;
  --cds-font-axis-wght-bold: ;
  --cds-font-grad-semibold: 180;
  --cds-font-grad-bold: 200;
  --cds-leading-caption: calc(1.0625rem * var(--cds-rem-scale, 1));
  --cds-leading-footnote: calc(0.9375rem * var(--cds-rem-scale, 1));
  --cds-leading-code: calc(1.0625rem * var(--cds-rem-scale, 1));
  --cds-leading-body: calc(1.1875rem * var(--cds-rem-scale, 1));
  --cds-leading-prose: 1.25rem;
  --cds-leading-heading: calc(1.125rem * var(--cds-rem-scale, 1));
  --cds-leading-title: calc(1.5625rem * var(--cds-rem-scale, 1));
  --cds-on-primary: var(--cds-neutral-0);
  --cds-on-accent: var(--cds-role-accent-on);
  --cds-on-danger: var(--cds-role-danger-on);
  --cds-on-success: var(--cds-role-success-on);
  --cds-on-warning: var(--cds-role-warning-on);
  --cds-on-pro: var(--cds-role-pro-on);
  --cds-on-git-added: var(--cds-gray-0);
  --cds-on-git-removed: var(--cds-gray-0);
  --cds-on-git-modified: var(--cds-gray-0);
  --cds-on-git-merged: var(--cds-gray-0);
  --cds-on-git-closed: var(--cds-gray-0);
  --cds-on-git-conflicting: var(--cds-gray-0);
  --cds-on-git-draft: var(--cds-gray-0);
  --cds-on-git-opened: var(--cds-on-git-added);
  --cds-on-git-queued: var(--cds-on-git-modified);
  --cds-on-brand: #ffffff;
  --cds-chart-categorical-1: var(--cds-blue-450);
  --cds-chart-categorical-2: var(--cds-orange-350);
  --cds-chart-categorical-3: var(--cds-aqua-350);
  --cds-chart-categorical-4: var(--cds-yellow-250);
  --cds-chart-categorical-5: var(--cds-magenta-300);
  --cds-chart-categorical-6: var(--cds-green-500);
  --cds-chart-categorical-7: var(--cds-violet-500);
  --cds-chart-categorical-8: var(--cds-red-400);
  --cds-chart-sequential-1: var(--cds-blue-100);
  --cds-chart-sequential-2: var(--cds-blue-200);
  --cds-chart-sequential-3: var(--cds-blue-300);
  --cds-chart-sequential-4: var(--cds-blue-400);
  --cds-chart-sequential-5: var(--cds-blue-500);
  --cds-chart-sequential-6: var(--cds-blue-600);
  --cds-chart-sequential-7: var(--cds-blue-700);
  --cds-chart-diverging-1: var(--cds-blue-500);
  --cds-chart-diverging-2: var(--cds-blue-350);
  --cds-chart-diverging-3: var(--cds-blue-200);
  --cds-chart-diverging-4: var(--cds-gray-50);
  --cds-chart-diverging-5: var(--cds-red-200);
  --cds-chart-diverging-6: var(--cds-red-350);
  --cds-chart-diverging-7: var(--cds-red-500);
  --cds-chart-status-good: var(--cds-green-400);
  --cds-chart-status-warning: var(--cds-yellow-200);
  --cds-chart-status-serious: var(--cds-orange-300);
  --cds-chart-status-critical: var(--cds-red-450);
  --cds-chart-muted: var(--cds-gray-200);
  --cds-chart-reference: var(--cds-gray-400);
  --cds-chart-reference-tint: hsl(from var(--cds-gray-400) h s l / 15%);
  --cds-chart-grid: var(--cds-alpha-2);
  --cds-chart-axis: var(--cds-gray-200);
  --cds-chart-baseline: var(--cds-gray-200);
  --cds-editor-collaborator-1: var(--cds-violet-450);
  --cds-editor-collaborator-2: var(--cds-magenta-450);
  --cds-editor-collaborator-3: var(--cds-aqua-500);
  --cds-editor-collaborator-4: var(--cds-green-500);
  --cds-editor-collaborator-5: var(--cds-yellow-500);
  --cds-editor-collaborator-6: var(--cds-gray-500);
  --cds-opacity-disabled: 0.4;
  --cds-opacity-icon-secondary: 0.4;
  --cds-z-modal: 40;
  --cds-z-coachmark: 35;
  --cds-z-popover: 50;
  --cds-z-tooltip: 50;
  --cds-z-toast: 60;
  --cds-avatar-xs: calc(1rem * var(--cds-rem-scale, 1));
  --cds-avatar-sm: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-avatar-md: calc(1.75rem * var(--cds-rem-scale, 1));
  --cds-avatar-lg: calc(2.25rem * var(--cds-rem-scale, 1));
  --cds-avatar-text-xs: calc(0.5rem * var(--cds-rem-scale, 1));
  --cds-button-on-content: hsl(0 0% 100% / 0.6);
  --cds-button-on-content-hover: hsl(0 0% 100% / 0.7);
  --cds-button-on-content-ring: hsl(0 0% 100% / 0.35);
  --cds-checkbox: calc(1rem * var(--cds-rem-scale, 1));
  --cds-checkbox-glyph: calc(1rem * var(--cds-rem-scale, 1));
  --cds-checkbox-radius: calc(0.25rem * var(--cds-rem-scale, 1));
  --cds-checkbox-xxs: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-checkbox-xxs-glyph: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-checkbox-xxs-radius: calc(0.1875rem * var(--cds-rem-scale, 1));
  --cds-page-header-title-size: calc(1.5rem * var(--cds-rem-scale, 1));
  --cds-page-header-title-leading: calc(2rem * var(--cds-rem-scale, 1));
  --cds-panel-radius: calc(0.625rem * var(--cds-rem-scale, 1));
  --cds-panel-shadow: 0 0 0 1px var(--cds-border), var(--cds-shadow-sm);
  --cds-panel-inset: calc(0.5rem * var(--cds-rem-scale, 1));
  --cds-panel-gap: calc(0.5rem * var(--cds-rem-scale, 1));
  --cds-panel-line: 0px;
  --cds-panel-header-pad-block: calc(0.25rem * var(--cds-rem-scale, 1));
  --cds-panel-header-pad-inline: calc(0.25rem * var(--cds-rem-scale, 1));
  --cds-panel-header-line: 0px;
  --cds-radio-group-card-selected: var(--cds-role-accent-50);
  --cds-segmented-control-thumb: var(--cds-surface-popover);
  --cds-segmented-control-track: var(--cds-alpha-1);
  --cds-shortcut-cap-ink: var(--cds-gray-500);
  --cds-shortcut-cap-fill: transparent;
  --cds-shortcut-cap-line: color-mix(in srgb, currentColor 18%, transparent);
  --cds-skeleton-base: var(--cds-alpha-1);
  --cds-skeleton-sheen: var(--cds-alpha-1);
  --cds-slider-track: var(--cds-alpha-2);
  --cds-slider-fill: var(--cds-alpha-3);
  --cds-slider-handle: var(--cds-gray-0);
  --cds-slider-handle-shadow-outer: hsl(from var(--cds-gray-900) h s l / 4%);
  --cds-slider-handle-shadow-depth: hsl(from var(--cds-gray-900) h s l / 6%);
  --cds-slider-stop-dot: hsl(from var(--cds-gray-900) h s l / 25%);
  --cds-switch-knob: var(--cds-gray-0);
  --cds-switch-track: var(--cds-alpha-3);
  --cds-switch-track-hover: var(--cds-alpha-4);
  --cds-switch-h: calc(1rem * var(--cds-rem-scale, 1));
  --cds-toolbar-pad-block: calc(0.25rem * var(--cds-rem-scale, 1));
  --cds-toolbar-pad-inline: calc(0rem * var(--cds-rem-scale, 1));
  --cds-toolbar-title-pad: calc(0.25rem * var(--cds-rem-scale, 1));
  --cds-toolbar-line: 0px;
  --cds-tooltip-bg: var(--cds-role-tooltip-bg);
  --cds-tooltip-fg: var(--cds-role-tooltip-fg);
}

@media screen {
  [data-mode="dark"] .cds-root:not([data-mode="light"]):not([data-mode="system"]),
  .cds-root[data-mode="dark"] {
    --cds-border-accent: var(--cds-role-accent-700);
    --cds-border-danger: var(--cds-role-danger-700);
    --cds-border-success: var(--cds-role-success-700);
    --cds-border-warning: var(--cds-role-warning-700);
    --cds-border-pro: var(--cds-role-pro-700);
    --cds-border-editor-comment: var(--cds-yellow-300);
    --cds-shadow-color: rgba(0, 0, 0, 0.24);
    --cds-shadow-popover: 0 8px 24px rgb(0 0 0 / 0.32), 0 2px 6px rgb(0 0 0 / 0.2);
    --cds-ring-outer: 0px;
    --cds-ring-inner: 1px;
    --cds-ring-color: var(--cds-alpha-2);
    --cds-focus-shadow: inset 0 0 0 1px var(--cds-page-bg), 0 0 0 1px var(--cds-fill-accent), 0 0 6px 1px hsl(from var(--cds-role-accent-600) h s l / 60%);
    --cds-focus-shadow-danger: inset 0 0 0 1px var(--cds-page-bg), 0 0 0 1px var(--cds-fill-danger), 0 0 6px 1px hsl(from var(--cds-role-danger-600) h s l / 60%);
    --cds-pictogram-highlight-default: var(--cds-gray-650);
    --cds-pictogram-highlight-heather: var(--cds-plum);
    --cds-pictogram-highlight-cactus: var(--cds-mineral);
    --cds-neutral-0: var(--cds-gray-900);
    --cds-neutral-10: var(--cds-gray-890);
    --cds-neutral-20: var(--cds-gray-880);
    --cds-neutral-30: var(--cds-gray-870);
    --cds-neutral-40: var(--cds-gray-860);
    --cds-neutral-50: var(--cds-gray-850);
    --cds-neutral-60: var(--cds-gray-840);
    --cds-neutral-70: var(--cds-gray-830);
    --cds-neutral-80: var(--cds-gray-820);
    --cds-neutral-90: var(--cds-gray-810);
    --cds-neutral-100: var(--cds-gray-800);
    --cds-neutral-150: var(--cds-gray-750);
    --cds-neutral-200: var(--cds-gray-700);
    --cds-neutral-250: var(--cds-gray-650);
    --cds-neutral-300: var(--cds-gray-600);
    --cds-neutral-350: var(--cds-gray-550);
    --cds-neutral-400: var(--cds-gray-500);
    --cds-neutral-450: var(--cds-gray-450);
    --cds-neutral-500: var(--cds-gray-400);
    --cds-neutral-550: var(--cds-gray-350);
    --cds-neutral-600: var(--cds-gray-300);
    --cds-neutral-650: var(--cds-gray-250);
    --cds-neutral-700: var(--cds-gray-200);
    --cds-neutral-750: var(--cds-gray-150);
    --cds-neutral-800: var(--cds-gray-100);
    --cds-neutral-810: var(--cds-gray-90);
    --cds-neutral-820: var(--cds-gray-80);
    --cds-neutral-830: var(--cds-gray-70);
    --cds-neutral-840: var(--cds-gray-60);
    --cds-neutral-850: var(--cds-gray-50);
    --cds-neutral-860: var(--cds-gray-40);
    --cds-neutral-870: var(--cds-gray-30);
    --cds-neutral-880: var(--cds-gray-20);
    --cds-neutral-890: var(--cds-gray-10);
    --cds-neutral-900: var(--cds-gray-0);
    --cds-surface-0: var(--cds-gray-900);
    --cds-surface-1: var(--cds-gray-850);
    --cds-surface-2: var(--cds-gray-830);
    --cds-surface-3: var(--cds-gray-800);
    --cds-fill-primary-hover: var(--cds-gray-100);
    --cds-fill-secondary: var(--cds-alpha-2);
    --cds-fill-secondary-hover: hsl(from var(--cds-neutral-900) h s l / 14%);
    --cds-fill-secondary-ring: transparent;
    --cds-fill-field: var(--cds-alpha-1);
    --cds-fill-ghost-hover: hsl(from var(--cds-neutral-900) h s l / 7.5%);
    --cds-fill-ghost-selected: hsl(from var(--cds-neutral-900) h s l / 15%);
    --cds-bg-accent: var(--cds-role-accent-800);
    --cds-bg-danger: var(--cds-role-danger-800);
    --cds-bg-success: var(--cds-role-success-800);
    --cds-bg-warning: var(--cds-role-warning-800);
    --cds-bg-pro: var(--cds-role-pro-800);
    --cds-bg-tint-red: rgb(from var(--cds-red-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-red-opaque: var(--cds-red-800);
    --cds-bg-tint-orange: rgb(from var(--cds-orange-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-orange-opaque: var(--cds-orange-800);
    --cds-bg-tint-yellow: rgb(from var(--cds-yellow-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-yellow-opaque: var(--cds-yellow-800);
    --cds-bg-tint-green: rgb(from var(--cds-green-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-green-opaque: var(--cds-green-800);
    --cds-bg-tint-aqua: rgb(from var(--cds-aqua-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-aqua-opaque: var(--cds-aqua-800);
    --cds-bg-tint-blue: rgb(from var(--cds-blue-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-blue-opaque: var(--cds-blue-800);
    --cds-bg-tint-violet: rgb(from var(--cds-violet-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-violet-opaque: var(--cds-violet-800);
    --cds-bg-tint-magenta: rgb(from var(--cds-magenta-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-magenta-opaque: var(--cds-magenta-800);
    --cds-backdrop: rgb(0 0 0 / 0.5);
    --cds-text-accent: var(--cds-role-accent-300);
    --cds-text-danger: var(--cds-role-danger-300);
    --cds-text-success: var(--cds-role-success-400);
    --cds-text-warning: var(--cds-role-warning-300);
    --cds-text-pro: var(--cds-role-pro-300);
    --cds-text-tint-red: var(--cds-red-300);
    --cds-text-tint-orange: var(--cds-orange-300);
    --cds-text-tint-yellow: var(--cds-yellow-300);
    --cds-text-tint-green: var(--cds-green-300);
    --cds-text-tint-aqua: var(--cds-aqua-300);
    --cds-text-tint-blue: var(--cds-blue-300);
    --cds-text-tint-violet: var(--cds-violet-300);
    --cds-text-tint-magenta: var(--cds-magenta-300);
    --cds-text-primary: var(--cds-gray-50);
    --cds-text-secondary: var(--cds-gray-200);
    --cds-text-muted: var(--cds-gray-400);
    --cds-font-wght-regular: "wght" 360;
    --cds-font-wght-medium: "wght" 460;
    --cds-font-wght-semibold: "wght" 540;
    --cds-font-wght-bold: "wght" 560;
    --cds-font-axis-wght-regular: var(--cds-font-wght-regular),;
    --cds-font-axis-wght-medium: var(--cds-font-wght-medium),;
    --cds-font-axis-wght-semibold: var(--cds-font-wght-semibold),;
    --cds-font-axis-wght-bold: var(--cds-font-wght-bold),;
    --cds-on-git-added: var(--cds-gray-900);
    --cds-on-git-removed: var(--cds-gray-900);
    --cds-on-git-modified: var(--cds-gray-900);
    --cds-on-git-merged: var(--cds-gray-900);
    --cds-on-git-closed: var(--cds-gray-900);
    --cds-on-git-conflicting: var(--cds-gray-900);
    --cds-on-git-draft: var(--cds-gray-900);
    --cds-chart-categorical-1: var(--cds-blue-400);
    --cds-chart-categorical-2: var(--cds-orange-400);
    --cds-chart-categorical-3: var(--cds-aqua-400);
    --cds-chart-categorical-4: var(--cds-yellow-350);
    --cds-chart-categorical-5: var(--cds-magenta-400);
    --cds-chart-categorical-6: var(--cds-green-500);
    --cds-chart-categorical-7: var(--cds-violet-350);
    --cds-chart-categorical-8: var(--cds-red-350);
    --cds-chart-sequential-1: var(--cds-blue-700);
    --cds-chart-sequential-2: var(--cds-blue-600);
    --cds-chart-sequential-3: var(--cds-blue-500);
    --cds-chart-sequential-4: var(--cds-blue-400);
    --cds-chart-sequential-5: var(--cds-blue-300);
    --cds-chart-sequential-6: var(--cds-blue-200);
    --cds-chart-sequential-7: var(--cds-blue-100);
    --cds-chart-diverging-1: var(--cds-blue-300);
    --cds-chart-diverging-2: var(--cds-blue-450);
    --cds-chart-diverging-3: var(--cds-blue-600);
    --cds-chart-diverging-4: var(--cds-gray-700);
    --cds-chart-diverging-5: var(--cds-red-600);
    --cds-chart-diverging-6: var(--cds-red-450);
    --cds-chart-diverging-7: var(--cds-red-300);
    --cds-chart-status-good: var(--cds-green-400);
    --cds-chart-status-warning: var(--cds-yellow-200);
    --cds-chart-status-serious: var(--cds-orange-300);
    --cds-chart-status-critical: var(--cds-red-450);
    --cds-chart-muted: var(--cds-gray-550);
    --cds-chart-reference: var(--cds-gray-350);
    --cds-chart-reference-tint: hsl(from var(--cds-gray-350) h s l / 15%);
    --cds-chart-axis: var(--cds-gray-700);
    --cds-chart-baseline: var(--cds-gray-700);
    --cds-button-on-content: hsl(0 0% 0% / 0.55);
    --cds-button-on-content-hover: hsl(0 0% 0% / 0.65);
    --cds-button-on-content-ring: transparent;
    --cds-radio-group-card-selected: var(--cds-role-accent-850);
    --cds-segmented-control-thumb: var(--cds-alpha-2);
    --cds-shortcut-cap-ink: var(--cds-gray-300);
    --cds-shortcut-cap-line: color-mix(in srgb, currentColor 22%, transparent);
    --cds-skeleton-base: hsl(from var(--cds-neutral-900) h s l / 7.5%);
    --cds-skeleton-sheen: hsl(from var(--cds-neutral-900) h s l / 7.5%);
    --cds-slider-fill: var(--cds-alpha-4);
    --cds-slider-handle-shadow-outer: hsl(from var(--cds-gray-0) h s l / 0%);
    --cds-slider-handle-shadow-depth: hsl(from var(--cds-gray-900) h s l / 24%);
    --cds-slider-stop-dot: hsl(from var(--cds-gray-0) h s l / 25%);
    --cds-switch-track: var(--cds-alpha-2);
    --cds-switch-track-hover: var(--cds-alpha-3);
    --cds-tooltip-bg: var(--cds-surface-3);
    --cds-tooltip-fg: var(--cds-text-primary);
  }
}

@media screen and (prefers-color-scheme: dark) {
  [data-mode="system"]
    .cds-root:not([data-mode="light"]):not([data-mode="dark"]),
  .cds-root[data-mode="system"],
  .cds-root:not([data-mode]):not([data-mode] *) {
    --cds-border-accent: var(--cds-role-accent-700);
    --cds-border-danger: var(--cds-role-danger-700);
    --cds-border-success: var(--cds-role-success-700);
    --cds-border-warning: var(--cds-role-warning-700);
    --cds-border-pro: var(--cds-role-pro-700);
    --cds-border-editor-comment: var(--cds-yellow-300);
    --cds-shadow-color: rgba(0, 0, 0, 0.24);
    --cds-shadow-popover: 0 8px 24px rgb(0 0 0 / 0.32), 0 2px 6px rgb(0 0 0 / 0.2);
    --cds-ring-outer: 0px;
    --cds-ring-inner: 1px;
    --cds-ring-color: var(--cds-alpha-2);
    --cds-focus-shadow: inset 0 0 0 1px var(--cds-page-bg), 0 0 0 1px var(--cds-fill-accent), 0 0 6px 1px hsl(from var(--cds-role-accent-600) h s l / 60%);
    --cds-focus-shadow-danger: inset 0 0 0 1px var(--cds-page-bg), 0 0 0 1px var(--cds-fill-danger), 0 0 6px 1px hsl(from var(--cds-role-danger-600) h s l / 60%);
    --cds-pictogram-highlight-default: var(--cds-gray-650);
    --cds-pictogram-highlight-heather: var(--cds-plum);
    --cds-pictogram-highlight-cactus: var(--cds-mineral);
    --cds-neutral-0: var(--cds-gray-900);
    --cds-neutral-10: var(--cds-gray-890);
    --cds-neutral-20: var(--cds-gray-880);
    --cds-neutral-30: var(--cds-gray-870);
    --cds-neutral-40: var(--cds-gray-860);
    --cds-neutral-50: var(--cds-gray-850);
    --cds-neutral-60: var(--cds-gray-840);
    --cds-neutral-70: var(--cds-gray-830);
    --cds-neutral-80: var(--cds-gray-820);
    --cds-neutral-90: var(--cds-gray-810);
    --cds-neutral-100: var(--cds-gray-800);
    --cds-neutral-150: var(--cds-gray-750);
    --cds-neutral-200: var(--cds-gray-700);
    --cds-neutral-250: var(--cds-gray-650);
    --cds-neutral-300: var(--cds-gray-600);
    --cds-neutral-350: var(--cds-gray-550);
    --cds-neutral-400: var(--cds-gray-500);
    --cds-neutral-450: var(--cds-gray-450);
    --cds-neutral-500: var(--cds-gray-400);
    --cds-neutral-550: var(--cds-gray-350);
    --cds-neutral-600: var(--cds-gray-300);
    --cds-neutral-650: var(--cds-gray-250);
    --cds-neutral-700: var(--cds-gray-200);
    --cds-neutral-750: var(--cds-gray-150);
    --cds-neutral-800: var(--cds-gray-100);
    --cds-neutral-810: var(--cds-gray-90);
    --cds-neutral-820: var(--cds-gray-80);
    --cds-neutral-830: var(--cds-gray-70);
    --cds-neutral-840: var(--cds-gray-60);
    --cds-neutral-850: var(--cds-gray-50);
    --cds-neutral-860: var(--cds-gray-40);
    --cds-neutral-870: var(--cds-gray-30);
    --cds-neutral-880: var(--cds-gray-20);
    --cds-neutral-890: var(--cds-gray-10);
    --cds-neutral-900: var(--cds-gray-0);
    --cds-surface-0: var(--cds-gray-900);
    --cds-surface-1: var(--cds-gray-850);
    --cds-surface-2: var(--cds-gray-830);
    --cds-surface-3: var(--cds-gray-800);
    --cds-fill-primary-hover: var(--cds-gray-100);
    --cds-fill-secondary: var(--cds-alpha-2);
    --cds-fill-secondary-hover: hsl(from var(--cds-neutral-900) h s l / 14%);
    --cds-fill-secondary-ring: transparent;
    --cds-fill-field: var(--cds-alpha-1);
    --cds-fill-ghost-hover: hsl(from var(--cds-neutral-900) h s l / 7.5%);
    --cds-fill-ghost-selected: hsl(from var(--cds-neutral-900) h s l / 15%);
    --cds-bg-accent: var(--cds-role-accent-800);
    --cds-bg-danger: var(--cds-role-danger-800);
    --cds-bg-success: var(--cds-role-success-800);
    --cds-bg-warning: var(--cds-role-warning-800);
    --cds-bg-pro: var(--cds-role-pro-800);
    --cds-bg-tint-red: rgb(from var(--cds-red-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-red-opaque: var(--cds-red-800);
    --cds-bg-tint-orange: rgb(from var(--cds-orange-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-orange-opaque: var(--cds-orange-800);
    --cds-bg-tint-yellow: rgb(from var(--cds-yellow-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-yellow-opaque: var(--cds-yellow-800);
    --cds-bg-tint-green: rgb(from var(--cds-green-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-green-opaque: var(--cds-green-800);
    --cds-bg-tint-aqua: rgb(from var(--cds-aqua-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-aqua-opaque: var(--cds-aqua-800);
    --cds-bg-tint-blue: rgb(from var(--cds-blue-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-blue-opaque: var(--cds-blue-800);
    --cds-bg-tint-violet: rgb(from var(--cds-violet-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-violet-opaque: var(--cds-violet-800);
    --cds-bg-tint-magenta: rgb(from var(--cds-magenta-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-magenta-opaque: var(--cds-magenta-800);
    --cds-backdrop: rgb(0 0 0 / 0.5);
    --cds-text-accent: var(--cds-role-accent-300);
    --cds-text-danger: var(--cds-role-danger-300);
    --cds-text-success: var(--cds-role-success-400);
    --cds-text-warning: var(--cds-role-warning-300);
    --cds-text-pro: var(--cds-role-pro-300);
    --cds-text-tint-red: var(--cds-red-300);
    --cds-text-tint-orange: var(--cds-orange-300);
    --cds-text-tint-yellow: var(--cds-yellow-300);
    --cds-text-tint-green: var(--cds-green-300);
    --cds-text-tint-aqua: var(--cds-aqua-300);
    --cds-text-tint-blue: var(--cds-blue-300);
    --cds-text-tint-violet: var(--cds-violet-300);
    --cds-text-tint-magenta: var(--cds-magenta-300);
    --cds-text-primary: var(--cds-gray-50);
    --cds-text-secondary: var(--cds-gray-200);
    --cds-text-muted: var(--cds-gray-400);
    --cds-font-wght-regular: "wght" 360;
    --cds-font-wght-medium: "wght" 460;
    --cds-font-wght-semibold: "wght" 540;
    --cds-font-wght-bold: "wght" 560;
    --cds-font-axis-wght-regular: var(--cds-font-wght-regular),;
    --cds-font-axis-wght-medium: var(--cds-font-wght-medium),;
    --cds-font-axis-wght-semibold: var(--cds-font-wght-semibold),;
    --cds-font-axis-wght-bold: var(--cds-font-wght-bold),;
    --cds-on-git-added: var(--cds-gray-900);
    --cds-on-git-removed: var(--cds-gray-900);
    --cds-on-git-modified: var(--cds-gray-900);
    --cds-on-git-merged: var(--cds-gray-900);
    --cds-on-git-closed: var(--cds-gray-900);
    --cds-on-git-conflicting: var(--cds-gray-900);
    --cds-on-git-draft: var(--cds-gray-900);
    --cds-chart-categorical-1: var(--cds-blue-400);
    --cds-chart-categorical-2: var(--cds-orange-400);
    --cds-chart-categorical-3: var(--cds-aqua-400);
    --cds-chart-categorical-4: var(--cds-yellow-350);
    --cds-chart-categorical-5: var(--cds-magenta-400);
    --cds-chart-categorical-6: var(--cds-green-500);
    --cds-chart-categorical-7: var(--cds-violet-350);
    --cds-chart-categorical-8: var(--cds-red-350);
    --cds-chart-sequential-1: var(--cds-blue-700);
    --cds-chart-sequential-2: var(--cds-blue-600);
    --cds-chart-sequential-3: var(--cds-blue-500);
    --cds-chart-sequential-4: var(--cds-blue-400);
    --cds-chart-sequential-5: var(--cds-blue-300);
    --cds-chart-sequential-6: var(--cds-blue-200);
    --cds-chart-sequential-7: var(--cds-blue-100);
    --cds-chart-diverging-1: var(--cds-blue-300);
    --cds-chart-diverging-2: var(--cds-blue-450);
    --cds-chart-diverging-3: var(--cds-blue-600);
    --cds-chart-diverging-4: var(--cds-gray-700);
    --cds-chart-diverging-5: var(--cds-red-600);
    --cds-chart-diverging-6: var(--cds-red-450);
    --cds-chart-diverging-7: var(--cds-red-300);
    --cds-chart-status-good: var(--cds-green-400);
    --cds-chart-status-warning: var(--cds-yellow-200);
    --cds-chart-status-serious: var(--cds-orange-300);
    --cds-chart-status-critical: var(--cds-red-450);
    --cds-chart-muted: var(--cds-gray-550);
    --cds-chart-reference: var(--cds-gray-350);
    --cds-chart-reference-tint: hsl(from var(--cds-gray-350) h s l / 15%);
    --cds-chart-axis: var(--cds-gray-700);
    --cds-chart-baseline: var(--cds-gray-700);
    --cds-button-on-content: hsl(0 0% 0% / 0.55);
    --cds-button-on-content-hover: hsl(0 0% 0% / 0.65);
    --cds-button-on-content-ring: transparent;
    --cds-radio-group-card-selected: var(--cds-role-accent-850);
    --cds-segmented-control-thumb: var(--cds-alpha-2);
    --cds-shortcut-cap-ink: var(--cds-gray-300);
    --cds-shortcut-cap-line: color-mix(in srgb, currentColor 22%, transparent);
    --cds-skeleton-base: hsl(from var(--cds-neutral-900) h s l / 7.5%);
    --cds-skeleton-sheen: hsl(from var(--cds-neutral-900) h s l / 7.5%);
    --cds-slider-fill: var(--cds-alpha-4);
    --cds-slider-handle-shadow-outer: hsl(from var(--cds-gray-0) h s l / 0%);
    --cds-slider-handle-shadow-depth: hsl(from var(--cds-gray-900) h s l / 24%);
    --cds-slider-stop-dot: hsl(from var(--cds-gray-0) h s l / 25%);
    --cds-switch-track: var(--cds-alpha-2);
    --cds-switch-track-hover: var(--cds-alpha-3);
    --cds-tooltip-bg: var(--cds-surface-3);
    --cds-tooltip-fg: var(--cds-text-primary);
  }
}

.cds-root[data-font="system"] {
  --cds-font-sans: var(--cds-font-system);
  --cds-font-sans-display: var(--cds-font-sans);
  --cds-leading-footnote: calc(1rem * var(--cds-rem-scale, 1));
}

.cds-root[data-platform="desktop"] {
  --cds-cursor-interactive: default;
}

.cds-root[data-density="comfortable"] {
  --cds-radius: calc(0.5rem * var(--cds-rem-scale, 1));
  --cds-radius-composer: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-h-control: calc(2rem * var(--cds-rem-scale, 1));
  --cds-h-control-nested: calc(1.375rem * var(--cds-rem-scale, 1));
  --cds-icon: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-pad-xs: calc(0.375rem * var(--cds-rem-scale, 1));
  --cds-pad-sm: calc(0.5rem * var(--cds-rem-scale, 1));
  --cds-pad-md: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-pad-lg: calc(1rem * var(--cds-rem-scale, 1));
  --cds-pad-xl: calc(1.5rem * var(--cds-rem-scale, 1));
  --cds-gap-xs: calc(0.5rem * var(--cds-rem-scale, 1));
  --cds-gap-sm: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-gap-md: calc(1rem * var(--cds-rem-scale, 1));
  --cds-gap-lg: calc(1.75rem * var(--cds-rem-scale, 1));
  --cds-gap-xl: calc(2.5rem * var(--cds-rem-scale, 1));
  --cds-font-size-caption: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-font-size-footnote: calc(0.8125rem * var(--cds-rem-scale, 1));
  --cds-font-size-code: calc(0.8125rem * var(--cds-rem-scale, 1));
  --cds-font-size-body: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-font-size-prose: 1rem;
  --cds-font-size-heading: calc(0.9375rem * var(--cds-rem-scale, 1));
  --cds-font-size-title: calc(1.375rem * var(--cds-rem-scale, 1));
  --cds-leading-caption: calc(1.0625rem * var(--cds-rem-scale, 1));
  --cds-leading-footnote: calc(1.0625rem * var(--cds-rem-scale, 1));
  --cds-leading-code: calc(1.1875rem * var(--cds-rem-scale, 1));
  --cds-leading-body: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-leading-prose: 1.5rem;
  --cds-leading-heading: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-leading-title: calc(1.75rem * var(--cds-rem-scale, 1));
  --cds-avatar-xs: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-avatar-sm: calc(1.5rem * var(--cds-rem-scale, 1));
  --cds-avatar-md: calc(2rem * var(--cds-rem-scale, 1));
  --cds-avatar-lg: calc(2.5rem * var(--cds-rem-scale, 1));
  --cds-avatar-text-xs: calc(0.5625rem * var(--cds-rem-scale, 1));
  --cds-checkbox: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-checkbox-glyph: calc(1rem * var(--cds-rem-scale, 1));
  --cds-checkbox-radius: calc(0.3125rem * var(--cds-rem-scale, 1));
  --cds-panel-radius: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-switch-h: calc(1.25rem * var(--cds-rem-scale, 1));
}

@media (min-resolution: 2dppx) {
  .cds-root {
    --cds-ring-hairline: 0.5px;
  }
}

@media (min-resolution: 3dppx) {
  .cds-root {
    --cds-ring-hairline: calc(1px / 3);
  }
}

@media (min-resolution: 4dppx) {
  .cds-root {
    --cds-ring-hairline: calc(1px / 4);
  }
}

.cds-root [data-step="1"] {
  --cds-radius: calc(0.3125rem * var(--cds-rem-scale, 1));
  --cds-h-control: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-h-control-nested: calc(1rem * var(--cds-rem-scale, 1));
  --cds-icon: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-pad-xs: calc(0.125rem * var(--cds-rem-scale, 1));
  --cds-pad-sm: calc(0.25rem * var(--cds-rem-scale, 1));
  --cds-pad-md: calc(0.375rem * var(--cds-rem-scale, 1));
  --cds-pad-lg: calc(0.625rem * var(--cds-rem-scale, 1));
  --cds-pad-xl: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-font-size-caption: calc(0.625rem * var(--cds-rem-scale, 1));
  --cds-font-size-body: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-font-size-prose: 0.8125rem;
  --cds-leading-body: calc(1.0625rem * var(--cds-rem-scale, 1));
  --cds-leading-prose: 1.1875rem;
  --cds-checkbox: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-checkbox-glyph: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-checkbox-radius: calc(0.25rem * var(--cds-rem-scale, 1));
  --cds-switch-h: calc(0.875rem * var(--cds-rem-scale, 1));
}

.cds-root [data-step="2"] {
  --cds-radius: calc(0.375rem * var(--cds-rem-scale, 1));
  --cds-h-control: calc(1.5rem * var(--cds-rem-scale, 1));
  --cds-h-control-nested: calc(1.125rem * var(--cds-rem-scale, 1));
  --cds-icon: calc(1rem * var(--cds-rem-scale, 1));
  --cds-pad-xs: calc(0.25rem * var(--cds-rem-scale, 1));
  --cds-pad-sm: calc(0.375rem * var(--cds-rem-scale, 1));
  --cds-pad-md: calc(0.5rem * var(--cds-rem-scale, 1));
  --cds-pad-lg: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-pad-xl: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-font-size-caption: calc(0.6875rem * var(--cds-rem-scale, 1));
  --cds-font-size-body: calc(0.8125rem * var(--cds-rem-scale, 1));
  --cds-font-size-prose: 0.875rem;
  --cds-leading-body: calc(1.1875rem * var(--cds-rem-scale, 1));
  --cds-leading-prose: 1.25rem;
  --cds-checkbox: calc(1rem * var(--cds-rem-scale, 1));
  --cds-checkbox-glyph: calc(1rem * var(--cds-rem-scale, 1));
  --cds-checkbox-radius: calc(0.25rem * var(--cds-rem-scale, 1));
  --cds-switch-h: calc(1rem * var(--cds-rem-scale, 1));
}

.cds-root [data-step="3"] {
  --cds-radius: calc(0.4375rem * var(--cds-rem-scale, 1));
  --cds-h-control: calc(1.75rem * var(--cds-rem-scale, 1));
  --cds-h-control-nested: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-icon: calc(1rem * var(--cds-rem-scale, 1));
  --cds-pad-xs: calc(0.375rem * var(--cds-rem-scale, 1));
  --cds-pad-sm: calc(0.5rem * var(--cds-rem-scale, 1));
  --cds-pad-md: calc(0.625rem * var(--cds-rem-scale, 1));
  --cds-pad-lg: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-pad-xl: calc(1.375rem * var(--cds-rem-scale, 1));
  --cds-font-size-caption: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-font-size-body: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-font-size-prose: 0.9375rem;
  --cds-leading-body: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-leading-prose: 1.375rem;
  --cds-checkbox: calc(1.125rem * var(--cds-rem-scale, 1));
  --cds-checkbox-glyph: calc(1rem * var(--cds-rem-scale, 1));
  --cds-checkbox-radius: calc(0.3125rem * var(--cds-rem-scale, 1));
  --cds-switch-h: calc(1.125rem * var(--cds-rem-scale, 1));
}

.cds-root [data-step="4"] {
  --cds-radius: calc(0.5rem * var(--cds-rem-scale, 1));
  --cds-h-control: calc(2rem * var(--cds-rem-scale, 1));
  --cds-h-control-nested: calc(1.375rem * var(--cds-rem-scale, 1));
  --cds-icon: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-pad-xs: calc(0.375rem * var(--cds-rem-scale, 1));
  --cds-pad-sm: calc(0.5rem * var(--cds-rem-scale, 1));
  --cds-pad-md: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-pad-lg: calc(1rem * var(--cds-rem-scale, 1));
  --cds-pad-xl: calc(1.5rem * var(--cds-rem-scale, 1));
  --cds-font-size-caption: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-font-size-body: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-font-size-prose: 1rem;
  --cds-leading-body: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-leading-prose: 1.5rem;
  --cds-checkbox: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-checkbox-glyph: calc(1rem * var(--cds-rem-scale, 1));
  --cds-checkbox-radius: calc(0.3125rem * var(--cds-rem-scale, 1));
  --cds-switch-h: calc(1.25rem * var(--cds-rem-scale, 1));
}

.cds-root [data-step="5"] {
  --cds-radius: calc(0.625rem * var(--cds-rem-scale, 1));
  --cds-h-control: calc(2.5rem * var(--cds-rem-scale, 1));
  --cds-h-control-nested: calc(1.75rem * var(--cds-rem-scale, 1));
  --cds-icon: calc(1.5rem * var(--cds-rem-scale, 1));
  --cds-pad-xs: calc(0.5rem * var(--cds-rem-scale, 1));
  --cds-pad-sm: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-pad-md: calc(1rem * var(--cds-rem-scale, 1));
  --cds-pad-lg: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-pad-xl: calc(1.75rem * var(--cds-rem-scale, 1));
  --cds-font-size-caption: calc(0.8125rem * var(--cds-rem-scale, 1));
  --cds-font-size-body: calc(0.9375rem * var(--cds-rem-scale, 1));
  --cds-font-size-prose: 1.125rem;
  --cds-leading-body: calc(1.375rem * var(--cds-rem-scale, 1));
  --cds-leading-prose: 1.6875rem;
  --cds-checkbox: calc(1.5rem * var(--cds-rem-scale, 1));
  --cds-checkbox-glyph: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-checkbox-radius: calc(0.375rem * var(--cds-rem-scale, 1));
  --cds-switch-h: calc(1.5rem * var(--cds-rem-scale, 1));
}

@media screen {
  .cds-dark-scope[data-mode="dark"] {
    --cds-border-accent: var(--cds-role-accent-700);
    --cds-border-danger: var(--cds-role-danger-700);
    --cds-border-success: var(--cds-role-success-700);
    --cds-border-warning: var(--cds-role-warning-700);
    --cds-border-pro: var(--cds-role-pro-700);
    --cds-border-editor-comment: var(--cds-yellow-300);
    --cds-shadow-color: rgba(0, 0, 0, 0.24);
    --cds-shadow-popover: 0 8px 24px rgb(0 0 0 / 0.32), 0 2px 6px rgb(0 0 0 / 0.2);
    --cds-ring-outer: 0px;
    --cds-ring-inner: 1px;
    --cds-ring-color: var(--cds-alpha-2);
    --cds-focus-shadow: inset 0 0 0 1px var(--cds-page-bg), 0 0 0 1px var(--cds-fill-accent), 0 0 6px 1px hsl(from var(--cds-role-accent-600) h s l / 60%);
    --cds-focus-shadow-danger: inset 0 0 0 1px var(--cds-page-bg), 0 0 0 1px var(--cds-fill-danger), 0 0 6px 1px hsl(from var(--cds-role-danger-600) h s l / 60%);
    --cds-pictogram-highlight-default: var(--cds-gray-650);
    --cds-pictogram-highlight-heather: var(--cds-plum);
    --cds-pictogram-highlight-cactus: var(--cds-mineral);
    --cds-neutral-0: var(--cds-gray-900);
    --cds-neutral-10: var(--cds-gray-890);
    --cds-neutral-20: var(--cds-gray-880);
    --cds-neutral-30: var(--cds-gray-870);
    --cds-neutral-40: var(--cds-gray-860);
    --cds-neutral-50: var(--cds-gray-850);
    --cds-neutral-60: var(--cds-gray-840);
    --cds-neutral-70: var(--cds-gray-830);
    --cds-neutral-80: var(--cds-gray-820);
    --cds-neutral-90: var(--cds-gray-810);
    --cds-neutral-100: var(--cds-gray-800);
    --cds-neutral-150: var(--cds-gray-750);
    --cds-neutral-200: var(--cds-gray-700);
    --cds-neutral-250: var(--cds-gray-650);
    --cds-neutral-300: var(--cds-gray-600);
    --cds-neutral-350: var(--cds-gray-550);
    --cds-neutral-400: var(--cds-gray-500);
    --cds-neutral-450: var(--cds-gray-450);
    --cds-neutral-500: var(--cds-gray-400);
    --cds-neutral-550: var(--cds-gray-350);
    --cds-neutral-600: var(--cds-gray-300);
    --cds-neutral-650: var(--cds-gray-250);
    --cds-neutral-700: var(--cds-gray-200);
    --cds-neutral-750: var(--cds-gray-150);
    --cds-neutral-800: var(--cds-gray-100);
    --cds-neutral-810: var(--cds-gray-90);
    --cds-neutral-820: var(--cds-gray-80);
    --cds-neutral-830: var(--cds-gray-70);
    --cds-neutral-840: var(--cds-gray-60);
    --cds-neutral-850: var(--cds-gray-50);
    --cds-neutral-860: var(--cds-gray-40);
    --cds-neutral-870: var(--cds-gray-30);
    --cds-neutral-880: var(--cds-gray-20);
    --cds-neutral-890: var(--cds-gray-10);
    --cds-neutral-900: var(--cds-gray-0);
    --cds-surface-0: var(--cds-gray-900);
    --cds-surface-1: var(--cds-gray-850);
    --cds-surface-2: var(--cds-gray-830);
    --cds-surface-3: var(--cds-gray-800);
    --cds-fill-primary-hover: var(--cds-gray-100);
    --cds-fill-secondary: var(--cds-alpha-2);
    --cds-fill-secondary-hover: hsl(from var(--cds-neutral-900) h s l / 14%);
    --cds-fill-secondary-ring: transparent;
    --cds-fill-field: var(--cds-alpha-1);
    --cds-fill-ghost-hover: hsl(from var(--cds-neutral-900) h s l / 7.5%);
    --cds-fill-ghost-selected: hsl(from var(--cds-neutral-900) h s l / 15%);
    --cds-bg-accent: var(--cds-role-accent-800);
    --cds-bg-danger: var(--cds-role-danger-800);
    --cds-bg-success: var(--cds-role-success-800);
    --cds-bg-warning: var(--cds-role-warning-800);
    --cds-bg-pro: var(--cds-role-pro-800);
    --cds-bg-tint-red: rgb(from var(--cds-red-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-red-opaque: var(--cds-red-800);
    --cds-bg-tint-orange: rgb(from var(--cds-orange-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-orange-opaque: var(--cds-orange-800);
    --cds-bg-tint-yellow: rgb(from var(--cds-yellow-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-yellow-opaque: var(--cds-yellow-800);
    --cds-bg-tint-green: rgb(from var(--cds-green-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-green-opaque: var(--cds-green-800);
    --cds-bg-tint-aqua: rgb(from var(--cds-aqua-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-aqua-opaque: var(--cds-aqua-800);
    --cds-bg-tint-blue: rgb(from var(--cds-blue-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-blue-opaque: var(--cds-blue-800);
    --cds-bg-tint-violet: rgb(from var(--cds-violet-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-violet-opaque: var(--cds-violet-800);
    --cds-bg-tint-magenta: rgb(from var(--cds-magenta-800) calc((r - 5.25) / 0.75) calc((g - 5.25) / 0.75) calc((b - 5.25) / 0.75) / 75%);
    --cds-bg-tint-magenta-opaque: var(--cds-magenta-800);
    --cds-backdrop: rgb(0 0 0 / 0.5);
    --cds-text-accent: var(--cds-role-accent-300);
    --cds-text-danger: var(--cds-role-danger-300);
    --cds-text-success: var(--cds-role-success-400);
    --cds-text-warning: var(--cds-role-warning-300);
    --cds-text-pro: var(--cds-role-pro-300);
    --cds-text-tint-red: var(--cds-red-300);
    --cds-text-tint-orange: var(--cds-orange-300);
    --cds-text-tint-yellow: var(--cds-yellow-300);
    --cds-text-tint-green: var(--cds-green-300);
    --cds-text-tint-aqua: var(--cds-aqua-300);
    --cds-text-tint-blue: var(--cds-blue-300);
    --cds-text-tint-violet: var(--cds-violet-300);
    --cds-text-tint-magenta: var(--cds-magenta-300);
    --cds-text-primary: var(--cds-gray-50);
    --cds-text-secondary: var(--cds-gray-200);
    --cds-text-muted: var(--cds-gray-400);
    --cds-font-wght-regular: "wght" 360;
    --cds-font-wght-medium: "wght" 460;
    --cds-font-wght-semibold: "wght" 540;
    --cds-font-wght-bold: "wght" 560;
    --cds-font-axis-wght-regular: var(--cds-font-wght-regular),;
    --cds-font-axis-wght-medium: var(--cds-font-wght-medium),;
    --cds-font-axis-wght-semibold: var(--cds-font-wght-semibold),;
    --cds-font-axis-wght-bold: var(--cds-font-wght-bold),;
    --cds-on-git-added: var(--cds-gray-900);
    --cds-on-git-removed: var(--cds-gray-900);
    --cds-on-git-modified: var(--cds-gray-900);
    --cds-on-git-merged: var(--cds-gray-900);
    --cds-on-git-closed: var(--cds-gray-900);
    --cds-on-git-conflicting: var(--cds-gray-900);
    --cds-on-git-draft: var(--cds-gray-900);
    --cds-chart-categorical-1: var(--cds-blue-400);
    --cds-chart-categorical-2: var(--cds-orange-400);
    --cds-chart-categorical-3: var(--cds-aqua-400);
    --cds-chart-categorical-4: var(--cds-yellow-350);
    --cds-chart-categorical-5: var(--cds-magenta-400);
    --cds-chart-categorical-6: var(--cds-green-500);
    --cds-chart-categorical-7: var(--cds-violet-350);
    --cds-chart-categorical-8: var(--cds-red-350);
    --cds-chart-sequential-1: var(--cds-blue-700);
    --cds-chart-sequential-2: var(--cds-blue-600);
    --cds-chart-sequential-3: var(--cds-blue-500);
    --cds-chart-sequential-4: var(--cds-blue-400);
    --cds-chart-sequential-5: var(--cds-blue-300);
    --cds-chart-sequential-6: var(--cds-blue-200);
    --cds-chart-sequential-7: var(--cds-blue-100);
    --cds-chart-diverging-1: var(--cds-blue-300);
    --cds-chart-diverging-2: var(--cds-blue-450);
    --cds-chart-diverging-3: var(--cds-blue-600);
    --cds-chart-diverging-4: var(--cds-gray-700);
    --cds-chart-diverging-5: var(--cds-red-600);
    --cds-chart-diverging-6: var(--cds-red-450);
    --cds-chart-diverging-7: var(--cds-red-300);
    --cds-chart-status-good: var(--cds-green-400);
    --cds-chart-status-warning: var(--cds-yellow-200);
    --cds-chart-status-serious: var(--cds-orange-300);
    --cds-chart-status-critical: var(--cds-red-450);
    --cds-chart-muted: var(--cds-gray-550);
    --cds-chart-reference: var(--cds-gray-350);
    --cds-chart-reference-tint: hsl(from var(--cds-gray-350) h s l / 15%);
    --cds-chart-axis: var(--cds-gray-700);
    --cds-chart-baseline: var(--cds-gray-700);
    --cds-button-on-content: hsl(0 0% 0% / 0.55);
    --cds-button-on-content-hover: hsl(0 0% 0% / 0.65);
    --cds-button-on-content-ring: transparent;
    --cds-radio-group-card-selected: var(--cds-role-accent-850);
    --cds-segmented-control-thumb: var(--cds-alpha-2);
    --cds-shortcut-cap-ink: var(--cds-gray-300);
    --cds-shortcut-cap-line: color-mix(in srgb, currentColor 22%, transparent);
    --cds-skeleton-base: hsl(from var(--cds-neutral-900) h s l / 7.5%);
    --cds-skeleton-sheen: hsl(from var(--cds-neutral-900) h s l / 7.5%);
    --cds-slider-fill: var(--cds-alpha-4);
    --cds-slider-handle-shadow-outer: hsl(from var(--cds-gray-0) h s l / 0%);
    --cds-slider-handle-shadow-depth: hsl(from var(--cds-gray-900) h s l / 24%);
    --cds-slider-stop-dot: hsl(from var(--cds-gray-0) h s l / 25%);
    --cds-switch-track: var(--cds-alpha-2);
    --cds-switch-track-hover: var(--cds-alpha-3);
    --cds-tooltip-bg: var(--cds-surface-3);
    --cds-tooltip-fg: var(--cds-text-primary);
    --cds-border: var(--cds-alpha-2);
    --cds-border-git-added: color-mix(in srgb, var(--cds-text-git-added) 40%, transparent);
    --cds-border-git-removed: color-mix(in srgb, var(--cds-text-git-removed) 40%, transparent);
    --cds-border-git-modified: color-mix(in srgb, var(--cds-text-git-modified) 40%, transparent);
    --cds-border-git-merged: color-mix(in srgb, var(--cds-text-git-merged) 40%, transparent);
    --cds-border-git-closed: color-mix(in srgb, var(--cds-text-git-closed) 40%, transparent);
    --cds-border-git-conflicting: color-mix(in srgb, var(--cds-text-git-conflicting) 40%, transparent);
    --cds-border-git-draft: color-mix(in srgb, var(--cds-text-git-draft) 40%, transparent);
    --cds-border-git-opened: var(--cds-border-git-added);
    --cds-border-git-queued: var(--cds-border-git-modified);
    --cds-border-strong: var(--cds-alpha-3);
    --cds-border-stronger: hsl(from var(--cds-neutral-900) h s l / 40%);
    --cds-shadow-sm: 0 1px 2px 0 hsl(from var(--cds-gray-900) h s l / 6%), 0 2px 8px 0 var(--cds-shadow-color);
    --cds-shadow-md: 0 2px 4px 0 hsl(from var(--cds-gray-900) h s l / 7%), 0 6px 16px 0 var(--cds-shadow-color);
    --cds-shadow-lg: 0 4px 8px 0 hsl(from var(--cds-gray-900) h s l / 8%), 0 12px 28px -2px var(--cds-shadow-color);
    --cds-alpha-0: hsl(from var(--cds-neutral-900) h s l / 0%);
    --cds-alpha-1: hsl(from var(--cds-neutral-900) h s l / 5%);
    --cds-alpha-2: hsl(from var(--cds-neutral-900) h s l / 10%);
    --cds-alpha-3: hsl(from var(--cds-neutral-900) h s l / 20%);
    --cds-alpha-4: hsl(from var(--cds-neutral-900) h s l / 35%);
    --cds-alpha-5: hsl(from var(--cds-neutral-900) h s l / 50%);
    --cds-alpha-6: hsl(from var(--cds-neutral-900) h s l / 60%);
    --cds-alpha-7: hsl(from var(--cds-neutral-900) h s l / 70%);
    --cds-alpha-8: hsl(from var(--cds-neutral-900) h s l / 85%);
    --cds-alpha-9: hsl(from var(--cds-neutral-900) h s l / 95%);
    --cds-surface-popover: var(--cds-surface-3);
    --cds-surface-panel: var(--cds-surface-2);
    --cds-page-bg: var(--cds-surface-0);
    --cds-fill-git-removed: var(--cds-text-git-removed);
    --cds-fill-git-draft: var(--cds-text-git-draft);
    --cds-fill-git-opened: var(--cds-fill-git-added);
    --cds-fill-git-opened-hover: var(--cds-fill-git-added-hover);
    --cds-fill-git-queued: var(--cds-fill-git-modified);
    --cds-fill-git-queued-hover: var(--cds-fill-git-modified-hover);
    --cds-fill-primary: var(--cds-neutral-900);
    --cds-fill-secondary-pressed-ring: var(--cds-border);
    --cds-fill-field-ring: var(--cds-border);
    --cds-fill-disabled: var(--cds-alpha-1);
    --cds-fill-control: var(--cds-alpha-2);
    --cds-fill-control-hover: var(--cds-alpha-3);
    --cds-bg-accent-chip: var(--cds-bg-accent);
    --cds-bg-danger-chip: var(--cds-bg-danger);
    --cds-bg-success-chip: var(--cds-bg-success);
    --cds-bg-warning-chip: var(--cds-bg-warning);
    --cds-bg-pro-chip: var(--cds-bg-pro);
    --cds-bg-git-added: color-mix(in srgb, var(--cds-text-git-added) 20%, transparent);
    --cds-bg-git-removed: color-mix(in srgb, var(--cds-text-git-removed) 20%, transparent);
    --cds-bg-git-modified: color-mix(in srgb, var(--cds-text-git-modified) 20%, transparent);
    --cds-bg-git-merged: color-mix(in srgb, var(--cds-text-git-merged) 20%, transparent);
    --cds-bg-git-closed: color-mix(in srgb, var(--cds-text-git-closed) 20%, transparent);
    --cds-bg-git-conflicting: color-mix(in srgb, var(--cds-text-git-conflicting) 20%, transparent);
    --cds-bg-git-draft: color-mix(in srgb, var(--cds-text-git-draft) 20%, transparent);
    --cds-bg-git-opened: var(--cds-bg-git-added);
    --cds-bg-git-queued: var(--cds-bg-git-modified);
    --cds-bg-editor-canvas: var(--cds-neutral-60);
    --cds-bg-neutral: var(--cds-alpha-1);
    --cds-bg-neutral-hover: var(--cds-alpha-2);
    --cds-bg-neutral-chip: var(--cds-bg-neutral);
    --cds-bg-neutral-chip-hover: var(--cds-bg-neutral-hover);
    --cds-bg-user-message: var(--cds-bg-neutral);
    --cds-text-git-opened: var(--cds-text-git-added);
    --cds-text-git-queued: var(--cds-text-git-modified);
    --cds-text-disabled: var(--cds-alpha-4);
    --cds-on-primary: var(--cds-neutral-0);
    --cds-on-git-opened: var(--cds-on-git-added);
    --cds-on-git-queued: var(--cds-on-git-modified);
    --cds-chart-grid: var(--cds-alpha-2);
    --cds-panel-shadow: 0 0 0 1px var(--cds-border), var(--cds-shadow-sm);
    --cds-segmented-control-track: var(--cds-alpha-1);
    --cds-slider-track: var(--cds-alpha-2);
  }
}

.cds-root {
  --cds-radius--xs: calc(0.3125rem * var(--cds-rem-scale, 1));
  --cds-radius--sm: calc(0.3125rem * var(--cds-rem-scale, 1));
  --cds-radius--lg: calc(0.4375rem * var(--cds-rem-scale, 1));
  --cds-h-control--xs: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-h-control--sm: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-h-control--lg: calc(1.75rem * var(--cds-rem-scale, 1));
  --cds-h-control-nested--xs: calc(1rem * var(--cds-rem-scale, 1));
  --cds-h-control-nested--sm: calc(1rem * var(--cds-rem-scale, 1));
  --cds-h-control-nested--lg: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-icon--xs: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-icon--sm: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-icon--lg: calc(1rem * var(--cds-rem-scale, 1));
  --cds-pad-xs--xs: calc(0.125rem * var(--cds-rem-scale, 1));
  --cds-pad-xs--sm: calc(0.125rem * var(--cds-rem-scale, 1));
  --cds-pad-xs--lg: calc(0.375rem * var(--cds-rem-scale, 1));
  --cds-pad-sm--xs: calc(0.25rem * var(--cds-rem-scale, 1));
  --cds-pad-sm--sm: calc(0.25rem * var(--cds-rem-scale, 1));
  --cds-pad-sm--lg: calc(0.5rem * var(--cds-rem-scale, 1));
  --cds-pad-md--xs: calc(0.375rem * var(--cds-rem-scale, 1));
  --cds-pad-md--sm: calc(0.375rem * var(--cds-rem-scale, 1));
  --cds-pad-md--lg: calc(0.625rem * var(--cds-rem-scale, 1));
  --cds-pad-lg--xs: calc(0.625rem * var(--cds-rem-scale, 1));
  --cds-pad-lg--sm: calc(0.625rem * var(--cds-rem-scale, 1));
  --cds-pad-lg--lg: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-pad-xl--xs: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-pad-xl--sm: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-pad-xl--lg: calc(1.375rem * var(--cds-rem-scale, 1));
  --cds-font-size-caption--xs: calc(0.625rem * var(--cds-rem-scale, 1));
  --cds-font-size-caption--sm: calc(0.625rem * var(--cds-rem-scale, 1));
  --cds-font-size-caption--lg: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-font-size-body--xs: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-font-size-body--sm: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-font-size-body--lg: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-font-size-prose--xs: 0.8125rem;
  --cds-font-size-prose--sm: 0.8125rem;
  --cds-font-size-prose--lg: 0.9375rem;
  --cds-leading-body--xs: calc(1.0625rem * var(--cds-rem-scale, 1));
  --cds-leading-body--sm: calc(1.0625rem * var(--cds-rem-scale, 1));
  --cds-leading-body--lg: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-leading-prose--xs: 1.1875rem;
  --cds-leading-prose--sm: 1.1875rem;
  --cds-leading-prose--lg: 1.375rem;
  --cds-checkbox--xs: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-checkbox--sm: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-checkbox--lg: calc(1.125rem * var(--cds-rem-scale, 1));
  --cds-checkbox-glyph--xs: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-checkbox-glyph--sm: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-checkbox-glyph--lg: calc(1rem * var(--cds-rem-scale, 1));
  --cds-checkbox-radius--xs: calc(0.25rem * var(--cds-rem-scale, 1));
  --cds-checkbox-radius--sm: calc(0.25rem * var(--cds-rem-scale, 1));
  --cds-checkbox-radius--lg: calc(0.3125rem * var(--cds-rem-scale, 1));
  --cds-switch-h--xs: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-switch-h--sm: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-switch-h--lg: calc(1.125rem * var(--cds-rem-scale, 1));
}

.cds-root[data-density="comfortable"] {
  --cds-radius--xs: calc(0.375rem * var(--cds-rem-scale, 1));
  --cds-radius--sm: calc(0.4375rem * var(--cds-rem-scale, 1));
  --cds-radius--lg: calc(0.625rem * var(--cds-rem-scale, 1));
  --cds-h-control--xs: calc(1.5rem * var(--cds-rem-scale, 1));
  --cds-h-control--sm: calc(1.75rem * var(--cds-rem-scale, 1));
  --cds-h-control--lg: calc(2.5rem * var(--cds-rem-scale, 1));
  --cds-h-control-nested--xs: calc(1.125rem * var(--cds-rem-scale, 1));
  --cds-h-control-nested--sm: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-h-control-nested--lg: calc(1.75rem * var(--cds-rem-scale, 1));
  --cds-icon--xs: calc(1rem * var(--cds-rem-scale, 1));
  --cds-icon--sm: calc(1rem * var(--cds-rem-scale, 1));
  --cds-icon--lg: calc(1.5rem * var(--cds-rem-scale, 1));
  --cds-pad-xs--xs: calc(0.25rem * var(--cds-rem-scale, 1));
  --cds-pad-xs--sm: calc(0.375rem * var(--cds-rem-scale, 1));
  --cds-pad-xs--lg: calc(0.5rem * var(--cds-rem-scale, 1));
  --cds-pad-sm--xs: calc(0.375rem * var(--cds-rem-scale, 1));
  --cds-pad-sm--sm: calc(0.5rem * var(--cds-rem-scale, 1));
  --cds-pad-sm--lg: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-pad-md--xs: calc(0.5rem * var(--cds-rem-scale, 1));
  --cds-pad-md--sm: calc(0.625rem * var(--cds-rem-scale, 1));
  --cds-pad-md--lg: calc(1rem * var(--cds-rem-scale, 1));
  --cds-pad-lg--xs: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-pad-lg--sm: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-pad-lg--lg: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-pad-xl--xs: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-pad-xl--sm: calc(1.375rem * var(--cds-rem-scale, 1));
  --cds-pad-xl--lg: calc(1.75rem * var(--cds-rem-scale, 1));
  --cds-font-size-caption--xs: calc(0.6875rem * var(--cds-rem-scale, 1));
  --cds-font-size-caption--sm: calc(0.75rem * var(--cds-rem-scale, 1));
  --cds-font-size-caption--lg: calc(0.8125rem * var(--cds-rem-scale, 1));
  --cds-font-size-body--xs: calc(0.8125rem * var(--cds-rem-scale, 1));
  --cds-font-size-body--sm: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-font-size-body--lg: calc(0.9375rem * var(--cds-rem-scale, 1));
  --cds-font-size-prose--xs: 0.875rem;
  --cds-font-size-prose--sm: 0.9375rem;
  --cds-font-size-prose--lg: 1.125rem;
  --cds-leading-body--xs: calc(1.1875rem * var(--cds-rem-scale, 1));
  --cds-leading-body--sm: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-leading-body--lg: calc(1.375rem * var(--cds-rem-scale, 1));
  --cds-leading-prose--xs: 1.25rem;
  --cds-leading-prose--sm: 1.375rem;
  --cds-leading-prose--lg: 1.6875rem;
  --cds-checkbox--xs: calc(1rem * var(--cds-rem-scale, 1));
  --cds-checkbox--sm: calc(1.125rem * var(--cds-rem-scale, 1));
  --cds-checkbox--lg: calc(1.5rem * var(--cds-rem-scale, 1));
  --cds-checkbox-glyph--xs: calc(1rem * var(--cds-rem-scale, 1));
  --cds-checkbox-glyph--sm: calc(1rem * var(--cds-rem-scale, 1));
  --cds-checkbox-glyph--lg: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-checkbox-radius--xs: calc(0.25rem * var(--cds-rem-scale, 1));
  --cds-checkbox-radius--sm: calc(0.3125rem * var(--cds-rem-scale, 1));
  --cds-checkbox-radius--lg: calc(0.375rem * var(--cds-rem-scale, 1));
  --cds-switch-h--xs: calc(1rem * var(--cds-rem-scale, 1));
  --cds-switch-h--sm: calc(1.125rem * var(--cds-rem-scale, 1));
  --cds-switch-h--lg: calc(1.5rem * var(--cds-rem-scale, 1));
}

.cds-root {
  --cds-font-size-body--textsm: calc(0.8125rem * var(--cds-rem-scale, 1));
  --cds-font-size-body--textmd: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-font-size-body--textlg: calc(0.9375rem * var(--cds-rem-scale, 1));
  --cds-font-size-body--own: calc(0.8125rem * var(--cds-rem-scale, 1));
  --cds-font-size-prose--textsm: 0.8125rem;
  --cds-font-size-prose--xs--textsm: 0.8125rem;
  --cds-font-size-prose--sm--textsm: 0.8125rem;
  --cds-font-size-prose--lg--textsm: 0.875rem;
  --cds-font-size-prose--textlg: 0.9375rem;
  --cds-font-size-prose--xs--textlg: 0.875rem;
  --cds-font-size-prose--sm--textlg: 0.875rem;
  --cds-font-size-prose--lg--textlg: 1rem;
  --cds-font-size-heading--textsm: calc(0.8125rem * var(--cds-rem-scale, 1));
  --cds-font-size-heading--textlg: calc(0.9375rem * var(--cds-rem-scale, 1));
  --cds-leading-body--textsm: calc(1.1875rem * var(--cds-rem-scale, 1));
  --cds-leading-body--textmd: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-leading-body--textlg: calc(1.375rem * var(--cds-rem-scale, 1));
  --cds-leading-body--own: calc(1.1875rem * var(--cds-rem-scale, 1));
  --cds-leading-prose--textsm: 1.1875rem;
  --cds-leading-prose--xs--textsm: 1.1875rem;
  --cds-leading-prose--sm--textsm: 1.1875rem;
  --cds-leading-prose--lg--textsm: 1.25rem;
  --cds-leading-prose--textlg: 1.375rem;
  --cds-leading-prose--xs--textlg: 1.25rem;
  --cds-leading-prose--sm--textlg: 1.25rem;
  --cds-leading-prose--lg--textlg: 1.5rem;
  --cds-leading-heading--textsm: calc(1.125rem * var(--cds-rem-scale, 1));
  --cds-leading-heading--textlg: calc(1.375rem * var(--cds-rem-scale, 1));
}

.cds-root[data-density="comfortable"] {
  --cds-font-size-body--textsm: calc(0.8125rem * var(--cds-rem-scale, 1));
  --cds-font-size-body--textmd: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-font-size-body--textlg: calc(0.9375rem * var(--cds-rem-scale, 1));
  --cds-font-size-body--own: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-font-size-prose--textsm: 0.9375rem;
  --cds-font-size-prose--xs--textsm: 0.8125rem;
  --cds-font-size-prose--sm--textsm: 0.875rem;
  --cds-font-size-prose--lg--textsm: 1rem;
  --cds-font-size-prose--textlg: 1.125rem;
  --cds-font-size-prose--xs--textlg: 0.9375rem;
  --cds-font-size-prose--sm--textlg: 1rem;
  --cds-font-size-prose--lg--textlg: 1.125rem;
  --cds-font-size-heading--textsm: calc(0.875rem * var(--cds-rem-scale, 1));
  --cds-font-size-heading--textlg: calc(1rem * var(--cds-rem-scale, 1));
  --cds-leading-body--textsm: calc(1.1875rem * var(--cds-rem-scale, 1));
  --cds-leading-body--textmd: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-leading-body--textlg: calc(1.375rem * var(--cds-rem-scale, 1));
  --cds-leading-body--own: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-leading-prose--textsm: 1.375rem;
  --cds-leading-prose--xs--textsm: 1.1875rem;
  --cds-leading-prose--sm--textsm: 1.25rem;
  --cds-leading-prose--lg--textsm: 1.5rem;
  --cds-leading-prose--textlg: 1.6875rem;
  --cds-leading-prose--xs--textlg: 1.375rem;
  --cds-leading-prose--sm--textlg: 1.5rem;
  --cds-leading-prose--lg--textlg: 1.6875rem;
  --cds-leading-heading--textsm: calc(1.25rem * var(--cds-rem-scale, 1));
  --cds-leading-heading--textlg: calc(1.5rem * var(--cds-rem-scale, 1));
}

.cds-root :where([data-cds="AssistantMessage"], [data-cds="UserMessage"])[data-text-size="sm"] {
  --cds-font-size-body: var(--cds-font-size-body--textsm);
  --cds-font-size-prose: var(--cds-font-size-prose--textsm);
  --cds-font-size-prose--xs: var(--cds-font-size-prose--xs--textsm);
  --cds-font-size-prose--sm: var(--cds-font-size-prose--sm--textsm);
  --cds-font-size-prose--lg: var(--cds-font-size-prose--lg--textsm);
  --cds-font-size-heading: var(--cds-font-size-heading--textsm);
  --cds-leading-body: var(--cds-leading-body--textsm);
  --cds-leading-prose: var(--cds-leading-prose--textsm);
  --cds-leading-prose--xs: var(--cds-leading-prose--xs--textsm);
  --cds-leading-prose--sm: var(--cds-leading-prose--sm--textsm);
  --cds-leading-prose--lg: var(--cds-leading-prose--lg--textsm);
  --cds-leading-heading: var(--cds-leading-heading--textsm);
}

.cds-root :where([data-cds="AssistantMessage"], [data-cds="UserMessage"])[data-text-size="md"] {
  --cds-font-size-body: var(--cds-font-size-body--textmd);
  --cds-leading-body: var(--cds-leading-body--textmd);
}

.cds-root :where([data-cds="AssistantMessage"], [data-cds="UserMessage"])[data-text-size="lg"] {
  --cds-font-size-body: var(--cds-font-size-body--textlg);
  --cds-font-size-prose: var(--cds-font-size-prose--textlg);
  --cds-font-size-prose--xs: var(--cds-font-size-prose--xs--textlg);
  --cds-font-size-prose--sm: var(--cds-font-size-prose--sm--textlg);
  --cds-font-size-prose--lg: var(--cds-font-size-prose--lg--textlg);
  --cds-font-size-heading: var(--cds-font-size-heading--textlg);
  --cds-leading-body: var(--cds-leading-body--textlg);
  --cds-leading-prose: var(--cds-leading-prose--textlg);
  --cds-leading-prose--xs: var(--cds-leading-prose--xs--textlg);
  --cds-leading-prose--sm: var(--cds-leading-prose--sm--textlg);
  --cds-leading-prose--lg: var(--cds-leading-prose--lg--textlg);
  --cds-leading-heading: var(--cds-leading-heading--textlg);
}

.cds-root :where([data-cds="AssistantMessage"], [data-cds="UserMessage"])[data-text-size] :where(button):not(:where([data-size], [data-step], [data-text-size] [data-size] *, [data-text-size] [data-step] *, [data-cds="TurnStatusStep"] > *)),
.cds-root :where([data-cds="AssistantMessage"], [data-cds="UserMessage"])[data-text-size] :where(input):not(:where([data-size], [data-step], [data-text-size] [data-size] *, [data-text-size] [data-step] *, [data-cds="TurnStatusStep"] > *)),
.cds-root :where([data-cds="AssistantMessage"], [data-cds="UserMessage"])[data-text-size] :where(textarea):not(:where([data-size], [data-step], [data-text-size] [data-size] *, [data-text-size] [data-step] *, [data-cds="TurnStatusStep"] > *)),
.cds-root :where([data-cds="AssistantMessage"], [data-cds="UserMessage"])[data-text-size] :where(select):not(:where([data-size], [data-step], [data-text-size] [data-size] *, [data-text-size] [data-step] *, [data-cds="TurnStatusStep"] > *)),
.cds-root :where([data-cds="AssistantMessage"], [data-cds="UserMessage"])[data-text-size] :where(a.cds-reset):not(:where([data-size], [data-step], [data-text-size] [data-size] *, [data-text-size] [data-step] *, [data-cds="TurnStatusStep"] > *)),
.cds-root :where([data-cds="AssistantMessage"], [data-cds="UserMessage"])[data-text-size] :where([role="toolbar"]):not(:where([data-size], [data-step], [data-text-size] [data-size] *, [data-text-size] [data-step] *, [data-cds="TurnStatusStep"] > *)) {
  --cds-font-size-body: var(--cds-font-size-body--own);
  --cds-leading-body: var(--cds-leading-body--own);
}

.cds-root [data-size="xs"] {
  --cds-radius: var(--cds-radius--xs);
  --cds-h-control: var(--cds-h-control--xs);
  --cds-h-control-nested: var(--cds-h-control-nested--xs);
  --cds-icon: var(--cds-icon--xs);
  --cds-pad-xs: var(--cds-pad-xs--xs);
  --cds-pad-sm: var(--cds-pad-sm--xs);
  --cds-pad-md: var(--cds-pad-md--xs);
  --cds-pad-lg: var(--cds-pad-lg--xs);
  --cds-pad-xl: var(--cds-pad-xl--xs);
  --cds-font-size-caption: var(--cds-font-size-caption--xs);
  --cds-font-size-body: var(--cds-font-size-body--xs);
  --cds-font-size-prose: var(--cds-font-size-prose--xs);
  --cds-leading-body: var(--cds-leading-body--xs);
  --cds-leading-prose: var(--cds-leading-prose--xs);
  --cds-checkbox: var(--cds-checkbox--xs);
  --cds-checkbox-glyph: var(--cds-checkbox-glyph--xs);
  --cds-checkbox-radius: var(--cds-checkbox-radius--xs);
  --cds-switch-h: var(--cds-switch-h--xs);
}

.cds-root [data-size="sm"] {
  --cds-radius: var(--cds-radius--sm);
  --cds-h-control: var(--cds-h-control--sm);
  --cds-h-control-nested: var(--cds-h-control-nested--sm);
  --cds-icon: var(--cds-icon--sm);
  --cds-pad-xs: var(--cds-pad-xs--sm);
  --cds-pad-sm: var(--cds-pad-sm--sm);
  --cds-pad-md: var(--cds-pad-md--sm);
  --cds-pad-lg: var(--cds-pad-lg--sm);
  --cds-pad-xl: var(--cds-pad-xl--sm);
  --cds-font-size-caption: var(--cds-font-size-caption--sm);
  --cds-font-size-body: var(--cds-font-size-body--sm);
  --cds-font-size-prose: var(--cds-font-size-prose--sm);
  --cds-leading-body: var(--cds-leading-body--sm);
  --cds-leading-prose: var(--cds-leading-prose--sm);
  --cds-checkbox: var(--cds-checkbox--sm);
  --cds-checkbox-glyph: var(--cds-checkbox-glyph--sm);
  --cds-checkbox-radius: var(--cds-checkbox-radius--sm);
  --cds-switch-h: var(--cds-switch-h--sm);
}

.cds-root [data-size="lg"] {
  --cds-radius: var(--cds-radius--lg);
  --cds-h-control: var(--cds-h-control--lg);
  --cds-h-control-nested: var(--cds-h-control-nested--lg);
  --cds-icon: var(--cds-icon--lg);
  --cds-pad-xs: var(--cds-pad-xs--lg);
  --cds-pad-sm: var(--cds-pad-sm--lg);
  --cds-pad-md: var(--cds-pad-md--lg);
  --cds-pad-lg: var(--cds-pad-lg--lg);
  --cds-pad-xl: var(--cds-pad-xl--lg);
  --cds-font-size-caption: var(--cds-font-size-caption--lg);
  --cds-font-size-body: var(--cds-font-size-body--lg);
  --cds-font-size-prose: var(--cds-font-size-prose--lg);
  --cds-leading-body: var(--cds-leading-body--lg);
  --cds-leading-prose: var(--cds-leading-prose--lg);
  --cds-checkbox: var(--cds-checkbox--lg);
  --cds-checkbox-glyph: var(--cds-checkbox-glyph--lg);
  --cds-checkbox-radius: var(--cds-checkbox-radius--lg);
  --cds-switch-h: var(--cds-switch-h--lg);
}

.cds-root {
  color-scheme: light;
}

@media screen {
  [data-mode="dark"] .cds-root:not([data-mode="light"]):not([data-mode="system"]),
  .cds-root[data-mode="dark"] {
    color-scheme: dark;
  }
}

@media screen and (prefers-color-scheme: dark) {
  [data-mode="system"]
    .cds-root:not([data-mode="light"]):not([data-mode="dark"]),
  .cds-root[data-mode="system"],
  .cds-root:not([data-mode]):not([data-mode] *) {
    color-scheme: dark;
  }
}

@media screen {
  .cds-dark-scope[data-mode="dark"] {
    color-scheme: dark;
  }
}
`);
  (PlatformRuntimeAndChatStyles2 = `/* CDS scrollbar treatment (the claude.ai look) — one source of truth for the
   two documents that need it:
   - the app shell imports this into @layer base (src/index.css), so every
     scroll container gets it without opting in; \`no-scrollbar\` hides one.
   - DASHBOARD_CSS inlines it (?raw import) into generated doc iframes, which
     are separate documents the app stylesheet cannot reach.
   The var() fallbacks are the light-mode literals of --cds-alpha-3/4 (20% and
   35% of --cds-gray-900 #0b0b0b): plain dashboard iframes load no tokens.css,
   and ldoc iframes are always light. In the app shell the tokens are always
   defined (body carries .cds-root), so the fallbacks are inert and the
   treatment follows dark mode via the tokens. */

/* 14px gutter = 6px visible thumb + 4px transparent border all around
   (background-clip) — webkit scrollbars can't be offset with margin, and
   a per-side border mangles the painted corner radii, so the inset is
   symmetric: 4px off the edge, 4px (invisible) on the content side. */
::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
/* Inset the thumb from the container's ends so it doesn't run into rounded
   panel corners. 4px, not the full 10-12px corner radius: the treatment is
   global, so short scrollers (dropdowns, doc-iframe cards) pay the inset
   too, and a radius-sized inset costs them a quarter of their track. Split
   by orientation: block-axis margins on a horizontal track (and vice versa)
   would squeeze the 14px gutter itself rather than inset the thumb. */
::-webkit-scrollbar-track:vertical {
  margin-block: 4px;
}
::-webkit-scrollbar-track:horizontal {
  margin-inline: 4px;
}
::-webkit-scrollbar-thumb {
  background: var(--cds-alpha-3, rgb(11 11 11 / 0.2));
  background-clip: padding-box;
  border: 4px solid transparent;
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  /* background-color, not the shorthand — the shorthand resets
     background-clip and the inset border would paint over. */
  background-color: var(--cds-alpha-4, rgb(11 11 11 / 0.35));
}
/* The corner square where two scrollbars meet defaults to white. */
::-webkit-scrollbar-corner {
  background: transparent;
}
/* A scrollbar is chrome: the arrow, whatever cursor its scroller carries.
   Blink (M123+) takes the cursor over a custom scrollbar from the hovered
   PART's computed style, and every part inherits from the SCROLLER (not from
   ::-webkit-scrollbar — hence all three listed) — so a scroller under a
   \`cursor:text\` rule (the Pages canvas: html, body and every prose root in
   prelude.ts LFILE_DOC_CSS; the ldoc twin in iframeRuntime.ts) showed the
   I-beam over a wide table's horizontal bar and the page's own bar. Engines
   that read the scroller's cursor instead (WebKit, older Blink) ignore this. */
::-webkit-scrollbar,
::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  cursor: default;
}
@supports not selector(::-webkit-scrollbar) {
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--cds-alpha-3, rgb(11 11 11 / 0.2)) transparent;
  }
}
`);
  (EditorHostState = PlatformRuntimeAndChatStyles + DataModelSchemasStyles);
  (EditorHostReplace = PlatformRuntimeAndChatStyles2.replace(
    /\/\*[\s\S]*?\*\//g,
    ``,
  ).replace(
    /\n{2,}/g,
    `
`,
  ));
  (EditorHostState2 = `
${collectDataModelSchemasJoin(DataModelSchemasFamily)}
:root{--ink:#1f1e1d;--paper:#faf9f5;--card:#fff;--line:rgba(15,12,8,.12);--mute:#8a8882;--accent:#2a78d6;--ok:#006300;--danger:#d03b3b;--blue:#2a78d6;--font-heading:"Anthropic Serif",ui-serif,Georgia,serif;--font-body:"Anthropic Sans",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
[data-mode=dark]{--ink:var(--cds-text-primary);--paper:var(--cds-surface-0);--card:var(--cds-surface-popover);--line:var(--cds-border);--mute:var(--cds-text-muted);--ok:var(--cds-text-success);--danger:var(--cds-text-danger)}
[data-mode=dark] input[type=range]{background:var(--cds-alpha-2)}
*{box-sizing:border-box}
html,body{margin:0;background:var(--paper);color:var(--ink);font:13px/1.5 var(--font-body);-webkit-font-smoothing:antialiased}
html{--cds-rem-scale:calc(16 / 13)}
body{padding:1.5rem 2rem}
h1,h2,h3{font-family:var(--font-heading);font-weight:600;letter-spacing:-.01em;margin:0 0 .4rem}
h1{font-size:1.6rem}h2{font-size:1.15rem}h3{font-size:.95rem}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem;padding:1.25rem;max-width:1400px;margin:0 auto}
.card{position:relative;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:1rem 1.1rem;display:flex;flex-direction:column;box-shadow:0 1px 2px rgba(0,0,0,.04);transition:box-shadow .15s,transform .15s}
.card:hover{box-shadow:0 3px 12px rgba(0,0,0,.07)}
.card.w2{grid-column:span 2}.card.w3{grid-column:span 3}.card.h2{grid-row:span 2}
.card-title{font-size:.875rem;font-weight:550;line-height:1.35;margin-bottom:.15rem}
.card-subtitle{font-size:.72rem;color:var(--cds-text-secondary,#6b6a63);margin-bottom:.7rem}
.card-body{flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0}
.value{font-size:2.2rem;font-weight:600;font-variant-numeric:tabular-nums;letter-spacing:-.02em;line-height:1.1}
.sub{color:var(--cds-text-secondary,#6b6a63);font-size:.72rem;margin-top:.25rem}
.delta{font-size:.72rem;margin-top:.35rem;font-variant-numeric:tabular-nums;font-weight:550}
.delta.up{color:var(--ok)}.delta.down{color:var(--danger)}
table{width:100%;border-collapse:collapse;font-size:.74rem}
th{text-align:left;padding:.5rem .6rem;border-bottom:1px solid var(--line);color:var(--cds-text-secondary,#6b6a63);font-weight:550;font-size:.66rem;text-transform:uppercase;letter-spacing:.02em}
td{padding:.5rem .6rem;border-bottom:1px solid var(--line)}
td.num,th.num{text-align:right;font-variant-numeric:tabular-nums}
tbody tr:hover{background:color-mix(in srgb,var(--paper) 60%,var(--card))}
.err{color:var(--danger);font:600 .72rem ui-monospace}.loading{color:var(--mute);font-size:.72rem}
input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:4px;background:rgba(31,30,29,.1);border-radius:4px;outline:none}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:var(--accent);cursor:pointer;border:2px solid var(--card);box-shadow:0 1px 3px rgba(0,0,0,.15)}
input[type=range]::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:var(--accent);cursor:pointer;border:2px solid var(--card);box-shadow:0 1px 3px rgba(0,0,0,.15)}
svg text{font-family:var(--font-body)}
[data-claude]{scroll-margin:1rem}
${EditorHostReplace}`);
  (EditorHostState3 = EditorHostState + resolveDataModelSchemasReplace(EditorHostState2));
  (EditorHostFade = {
    fade: 42,
    exit: 156,
    collapse: 108,
  });
  (EditorHostMessage = `cubic-bezier(0.7, 0, 1, 1)`);
  (resolveEditorHostMention = (
    actor?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let principal: Dynamic =
      actor?.kind === `mention` && typeof actor.principal == `string`
        ? actor.principal
        : ``;
    return (
      resolveEditorExtensionsJoin(
        principal.includes(`@`)
          ? principal.slice(0, principal.indexOf(`@`))
          : principal,
      ) || `unknown`
    );
  });
  (resolveEditorHostEnum = (
    entry?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    entry?.kind === `enum`
      ? `dropdown`
      : entry?.kind === `ref`
        ? ((typeof entry.ref == `string`
            ? resolveEditorAnchorsAndMentionsValue10(entry.ref)
            : null) ?? `ref`)
        : (entry?.kind ?? `builtin`));
  (resolveEditorHostFloor = (
    editorHostFloor?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let floor = Math.floor(Math.abs(editorHostFloor)) || 12;
    return `<svg viewBox="0 0 16 16" width="${floor}" height="${floor}" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="3" width="11" height="10" rx="1.5"/><path d="M2.5 6H13.5"/><path d="M4.6 4.5H5.4"/></svg>`;
  });
  (resolveEditorHostFloor2 = (
    editorHostFloor2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let floor = Math.floor(Math.abs(editorHostFloor2)) || 12;
    return `<svg viewBox="0 0 16 16" width="${floor}" height="${floor}" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 2.5L8.5 6.5L12.5 6.5"/><path d="M4.25 2.5L8.689 2.5C8.888 2.5 9.079 2.579 9.22 2.72L12.28 5.78C12.421 5.921 12.5 6.112 12.5 6.311L12.5 12.75C12.5 13.164 12.164 13.5 11.75 13.5L4.25 13.5C3.836 13.5 3.5 13.164 3.5 12.75L3.5 3.25C3.5 2.836 3.836 2.5 4.25 2.5Z"/></svg>`;
  });
  (resolveEditorHostValue = (
    editorHostValue?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `@media (forced-colors:active){${editorHostValue}{outline:2px solid transparent;outline-offset:-2px}}`);
}

export {
  EditorHostFade,
  EditorHostMessage,
  EditorHostState,
  EditorHostState2,
  EditorHostState3,
  resolveEditorHostEnum,
  resolveEditorHostFloor,
  resolveEditorHostFloor2,
  resolveEditorHostMention,
  resolveEditorHostValue,
};
