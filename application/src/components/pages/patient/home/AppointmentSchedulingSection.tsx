'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Plus, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { loadEventsFromStorage, CalendarEvent } from '@/data/mockData/calendarData';

interface PatientAppointment {
   id: string;
   type: string;
   title: string;
   doctorName: string;
   date: string;
   time: string;
   status: string;
   room?: string;
}

const appointmentTypeLabels = {
   consultation: 'Consulta Médica',
   hemodialysis: 'Sesión de Hemodiálisis',
   'follow-up': 'Seguimiento'
};

const statusColors = {
   scheduled: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
   'in-progress': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
   completed: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
   cancelled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
   rescheduled: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' }
};

export default function AppointmentSchedulingSection() {
   const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const router = useRouter();

   useEffect(() => {
      loadPatientAppointments();
   }, []);

   const loadPatientAppointments = () => {
      setIsLoading(true);
      
      try {
         const allEvents = loadEventsFromStorage();
         
         // Filter events for the current patient (in real app, this would use actual patient ID)
         const patientEvents = allEvents.filter((event: CalendarEvent) => 
            event.patientId === 'patient-001' || event.createdBy === 'patient'
         );

         // Transform events to appointment format
         const patientAppointments: PatientAppointment[] = patientEvents.map((event: CalendarEvent) => {
            const eventDate = new Date(event.startTime);
            return {
               id: event.id,
               type: event.type,
               title: appointmentTypeLabels[event.type as keyof typeof appointmentTypeLabels] || event.title,
               doctorName: event.doctorName || 'Doctor asignado',
               date: `${eventDate.getFullYear()}-${(eventDate.getMonth() + 1).toString().padStart(2, '0')}-${eventDate.getDate().toString().padStart(2, '0')}`,
               time: `${eventDate.getHours().toString().padStart(2, '0')}:${eventDate.getMinutes().toString().padStart(2, '0')}`,
               status: event.status,
               room: event.room
            };
         });

         // Sort by date (upcoming first)
         patientAppointments.sort((a, b) => {
            const [yearA, monthA, dayA] = a.date.split('-').map(Number);
            const [hoursA, minutesA] = a.time.split(':').map(Number);
            const dateA = new Date(yearA, monthA - 1, dayA, hoursA, minutesA);
            
            const [yearB, monthB, dayB] = b.date.split('-').map(Number);
            const [hoursB, minutesB] = b.time.split(':').map(Number);
            const dateB = new Date(yearB, monthB - 1, dayB, hoursB, minutesB);
            
            return dateA.getTime() - dateB.getTime();
         });

         setAppointments(patientAppointments);
      } catch (error) {
         console.error('Error loading patient appointments:', error);
      } finally {
         setIsLoading(false);
      }
   };

   const handleScheduleNew = () => {
      router.push('/patient/schedule');
   };

   const getUpcomingAppointments = () => {
      const now = new Date();
      return appointments.filter(apt => {
         const appointmentDate = new Date(`${apt.date}T${apt.time}`);
         return appointmentDate >= now && apt.status !== 'cancelled';
      }).slice(0, 3); // Show only next 3 appointments
   };

   const getStatusIcon = (status: string) => {
      switch (status) {
         case 'scheduled':
         case 'rescheduled':
            return <Clock className="w-4 h-4" />;
         case 'completed':
            return <CheckCircle className="w-4 h-4" />;
         case 'cancelled':
            return <AlertCircle className="w-4 h-4" />;
         default:
            return <Calendar className="w-4 h-4" />;
      }
   };

   const upcomingAppointments = getUpcomingAppointments();

   if (isLoading) {
      return (
         <div className="flex justify-center items-center py-8">
            <div className="border-green-500 border-b-2 rounded-full w-8 h-8 animate-spin" />
         </div>
      );
   }

   return (
      <div className="space-y-6">
         {/* Quick Schedule Button */}
         <div className="text-center">
            <button
               onClick={handleScheduleNew}
               className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 hover:from-green-600 to-emerald-500 hover:to-emerald-600 shadow-lg hover:shadow-xl px-6 py-3 rounded-xl font-medium text-white hover:scale-105 transition-all duration-200 transform"
            >
               <Plus className="w-5 h-5" />
               <span>Agendar Nueva Cita</span>
               <ArrowRight className="w-4 h-4" />
            </button>
         </div>

         {/* Upcoming Appointments */}
         {upcomingAppointments.length > 0 ? (
            <div>
               <h3 className="flex items-center gap-2 mb-4 font-semibold text-gray-800 text-lg">
                  <Calendar className="w-5 h-5 text-green-600" />
                  Próximas Citas
               </h3>
               
               <div className="space-y-3">
                  {upcomingAppointments.map((appointment) => {
                     const statusStyle = statusColors[appointment.status as keyof typeof statusColors] || statusColors.scheduled;
                     
                     return (
                        <div
                           key={appointment.id}
                           className="bg-white hover:shadow-md p-4 border border-gray-200 rounded-lg transition-shadow"
                        >
                           <div className="flex justify-between items-start">
                              <div className="flex-1">
                                 <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-medium text-gray-900">
                                       {appointment.title}
                                    </h4>
                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border`}>
                                       {getStatusIcon(appointment.status)}
                                       <span className="capitalize">
                                          {appointment.status === 'scheduled' ? 'Programada' :
                                           appointment.status === 'rescheduled' ? 'Reagendada' :
                                           appointment.status === 'completed' ? 'Completada' :
                                           appointment.status === 'cancelled' ? 'Cancelada' :
                                           appointment.status}
                                       </span>
                                    </div>
                                 </div>
                                 
                                 <div className="space-y-1 text-gray-600 text-sm">
                                    <div className="flex items-center gap-2">
                                       <User className="w-4 h-4" />
                                       <span>{appointment.doctorName}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                       <div className="flex items-center gap-2">
                                          <Calendar className="w-4 h-4" />
                                          <span>
                                             {new Date(appointment.date + 'T12:00:00').toLocaleDateString('es-MX', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                             })}
                                          </span>
                                       </div>
                                       
                                       <div className="flex items-center gap-2">
                                          <Clock className="w-4 h-4" />
                                          <span>{appointment.time}</span>
                                       </div>
                                    </div>
                                    
                                    {appointment.room && (
                                       <div className="text-gray-500 text-xs">
                                          📍 {appointment.room}
                                       </div>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
               
               {appointments.length > 3 && (
                  <div className="mt-4 text-center">
                     <button
                        onClick={handleScheduleNew}
                        className="font-medium text-green-600 hover:text-green-700 text-sm hover:underline"
                     >
                        Ver todas las citas →
                     </button>
                  </div>
               )}
            </div>
         ) : (
            /* No appointments message */
            <div className="py-8 text-center">
               <div className="flex justify-center items-center bg-gray-100 mx-auto mb-4 rounded-full w-16 h-16">
                  <Calendar className="w-8 h-8 text-gray-400" />
               </div>
               
               <h3 className="mb-2 font-medium text-gray-900 text-lg">
                  No tienes citas programadas
               </h3>
               
               <p className="mb-4 text-gray-600">
                  Agenda tu primera cita médica de forma rápida y sencilla
               </p>
               
               <button
                  onClick={handleScheduleNew}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors"
               >
                  <Plus className="w-4 h-4" />
                  Agendar Primera Cita
               </button>
            </div>
         )}

         {/* Quick Info */}
         <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
               <div className="flex justify-center items-center bg-blue-500 mt-0.5 rounded-full w-5 h-5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
               </div>
               <div>
                  <h4 className="mb-1 font-medium text-blue-900 text-sm">
                     Recordatorio
                  </h4>
                  <p className="text-blue-800 text-sm">
                     Puedes agendar citas las 24 horas del día. Te enviaremos recordatorios por correo electrónico 24 horas antes de tu cita.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
