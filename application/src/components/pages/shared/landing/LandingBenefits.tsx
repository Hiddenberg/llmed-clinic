import {
   Shield,
   Stethoscope,
   Heart,
   CheckCircle,
   ArrowRight,
   Clock,
   BarChart3,
   Users
} from 'lucide-react';

const userTypes = [
   {
      icon: Heart,
      title: 'Para Pacientes',
      subtitle: 'Tu bienestar es nuestra prioridad',
      color: 'from-brand-500 to-blue-500',
      benefits: [
         'Tratamientos personalizados y seguros',
         'Ambiente cómodo y relajante',
         'Atención médica especializada',
         'Horarios flexibles adaptados a ti'
      ]
   },
   {
      icon: Users,
      title: 'Para Familias',
      subtitle: 'Apoyo integral para todos',
      color: 'from-green-500 to-emerald-500',
      benefits: [
         'Información clara sobre el tratamiento',
         'Espacios cómodos para acompañantes',
         'Comunicación constante con el equipo médico',
         'Programas de educación y apoyo'
      ]
   },
   {
      icon: Stethoscope,
      title: 'Equipo Médico',
      subtitle: 'Profesionales especializados',
      color: 'from-purple-500 to-pink-500',
      benefits: [
         'Nefrólogos certificados y experimentados',
         'Personal de enfermería especializado',
         'Capacitación continua del equipo',
         'Tecnología médica de vanguardia'
      ]
   }
];

export default function LandingBenefits () {
   return (
      <section className="bg-gray-50/50 py-20">
         <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header */}
            <div className="text-center mb-16 animate-fade-in-up">
               <div className="inline-flex items-center gap-2 bg-white mb-4 px-4 py-2 border border-gray-200 rounded-full shadow-sm">
                  <Heart size={16} className="text-brand-500" />
                  <span className="font-medium text-brand-700 text-sm">Cuidado Integral</span>
               </div>
               <h2 className="font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
                  Atención Especializada para
                  <span className="block text-brand-500">Cada Persona</span>
               </h2>
               <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Ofrecemos un enfoque integral que considera las necesidades específicas
                  de pacientes, familias y nuestro equipo médico.
               </p>
            </div>

            {/* Benefits Grid */}
            <div className="gap-8 grid lg:grid-cols-3">
               {userTypes.map((userType, index) => (
                  <div
                     key={userType.title}
                     className="group relative bg-white p-8 border border-gray-100 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up"
                     style={{
                        animationDelay: `${index * 200}ms`
                     }}
                  >
                     {/* Header */}
                     <div className="flex items-center gap-4 mb-6">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${userType.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                           <userType.icon size={24} />
                        </div>
                        <div>
                           <h3 className="font-semibold text-gray-900 text-xl">
                              {userType.title}
                           </h3>
                           <p className="text-gray-500 text-sm">
                              {userType.subtitle}
                           </p>
                        </div>
                     </div>

                     {/* Benefits List */}
                     <ul className="space-y-3 mb-6">
                        {userType.benefits.map((benefit, benefitIndex) => (
                           <li key={benefitIndex} className="flex items-start gap-3">
                              <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600 leading-relaxed">
                                 {benefit}
                              </span>
                           </li>
                        ))}
                     </ul>

                     {/* CTA */}
                     <button className={`group/btn inline-flex items-center gap-2 bg-gradient-to-r ${userType.color} text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 w-full justify-center`}>
                        Más Información
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                     </button>

                     {/* Hover effect */}
                     <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${userType.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                  </div>
               ))}
            </div>

            {/* Additional Info */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16 animate-fade-in-up"
               style={{
                  animationDelay: '600ms'
               }}
            >
               <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} className="text-brand-500" />
                  <span className="text-sm">Citas el mismo día</span>
               </div>
               <div className="hidden sm:block bg-gray-300 rounded-full w-1 h-1" />
               <div className="flex items-center gap-2 text-gray-600">
                  <Users size={16} className="text-brand-500" />
                  <span className="text-sm">Equipo médico certificado</span>
               </div>
               <div className="hidden sm:block bg-gray-300 rounded-full w-1 h-1" />
               <div className="flex items-center gap-2 text-gray-600">
                  <Shield size={16} className="text-brand-500" />
                  <span className="text-sm">Instalaciones certificadas</span>
               </div>
            </div>
         </div>
      </section>
   );
}
