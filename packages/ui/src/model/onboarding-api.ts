import type { DeclaredModel, ModelCapabilitiesView, OnlineCapability, ProviderCapabilities } from '@baocut/protocol';
import type { RuntimeSession } from '../runtime/session.ts';
import { M } from './onboarding-copy.ts';
import { customProviderId, declaredModels, endpointOwner, knownProviderIds } from './models-cloud.ts';

export const TUZI_ENDPOINT = 'https://api.tu-zi.com/v1';
export const TUZI_CAPABILITIES = ['generateText', 'generateImage', 'synthesizeSpeech', 'transcribe'] as const;
export type TuziSelection = Partial<Record<OnlineCapability, string>>;
export interface TuziVerification { modelId: string; state: 'verified' | 'failed' | 'running'; message?: string; jobId?: string }
type Session = Pick<RuntimeSession, 'configureModelProvider' | 'addModelAccount' | 'arrangeModelAccounts' | 'setModelDefault'>;

/** Verify before saving; reuse only the exact endpoint and preserve all existing declarations. */
export async function connectTuzi(session: Session, view: ModelCapabilitiesView, credential: string): Promise<string> {
  const owner = endpointOwner(view, TUZI_ENDPOINT);
  if (!owner) {
    const providerId = customProviderId('Tuzi', TUZI_ENDPOINT, knownProviderIds(view));
    await session.configureModelProvider({ providerId, label: 'Tuzi API', endpoint: TUZI_ENDPOINT, models: [], enabled: true, credential, verify: true });
    return providerId;
  }
  const provider = await session.addModelAccount({ providerId: owner.providerId, credential, endpoint: TUZI_ENDPOINT, verify: true });
  const accounts = provider.config?.accounts ?? [];
  const added = accounts.at(-1);
  if (added) await session.arrangeModelAccounts(owner.providerId, [added.accountId, ...accounts.slice(0, -1).map((a) => a.accountId)]);
  await session.configureModelProvider({ providerId: owner.providerId, enabled: true });
  return owner.providerId;
}

/** Suggestions are intersected with the actual discovery response. They are never verification. */
export function suggestedTuziModels(ids: readonly string[]): TuziSelection {
  const suggestions = { generateText: 'gpt-4o-mini', generateImage: 'gpt-image-2', synthesizeSpeech: 'tts-1', transcribe: 'whisper-1' } as const;
  return Object.fromEntries(TUZI_CAPABILITIES.filter((cap) => ids.includes(suggestions[cap])).map((cap) => [cap, suggestions[cap]]));
}

/** Declarations are merged; selecting the same ID for two capabilities is rejected. */
export async function declareTuziModels(session: Session, view: ModelCapabilitiesView, providerId: string, selected: TuziSelection): Promise<ProviderCapabilities> {
  const picks = Object.entries(selected).filter(([, id]) => !!id) as [OnlineCapability, string][];
  const ids = picks.map(([, id]) => id);
  if (new Set(ids).size !== ids.length) throw new Error(M.mode.modelConflict);
  const old = declaredModels(view, providerId);
  for (const [cap, id] of picks) {
    if (old.some((m) => m.modelId === id && m.capability !== cap)) throw new Error(M.mode.modelConflict);
  }
  const additions: DeclaredModel[] = picks.filter(([, id]) => !old.some((m) => m.modelId === id)).map(([capability, modelId]) => ({
    capability, modelId, ...(capability === 'synthesizeSpeech' ? { voices: ['alloy'] } : {}),
    ...(capability === 'transcribe' ? { wordTimestamps: 'none' as const } : {}),
  }));
  if (additions.length) return (await session.configureModelProvider({ providerId, models: [...old, ...additions] })).capabilities;
  return Object.fromEntries(TUZI_CAPABILITIES.map((cap) => [cap, view[cap].providers.find((p) => p.providerId === providerId)]));
}

/** ASR requires a video asset and separate timestamp testing; never set it by a connection check. */
export function verifiedTuziModels(selected: TuziSelection, results: Partial<Record<OnlineCapability, TuziVerification>>): TuziSelection {
  return Object.fromEntries(TUZI_CAPABILITIES.filter((cap) => cap !== 'transcribe' && selected[cap] && results[cap]?.state === 'verified'
    && results[cap]?.modelId === selected[cap]).map((cap) => [cap, selected[cap]]));
}

/** Persist only the models the user explicitly tested and chose; retry skips already saved defaults. */
export async function saveTuziDefaults(session: Session, providerId: string, selected: TuziSelection, results: Partial<Record<OnlineCapability, TuziVerification>>, saved: Set<string>): Promise<void> {
  for (const [cap, id] of Object.entries(verifiedTuziModels(selected, results))) {
    const key = `${cap}/${id}`;
    if (saved.has(key)) continue;
    await session.setModelDefault(cap as OnlineCapability, providerId, id);
    saved.add(key);
  }
}
