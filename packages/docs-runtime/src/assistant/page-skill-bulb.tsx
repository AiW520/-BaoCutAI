/** page-skill-bulb: restored from PageSkillBulb-Cd0qoRd6.js. */

import type { Dynamic } from "../interop/legacy-dynamic";
import { toModuleNamespace } from "../boot/module-runtime";
import {
  Button,
  EditorHostGlyph,
  loadJsxRuntime,
  loadReact,
  resolvePlatformSessionAndSourcesUnavailable,
  resolvePlatformSyncAndRoutingCompact,
  Tooltip,
  UiOverlaysAndIconsCustomIcon,
} from "../platform/index";
import {
  Field,
  FieldError,
  FieldLabel,
  InfoTip,
  Link,
  Popover,
  Switch,
  TextArea,
} from "../design-system/index";
import {
  IconButton,
  SKILL_PROPERTY,
} from "../document-app/index";
var React: Dynamic = toModuleNamespace(loadReact(), 1);
var SKILL_TRIGGER_KEY: string = `trigger`;
var SKILL_DISABLED_KEY: string = `disabled`;
var ABSENT_SKILL_VIEW: Dynamic = Object.freeze({
  present: false,
  trigger: ``,
  disabled: false,
});
var isRecord: Dynamic = (
  candidate?: Dynamic,
  ..._extraArguments: unknown[]
): boolean =>
  typeof candidate == `object` && !!candidate && !Array.isArray(candidate);
