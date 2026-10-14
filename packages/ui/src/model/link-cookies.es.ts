import type { LinkCookiesMessages } from './link-cookies.ts';
import { pluralForm } from '@baocut/protocol';
const andEs = (names: readonly string[]) => new Intl.ListFormat('es', { type: 'conjunction' }).format(names);
export const es: LinkCookiesMessages = {
  chromeStoreMissing: "No se encontró un almacén de cookies de Chrome. Para usar el inicio de sesión de Chrome, inicia sesión en el sitio en Chrome y detecta los navegadores de nuevo.",
  macAccessDenied: (names) => `BaoCut no tiene permiso para acceder a los datos de ${names.join(', ')}. En el ordenador donde se ejecuta BaoCut, abre Ajustes del Sistema › Privacidad y seguridad › Acceso total al disco, añade y activa BaoCut. Cierra BaoCut por completo, vuelve a abrirlo y detecta los navegadores de nuevo.`,
  accessDenied: (names) => `BaoCut no tiene permiso para acceder a los datos de ${names.join(', ')}. En el ordenador donde se ejecuta BaoCut, permite que acceda a las carpetas de datos de estos navegadores y detecta los navegadores de nuevo.`,
 noneChecked: 'Déjalos todos sin marcar para descargar de forma anónima. Si el sitio pide que inicies sesión o verifiques tu identidad, inicia sesión en él desde un navegador y después marca ese navegador.',
 oneChecked: (name) => `Usa las cookies de ${name} para acceder al sitio.`,
 manyChecked: (names) => `Prueba ${names.join(' → ')} en ese orden: si no se pueden leer las cookies de un navegador o el sitio sigue pidiendo iniciar sesión, pasa al siguiente y se detiene en el primero que funciona. El resultado indica cuál se usó.`,
 privacy: 'Solo se leen los navegadores que marcas. yt-dlp lee las cookies en este ordenador y las usa solo para acceder al sitio; BaoCut recuerda únicamente los nombres de los navegadores, nunca las cookies.',
 keychain: (names) => `macOS pedirá acceso al Llavero una vez para ${names.length > 1 ? `cada uno de ${andEs(names)}` : names[0]}. Elige «Permitir siempre» y no volverá a pedirlo.`,
 safariAccess: 'Para leer las cookies de Safari, primero permite BaoCut en Ajustes del Sistema › Privacidad y seguridad › Acceso total al disco.',
 chromiumLocked: (names) => names.length > 1
 ? `Mientras ${andEs(names)} estén abiertos, sus bases de datos de cookies están bloqueadas y no se pueden leer. Cierra estos navegadores por completo antes de descargar, incluidos los que se ejecuten en segundo plano.`
 : `Mientras ${names[0]} esté abierto, su base de datos de cookies está bloqueada y no se puede leer. Cierra este navegador por completo antes de descargar, aunque se esté ejecutando en segundo plano.`,
 appBound: (names) => `En Windows, ${andEs(names)} ${pluralForm('es', names.length, { one: 'suele proteger', other: 'suelen proteger' })} las cookies con App-Bound Encryption, que yt-dlp puede no poder leer incluso después de cerrar el navegador.`,
 firefoxTip: ' Si necesitas iniciar sesión, inicia sesión en el sitio desde Firefox y marca Firefox en su lugar.',
 noBrowsers: 'No se encontraron cookies de navegador en este ordenador, por lo que las descargas solo pueden ser anónimas. Después de iniciar sesión en el sitio desde un navegador, haz clic en «Detectar navegadores de nuevo».',
 anonymous: 'Desactivado (descarga anónima)',
 subOne: (name: string) => `Usa las cookies de ${name}`,
 subMany: (names: readonly string[]) => `Prueba por turnos las cookies de ${names.join(', ')}`,
 summary: (text: string) => `Inicio de sesión en sitios web: ${text}`,
 used: (name) => `Se usaron las cookies de ${name}`,
};
