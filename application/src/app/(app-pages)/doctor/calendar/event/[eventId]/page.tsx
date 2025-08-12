'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Stethoscope } from 'lucide-react';
import { useCalendar } from '@/features/calendar/hooks/useCalendar';
import EventDetail from '@/features/calendar/components/EventDetail';
import { CalendarEvent } from '@/data/mockData/calendarData';
import { mockDoctor } from '@/data/mockData/doctorData';
import { useState, useEffect } from 'react';

export default function DoctorEventDetailPage () {
   const params = useParams();
   const router = useRouter();
   const [event, setEvent] = useState<CalendarEvent | null>(null);

   // In a real app, this would come from authentication context
   const doctorId = '1'; // Dr. Carlos Ruiz

   const {
      getEventById, updateEvent
   } = useCalendar({
      doctorId
   });

   useEffect(() => {
      if (params.eventId && typeof params.eventId === 'string') {
         const foundEvent = getEventById(params.eventId);
         if (foundEvent) {
            setEvent(foundEvent);
         } else {
            // Event not found, redirect to calendar
            // router.push('/doctor/calendar');
         }
      }
   }, [params.eventId, getEventById, router]);

   const handleBackToCalendar = () => {
      router.push('/doctor/calendar');
   };

   const handleStatusChange = (eventId: string, status: CalendarEvent['status']) => {
      updateEvent(eventId, {
         status
      });
      // Update local state
      if (event) {
         setEvent({
            ...event,
            status
         });
      }
   };

   if (!event) {
      return (
         <div className="flex justify-center items-center min-h-screen">
            <div className="border-green-500 border-b-2 rounded-full w-12 h-12 animate-spin" />
         </div>
      );
   }

   return (
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-green-50/30 min-h-screen">
         <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
            {/* Header */}
            <div className="mb-8">
               <div className="flex items-center gap-4 mb-4">
                  <button
                     onClick={handleBackToCalendar}
                     className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-900 text-sm transition-colors"
                  >
                     <ArrowLeft className="w-4 h-4" />
                     Volver al Calendario
                  </button>

                  <div className="flex items-center gap-3">
                     <div className="flex justify-center items-center bg-green-100 rounded-full w-10 h-10">
                        <Stethoscope className="w-5 h-5 text-green-600" />
                     </div>
                     <div>
                        <h1 className="font-bold text-gray-900 text-2xl">
                           Detalles del Evento
                        </h1>
                        <p className="text-gray-600">
                           Información completa de mi evento
                        </p>
                     </div>
                  </div>
               </div>

               {/* Doctor info */}
               <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <div className="bg-green-500 rounded-full w-2 h-2" />
                  <span>{mockDoctor.name} • {mockDoctor.specialty}</span>
               </div>
            </div>

            {/* Event Detail */}
            <EventDetail
               event={event}
               userRole="doctor"
               onStatusChange={handleStatusChange}
            />
         </div>
      </div>
   );
}
