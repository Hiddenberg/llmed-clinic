import {
   Calendar,
   Users,
   BarChart3,
   Shield,
   Clock,
   Stethoscope,
   FileText,
   Heart
} from 'lucide-react';

const features = [
   {
      icon: Heart,
      title: 'Hemodiálisis Avanzada',
      description: 'Equipos de última generación para tratamientos seguros y efectivos con monitoreo continuo.',
      color: 'from-blue-500 to-cyan-500'
   },
   {
      icon: Users,
      title: 'Atención Personalizada',
      description: 'Planes de tratamiento individualizados con seguimiento médico especializado.',
      color: 'from-green-500 to-emerald-500'
   },
   {
      icon: Shield,
      title: 'Seguridad Total',
      description: 'Protocolos estrictos de seguridad e higiene para garantizar tu bienestar.',
      color: 'from-purple-500 to-violet-500'
   },
   {
      icon: Clock,
      title: 'Horarios Flexibles',
      description: 'Múltiples turnos disponibles para adaptarse a tu estilo de vida.',
      color: 'from-orange-500 to-amber-500'
   },
   {
      icon: Stethoscope,
      title: 'Equipo Médico Experto',
      description: 'Nefrólogos certificados y personal de enfermería altamente capacitado.',
      color: 'from-red-500 to-pink-500'
   },
   {
      icon: FileText,
      title: 'Seguimiento Integral',
      description: 'Monitoreo completo de tu progreso con reportes médicos detallados.',
      color: 'from-indigo-500 to-blue-500'
   }
];

export default function LandingFeatures () {
   return (
      <section className="bg-white py-20">
         <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header */}
            <div className="text-center mb-16 animate-fade-in-up">
               <div className="inline-flex items-center gap-2 bg-brand-50 mb-4 px-4 py-2 border border-brand-200/50 rounded-full">
                  <Heart size={16} className="text-brand-500" />
                  <span className="font-medium text-brand-700 text-sm">Nuestros Servicios</span>
               </div>
               <h2 className="font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
                  Todo lo que necesitas para
                  <span className="block text-brand-500">tu tratamiento renal</span>
               </h2>
               <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Ofrecemos servicios médicos especializados en hemodiálisis con la más alta calidad,
                  tecnología avanzada y un equipo médico comprometido con tu bienestar.
               </p>
            </div>

            {/* Features Grid */}
            <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
               {features.map((feature, index) => (
                  <div
                     key={feature.title}
                     className="group relative bg-white hover:bg-gray-50/50 p-8 border border-gray-100 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
                     style={{
                        animationDelay: `${index * 100}ms`
                     }}
                  >
                     {/* Icon */}
                     <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-200`}>
                        <feature.icon size={24} />
                     </div>

                     {/* Content */}
                     <h3 className="font-semibold text-gray-900 text-xl mb-3">
                        {feature.title}
                     </h3>
                     <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                     </p>

                     {/* Hover effect */}
                     <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                  </div>
               ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16 animate-fade-in-up"
               style={{
                  animationDelay: '600ms'
               }}
            >
               <div className="inline-flex items-center gap-2 bg-gray-50 px-6 py-3 border border-gray-200 rounded-full">
                  <Clock size={16} className="text-brand-500" />
                  <span className="font-medium text-gray-700 text-sm">
                     Citas disponibles las 24 horas
                  </span>
               </div>
            </div>
         </div>
      </section>
   );
}
