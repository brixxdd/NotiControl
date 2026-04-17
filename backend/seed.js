const mongoose = require('mongoose');
const News = require('./models/News');
const Event = require('./models/Event');
const Bulletin = require('./models/Bulletin');
const TrendingTopic = require('./models/TrendingTopic');

const URI = 'mongodb://localhost:27017/notiControlDB';

const news = [
  {
    title: 'Facultad de Lenguas lanza programa de intercambio internacional',
    content:
      'La Facultad de Lenguas de la UNACH anuncia una nueva alianza con universidades de Francia, Alemania y Japón para el ciclo 2026. Los estudiantes podrán acceder a becas completas durante un semestre académico. El programa incluye cursos de idioma, cultura y prácticas profesionales en empresas locales. Las inscripciones estarán abiertas a partir del próximo mes.',
    imageUrl:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop',
    category: 'Internacional',
    featured: true,
  },
  {
    title: 'Congreso de Lingüística Aplicada reunirá a expertos de toda América',
    content:
      'El próximo mes de mayo se llevará a cabo el VII Congreso de Lingüística Aplicada organizado por la Facultad de Lenguas UNACH. El evento contará con la participación de más de 50 ponentes internacionales y más de 200 estudiantes. Los temas centrales serán adquisición de lenguas, enseñanza del español como lengua extranjera y tecnología educativa.',
    imageUrl:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop',
    category: 'Académico',
    featured: true,
  },
  {
    title: 'Nuevo laboratorio de idiomas equipado con tecnología de vanguardia',
    content:
      'La Facultad de Lenguas inauguró su nuevo laboratorio multimedia con 40 estaciones de trabajo completamente equipadas. El espacio cuenta con software de reconocimiento de voz, acceso a plataformas digitales de aprendizaje y conexión de videoconferencia para clases con hablantes nativos de todo el mundo.',
    imageUrl:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1464&auto=format&fit=crop',
    category: 'Infraestructura',
    featured: false,
  },
  {
    title: 'Estudiantes de Lenguas ganan primer lugar en olimpiada nacional de francés',
    content:
      'El equipo representativo de la Facultad de Lenguas obtuvo el primer lugar en la Olimpiada Nacional de Francés celebrada en la Ciudad de México. Los tres estudiantes destacaron en las categorías de expresión oral, comprensión lectora y traducción. Este logro posiciona a la UNACH como referente nacional en la enseñanza del francés.',
    imageUrl:
      'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1528&auto=format&fit=crop',
    category: 'Logros',
    featured: false,
  },
  {
    title: 'Apertura del Centro de Certificación Cambridge en la Facultad',
    content:
      'A partir de este semestre, los estudiantes y público en general podrán realizar exámenes de certificación Cambridge (A2 Key, B1 Preliminary, B2 First, C1 Advanced y C2 Proficiency) directamente en las instalaciones de la Facultad de Lenguas. El Centro estará disponible con cuatro convocatorias anuales.',
    imageUrl:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop',
    category: 'Certificaciones',
    featured: false,
  },
  {
    title: 'Semana Cultural de Lenguas celebra la diversidad lingüística mundial',
    content:
      'Del 20 al 24 de abril se llevará a cabo la Semana Cultural de Lenguas con actividades artísticas, gastronómicas y académicas representando más de 15 países. Las actividades son abiertas al público y gratuitas. Se presentarán grupos de danza folklórica, exposiciones fotográficas y conferencias sobre multiculturalismo.',
    imageUrl:
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1449&auto=format&fit=crop',
    category: 'Cultura',
    featured: false,
  },
];

const events = [
  {
    title: 'Conferencia: Inteligencia Artificial en la Enseñanza de Idiomas',
    date: new Date('2026-04-22'),
    time: '10:00 AM',
    location: 'Auditorio Principal, Facultad de Lenguas',
    category: 'Conferencia',
  },
  {
    title: 'Taller de Escritura Creativa en Inglés',
    date: new Date('2026-04-25'),
    time: '3:00 PM',
    location: 'Sala de Seminarios B',
    category: 'Taller',
  },
  {
    title: 'VII Congreso de Lingüística Aplicada',
    date: new Date('2026-05-05'),
    time: '9:00 AM',
    location: 'Centro de Convenciones UNACH',
    category: 'Congreso',
  },
  {
    title: 'Examen de Certificación Cambridge B2 First',
    date: new Date('2026-05-10'),
    time: '8:00 AM',
    location: 'Centro de Certificación, Edificio C',
    category: 'Certificación',
  },
  {
    title: 'Noche Cultural Francesa — Soirée Française',
    date: new Date('2026-05-15'),
    time: '6:00 PM',
    location: 'Jardín de la Facultad de Lenguas',
    category: 'Cultural',
  },
];

const bulletins = [
  {
    folio: 'BL-2026-001',
    title: 'Convocatoria para Becas de Intercambio Internacional 2026-2027',
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
    title: 'Aviso de Suspensión de Clases — Semana Cultural 20-24 Abril',
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
    title: 'Intercambio Internacional 2026',
    stats: '2.4k menciones · Trending esta semana',
    gradientFrom: '#007aff',
    gradientTo: '#5856d6',
  },
  {
    title: 'Congreso de Lingüística Mayo',
    stats: '1.8k menciones · Muy comentado',
    gradientFrom: '#ff2d55',
    gradientTo: '#ff9500',
  },
  {
    title: 'Certificación Cambridge en UNACH',
    stats: '1.1k menciones · Nuevo',
    gradientFrom: '#34c759',
    gradientTo: '#30b0c7',
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
