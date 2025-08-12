import { useState } from 'react';
import {
   ArrowLeft, ChevronLeft, ChevronRight, Clock, Calendar
} from 'lucide-react';
import { AvailableSlot } from '@/features/calendar/hooks/useAppointmentScheduling';

interface DateTimeSelectorProps {
   availableSlots: AvailableSlot[];
   selectedSlot: AvailableSlot | null;
   isLoading: boolean;
   doctorId?: string;
   appointmentType?: string;
   onSlotSelect: (slot: AvailableSlot) => void;
   onBack: () => void;
}

export default function DateTimeSelector ({
   availableSlots,
   selectedSlot,
   isLoading,
   doctorId,
   appointmentType,
   onSlotSelect,
   onBack
}: DateTimeSelectorProps) {
   const [currentWeek, setCurrentWeek] = useState(new Date());

   // Get week start (Monday)
   const getWeekStart = (date: Date) => {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
      return new Date(d.setDate(diff));
   };

   const weekStart = getWeekStart(currentWeek);
   const weekDays = Array.from({
      length: 7
   }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      return date;
   });

   // Group slots by date
   const slotsByDate = availableSlots.reduce((acc, slot) => {
      if (!acc[slot.date]) {
         acc[slot.date] = [];
      }
      acc[slot.date].push(slot);
      return acc;
   }, {
   } as Record<string, AvailableSlot[]>);

   // Sort slots by time
   Object.keys(slotsByDate)
      .forEach(date => {
         slotsByDate[date].sort((a, b) => a.time.localeCompare(b.time));
      });

   const goToPreviousWeek = () => {
      const newDate = new Date(currentWeek);
      newDate.setDate(currentWeek.getDate() - 7);
      setCurrentWeek(newDate);
   };

   const goToNextWeek = () => {
      const newDate = new Date(currentWeek);
      newDate.setDate(currentWeek.getDate() + 7);
      setCurrentWeek(newDate);
   };

   const isToday = (date: Date) => {
      const today = new Date();
      return date.toDateString() === today.toDateString();
   };

   const isPastDate = (date: Date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
   };

   const weekDayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

   return (
      <div className="space-y-6">
         <div className="flex items-center gap-4 mb-6">
            <button
               onClick={onBack}
               className="flex justify-center items-center hover:bg-gray-50 border border-gray-300 rounded-lg w-10 h-10 transition-colors"
            >
               <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div>
               <h2 className="font-bold text-gray-900 text-2xl">
                  Selecciona fecha y hora
               </h2>
               <p className="text-gray-600">
                  Elige el horario que mejor se adapte a tu disponibilidad
               </p>
            </div>
         </div>

         {/* Week Navigation */}
         <div className="flex justify-between items-center mb-6">
            <button
               onClick={goToPreviousWeek}
               className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 border border-gray-300 rounded-lg transition-colors"
            >
               <ChevronLeft className="w-4 h-4" />
               <span className="font-medium text-sm">Semana anterior</span>
            </button>

            <h3 className="font-semibold text-gray-900 text-lg">
               {weekStart.toLocaleDateString('es-MX', {
                  month: 'long',
                  year: 'numeric'
               })}
            </h3>

            <button
               onClick={goToNextWeek}
               className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 border border-gray-300 rounded-lg transition-colors"
            >
               <span className="font-medium text-sm">Siguiente semana</span>
               <ChevronRight className="w-4 h-4" />
            </button>
         </div>

         {isLoading ? (
            <div className="flex justify-center items-center py-12">
               <div className="border-green-500 border-b-2 rounded-full w-12 h-12 animate-spin" />
            </div>
         ) : (
            <div className="gap-4 grid grid-cols-7">
               {weekDays.map((date, index) => {
                  const dateStr = date.toISOString()
                     .split('T')[0];
                  const daySlots = slotsByDate[dateStr] || [];
                  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                  const isPast = isPastDate(date);
                  const todayDate = isToday(date);

                  return (
                     <div key={dateStr} className="space-y-3">
                        {/* Day header */}
                        <div className={`text-center p-3 rounded-lg ${
                           todayDate
                              ? 'bg-green-100 text-green-800'
                              : isPast
                                 ? 'bg-gray-100 text-gray-400'
                                 : 'bg-gray-50 text-gray-700'
                        }`}
                        >
                           <div className="font-medium text-sm">
                              {weekDayNames[index]}
                           </div>
                           <div className="mt-1 font-bold text-lg">
                              {date.getDate()}
                           </div>
                        </div>

                        {/* Time slots */}
                        <div className="space-y-2">
                           {isWeekend || isPast ? (
                              <div className="py-4 text-center">
                                 <p className="text-gray-400 text-sm">
                                    {isWeekend ? 'Sin citas' : 'No disponible'}
                                 </p>
                              </div>
                           ) : daySlots.length === 0 ? (
                              <div className="py-4 text-center">
                                 <p className="text-gray-400 text-sm">Sin horarios</p>
                              </div>
                           ) : (
                              daySlots.map((slot) => {
                                 const isSelected = selectedSlot?.date === slot.date &&
                                                   selectedSlot?.time === slot.time &&
                                                   selectedSlot?.doctorId === slot.doctorId;

                                 return (
                                    <button
                                       key={`${slot.date}-${slot.time}-${slot.doctorId}`}
                                       onClick={() => onSlotSelect(slot)}
                                       className={`w-full p-2 rounded-lg text-sm font-medium transition-all ${
                                          isSelected
                                             ? 'bg-green-500 text-white'
                                             : 'bg-white border border-gray-200 text-gray-700 hover:border-green-300 hover:bg-green-50'
                                       }`}
                                    >
                                       <div className="flex justify-center items-center gap-1">
                                          <Clock className="w-3 h-3" />
                                          <span>{slot.time}</span>
                                       </div>
                                    </button>
                                 );
                              })
                           )}
                        </div>
                     </div>
                  );
               })}
            </div>
         )}

         <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
               <Calendar className="mt-0.5 w-5 h-5 text-blue-600" />
               <div>
                  <h4 className="mb-1 font-medium text-blue-900 text-sm">
                     Horarios de atención
                  </h4>
                  <p className="text-blue-800 text-sm">
                     Los horarios mostrados están disponibles para el tipo de cita y doctor seleccionados.
                     Las citas se programan de lunes a viernes de 7:00 AM a 6:00 PM.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
