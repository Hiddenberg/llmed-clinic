import { Quote, Star } from 'lucide-react';

const testimonials = [
   {
      name: 'María Elena Vásquez',
      role: 'Paciente',
      clinic: 'Tratamiento desde 2019',
      content: 'El equipo médico de LLMed Clinic me ha dado una nueva oportunidad de vida. Su atención es excepcional y las instalaciones son muy cómodas. Me siento segura y bien cuidada en cada sesión.',
      rating: 5,
   },
   {
      name: 'Carlos Mendoza',
      role: 'Familiar de Paciente',
      clinic: 'Acompañante de tratamiento',
      content: 'Como familiar, aprecio mucho la comunicación constante del equipo médico. Nos mantienen informados sobre el progreso y siempre están disponibles para resolver nuestras dudas.',
      rating: 5,
   },
   {
      name: 'Ana Rodríguez',
      role: 'Paciente',
      clinic: 'Tratamiento desde 2020',
      content: 'Los horarios flexibles me permiten continuar con mi trabajo y vida personal. El personal es muy profesional y las instalaciones están siempre impecables. Recomiendo totalmente esta clínica.',
      rating: 5,
   }
];

export default function LandingTestimonials () {
   return (
      <section className="bg-white py-20">
         <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header */}
            <div className="text-center mb-16 animate-fade-in-up">
               <div className="inline-flex items-center gap-2 bg-brand-50 mb-4 px-4 py-2 border border-brand-200/50 rounded-full">
                  <Quote size={16} className="text-brand-500" />
                  <span className="font-medium text-brand-700 text-sm">Testimonios</span>
               </div>
               <h2 className="font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
                  Lo que Dicen Nuestros
                  <span className="block text-brand-500">Pacientes</span>
               </h2>
               <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Pacientes y familias de toda la región confían en nosotros
                  para recibir el mejor cuidado renal especializado.
               </p>
            </div>

            {/* Testimonials Grid */}
            <div className="gap-8 grid lg:grid-cols-3">
               {testimonials.map((testimonial, index) => (
                  <div
                     key={testimonial.name}
                     className="group relative bg-gray-50/50 p-8 border border-gray-100 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
                     style={{
                        animationDelay: `${index * 200}ms`
                     }}
                  >
                     {/* Quote Icon */}
                     <div className="flex justify-center items-center bg-brand-100 mb-6 rounded-full w-12 h-12">
                        <Quote size={20} className="text-brand-500" />
                     </div>

                     {/* Rating */}
                     <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                           <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                     </div>

                     {/* Content */}
                     <blockquote className="text-gray-700 leading-relaxed mb-6">
                        {testimonial.content}
                     </blockquote>

                     {/* Author */}
                     <div className="flex items-center gap-4">
                        {/* <div className="bg-gradient-to-r from-brand-500 to-blue-500 rounded-full w-12 h-12 flex-shrink-0 overflow-hidden">
                           <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                           />
                        </div> */}
                        <div>
                           <div className="font-semibold text-gray-900">
                              {testimonial.name}
                           </div>
                           <div className="text-brand-600 text-sm font-medium">
                              {testimonial.role}
                           </div>
                           <div className="text-gray-500 text-xs">
                              {testimonial.clinic}
                           </div>
                        </div>
                     </div>

                     {/* Hover effect */}
                     <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                  </div>
               ))}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-8 justify-center items-center mt-16 opacity-60 animate-fade-in-up"
               style={{
                  animationDelay: '600ms'
               }}
            >
               <div className="text-gray-500 text-sm font-medium">Certificaciones:</div>
               <div className="flex items-center gap-2">
                  <div className="bg-gray-200 rounded w-8 h-8" />
                  <span className="text-gray-600 text-sm">COFEPRIS</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="bg-gray-200 rounded w-8 h-8" />
                  <span className="text-gray-600 text-sm">Secretaría de Salud</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="bg-gray-200 rounded w-8 h-8" />
                  <span className="text-gray-600 text-sm">ISO 9001</span>
               </div>
            </div>
         </div>
      </section>
   );
}
