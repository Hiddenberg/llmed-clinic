import {
   User, UserCheck, Settings, Calendar, AlertCircle, CheckCircle, Clock
} from 'lucide-react';
import { mockActivities, type ActivityItem } from '@/data/mockData/adminData';

function formatTimeAgo (timestamp: string): string {
   const date = new Date(timestamp);
   const now = new Date();
   const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

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
      low: <div className="bg-green-400 rounded-full w-2 h-2" />,
      medium: <div className="bg-orange-400 rounded-full w-2 h-2" />,
      high: <div className="bg-red-400 rounded-full w-2 h-2 animate-pulse" />
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
      patient: 'text-brand-600 bg-brand-50',
      doctor: 'text-green-600 bg-green-50',
      system: 'text-gray-600 bg-gray-50',
      appointment: 'text-blue-600 bg-blue-50'
   };

   return (
      <div
         className="flex items-start gap-4 bg-white hover:bg-gray-50 p-4 border border-border rounded-lg transition-colors animate-fade-in-up duration-200"
         style={{
            animationDelay: `${index * 100}ms`
         }}
      >
         <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${typeColors[activity.type]}`}>
            {getActivityIcon(activity.type)}
         </div>

         <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
               <div className="flex-1">
                  <h4 className="font-medium text-text text-sm">{activity.title}</h4>
                  <p className="mt-1 text-text-muted text-sm leading-relaxed">{activity.description}</p>
                  {activity.relatedPerson && (
                     <p className="mt-2 font-medium text-text-muted text-xs">
                        Relacionado: {activity.relatedPerson}
                     </p>
                  )}
               </div>
               <div className="flex flex-shrink-0 items-center gap-2">
                  {getPriorityIndicator(activity.priority)}
                  <span className="text-text-muted text-xs">
                     {formatTimeAgo(activity.timestamp)}
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
}

export default function ActivityFeed () {
   const recentActivities = mockActivities.slice(0, 6);

   return (
      <div className="space-y-4">
         <div className="flex justify-between items-center">
            <div>
               <h2 className="font-semibold text-text text-xl">Actividad Reciente</h2>
               <p className="text-text-muted text-sm">Últimas actualizaciones y eventos importantes</p>
            </div>
            <button className="font-medium text-brand-600 hover:text-brand-700 text-sm transition-colors duration-200">
               Ver todas
            </button>
         </div>

         <div className="space-y-2 max-h-96 overflow-y-auto">
            {recentActivities.map((activity, index) => (
               <ActivityItemComponent
                  key={activity.id}
                  activity={activity}
                  index={index}
               />
            ))}
         </div>

         <div className="pt-4 text-center">
            <button className="inline-flex items-center gap-2 hover:bg-brand-50 px-4 py-2 rounded-md font-medium text-brand-600 hover:text-brand-700 text-sm transition-colors duration-200">
               <Clock size={16} />
               Cargar más actividades
            </button>
         </div>
      </div>
   );
}
