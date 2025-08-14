import Link from 'next/link';
import {
   Users, Calendar, FileText, Activity,
   ArrowRight, Stethoscope, Video
} from 'lucide-react';

interface NavItem {
   title: string;
   description: string;
   href: string;
   icon: React.ReactNode;
   color: string;
}

const navigationItems: NavItem[] = [
   {
      title: 'Archivo',
      description: 'Ver y gestionar pacientes asignados',
      href: '/doctor/patients',
      icon: <Users size={24} />,
      color: 'from-brand-500 to-blue-500'
   },
   {
      title: 'Consultas Médicas',
      description: 'Consultas presenciales y por video',
      href: '/doctor/consultation',
      icon: <Stethoscope size={24} />,
      color: 'from-emerald-500 to-green-500'
   },
   {
      title: 'Calendario',
      description: 'Citas y horarios de hoy',
      href: '/doctor/calendar',
      icon: <Calendar size={24} />,
      color: 'from-green-500 to-emerald-500'
   },
   {
      title: 'Monitoreo',
      description: 'Signos vitales en tiempo real',
      href: '/doctor/monitoring',
      icon: <Activity size={24} />,
      color: 'from-purple-500 to-pink-500'
   }
];

function NavCard ({
   item, index
}: { item: NavItem; index: number }) {
   return (
      <Link
         href={item.href}
         className={`group block animate-fade-in-up`}
         style={{
            animationDelay: `${index * 100}ms`
         }}
      >
         <div className="relative bg-white/80 hover:bg-white/95 shadow-sm hover:shadow-lg p-6 border border-white/50 rounded-xl h-full overflow-hidden hover:scale-[1.02] transition-all duration-300">
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />

            <div className="relative flex flex-col h-full">
               <div className="flex justify-between items-start mb-4">
                  <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                     {item.icon}
                  </div>

                  <ArrowRight
                     size={16}
                     className="text-gray-400 group-hover:text-gray-600 transition-all group-hover:translate-x-1 duration-300"
                  />
               </div>

               <div className="flex-1">
                  <h3 className="mb-2 font-semibold text-gray-800 group-hover:text-gray-900 text-lg transition-colors">
                     {item.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 text-sm transition-colors">
                     {item.description}
                  </p>
               </div>
            </div>
         </div>
      </Link>
   );
}

export default function QuickNavigation () {
   return (
      <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
         <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-b from-green-500 to-emerald-500 rounded-full w-1 h-6" />
            <h2 className="font-semibold text-gray-800 text-lg">Accesos Rápidos</h2>
            <div className="flex-1 bg-gradient-to-r from-gray-300/30 to-transparent ml-4 h-px" />
            <div className="flex items-center gap-2">
               <Stethoscope size={16} className="text-green-500" />
               <span className="font-medium text-green-600 text-sm">Panel Médico</span>
            </div>
         </div>

         <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {navigationItems.map((item, index) => (
               <NavCard key={item.title} item={item} index={index} />
            ))}
         </div>

         {/* Footer */}
         <div className="flex justify-between items-center mt-6 pt-4 border-gray-200/50 border-t">
            <span className="text-gray-600 text-sm">Navegación rápida disponible</span>
            <div className="flex items-center gap-2">
               <div className="bg-green-400 rounded-full w-2 h-2 animate-pulse" />
               <span className="text-gray-500 text-xs">Sistema activo</span>
            </div>
         </div>
      </div>
   );
}
