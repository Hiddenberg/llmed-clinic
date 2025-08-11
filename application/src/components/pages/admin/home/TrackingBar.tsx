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
         bg: 'from-brand-500/8 via-brand-400/4 to-blue-500/8',
         border: 'from-brand-300/40 to-blue-300/25',
         icon: 'from-brand-500 to-blue-500',
         text: 'text-brand-700',
         glow: 'shadow-brand-500/15'
      },
      success: {
         bg: 'from-green-500/8 via-green-400/4 to-emerald-500/8',
         border: 'from-green-300/40 to-emerald-300/25',
         icon: 'from-green-500 to-emerald-500',
         text: 'text-green-700',
         glow: 'shadow-green-500/15'
      },
      warning: {
         bg: 'from-orange-500/8 via-amber-400/4 to-yellow-500/8',
         border: 'from-orange-300/40 to-amber-300/25',
         icon: 'from-orange-500 to-amber-500',
         text: 'text-orange-700',
         glow: 'shadow-orange-500/15'
      },
      danger: {
         bg: 'from-red-500/8 via-rose-400/4 to-pink-500/8',
         border: 'from-red-300/40 to-rose-300/25',
         icon: 'from-red-500 to-rose-500',
         text: 'text-red-700',
         glow: 'shadow-red-500/15'
      },
      info: {
         bg: 'from-blue-500/8 via-sky-400/4 to-cyan-500/8',
         border: 'from-blue-300/40 to-sky-300/25',
         icon: 'from-blue-500 to-sky-500',
         text: 'text-blue-700',
         glow: 'shadow-blue-500/15'
      }
   };

   const colors = colorClasses[color];

   return (
      <div
         className={`group relative bg-white/90 border border-gray-200/50 rounded-xl p-6 hover:shadow-lg hover:${colors.glow} transition-all duration-300 hover:scale-[1.02] animate-fade-in-up cursor-pointer`}
         style={{
            animationDelay: `${index * 100}ms`
         }}
      >
         {/* Simplified gradient overlay */}
         <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />

         <div className="z-10 relative">
            <div className="flex justify-between items-start mb-4">
               <div className={`p-3 bg-gradient-to-r ${colors.icon} rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                  <div className="drop-shadow-sm text-white">
                     {icon}
                  </div>
               </div>
            </div>

            <div className="space-y-2">
               <p className="font-medium text-gray-600 text-sm tracking-wide">{label}</p>
               <div className="flex items-baseline gap-2">
                  <p className={`text-3xl font-bold ${colors.text} group-hover:scale-105 transition-transform duration-300`}>
                     {value}
                  </p>
                  <div className={`w-2 h-2 ${colors.text.replace('text-', 'bg-')} rounded-full animate-pulse`} />
               </div>
               <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
            </div>
         </div>
      </div>
   );
}

export default function TrackingBar () {
   const stats = getPatientStats();

   return (
      <div className="space-y-6">
         {/* Enhanced header with glass morphism */}
         <div className="relative bg-white/60 shadow-elevation-2 backdrop-blur-sm p-6 border border-white/30 rounded-xl">
            <div className="flex justify-between items-center">
               <div className="space-y-2">
                  <div className="flex items-center gap-3">
                     <div className="bg-gradient-to-r from-brand-500 to-blue-500 shadow-lg p-2 rounded-lg">
                        <Activity size={20} className="drop-shadow-sm text-white" />
                     </div>
                     <h2 className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 font-bold text-transparent text-2xl">
                        Resumen de Pacientes
                     </h2>
                  </div>
                  <p className="ml-11 text-gray-600 text-sm">
                     Estado actual de los tratamientos en la clínica
                  </p>
               </div>

               <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-sm px-4 py-2 border border-green-200/50 rounded-full">
                  <div className="relative">
                     <div className="bg-green-500 rounded-full w-2 h-2 animate-pulse" />
                     <div className="absolute inset-0 bg-green-400 rounded-full w-2 h-2 animate-ping" />
                  </div>
                  <span className="font-medium text-green-700 text-sm">En tiempo real</span>
               </div>
            </div>
         </div>

         {/* Enhanced stats grid */}
         <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard
               icon={<Users size={22} />}
               label="Total Pacientes"
               value={stats.total}
               color="brand"
               description="Pacientes registrados"
               index={0}
            />

            <StatCard
               icon={<Activity size={22} />}
               label="En Tratamiento"
               value={stats.active}
               color="success"
               description="Sesiones activas"
               index={1}
            />

            <StatCard
               icon={<Clock size={22} />}
               label="Programadas"
               value={stats.scheduled}
               color="info"
               description="Próximas sesiones"
               index={2}
            />

            <StatCard
               icon={<AlertTriangle size={22} />}
               label="Urgencias"
               value={stats.emergency}
               color="danger"
               description="Requieren atención"
               index={3}
            />

            <StatCard
               icon={<CheckCircle size={22} />}
               label="Completadas Hoy"
               value={stats.completed}
               color="success"
               description="Sesiones finalizadas"
               index={4}
            />
         </div>
      </div>
   );
}
