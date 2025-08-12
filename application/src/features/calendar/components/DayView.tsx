'use client';

import {
   CalendarEvent, getEventsForDate, formatEventTime
} from '@/data/mockData/calendarData';
import CalendarEventCard from './CalendarEventCard';

interface DayViewProps {
   currentDate: Date;
   events: CalendarEvent[];
   onEventClick: (event: CalendarEvent) => void;
}

export default function DayView ({
   currentDate, events, onEventClick
}: DayViewProps) {
   const dayEvents = getEventsForDate(currentDate, events);

   // Sort events by start time
   const sortedEvents = [...dayEvents].sort((a, b) =>
      new Date(a.startTime)
         .getTime() - new Date(b.startTime)
         .getTime()
   );

   const today = new Date();
   const isToday = currentDate.toDateString() === today.toDateString();

   // Generate time slots (6 AM to 10 PM)
   const timeSlots: string[] = [];
   for (let hour = 6; hour <= 22; hour++) {
      timeSlots.push(`${hour.toString()
         .padStart(2, '0')}:00`);
   }

   const getEventPosition = (event: CalendarEvent) => {
      const startTime = new Date(event.startTime);
      const endTime = new Date(event.endTime);
      const startHour = startTime.getHours() + startTime.getMinutes() / 60;
      const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // hours

      // Calculate position relative to 6 AM start
      const top = Math.max(0, (startHour - 6) * 60); // 60px per hour
      const height = Math.max(30, duration * 60); // minimum 30px height

      return {
         top,
         height
      };
   };

   return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
         {/* Header */}
         <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
               <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                     {currentDate.toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                     })}
                  </h2>
                  {isToday && (
                     <p className="text-sm text-brand-600 font-medium mt-1">Hoy</p>
                  )}
               </div>
               <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                     {sortedEvents.length} evento{sortedEvents.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-gray-500">programado{sortedEvents.length !== 1 ? 's' : ''}</p>
               </div>
            </div>
         </div>

         {/* Events Content */}
         <div className="p-6">
            {sortedEvents.length === 0 ? (
               <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                     <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                     </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Sin eventos programados</h3>
                  <p className="text-gray-500">No hay eventos para este día.</p>
               </div>
            ) : (
               <div className="space-y-4">
                  {/* Timeline view for larger screens */}
                  <div className="hidden lg:block">
                     <div className="relative">
                        {/* Time labels */}
                        <div className="absolute left-0 top-0 w-16 space-y-[52px]">
                           {timeSlots.map((time) => (
                              <div key={time} className="text-sm text-gray-500 -mt-2">
                                 {time}
                              </div>
                           ))}
                        </div>

                        {/* Timeline line */}
                        <div className="absolute left-16 top-0 w-px bg-gray-200 h-full ml-4" />

                        {/* Events positioned on timeline */}
                        <div className="ml-24 relative"
                           style={{
                              height: `${timeSlots.length * 60}px`
                           }}
                        >
                           {sortedEvents.map((event) => {
                              const {
                                 top, height
                              } = getEventPosition(event);
                              return (
                                 <div
                                    key={event.id}
                                    className="absolute left-0 right-0 pr-4"
                                    style={{
                                       top: `${top}px`,
                                       height: `${height}px`
                                    }}
                                 >
                                    <CalendarEventCard
                                       event={event}
                                       isCompact={false}
                                       onClick={() => onEventClick(event)}
                                    />
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  </div>

                  {/* List view for smaller screens */}
                  <div className="lg:hidden space-y-4">
                     {sortedEvents.map((event) => (
                        <CalendarEventCard
                           key={event.id}
                           event={event}
                           isCompact={false}
                           onClick={() => onEventClick(event)}
                        />
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
