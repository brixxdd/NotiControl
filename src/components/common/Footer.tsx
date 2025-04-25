import { ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Franja superior con degradado */}
      <div className="h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
      
      {/* Contenido principal del footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Facultad de Lenguas</h3>
            <p className="text-gray-400">
              Formando profesionales en lenguas y comunicación intercultural desde 1985.
            </p>
            <div className="pt-2">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-flex items-center group">
                Contactar
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {[
                'Programas Académicos',
                'Admisiones',
                'Investigación',
                'Biblioteca',
                'Campus Virtual',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                  >
                    <span className="h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 group">
                <div className="mt-1">
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 group-hover:text-white transition-colors">
                    Blvd. Belisario Domínguez km. 1081
                  </p>
                  <p className="text-gray-400 group-hover:text-white transition-colors">
                    Tuxtla Gutiérrez, Chiapas
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="mt-1">
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <a href="mailto:lenguas@unach.mx" className="text-gray-400 group-hover:text-white transition-colors">
                  lenguas@unach.mx
                </a>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="mt-1">
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <a href="tel:+529616150440" className="text-gray-400 group-hover:text-white transition-colors">
                  (961) 615 0440
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Boletín Informativo</h4>
            <p className="text-gray-400 mb-4">
              Suscríbete para recibir las últimas noticias y actualizaciones.
            </p>
            <form className="space-y-3">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity" />
              </div>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Subfooter */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Facultad de Lenguas UNACH. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Términos de Uso
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Mapa del Sitio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};