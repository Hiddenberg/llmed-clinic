import {
   User, AlertTriangle, Pill, FileText, Calendar, CheckCircle
} from 'lucide-react';
import { mockDoctorActivities, type DoctorActivity } from '@/data/mockData/doctorData';

function formatTimeAgo (): string {
   const diffInHours = Math.floor(Math.random() * 300);

   if (diffInHours < 1) {
      return 'Hace unos minutos';
   } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
   } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
   }
}

function getActivityIcon (type: DoctorActivity['type']) {
   const icons = {
      appointment: <Calendar size={16} />,
      'patient-update': <User size={16} />,
      medication: <Pill size={16} />,
      alert: <AlertTriangle size={16} />,
      note: <FileText size={16} />
   };

   return icons[type];
}

function getPriorityIndicator (priority: DoctorActivity['priority']) {
   const indicators = {
      low:
   <div className="bg-green-400 rounded-full w-2 h-2 animate-pulse"
      style={{
         animationDuration: '3s'
      }}
   />,
      medium:
   <div className="bg-orange-400 rounded-full w-2 h-2 animate-pulse"
      style={{
         animationDuration: '2s'
      }}
   />,
      high:
   <div className="bg-red-400 shadow-red-400/50 shadow-sm rounded-full w-2 h-2 animate-pulse"
      style={{
         animationDuration: '1s'
      }}
   />
   };

   return indicators[priority];
}

interface ActivityItemComponentProps {
   activity: DoctorActivity;
   index: number;
}

