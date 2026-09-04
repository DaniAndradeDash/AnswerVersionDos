// ============================================
// Aviso de Privacidad — Contenido editable
// ============================================
//
// Este archivo es la FUENTE ÚNICA del texto legal que se renderiza
// en /aviso-privacidad (src/app/aviso-privacidad/page.tsx:12).
// Edita los campos `content` aquí y ejecuta `npm run build` para publicar.
//
// Última actualización sincronizada con PRIVACY_LAST_UPDATED
// Banner recuerda consentimiento en localStorage clave `answer-st-privacy-consent`
// versión `2026-09-v1` (src/components/layout/PrivacyBanner.tsx:6)
// ============================================

export const PRIVACY_LAST_UPDATED = '04 de septiembre de 2026'

export type PrivacySection = {
  id: string
  title: string
  content: string
}

export const privacySections: PrivacySection[] = [
  {
    id: 'introduccion',
    title: 'Introducción',
    content: `En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y los Lineamientos del Aviso de Privacidad emitidos por la autoridad en México (INAI), así como en apego a los principios de licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad, se pone a disposición el presente Aviso de Privacidad Integral.`,
  },
  {
    id: 'responsable',
    title: '1. Datos del Responsable de la Protección de Datos Personales',
    content: `Answer ST (en lo sucesivo, "El Responsable"), con domicilio en Monterrey, Nuevo León, México, es el responsable del tratamiento y protección de sus datos personales.\n\nRazón Social / Nombre del Responsable: Answer ST (Persona Física con Actividad Empresarial o Persona Moral registrada en México; completar con la denominación social oficial y RFC para producción).\n\nDomicilio: Monterrey, Nuevo León, México, C.P. [Insertar Código Postal y Colonia].\n\nCorreo de Contacto y Privacidad: contacto@answerst.com\n\nTeléfono de Atención: +52 81 8686 3395`,
  },
  {
    id: 'datos-recabados',
    title: '2. Datos Personales que Recabamos',
    content: `Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, podemos recabar los siguientes datos personales:\n\n1. Datos de identificación y contacto:\n• Nombre completo\n• Correo electrónico\n• Teléfono de contacto\n• Nombre de la empresa u organización\n• Mensaje, consulta o descripción del requerimiento de consultoría (conforme a los campos definidos en el formulario de contacto)\n\n2. Datos de navegación e interacción digital:\n• Registros de aceptación de políticas e interacciones en la plataforma web mediante almacenamiento local (localStorage).\n• Datos técnicos mínimos de conexión (dirección IP, tipo de navegador y sistema operativo) recabados de forma automática con fines de seguridad e infraestructura.\n\nNota: Answer ST no solicita ni da tratamiento a datos personales sensibles (tales como origen étnico, estado de salud, información genética, creencias religiosas, afiliación sindical, opiniones políticas o preferencia sexual) a través del sitio web.`,
  },
  {
    id: 'formas-obtencion',
    title: '3. Formas de Obtención de los Datos Personales',
    content: `Recabamos sus datos personales de las siguientes formas:\n\n• Directa (Sitio Web y Canales Digitales): Cuando usted mismo los proporciona a través del formulario de contacto del sitio web (#contacto), mediante enlaces directos a canales oficiales como WhatsApp, Facebook, o el envío de correos electrónicos a contacto@answerst.com.\n\n• Presencial o Telefónica: Cuando se pone en contacto vía telefónica (+52 81 8686 3395), reuniones presenciales o videoconferencias de asesoría y seguimiento comercial.`,
  },
  {
    id: 'finalidades',
    title: '4. Finalidades del Tratamiento de los Datos Personales',
    content: `Los datos personales recabados serán utilizados para las siguientes finalidades:\n\nA. Finalidades Primarias (Necesarias para la prestación del servicio):\n• Gestionar, atender y responder a sus solicitudes de información, cotizaciones y consultas de consultoría especializada.\n• Evaluar el tipo de asesoría, orientación o innovación que su empresa requiere.\n• Establecer la relación comercial, prestar los servicios de consultoría contratados y realizar el seguimiento correspondiente.\n• Elaboración de propuestas comerciales, cotizaciones y facturación derivada de los servicios prestados.\n\nB. Finalidades Secundarias (Opcionales / Marketing y Prospección):\n• Envío de boletines informativos (newsletters), artículos de blog, novedades y tendencias en consultoría.\n• Invitación a webinars, eventos y prospección comercial sobre nuevos servicios de Answer ST.\n\nSi usted no desea que sus datos personales sean tratados para las finalidades secundarias, puede manifestar su negativa enviando un correo electrónico a contacto@answerst.com indicando en el asunto: "Negativa para Finalidades Secundarias".`,
  },
  {
    id: 'fundamento',
    title: '5. Fundamento Legal para el Tratamiento',
    content: `El tratamiento de sus datos personales se realiza con fundamento en los artículos 6, 7, 8, 12, 15, 16 y demás aplicables de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México, sustentado en el consentimiento expreso y/o tácito otorgado por el titular al enviar sus datos mediante los formularios del sitio o establecer comunicación directa con el Responsable.`,
  },
  {
    id: 'transferencias',
    title: '6. Transferencia de Datos Personales a Terceros',
    content: `Answer ST no vende, alquila ni comercializa sus datos personales a terceros.\n\n• Encargados de Infraestructura y Servicios: Sus datos únicamente podrán ser compartidos con proveedores de servicios de infraestructura tecnológica encargados de la operación del sitio web y gestión de comunicaciones (tales como servicios de hosting en Neubox, proveedores de correo/SMTP Mailtrap, o herramientas de gestión como Dash Systems y Facebook Meta para integración de chats), quienes actúan en calidad de Encargados bajo estrictos acuerdos de confidencialidad y protección de datos.\n\n• Excepciones de Ley: Únicamente se realizarán transferencias a autoridades competentes cuando sea requerido por ley o mandamiento judicial en términos del Artículo 37 de la LFPDPPP.`,
  },
  {
    id: 'derechos-arco',
    title: '7. Procedimiento para Ejercer los Derechos ARCO y Revocación del Consentimiento',
    content: `Como titular de los datos personales, usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse (Derechos ARCO) al tratamiento de sus datos, así como a Revocar el consentimiento previamente otorgado.\n\nRequisitos de la Solicitud:\nPara ejercer sus derechos, deberá enviar una solicitud por escrito al correo electrónico contacto@answerst.com con el asunto "Ejercicio de Derechos ARCO", adjuntando la siguiente información:\n\n1. Nombre completo del titular y correo electrónico para recibir la notificación de la respuesta.\n2. Documento oficial que acredite su identidad (copia de INE, Pasaporte u otra identificación oficial) o, en su caso, la representación legal.\n3. Descripción clara y precisa de los datos personales respecto de los cuales busca ejercer alguno de los derechos ARCO y el derecho específico a ejercer.\n4. Cualquier otro elemento o documento que facilite la localización de sus datos personales.\n\nTiempos de Respuesta y Ejecución:\n• Plazo de Respuesta: Answer ST le comunicará en un plazo máximo de 20 (veinte) días hábiles, contados desde la fecha de recepción de la solicitud, la determinación adoptada.\n• Plazo de Ejecución: Si la solicitud resulta procedente, se hará efectiva dentro de los 15 (quince) días hábiles siguientes a la fecha en que se le comunique la respuesta.`,
  },
  {
    id: 'limitar-uso',
    title: '8. Opciones y Medios para Limitar el Uso o Divulgación de sus Datos',
    content: `Usted puede limitar el uso o divulgación de sus datos personales para evitar recibir información publicitaria de nuestros servicios mediante:\n\n• El envío de un correo a contacto@answerst.com solicitando su inclusión en nuestra Lista de Exclusión Interna.\n\n• Su inscripción en el REPEP (Registro Público para Evitar Publicidad) de la PROFECO para evitar llamadas o correos publicitarios no solicitados en México.`,
  },
  {
    id: 'cookies',
    title: '9. Uso de Cookies y Tecnologías de Rastreo',
    content: `El sitio web answerst.com utiliza tecnologías de almacenamiento local para mejorar la experiencia del usuario e interactuar de forma técnica con la plataforma:\n\n• Almacenamiento Local (localStorage): Se utiliza la clave answer-st-privacy-consent (versión 2026-09-v1) con la única finalidad de almacenar la aceptación del aviso de privacidad y prevenir la reaparición continua del banner de consentimiento.\n\n• Herramientas de Analítica y Rastreo: En caso de integrar analíticas de tráfico (como Google Analytics, Píxel de Facebook u otros rastreadores), las interacciones se procesarán de forma agregada e impersonal. El usuario puede borrar o deshabilitar estas tecnologías de almacenamiento directamente desde la configuración de su navegador web.`,
  },
  {
    id: 'usuarios-extranjeros',
    title: '10. Cumplimiento para Usuarios Extranjeros / Internacionales',
    content: `Si usted accede a answerst.com desde fuera de la República Mexicana (por ejemplo, desde la Unión Europea bajo el Reglamento General de Protección de Datos - RGPD, o los Estados Unidos bajo leyes estatales de privacidad como CCPA/CPRA):\n\n1. Ubicación del Procesamiento: Sus datos personales serán procesados y almacenados en servidores de infraestructura localizados en México o contratados con proveedores internacionales bajo estrictos estándares de seguridad y cifrado.\n\n2. Derechos Extranjeros: Reconocemos los derechos de acceso, supresión ("derecho al olvido"), restricción del tratamiento, portabilidad de datos y revocación del consentimiento en igualdad de condiciones a los Derechos ARCO señalados en la sección 7.\n\n3. Consentimiento Internacional: Al enviar información en nuestro sitio web o interactuar mediante nuestros canales, usted consiente explícitamente la transferencia transfronteriza de sus datos requerida para responder sus consultas.`,
  },
  {
    id: 'modificaciones',
    title: '11. Modificaciones y Actualizaciones al Aviso de Privacidad',
    content: `Answer ST se reserva el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente Aviso de Privacidad para la atención de reformas legislativas, políticas internas o nuevos requerimientos operativos en los servicios de consultoría.\n\nLas modificaciones estarán disponibles de manera continua en la sección dedicada del sitio web: https://answerst.com/aviso-privacidad/\n\nLa versión vigente corresponderá a la fecha establecida en la constante de configuración PRIVACY_LAST_UPDATED ubicada en src/constants/privacy.ts:12.`,
  },
  {
    id: 'actualizacion',
    title: '12. Fecha de Última Actualización',
    content: `04 de septiembre de 2026`,
  },
]

export const privacyContact = {
  responsable: 'Answer ST',
  domicilio: 'Monterrey, Nuevo León, México, C.P. [Insertar Código Postal y Colonia]',
  email: 'contacto@answerst.com',
  telefono: '81 8686 3395',
}
