import {
   User, UserCheck, Settings, Calendar, Clock, TrendingUp
} from 'lucide-react';
import {
   mockActivities, type ActivityItem, getActivityTodayCount
} from '@/data/mockData/adminData';

function formatTimeAgo (timestamp: string): string {
   const diffInHours = Math.floor(Math.random() * 24);

   if (diffInHours < 1) {
      return 'Hace unos minutos';
   } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
   } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
   }
}

function getActivityIcon (type: ActivityItem['type']) {
   const icons = {
      patient: <User size={16} />,
      doctor: <UserCheck size={16} />,
      system: <Settings size={16} />,
      appointment: <Calendar size={16} />
   };

   return icons[type];
}

function getPriorityIndicator (priority: ActivityItem['priority']) {
   const indicators = {
      low:
   <div
      style={{
         animationDuration: '3s'
      }}
      className="bg-green-400 rounded-full w-2 h-2 animate-pulse"
   />,
      medium:
   <div
      className="bg-orange-400 rounded-full w-2 h-2 animate-pulse"
      style={{
         animationDuration: '2s'
      }}
   />,
      high:
   <div
      className="bg-red-400 shadow-red-400/50 shadow-sm rounded-full w-2 h-2 animate-pulse"
      style={{
         animationDuration: '1s'
      }}
   />
   };

   return indicators[priority];
}

interface ActivityItemComponentProps {
   activity: ActivityItem;
   index: number;
}

function ActivityItemComponent ({
   activity, index
}: ActivityItemComponentProps) {
   const typeColors = {
      patient: {
         bg: 'from-brand-500/6 to-blue-500/4',
         icon: 'from-brand-500 to-blue-500'
      },
      doctor: {
         bg: 'from-green-500/6 to-emerald-500/4',
         icon: 'from-green-500 to-emerald-500'
      },
      system: {
         bg: 'from-gray-500/6 to-slate-500/4',
         icon: 'from-gray-500 to-slate-500'
      },
      appointment: {
         bg: 'from-blue-500/6 to-cyan-500/4',
         icon: 'from-blue-500 to-cyan-500'
      }
   };

   const colors = typeColors[activity.type];

   return (
      <div
         className="group relative bg-white/90 hover:bg-white hover:shadow-md p-4 border border-gray-200/50 rounded-xl overflow-hidden hover:scale-[1.01] transition-all animate-fade-in-up duration-300"
         style={{
            animationDelay: `${index * 100}ms`
         }}
      >
         {/* Simplified background gradient overlay */}
         <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />

         <div className="z-10 relative flex items-start gap-4">
            {/* Simplified icon */}
            <div className={`flex items-center justify-center w-10 h-10 bg-gradient-to-r ${colors.icon} rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300`}>
               <div className="drop-shadow-sm text-white">
                  {getActivityIcon(activity.type)}
               </div>
            </div>

            <div className="flex-1 min-w-0">
               <div className="flex justify-between items-start gap-2 mb-2">
                  <div className="flex-1">
                     <h4 className="font-semibold text-gray-800 group-hover:text-gray-900 text-sm transition-colors duration-300">
                        {activity.title}
                     </h4>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-2">
                     {getPriorityIndicator(activity.priority)}
                     <span className="bg-gray-100/80 px-2 py-1 rounded-full font-medium text-gray-500 text-xs">
                        {formatTimeAgo(activity.timestamp)}
                     </span>
                  </div>
               </div>

               <p className="mt-1 text-gray-600 group-hover:text-gray-700 text-sm leading-relaxed transition-colors duration-300">
                  {activity.description}
               </p>

               {activity.relatedPerson && (
                  <div className="flex items-center gap-2 mt-3">
                     <div className="bg-gradient-to-b from-gray-300 to-gray-400 rounded-full w-1 h-4" />
                     <p className="font-medium text-gray-600 text-xs">
                        Relacionado: <span className="text-gray-800">{activity.relatedPerson}</span>
                     </p>
                  </div>
               )}
            </div>
         </div>

         {/* Bottom accent line */}
         <div className="right-0 bottom-0 left-0 absolute bg-gray-200 rounded-full h-0.5 overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${colors.icon} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500`} />
         </div>
      </div>
   );
}

export default function ActivityFeed () {
   const recentActivities = mockActivities.slice(0, 6);
   const todayCount = getActivityTodayCount();

   return (
      <div className="space-y-6">
         {/* Simplified header */}
         <div className="relative bg-white/90 p-6 border border-gray-200/50 rounded-xl">
            <div className="flex justify-between items-start">
               <div className="space-y-2">
                  <div className="flex items-center gap-3">
                     <div className="bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg p-2 rounded-lg">
                        <TrendingUp size={20} className="drop-shadow-sm text-white" />
                     </div>
                     <h2 className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 font-bold text-transparent text-2xl">
                        Actividad Reciente
                     </h2>
                  </div>
                  <p className="ml-11 text-gray-600 text-sm">Últimas actualizaciones y eventos importantes</p>
               </div>
               <button className="group flex items-center gap-2 bg-gradient-to-r from-brand-50 hover:from-brand-100 to-blue-50 hover:to-blue-100 px-4 py-2 border border-brand-200/50 rounded-lg font-medium text-brand-600 hover:text-brand-700 text-sm transition-all duration-300">
                  Ver todas
               </button>
            </div>
         </div>

         {/* Activity list with custom scrollbar */}
         <div className="space-y-3 pr-2 scrollbar-thumb-rounded-full max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
            {recentActivities.map((activity, index) => (
               <ActivityItemComponent
                  key={activity.id}
                  activity={activity}
                  index={index}
               />
            ))}
         </div>

         {/* Simplified load more button */}
         <div className="pt-4 text-center">
            <button className="group inline-flex items-center gap-3 hover:bg-gradient-to-r hover:from-brand-50 hover:to-blue-50 hover:shadow-lg px-6 py-3 border border-transparent hover:border-brand-200/50 rounded-xl font-medium text-brand-600 hover:text-brand-700 text-sm transition-all duration-300">
               <div className="bg-gradient-to-r from-brand-500 to-blue-500 p-1.5 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Clock size={14} className="text-white" />
               </div>
               <span>Cargar más actividades</span>
            </button>
         </div>

         {/* Activity stats footer */}
         <div className="bg-gradient-to-r from-gray-50/80 to-brand-50/30 p-4 border border-gray-100/50 rounded-xl">
            <div className="flex justify-between items-center text-sm">
               <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-green-500" />
                  <span className="font-medium text-gray-600">+{todayCount} actividades hoy</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                     <div className="bg-green-400 rounded-full w-1.5 h-1.5" />
                     <span className="text-gray-500 text-xs">Normal</span>
                  </div>
                  <div className="flex items-center gap-1">
                     <div className="bg-orange-400 rounded-full w-1.5 h-1.5" />
                     <span className="text-gray-500 text-xs">Media</span>
                  </div>
                  <div className="flex items-center gap-1">
                     <div className="bg-red-400 rounded-full w-1.5 h-1.5 animate-pulse" />
                     <span className="text-gray-500 text-xs">Alta</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
