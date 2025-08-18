import {
   ArrowRight, Calendar, Phone, Mail, MapPin
} from 'lucide-react';

export default function LandingCTA () {
   return (
      <section className="bg-gradient-to-r from-gray-900 via-brand-900 to-blue-900 py-20 relative overflow-hidden">
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 bg-white rounded-full w-96 h-96 translate-x-48 -translate-y-48" />
            <div className="absolute bottom-0 left-0 bg-white rounded-full w-64 h-64 -translate-x-32 translate-y-32" />
         </div>

         <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="gap-12 lg:gap-16 grid lg:grid-cols-2 items-center">
               {/* Left Column - CTA Content */}
               <div className="text-center lg:text-left animate-fade-in-up">
                  <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
                     ¿Necesitas Tratamiento
                     <span className="block bg-gradient-to-r from-brand-400 to-blue-400 bg-clip-text text-transparent">
                        de Hemodiálisis?
                     </span>
                  </h2>

                  <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                     Agenda tu consulta inicial y descubre cómo nuestro equipo médico especializado
                     puede ayudarte a mejorar tu calidad de vida con el mejor tratamiento renal.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                     <button className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-brand-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        <Calendar size={18} />
                        Agendar Consulta
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                     <button className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 border border-white/20 rounded-xl font-semibold transition-all duration-200 backdrop-blur-sm">
                        <Phone size={18} />
                        Llamar Ahora
                     </button>
                  </div>

                  {/* Contact info */}
                  <div className="text-blue-100 text-sm">
                     <p>¿Preguntas? Llámanos al <span className="font-semibold text-white">+52 55 1234 5678</span></p>
                  </div>
               </div>

               {/* Right Column - Contact Form */}
               <div className="bg-white/10 backdrop-blur-sm p-8 border border-white/20 rounded-2xl animate-fade-in-up"
                  style={{
                     animationDelay: '200ms'
                  }}
               >
                  <h3 className="font-semibold text-white text-xl mb-6">
                     Solicita tu Consulta Gratuita
                  </h3>

                  <form className="space-y-4">
                     <div className="gap-4 grid sm:grid-cols-2">
                        <input
                           type="text"
                           placeholder="Nombre"
                           className="bg-white/10 backdrop-blur-sm px-4 py-3 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:border-white/40 transition-colors"
                        />
                        <input
                           type="text"
                           placeholder="Apellido"
                           className="bg-white/10 backdrop-blur-sm px-4 py-3 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:border-white/40 transition-colors"
                        />
                     </div>

                     <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="bg-white/10 backdrop-blur-sm px-4 py-3 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:border-white/40 transition-colors w-full"
                     />

                     <input
                        type="tel"
                        placeholder="Teléfono"
                        className="bg-white/10 backdrop-blur-sm px-4 py-3 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:border-white/40 transition-colors w-full"
                     />

                     <select className="bg-white/10 backdrop-blur-sm px-4 py-3 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white/40 transition-colors w-full">
                        <option value="" className="text-gray-800">Tipo de consulta</option>
                        <option value="primera-vez" className="text-gray-800">Primera vez</option>
                        <option value="segunda-opinion" className="text-gray-800">Segunda opinión</option>
                        <option value="seguimiento" className="text-gray-800">Seguimiento</option>
                        <option value="urgencia" className="text-gray-800">Urgencia</option>
                     </select>

                     <textarea
                        rows={3}
                        placeholder="Cuéntanos sobre tu situación médica actual..."
                        className="bg-white/10 backdrop-blur-sm px-4 py-3 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:border-white/40 transition-colors w-full resize-none"
                     />

                     <button
                        type="submit"
                        className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-brand-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full"
                     >
                        Solicitar Consulta
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                  </form>

                  <p className="text-blue-200 text-xs text-center mt-4">
                     Un especialista se comunicará contigo en menos de 4 horas
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
}
