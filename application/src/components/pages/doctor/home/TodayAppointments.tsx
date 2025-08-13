import {
   Clock, MapPin, Calendar, CheckCircle, Play, X
} from 'lucide-react';
import { mockTodayAppointments, type DoctorAppointment } from '@/data/mockData/doctorData';

function formatTime (time: string): string {
   return time;
}

function getStatusIcon (status: DoctorAppointment['status']) {
   const icons = {
      upcoming: <Clock size={14} />,
      'in-progress': <Play size={14} />,
      completed: <CheckCircle size={14} />,
      cancelled: <X size={14} />
   };
   return icons[status];
}

function getStatusColor (status: DoctorAppointment['status']) {
   const colors = {
      upcoming: 'text-blue-600 bg-blue-50 border-blue-200',
      'in-progress': 'text-green-600 bg-green-50 border-green-200',
      completed: 'text-gray-600 bg-gray-50 border-gray-200',
      cancelled: 'text-red-600 bg-red-50 border-red-200'
   };
   return colors[status];
}

function getTypeLabel (type: DoctorAppointment['type']) {
   const labels = {
      hemodialysis: 'Hemodiálisis',
      consultation: 'Consulta',
      'follow-up': 'Seguimiento',
      emergency: 'Urgencia'
   };
   return labels[type];
}

function getTypeColor (type: DoctorAppointment['type']) {
   const colors = {
      hemodialysis: 'text-brand-700 bg-brand-50',
      consultation: 'text-blue-700 bg-blue-50',
      'follow-up': 'text-green-700 bg-green-50',
      emergency: 'text-red-700 bg-red-50'
   };
   return colors[type];
}

interface AppointmentItemProps {
   appointment: DoctorAppointment;
   index: number;
}

function AppointmentItem ({
   appointment, index
}: AppointmentItemProps) {
   return (
      <div
         className="group bg-white/90 hover:bg-white hover:shadow-md p-4 border border-gray-200/50 rounded-xl overflow-hidden hover:scale-[1.01] transition-all animate-fade-in-up duration-300"
         style={{
            animationDelay: `${index * 100}ms`
         }}
      >
         {/* Status indicator line */}
         <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
            appointment.status === 'completed' ? 'bg-green-400' :
               appointment.status === 'in-progress' ? 'bg-blue-400' :
                  appointment.status === 'cancelled' ? 'bg-red-400' :
                     'bg-orange-400'
         }`}
         />

         <div className="z-10 relative ml-2">
            <div className="flex justify-between items-start mb-3">
               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                     <h4 className="font-semibold text-gray-800 text-lg">{appointment.patientName}</h4>
                     <span className="text-gray-500 text-sm">({appointment.patientAge} años)</span>
                  </div>

                  <div className="flex items-center gap-4 text-gray-600 text-sm">
                     <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span className="font-medium">{formatTime(appointment.time)}</span>
                     </div>
                     <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{appointment.room}</span>
                     </div>
                     <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{appointment.duration} min</span>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col items-end gap-2">
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                     {getStatusIcon(appointment.status)}
                     <span className="capitalize">{appointment.status.replace('-', ' ')}</span>
                  </div>

                  <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(appointment.type)}`}>
                     {getTypeLabel(appointment.type)}
                  </div>
               </div>
            </div>

            {appointment.notes && (
               <div className="bg-gray-50 mt-3 p-3 rounded-lg">
                  <p className="text-gray-700 text-sm leading-relaxed">{appointment.notes}</p>
               </div>
            )}

            {appointment.status === 'upcoming' && (
               <div className="flex gap-2 mt-3">
                  <button className="flex-1 bg-brand-500 hover:bg-brand-600 px-4 py-2 rounded-lg font-medium text-white text-sm transition-colors duration-200">
                     Iniciar Consulta
                  </button>
                  <button className="hover:bg-gray-50 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 text-sm transition-colors duration-200">
                     Reagendar
                  </button>
               </div>
            )}

            {appointment.status === 'in-progress' && (
               <div className="flex gap-2 mt-3">
                  <button className="flex-1 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium text-white text-sm transition-colors duration-200">
                     Finalizar
                  </button>
                  <button className="hover:bg-gray-50 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 text-sm transition-colors duration-200">
                     Agregar Nota
                  </button>
               </div>
            )}
         </div>
      </div>
   );
}

export default function TodayAppointments () {
   const upcomingAppointments = mockTodayAppointments.filter(apt => apt.status !== 'completed');
   const completedAppointments = mockTodayAppointments.filter(apt => apt.status === 'completed');

   return (
      <div className="space-y-6">
         {/* Header */}
         <div className="bg-white/90 p-6 border border-gray-200/50 rounded-xl">
            <div className="flex items-center gap-3">
               <div className="bg-gradient-to-r from-brand-600 to-blue-600 shadow-lg p-2 rounded-lg">
                  <Calendar size={20} className="drop-shadow-sm text-white" />
               </div>
               <div>
                  <h2 className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 font-bold text-transparent text-2xl">
                     Citas de Hoy
                  </h2>
                  <p className="text-gray-600 text-sm">Agenda completa del día</p>
               </div>
            </div>
         </div>

         <div className='grid grid-cols-2'>
            {/* Upcoming & In Progress */}
            {upcomingAppointments.length > 0 && (
            <div className="space-y-3">
               <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
                  <div className="bg-blue-400 rounded-full w-2 h-2 animate-pulse" />
                  Próximas y En Curso
               </h3>
               <div className="space-y-3 max-h-96 overflow-y-auto">
                  {upcomingAppointments.map((appointment, index) => (
                     <AppointmentItem key={appointment.id} appointment={appointment} index={index} />
                  ))}
               </div>
            </div>
            )}

            {/* Completed */}
            {completedAppointments.length > 0 && (
            <div className="space-y-3">
               <h3 className="flex items-center gap-2 font-semibold text-gray-600 text-lg">
                  <div className="bg-green-400 rounded-full w-2 h-2" />
                  Completadas
               </h3>
               {completedAppointments.map((appointment, index) => (
                  <AppointmentItem key={appointment.id} appointment={appointment} index={index + upcomingAppointments.length} />
               ))}
            </div>
            )}
         </div>
      </div>
   );
}
