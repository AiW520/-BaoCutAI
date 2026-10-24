import { pluralForm } from '@baocut/protocol';
import type { LegacyImportMessages } from './legacy-import-copy.ts';

export const nl: LegacyImportMessages = {
  title: 'Projecten uit een eerdere versie importeren?',
  lead: (n) =>
    pluralForm('nl', n, {
      one: `Er staat ${n} project uit een eerdere versie van OpenFox op deze computer. Importeer het om in deze versie verder te bewerken. De originele bestanden blijven ongewijzigd op hun plek.`,
      other: `Er staan ${n} projecten uit een eerdere versie van OpenFox op deze computer. Importeer ze om in deze versie verder te bewerken. De originele bestanden blijven ongewijzigd op hun plek.`,
    }),
  found: 'Gevonden projecten',
  destination: 'Importeren naar',
  resetDefault: 'Standaardlocatie gebruiken',
  change: 'Wijzigen…',
  pickTitle: 'Kies waar je wilt importeren',
  destinationNote: 'Deze map verschijnt als project in Home, en elk eerder project wordt er een video in.',
  hint: 'Als je overslaat, wordt het de volgende keer dat OpenFox start opnieuw gevraagd. Vink ‘Niet meer herinneren’ aan om ze nooit te importeren.',
  never: 'Niet meer herinneren',
  skip: 'Overslaan',
  import: 'Importeren',
  importing: (n) =>
    pluralForm('nl', n, {
      one: `${n} eerder project wordt op de achtergrond geïmporteerd`,
      other: `${n} eerdere projecten worden op de achtergrond geïmporteerd`,
    }),
  neverDone: 'Je wordt niet meer herinnerd om eerdere projecten te importeren. De originele bestanden blijven zoals ze zijn.',
  skipped: 'Overgeslagen. Het wordt de volgende keer dat OpenFox start opnieuw gevraagd.',
  failed: (message) => `Importeren mislukt: ${message}`,
  settingsTitle: "Instellingen overnemen uit een eerdere versie",
  settingsLeadAdopted: "Bij de upgrade is de eerdere modelmap overgenomen. De installatie controleert bestaande bestanden met het huidige manifest en downloadt alleen ontbrekende of beschadigde bestanden.",
  settingsLeadPreserved: "Je huidige instellingen en modelmap zijn behouden. Sommige eerdere transcriptievoorkeuren zijn niet overgenomen.",
  settingsDirectory: "Modelmap die bij de upgrade is overgenomen",
  settingsPreferences: "Voorkeuren om opnieuw te kiezen",
  settingsModel: "Het eerdere standaardmodel voor transcriptie is niet overgenomen. Vul de benodigde onderdelen aan en kies daarna een standaardmodel bij Spraakherkenning.",
  settingsLanguage: "De eerdere herkenningstaal is niet overgenomen. In deze versie kies je de taal voor elke transcriptie.",
  settingsHint: "Je kunt dit rapport altijd bekijken via Instellingen › Spraakherkenning. Bevestigen installeert geen modellen en wijzigt geen voorkeuren.",
  settingsAcknowledge: "Begrepen",
  settingsOpen: "Spraakherkenningsinstellingen bekijken",
  settingsNotice: "Kies de eerdere transcriptievoorkeuren opnieuw.",
  settingsNoticeDetail: "Bestaande modelbestanden kunnen worden gecontroleerd en hergebruikt. Bekijk de details en vervolgstappen.",
  settingsViewReport: "Overnamerapport bekijken",
};
