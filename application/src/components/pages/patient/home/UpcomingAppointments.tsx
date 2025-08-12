import {
   Calendar, Clock, MapPin, User, FileText, ChevronRight
} from 'lucide-react';
import { mockUpcomingAppointments } from '@/data/mockData/patientData';

// Helper function to format appointment type
function getAppointmentTypeInfo (type: string) {
   const types = {
      'hemodialysis': {
         label: 'Hemodiálisis',
         color: 'from-brand-500 to-blue-500',
         bgColor: 'bg-brand-50',
         textColor: 'text-brand-700'
      },
      'consultation': {
         label: 'Consulta',
         color: 'from-green-500 to-emerald-500',
         bgColor: 'bg-green-50',
         textColor: 'text-green-700'
      },
      'follow-up': {
         label: 'Seguimiento',
         color: 'from-orange-500 to-amber-500',
         bgColor: 'bg-orange-50',
         textColor: 'text-orange-700'
      },
      'lab-work': {
         label: 'Laboratorio',
         color: 'from-purple-500 to-pink-500',
         bgColor: 'bg-purple-50',
         textColor: 'text-purple-700'
      }
   };
   return types[type as keyof typeof types] || types.consultation;
}

// Helper function to format date
function formatAppointmentDate (date: string) {
   const appointmentDate = new Date(date);
   const today = new Date();
   const tomorrow = new Date(today);
   tomorrow.setDate(tomorrow.getDate() + 1);

   if (appointmentDate.toDateString() === today.toDateString()) {
      return 'Hoy';
   } else if (appointmentDate.toDateString() === tomorrow.toDateString()) {
      return 'Mañana';
   } else {
      return appointmentDate.toLocaleDateString('es-ES', {
         weekday: 'short',
         day: 'numeric',
         month: 'short'
      });
   }
}

export default function UpcomingAppointments () {
   if (mockUpcomingAppointments.length === 0) {
      return (
         <div className="flex flex-col justify-center items-center py-8 text-center">
            <div className="flex justify-center items-center bg-gray-100 mb-4 rounded-full w-16 h-16 text-gray-400">
               <Calendar size={24} />
            </div>
            <p className="font-medium text-gray-600">No tienes citas programadas</p>
            <p className="mt-1 text-gray-400 text-sm">Agenda una nueva cita cuando lo necesites</p>
         </div>
      );
   }

   return (
      <div className="space-y-3">
         {mockUpcomingAppointments.slice(0, 3).map((appointment) => {
            const typeInfo = getAppointmentTypeInfo(appointment.type);
            const dateFormatted = formatAppointmentDate(appointment.date);

            return (
               <div
                  key={appointment.id}
                  className="group bg-white hover:bg-gray-50/80 p-4 border border-gray-200 hover:border-brand-200 rounded-xl transition-all duration-200"
               >
                  <div className="flex items-start gap-4">
                     {/* Date section */}
                     <div className="flex flex-col items-center min-w-[60px]">
                        <div className={`flex items-center justify-center bg-gradient-to-r ${typeInfo.color} rounded-lg w-12 h-12 text-white mb-1`}>
                           <Calendar size={20} />
                        </div>
                        <span className="font-semibold text-gray-700 text-xs text-center">{dateFormatted}</span>
                     </div>

                     {/* Appointment details */}
                     <div className="flex-1 min-w-0">
                        <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-2 mb-3">
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                 <span className={`px-2 py-1 ${typeInfo.bgColor} ${typeInfo.textColor} rounded-md text-xs font-medium`}>
                                    {typeInfo.label}
                                 </span>
                                 <span className="flex items-center gap-1 text-gray-500 text-xs">
                                    <Clock size={12} />
                                    {appointment.time}
                                 </span>
                              </div>
                              <h3 className="font-semibold text-gray-800 text-sm">{appointment.duration} minutos</h3>
                           </div>
                        </div>

                        <div className="space-y-2 text-xs">
                           <div className="flex items-center gap-2 text-gray-600">
                              <User size={12} />
                              <span>{appointment.doctor}</span>
                           </div>
                           
                           <div className="flex items-center gap-2 text-gray-600">
                              <MapPin size={12} />
                              <span>{appointment.location}</span>
                           </div>

                           {appointment.notes && (
                              <div className="flex items-start gap-2 text-gray-600">
                                 <FileText size={12} className="flex-shrink-0 mt-0.5" />
                                 <span className="text-xs leading-relaxed">{appointment.notes}</span>
                              </div>
                           )}
                        </div>
                     </div>

                     {/* Action arrow */}
                     <div className="flex items-center">
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-brand-500 transition-colors" />
                     </div>
                  </div>
               </div>
            );
         })}

         {mockUpcomingAppointments.length > 3 && (
            <button className="flex justify-center items-center gap-2 bg-gray-50 hover:bg-gray-100 p-3 border border-gray-200 hover:border-brand-200 rounded-xl w-full text-gray-600 hover:text-brand-600 text-sm transition-all duration-200">
               <Calendar size={16} />
               <span>Ver todas las citas ({mockUpcomingAppointments.length})</span>
               <ChevronRight size={14} />
            </button>
         )}
      </div>
   );
}
