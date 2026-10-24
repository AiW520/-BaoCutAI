import type { OnboardingMessages } from './onboarding-copy.ts';

export const es: OnboardingMessages = {
  mode: {
    modelConflict: "Elige un modelo distinto para cada función; aquí no se cambian las funciones existentes.",
    intro: "Elige cómo crear",
    lead: "Usa modelos en línea mediante Tuzi API o descárgalos en este equipo. Después puedes usar ambos desde Ajustes.",
    api: "Tuzi API",
    local: "Modelos locales",
    recommended: "Recomendado",
    apiDesc: "Una clave para conectar modelos en línea",
    localDesc: "Descarga y usa el hardware de este equipo",
    apiPoints: "Sin descargar modelos · inicio rápido · cobro por uso de API",
    localPoints: "Procesamiento local · requiere espacio · uso sin conexión",
    apiAction: "Configurar Tuzi API",
    localAction: "Configurar modelos locales",
    later: "Configurar después",
    back: "Atrás",
    connectTitle: "Conectar Tuzi API",
    keyLabel: "Clave API",
    keyPlaceholder: "Pega tu clave de Tuzi API",
    connect: "Conectar y obtener modelos",
    connecting: "Comprobando…",
    notice: "Las claves verificadas se guardan solo en el almacén de credenciales de este equipo, nunca en proyectos ni registros.",
    demoNotice: "Encontrar un modelo no verifica sus funciones. No se descarga nada automáticamente.",
    doneTitle: "Configuración de Tuzi API completada",
    doneBody: (count) => `Se han establecido ${count} funciones probadas como predeterminadas.`,
    tools: "Finalizar y abrir Herramientas",
    agent: "Continuar con el Agent",
    error: (message) => `No se pudo conectar a Tuzi API: ${message}`,
    agentNote: "Ambos modos permiten edición manual y exportación. La edición automática en conversaciones requiere un Agent.",
    discoveryFailed: "No se pudo obtener la lista de modelos. Vuelve a intentarlo.",
    emptyModels: "La cuenta no devolvió modelos. Comprueba sus permisos.",
    modelsTitle: "Elegir y probar funciones de modelos",
    connected: "Cuenta guardada. Puedes volver a obtener los modelos sin añadir otra cuenta.",
    discoveryNote: (count) => `Se encontraron ${count} modelos. Elige modelos y prueba las funciones necesarias.`,
    voiceLabel: "ID de voz",
    asrNote: "El reconocimiento de voz requiere una prueba con vídeo. Aquí no se verifican tiempos por palabra ni hablantes ni se establece el modelo de subtítulos.",
    verified: "Prueba superada",
    unverified: "Sin probar",
    testNote: "Las pruebas envían solicitudes reales y pueden generar cargos: una respuesta breve, una imagen o una muestra de voz. Solo se prueban las funciones seleccionadas. Al continuar se establecen los modelos probados como predeterminados.",
    limitsNote: "La clonación de voz, la música, la búsqueda semántica y la alineación de subtítulos requieren configuración aparte. Los fallos no descargan modelos locales.",
    retryDiscovery: "Volver a obtener modelos",
    verify: "Probar funciones seleccionadas",
    useVerified: "Usar funciones probadas",
  },

  dialogLabel: 'Te damos la bienvenida a Tuzi',
  stepsLabel: 'Pasos de configuración',
  step: {
    agent: 'Conectar un agente',
    asr: 'Reconocimiento de voz',
    tts: 'Síntesis de voz',
    semantic: 'Búsqueda semántica',
    image: 'Generación de imágenes',
    music: 'Generación de música',
  },
  title: {
    agent: 'Te damos la bienvenida a Tuzi',
    asr: 'Descargar modelos de reconocimiento de voz',
    tts: 'Descargar modelos de síntesis de voz',
    semantic: 'Instalar la búsqueda semántica',
    image: 'Descargar modelos de generación de imágenes',
    music: 'Descargar modelos de generación de música',
  },
  lead: {
    agent:
      'Describe el vídeo que quieres y un agente transcribe, añade subtítulos, traduce, dobla y edita por ti. Tuzi usa los agentes de este ordenador (como Claude Code o Codex) con tu propia cuenta, sin coste adicional.',
    asr: 'Transcribir, añadir subtítulos y recortar vídeos de una persona hablando empiezan por convertir la voz en texto. Los modelos se ejecutan en este ordenador y funcionan sin conexión.',
    tts: 'Los modelos de síntesis de voz leen texto en voz alta, clonan una voz a partir de una grabación y doblan vídeos traducidos. Elige uno o dos para empezar; descarga otros más adelante en Ajustes › Síntesis de voz.',
    semantic:
      'Encuentra lo que se dijo y lo que se ve por su significado: lo usan la búsqueda de Space, la elección de material por tema, el emparejamiento de imágenes y la memoria de traducción. Una vez instalada, tus vídeos existentes se indexan en segundo plano.',
    image: 'Genera imágenes a partir de una frase en este ordenador, para portadas e ilustraciones. Los modelos son grandes y la generación es lenta.',
    music:
      'Genera música de fondo y canciones a partir de un estilo o una letra en este ordenador, listas para añadir a la pista de música de un vídeo. La generación es lenta: unos minutos por cada 30 segundos.',
  },
  where: {
    tts: {
      title: 'Úsalo en Herramientas › Generar voz',
      body: 'Escribe un texto, o elige un documento o subtítulos en Space, y luego elige un modelo y una voz. Los modelos que no hayas descargado también se pueden descargar allí.',
    },
    image: { title: 'Úsalo en Herramientas › Generar imagen', body: 'Describe la imagen en una frase. Los agentes también lo usan para crear portadas.' },
    music: {
      title: 'Úsalo en Herramientas › Generar música',
      body: 'Elige un estilo y escribe la letra. La música se guarda en Space y se puede añadir a tus vídeos.',
    },
  },
  diarizes: 'Distingue a los hablantes al transcribir',
  needsDiarization: (pack) => `Para distinguir a los hablantes, descarga también «${pack}»`,
  familyNote: {
    'qwen3-tts-1.7b-customvoice': '9 voces predefinidas · describe un estilo de habla en una frase',
    'qwen3-tts-0.6b-base': 'Clona una voz a partir de una grabación de 3 segundos',
    voxcpm2: 'Clona una voz a partir de una grabación · describe un estilo · 30 idiomas y cantonés',
    'qwen-image-2.1-turbo': 'Destilado · 8 pasos fijos · más del doble de rápido que el modelo base',
    'qwen-image-2.1': 'Modelo base · más lento, más pasos',
    'yue2-3b': 'Genera a partir de un estilo o una letra · unos minutos por cada 30 segundos',
  },
  recommended: 'Recomendado',
  installed: 'Instalado',
  missingParts: 'Faltan componentes',
  planLine: (parts) => `Se descargan juntos: ${parts}`,
  downloading: (name) => `Descargando ${name}`,
  inBackground: 'Descargando en segundo plano',
  bgNote: 'Antes de descargar verás de dónde viene y dónde se guarda. Solo empieza cuando lo confirmes y se ejecuta en segundo plano, así que no tienes que esperar.',
  asrAlt: '¿No quieres descargar nada? También puedes añadir reconocimiento de voz en la nube más adelante en Ajustes › Proveedores de API.',
  unsupported: 'Este ordenador no puede ejecutar estos modelos. Puedes omitir este paso.',
  semanticParts: (text, multimodal) => `${text} + ${multimodal}`,

  agentListLabel: 'Agentes de este ordenador',
  agentChecking: 'Buscando agentes en este ordenador…',
  agentMissingBody: 'Marca los que quieras y Tuzi los instala en segundo plano. Una vez instalados, inicia sesión una vez con tu cuenta.',
  agentNote:
    'Los agentes marcados aparecen en el menú de agentes de las sesiones nuevas. La instalación se hace en segundo plano, así que no tienes que esperar. Elige el predeterminado o añade más en Ajustes › Proveedores de agentes.',
  agentInstalled: 'Instalado en este ordenador',
  agentFix: (problem) => `${problem} · Resuélvelo en Ajustes › Proveedores de agentes`,
  agentManual: 'Instálalo en un terminal siguiendo las instrucciones oficiales · Consulta Ajustes › Proveedores de agentes',
  agentNotInstalled: (plan) => (plan ? `No instalado · Tras instalarlo, inicia sesión con: ${plan}` : 'No instalado'),
  agentWillInstall: (method, command, login) =>
    `Se instalará en segundo plano con ${method} (${command}) · Después, ejecuta ${login} en un terminal para iniciar sesión`,
  agentInstalling: (method, login) => `Instalando en segundo plano con ${method} · Después, ejecuta ${login} en un terminal para iniciar sesión`,
  agentInstallingLabel: (name) => `Instalando ${name}`,
  agentInstallFailed: 'No se pudo instalar · Los detalles están en Tareas en segundo plano',

  next: 'Siguiente',
  finish: 'Listo',
  skip: 'Omitir',
  exit: 'Salir de la configuración',
  install: (n) => `Instalar ${n} en segundo plano y continuar`,
  download: (size, last) => `Descargar${size ? ` ${size}` : ''} en segundo plano y ${last ? 'terminar' : 'continuar'}`,
  bg: {
    one: (kind, name, pct) => {
      const tail = pct === null ? '' : ` ${pct}%`;
      return kind === 'install' ? `Instalando ${name}${tail}` : kind === 'download' ? `Descargando ${name}${tail}` : `Preparando ${name}${tail}`;
    },
    many: (kind, n) =>
      kind === 'install' ? `Instalando ${n} en segundo plano` : kind === 'download' ? `Descargando ${n} en segundo plano` : `Preparando ${n} en segundo plano`,
    idle: (kind) =>
      kind === 'install' ? 'Instalaciones en segundo plano' : kind === 'download' ? 'Descargas en segundo plano' : 'Descargas e instalaciones en segundo plano',
    done: (kind, n) => {
      const one = n === 1;
      return kind === 'install' ? `${n} ${one ? 'instalado' : 'instalados'}` : kind === 'download' ? `${n} ${one ? 'descargado' : 'descargados'}` : `${n} ${one ? 'listo' : 'listos'}`;
    },
    failed: (kind, n) => (kind === 'install' ? `${n} sin instalar` : kind === 'download' ? `${n} sin descargar` : `${n} sin terminar`),
  },
  closedToast: (models, agents) => {
    const parts = [
      ...(models ? [models === 1 ? '1 modelo se está descargando' : `${models} modelos se están descargando`] : []),
      ...(agents ? [agents === 1 ? '1 agente se está instalando' : `${agents} agentes se están instalando`] : []),
    ];
    return `${parts.join(' y ')} en segundo plano. ${models + agents === 1 ? 'Podrás usarlo en cuanto termine.' : 'Podrás usarlos en cuanto terminen.'}`;
  },
  viewTasks: 'Ver tareas en segundo plano',
};
