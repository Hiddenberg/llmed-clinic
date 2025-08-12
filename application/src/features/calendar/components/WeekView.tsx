'use client';

import { CalendarEvent, getEventsForDate, formatEventTime } from '@/data/mockData/calendarData';
import CalendarEventCard from './CalendarEventCard';

interface WeekViewProps {
   currentDate: Date;
   events: CalendarEvent[];
   onEventClick: (event: CalendarEvent) => void;
   onDateClick: (date: Date) => void;
}

export default function WeekView({ currentDate, events, onEventClick, onDateClick }: WeekViewProps) {
   // Get week start (Sunday)
   const weekStart = new Date(currentDate);
   weekStart.setDate(currentDate.getDate() - currentDate.getDay());

   // Generate week days
   const weekDays: Date[] = [];
   for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      weekDays.push(day);
   }

   const today = new Date();
   today.setHours(0, 0, 0, 0);

   const isToday = (date: Date) => {
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      return checkDate.getTime() === today.getTime();
   };

   const weekDayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

   return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
         {/* Header with days */}
         <div className="grid grid-cols-7 border-b border-gray-200">
            {weekDays.map((date, index) => {
               const isTodayDate = isToday(date);
               
               return (
                  <button
                     key={index}
                     onClick={() => onDateClick(date)}
                     className={`p-4 text-center border-r border-gray-200 last:border-r-0 hover:bg-gray-50 transition-colors ${
                        isTodayDate ? 'bg-brand-50' : 'bg-gray-50'
                     }`}
                  >
                     <div className="space-y-1">
                        <p className={`text-sm font-medium ${
                           isTodayDate ? 'text-brand-600' : 'text-gray-600'
                        }`}>
                           {weekDayNames[index]}
                        </p>
                        <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-lg font-semibold ${
                           isTodayDate
                              ? 'bg-brand-500 text-white'
                              : 'text-gray-900'
                        }`}>
                           {date.getDate()}
                        </div>
                     </div>
                  </button>
               );
            })}
         </div>

         {/* Events grid */}
         <div className="grid grid-cols-7">
            {weekDays.map((date, index) => {
               const dayEvents = getEventsForDate(date, events);
               const isTodayDate = isToday(date);

               return (
                  <div
                     key={index}
                     className={`min-h-[400px] border-r border-gray-200 last:border-r-0 ${
                        isTodayDate ? 'bg-brand-50/30' : 'bg-white'
                     }`}
                  >
                     <div className="p-3 h-full">
                        {dayEvents.length === 0 ? (
                           <div className="h-full flex items-center justify-center">
                              <p className="text-sm text-gray-400">Sin eventos</p>
                           </div>
                        ) : (
                           <div className="space-y-2">
                              {dayEvents.map((event) => (
                                 <CalendarEventCard
                                    key={event.id}
                                    event={event}
                                    isCompact={false}
                                    onClick={() => onEventClick(event)}
                                 />
                              ))}
                           </div>
                        )}
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
}
