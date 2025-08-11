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

function NavigationCard ({ card, index }: NavigationCardProps) {
   const Icon = iconMap[card.icon];
   
   const colorClasses = {
      brand: {
         bg: 'bg-brand-50',
         text: 'text-brand-600',
         border: 'border-brand-100',
         hover: 'hover:bg-brand-100 hover:border-brand-200',
         gradient: 'from-brand-500 to-brand-600'
      },
      success: {
         bg: 'bg-green-50',
         text: 'text-green-600',
         border: 'border-green-100',
         hover: 'hover:bg-green-100 hover:border-green-200',
         gradient: 'from-green-500 to-green-600'
      },
      warning: {
         bg: 'bg-orange-50',
         text: 'text-orange-600',
         border: 'border-orange-100',
         hover: 'hover:bg-orange-100 hover:border-orange-200',
         gradient: 'from-orange-500 to-orange-600'
      },
      info: {
         bg: 'bg-blue-50',
         text: 'text-blue-600',
         border: 'border-blue-100',
         hover: 'hover:bg-blue-100 hover:border-blue-200',
         gradient: 'from-blue-500 to-blue-600'
      }
   };

   const colors = colorClasses[card.color];

   return (
      <Link
         href={card.href}
         className={`group relative bg-white border ${colors.border} ${colors.hover} rounded-lg p-6 transition-all duration-300 hover:shadow-elevation-2 hover:scale-[1.02] animate-fade-in-up`}
         style={{ animationDelay: `${index * 100}ms` }}
      >
         <div className="flex flex-col h-full">
            <div className="flex items-start justify-between">
               <div className={`flex items-center justify-center w-12 h-12 ${colors.bg} rounded-lg ${colors.text} group-hover:scale-110 transition-transform duration-300`}>
                  {Icon && <Icon size={24} />}
               </div>
               <ArrowRight 
                  size={16} 
                  className="text-text-muted group-hover:text-text group-hover:translate-x-1 transition-all duration-300" 
               />
            </div>
            
            <div className="mt-4 flex-1">
               <h3 className="font-semibold text-text text-lg group-hover:text-text transition-colors duration-300">
                  {card.title}
               </h3>
               <p className="text-text-muted text-sm mt-2 leading-relaxed">
                  {card.description}
               </p>
            </div>
         </div>
         
         {/* Subtle gradient overlay on hover */}
         <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300 pointer-events-none`} />
      </Link>
   );
}

export default function NavigationCards () {
   return (
      <div className="space-y-4">
         <div>
            <h2 className="text-xl font-semibold text-text">Panel de Administración</h2>
            <p className="text-text-muted text-sm">Accede a las diferentes secciones de gestión</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockNavCards.map((card, index) => (
               <NavigationCard 
                  key={card.id} 
                  card={card} 
                  index={index}
               />
            ))}
         </div>
      </div>
   );
}
