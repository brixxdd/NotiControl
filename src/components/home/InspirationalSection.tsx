export const InspirationalSection = () => {
  return (
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
              alt="Innovación en Lenguas"
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
  );
};
