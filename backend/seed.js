const mongoose = require('mongoose');
const News = require('./models/News');
const Event = require('./models/Event');
const Bulletin = require('./models/Bulletin');
const TrendingTopic = require('./models/TrendingTopic');

const URI = 'mongodb://localhost:27017/notiControlDB';

const news = [
  {
    title: 'Facultad de Negocios Campus IV lanza programa de intercambio empresarial internacional',
    content:
      'La Facultad de Negocios Campus IV de la UNACH anuncia una nueva alianza con universidades de España, Estados Unidos y Canadá para el ciclo 2026. Los estudiantes de Contaduría y Sistemas podrán acceder a becas completas durante un semestre académico. El programa incluye prácticas en empresas internacionales y cursos de especialización. Las inscripciones estarán abiertas a partir del próximo mes.',
    imageUrl:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop',
    category: 'Internacional',
    featured: true,
  },
  {
    title: 'Foro Regional de Negocios y Emprendimiento reunirá a empresarios de la frontera sur',
    content:
      'El próximo mes de mayo se llevará a cabo el IV Foro Regional de Negocios organizado por la Facultad de Negocios Campus IV UNACH. El evento contará con la participación de más de 40 empresarios y emprendedores de Chiapas, Tabasco y Guatemala. Los temas centrales serán finanzas digitales, emprendimiento sustentable y transformación digital de las PyMEs.',
    imageUrl:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop',
    category: 'Académico',
    featured: true,
  },
  {
    title: 'Nuevo laboratorio de cómputo equipado con tecnología de vanguardia',
    content:
      'La Facultad de Negocios Campus IV inauguró su nuevo laboratorio de sistemas con 40 estaciones de trabajo de alto rendimiento. El espacio cuenta con software especializado en contabilidad, ERP empresarial, bases de datos y desarrollo de software. Los estudiantes tendrán acceso a licencias de SAP, Oracle y Microsoft Azure para su formación profesional.',
    imageUrl:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1464&auto=format&fit=crop',
    category: 'Infraestructura',
    featured: false,
  },
  {
    title: 'Estudiantes de Contaduría ganan primer lugar en olimpiada nacional de finanzas',
    content:
      'El equipo representativo de la Facultad de Negocios Campus IV obtuvo el primer lugar en la Olimpiada Nacional de Finanzas celebrada en la Ciudad de México. Los tres estudiantes destacaron en las categorías de análisis financiero, contabilidad fiscal y auditoría. Este logro posiciona a la UNACH Campus IV como referente nacional en la enseñanza de la contaduría.',
    imageUrl:
      'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1528&auto=format&fit=crop',
    category: 'Logros',
    featured: false,
  },
  {
    title: 'Apertura del Centro de Certificación Microsoft en la Facultad de Negocios',
    content:
      'A partir de este semestre, los estudiantes y público en general podrán realizar exámenes de certificación Microsoft (Azure, Office 365, Power BI y Dynamics 365) directamente en las instalaciones de la Facultad de Negocios Campus IV. El Centro estará disponible con cuatro convocatorias anuales, fortaleciendo el perfil tecnológico de los egresados.',
    imageUrl:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop',
    category: 'Certificaciones',
    featured: false,
  },
  {
    title: 'Semana del Emprendedor celebra la innovación y la cultura empresarial',
    content:
      'Del 20 al 24 de abril se llevará a cabo la Semana del Emprendedor con talleres, exposiciones de proyectos y conferencias magistrales. Las actividades son abiertas al público y gratuitas. Se presentarán más de 20 proyectos empresariales de estudiantes de Contaduría y Sistemas Computacionales, con posibilidad de obtener financiamiento de fondos regionales.',
    imageUrl:
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1449&auto=format&fit=crop',
    category: 'Cultura',
    featured: false,
  },
];

const events = [
  {
    title: 'Conferencia: Inteligencia Artificial en los Negocios Modernos',
    date: new Date('2026-04-22'),
    time: '10:00 AM',
    location: 'Auditorio Principal, Facultad de Negocios Campus IV',
    category: 'Conferencia',
  },
  {
    title: 'Taller de Declaración Anual y Facturación Electrónica 2026',
    date: new Date('2026-04-25'),
    time: '3:00 PM',
    location: 'Sala de Seminarios B',
    category: 'Taller',
  },
  {
    title: 'IV Foro Regional de Negocios y Emprendimiento',
    date: new Date('2026-05-05'),
    time: '9:00 AM',
    location: 'Centro de Convenciones UNACH',
    category: 'Congreso',
  },
  {
    title: 'Examen de Certificación Microsoft Azure Fundamentals',
    date: new Date('2026-05-10'),
    time: '8:00 AM',
    location: 'Centro de Certificación, Edificio C',
    category: 'Certificación',
  },
  {
    title: 'Expo Empresarial — Proyectos de Egresados 2026',
    date: new Date('2026-05-15'),
    time: '6:00 PM',
    location: 'Patio Principal, Facultad de Negocios Campus IV',
    category: 'Cultural',
  },
];

const bulletins = [
  {
    folio: 'BL-2026-001',
    title: 'Convocatoria para Becas de Intercambio Empresarial Internacional 2026-2027',
    date: new Date('2026-04-10'),
    pdf: '',
  },
  {
    folio: 'BL-2026-002',
    title: 'Calendario de Exámenes Extraordinarios — Semestre Enero-Junio 2026',
    date: new Date('2026-04-08'),
    pdf: '',
  },
  {
    folio: 'BL-2026-003',
    title: 'Aviso de Suspensión de Clases — Semana del Emprendedor 20-24 Abril',
    date: new Date('2026-04-05'),
    pdf: '',
  },
  {
    folio: 'BL-2026-004',
    title: 'Resultado de Evaluación Docente Semestre 2025-2026',
    date: new Date('2026-03-28'),
    pdf: '',
  },
  {
    folio: 'BL-2026-005',
    title: 'Actualización de Normatividad Académica — Reglamento Escolar 2026',
    date: new Date('2026-03-20'),
    pdf: '',
  },
  {
    folio: 'BL-2025-042',
    title: 'Convocatoria Titulación por Promedio — Generación 2021-2025',
    date: new Date('2026-03-10'),
    pdf: '',
  },
];

const trending = [
  {
    title: 'Intercambio Empresarial 2026',
    stats: '2.4k menciones · Trending esta semana',
    gradientFrom: '#192D63',
    gradientTo: '#D4B012',
  },
  {
    title: 'Foro de Negocios Mayo',
    stats: '1.8k menciones · Muy comentado',
    gradientFrom: '#735920',
    gradientTo: '#D4B012',
  },
  {
    title: 'Certificación Microsoft en Campus IV',
    stats: '1.1k menciones · Nuevo',
    gradientFrom: '#192D63',
    gradientTo: '#4a72c4',
  },
];

async function seed() {
  try {
    await mongoose.connect(URI);
    console.log('✓ Conectado a MongoDB');

    await News.deleteMany({});
    await Event.deleteMany({});
    await Bulletin.deleteMany({});
    await TrendingTopic.deleteMany({});
    console.log('✓ Colecciones limpiadas');

    await News.insertMany(news);
    console.log(`✓ ${news.length} noticias insertadas`);

    await Event.insertMany(events);
    console.log(`✓ ${events.length} eventos insertados`);

    await Bulletin.insertMany(bulletins);
    console.log(`✓ ${bulletins.length} boletines insertados`);

    await TrendingTopic.insertMany(trending);
    console.log(`✓ ${trending.length} trending topics insertados`);

    console.log('\n✅ Seed completado — BD lista');
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
