'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { useCalendar } from '@/features/calendar/hooks/useCalendar';
import EventDetail from '@/features/calendar/components/EventDetail';
import { CalendarEvent } from '@/data/mockData/calendarData';
import { useState, useEffect } from 'react';

export default function AdminEventDetailPage () {
   const params = useParams();
   const router = useRouter();
   const [event, setEvent] = useState<CalendarEvent | null>(null);

   const {
      getEventById, updateEvent, deleteEvent
   } = useCalendar();

   useEffect(() => {
      if (params.eventId && typeof params.eventId === 'string') {
         const foundEvent = getEventById(params.eventId);
         if (foundEvent) {
            setEvent(foundEvent);
         } else {
            // Event not found, redirect to calendar
            // router.push('/admin/calendar');
         }
      }
   }, [params.eventId, getEventById, router]);

   const handleBackToCalendar = () => {
      router.push('/admin/calendar');
   };

   const handleEdit = (eventToEdit: CalendarEvent) => {
      // In a real app, this would open an edit modal or navigate to edit page
      console.log('Edit event:', eventToEdit);
      // For now, we'll just show an alert
      alert('Funcionalidad de edición próximamente disponible');
   };

   const handleDelete = (eventId: string) => {
      if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
         deleteEvent(eventId);
         router.push('/admin/calendar');
      }
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
            <div className="border-b-2 border-brand-500 rounded-full w-12 h-12 animate-spin" />
         </div>
      );
   }

   return (
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 min-h-screen">
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
                     <div className="flex justify-center items-center bg-brand-100 rounded-full w-10 h-10">
                        <CalendarIcon className="w-5 h-5 text-brand-600" />
                     </div>
                     <div>
                        <h1 className="font-bold text-gray-900 text-2xl">
                           Detalles del Evento
                        </h1>
                        <p className="text-gray-600">
                           Información completa del evento seleccionado
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Event Detail */}
            <EventDetail
               event={event}
               userRole="admin"
               onEdit={handleEdit}
               onDelete={handleDelete}
               onStatusChange={handleStatusChange}
            />
         </div>
      </div>
   );
}
