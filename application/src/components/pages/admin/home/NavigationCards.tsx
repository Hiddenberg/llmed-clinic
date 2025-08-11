import Link from 'next/link';
import {
   Calendar,
   Users,
   UserCheck,
   BarChart3,
   Activity,
   Settings,
   ArrowRight,
   LucideIcon
} from 'lucide-react';
import { mockNavCards, type AdminNavCard } from '@/data/mockData/adminData';

// Map icon names to actual Lucide icons
const iconMap: Record<string, LucideIcon> = {
   Calendar,
   Users,
   UserCheck,
   BarChart3,
   Activity,
   Settings
};

interface NavigationCardProps {
   card: AdminNavCard;
   index: number;
}

function NavigationCard ({
   card, index
}: NavigationCardProps) {
   const Icon = iconMap[card.icon];

   const colorClasses = {
      brand: {
         gradient: 'from-brand-500 via-brand-400 to-blue-500',
         bg: 'from-brand-500/4 via-brand-400/2 to-blue-500/4',
         border: 'from-brand-300/30 via-brand-200/20 to-blue-300/30',
         text: 'text-brand-700'
      },
      success: {
         gradient: 'from-green-500 via-green-400 to-emerald-500',
         bg: 'from-green-500/4 via-green-400/2 to-emerald-500/4',
         border: 'from-green-300/30 via-green-200/20 to-emerald-300/30',
         text: 'text-green-700'
      },
      warning: {
         gradient: 'from-orange-500 via-amber-400 to-yellow-500',
         bg: 'from-orange-500/4 via-amber-400/2 to-yellow-500/4',
         border: 'from-orange-300/30 via-amber-200/20 to-yellow-300/30',
         text: 'text-orange-700'
      },
      info: {
         gradient: 'from-blue-500 via-sky-400 to-cyan-500',
         bg: 'from-blue-500/4 via-sky-400/2 to-cyan-500/4',
         border: 'from-blue-300/30 via-sky-200/20 to-cyan-300/30',
         text: 'text-blue-700'
      }
   };

   const colors = colorClasses[card.color];

   return (
      <Link
         href={card.href}
         className={`group relative block animate-fade-in-up`}
         style={{
            animationDelay: `${index * 150}ms`
         }}
      >
         <div className="relative bg-white/90 border border-gray-200/50 rounded-2xl p-6 h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg overflow-hidden">
            {/* Simplified background gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-2xl opacity-40 group-hover:opacity-60 transition-all duration-300`} />

            <div className="z-10 relative flex flex-col h-full">
               <div className="flex justify-between items-start mb-6">
                  {/* Simplified icon */}
                  <div className={`flex items-center justify-center w-14 h-14 bg-gradient-to-r ${colors.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-all duration-300`}>
                     {Icon && <Icon size={26} className="drop-shadow-lg text-white" />}
                  </div>

                  {/* Simple arrow */}
                  <ArrowRight
                     size={18}
                     className="text-gray-400 group-hover:text-gray-600 group-hover:scale-110 transition-all group-hover:translate-x-2 duration-300"
                  />
               </div>

               <div className="flex-1 space-y-3">
                  <h3 className={`font-bold text-xl ${colors.text} transition-all duration-300`}>
                     {card.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 text-sm leading-relaxed transition-colors duration-300">
                     {card.description}
                  </p>
               </div>

               {/* Bottom accent line */}
               <div className="bg-gray-200 mt-6 rounded-full h-0.5 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out`} />
               </div>
            </div>
         </div>
      </Link>
   );
}

export default function NavigationCards () {
   return (
      <div className="space-y-6">
         {/* Simplified header */}
         <div className="relative bg-white/90 border border-gray-200/50 rounded-xl p-6">
            <div className="flex items-center gap-3">
               <div className="bg-gradient-to-r from-brand-500 to-blue-500 shadow-lg p-2 rounded-lg">
                  <Settings size={20} className="drop-shadow-sm text-white" />
               </div>
               <div>
                  <h2 className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 font-bold text-transparent text-2xl">
                     Panel de Administración
                  </h2>
                  <p className="text-gray-600 text-sm">Accede a las diferentes secciones de gestión</p>
               </div>
            </div>
         </div>

         {/* Grid */}
         <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            {mockNavCards.map((card, index) => (
               <NavigationCard
                  key={card.id}
                  card={card}
                  index={index}
               />
            ))}
         </div>

         {/* Simplified footer */}
         <div className="bg-gradient-to-r from-gray-50 to-brand-50/30 mt-8 p-4 border border-gray-100 rounded-xl">
            <div className="flex justify-between items-center">
               <span className="font-medium text-gray-600 text-sm">Accesos rápidos disponibles</span>
               <div className="flex items-center gap-1">
                  <div className="bg-green-400 rounded-full w-1.5 h-1.5 animate-pulse" />
                  <span className="text-gray-500 text-xs">Todos los sistemas operativos</span>
               </div>
            </div>
         </div>
      </div>
   );
}
