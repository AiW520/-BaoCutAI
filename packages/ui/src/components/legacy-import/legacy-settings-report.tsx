import { Button, ButtonGroup, Content, Dialog, DialogContainer, Heading } from '@react-spectrum/s2';
import Folder from '@react-spectrum/s2/icons/Folder';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { displayDirectory } from '../../model/legacy-import.ts';
import { useRuntime } from '../../runtime/context.tsx';
import { useLegacyImport } from '../../state/legacy-import-store.ts';
import { useShell } from '../../state/shell-store.ts';
import { LI } from './legacy-import-copy.ts';

const lead = style({ margin: 0, font: 'body', color: 'gray-800' });
const section = style({ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 4 });
const label = style({ font: 'ui-sm', fontWeight: 'bold', color: 'gray-700' });
const note = style({ margin: 0, font: 'ui-sm', color: 'gray-600' });
const hint = style({ marginTop: 24, marginBottom: 0, font: 'ui-sm', color: 'gray-600' });
const pathRow = style({ display: 'flex', alignItems: 'center', gap: 8, minHeight: 40, paddingX: 12, borderWidth: 2, borderStyle: 'solid', borderColor: 'gray-200', borderRadius: 'default', color: 'gray-700', '--iconPrimary': { type: 'fill', value: 'currentColor' } });
const pathText = style({ minWidth: 0, font: 'code-xs', color: 'gray-900', truncate: true, userSelect: 'text' });
const card = style({ padding: 16, marginBottom: 16, backgroundColor: 'gray-50', borderRadius: 'lg', display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 8 });

/** Confirmed prototype: legacy-import.jsx; product-design §8.5. Reading this report never changes Runtime preferences. */
export function LegacySettingsReportDialog() {
  const runtime = useRuntime();
  const report = useLegacyImport((s) => s.settingsReport);
  const open = useLegacyImport((s) => s.settingsReportOpen);
  const close = useLegacyImport((s) => s.closeSettingsReport);
  const go = useShell((s) => s.go);
  if (runtime.host.platform === 'web' || !report || !open) return null;
  const hasModel = report.fields.includes('transcribe.model') || report.fields.includes('vk-default-model');
  const hasLanguage = report.fields.includes('transcribe.sourceLang');
  const settings = () => { close(); go({ tab: 'models', category: 'asr' }); };
  return <DialogContainer onDismiss={close}>
    <Dialog size="M" aria-label={LI.settingsTitle}>
      <Heading slot="title">{LI.settingsTitle}</Heading>
      <Content>
        <p className={lead}>{report.modelsDirectory ? LI.settingsLeadAdopted : LI.settingsLeadPreserved}</p>
        {report.modelsDirectory ? <div className={section}>
          <span className={label}>{LI.settingsDirectory}</span>
          <div className={pathRow}><Folder aria-hidden /><span className={pathText} title={report.modelsDirectory}>{displayDirectory(report.modelsDirectory, runtime.host.platform)}</span></div>
        </div> : null}
        <div className={section}>
          <span className={label}>{LI.settingsPreferences}</span>
          {hasModel ? <p className={lead}>{LI.settingsModel}</p> : null}
          {hasLanguage ? <p className={note}>{LI.settingsLanguage}</p> : null}
        </div>
        <p className={hint}>{LI.settingsHint}</p>
      </Content>
      <ButtonGroup>
        <Button variant="secondary" onPress={close}>{LI.settingsAcknowledge}</Button>
        <Button variant="accent" onPress={settings}>{LI.settingsOpen}</Button>
      </ButtonGroup>
    </Dialog>
  </DialogContainer>;
}

export function LegacySettingsNotice() {
  const runtime = useRuntime();
  const report = useLegacyImport((s) => s.settingsReport);
  const open = useLegacyImport((s) => s.openSettingsReport);
  if (runtime.host.platform === 'web' || !report) return null;
  return <section className={card} aria-label={LI.settingsTitle} data-testid="legacy-settings-notice">
    <p className={lead}>{LI.settingsNotice}</p>
    <p className={note}>{LI.settingsNoticeDetail}</p>
    <Button variant="secondary" size="S" onPress={open}>{LI.settingsViewReport}</Button>
  </section>;
}
