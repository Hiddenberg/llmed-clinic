import {
   AlertTriangle, AlertCircle, Info, MapPin, Clock, Bell
} from 'lucide-react';
import {
   mockPriorityAlerts, getAlertStats, type PriorityAlert
} from '@/data/mockData/adminData';

function formatTimeAgo (): string {
   const diffInMinutes = Math.floor(Math.random() * 60);

   if (diffInMinutes < 1) {
      return 'Ahora mismo';
   } else if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} min`;
   } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `Hace ${diffInHours}h`;
   }
}

function AlertItem ({
   alert, index
}: { alert: PriorityAlert; index: number }) {
   const alertConfig = {
      critical: {
         bg: 'from-red-500/8 to-rose-500/6',
         icon: <AlertTriangle size={16} />,
         iconBg: 'from-red-500 to-rose-500',
         dot: 'bg-red-500',
         text: 'text-red-700',
         border: 'border-red-200/50'
      },
      warning: {
         bg: 'from-orange-500/8 to-amber-500/6',
         icon: <AlertCircle size={16} />,
         iconBg: 'from-orange-500 to-amber-500',
         dot: 'bg-orange-500',
         text: 'text-orange-700',
         border: 'border-orange-200/50'
      },
      info: {
         bg: 'from-blue-500/8 to-cyan-500/6',
         icon: <Info size={16} />,
         iconBg: 'from-blue-500 to-cyan-500',
         dot: 'bg-blue-500',
         text: 'text-blue-700',
         border: 'border-blue-200/50'
      }
   };

   const config = alertConfig[alert.type];

   return (
      <div
         className={`group bg-white/90 hover:bg-white border ${config.border} rounded-lg p-3 transition-all duration-200 hover:scale-[1.01] hover:shadow-md animate-fade-in-up overflow-hidden`}
         style={{
            animationDelay: `${index * 100}ms`
         }}
      >
         {/* Gradient overlay */}
         <div className={`absolute inset-0 bg-gradient-to-br ${config.bg} rounded-lg opacity-40 group-hover:opacity-60 transition-opacity duration-200`} />

         <div className="z-10 relative">
            <div className="flex items-start gap-3">
               {/* Alert icon */}
               <div className={`flex-shrink-0 p-1.5 bg-gradient-to-r ${config.iconBg} rounded-lg shadow-sm`}>
                  <div className="drop-shadow-sm text-white">
                     {config.icon}
                  </div>
               </div>

               {/* Alert content */}
               <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                     <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-800 text-sm leading-tight">{alert.title}</h4>
                        {alert.actionRequired && (
                           <div className={`w-1.5 h-1.5 ${config.dot} rounded-full animate-pulse`} />
                        )}
                     </div>
                     <span className="flex-shrink-0 bg-gray-100/80 px-2 py-0.5 rounded-full font-medium text-gray-500 text-xs">
                        {formatTimeAgo()}
                     </span>
                  </div>

                  <p className="mb-2 text-gray-600 text-xs leading-relaxed">{alert.description}</p>

                  <div className="flex justify-between items-center">
                     {alert.location && (
                        <div className="flex items-center gap-1">
                           <MapPin size={10} className="text-gray-400" />
                           <span className="text-gray-500 text-xs">{alert.location}</span>
                        </div>
                     )}

                     {alert.actionRequired && (
                        <button className={`px-2 py-1 ${config.text} bg-white/80 hover:bg-white rounded text-xs font-medium transition-colors duration-200 border ${config.border}`}>
                           Atender
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default function PriorityAlerts () {
   const stats = getAlertStats();
   const recentAlerts = mockPriorityAlerts.slice(0, 6);

   return (
      <div className="space-y-4">
         {/* Header with alert stats */}
         <div className="bg-white/90 p-4 border border-gray-200/50 rounded-xl">
            <div className="flex justify-between items-center mb-3">
               <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 shadow-lg p-2 rounded-lg">
                     <Bell size={18} className="drop-shadow-sm text-white" />
                  </div>
                  <div>
                     <h2 className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 font-semibold text-transparent text-lg">
                        Alertas Prioritarias
                     </h2>
                     <p className="text-gray-600 text-xs">Requieren atención inmediata</p>
                  </div>
               </div>

               <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                     <div className="bg-red-500 rounded-full w-2 h-2 animate-pulse" />
                     <span className="text-gray-600">{stats.critical} críticas</span>
                  </div>
                  <div className="flex items-center gap-1">
                     <div className="bg-orange-500 rounded-full w-2 h-2" />
                     <span className="text-gray-600">{stats.warnings} avisos</span>
                  </div>
               </div>
            </div>

            {/* Quick action stats */}
            <div className="gap-4 grid grid-cols-2">
               <div className="bg-gradient-to-br from-red-500/6 to-rose-500/4 p-3 rounded-lg text-center">
                  <p className="font-bold text-red-700 text-xl">{stats.actionRequired}</p>
                  <p className="text-gray-600 text-xs">Requieren acción</p>
               </div>
               <div className="bg-gradient-to-br from-blue-500/6 to-cyan-500/4 p-3 rounded-lg text-center">
                  <p className="font-bold text-blue-700 text-xl">{stats.total}</p>
                  <p className="text-gray-600 text-xs">Total alertas</p>
               </div>
            </div>
         </div>

         {/* Alerts list */}
         <div className="space-y-2 pr-2 scrollbar-thumb-rounded-full max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
            {recentAlerts.map((alert, index) => (
               <AlertItem
                  key={alert.id}
                  alert={alert}
                  index={index}
               />
            ))}
         </div>

         {/* Actions footer */}
         <div className="flex justify-between items-center pt-2 border-gray-200/50 border-t">
            <button className="inline-flex items-center gap-2 hover:bg-gray-50 px-3 py-1.5 rounded-lg font-medium text-gray-600 hover:text-gray-700 text-xs transition-colors duration-200 !cursor-default">
               <Clock size={12} />
               Ver historial
            </button>

            <button className="inline-flex items-center gap-2 hover:bg-red-50 px-3 py-1.5 rounded-lg font-medium text-red-600 hover:text-red-700 text-xs transition-colors duration-200 !cursor-default">
               <AlertTriangle size={12} />
               Marcar todas como leídas
            </button>
         </div>
      </div>
   );
}
