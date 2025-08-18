import {
   TrendingUp, Users, Clock, Award
} from 'lucide-react';

const stats = [
   {
      icon: Users,
      value: '5,000+',
      label: 'Pacientes Tratados',
      description: 'Con resultados exitosos'
   },
   {
      icon: Clock,
      value: '15+',
      label: 'Años de Experiencia',
      description: 'En tratamiento renal'
   },
   {
      icon: TrendingUp,
      value: '98%',
      label: 'Satisfacción',
      description: 'De nuestros pacientes'
   },
   {
      icon: Award,
      value: '24/7',
      label: 'Atención Médica',
      description: 'Disponible siempre'
   }
];

export default function LandingStats () {
   return (
      <section className="bg-gradient-to-r from-brand-500 to-blue-600 py-20 relative overflow-hidden">
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 bg-white rounded-full w-64 h-64 -translate-x-32 -translate-y-32" />
            <div className="absolute bottom-0 right-0 bg-white rounded-full w-48 h-48 translate-x-24 translate-y-24" />
         </div>

         <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header */}
            <div className="text-center mb-16 animate-fade-in-up">
               <h2 className="font-bold text-3xl sm:text-4xl text-white mb-4">
                  Resultados que Hablan por Sí Solos
               </h2>
               <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                  Datos reales que demuestran nuestro compromiso con la excelencia médica
               </p>
            </div>

            {/* Stats Grid */}
            <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-4">
               {stats.map((stat, index) => (
                  <div
                     key={stat.label}
                     className="text-center bg-white/10 backdrop-blur-sm p-8 border border-white/20 rounded-2xl animate-fade-in-up hover:bg-white/15 transition-all duration-300"
                     style={{
                        animationDelay: `${index * 150}ms`
                     }}
                  >
                     {/* Icon */}
                     <div className="inline-flex items-center justify-center bg-white/20 mb-4 rounded-xl w-12 h-12">
                        <stat.icon size={24} className="text-white" />
                     </div>

                     {/* Value */}
                     <div className="font-bold text-3xl sm:text-4xl text-white mb-2">
                        {stat.value}
                     </div>

                     {/* Label */}
                     <div className="font-semibold text-white text-lg mb-1">
                        {stat.label}
                     </div>

                     {/* Description */}
                     <div className="text-blue-100 text-sm">
                        {stat.description}
                     </div>
                  </div>
               ))}
            </div>

            {/* Bottom message */}
            <div className="text-center mt-16 animate-fade-in-up"
               style={{
                  animationDelay: '600ms'
               }}
            >
               <p className="text-blue-100 text-lg">
                  Únete a los miles de pacientes que confían en nosotros para su tratamiento renal
               </p>
            </div>
         </div>
      </section>
   );
}
