import { useEffect, useRef, useState } from 'react';
import type { OnlineCapability } from '@baocut/protocol';
import { ActionButton, Badge, Button, ButtonGroup, Checkbox, Content, Dialog, DialogContainer, Footer, Heading, Picker, PickerItem, Radio, RadioGroup, TextField } from '@react-spectrum/s2';
import ChevronRightIcon from '@react-spectrum/s2/icons/ChevronRight';
import DeviceLaptop from '@react-spectrum/s2/icons/DeviceLaptop';
import GlobeGrid from '@react-spectrum/s2/icons/GlobeGrid';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { M } from '../../model/onboarding-copy.ts';
import { CAPABILITY_SHORT } from '../../model/models-cloud.ts';
import { probeFromJob } from '../../model/models-probe.ts';
import { connectTuzi, declareTuziModels, saveTuziDefaults, TUZI_ENDPOINT, TUZI_CAPABILITIES, suggestedTuziModels, verifiedTuziModels, type TuziSelection, type TuziVerification } from '../../model/onboarding-api.ts';
import { useRuntime } from '../../runtime/context.tsx';
import { useModels } from '../../state/models-store.ts';
import { useJobs } from '../../state/jobs-store.ts';
import { startProbe } from '../models/model-actions.ts';

const modeIntro = style({ margin: 0, font: 'title-lg', fontWeight: 'bold', color: 'gray-900' });
const modeLead = style({ marginTop: 8, marginBottom: 0, font: 'body', color: 'gray-700' });
const modeChoices = style({ display: 'grid', gridTemplateColumns: { default: '[repeat(2, minmax(0, 1fr))]', '@media (max-width: 680px)': '[minmax(0, 1fr)]' }, gap: 12, marginTop: 20 });
const modeCard = style({
  display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 8, minWidth: 0, padding: 16,
  borderWidth: 1, borderStyle: 'solid', borderColor: { default: 'gray-200', isOn: 'blue-800' },
  borderRadius: 'lg', backgroundColor: { default: 'gray-50', isOn: 'blue-100' }, textAlign: 'start', cursor: 'pointer',
});
const modeIcon = style({ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 'lg', backgroundColor: 'gray-100', color: 'gray-800' });
const modeTitle = style({ display: 'flex', alignItems: 'center', gap: 8, font: 'title-sm', fontWeight: 'bold', color: 'gray-900' });
const modeDesc = style({ margin: 0, font: 'ui', color: 'gray-800' });
const modePoints = style({ margin: 0, font: 'ui-sm', color: 'gray-600', lineHeight: '[1.6]' });
const modeTrail = style({ display: 'flex', alignItems: 'center', gap: 4, width: 'full', marginTop: 'auto', paddingTop: 8, font: 'ui-sm', fontWeight: 'bold', color: 'gray-800' });
const apiStack = style({ display: 'flex', flexDirection: 'column', gap: 12 });
const apiEndpoint = style({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, padding: 12, borderRadius: 'lg', backgroundColor: 'gray-100', color: 'gray-800' });
const apiEndpointText = style({ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, minWidth: 0 });
const apiCode = style({ font: 'code-xs', color: 'gray-600', overflowWrap: 'anywhere' });
const apiNotice = style({ marginTop: 12, marginBottom: 0, font: 'ui-sm', color: 'gray-600', overflowWrap: 'anywhere' });
const apiSummary = style({ display: 'flex', flexDirection: 'column', gap: 8, padding: 12, borderRadius: 'lg', backgroundColor: 'green-100', color: 'green-900' });

/** Approved dual-path UI; production capability checks use real Runtime jobs. */
export function ModeChoice({ onSelect, onLater }: { onSelect: (mode: 'api' | 'local') => void; onLater: () => void }) {
  const [value, setValue] = useState<'api' | 'local'>('api');
  return (
    <DialogContainer onDismiss={onLater}>
      <Dialog size="L" aria-label={M.dialogLabel}>
        <Heading slot="title">{M.dialogLabel}</Heading>
        <Content>
          <p className={modeIntro}>{M.mode.intro}</p>
          <p className={modeLead}>{M.mode.lead}</p>
          <RadioGroup aria-label={M.mode.intro} orientation="horizontal" value={value} onChange={(v) => setValue(v as 'api' | 'local')}>
            <div className={modeChoices}>
              <div className={modeCard({ isOn: value === 'api' })} onClick={() => setValue('api')}>
                <span className={modeIcon}><GlobeGrid /></span>
                <span className={modeTitle}><Radio value="api">{M.mode.api}</Radio><Badge variant="informative" size="S" fillStyle="subtle">{M.mode.recommended}</Badge></span>
                <p className={modeDesc}>{M.mode.apiDesc}</p>
                <p className={modePoints}>{M.mode.apiPoints}</p>
                <span className={modeTrail}>{M.mode.apiAction} <ChevronRightIcon /></span>
              </div>
              <div className={modeCard({ isOn: value === 'local' })} onClick={() => setValue('local')}>
                <span className={modeIcon}><DeviceLaptop /></span>
                <span className={modeTitle}><Radio value="local">{M.mode.local}</Radio></span>
                <p className={modeDesc}>{M.mode.localDesc}</p>
                <p className={modePoints}>{M.mode.localPoints}</p>
                <span className={modeTrail}>{M.mode.localAction} <ChevronRightIcon /></span>
              </div>
            </div>
          </RadioGroup>
          <p className={apiNotice}>{M.mode.agentNote}</p>
        </Content>
        <Footer>
          <ActionButton isQuiet onPress={onLater}>{M.mode.later}</ActionButton>
        </Footer>
        <ButtonGroup>
          <Button variant="accent" autoFocus onPress={() => onSelect(value)}>{value === 'api' ? M.mode.apiAction : M.mode.localAction}</Button>
        </ButtonGroup>
      </Dialog>
    </DialogContainer>
  );
}


