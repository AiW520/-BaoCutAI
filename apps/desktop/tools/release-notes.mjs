// i18n-ignore-file: diagnostics for release tooling, not application UI.
import { readFileSync } from 'node:fs';

/** Public feeds must carry an English fallback and optional localized notes. */
export function validateReleaseNotes(value, identity) {
  if (!value || value.version !== identity.version || value.build !== identity.build) {
    throw new Error('Release notes version/build differs from the package');
  }
  if (typeof value.notes !== 'string' || !value.notes.trim()) {
    throw new Error('Release notes must include non-empty English notes');
  }
  const localized = value.notesLocalized ?? {};
  if (!localized || typeof localized !== 'object' || Array.isArray(localized) ||
      Object.values(localized).some(text => typeof text !== 'string' || !text.trim())) {
    throw new Error('Localized release notes must be non-empty strings');
  }
  return { notes: value.notes.trim(), notesLocalized: localized };
}

export function readReleaseNotes(file, identity) {
  return validateReleaseNotes(JSON.parse(readFileSync(file, 'utf8')), identity);
}
