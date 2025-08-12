'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarEvent } from '@/data/mockData/calendarData';
import { useCalendar } from '../hooks/useCalendar';
import CalendarHeader from './CalendarHeader';
import CalendarFilters from './CalendarFilters';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';

interface CalendarProps {
   doctorId?: string;
   userRole?: 'admin' | 'doctor';
}

export default function Calendar ({
   doctorId, userRole = 'admin'
}: CalendarProps) {
   const router = useRouter();
   const [showFilters, setShowFilters] = useState(false);

   const {
      currentDate,
      view,
      events,
      filters,
      isLoading,
      goToToday,
      goToPrevious,
      goToNext,
      // goToDate,
      setView,
      updateFilters,
      clearFilters,
      getFilterOptions,
      getViewTitle
   } = useCalendar({
      doctorId
   });

   const handleEventClick = (event: CalendarEvent) => {
      // Navigate to event detail page
      const baseRoute = userRole === 'admin' ? '/admin' : '/doctor';
      router.push(`${baseRoute}/calendar/event/${event.id}`);
   };

   const handleDateClick = (date: Date) => {
      // Navigate to day view for that specific date
      const baseRoute = userRole === 'admin' ? '/admin' : '/doctor';
      const dateParam = date.toISOString()
         .split('T')[0]; // YYYY-MM-DD format
      router.push(`${baseRoute}/calendar/day/${dateParam}`);
   };

   const hasActiveFilters = Object.values(filters)
      .some(arr => arr && arr.length > 0);

   if (isLoading) {
      return (
         <div className="flex justify-center items-center min-h-[400px]">
            <div className="border-b-2 border-brand-500 rounded-full w-12 h-12 animate-spin" />
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <CalendarHeader
            title={getViewTitle()}
            view={view}
            onViewChange={setView}
            onPrevious={goToPrevious}
            onNext={goToNext}
            onToday={goToToday}
            onFilterClick={() => setShowFilters(true)}
            hasActiveFilters={hasActiveFilters}
         />

         {/* Calendar Views */}
         <div className="min-h-[600px]">
            {view === 'month' && (
               <MonthView
                  currentDate={currentDate}
                  events={events}
                  onEventClick={handleEventClick}
                  onDateClick={handleDateClick}
               />
            )}

            {view === 'week' && (
               <WeekView
                  currentDate={currentDate}
                  events={events}
                  onEventClick={handleEventClick}
                  onDateClick={handleDateClick}
               />
            )}

            {view === 'day' && (
               <DayView
                  currentDate={currentDate}
                  events={events}
                  onEventClick={handleEventClick}
               />
            )}
         </div>

         {/* Quick Stats */}
         <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
               <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-brand-100 rounded-lg w-10 h-10">
                     <div className="bg-brand-500 rounded-full w-3 h-3" />
                  </div>
                  <div>
                     <p className="font-semibold text-gray-900 text-2xl">{events.length}</p>
                     <p className="text-gray-500 text-sm">Eventos totales</p>
                  </div>
               </div>
            </div>

            <div className="bg-white p-4 border border-gray-200 rounded-lg">
               <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-green-100 rounded-lg w-10 h-10">
                     <div className="bg-green-500 rounded-full w-3 h-3" />
                  </div>
                  <div>
                     <p className="font-semibold text-gray-900 text-2xl">
                        {events.filter(e => e.type === 'hemodialysis').length}
                     </p>
                     <p className="text-gray-500 text-sm">Hemodiálisis</p>
                  </div>
               </div>
            </div>

            <div className="bg-white p-4 border border-gray-200 rounded-lg">
               <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-orange-100 rounded-lg w-10 h-10">
                     <div className="bg-orange-500 rounded-full w-3 h-3" />
                  </div>
                  <div>
                     <p className="font-semibold text-gray-900 text-2xl">
                        {events.filter(e => e.status === 'rescheduled' || e.status === 'cancelled').length}
                     </p>
                     <p className="text-gray-500 text-sm">Reagendados</p>
                  </div>
               </div>
            </div>

            <div className="bg-white p-4 border border-gray-200 rounded-lg">
               <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-red-100 rounded-lg w-10 h-10">
                     <div className="bg-red-500 rounded-full w-3 h-3" />
                  </div>
                  <div>
                     <p className="font-semibold text-gray-900 text-2xl">
                        {events.filter(e => e.priority === 'critical' || e.priority === 'high').length}
                     </p>
                     <p className="text-gray-500 text-sm">Prioridad alta</p>
                  </div>
               </div>
            </div>
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
