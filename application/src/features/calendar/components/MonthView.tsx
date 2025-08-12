'use client';

import { CalendarEvent, getEventsForDate } from '@/data/mockData/calendarData';
import CalendarEventCard from './CalendarEventCard';

interface MonthViewProps {
   currentDate: Date;
   events: CalendarEvent[];
   onEventClick: (event: CalendarEvent) => void;
   onDateClick: (date: Date) => void;
}

export default function MonthView ({
   currentDate, events, onEventClick, onDateClick
}: MonthViewProps) {
   // Get the first day of the month and calculate calendar grid
   const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
   const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
   const startDate = new Date(firstDayOfMonth);
   startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

   // Generate calendar days
   const calendarDays: Date[] = [];
   const endDate = new Date(lastDayOfMonth);
   endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay()));

   for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      calendarDays.push(new Date(date));
   }

   const today = new Date();
   today.setHours(0, 0, 0, 0);

   const isToday = (date: Date) => {
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      return checkDate.getTime() === today.getTime();
   };

   const isCurrentMonth = (date: Date) => {
      return date.getMonth() === currentDate.getMonth();
   };

   const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

   return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
         {/* Header with weekdays */}
         <div className="grid grid-cols-7 border-b border-gray-200">
            {weekDays.map((day) => (
               <div
                  key={day}
                  className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50"
               >
                  {day}
               </div>
            ))}
         </div>

         {/* Calendar grid */}
         <div className="grid grid-cols-7">
            {calendarDays.map((date, index) => {
               const dayEvents = getEventsForDate(date, events);
               const isCurrentMonthDay = isCurrentMonth(date);
               const isTodayDate = isToday(date);

               return (
                  <div
                     key={index}
                     className={`min-h-[120px] border-r border-b border-gray-200 last:border-r-0 ${
                        !isCurrentMonthDay ? 'bg-gray-50' : 'bg-white'
                     }`}
                  >
                     <div className="p-2 h-full flex flex-col">
                        {/* Date header */}
                        <button
                           onClick={() => onDateClick(date)}
                           className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium mb-2 hover:bg-gray-100 transition-colors ${
                              isTodayDate
                                 ? 'bg-brand-500 text-white hover:bg-brand-600'
                                 : isCurrentMonthDay
                                    ? 'text-gray-900'
                                    : 'text-gray-400'
                           }`}
                        >
                           {date.getDate()}
                        </button>

                        {/* Events */}
                        <div className="flex-1 space-y-1 overflow-hidden">
                           {dayEvents.slice(0, 3)
                              .map((event) => (
                                 <CalendarEventCard
                                    key={event.id}
                                    event={event}
                                    isCompact={true}
                                    onClick={() => onEventClick(event)}
                                 />
                              ))}

                           {dayEvents.length > 3 && (
                              <button
                                 onClick={() => onDateClick(date)}
                                 className="w-full text-xs text-brand-600 hover:text-brand-700 font-medium py-1 px-2 hover:bg-brand-50 rounded transition-colors"
                              >
                                 +{dayEvents.length - 3} más
                              </button>
                           )}
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
}
