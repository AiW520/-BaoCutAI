const and = (items: readonly string[]) => new Intl.ListFormat('de', { type: 'conjunction' }).format(items);
const files = (n: number) => pluralForm('de', n, { one: `${n} Datei`, other: `${n} Dateien` });
const KEEP = 'Heruntergeladene Teile bleiben erhalten; der nächste Download setzt an dieser Stelle fort.';
const SOURCE = 'Einstellungen › Allgemein › Downloadquellen';
import { pluralForm } from '@baocut/protocol';
import type { ModelsInstallMessages } from './models-install-copy.ts';

export const de: ModelsInstallMessages = {

  planSize: (size: string) => `Downloadmenge: ${size}`,
  planSizeEstimate: (size: string) => `Etwa ${size} (einige Dateigrößen unbekannt; registrierte Schätzung verwendet)`,
  amountEstimate: (size: string) => `Etwa ${size}`,
  noSpace: (need: string, have: string) =>
    `Nicht genug Speicherplatz: benötigt ${need}; Festplatte mit Modellordner hat nur ${have} frei. Vor Download Speicher freigeben.`,
  resumed: (size: string) => `${size} vom letzten Download wird wiederverwendet, nicht erneut heruntergeladen.`,
  space: (size: string) => `${size} frei auf Festplatte`,
  lineKeep: "Bereits installiert; unverändert",
  lineSize: (size: string, count: number) => `${size} · ${files(count)}`,
  lineUnknown: (count: number) => `Größe unbekannt · ${files(count)}`,

  queued: "Zum Download eingereiht",
  downloading: (amount: string) => `Das Herunterladen von ${amount}`,
  downloadingUnknown: (amount: string) => `Wird heruntergeladen · ${amount} empfangen`,
  verifying: "Wird geprüft und veröffentlicht",
  pausedKept: (amount: string) => `Pausiert · ${amount} erhalten; Fortsetzen beginnt an der letzten Stelle`,
  paused: "Pausiert",


  remedyNoSpace: (need: string | null, have: string | null) =>
    `${need !== null && have !== null ? `Benötigt ${need}; nur ${have} verfügbar. ` : ""}Speicher freigeben und erneut herunterladen. ${KEEP}`,
  remedyNetwork: `Netzwerk prüfen und erneut herunterladen. ${KEEP} Bei nicht erreichbarer Standardquelle einen Spiegelserver wählen unter ${SOURCE}.`,
  remedyIntegrity: `Downloaddateien stimmen in Größe oder sha256 nicht mit Manifest überein; fehlerhafte Dateien gelöscht. Andere Downloadquelle wählen (${SOURCE}), dann erneut herunterladen.`,
  remedySource: (env) => `Downloadquelle enthält Datei nicht oder verweigert Zugriff. Vollständigkeit des Spiegelservers prüfen unter ${SOURCE} (oder ${env}) oder andere Quelle wählen.`,
  remedyManifest: "Im integrierten Manifest fehlt ein vertrauenswürdiger sha256; Installation erst nach OpenFox-Aktualisierung möglich.",
  remedyOffline: "Strikter Offlinemodus aktiv; keine Downloads. Zum Herunterladen zuerst in Einstellungen ausschalten.",
  remedySizeChanged: "Downloadgröße geändert. Neuen Plan erneut bestätigen.",
  remedyInUse:
    "Eine Aufgabe verwendet dieses Modellpaket (Transkription, Synthese, Prüfung oder Installation). Auf Abschluss warten oder unter Hintergrundaufgaben abbrechen, dann erneut löschen.",
  remedyUnavailable:
    "Modellpaket derzeit nicht verwendbar (unvollständig installiert, ausgeschaltet oder auf diesem Computer nicht unterstützt). Zuerst reparieren oder einschalten.",
  remedyInstallFailed: `Erneut herunterladen. ${KEEP}`,

  partFailed: (part) => `${part} wurde nicht heruntergeladen.`,
  partFailedFrom: (part, host) => `${part} wurde nicht von ${host} heruntergeladen.`,
  partKept: 'Bereits heruntergeladene Teile bleiben erhalten; beim Vervollständigen wird nur Fehlendes heruntergeladen. Die Downloadquelle lässt sich vorher wechseln.',
  sentences: (parts) => parts.join(' '),
  problemText: (message: string, remedy: string) => (/[.!?。！？]$/.test(message) ? `${message} ${remedy}` : `${message}. ${remedy}`),


  removalBody: (unknown: boolean, frees: string | null, kept: readonly { repo: string; usedBy: readonly string[] }[]) =>
    [
      unknown ? "Löscht ausschließlich von diesem Modellpaket verwendete Dateien." : frees !== null ? `Gibt etwa frei: ${frees}.` : null,
      ...kept.map((k) => `${k.repo} bleibt erhalten, da ${and(k.usedBy)} weiterhin ${pluralForm('de', k.usedBy.length, { one: "verwendet", other: "verwenden" })} verwendet.`),
      "Zur erneuten Nutzung muss erneut heruntergeladen werden.",
    ]
      .filter(Boolean)
      .join(" "),
  removed: (bundleId: string) => `Gelöscht: ${bundleId}`,
  removedKept: (bundleId: string, repos: readonly string[]) =>
    `Gelöscht: ${bundleId} · ${and(repos)} bleiben erhalten, da andere Modellpakete sie weiterhin verwenden: ${pluralForm('de', repos.length, { one: "sie", other: "sie" })}`,
  noSpaceFolder: (need: string, have: string) =>
    `Nicht genug Speicherplatz: benötigt ${need}; das Laufwerk dieses Ordners hat nur ${have} frei. Speicher freigeben oder einen anderen Ordner wählen.`,
  folder: {
    label: 'Speichern in',
    modelsDirChip: 'Modellordner',
    envChip: 'Umgebungsvariable',
    change: 'Ändern…',
    pickTitle: 'Speicherort für diesen Download wählen',
    reset: 'Modellordner verwenden',
    pickedNote: 'Nur für diesen Download; der Modellordner bleibt unverändert.',
    toolsNote: 'Tools und Laufzeiten kommen in den Tool-Ordner von OpenFox, nicht hierher.',
    envNote: 'Der Modellordner ist durch die Umgebungsvariable BAOCUT_MODELS_DIR festgelegt; Downloads landen dort.',
    fixedNote: 'Der pausierte Download wird in dem Ordner fortgesetzt, in dem er begonnen hat.',
    missingTitle: 'Dieser Ordner wurde nicht gefunden',
    missingText: 'Dieser Ordner existiert nicht. Das passiert auch, wenn ein externes Laufwerk nicht verbunden ist; verbinde es oder wähle einen anderen Ordner.',
    notWritableTitle: 'Dieser Ordner ist nicht beschreibbar',
    notWritableText: 'OpenFox darf in diesen Ordner nicht schreiben. Wähle einen anderen Ordner oder ändere zuerst seine Berechtigungen.',
  },
  storedAt: (path: string) => `Gespeichert in ${path} · außerhalb des Modellordners`,
};