function skillViewOf(slice?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  return isRecord(slice)
    ? {
        present: true,
        trigger:
          typeof slice.trigger == `string` ? slice[SKILL_TRIGGER_KEY] : ``,
        disabled: slice[SKILL_DISABLED_KEY] === true,
      }
    : ABSENT_SKILL_VIEW;
}
var skillIsEnabled: Dynamic = (
  view?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => view.present && !view.disabled;
var TRIGGER_INVALID_PATTERN: Dynamic = /[\p{Cc}<>\u{2028}\u{2029}]/u;
var TRIGGER_CONTROL_PATTERN: Dynamic = /[\p{Cc}\u{2028}\u{2029}]+/gu;
var HIDDEN_CODEPOINT_SOURCE: string = `\\p{Cf}\\p{Default_Ignorable_Code_Point}\\p{Co}\\u{2800}\\u{FFFC}\\u{16FE4}\\u{1D159}\\u{13440}-\\u{13455}\\u{FDD0}-\\u{FDEF}${Array.from<
  Dynamic,
  Dynamic
>(
  {
    length: 17,
  },
  (
    hIDDENCODEPOINTSOURCE?: unknown,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `\\u{${(options * 65536 + 65534).toString(16)}}\\u{${(options * 65536 + 65535).toString(16)}}`,
).join(``)}`;
var HIDDEN_CODEPOINT_PATTERN: Dynamic = RegExp(
  `[${HIDDEN_CODEPOINT_SOURCE}]`,
  `u`,
);
var HIDDEN_CODEPOINTS_PATTERN: Dynamic = RegExp(
  `[${HIDDEN_CODEPOINT_SOURCE}]+`,
  `gu`,
);
var UNUSUAL_SPACE_SOURCE: string = `\\u{A0}\\u{1680}\\u{2000}-\\u{200A}\\u{202F}\\u{205F}\\u{3000}`;
var UNUSUAL_SPACE_PATTERN: Dynamic = RegExp(`[${UNUSUAL_SPACE_SOURCE}]`, `u`);
var UNUSUAL_SPACES_PATTERN: Dynamic = RegExp(
  `[${UNUSUAL_SPACE_SOURCE}]+`,
  `gu`,
);
var EMOJI_VARIATION_PATTERN: Dynamic =
  /((?![#*0-9])\p{Emoji})\u{FE0F}|([#*0-9])\u{FE0F}(?=\u{20E3})/gu;
var normalizeEmojiVariation: Dynamic = (
  trigger?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => trigger.replace(EMOJI_VARIATION_PATTERN, `$1$2`);
function triggerProblem(trigger?: Dynamic, ..._extraArguments: unknown[]) {
  return trigger.trim().length === 0
    ? `empty`
    : trigger.length > 300
      ? `range`
      : HIDDEN_CODEPOINT_PATTERN.test(normalizeEmojiVariation(trigger)) ||
          UNUSUAL_SPACE_PATTERN.test(trigger)
        ? `hidden`
        : TRIGGER_INVALID_PATTERN.test(trigger)
          ? `pattern`
          : null;
}
var TRIGGER_PROBLEM_COPY: Dynamic = {
  empty: `Say when Claude should read this document.`,
  range: `Keep it to 300 characters — one line, not a summary of the document.`,
  pattern: `One plain line — no line breaks, and no < or >.`,
  hidden: `This line carries invisible characters. Clear it and type it again.`,
};
function cleanTrigger(
  trigger?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return trigger
    .replace(TRIGGER_CONTROL_PATTERN, ` `)
    .replace(UNUSUAL_SPACES_PATTERN, ` `)
    .replace(HIDDEN_CODEPOINTS_PATTERN, ``);
}
var setSkillTriggerOps: Dynamic = (
  trigger?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => [
  {
    op: `set`,
    path: [SKILL_PROPERTY],
    value: {
      [SKILL_TRIGGER_KEY]: trigger.trim(),
    },
  },
];
var disableSkillOps: Dynamic = (..._extraArguments: unknown[]): Dynamic => [
  {
    op: `set`,
    path: [SKILL_PROPERTY, SKILL_DISABLED_KEY],
    value: true,
  },
];
var enableSkillOps: Dynamic = (..._extraArguments: unknown[]): Dynamic => [
  {
    op: `delete`,
    path: [SKILL_PROPERTY, SKILL_DISABLED_KEY],
  },
];
var deleteSkillOps: Dynamic = (..._extraArguments: unknown[]): Dynamic => [
  {
    op: `delete`,
    path: [SKILL_PROPERTY],
  },
];
var setDisabledSkillTriggerOps: Dynamic = (
  trigger?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => [
  {
    op: `set`,
    path: [SKILL_PROPERTY],
    value: {
      [SKILL_TRIGGER_KEY]: trigger.trim(),
      [SKILL_DISABLED_KEY]: true,
    },
  },
];
var SKILLS_REQUEST_KIND: string = `skills`;
function pageSkillsRequest(
  pid?: Dynamic,
  operation?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    kind: SKILLS_REQUEST_KIND,
    op: operation,
    ref: {
      object: `project`,
      id: pid,
    },
  };
}
var personalSkillsRequest: Dynamic = (
  ..._extraArguments: unknown[]
): Dynamic => ({
  kind: SKILLS_REQUEST_KIND,
  op: `mine`,
});
var SKILL_ENTRIES_KEY: string = `entries`;
function personalSubscriptionOf(
  response?: Dynamic,
  pid?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let data: Dynamic =
    isRecord(response) && isRecord(response.data) ? response.data : null;
  let entries: Dynamic = data === null ? undefined : data[SKILL_ENTRIES_KEY];
  if (!Array.isArray(entries)) return null;
  let subscription: Dynamic = entries.find(
    (entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      isRecord(entry) && entry.page === pid,
  );
  return isRecord(subscription) ? subscription.enabled === true : false;
}
function subscriptionEnabledOf(
  response?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let data: Dynamic =
    isRecord(response) && isRecord(response.data) ? response.data : null;
  return data !== null && typeof data.enabled == `boolean`
    ? data.enabled
    : null;
}
var PERSONAL_CHECK_FAILED_COPY: string = `Couldn't check whether this is on for you.`;
var PERSONAL_CHECKING_COPY: string = `Checking whether this is on for you…`;
var SKILL_UNREACHABLE_COPY: string = `Couldn't reach the document just now — try again in a moment.`;
var SKILL_EDITOR_REQUIRED_COPY: string = `Only people who can edit this document can change this.`;
var SKILL_SERVER_TOO_OLD_COPY: string = `This document's server doesn't offer this yet — try again after it updates.`;
var SKILL_VIEWER_TOO_OLD_COPY: string = `This can't be changed from this viewer yet — it needs a newer version of the document viewer. Reload the page, or try again after claude.ai updates.`;
function isUnsupportedSkillVerb(
  response?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let data: Dynamic = isRecord(response.data) ? response.data : {};
  if (response.reason === `unknown_verb` || response.reason === `unsupported`)
    return true;
  if (response.reason !== `bad_request`) return false;
  let at: Dynamic = Array.isArray(data.at) ? data.at : [];
  return (
    data.problem === `unknown_verb` ||
    data.problem === `verb` ||
    (data.problem === `unknown_key` &&
      (at.includes(`kind`) || at.includes(`op`) || at.includes(`skill`)))
  );
}
function skillWriteRefusal(
  response?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let data: Dynamic = isRecord(response.data) ? response.data : {};
  if (response.reason === `forbidden` || response.reason === `access`)
    return SKILL_EDITOR_REQUIRED_COPY;
  if (response.reason === `unavailable`)
    return resolvePlatformSessionAndSourcesUnavailable(
      response.reason,
      typeof data.why == `string` ? data.why : undefined,
    );
  if (response.reason === `bad_request`) {
    let problem: Dynamic = typeof data.problem == `string` ? data.problem : ``;
    if (problem === `empty` || problem === `range` || problem === `pattern`)
      return TRIGGER_PROBLEM_COPY[problem];
    if (problem === `required`) return TRIGGER_PROBLEM_COPY.empty;
    if (isUnsupportedSkillVerb(response)) return SKILL_SERVER_TOO_OLD_COPY;
  }
  return typeof response.detail == `string` && response.detail.length > 0
    ? response.detail
    : `The document didn't take that (${response.reason}).`;
}
function subscriptionRefusal(
  response?: Dynamic,
  operation?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let data: Dynamic = isRecord(response.data) ? response.data : {};
  return isUnsupportedSkillVerb(response)
    ? SKILL_SERVER_TOO_OLD_COPY
    : response.reason === `unavailable`
      ? resolvePlatformSessionAndSourcesUnavailable(
          response.reason,
          typeof data.why == `string` ? data.why : undefined,
        )
      : response.reason === `unknown_id` || response.reason === `not_found`
        ? operation === `subscribe`
          ? `This document isn't a skill any more, so it can't be enabled.`
          : `That was already off.`
        : typeof response.detail == `string` && response.detail.length > 0
          ? response.detail
          : operation === `subscribe`
            ? `Couldn't enable that (${response.reason}).`
            : `Couldn't disable that (${response.reason}).`;
}
var UNSENDABLE_SKILL_CODES: Dynamic = new (Set as Dynamic)([
  `NO_RESULT_RELAY`,
  `NOT_SENDABLE`,
]);
var INVALID_SKILL_CODES: Dynamic = new (Set as Dynamic)([
  `INVALID_ARGUMENT`,
  `BAD_PAYLOAD`,
]);
function skillErrorCopy(
  error?: Dynamic,
  ..._extraArguments: unknown[]
): string {
  let code: Dynamic = isRecord(error) ? error.code : undefined;
  return INVALID_SKILL_CODES.has(code)
    ? SKILL_SERVER_TOO_OLD_COPY
    : UNSENDABLE_SKILL_CODES.has(code)
      ? SKILL_VIEWER_TOO_OLD_COPY
      : SKILL_UNREACHABLE_COPY;
}
var jsxRuntime: Dynamic = loadJsxRuntime();
var SKILL_TOGGLE_LABEL: string = `Use as a Claude skill`;
var SKILL_DIALOG_TITLE: Dynamic = SKILL_TOGGLE_LABEL;
var SKILL_DESCRIPTION_CLASS: string = `text-footnote text-secondary font-medium`;
var SKILL_ORGANIZATION_COPY: string = `Makes this document available as a skill to everyone in your organization who can open it. Each person turns it on for themselves here, or asks Claude to.`;
var SKILL_ABOUT_ORGANIZATION_LABEL: string = `About Claude skills`;
var SKILL_PERSONAL_TOGGLE_LABEL: string = `Add to my skills`;
var SKILL_PERSONAL_COPY: string = `When on, this skill is available in all your Claude sessions. Claude decides when to load the document, based on the trigger.`;
var SKILL_ABOUT_SESSIONS_LABEL: string = `About using it in my sessions`;
var SKILL_TRIGGER_LABEL: string = `Trigger`;
var SKILL_TRIGGER_PLACEHOLDER: string = `e.g. asked to assemble or send the weekly digest`;
var SKILL_SAVE_LABEL: string = `Save`;
var SKILL_DELETE_LABEL: string = `Delete skill`;
var SKILL_SESSIONS_COPY: string = `Available in all your Chat, Cowork, and Claude Code sessions.`;
var SKILL_SURFACE_CLASS: string = `bg-surface-1 shadow-card-ring rounded-card gap-sm flex flex-col p-md`;
var SKILL_ROW_CLASS: string = `gap-xs flex items-center`;
var SKILL_HEADING_ROW_CLASS: string = `${SKILL_ROW_CLASS} min-h-8 pb-1`;
var SKILL_CONTROL_ROW_CLASS: string = `${SKILL_ROW_CLASS} min-h-6`;
var SKILL_ICON_BUTTON_CLASS: string = `text-primary hover:bg-alpha-1 flex size-7 shrink-0 items-center justify-center rounded-md transition-colors`;
var SKILL_POPOVER_CLASS: string = `bg-surface-popover dark:bg-surface-0`;
function usePersonalSkillSubscription(
  seat?: Dynamic,
  enabled?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [refusal, setRefusal]: Dynamic = (0, React.useState)(null);
  let [saving, setSaving]: Dynamic = (0, React.useState)(false);
  let [shown, setShown]: Dynamic = (0, React.useState)(undefined);
  let [unread, setUnread]: Dynamic = (0, React.useState)(false);
  let [request, setRequest]: Dynamic = (0, React.useState)(null);
  let seatRef: Dynamic = (0, React.useRef)(seat);
  seatRef.current = seat;
  let mountedRef: Dynamic = (0, React.useRef)(true);
  let loadingRef: Dynamic = (0, React.useRef)(false);
  let retryNeededRef: Dynamic = (0, React.useRef)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      (mountedRef.current = true),
      (..._extraArguments: unknown[]): undefined =>
        void (mountedRef.current = false)
    ),
    [],
  );
  let loadSubscription: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      retryNeededRef.current = true;
      if (!loadingRef.current) {
        loadingRef.current = true;
        (async (..._extraArguments: unknown[]): Promise<undefined> => {
          try {
            for (; retryNeededRef.current && mountedRef.current; ) {
              retryNeededRef.current = false;
              let seat2: Dynamic = seatRef.current;
              let usePersonalSkillSubscriptionResult: Dynamic = null;
              try {
                let config: Dynamic = await seat2.config(
                  personalSkillsRequest(),
                );
                if (config.verdict === `allow`) {
                  usePersonalSkillSubscriptionResult = personalSubscriptionOf(
                    config,
                    seat2.pid,
                  );
                }
              } catch {}
              if (!(!mountedRef.current || seat2.pid !== seatRef.current.pid)) {
                if (usePersonalSkillSubscriptionResult !== null) {
                  setRefusal(usePersonalSkillSubscriptionResult);
                }
                setSaving(usePersonalSkillSubscriptionResult === null);
              }
            }
          } finally {
            loadingRef.current = false;
          }
        })();
      }
    },
    [],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      setRefusal(null);
      setSaving(false);
      setShown(undefined);
      setRequest(null);
      if (enabled) {
        loadSubscription();
      }
    },
    [seat.pid, enabled, loadSubscription],
  );
  return {
    shown: shown ?? refusal,
    unread: refusal === null && saving,
    saving: unread,
    refusal: request,
    press: async (
      personalSkillSubscription?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> => {
      if (unread) return;
      let label: string = personalSkillSubscription
        ? `subscribe`
        : `unsubscribe`;
      setUnread(true);
      setRequest(null);
      setShown(personalSkillSubscription);
      try {
        let config: Dynamic = await seatRef.current.config(
          pageSkillsRequest(seatRef.current.pid, label),
        );
        if (config.verdict === `deny`) {
          setRequest(subscriptionRefusal(config, label));
        } else {
          setRefusal(
            subscriptionEnabledOf(config) ?? personalSkillSubscription,
          );
        }
        loadSubscription();
      } catch (usePersonalSkillSubscriptionResult: Dynamic) {
        setRequest(skillErrorCopy(usePersonalSkillSubscriptionResult));
      } finally {
        setShown(undefined);
        setUnread(false);
      }
    },
    retry: loadSubscription,
  };
}
function useSkillDraft(
  pid?: Dynamic,
  view?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let trigger: Dynamic = view.trigger;
  let [draftPid, setDraftPid]: Dynamic = (0, React.useState)(pid);
  let [armed, setArmed]: Dynamic = (0, React.useState)(false);
  let [draft, setDraft]: Dynamic = (0, React.useState)(trigger);
  let [lastTrigger, setLastTrigger]: Dynamic = (0, React.useState)(trigger);
  let [revoked, setRevoked]: Dynamic = (0, React.useState)(false);
  if (draftPid === pid) {
    if (trigger === lastTrigger) {
      if (view.present && armed) {
        setArmed(false);
      }
    } else {
      setDraft(
        (skillDraft?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          skillDraft.trim() === lastTrigger.trim() ? trigger : skillDraft,
      );
      setLastTrigger(trigger);
    }
  } else {
    setDraftPid(pid);
    setArmed(false);
    setDraft(trigger);
    setLastTrigger(trigger);
    setRevoked(false);
  }
  return {
    armed: armed,
    setArmed: setArmed,
    draft: draft,
    setDraft: setDraft,
    revoked: revoked,
    revoke: (..._extraArguments: unknown[]): Dynamic => setRevoked(true),
  };
}
function PageSkillBulb(
  { seat: seat, chrome = `boxed` }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [open, setOpen]: Dynamic = (0, React.useState)(false);
  let view: Dynamic = skillViewOf(seat.slice);
  let enabled: Dynamic = skillIsEnabled(view);
  let personal: Dynamic = usePersonalSkillSubscription(seat, enabled);
  let draft: Dynamic = useSkillDraft(seat.pid, view);
  let pageSwitchRef: Dynamic = (0, React.useRef)(null);
  let mineSwitchRef: Dynamic = (0, React.useRef)(null);
  let fieldRef: Dynamic = (0, React.useRef)(null);
  let refs: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      pageSwitch: pageSwitchRef,
      mineSwitch: mineSwitchRef,
      field: fieldRef,
    }),
    [],
  );
  let popupRef: Dynamic = (0, React.useRef)(null);
  if (seat.post === undefined && !enabled) return null;
  let sharedEnabled: Dynamic = enabled;
  let personallyEnabled: Dynamic = enabled && personal.shown === true;
  let renderIcon: Dynamic = (
    pageSkillBulb?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (
    <UiOverlaysAndIconsCustomIcon
      name={`Plugin`}
      customSize={pageSkillBulb}
      className={sharedEnabled ? `text-accent` : undefined}
    />
  );
  let triggerProps: Dynamic = {
    "aria-label": SKILL_DIALOG_TITLE,
    "data-testid": `page-skill-bulb`,
    "data-state": view.present ? (view.disabled ? `disabled` : `live`) : `none`,
    "data-dot": personallyEnabled ? `true` : undefined,
  };
  let surfaceClass: Dynamic =
    chrome === `button`
      ? `bg-surface-popover`
      : chrome === `bar`
        ? `tb-plane`
        : chrome === `docked`
          ? SKILL_POPOVER_CLASS
          : `bg-fill-secondary`;
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <span className={`relative inline-flex`}>
        <Tooltip content={SKILL_DIALOG_TITLE}>
          <Popover.Trigger
            render={
              chrome === `button` ? (
                <IconButton {...triggerProps} variant={`default`} size={EditorHostGlyph.size} icon={renderIcon(EditorHostGlyph.glyph)} />
              ) : chrome === `bar` || chrome === `docked` ? (
                <Button
                  {...triggerProps}
                  iconOnly={true}
                  variant={`ghost`}
                  icon={renderIcon(chrome === `docked` ? 20 : 16)}
                  tooltip={false}
                  className={`shrink-0`}
                />
              ) : (
                <button type={`button`} {...triggerProps} className={SKILL_ICON_BUTTON_CLASS}>{renderIcon(15)}</button>
              )
            }
          />
        </Tooltip>
        {personallyEnabled && (
          <span
            aria-hidden={`true`}
            data-testid={`page-skill-bulb-dot`}
            className={`${surfaceClass} pointer-events-none absolute top-0 right-0 rounded-full p-0.5`}
          >
            <span className={`bg-fill-accent block size-1.5 rounded-full`} />
          </span>
        )}
      </span>
      <Popover.Popup
        side={`bottom`}
        align={`start`}
        sideOffset={4}
        style={{
          width: `min(320px, calc(100vw - 24px))`,
        }}
        initialFocus={(..._extraArguments: unknown[]): Dynamic =>
          (draft.armed && !view.present ? refs.field.current : null) ??
          refs.pageSwitch.current ??
          refs.mineSwitch.current ??
          true
        }
      >
        <div
          ref={popupRef}
          className={`outline-none`}
          onKeyDownCapture={(
            event?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (
              !(
                event.key !== `Escape` ||
                event.nativeEvent.isComposing ||
                !(event.target instanceof (Node as Dynamic)) ||
                !popupRef.current?.contains(event.target)
              )
            ) {
              event.preventDefault();
              setOpen(false);
            }
          }}
        >
          <SkillEditorWithDraft
            view={view}
            post={seat.post}
            onWritten={seat.onWritten}
            personal={enabled ? personal : undefined}
            draft={draft}
            refs={refs}
            Title={Popover.Title}
          />
        </div>
      </Popover.Popup>
    </Popover.Root>
  );
}
function SkillEditorWithDraft(
  props?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let localDraft: Dynamic = useSkillDraft(``, props.view);
  return (
    <SkillEditor {...props} draft={props.draft ?? localDraft} />
  );
}
function SkillEditor(props?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  let {
    view: props2,
    post: props3,
    onWritten: props4,
    personal: props5,
    refs: props6,
    Title: Props7Component = `h2`,
  }: Dynamic = props;
  let {
    armed: draft,
    setArmed: draft2,
    draft: draft3,
    setDraft: draft4,
    revoked: draft5,
    revoke: draft6,
  }: Dynamic = props.draft;
  let mode: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let fieldId: Dynamic = (0, React.useId)();
  let [triggerFailure, setTriggerFailure]: Dynamic = (0, React.useState)(null);
  let [refusal, setRefusal]: Dynamic = (0, React.useState)(null);
  let [saving, setSaving]: Dynamic = (0, React.useState)(null);
  let [optimisticEnabled, setOptimisticEnabled]: Dynamic = (0, React.useState)(
    undefined,
  );
  let [statusNote, setStatusNote]: Dynamic = (0, React.useState)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (draft && !props2.present) {
        props6?.field.current?.focus();
      }
    },
    [draft, props2.present, props6],
  );
  let canEdit: boolean = props3 !== undefined && !draft5;
  let idle: boolean = saving === null;
  let enabled: Dynamic =
    optimisticEnabled ?? (props2.present ? !props2.disabled : draft);
  let enablingNewSkill: Dynamic = enabled && !props2.present;
  let triggerChanged: boolean = draft3.trim() !== props2.trigger.trim();
  let canSave: Dynamic =
    idle && enabled && triggerChanged && draft3.trim().length > 0;
  let writeSkill = async (
    skillEditor?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    if (props3 === undefined) return;
    let trigger: Dynamic = props2.trigger;
    setSaving(skillEditor);
    setRefusal(null);
    setOptimisticEnabled(context);
    try {
      let props8: Dynamic = await props3(options);
      if (props8.verdict === `deny`) {
        if (props8.reason === `forbidden` || props8.reason === `access`) {
          draft6();
        } else {
          setRefusal(skillWriteRefusal(props8));
        }
      } else {
        await props4?.();
        if (skillEditor === `delete`) {
          draft2(false);
          setStatusNote(trigger);
        }
        if (skillEditor === `undo`) {
          setStatusNote(null);
        }
      }
    } catch {
      setRefusal(SKILL_UNREACHABLE_COPY);
    } finally {
      setOptimisticEnabled(undefined);
      setSaving(null);
    }
  };
  let saveTrigger = (..._extraArguments: unknown[]): undefined => {
    if (!canSave) return;
    let triggerProblem2: Dynamic = triggerProblem(draft3);
    setTriggerFailure(triggerProblem2);
    if (triggerProblem2 === null) {
      writeSkill(`save`, setSkillTriggerOps(draft3));
    }
  };
  let toggleSkill = (
    skillEditor?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (idle) {
      setRefusal(null);
      setTriggerFailure(null);
      setStatusNote(null);
      if (!props2.present) {
        draft2(skillEditor);
        if (!skillEditor) {
          draft4(``);
        }
        return;
      }
      writeSkill(
        skillEditor ? `enable` : `disable`,
        skillEditor ? enableSkillOps() : disableSkillOps(),
        skillEditor,
      );
    }
  };
  let skillState: string = props2.present
    ? props2.disabled
      ? `disabled`
      : `live`
    : `none`;
  let characterCountClass: string =
    draft3.length >= 290 ? `text-warning` : `text-secondary`;
  return (
    <section
      data-testid={`page-skill-panel`}
      data-state={skillState}
      className={`flex flex-col`}
    >
      <div
        className={SKILL_HEADING_ROW_CLASS}
        data-testid={`page-skill-title-row`}
      >
        <Props7Component
          id={fieldId}
          className={SKILL_DESCRIPTION_CLASS}
          data-testid={`page-skill-header`}
        >
          {SKILL_TOGGLE_LABEL}
        </Props7Component>
        <InfoTip
          icon={`Help`}
          side={`right`}
          className={`text-secondary`}
          content={SKILL_ORGANIZATION_COPY}
          aria-label={SKILL_ABOUT_ORGANIZATION_LABEL}
        />
        <span className={`grow`} />
        {canEdit && (
          <Switch
            ref={props6?.pageSwitch}
            aria-labelledby={fieldId}
            data-testid={`page-skill-switch`}
            size={mode(`sm`)}
            checked={enabled}
            disabled={!idle}
            aria-busy={saving === `enable` || saving === `disable`}
            onCheckedChange={(
              skillEditor?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => toggleSkill(skillEditor)}
          />
        )}
      </div>
      <div className={`gap-md flex flex-col`}>
        {canEdit && refusal !== null && (
          <p
            className={`text-caption text-danger`}
            role={`alert`}
            data-testid={`page-skill-refusal`}
          >
            {refusal}
          </p>
        )}
        {canEdit ? (
          enabled ? (
            <div
              className={SKILL_SURFACE_CLASS}
              data-testid={`page-skill-box`}
              data-mode={`edit`}
              data-on={`true`}
            >
              <Field invalid={triggerFailure !== null}>
                <FieldLabel className={`text-footnote`}>
                  {SKILL_TRIGGER_LABEL}
                </FieldLabel>
                <TextArea
                  ref={props6?.field}
                  data-testid={`page-skill-trigger`}
                  rows={2}
                  autosize={true}
                  size={mode(`sm`)}
                  maxLength={300}
                  placeholder={SKILL_TRIGGER_PLACEHOLDER}
                  value={draft3}
                  disabled={!idle}
                  onChange={(
                    event?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    setRefusal(null);
                    setTriggerFailure(null);
                    draft4(cleanTrigger(event.target.value));
                  }}
                  onKeyDown={(
                    event?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    if (
                      !(event.key !== `Enter` || event.nativeEvent.isComposing)
                    ) {
                      event.preventDefault();
                      saveTrigger();
                    }
                  }}
                />
                {draft3.length > 240 && (
                  <div className={`flex justify-end`}>
                    <span
                      className={`text-caption tabular-nums ${characterCountClass}`}
                      data-testid={`page-skill-count`}
                      aria-hidden={`true`}
                    >
                      {draft3.length}
                      {`/`}
                      {300}
                    </span>
                  </div>
                )}
                {triggerFailure !== null && (
                  <FieldError match={true} data-testid={`page-skill-error`}>
                    {TRIGGER_PROBLEM_COPY[triggerFailure]}
                  </FieldError>
                )}
              </Field>
              <div className={`gap-sm flex items-center`}>
                {enablingNewSkill && (
                  <span
                    className={`text-caption text-secondary`}
                    data-testid={`page-skill-unsaved`}
                  >{`Not saved yet`}</span>
                )}
                <span className={`grow`} />
                <Button
                  size={mode(`sm`)}
                  variant={`primary`}
                  onClick={saveTrigger}
                  disabled={!canSave}
                  data-testid={`page-skill-save`}
                >
                  {saving === `save` ? `Saving…` : SKILL_SAVE_LABEL}
                </Button>
              </div>
            </div>
          ) : props2.present ? (
            <div
              className={SKILL_SURFACE_CLASS}
              data-testid={`page-skill-box`}
              data-mode={`edit`}
              data-on={`false`}
            >
              <SkillTriggerReadout words={props2.trigger} muted={true} />
              <p className={`text-caption text-secondary`}>
                <Link
                  inheritColor={true}
                  className={`hover:text-danger focus-visible:text-danger`}
                  disabled={!idle}
                  onClick={(..._extraArguments: unknown[]): boolean | undefined =>
                    idle && void writeSkill(`delete`, deleteSkillOps(), false)
                  }
                  data-testid={`page-skill-delete`}
                >
                  {saving === `delete` ? `Deleting…` : SKILL_DELETE_LABEL}
                </Link>
              </p>
            </div>
          ) : null
        ) : (
          <div
            className={SKILL_SURFACE_CLASS}
            data-testid={`page-skill-box`}
            data-mode={`read`}
          >
            <SkillTriggerReadout words={props2.trigger} />
            <p
              className={`text-caption text-secondary`}
              data-testid={`page-skill-editors-only`}
            >
              {SKILL_EDITOR_REQUIRED_COPY}
            </p>
          </div>
        )}
        {canEdit && statusNote !== null && !props2.present && (
          <p
            className={`text-caption text-secondary`}
            data-testid={`page-skill-deleted`}
          >
            {`Skill deleted`}
            {` ·`}
            {` `}
            <Link
              inheritColor={true}
              disabled={!idle}
              onClick={(..._extraArguments: unknown[]): boolean | undefined =>
                idle &&
                void writeSkill(
                  `undo`,
                  setDisabledSkillTriggerOps(statusNote),
                  false,
                )
              }
              data-testid={`page-skill-undo`}
            >{`Undo`}</Link>
          </p>
        )}
        {props5 !== undefined && (!canEdit || enabled) && (
          <PersonalSkillControl
            personal={props5}
            switchRef={props6?.mineSwitch}
          />
        )}
        <p
          className={`text-caption text-secondary`}
          data-testid={`page-skill-footer`}
        >
          {SKILL_SESSIONS_COPY}
        </p>
      </div>
    </section>
  );
}
function SkillTriggerReadout(
  { words: words, muted = false }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    <dl
      className={`gap-sm flex flex-col ${muted ? `text-secondary` : `text-primary`}`}
    >
      <dt
        className={`text-footnote font-medium`}
        data-testid={`page-skill-trigger-view-label`}
      >
        {SKILL_TRIGGER_LABEL}
      </dt>
      <dd>
        <pre
          className={`text-code bg-alpha-1 rounded-md px-2 py-1.5 wrap-break-word whitespace-pre-wrap select-text`}
          data-testid={`page-skill-trigger-view`}
        >
          {words}
        </pre>
      </dd>
    </dl>
  );
}
function PersonalSkillControl(
  { personal: personal, switchRef: switchRef }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let mode: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let switchId: Dynamic = (0, React.useId)();
  let {
    shown: personal2,
    unread: personal3,
    saving: personal4,
    refusal: personal5,
    press: personal6,
    retry: personal7,
  }: Dynamic = personal;
  return (
    <div
      className={`gap-xs flex flex-col`}
      data-testid={`page-skill-personal`}
      data-on={personal2 === null ? `unsaid` : String(personal2)}
    >
      <div className={SKILL_CONTROL_ROW_CLASS}>
        <label
          htmlFor={switchId}
          className={`text-footnote font-medium`}
          data-testid={`page-skill-mine-label`}
        >
          {SKILL_PERSONAL_TOGGLE_LABEL}
        </label>
        <InfoTip
          icon={`Help`}
          side={`right`}
          className={`text-secondary`}
          content={SKILL_PERSONAL_COPY}
          aria-label={SKILL_ABOUT_SESSIONS_LABEL}
        />
        <span className={`grow`} />
        <Switch
          id={switchId}
          ref={switchRef}
          data-testid={`page-skill-for-me`}
          size={mode(`sm`)}
          checked={personal2 === true}
          disabled={personal2 === null}
          disabledReason={
            personal3 ? PERSONAL_CHECK_FAILED_COPY : PERSONAL_CHECKING_COPY
          }
          disabledReasonSide={`left`}
          aria-busy={personal4}
          onCheckedChange={(
            personalSkillControl?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => void personal6(personalSkillControl)}
        />
      </div>
      {personal3 && (
        <p
          className={`text-caption text-secondary`}
          data-testid={`page-skill-personal-unread`}
        >
          {`Couldn't check whether this is on for you.`}
          {` `}
          <Link
            inheritColor={true}
            onClick={(..._extraArguments: unknown[]): Dynamic => personal7()}
            data-testid={`page-skill-personal-retry`}
          >{`Retry`}</Link>
        </p>
      )}
      {personal5 !== null && (
        <p
          className={`text-caption text-danger`}
          role={`alert`}
          data-testid={`page-skill-personal-refusal`}
        >
          {personal5}
        </p>
      )}
    </div>
  );
}
export { PageSkillBulb };
