'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { useCalendar } from '@/features/calendar/hooks/useCalendar';
import DayView from '@/features/calendar/components/DayView';
import CalendarFilters from '@/features/calendar/components/CalendarFilters';
import { CalendarEvent } from '@/data/mockData/calendarData';
import { useState, useEffect } from 'react';
import { tzDate } from '@formkit/tempo';

export default function AdminCalendarDayPage () {
   const params = useParams();
   const router = useRouter();
   const [showFilters, setShowFilters] = useState(false);
   const [currentDate, setCurrentDate] = useState<Date | null>(null);

   // Parse the date from params
   useEffect(() => {
      if (params.day && typeof params.day === 'string') {
         const date = tzDate(params.day, 'America/Mexico_City');
         if (!isNaN(date.getTime())) {
            setCurrentDate(date);
         } else {
            // Invalid date, redirect to calendar
            router.push('/admin/calendar');
         }
      }
   }, [params.day, router]);

   const {
      events,
      filters,
      updateFilters,
      clearFilters,
      getFilterOptions
   } = useCalendar();

   const handleEventClick = (event: CalendarEvent) => {
      router.push(`/admin/calendar/event/${event.id}`);
   };

   const handleBackToCalendar = () => {
      router.push('/admin/calendar');
   };

   const hasActiveFilters = Object.values(filters)
      .some(arr => arr && arr.length > 0);

   if (!currentDate) {
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
                           Vista del Día
                        </h1>
                        <p className="text-gray-600">
                           Eventos programados para el día seleccionado
                        </p>
                     </div>
                  </div>
               </div>

               {/* Filter button */}
               <div className="flex justify-end">
                  <button
                     onClick={() => setShowFilters(true)}
                     className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        hasActiveFilters
                           ? 'border-brand-300 bg-brand-50 text-brand-700'
                           : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                     }`}
                  >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                     </svg>
                     <span className="font-medium text-sm">Filtros</span>
                     {hasActiveFilters && (
                        <div className="bg-brand-500 rounded-full w-2 h-2" />
                     )}
                  </button>
               </div>
            </div>

            {/* Day View */}
            <DayView
               currentDate={currentDate}
               events={events}
               onEventClick={handleEventClick}
            />
         </div>

         {/* Filters Modal */}
         {showFilters && (
            <CalendarFilters
               filters={filters}
               onFiltersChange={updateFilters}
               onClearFilters={clearFilters}
               onClose={() => setShowFilters(false)}
               filterOptions={getFilterOptions()}
            />
         )}
      </div>
   );
}
