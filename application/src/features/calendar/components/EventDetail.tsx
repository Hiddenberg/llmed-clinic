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
   User,
   Calendar,
   Edit,
   Trash2,
   CheckCircle,
   XCircle,
   RotateCcw
} from 'lucide-react';
import {
   CalendarEvent,
   eventTypeConfig,
   statusConfig,
   priorityConfig,
   formatEventTime,
   getEventDuration
} from '@/data/mockData/calendarData';

interface EventDetailProps {
   event: CalendarEvent;
   userRole?: 'admin' | 'doctor';
   onEdit?: (event: CalendarEvent) => void;
   onDelete?: (eventId: string) => void;
   onStatusChange?: (eventId: string, status: CalendarEvent['status']) => void;
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

export default function EventDetail ({
   event,
   userRole = 'admin',
   onEdit,
   onDelete,
   onStatusChange
}: EventDetailProps) {
   const typeConfig = eventTypeConfig[event.type];
   const statusConf = statusConfig[event.status];
   const priorityConf = priorityConfig[event.priority];
   const IconComponent = iconMap[typeConfig.icon as keyof typeof iconMap];

   const duration = getEventDuration(event.startTime, event.endTime);
   const eventDate = new Date(event.startTime);
   const isToday = eventDate.toDateString() === new Date()
      .toDateString();
   const isPast = eventDate < new Date();

   const handleStatusChange = (newStatus: CalendarEvent['status']) => {
      if (onStatusChange) {
         onStatusChange(event.id, newStatus);
      }
   };

   return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
         {/* Header */}
         <div className="p-6 border-gray-200 border-b"
            style={{
               backgroundColor: `${event.color}10`
            }}
         >
            <div className="flex justify-between items-start gap-4">
               <div className="flex items-start gap-4">
                  <div
                     className="flex flex-shrink-0 justify-center items-center rounded-full w-16 h-16"
                     style={{
                        backgroundColor: event.color
                     }}
                  >
                     <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                     <h1 className="mb-2 font-bold text-gray-900 text-2xl">
                        {event.title}
                     </h1>
                     <div className="flex flex-wrap items-center gap-3">
                        <span className="font-medium text-gray-700 text-lg">
                           {typeConfig.label}
                        </span>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusConf.badgeColor}`}>
                           {statusConf.label}
                        </span>
                        {(event.priority === 'high' || event.priority === 'critical') && (
                           <span className={`px-3 py-1 text-sm font-medium rounded-full ${priorityConf.badgeColor}`}>
                              {priorityConf.label}
                           </span>
                        )}
                        {isToday && (
                           <span className="bg-brand-100 px-3 py-1 rounded-full font-medium text-brand-700 text-sm">
                              Hoy
                           </span>
                        )}
                     </div>
                  </div>
               </div>

               {/* Action buttons */}
               <div className="flex items-center gap-2">
                  {userRole === 'admin' && (
                     <>
                        {onEdit && (
                           <button
                              onClick={() => onEdit(event)}
                              className="hover:bg-brand-50 p-2 rounded-lg text-gray-600 hover:text-brand-600 transition-colors"
                              title="Editar evento"
                           >
                              <Edit className="w-5 h-5" />
                           </button>
                        )}
                        {onDelete && (
                           <button
                              onClick={() => onDelete(event.id)}
                              className="hover:bg-red-50 p-2 rounded-lg text-gray-600 hover:text-red-600 transition-colors"
                              title="Eliminar evento"
                           >
                              <Trash2 className="w-5 h-5" />
                           </button>
                        )}
                     </>
                  )}
               </div>
            </div>
         </div>

         {/* Content */}
         <div className="p-6">
            <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
               {/* Main Details */}
               <div className="space-y-6 lg:col-span-2">
                  {/* Date and Time */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="mb-3 font-semibold text-gray-900 text-lg">
                        Fecha y Hora
                     </h3>
                     <div className="space-y-3">
                        <div className="flex items-center gap-3">
                           <Calendar className="w-5 h-5 text-gray-500" />
                           <span className="text-gray-900">
                              {eventDate.toLocaleDateString('es-ES', {
                                 weekday: 'long',
                                 year: 'numeric',
                                 month: 'long',
                                 day: 'numeric'
                              })}
                           </span>
                        </div>
                        <div className="flex items-center gap-3">
                           <Clock className="w-5 h-5 text-gray-500" />
                           <span className="text-gray-900">
                              {formatEventTime(event.startTime, event.endTime)} ({duration} minutos)
                           </span>
                        </div>
                     </div>
                  </div>

                  {/* Location and Participants */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="mb-3 font-semibold text-gray-900 text-lg">
                        Ubicación y Participantes
                     </h3>
                     <div className="space-y-3">
                        {event.room && (
                           <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-gray-500" />
                              <span className="text-gray-900">{event.room}</span>
                           </div>
                        )}
                        {event.patientName && (
                           <div className="flex items-center gap-3">
                              <User className="w-5 h-5 text-gray-500" />
                              <span className="text-gray-900">
                                 Paciente: {event.patientName}
                              </span>
                           </div>
                        )}
                        {event.doctorName && (
                           <div className="flex items-center gap-3">
                              <Stethoscope className="w-5 h-5 text-gray-500" />
                              <span className="text-gray-900">
                                 Doctor: {event.doctorName}
                              </span>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Description */}
                  {event.description && (
                     <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="mb-3 font-semibold text-gray-900 text-lg">
                           Descripción
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                           {event.description}
                        </p>
                     </div>
                  )}

                  {/* Notes */}
                  {event.notes && (
                     <div className="bg-yellow-50 p-4 border border-yellow-200 rounded-lg">
                        <h3 className="mb-3 font-semibold text-gray-900 text-lg">
                           Notas Importantes
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                           {event.notes}
                        </p>
                     </div>
                  )}
               </div>

               {/* Sidebar */}
               <div className="space-y-6">
                  {/* Quick Actions */}
                  {!isPast && onStatusChange && (
                     <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="mb-3 font-semibold text-gray-900 text-lg">
                           Cambiar Estado
                        </h3>
                        <div className="space-y-2">
                           {event.status !== 'completed' && (
                              <button
                                 onClick={() => handleStatusChange('completed')}
                                 className="flex items-center gap-2 bg-green-50 hover:bg-green-100 px-3 py-2 border border-green-200 rounded-lg w-full font-medium text-green-700 text-sm transition-colors"
                              >
                                 <CheckCircle className="w-4 h-4" />
                                 Marcar como Completado
                              </button>
                           )}
                           {event.status !== 'cancelled' && (
                              <button
                                 onClick={() => handleStatusChange('cancelled')}
                                 className="flex items-center gap-2 bg-red-50 hover:bg-red-100 px-3 py-2 border border-red-200 rounded-lg w-full font-medium text-red-700 text-sm transition-colors"
                              >
                                 <XCircle className="w-4 h-4" />
                                 Cancelar
                              </button>
                           )}
                           {event.status !== 'rescheduled' && (
                              <button
                                 onClick={() => handleStatusChange('rescheduled')}
                                 className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 px-3 py-2 border border-amber-200 rounded-lg w-full font-medium text-amber-700 text-sm transition-colors"
                              >
                                 <RotateCcw className="w-4 h-4" />
                                 Reagendar
                              </button>
                           )}
                        </div>
                     </div>
                  )}

                  {/* Equipment */}
                  {event.equipment && event.equipment.length > 0 && (
                     <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="mb-3 font-semibold text-gray-900 text-lg">
                           Equipos Requeridos
                        </h3>
                        <div className="space-y-2">
                           {event.equipment.map((equipment, index) => (
                              <div key={index} className="flex items-center gap-2">
                                 <div className="bg-brand-500 rounded-full w-2 h-2" />
                                 <span className="text-gray-700">{equipment}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* Metadata */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="mb-3 font-semibold text-gray-900 text-lg">
                        Información del Evento
                     </h3>
                     <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                           <span className="text-gray-500">Creado por:</span>
                           <span className="text-gray-900 capitalize">{event.createdBy}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-500">Fecha de creación:</span>
                           <span className="text-gray-900">
                              {new Date(event.createdAt)
                                 .toLocaleDateString('es-ES')}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-500">Última actualización:</span>
                           <span className="text-gray-900">
                              {new Date(event.updatedAt)
                                 .toLocaleDateString('es-ES')}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
