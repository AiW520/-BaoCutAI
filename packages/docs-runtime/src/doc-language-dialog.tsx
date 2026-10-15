/** doc-language-dialog: restored from DocLanguageDialog-ibrGkBt8.js. */
// i18n-ignore-file: 语言列表里每种语言用它自己的写法（localName），不翻译
import type { Dynamic } from "./types";
import { r as toModuleNamespace } from "./rolldown-runtime";
import {
  HM as loadReact,
  UE as loadJsxRuntime,
  kS as UiDialogsRoot,
  vx as toast,
} from "./platform-core";
import { y as LanguagePicker } from "./cds";
import {
  Dt as useDocumentLanguage,
  Ot as writeDocumentLanguage,
  Tt as DOCUMENT_LANGUAGE_COPY,
} from "./docs-app";
var React: Dynamic = toModuleNamespace(loadReact(), 1);
var DOCUMENT_LANGUAGES: Dynamic = [
  {
    tag: `ar`,
    name: `Arabic`,
    localName: `العربية`,
  },
  {
    tag: `bg`,
    name: `Bulgarian`,
    localName: `български`,
  },
  {
    tag: `ca`,
    name: `Catalan`,
    localName: `català`,
  },
  {
    tag: `zh-Hans`,
    name: `Chinese (Simplified)`,
    localName: `中文（简体）`,
  },
  {
    tag: `zh-Hant`,
    name: `Chinese (Traditional)`,
    localName: `中文（繁體）`,
  },
  {
    tag: `hr`,
    name: `Croatian`,
    localName: `Hrvatski`,
  },
  {
    tag: `cs`,
    name: `Czech`,
    localName: `Čeština`,
  },
  {
    tag: `da`,
    name: `Danish`,
    localName: `dansk`,
  },
  {
    tag: `nl-BE`,
    name: `Dutch (Belgium)`,
    localName: `Nederlands (België)`,
  },
  {
    tag: `nl-NL`,
    name: `Dutch (Netherlands)`,
    localName: `Nederlands (Nederland)`,
  },
  {
    tag: `en-AU`,
    name: `English (Australia)`,
    localName: `English (Australia)`,
  },
  {
    tag: `en-IN`,
    name: `English (India)`,
    localName: `English (India)`,
  },
  {
    tag: `en-IE`,
    name: `English (Ireland)`,
    localName: `English (Ireland)`,
  },
  {
    tag: `en-GB`,
    name: `English (United Kingdom)`,
    localName: `English (United Kingdom)`,
  },
  {
    tag: `en-US`,
    name: `English (United States)`,
    localName: `English (United States)`,
  },
  {
    tag: `fi`,
    name: `Finnish`,
    localName: `suomi`,
  },
  {
    tag: `fr-CA`,
    name: `French (Canada)`,
    localName: `français (Canada)`,
  },
  {
    tag: `fr-FR`,
    name: `French (France)`,
    localName: `français (France)`,
  },
  {
    tag: `de`,
    name: `German`,
    localName: `Deutsch`,
  },
  {
    tag: `el`,
    name: `Greek`,
    localName: `Ελληνικά`,
  },
  {
    tag: `he`,
    name: `Hebrew`,
    localName: `עברית`,
  },
  {
    tag: `hi`,
    name: `Hindi`,
    localName: `हिन्दी`,
  },
  {
    tag: `hu`,
    name: `Hungarian`,
    localName: `magyar`,
  },
  {
    tag: `id`,
    name: `Indonesian`,
    localName: `Indonesia`,
  },
  {
    tag: `it`,
    name: `Italian`,
    localName: `Italiano`,
  },
  {
    tag: `ja`,
    name: `Japanese`,
    localName: `日本語`,
  },
  {
    tag: `ko`,
    name: `Korean`,
    localName: `한국어`,
  },
  {
    tag: `ms`,
    name: `Malay`,
    localName: `Melayu`,
  },
  {
    tag: `nb`,
    name: `Norwegian Bokmål`,
    localName: `norsk bokmål`,
  },
  {
    tag: `pl`,
    name: `Polish`,
    localName: `polski`,
  },
  {
    tag: `pt-BR`,
    name: `Portuguese (Brazil)`,
    localName: `português (Brasil)`,
  },
  {
    tag: `pt-PT`,
    name: `Portuguese (Portugal)`,
    localName: `Português (Portugal)`,
  },
  {
    tag: `ro`,
    name: `Romanian`,
    localName: `română`,
  },
  {
    tag: `ru`,
    name: `Russian`,
    localName: `Русский`,
  },
  {
    tag: `sk`,
    name: `Slovak`,
    localName: `Slovenčina`,
  },
  {
    tag: `sl`,
    name: `Slovenian`,
    localName: `slovenščina`,
  },
  {
    tag: `es-MX`,
    name: `Spanish (Mexico)`,
    localName: `Español (México)`,
  },
  {
    tag: `es-ES`,
    name: `Spanish (Spain)`,
    localName: `español (España)`,
  },
  {
    tag: `sv`,
    name: `Swedish`,
    localName: `Svenska`,
  },
  {
    tag: `ta`,
    name: `Tamil`,
    localName: `தமிழ்`,
  },
  {
    tag: `th`,
    name: `Thai`,
    localName: `ไทย`,
  },
  {
    tag: `tr`,
    name: `Turkish`,
    localName: `Türkçe`,
  },
  {
    tag: `vi`,
    name: `Vietnamese`,
    localName: `Tiếng Việt`,
  },
];
function languageNames(
  languageTag?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let knownLanguage: Dynamic = DOCUMENT_LANGUAGES.find(
    (DOCUMENTLANGUAGES?: Dynamic, ..._extraArguments: unknown[]) =>
      DOCUMENTLANGUAGES.tag === languageTag,
  );
  if (knownLanguage) return knownLanguage;
  let displayName: Dynamic = (
    languageNames2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      return (
        new (Intl.DisplayNames as Dynamic)([languageNames2], {
          type: `language`,
          languageDisplay: `standard`,
        }).of(languageTag) ?? undefined
      );
    } catch {
      return;
    }
  };
  return {
    name: displayName(`en`) ?? languageTag,
    localName: displayName(languageTag) ?? languageTag,
  };
}
var jsxRuntime: Dynamic = loadJsxRuntime();
var DOC_LANGUAGE_COPY: Dynamic = {
  ...DOCUMENT_LANGUAGE_COPY,
  pickerName: `Language`,
  notSet: `Not set`,
  refused: `Couldn’t save the document language.`,
  notSent: `Couldn’t save the document language. Try again.`,
};
var LANGUAGE_FAILURE_TOAST_KEY: Dynamic = `doc-language-failed`;
var UNSET_LANGUAGE_VALUE: Dynamic = ``;
function docLanguageOptions(
  currentTag?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let extraOptions: Dynamic = [];
  if (
    currentTag !== null &&
    !DOCUMENT_LANGUAGES.some(
      (DOCUMENTLANGUAGES?: Dynamic, ..._extraArguments: unknown[]) =>
        DOCUMENTLANGUAGES.tag === currentTag,
    )
  ) {
    let languageNames2: Dynamic = languageNames(currentTag);
    extraOptions.push({
      value: currentTag,
      label: languageNames2.localName,
      description: languageNames2.name,
    });
  }
  return [
    {
      value: UNSET_LANGUAGE_VALUE,
      label: DOC_LANGUAGE_COPY.notSet,
    },
    ...extraOptions,
    ...DOCUMENT_LANGUAGES.map(
      (
        DOCUMENTLANGUAGES?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => ({
        value: DOCUMENTLANGUAGES.tag,
        label: DOCUMENTLANGUAGES.localName,
        description: DOCUMENTLANGUAGES.name,
      }),
    ),
  ];
}
function DocLanguageDialog(
  {
    seat: seat,
    open: open,
    onOpenChange: onOpenChange,
    onClosed: onClosed,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let optimisticLanguage: Dynamic = useDocumentLanguage(seat.pid);
  let language: Dynamic =
    optimisticLanguage === undefined ? seat.language : optimisticLanguage;
  let selectRef: Dynamic = (0, React.useRef)(null);
  let options: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => docLanguageOptions(language),
    [language],
  );
  return (
    <UiDialogsRoot.Root
      open={open}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={(
        docLanguageDialog?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!docLanguageDialog) {
          onClosed?.();
        }
      }}
    >
      <UiDialogsRoot.Popup
        ref={selectRef}
        initialFocus={selectRef}
        finalFocus={false}
        size={`lg`}
        data-testid={`doc-language-dialog`}
      >
        <UiDialogsRoot.Header description={DOC_LANGUAGE_COPY.hint}>
          {DOC_LANGUAGE_COPY.title}
        </UiDialogsRoot.Header>
        <LanguagePicker
          className={`mt-md`}
          options={options}
          value={language ?? UNSET_LANGUAGE_VALUE}
          onSelect={(
            docLanguageDialog?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            onOpenChange(false);
            writeDocumentLanguage(
              seat,
              docLanguageDialog === UNSET_LANGUAGE_VALUE
                ? null
                : docLanguageDialog,
            ).then(
              (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                if (result === `refused`) {
                  toast.error(DOC_LANGUAGE_COPY.refused, {
                    id: LANGUAGE_FAILURE_TOAST_KEY,
                  });
                } else {
                  if (result === `notSent` || result === `busy`) {
                    toast.error(DOC_LANGUAGE_COPY.notSent, {
                      id: LANGUAGE_FAILURE_TOAST_KEY,
                    });
                  }
                }
              },
            );
          }}
          descriptionLang={`en`}
          groupLabel={DOC_LANGUAGE_COPY.pickerName}
        />
      </UiDialogsRoot.Popup>
    </UiDialogsRoot.Root>
  );
}
export { DOC_LANGUAGE_COPY, DocLanguageDialog, docLanguageOptions };
