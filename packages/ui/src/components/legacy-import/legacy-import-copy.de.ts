import { pluralForm } from '@baocut/protocol';
import type { LegacyImportMessages } from './legacy-import-copy.ts';

export const de: LegacyImportMessages = {
  title: 'Projekte aus einer früheren Version importieren?',
  lead: (n) =>
    pluralForm('de', n, {
      one: `Auf diesem Computer gibt es ${n} Projekt aus einer früheren Version von OpenFox. Importieren Sie es, um es in dieser Version weiter zu bearbeiten. Die Originaldateien bleiben unverändert an ihrem Ort.`,
      other: `Auf diesem Computer gibt es ${n} Projekte aus einer früheren Version von OpenFox. Importieren Sie sie, um sie in dieser Version weiter zu bearbeiten. Die Originaldateien bleiben unverändert an ihrem Ort.`,
    }),
  found: 'Gefundene Projekte',
  destination: 'Importieren nach',
  resetDefault: 'Standardort verwenden',
  change: 'Ändern…',
  pickTitle: 'Importziel auswählen',
  destinationNote: 'Dieser Ordner erscheint als Projekt in Home, jedes frühere Projekt wird darin zu einem Video.',
  hint: 'Wenn Sie überspringen, werden Sie beim nächsten Start von OpenFox erneut gefragt. Aktivieren Sie „Nicht mehr erinnern“, um sie nie zu importieren.',
  never: 'Nicht mehr erinnern',
  skip: 'Überspringen',
  import: 'Importieren',
  importing: (n) =>
    pluralForm('de', n, {
      one: `${n} früheres Projekt wird im Hintergrund importiert`,
      other: `${n} frühere Projekte werden im Hintergrund importiert`,
    }),
  neverDone: 'Sie werden nicht mehr an den Import früherer Projekte erinnert. Die Originaldateien bleiben unverändert.',
  skipped: 'Übersprungen. Sie werden beim nächsten Start von OpenFox erneut gefragt.',
  failed: (message) => `Import fehlgeschlagen: ${message}`,
  settingsTitle: "Übernahme von Einstellungen einer früheren Version",
  settingsLeadAdopted: "Bei der Aktualisierung wurde der bisherige Modellordner übernommen. Die Installation prüft vorhandene Dateien anhand des aktuellen Manifests und lädt nur fehlende oder beschädigte Dateien herunter.",
  settingsLeadPreserved: "Deine aktuellen Einstellungen und dein Modellordner wurden beibehalten. Einige frühere Transkriptionseinstellungen wurden nicht übernommen.",
  settingsDirectory: "Bei der Aktualisierung übernommener Modellordner",
  settingsPreferences: "Erneut auszuwählende Einstellungen",
  settingsModel: "Das frühere Standardmodell für die Transkription wurde nicht übernommen. Ergänze erforderliche Komponenten und wähle dann in den Spracherkennungseinstellungen ein Standardmodell.",
  settingsLanguage: "Die frühere Erkennungssprache wurde nicht übernommen. In dieser Version wählst du die Sprache für jede Transkription.",
  settingsHint: "Du kannst diesen Bericht jederzeit unter Einstellungen › Spracherkennung ansehen. Die Bestätigung installiert keine Modelle und ändert keine Einstellungen.",
  settingsAcknowledge: "Verstanden",
  settingsOpen: "Spracherkennungseinstellungen öffnen",
  settingsNotice: "Frühere Transkriptionseinstellungen müssen erneut ausgewählt werden.",
  settingsNoticeDetail: "Vorhandene Modelldateien können geprüft und wiederverwendet werden. Sieh dir die Übernahme und die nächsten Schritte an.",
  settingsViewReport: "Übernahmebericht ansehen",
};
