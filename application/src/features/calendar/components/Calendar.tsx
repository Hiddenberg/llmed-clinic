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

export default function Calendar({ doctorId, userRole = 'admin' }: CalendarProps) {
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
      goToDate,
      setView,
      updateFilters,
      clearFilters,
      getFilterOptions,
      getViewTitle
   } = useCalendar({ doctorId });

   const handleEventClick = (event: CalendarEvent) => {
      // Navigate to event detail page
      const baseRoute = userRole === 'admin' ? '/admin' : '/doctor';
      router.push(`${baseRoute}/calendar/event/${event.id}`);
   };

   const handleDateClick = (date: Date) => {
      // Navigate to day view for that specific date
      const baseRoute = userRole === 'admin' ? '/admin' : '/doctor';
      const dateParam = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      router.push(`${baseRoute}/calendar/day/${dateParam}`);
   };

   const hasActiveFilters = Object.values(filters).some(arr => arr && arr.length > 0);

   if (isLoading) {
      return (
         <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500" />
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
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                     <div className="w-3 h-3 bg-brand-500 rounded-full" />
                  </div>
                  <div>
                     <p className="text-2xl font-semibold text-gray-900">{events.length}</p>
                     <p className="text-sm text-gray-500">Eventos totales</p>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                     <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <div>
                     <p className="text-2xl font-semibold text-gray-900">
                        {events.filter(e => e.type === 'hemodialysis').length}
                     </p>
                     <p className="text-sm text-gray-500">Hemodiálisis</p>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                     <div className="w-3 h-3 bg-orange-500 rounded-full" />
                  </div>
                  <div>
                     <p className="text-2xl font-semibold text-gray-900">
                        {events.filter(e => e.status === 'rescheduled' || e.status === 'cancelled').length}
                     </p>
                     <p className="text-sm text-gray-500">Reagendados</p>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                     <div className="w-3 h-3 bg-red-500 rounded-full" />
                  </div>
                  <div>
                     <p className="text-2xl font-semibold text-gray-900">
                        {events.filter(e => e.priority === 'critical' || e.priority === 'high').length}
                     </p>
                     <p className="text-sm text-gray-500">Prioridad alta</p>
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
