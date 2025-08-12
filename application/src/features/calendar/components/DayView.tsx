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
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
         {/* Header */}
         <div className="p-6 border-gray-200 border-b">
            <div className="flex justify-between items-center">
               <div>
                  <h2 className="font-semibold text-gray-900 text-2xl">
                     {currentDate.toLocaleDateString('es-MX', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                     })}
                  </h2>
                  {isToday && (
                     <p className="mt-1 font-medium text-brand-600 text-sm">Hoy</p>
                  )}
               </div>
               <div className="text-right">
                  <p className="font-semibold text-gray-900 text-lg">
                     {sortedEvents.length} evento{sortedEvents.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-gray-500 text-sm">programado{sortedEvents.length !== 1 ? 's' : ''}</p>
               </div>
            </div>
         </div>

         {/* Events Content */}
         <div className="p-6">
            {sortedEvents.length === 0 ? (
               <div className="py-12 text-center">
                  <div className="flex justify-center items-center bg-gray-100 mx-auto mb-4 rounded-full w-16 h-16">
                     <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                     </svg>
                  </div>
                  <h3 className="mb-1 font-medium text-gray-900 text-lg">Sin eventos programados</h3>
                  <p className="text-gray-500">No hay eventos para este día.</p>
               </div>
            ) : (
               <div className="space-y-4">
                  {/* Timeline view for larger screens */}
                  <div className="hidden lg:block">
                     <div className="relative">
                        {/* Time labels */}
                        <div className="top-0 left-0 absolute space-y-[52px] w-16">
                           {timeSlots.map((time) => (
                              <div key={time} className="-mt-2 text-gray-500 text-sm">
                                 {time}
                              </div>
                           ))}
                        </div>

                        {/* Timeline line */}
                        <div className="top-0 left-16 absolute bg-gray-200 ml-4 w-px h-full" />

                        {/* Events positioned on timeline */}
                        <div className="relative ml-24"
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
                                    className="right-0 left-0 absolute pr-4"
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
