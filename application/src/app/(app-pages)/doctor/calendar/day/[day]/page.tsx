'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Stethoscope } from 'lucide-react';
import { useCalendar } from '@/features/calendar/hooks/useCalendar';
import DayView from '@/features/calendar/components/DayView';
import CalendarFilters from '@/features/calendar/components/CalendarFilters';
import { CalendarEvent } from '@/data/mockData/calendarData';
import { mockDoctor } from '@/data/mockData/doctorData';
import { useState, useEffect } from 'react';

export default function DoctorCalendarDayPage () {
   const params = useParams();
   const router = useRouter();
   const [showFilters, setShowFilters] = useState(false);
   const [currentDate, setCurrentDate] = useState<Date | null>(null);

   // In a real app, this would come from authentication context
   const doctorId = '1'; // Dr. Carlos Ruiz

   // Parse the date from params
   useEffect(() => {
      if (params.day && typeof params.day === 'string') {
         const date = new Date(params.day);
         if (!isNaN(date.getTime())) {
            setCurrentDate(date);
         } else {
            // Invalid date, redirect to calendar
            router.push('/doctor/calendar');
         }
      }
   }, [params.day, router]);

   const {
      events,
      filters,
      updateFilters,
      clearFilters,
      getFilterOptions
   } = useCalendar({
      doctorId
   });

   const handleEventClick = (event: CalendarEvent) => {
      router.push(`/doctor/calendar/event/${event.id}`);
   };

   const handleBackToCalendar = () => {
      router.push('/doctor/calendar');
   };

   const hasActiveFilters = Object.values(filters)
      .some(arr => arr && arr.length > 0);

   if (!currentDate) {
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
                           Vista del Día
                        </h1>
                        <p className="text-gray-600">
                           Mis eventos programados para el día seleccionado
                        </p>
                     </div>
                  </div>
               </div>

               <div className="flex justify-between items-center">
                  {/* Doctor info */}
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                     <div className="bg-green-500 rounded-full w-2 h-2" />
                     <span>{mockDoctor.name} • {mockDoctor.specialty}</span>
                  </div>

                  {/* Filter button */}
                  <button
                     onClick={() => setShowFilters(true)}
                     className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        hasActiveFilters
                           ? 'border-green-300 bg-green-50 text-green-700'
                           : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                     }`}
                  >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                     </svg>
                     <span className="font-medium text-sm">Filtros</span>
                     {hasActiveFilters && (
                        <div className="bg-green-500 rounded-full w-2 h-2" />
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
