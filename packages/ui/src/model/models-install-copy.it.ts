import type { ModelsInstallMessages } from './models-install-copy.ts';
import { pluralForm } from '@baocut/protocol';

const KEEP = 'Ciò che è già stato scaricato viene conservato e il prossimo download riprende da dove si è fermato.';
const SOURCE = 'Impostazioni › Generali › Origini del download';
const and = (items: readonly string[]) => new Intl.ListFormat('it', { type: 'conjunction' }).format(items);
const files = (n: number) => `${n} file`;

export const it: ModelsInstallMessages = {
  planSize: (size: string) => `Download di ${size}`, planSizeEstimate: (size: string) => `Circa ${size} (alcune dimensioni dei file sono sconosciute, quindi viene usata la stima registrata)`, amountEstimate: (size: string) => `Circa ${size}`,
  noSpace: (need: string, have: string) => `Spazio su disco insufficiente: richiede ${need} e il disco con la cartella dei modelli ha solo ${have} disponibili. Libera spazio prima del download.`,
  resumed: (size: string) => `${size} scaricati in precedenza vengono riutilizzati, senza scaricarli di nuovo.`, space: (size: string) => `${size} liberi su disco`, lineKeep: 'Già installato, lasciato invariato',
  lineSize: (size: string, count: number) => `${size} · ${files(count)}`, lineUnknown: (count: number) => `Dimensione sconosciuta · ${files(count)}`,
  queued: 'In coda per il download', downloading: (amount: string) => `Download di ${amount}`, downloadingUnknown: (amount: string) => `Download · ricevuti ${amount}`, verifying: 'Verifica e pubblicazione',
  pausedKept: (amount: string) => `In pausa · ${amount} conservati; riprendendo continua da dove si è fermato`, paused: 'In pausa',
  remedyNoSpace: (need: string | null, have: string | null) => `${need !== null && have !== null ? `Richiede ${need} e rimangono solo ${have}. ` : ''}Libera spazio su disco, poi scarica di nuovo. ${KEEP}`,
  remedyNetwork: `Controlla la rete, poi scarica di nuovo. ${KEEP} Se l’origine predefinita non è raggiungibile, passa a un mirror in ${SOURCE}.`,
  remedyIntegrity: `I file dell’origine del download non corrispondono alla dimensione o al valore sha256 del manifesto e i file non validi sono stati eliminati. Passa a un’altra origine del download (${SOURCE}), poi scarica di nuovo.`,
  remedySource: (env) => `L’origine del download non ha questo file o ha negato l’accesso. Verifica che il mirror impostato in ${SOURCE} (o nella variabile d’ambiente ${env}) sia completo, oppure passa a un’altra origine.`,
  remedyManifest: 'Il manifesto integrato di questo pacchetto di modelli non ha un sha256 attendibile, quindi non può essere installato finché OpenFox non viene aggiornato.',
  remedyOffline: 'La modalità rigorosamente offline è attiva, quindi non viene scaricato nulla. Per scaricare, disattivala prima nelle Impostazioni.',
  remedySizeChanged: 'La dimensione del download è cambiata. Conferma di nuovo con il nuovo piano.',
  remedyInUse: 'Un’attività sta usando questo pacchetto di modelli (trascrizione, sintesi, verifica o installazione). Attendi il completamento o annullala in «Attività in background», poi prova a eliminare di nuovo.',
  remedyUnavailable: 'Il pacchetto di modelli non è utilizzabile al momento (installazione incompleta, disattivato o non supportato su questo computer). Riparalo o riattivalo prima.', remedyInstallFailed: `Prova a scaricare di nuovo. ${KEEP}`,
  partFailed: (part) => `${part} non è stato scaricato.`,
  partFailedFrom: (part, host) => `${part} non è stato scaricato da ${host}.`,
  partKept: 'Le parti già scaricate vengono conservate, quindi il completamento scarica solo ciò che manca. Puoi prima cambiare l’origine del download.',
  sentences: (parts) => parts.join(' '),
  problemText: (message: string, remedy: string) => /[.!?。！？]$/.test(message) ? `${message} ${remedy}` : `${message}. ${remedy}`,
  removalBody: (unknown: boolean, frees: string | null, kept: readonly { repo: string; usedBy: readonly string[] }[]) => [ unknown ? 'Elimina i file usati solo da questo pacchetto di modelli.' : frees !== null ? `Libera circa ${frees}.` : null, ...kept.map((k) => `${k.repo} viene conservato perché ${and(k.usedBy)} ${pluralForm('it', k.usedBy.length, { one: 'lo usa', other: 'lo usano' })} ancora.`), 'Per usarlo di nuovo, dovrai scaricarlo di nuovo.' ].filter(Boolean).join(' '),
  removed: (bundleId: string) => `Eliminato: ${bundleId}`,
  removedKept: (bundleId: string, repos: readonly string[]) => `Eliminato: ${bundleId} · ${pluralForm('it', repos.length, { one: `${and(repos)} conservato perché altri pacchetti di modelli lo usano ancora`, other: `${and(repos)} conservati perché altri pacchetti di modelli li usano ancora` })}`,
  noSpaceFolder: (need: string, have: string) => `Spazio su disco insufficiente: richiede ${need} e il disco di questa cartella ha solo ${have} disponibili. Libera spazio o scegli un’altra cartella.`,
  folder: {
    label: 'Salva in',
    modelsDirChip: 'Cartella dei modelli',
    envChip: 'Variabile d’ambiente',
    change: 'Cambia…',
    pickTitle: 'Scegli dove salvare questo download',
    reset: 'Usa la cartella dei modelli',
    pickedNote: 'Solo per questo download; la cartella dei modelli non cambia.',
    toolsNote: 'Strumenti e runtime vanno nella cartella degli strumenti di OpenFox, non qui.',
    envNote: 'La cartella dei modelli è impostata dalla variabile d’ambiente BAOCUT_MODELS_DIR, quindi i download vanno lì.',
    fixedNote: 'Il download in pausa riprende nella cartella in cui è iniziato.',
    missingTitle: 'Impossibile trovare questa cartella',
    missingText: 'Questa cartella non esiste. Accade anche quando un’unità esterna non è collegata; collegala o scegli un’altra cartella.',
    notWritableTitle: 'Questa cartella non è scrivibile',
    notWritableText: 'OpenFox non ha il permesso di scrivere in questa cartella. Scegli un’altra cartella o cambia prima i suoi permessi.',
  },
  storedAt: (path: string) => `Salvato in ${path} · fuori dalla cartella dei modelli`,
};
