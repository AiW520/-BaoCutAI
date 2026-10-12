import type { GeneralSettingsModelMessages } from './general-settings.ts';

export const pl: GeneralSettingsModelMessages = {
  lineShort: "Krótko",
  lineMedium: "Średnio",
  lineLong: "Długo",
  lineLength: (cjk: number, other: number) => `Tekst CJK: ${cjk} znaków na wiersz · Inny tekst: ${other} znaków na wiersz`,
  endpointTooLong: (max: number) => `Za długie: najwyżej ${max} znaków`,
  endpointNotUrl: "To nie adres internetowy: musi zaczynać się od http:// lub https://",
  endpointScheme: "Obsługiwane są tylko adresy zaczynające się od http:// lub https://",
  endpointCredentials: "Adres nie może zawierać nazwy użytkownika ani hasła",
  endpointQuery: "Adres nie może zawierać parametrów zapytania (części po ?)",
  endpointHash: "Adres nie może zawierać fragmentu (części po #)",
  saveDir: {
    label: "Domyślna lokalizacja zapisu",
    desc: "Tutaj są zapisywane wyniki narzędzi, pobrane wideo i pliki przekazane przez agenta. Domyślnie jest to folder „Pobrane”.",
    systemDefault: "Folder „Pobrane”",
    isDefault: "Domyślny",
    change: "Zmień…",
    reset: "Przywróć domyślne",
    pickTitle: "Wybierz domyślną lokalizację zapisu",
    changed: "Domyślna lokalizacja zapisu zmieniona",
    resetDone: "Przywrócono folder „Pobrane”",
    pickFailed: (message: string) => `Nie udało się wybrać folderu: ${message}`,
    webNote: "Przeglądarka nie może wybrać folderu na tym komputerze. Ustaw w aplikacji komputerowej BaoCut.",
  },
};
