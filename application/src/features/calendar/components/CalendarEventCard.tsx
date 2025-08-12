'use client';

import { 
   Droplets, 
   Stethoscope, 
   FileText, 
   AlertTriangle, 
   Wrench, 
   Users, 
   ClipboardCheck, 
   GraduationCap,
   Clock,
   MapPin,
   User
} from 'lucide-react';
import { CalendarEvent, eventTypeConfig, statusConfig, formatEventTime } from '@/data/mockData/calendarData';

interface CalendarEventCardProps {
   event: CalendarEvent;
   isCompact?: boolean;
   onClick?: () => void;
}

const iconMap = {
   Droplets,
   Stethoscope,
   FileText,
   AlertTriangle,
   Wrench,
   Users,
   ClipboardCheck,
   GraduationCap
};

export default function CalendarEventCard({ event, isCompact = false, onClick }: CalendarEventCardProps) {
   const typeConfig = eventTypeConfig[event.type];
   const statusConf = statusConfig[event.status];
   const IconComponent = iconMap[typeConfig.icon as keyof typeof iconMap];

   const handleClick = () => {
      if (onClick) {
         onClick();
      }
   };

   if (isCompact) {
      return (
         <button
            onClick={handleClick}
            className="w-full p-2 text-left rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all group"
            style={{ borderLeftColor: event.color, borderLeftWidth: '4px' }}
         >
            <div className="flex items-center gap-2 min-w-0">
               <div 
                  className="flex items-center justify-center rounded-full w-6 h-6 flex-shrink-0"
                  style={{ backgroundColor: event.color }}
               >
                  <IconComponent className="w-3 h-3 text-white" />
               </div>
               <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate group-hover:text-brand-600">
                     {event.title}
                  </p>
                  <p className="text-xs text-gray-500">
                     {formatEventTime(event.startTime, event.endTime)}
                  </p>
               </div>
            </div>
         </button>
      );
   }

   return (
      <button
         onClick={handleClick}
         className="w-full p-4 text-left bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all group"
      >
         {/* Header */}
         <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
               <div 
                  className="flex items-center justify-center rounded-full w-10 h-10 flex-shrink-0"
                  style={{ backgroundColor: event.color }}
               >
                  <IconComponent className="w-5 h-5 text-white" />
               </div>
               <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 truncate">
                     {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                     {typeConfig.label}
                  </p>
               </div>
            </div>

            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConf.badgeColor}`}>
               {statusConf.label}
            </span>
         </div>

         {/* Details */}
         <div className="space-y-2">
            {/* Time */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
               <Clock className="w-4 h-4" />
               <span>{formatEventTime(event.startTime, event.endTime)}</span>
            </div>

            {/* Location */}
            {event.room && (
               <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{event.room}</span>
               </div>
            )}

            {/* Patient/Doctor */}
            {(event.patientName || event.doctorName) && (
               <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>
                     {event.patientName && event.doctorName 
                        ? `${event.patientName} - ${event.doctorName}`
                        : event.patientName || event.doctorName
                     }
                  </span>
               </div>
            )}

            {/* Description */}
            {event.description && (
               <p className="text-sm text-gray-600 line-clamp-2">
                  {event.description}
               </p>
            )}

            {/* Priority indicator */}
            {event.priority === 'high' || event.priority === 'critical' && (
               <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                     event.priority === 'critical' ? 'bg-red-500' : 'bg-orange-500'
                  }`} />
                  <span className="text-xs font-medium text-gray-600">
                     Prioridad {event.priority === 'critical' ? 'crítica' : 'alta'}
                  </span>
               </div>
            )}
         </div>
      </button>
   );
}
