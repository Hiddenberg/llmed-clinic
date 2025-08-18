import { Play, ArrowRight } from 'lucide-react';

interface LandingHeroProps {
   videoUrl: string;
}

export default function LandingHero ({ videoUrl }: LandingHeroProps) {
   return (
      <section className="relative bg-gradient-to-br from-white via-brand-50/30 to-blue-50/50 pt-20 pb-16 overflow-hidden">
         {/* Background decorative elements */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 bg-brand-100/40 rounded-full w-96 h-96 animate-pulse-slow" />
            <div className="absolute -bottom-40 -left-40 bg-blue-100/40 rounded-full w-80 h-80 animate-pulse-slow" />
         </div>

         <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="gap-12 lg:gap-16 grid lg:grid-cols-2 items-center">
               {/* Left Column - Content */}
               <div className="text-center lg:text-left animate-fade-in-up">
                  <div className="inline-flex items-center gap-2 bg-brand-50 mb-6 px-4 py-2 border border-brand-200/50 rounded-full">
                     <div className="bg-brand-400 rounded-full w-2 h-2 animate-pulse" />
                     <span className="font-medium text-brand-700 text-sm">Centro Especializado en Hemodiálisis</span>
                  </div>

                  <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight mb-6">
                     Cuidado Renal
                     <span className="block bg-gradient-to-r from-brand-500 to-blue-500 bg-clip-text text-transparent">
                        de Excelencia
                     </span>
                  </h1>

                  <p className="text-gray-600 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                     Brindamos tratamiento de hemodiálisis de la más alta calidad con tecnología avanzada,
                     personal especializado y un enfoque centrado en el bienestar del paciente.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                     <button className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-500 to-blue-500 hover:from-brand-600 hover:to-blue-600 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Agendar Cita
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                     <button className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 px-8 py-4 border border-gray-200 rounded-xl font-semibold text-gray-700 transition-all duration-200 shadow-sm hover:shadow-md">
                        <Play size={18} />
                        Conoce Nuestras Instalaciones
                     </button>
                  </div>

                  {/* Stats */}
                  <div className="gap-8 grid grid-cols-3 text-center lg:text-left">
                     <div>
                        <div className="font-bold text-2xl text-brand-600">15+</div>
                        <div className="text-gray-500 text-sm">Años de Experiencia</div>
                     </div>
                     <div>
                        <div className="font-bold text-2xl text-brand-600">24/7</div>
                        <div className="text-gray-500 text-sm">Atención Médica</div>
                     </div>
                     <div>
                        <div className="font-bold text-2xl text-brand-600">5,000+</div>
                        <div className="text-gray-500 text-sm">Pacientes Atendidos</div>
                     </div>
                  </div>
               </div>

               {/* Right Column - Video */}
               <div className="relative animate-fade-in">
                  <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-blue-500/10 pointer-events-none" />
                     <video
                        className="w-full h-auto"
                        controls={false}
                        loop
                        muted
                        autoPlay
                     >
                        <source src={videoUrl} type="video/webm" />
                        Su navegador no soporta el elemento de video.
                     </video>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-full w-8 h-8 shadow-lg animate-float" />
                  <div className="absolute -bottom-4 -left-4 bg-brand-100 rounded-full w-6 h-6 shadow-lg animate-float"
                     style={{
                        animationDelay: '1s'
                     }}
                  />
               </div>
            </div>
         </div>
      </section>
   );
}
