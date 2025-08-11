import {
   Activity, Clock, AlertTriangle, CheckCircle, Users
} from 'lucide-react';
import { getPatientStats } from '@/data/mockData/adminData';

interface StatCardProps {
   icon: React.ReactNode;
   label: string;
   value: number;
   color: 'brand' | 'success' | 'warning' | 'danger' | 'info';
   description: string;
   index: number;
}

function StatCard ({
   icon, label, value, color, description, index
}: StatCardProps) {
   const colorClasses = {
      brand: {
         bg: 'from-brand-500/6 via-brand-400/3 to-blue-500/6',
         icon: 'from-brand-500 to-blue-500',
         text: 'text-brand-700'
      },
      success: {
         bg: 'from-green-500/6 via-green-400/3 to-emerald-500/6',
         icon: 'from-green-500 to-emerald-500',
         text: 'text-green-700'
      },
      warning: {
         bg: 'from-orange-500/6 via-amber-400/3 to-yellow-500/6',
         icon: 'from-orange-500 to-amber-500',
         text: 'text-orange-700'
      },
      danger: {
         bg: 'from-red-500/6 via-rose-400/3 to-pink-500/6',
         icon: 'from-red-500 to-rose-500',
         text: 'text-red-700'
      },
      info: {
         bg: 'from-blue-500/6 via-sky-400/3 to-cyan-500/6',
         icon: 'from-blue-500 to-sky-500',
         text: 'text-blue-700'
      }
   };

   const colors = colorClasses[color];

   return (
      <div
         className="group bg-white/95 hover:shadow-md p-4 border border-gray-200/50 rounded-lg hover:scale-[1.01] transition-all animate-fade-in-up duration-200"
         style={{
            animationDelay: `${index * 50}ms`
         }}
      >
         {/* Minimal gradient overlay */}
         <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-lg opacity-30 group-hover:opacity-50 transition-opacity duration-200`} />

         <div className="z-10 relative flex items-center gap-3">
            {/* Compact icon */}
            <div className={`flex-shrink-0 p-2 bg-gradient-to-r ${colors.icon} rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-200`}>
               <div className="drop-shadow-sm text-white">
                  {icon}
               </div>
            </div>

            {/* Compact content */}
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2 mb-1">
                  <p className={`text-2xl font-bold ${colors.text} leading-none`}>
                     {value}
                  </p>
                  <div className={`w-1.5 h-1.5 ${colors.text.replace('text-', 'bg-')} rounded-full animate-pulse`} />
               </div>
               <p className="font-medium text-gray-700 text-sm leading-tight">{label}</p>
               <p className="text-gray-500 text-xs leading-tight">{description}</p>
            </div>
         </div>
      </div>
   );
}

export default function TrackingBar () {
   const stats = getPatientStats();

   return (
      <div className="space-y-4">
         {/* Compact header */}
         <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="bg-gradient-to-r from-brand-500 to-blue-500 shadow-sm p-1.5 rounded-md">
                  <Activity size={16} className="drop-shadow-sm text-white" />
               </div>
               <div>
                  <h2 className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 font-semibold text-transparent text-lg">
                     Resumen de Pacientes
                  </h2>
                  <p className="text-gray-600 text-xs">Estado actual de los tratamientos</p>
               </div>
            </div>

            <div className="flex items-center gap-2 bg-green-50 px-3 py-1 border border-green-200/50 rounded-full">
               <div className="relative">
                  <div className="bg-green-500 rounded-full w-1.5 h-1.5 animate-pulse" />
                  <div className="absolute inset-0 bg-green-400 rounded-full w-1.5 h-1.5 animate-ping" />
               </div>
               <span className="font-medium text-green-700 text-xs">En tiempo real</span>
            </div>
         </div>

         {/* Horizontal compact stats grid */}
         <div className="gap-3 grid grid-cols-5">
            <StatCard
               icon={<Users size={18} />}
               label="Total"
               value={stats.total}
               color="brand"
               description="Pacientes"
               index={0}
            />

            <StatCard
               icon={<Activity size={18} />}
               label="En Tratamiento"
               value={stats.active}
               color="success"
               description="Activas"
               index={1}
            />

            <StatCard
               icon={<Clock size={18} />}
               label="Programadas"
               value={stats.scheduled}
               color="info"
               description="Próximas"
               index={2}
            />

            <StatCard
               icon={<AlertTriangle size={18} />}
               label="Urgencias"
               value={stats.emergency}
               color="danger"
               description="Atención"
               index={3}
            />

            <StatCard
               icon={<CheckCircle size={18} />}
               label="Completadas"
               value={stats.completed}
               color="success"
               description="Hoy"
               index={4}
            />
         </div>
      </div>
   );
}
