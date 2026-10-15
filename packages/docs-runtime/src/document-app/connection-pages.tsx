/** BaoCut: connection pages from index-CX4IZqzA.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  Button,
  CommentsStoreClaude,
  Link,
  UiOverlaysAndIconsCustomIcon,
  lazyZod,
} from "./dependencies";
import {
  React,
  jsxRuntime,
} from "./bootstrap";
import {
  ClaudeLogo,
} from "./document-recovery";

function SignInRequiredPage(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
) {
  return (
    <div
      className={`bg-surface-0 flex h-screen items-center justify-center px-6`}
    >
      <div
        className={`bg-surface-1 w-full max-w-sm rounded-lg border p-8 shadow-xs`}
      >
        <div className={`mb-5 flex items-center gap-2`}>
          <ClaudeLogo
            className={`size-5 shrink-0 text-[var(--cds-fill-brand)]`}
          />
          <span
            className={`text-primary text-sm font-semibold`}
          >{`Bongo`}</span>
        </div>
        <h1
          className={`text-primary text-heading mb-2 flex items-center gap-1.5 font-semibold`}
        >
          <UiOverlaysAndIconsCustomIcon name={`CheckCircle`} customSize={16} />
          {`You can close this tab`}
        </h1>
        <p
          className={`text-secondary mb-6 text-xs leading-relaxed`}
          data-testid={`auth-done`}
        >{`Head back to Claude — the panel you started signing in from picks up automatically once sign-in has finished.`}</p>
        <Button
          onClick={(..._extraArguments: unknown[]) => window.close()}
          className={`w-full justify-center`}
        >{`Close this tab`}</Button>
      </div>
    </div>
  );
}

function ConnectionPage(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
) {
  return (
    <ConnectionPageLayout>
      <ConnectionStatusCard />
    </ConnectionPageLayout>
  );
}

function ConnectionPageLayout(
  { children: children }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <div
      className={`bg-surface-0 flex h-screen items-center justify-center px-6`}
    >
      <div
        className={`bg-surface-1 w-full max-w-[420px] rounded-lg border p-8 shadow-xs`}
      >
        {children}
      </div>
    </div>
  );
}

function ConnectionStatusCard(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
) {
  let connectionStatusCardResult: Dynamic = CommentsStoreClaude(
    (response?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      response.status,
  );
  let connectionStatusCardResult2: Dynamic = CommentsStoreClaude(
    (connectionStatusCard?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      connectionStatusCard.error,
  );
  let connectionStatusCardResult3: Dynamic = CommentsStoreClaude(
    (connectionStatusCard?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      connectionStatusCard.retrying,
  );
  let connectionStatusCardResult4: Dynamic = CommentsStoreClaude(
    (connectionStatusCard?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      connectionStatusCard.startConnect,
  );
  let connectionStatusCardResult5: Dynamic = CommentsStoreClaude(
    (connectionStatusCard?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      connectionStatusCard.pendingSignIn,
  );
  let [disabled, setDisabled]: Dynamic = (0, React.useState)(false);
  let onClick = async (..._extraArguments: unknown[]): Promise<undefined> => {
    setDisabled(true);
    try {
      let total = location.pathname + location.search + location.hash;
      await connectionStatusCardResult4(
        total.startsWith(`/`) &&
          !total.startsWith(`//`) &&
          !total.startsWith(`/\\`) &&
          !total.includes(`
`)
          ? total
          : `/`,
      );
      if (CommentsStoreClaude.getState().pendingSignIn) {
        setDisabled(false);
      }
    } catch {
      setDisabled(false);
    }
  };
  return connectionStatusCardResult === `error` ? (
    <jsxRuntime.Fragment>
      <div
        className={`text-primary mb-2 flex items-center gap-1.5 text-[13px] font-semibold`}
      >
        <UiOverlaysAndIconsCustomIcon name={`WarningCircle`} customSize={14} />
        {`Couldn’t reach the auth service`}
      </div>
      <p className={`text-secondary text-xs leading-relaxed`}>
        {connectionStatusCardResult2}
      </p>
      <p className={`text-secondary mt-3 flex items-center gap-1.5 text-xs`}>
        {connectionStatusCardResult3 ? (
          <jsxRuntime.Fragment>
            <span
              className={`border-strong inline-block size-3 animate-spin rounded-full border-[1.5px] border-t-transparent`}
            />
            {`Retrying…`}
          </jsxRuntime.Fragment>
        ) : (
          `Will retry when the connection comes back.`
        )}
      </p>
      <Button
        variant={`brand`}
        onClick={onClick}
        disabled={disabled}
        className={`mt-5 w-full justify-center`}
      >
        {`Sign in with Claude `}
        <UiOverlaysAndIconsCustomIcon name={`ArrowOutSquare`} size={`xs`} />
      </Button>
      {connectionStatusCardResult5 && (
        <PendingSignInInstructions
          authorizeUrl={connectionStatusCardResult5.authorizeUrl}
        />
      )}
    </jsxRuntime.Fragment>
  ) : (
    <jsxRuntime.Fragment>
      <div className={`mb-5 flex items-center gap-2`}>
        <ClaudeLogo
          className={`size-5 shrink-0 text-[var(--cds-fill-brand)]`}
        />
        <span className={`text-primary text-sm font-semibold`}>{`Bongo`}</span>
      </div>
      <h1
        className={`text-primary mb-2 text-[15px] font-semibold`}
      >{`Sign in with Claude`}</h1>
      <p
        className={`text-secondary mb-6 text-xs leading-relaxed`}
      >{`Bongo uses your Claude account to access BigQuery, Sheets and other connectors on your behalf.`}</p>
      <Button
        variant={`brand`}
        onClick={onClick}
        disabled={disabled}
        className={`w-full justify-center`}
      >
        {`Sign in with Claude `}
        <UiOverlaysAndIconsCustomIcon name={`ArrowOutSquare`} size={`xs`} />
      </Button>
      {connectionStatusCardResult5 && (
        <PendingSignInInstructions
          authorizeUrl={connectionStatusCardResult5.authorizeUrl}
        />
      )}
    </jsxRuntime.Fragment>
  );
}

function PendingSignInInstructions(
  { authorizeUrl: authorizeUrl }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let pendingSignInInstructionsResult: Dynamic = CommentsStoreClaude(
    (
      pendingSignInInstructions?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => pendingSignInInstructions.load,
  );
  return (
    <div className={`mt-4`} data-testid={`pending-signin`}>
      <p
        className={`text-secondary flex items-start gap-1.5 text-xs leading-relaxed`}
      >
        <span
          className={`border-strong mt-0.5 inline-block size-3 shrink-0 animate-spin rounded-full border-[1.5px] border-t-transparent`}
        />
        {`Finish signing in in the new tab — this panel continues automatically once you’re done.`}
      </p>
      <p className={`text-secondary mt-2 text-xs leading-relaxed`}>
        {`If a new tab didn’t open,`}
        {` `}
        <Link
          external={true}
          href={authorizeUrl}
        >{`open the sign-in page here`}</Link>
        {` `}
        {`(and allow pop-ups for this site). Already signed in?`}
        {` `}
        <Link
          onClick={(..._extraArguments: unknown[]): undefined =>
            void pendingSignInInstructionsResult()
          }
        >{`Check again`}</Link>
        {`.`}
      </p>
    </div>
  );
}

var asManifestObject: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeConnectionPagesStep1(): void {
  lazyZod
    .object({
      name: lazyZod.string().min(1),
      bornAt: lazyZod.string().optional(),
      role: lazyZod.unknown().optional(),
      fileCount: lazyZod.number().int().nonnegative().optional(),
      updatedAt: lazyZod.string().optional(),
      thumbSha: lazyZod
        .string()
        .regex(/^blob\/[A-Za-z0-9_-]{1,64}$/)
        .optional(),
    })
    .passthrough();
  lazyZod.object({
    fileId: lazyZod.string().min(1),
    name: lazyZod.string().min(1),
    projectId: lazyZod.string().min(1),
    projectName: lazyZod.string().min(1),
    updatedAt: lazyZod.string().min(1),
    thumbSha: lazyZod
      .string()
      .regex(/^blob\/[A-Za-z0-9_-]{1,64}$/)
      .optional(),
  });
  (asManifestObject = (
    asManifestObject2?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof asManifestObject2 == `object` &&
    asManifestObject2 &&
    !Array.isArray(asManifestObject2)
      ? asManifestObject2
      : {});
}

export {
  ConnectionPage,
  SignInRequiredPage,
  asManifestObject,
};
