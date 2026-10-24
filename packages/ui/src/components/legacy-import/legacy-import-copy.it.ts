import { pluralForm } from '@baocut/protocol';
import type { LegacyImportMessages } from './legacy-import-copy.ts';

export const it: LegacyImportMessages = {
  title: 'Importare i progetti di una versione precedente?',
  lead: (n) =>
    pluralForm('it', n, {
      one: `Su questo computer c’è ${n} progetto di una versione precedente di OpenFox. Importalo per continuare a modificarlo in questa versione. I file originali restano dove sono, senza modifiche.`,
      other: `Su questo computer ci sono ${n} progetti di una versione precedente di OpenFox. Importali per continuare a modificarli in questa versione. I file originali restano dove sono, senza modifiche.`,
    }),
  found: 'Progetti trovati',
  destination: 'Importa in',
  resetDefault: 'Usa posizione predefinita',
  change: 'Cambia…',
  pickTitle: 'Scegli dove importare',
  destinationNote: 'Questa cartella compare come progetto in Home e ogni progetto precedente diventa un video al suo interno.',
  hint: 'Se salti, te lo chiederemo di nuovo al prossimo avvio di OpenFox. Seleziona «Non ricordarmelo più» per non importarli mai.',
  never: 'Non ricordarmelo più',
  skip: 'Salta',
  import: 'Importa',
  importing: (n) =>
    pluralForm('it', n, {
      one: `Importazione di ${n} progetto precedente in background`,
      other: `Importazione di ${n} progetti precedenti in background`,
    }),
  neverDone: 'Non ti ricorderemo più di importare i progetti precedenti. I file originali restano come sono.',
  skipped: 'Saltato. Te lo chiederemo di nuovo al prossimo avvio di OpenFox.',
  failed: (message) => `Impossibile importare: ${message}`,
  settingsTitle: "Recupero delle impostazioni di una versione precedente",
  settingsLeadAdopted: "Durante l’aggiornamento è stata adottata la cartella dei modelli precedente. L’installazione verifica i file esistenti con il manifesto attuale e scarica solo quelli mancanti o danneggiati.",
  settingsLeadPreserved: "Le impostazioni e la cartella dei modelli attuali sono state mantenute. Alcune preferenze di trascrizione precedenti non sono state trasferite.",
  settingsDirectory: "Cartella dei modelli adottata durante l’aggiornamento",
  settingsPreferences: "Preferenze da selezionare di nuovo",
  settingsModel: "Il precedente modello di trascrizione predefinito non è stato trasferito. Completa i componenti necessari, poi scegli un modello predefinito nelle impostazioni di riconoscimento vocale.",
  settingsLanguage: "La precedente lingua di riconoscimento non è stata trasferita. In questa versione, scegli la lingua per ogni trascrizione.",
  settingsHint: "Questo rapporto è sempre disponibile in Impostazioni › Riconoscimento vocale. Confermarlo non installa modelli né modifica le preferenze.",
  settingsAcknowledge: "Ho capito",
  settingsOpen: "Apri le impostazioni di riconoscimento vocale",
  settingsNotice: "Seleziona di nuovo le precedenti preferenze di trascrizione.",
  settingsNoticeDetail: "I file dei modelli esistenti possono essere verificati e riutilizzati. Consulta i dettagli e i passaggi successivi.",
  settingsViewReport: "Visualizza il rapporto di recupero",
};
