import {
   Heart, Mail, Phone, MapPin, Globe
} from 'lucide-react';

const footerLinks = [
   {
      title: 'Servicios',
      links: [
         {
            label: 'Hemodiálisis',
            href: '#hemodialysis'
         },
         {
            label: 'Consultas',
            href: '#consultations'
         },
         {
            label: 'Urgencias',
            href: '#emergency'
         },
         {
            label: 'Seguimiento',
            href: '#follow-up'
         }
      ]
   },
   {
      title: 'Clínica',
      links: [
         {
            label: 'Acerca de Nosotros',
            href: '#about'
         },
         {
            label: 'Equipo Médico',
            href: '#team'
         },
         {
            label: 'Instalaciones',
            href: '#facilities'
         },
         {
            label: 'Certificaciones',
            href: '#certifications'
         }
      ]
   },
   {
      title: 'Pacientes',
      links: [
         {
            label: 'Primera Consulta',
            href: '#first-visit'
         },
         {
            label: 'Preparación',
            href: '#preparation'
         },
         {
            label: 'Preguntas Frecuentes',
            href: '#faq'
         },
         {
            label: 'Recursos Educativos',
            href: '#resources'
         }
      ]
   },
   {
      title: 'Información',
      links: [
         {
            label: 'Horarios',
            href: '#schedule'
         },
         {
            label: 'Ubicación',
            href: '#location'
         },
         {
            label: 'Seguros Médicos',
            href: '#insurance'
         },
         {
            label: 'Contacto',
            href: '#contact'
         }
      ]
   }
];

export default function LandingFooter () {
   return (
      <footer className="bg-gray-900 text-white">
         {/* Main Footer */}
         <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">
            <div className="gap-12 lg:gap-16 grid lg:grid-cols-5">
               {/* Brand Column */}
               <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="flex justify-center items-center bg-gradient-to-r from-brand-500 to-blue-500 rounded-lg w-10 h-10 text-white">
                        <Heart size={20} />
                     </div>
                     <div>
                        <h3 className="font-bold text-white text-xl">LLMed Clinic</h3>
                        <p className="text-gray-400 text-sm">Sistema de Gestión Médica</p>
                     </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                     Centro especializado en hemodiálisis con más de 15 años de experiencia,
                     brindando atención médica de excelencia con tecnología de vanguardia.
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-3">
                     <div className="flex items-center gap-3 text-gray-300">
                        <Mail size={16} className="text-brand-400" />
                        <span className="text-sm">citas@llmedclinic.com</span>
                     </div>
                     <div className="flex items-center gap-3 text-gray-300">
                        <Phone size={16} className="text-brand-400" />
                        <span className="text-sm">+52 55 1234 5678</span>
                     </div>
                     <div className="flex items-center gap-3 text-gray-300">
                        <MapPin size={16} className="text-brand-400" />
                        <span className="text-sm">Av. Reforma 123, CDMX</span>
                     </div>
                  </div>
               </div>

               {/* Links Columns */}
               {footerLinks.map((section) => (
                  <div key={section.title}>
                     <h4 className="font-semibold text-white text-lg mb-4">
                        {section.title}
                     </h4>
                     <ul className="space-y-2">
                        {section.links.map((link) => (
                           <li key={link.label}>
                              <a
                                 href={link.href}
                                 className="text-gray-300 hover:text-white text-sm transition-colors duration-200 hover:underline"
                              >
                                 {link.label}
                              </a>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
         </div>

         {/* Bottom Bar */}
         <div className="bg-gray-800/50 border-gray-700 border-t">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
               <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                     <span>© 2024 LLMed Clinic. Todos los derechos reservados.</span>
                  </div>

                  <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1.5 border border-green-500/20 rounded-full">
                        <div className="bg-green-400 rounded-full w-2 h-2 animate-pulse" />
                        <span className="text-green-400 text-xs font-medium">Clínica Abierta</span>
                     </div>

                     <div className="flex items-center gap-2 text-gray-400">
                        <Globe size={14} />
                        <span className="text-xs">Sirviendo a toda la región</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
}