const capabilityCard = style({ display: 'flex', flexDirection: 'column', gap: 8, padding: 12, borderWidth: 1, borderStyle: 'solid', borderColor: 'gray-200', borderRadius: 'lg', minWidth: 0 });
const failureText = style({ font: 'ui-sm', color: 'negative', margin: 0, overflowWrap: 'anywhere' });

export function TuziApiSetup({ onBack, onLater, onDone }: { onBack: () => void; onLater: () => void; onDone: (agent: boolean) => void }) {
  const runtime = useRuntime();
  const view = useModels((s) => s.capabilities);
  const jobs = useJobs((s) => s.jobs);
  const [key, setKey] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [providerId, setProviderId] = useState<string | null>(null);
  const [ids, setIds] = useState<string[] | null>(null);
  const [selected, setSelected] = useState<TuziSelection>({});
  const [runs, setRuns] = useState<Partial<Record<OnlineCapability, TuziVerification>>>({});
  const [done, setDone] = useState(false);
  const [voice, setVoice] = useState('alloy');
  const saved = useRef(new Set<string>());
  const live = useRef(true);
  useEffect(() => { live.current = true; return () => { live.current = false; }; }, []);
  const results = Object.fromEntries(Object.entries(runs).filter(([, run]) => !!run).map(([cap, run]) => {
    if (run.state !== 'running' || !run.jobId) return [cap, run];
    const state = probeFromJob(run.jobId, jobs.find((j) => j.jobId === run.jobId));
    return [cap, state.status === 'done' ? { ...run, state: 'verified' } : state.status === 'failed' ? { ...run, state: 'failed', message: state.message } : run];
  })) as Partial<Record<OnlineCapability, TuziVerification>>;
  const running = Object.values(results).some((r) => r.state === 'running');
  const usable = verifiedTuziModels(selected, results);
  const connect = async () => {
    if ((!providerId && !key.trim()) || busy || !view) return;
    setBusy(true); setError(null);
    try {
      const id = providerId ?? await connectTuzi(runtime, view, key.trim());
      if (!live.current) return;
      setProviderId(id); setKey('');
      const report = await runtime.refreshModelProvider(id);
      if (!report.ok) throw new Error(report.error ?? M.mode.discoveryFailed);
      if (!report.modelIds?.length) throw new Error(M.mode.emptyModels);
      if (!live.current) return;
      const list = [...new Set(report.modelIds)].sort();
      setIds(list); setSelected(suggestedTuziModels(list));
    } catch (err) {
      if (live.current) setError(M.mode.error(err instanceof Error ? err.message : String(err)));
    } finally { if (live.current) setBusy(false); }
  };
  const verify = async () => {
    if (!providerId || !view || busy || running) return;
    setBusy(true); setError(null);
    try {
      const capabilities = await declareTuziModels(runtime, useModels.getState().capabilities ?? view, providerId, selected);
      for (const cap of TUZI_CAPABILITIES) {
        const modelId = selected[cap];
        if (!modelId || cap === 'transcribe' || results[cap]?.modelId === modelId && results[cap]?.state === 'verified') continue;
        try {
          const model = capabilities[cap]?.models.find((m) => m.modelId === modelId);
          if (!model) throw new Error(M.mode.discoveryFailed);
          const jobId = await startProbe(runtime, cap, providerId, model, voice);
          if (!live.current) return;
          setRuns((r) => ({ ...r, [cap]: { modelId, jobId, state: 'running' } }));
        } catch (err) {
          if (live.current) setRuns((r) => ({ ...r, [cap]: { modelId, state: 'failed', message: err instanceof Error ? err.message : String(err) } }));
        }
      }
    } catch (err) { if (live.current) setError(err instanceof Error ? err.message : String(err)); }
    finally { if (live.current) setBusy(false); }
  };
  const save = async () => {
    if (!providerId || busy || running || !Object.keys(usable).length) return;
    setBusy(true); setError(null);
    try {
      await saveTuziDefaults(runtime, providerId, selected, results, saved.current);
      if (live.current) setDone(true);
    } catch (err) { if (live.current) setError(err instanceof Error ? err.message : String(err)); }
    finally { if (live.current) setBusy(false); }
  };
  const dismiss = () => { if (!busy) onLater(); };
  return <DialogContainer onDismiss={dismiss}><Dialog size="L" aria-label={M.mode.connectTitle}>
    <Heading slot="title">{done ? M.mode.doneTitle : ids ? M.mode.modelsTitle : M.mode.connectTitle}</Heading>
    <Content>
      {!ids ? <div className={apiStack}>
        <div className={apiEndpoint}><GlobeGrid /><span className={apiEndpointText}><strong>Tuzi API</strong><code className={apiCode}>{TUZI_ENDPOINT}</code></span></div>
        {!providerId ? <TextField label={M.mode.keyLabel} type="password" value={key} onChange={(v) => { setKey(v); setError(null); }} placeholder={M.mode.keyPlaceholder} autoComplete="off" isDisabled={busy} /> : <p>{M.mode.connected}</p>}
        <p className={apiNotice}>{M.mode.notice}</p><p className={apiNotice}>{M.mode.demoNotice}</p>
      </div> : done ? <div className={apiSummary}><strong>{M.mode.doneTitle}</strong><span>{M.mode.doneBody(Object.keys(usable).length)}</span>{Object.entries(usable).map(([cap, id]) => <span key={cap}>{CAPABILITY_SHORT[cap as OnlineCapability]} · {id}</span>)}</div> : <>
        <p className={apiNotice}>{M.mode.discoveryNote(ids.length)}</p>
        <div className={modeChoices}>
          {TUZI_CAPABILITIES.map((cap) => {
            const current = results[cap];
            return <div key={cap} className={capabilityCard}>
              <Checkbox isSelected={!!selected[cap]} isDisabled={busy || running} onChange={(on) => { setSelected((s) => ({ ...s, [cap]: on ? suggestedTuziModels(ids)[cap] ?? ids[0] : undefined })); setRuns((r) => ({ ...r, [cap]: undefined })); }}>{CAPABILITY_SHORT[cap]}</Checkbox>
              {selected[cap] ? <Picker aria-label={CAPABILITY_SHORT[cap]} selectedKey={selected[cap]} isDisabled={busy || running} onSelectionChange={(id) => { setSelected((s) => ({ ...s, [cap]: String(id) })); setRuns((r) => ({ ...r, [cap]: undefined })); }} items={ids.map((id) => ({ id }))}>{(item) => <PickerItem id={item.id}>{item.id}</PickerItem>}</Picker> : null}
              {cap === 'synthesizeSpeech' && selected[cap] ? <TextField label={M.mode.voiceLabel} value={voice} isDisabled={busy || running} onChange={(v) => { setVoice(v); setRuns((r) => ({ ...r, synthesizeSpeech: undefined })); }} /> : null}
              <span className={apiNotice}>{cap === 'transcribe' ? M.mode.asrNote : current?.state === 'verified' ? M.mode.verified : current?.state === 'running' ? M.mode.connecting : M.mode.unverified}</span>
              {current?.state === 'failed' ? <p className={failureText} role="alert">{current.message}</p> : null}
            </div>;
          })}
        </div>
        <p className={apiNotice}>{M.mode.testNote}</p><p className={apiNotice}>{M.mode.limitsNote}</p>
      </>}
      {error ? <p className={failureText} role="alert">{error}</p> : null}
    </Content>
    <Footer><div className={apiStack}><ActionButton isQuiet isDisabled={busy} onPress={onBack}>{M.mode.back}</ActionButton><ActionButton isQuiet isDisabled={busy} onPress={onLater}>{M.mode.later}</ActionButton></div></Footer>
    <ButtonGroup>
      {!ids ? <Button variant="accent" isDisabled={!providerId && !key.trim() || !view} isPending={busy} onPress={() => void connect()}>{providerId ? M.mode.retryDiscovery : M.mode.connect}</Button> : done ? <><Button variant="secondary" onPress={() => onDone(true)}>{M.mode.agent}</Button><Button variant="accent" onPress={() => onDone(false)}>{M.mode.tools}</Button></> : <>
        <Button variant="secondary" isDisabled={busy || running || !TUZI_CAPABILITIES.some((cap) => cap !== 'transcribe' && selected[cap]) || !!selected.synthesizeSpeech && !voice.trim()} onPress={() => void verify()}>{M.mode.verify}</Button>
        <Button variant="accent" isPending={busy || running} isDisabled={busy || running || !Object.keys(usable).length} onPress={() => void save()}>{M.mode.useVerified}</Button>
      </>}
    </ButtonGroup>
  </Dialog></DialogContainer>;
}
