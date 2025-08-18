import {
   Award, Heart, Users, Shield
} from 'lucide-react';

const achievements = [
   {
      icon: Award,
      title: 'Excelencia Médica',
      description: 'Reconocidos por la Sociedad Mexicana de Nefrología'
   },
   {
      icon: Users,
      title: 'Equipo Especializado',
      description: '15 nefrólogos certificados y 30 enfermeras especializadas'
   },
   {
      icon: Shield,
      title: 'Tecnología Avanzada',
      description: 'Equipos de hemodiálisis de última generación'
   },
   {
      icon: Heart,
      title: 'Atención Humana',
      description: 'Enfoque integral en el bienestar del paciente'
   }
];

export default function LandingAbout () {
   return (
      <section className="bg-gradient-to-b from-white to-gray-50/50 py-20">
         <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="gap-16 lg:gap-20 grid lg:grid-cols-2 items-center">
               {/* Left Column - Content */}
               <div className="animate-fade-in-up">
                  <div className="inline-flex items-center gap-2 bg-brand-50 mb-6 px-4 py-2 border border-brand-200/50 rounded-full">
                     <Heart size={16} className="text-brand-500" />
                     <span className="font-medium text-brand-700 text-sm">Nuestra Historia</span>
                  </div>

                  <h2 className="font-bold text-3xl sm:text-4xl text-gray-900 leading-tight mb-6">
                     15 Años Cuidando
                     <span className="block text-brand-500">tu Salud Renal</span>
                  </h2>

                  <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                     <p>
                        Desde 2009, LLMed Clinic se ha establecido como el centro de referencia
                        en tratamiento de hemodiálisis en la región, atendiendo a más de 5,000
                        pacientes con los más altos estándares de calidad médica.
                     </p>
                     <p>
                        Nuestro compromiso va más allá del tratamiento: creemos en brindar
                        esperanza, dignidad y una mejor calidad de vida a cada uno de nuestros
                        pacientes y sus familias.
                     </p>
                  </div>

                  {/* Mission Statement */}
                  <div className="bg-brand-50 p-6 border border-brand-200/50 rounded-2xl mb-8">
                     <h3 className="font-semibold text-brand-800 text-lg mb-2">Nuestra Misión</h3>
                     <p className="text-brand-700 leading-relaxed">
                        Proporcionar tratamiento de hemodiálisis de excelencia, combinando
                        tecnología avanzada con atención humana personalizada para mejorar
                        la calidad de vida de nuestros pacientes.
                     </p>
                  </div>

                  {/* Quick stats */}
                  <div className="gap-6 grid grid-cols-2 sm:grid-cols-4">
                     <div className="text-center">
                        <div className="font-bold text-2xl text-brand-600">15+</div>
                        <div className="text-gray-500 text-sm">Años</div>
                     </div>
                     <div className="text-center">
                        <div className="font-bold text-2xl text-brand-600">5K+</div>
                        <div className="text-gray-500 text-sm">Pacientes</div>
                     </div>
                     <div className="text-center">
                        <div className="font-bold text-2xl text-brand-600">45</div>
                        <div className="text-gray-500 text-sm">Especialistas</div>
                     </div>
                     <div className="text-center">
                        <div className="font-bold text-2xl text-brand-600">24/7</div>
                        <div className="text-gray-500 text-sm">Disponible</div>
                     </div>
                  </div>
               </div>

               {/* Right Column - Achievements */}
               <div className="animate-fade-in-up"
                  style={{
                     animationDelay: '200ms'
                  }}
               >
                  <div className="space-y-6">
                     {achievements.map((achievement, index) => (
                        <div
                           key={achievement.title}
                           className="group flex items-start gap-4 bg-white p-6 border border-gray-100 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                           style={{
                              animationDelay: `${(index + 1) * 100}ms`
                           }}
                        >
                           <div className="flex items-center justify-center bg-brand-100 rounded-xl w-12 h-12 flex-shrink-0 group-hover:bg-brand-200 transition-colors">
                              <achievement.icon size={24} className="text-brand-600" />
                           </div>
                           <div>
                              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                                 {achievement.title}
                              </h3>
                              <p className="text-gray-600 leading-relaxed">
                                 {achievement.description}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Certifications badge */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 mt-8 p-6 border border-green-200/50 rounded-2xl">
                     <div className="flex items-center gap-3 mb-3">
                        <div className="bg-green-500 rounded-full w-3 h-3" />
                        <span className="font-semibold text-green-800">Certificaciones Vigentes</span>
                     </div>
                     <p className="text-green-700 text-sm leading-relaxed">
                        Cumplimos con todas las normativas de la Secretaría de Salud y
                        mantenemos certificaciones internacionales de calidad médica.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
