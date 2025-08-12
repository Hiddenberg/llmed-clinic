'use client';

import { ChevronLeft, ChevronRight, Calendar, Filter } from 'lucide-react';
import { CalendarView } from '../hooks/useCalendar';

interface CalendarHeaderProps {
   title: string;
   view: CalendarView;
   onViewChange: (view: CalendarView) => void;
   onPrevious: () => void;
   onNext: () => void;
   onToday: () => void;
   onFilterClick: () => void;
   hasActiveFilters: boolean;
}

export default function CalendarHeader({
   title,
   view,
   onViewChange,
   onPrevious,
   onNext,
   onToday,
   onFilterClick,
   hasActiveFilters
}: CalendarHeaderProps) {
   const viewButtons: { value: CalendarView; label: string }[] = [
      { value: 'month', label: 'Mes' },
      { value: 'week', label: 'Semana' },
      { value: 'day', label: 'Día' }
   ];

   return (
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200 sm:flex-row sm:items-center sm:justify-between">
         {/* Title and Navigation */}
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
               <button
                  onClick={onPrevious}
                  className="flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors w-10 h-10"
                  aria-label="Anterior"
               >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
               </button>
               
               <button
                  onClick={onNext}
                  className="flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors w-10 h-10"
                  aria-label="Siguiente"
               >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
               </button>
            </div>

            <button
               onClick={onToday}
               className="px-4 py-2 text-sm font-medium text-brand-600 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors"
            >
               Hoy
            </button>

            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
               {title}
            </h1>
         </div>

         {/* View Switcher and Filters */}
         <div className="flex items-center gap-3">
            {/* Filter Button */}
            <button
               onClick={onFilterClick}
               className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                  hasActiveFilters
                     ? 'border-brand-300 bg-brand-50 text-brand-700'
                     : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
               }`}
            >
               <Filter className="w-4 h-4" />
               <span className="text-sm font-medium">Filtros</span>
               {hasActiveFilters && (
                  <div className="bg-brand-500 rounded-full w-2 h-2" />
               )}
            </button>

            {/* View Switcher */}
            <div className="flex bg-gray-100 rounded-lg p-1">
               {viewButtons.map((button) => (
                  <button
                     key={button.value}
                     onClick={() => onViewChange(button.value)}
                     className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        view === button.value
                           ? 'bg-white text-gray-900 shadow-sm'
                           : 'text-gray-600 hover:text-gray-900'
                     }`}
                  >
                     {button.label}
                  </button>
               ))}
            </div>
         </div>
      </div>
   );
}
