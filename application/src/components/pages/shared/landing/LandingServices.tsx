import {
   Droplets,
   Clock,
   Shield,
   Heart,
   Users,
   Calendar,
   Stethoscope,
   AlertCircle,
   Phone
} from 'lucide-react';

const services = [
   {
      icon: Droplets,
      title: 'Hemodiálisis Convencional',
      description: 'Tratamiento estándar 3 veces por semana con equipos de última generación.',
      duration: '4 horas por sesión',
      availability: 'Lunes a Sábado',
      color: 'from-blue-500 to-cyan-500'
   },
   {
      icon: Clock,
      title: 'Hemodiálisis Nocturna',
      description: 'Sesiones prolongadas durante la noche para mayor flexibilidad.',
      duration: '6-8 horas por sesión',
      availability: 'Disponible 24/7',
      color: 'from-purple-500 to-violet-500'
   },
   {
      icon: AlertCircle,
      title: 'Diálisis de Urgencia',
      description: 'Atención inmediata para casos de emergencia renal.',
      duration: 'Según necesidad médica',
      availability: 'Disponible 24/7',
      color: 'from-red-500 to-pink-500'
   },
   {
      icon: Stethoscope,
      title: 'Consulta Nefrológica',
      description: 'Evaluación completa con nefrólogos especializados.',
      duration: '45 minutos',
      availability: 'Lunes a Viernes',
      color: 'from-green-500 to-emerald-500'
   }
];

const additionalServices = [
   'Laboratorio especializado en función renal',
   'Nutrición especializada para pacientes renales',
   'Trabajo social y apoyo psicológico',
   'Educación para pacientes y familias',
   'Acceso vascular y mantenimiento de fístulas',
   'Transporte médico especializado'
];

export default function LandingServices () {
   return (
      <section className="bg-white py-20">
         <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header */}
            <div className="text-center mb-16 animate-fade-in-up">
               <div className="inline-flex items-center gap-2 bg-brand-50 mb-4 px-4 py-2 border border-brand-200/50 rounded-full">
                  <Droplets size={16} className="text-brand-500" />
                  <span className="font-medium text-brand-700 text-sm">Servicios Especializados</span>
               </div>
               <h2 className="font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
                  Tratamientos Renales
                  <span className="block text-brand-500">de Excelencia</span>
               </h2>
               <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Ofrecemos una gama completa de servicios de hemodiálisis y atención nefrológica
                  adaptados a las necesidades específicas de cada paciente.
               </p>
            </div>

            {/* Main Services Grid */}
            <div className="gap-8 grid md:grid-cols-2 mb-16">
               {services.map((service, index) => (
                  <div
                     key={service.title}
                     className="group relative bg-gray-50/50 hover:bg-white p-8 border border-gray-100 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up"
                     style={{
                        animationDelay: `${index * 150}ms`
                     }}
                  >
                     {/* Header */}
                     <div className="flex items-center gap-4 mb-6">
                        <div className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                           <service.icon size={28} />
                        </div>
                        <div>
                           <h3 className="font-semibold text-gray-900 text-xl">
                              {service.title}
                           </h3>
                        </div>
                     </div>

                     {/* Description */}
                     <p className="text-gray-600 leading-relaxed mb-6">
                        {service.description}
                     </p>

                     {/* Service Details */}
                     <div className="space-y-3">
                        <div className="flex items-center gap-3">
                           <Clock size={16} className="text-brand-500" />
                           <span className="text-gray-700 text-sm font-medium">
                              Duración: {service.duration}
                           </span>
                        </div>
                        <div className="flex items-center gap-3">
                           <Calendar size={16} className="text-brand-500" />
                           <span className="text-gray-700 text-sm font-medium">
                              {service.availability}
                           </span>
                        </div>
                     </div>

                     {/* Hover effect */}
                     <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                  </div>
               ))}
            </div>

            {/* Additional Services */}
            <div className="bg-gradient-to-r from-brand-50 to-blue-50 p-8 lg:p-12 border border-brand-200/50 rounded-2xl animate-fade-in-up"
               style={{
                  animationDelay: '600ms'
               }}
            >
               <div className="text-center mb-8">
                  <h3 className="font-semibold text-brand-800 text-2xl mb-4">
                     Servicios Complementarios
                  </h3>
                  <p className="text-brand-700 max-w-2xl mx-auto">
                     Además de nuestros tratamientos principales, ofrecemos servicios
                     integrales para el cuidado completo de la salud renal.
                  </p>
               </div>

               <div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-3">
                  {additionalServices.map((service, index) => (
                     <div
                        key={service}
                        className="flex items-center gap-3 bg-white/60 p-4 rounded-xl animate-fade-in-up"
                        style={{
                           animationDelay: `${700 + (index * 100)}ms`
                        }}
                     >
                        <div className="flex items-center justify-center bg-brand-100 rounded-lg w-8 h-8 flex-shrink-0">
                           <Heart size={16} className="text-brand-600" />
                        </div>
                        <span className="text-brand-800 text-sm font-medium">
                           {service}
                        </span>
                     </div>
                  ))}
               </div>

               {/* Emergency contact */}
               <div className="bg-white/80 mt-8 p-6 border border-brand-200/30 rounded-xl text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                     <AlertCircle size={20} className="text-red-500" />
                     <span className="font-semibold text-gray-800 text-lg">Urgencias Médicas</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                     Para emergencias renales, contamos con atención inmediata las 24 horas
                  </p>
                  <a
                     href="tel:+525512345678"
                     className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                     <Phone size={16} />
                     Llamar Urgencias: +52 55 1234 5678
                  </a>
               </div>
            </div>
         </div>
      </section>
   );
}
