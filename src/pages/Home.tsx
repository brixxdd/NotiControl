import { useState, useEffect } from 'react'
import { News } from '../types'
import { ArrowLeft, ArrowRight, Calendar, Clock, ExternalLink, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

type FeaturedNews = Pick<News, 'id' | 'title' | 'content' | 'imageUrl' | 'createdAt'> & Partial<News>;

export const Home = () => {
  const [featuredNews, setFeaturedNews] = useState<FeaturedNews[]>([
    {
      id: "1",
      title: "Nueva acreditación para la facultad",
      content: "La Facultad de Ingeniería ha recibido una nueva acreditación internacional que reconoce la calidad de sus programas académicos...",
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000",
      category: "institucional",
      createdAt: new Date("2025-04-24"),
      updatedAt: new Date("2025-04-24"),
      featured: true
    },
    {
      id: "2",
      title: "Inscripciones abiertas para el nuevo semestre",
      content: "Las inscripciones para el semestre 2025-2 están abiertas. Los estudiantes pueden realizar su proceso de inscripción a través del portal web...",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000",
      category: "académico",
      createdAt: new Date("2025-04-23"),
      updatedAt: new Date("2025-04-23"),
      featured: true
    }
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Eventos de ejemplo
  const events = [
    {
      id: 1,
      title: "Seminario de Investigación Avanzada",
      date: "2025-04-24",
      time: "15:00",
      location: "Auditorio Principal",
      category: "académico"
    },
    {
      id: 2,
      title: "Workshop de Innovación Tecnológica",
      date: "2025-04-25",
      time: "10:00",
      location: "Sala de Conferencias A",
      category: "tecnología"
    }
  ];

  // Boletines de ejemplo
  const bulletins = [
    {
      id: 1,
      title: "Boletín UNACH-2025/270",
      description: "Avances en investigación científica",
      date: "2025-04-23"
    },
    {
      id: 2,
      title: "Boletín UNACH-2025/269",
      description: "Nuevos programas de intercambio internacional",
      date: "2025-04-22"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredNews.length) % featuredNews.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero section con carrusel */}
      <section className="relative h-[600px] overflow-hidden">
        {featuredNews.map((news, index) => (
          <div
            key={news.id}
            className={`absolute inset-0 transition-all duration-500 transform ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 -translate-x-full' 
                  : 'opacity-0 translate-x-full'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white mb-4">
                  {news.category}
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 max-w-3xl">
                  {news.title}
                </h2>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                  {news.content.substring(0, 150)}...
                </p>
                <button className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-lg font-medium transition-colors inline-flex items-center group">
                  Leer más
                  <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Controles del carrusel */}
        <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/80 to-transparent pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="flex space-x-2">
              {featuredNews.map((_, index) => (
                <button
                  key={index}
                  className={`w-8 h-1 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-white/30'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección inspiracional */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-900 opacity-90" />
        <div className="absolute inset-0">
          <div className="h-full w-full">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070"
              alt="Estudiantes"
              className="h-full w-full object-cover opacity-20"
            />
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Formando el Futuro de las Lenguas
              </h2>
              <p className="text-xl text-blue-100 mb-8">
              En la Facultad de Lenguas, no solo enseñamos idiomas, formamos comunicadores globales que construirán puentes culturales y transformarán el mundo. Únete a una comunidad donde la excelencia académica se encuentra con la diversidad lingüística y cultural.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button className="px-6 py-3 bg-white hover:bg-gray-100 text-blue-600 rounded-lg font-medium transition-colors">
                  Explorar Programas
                </button>
                <button className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white rounded-lg font-medium transition-colors">
                  Conoce Nuestro Campus
                </button>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjM0OTIyMzM1OWNiNjFhYjM1ZjFkYjM4MjBkYzM4ZWZhYTY4ZjE2ZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3oKIPEqDGUULpEU0aQ/giphy.gif"
                alt="Innovación en Ingeniería"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center space-x-2 text-white">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm font-medium">Innovación en tiempo real</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de contenido principal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal de noticias */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Últimas Noticias
                </h2>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {featuredNews.map(news => (
                    <article key={news.id} className="py-6 first:pt-0 last:pb-0">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mb-2">
                        {news.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {news.content.substring(0, 150)}...
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        {news.createdAt.toLocaleDateString()}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
                <a href="/noticias" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
                  Ver todas las noticias
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Barra lateral */}
          <div className="space-y-8">
            {/* Eventos próximos */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Eventos Próximos
                </h2>
                <div className="space-y-6">
                  {events.map(event => (
                    <div key={event.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-14 text-center">
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {event.title}
                        </h3>
                        <div className="mt-1 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
                <a href="/eventos" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
                  Ver calendario completo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Boletines */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Últimos Boletines
                </h2>
                <div className="space-y-4">
                  {bulletins.map(bulletin => (
                    <a
                      key={bulletin.id}
                      href="#"
                      className="block p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {bulletin.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {bulletin.description}
                      </p>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {new Date(bulletin.date).toLocaleDateString()}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
                <a href="/boletines" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
                  Ver todos los boletines
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Síguenos
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="#"
                    className="flex items-center justify-center p-4 rounded-lg bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] transition-colors"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center p-4 rounded-lg bg-[#4267B2]/10 hover:bg-[#4267B2]/20 text-[#4267B2] transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center p-4 rounded-lg bg-[#E4405F]/10 hover:bg-[#E4405F]/20 text-[#E4405F] transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center p-4 rounded-lg bg-[#FF0000]/10 hover:bg-[#FF0000]/20 text-[#FF0000] transition-colors"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Trending Topics de la Semana */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Trending de la Semana
                  </h2>
                  <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 rounded-full animate-pulse">
                    EN VIVO
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                    <a href="#" className="relative block p-4 bg-white dark:bg-gray-900 rounded-lg hover:transform hover:scale-[1.01] transition-all">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-pink-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          1
                        </span>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Semana Internacional de las Lenguas</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            +2.5k estudiantes participando
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                    <a href="#" className="relative block p-4 bg-white dark:bg-gray-900 rounded-lg hover:transform hover:scale-[1.01] transition-all">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          2
                        </span>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Hackathon Multilingüe 2025</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            48 horas de innovación
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                    <a href="#" className="relative block p-4 bg-white dark:bg-gray-900 rounded-lg hover:transform hover:scale-[1.01] transition-all">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          3
                        </span>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Intercambio Cultural Virtual</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Conectando 15 países
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
                <a href="/tendencias" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
                  Ver más tendencias
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}