function ActivityItemComponent ({
   activity, index
}: ActivityItemComponentProps) {
   const typeColors = {
      appointment: {
         bg: 'from-blue-500/6 to-cyan-500/4',
         icon: 'from-blue-500 to-cyan-500'
      },
      'patient-update': {
         bg: 'from-brand-500/6 to-blue-500/4',
         icon: 'from-brand-500 to-blue-500'
      },
      medication: {
         bg: 'from-purple-500/6 to-pink-500/4',
         icon: 'from-purple-500 to-pink-500'
      },
      alert: {
         bg: 'from-red-500/6 to-orange-500/4',
         icon: 'from-red-500 to-orange-500'
      },
      note: {
         bg: 'from-gray-500/6 to-slate-500/4',
         icon: 'from-gray-500 to-slate-500'
      }
   };

   const colors = typeColors[activity.type];

   return (
      <div
         className="group bg-white/90 hover:bg-white hover:shadow-md p-4 border border-gray-200/50 rounded-xl overflow-hidden hover:scale-[1.01] transition-all animate-fade-in-up duration-300"
         style={{
            animationDelay: `${index * 100}ms`
         }}
      >
         {/* Priority indicator line */}
         <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
            activity.priority === 'high' ? 'bg-red-400' :
               activity.priority === 'medium' ? 'bg-orange-400' :
                  'bg-green-400'
         }`}
         />

         {/* Simplified background gradient overlay */}
         <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />

         <div className="z-10 relative flex items-start gap-4 ml-2">
            {/* Simplified icon */}
            <div className={`flex items-center justify-center w-10 h-10 bg-gradient-to-r ${colors.icon} rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300`}>
               <div className="drop-shadow-sm text-white">
                  {getActivityIcon(activity.type)}
               </div>
            </div>

            <div className="flex-1 min-w-0">
               <div className="flex justify-between items-start gap-2 mb-2">
                  <div className="flex-1">
                     <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800 group-hover:text-gray-900 text-sm transition-colors duration-300">
                           {activity.title}
                        </h4>
                        {activity.actionRequired && (
                           <div className="bg-red-100 px-2 py-0.5 rounded-full font-medium text-red-700 text-xs">
                              Acción requerida
                           </div>
                        )}
                     </div>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-2">
                     {getPriorityIndicator(activity.priority)}
                     <span className="bg-gray-100/80 px-2 py-1 rounded-full font-medium text-gray-500 text-xs">
                        {formatTimeAgo()}
                     </span>
                  </div>
               </div>

               <p className="mt-1 text-gray-600 group-hover:text-gray-700 text-sm leading-relaxed transition-colors duration-300">
                  {activity.description}
               </p>

               {activity.patientName && (
                  <div className="flex items-center gap-2 mt-3">
                     <div className="bg-gradient-to-b from-gray-300 to-gray-400 rounded-full w-1 h-4" />
                     <p className="font-medium text-gray-600 text-xs">
                        Paciente: <span className="text-gray-800">{activity.patientName}</span>
                     </p>
                  </div>
               )}

               {activity.actionRequired && (
                  <div className="flex gap-2 mt-3">
                     <button className="bg-brand-500 hover:bg-brand-600 px-3 py-1.5 rounded-md font-medium text-white text-xs transition-colors duration-200">
                        Revisar
                     </button>
                     <button className="hover:bg-gray-50 px-3 py-1.5 border border-gray-300 rounded-md font-medium text-gray-700 text-xs transition-colors duration-200">
                        Más tarde
                     </button>
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

export default function DoctorActivityFeed () {
   const recentActivities = mockDoctorActivities.slice(0, 8);
   const highPriorityActivities = recentActivities.filter(activity => activity.priority === 'high');

   return (
      <div className="space-y-6">
         {/* Header */}
         <div className="bg-white/90 p-6 border border-gray-200/50 rounded-xl">
            <div className="flex justify-between items-start">
               <div className="space-y-2">
                  <div className="flex items-center gap-3">
                     <div className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg p-2 rounded-lg">
                        <CheckCircle size={20} className="drop-shadow-sm text-white" />
                     </div>
                     <h2 className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 font-bold text-transparent text-2xl">
                        Actividad Médica
                     </h2>
                  </div>
                  <p className="ml-11 text-gray-600 text-sm">Actualizaciones y alertas de pacientes</p>
               </div>
               {/* <button className="group flex items-center gap-2 bg-gradient-to-r from-purple-50 hover:from-purple-100 to-pink-50 hover:to-pink-100 px-4 py-2 border border-purple-200/50 rounded-lg font-medium text-purple-600 hover:text-purple-700 text-sm transition-all duration-300">
                  Ver historial completo
               </button> */}
            </div>
         </div>

         {/* High Priority Alerts */}
         {highPriorityActivities.length > 0 && (
            <div className="bg-red-50 p-4 border border-red-200/50 rounded-xl">
               <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={16} className="text-red-600" />
                  <h3 className="font-semibold text-red-800 text-sm">Alertas de Alta Prioridad</h3>
                  <div className="bg-red-200 px-2 py-0.5 rounded-full font-medium text-red-800 text-xs">
                     {highPriorityActivities.length}
                  </div>
               </div>
               <div className="space-y-2">
                  {highPriorityActivities.map((activity) => (
                     <div key={activity.id} className="bg-white p-3 rounded-lg text-sm">
                        <div className="flex justify-between items-start">
                           <div>
                              <p className="font-medium text-red-800">{activity.title}</p>
                              <p className="mt-1 text-red-600 text-xs">{activity.patientName}</p>
                           </div>
                           <button className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded font-medium text-white text-xs transition-colors">
                              Atender
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {/* Activity list */}
         <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentActivities.map((activity, index) => (
               <ActivityItemComponent
                  key={activity.id}
                  activity={activity}
                  index={index}
               />
            ))}
         </div>

         {/* Load more button */}
         {/* <div className="pt-4 text-center">
            <button className="group inline-flex items-center gap-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-lg px-6 py-3 border hover:border-purple-200/50 border-transparent rounded-xl font-medium text-purple-600 hover:text-purple-700 text-sm transition-all duration-300">
               <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1.5 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Clock size={14} className="text-white" />
               </div>
               <span>Ver más actividades</span>
            </button>
         </div> */}

         {/* Activity stats footer */}
         <div className="bg-gradient-to-r from-gray-50/80 to-purple-50/30 p-4 border border-gray-100/50 rounded-xl">
            <div className="flex justify-between items-center text-sm">
               <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  <span className="font-medium text-gray-600">+{mockDoctorActivities.length} actividades hoy</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                     <div className="bg-green-400 rounded-full w-1.5 h-1.5" />
                     <span className="text-gray-500 text-xs">Baja</span>
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
