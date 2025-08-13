import { useState } from 'react';
import {
   Calendar, Repeat, AlertCircle
} from 'lucide-react';

interface RecurringAppointmentOptionsProps {
   isRecurring: boolean;
   recurringPattern: {
      frequency: 'weekly' | 'biweekly' | 'monthly';
      duration: number;
      endDate?: string;
   };
   onRecurringChange: (isRecurring: boolean, pattern?: {
      frequency: 'weekly' | 'biweekly' | 'monthly';
      duration: number;
      endDate?: string;
   }) => void;
   appointmentType?: string;
}

const frequencyLabels = {
   weekly: 'Semanal',
   biweekly: 'Cada 2 semanas',
   monthly: 'Mensual'
};

const frequencyDescriptions = {
   weekly: 'Una vez por semana',
   biweekly: 'Cada dos semanas',
   monthly: 'Una vez por mes'
};

export default function RecurringAppointmentOptions ({
   isRecurring,
   recurringPattern,
   onRecurringChange,
   appointmentType
}: RecurringAppointmentOptionsProps) {
   const [showDetails, setShowDetails] = useState(isRecurring);

   const handleRecurringToggle = (checked: boolean) => {
      setShowDetails(checked);
      if (checked) {
         onRecurringChange(true, {
            frequency: 'weekly',
            duration: 4
         });
      } else {
         onRecurringChange(false);
      }
   };

   const handleFrequencyChange = (frequency: 'weekly' | 'biweekly' | 'monthly') => {
      onRecurringChange(true, {
         ...recurringPattern,
         frequency
      });
   };

   const handleDurationChange = (duration: number) => {
      onRecurringChange(true, {
         ...recurringPattern,
         duration
      });
   };

   const calculateEndDate = () => {
      if (!recurringPattern.duration) return '';

      const startDate = new Date();
      const endDate = new Date(startDate);

      switch (recurringPattern.frequency) {
         case 'weekly':
            endDate.setDate(startDate.getDate() + (recurringPattern.duration * 7));
            break;
         case 'biweekly':
            endDate.setDate(startDate.getDate() + (recurringPattern.duration * 14));
            break;
         case 'monthly':
            endDate.setMonth(startDate.getMonth() + recurringPattern.duration);
            break;
      }

      return endDate.toLocaleDateString('es-MX', {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric'
      });
   };

   return (
      <div className="space-y-4">
         {/* Toggle for recurring appointments */}
         <div className="flex justify-between items-center bg-gray-50 p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
               <Repeat className="w-5 h-5 text-green-600" />
               <div>
                  <h3 className="font-medium text-gray-900">
                     Cita Recurrente
                  </h3>
                  <p className="text-gray-600 text-sm">
                     Programa múltiples citas con la misma frecuencia
                  </p>
               </div>
            </div>

            <label className="flex items-center cursor-pointer">
               <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => handleRecurringToggle(e.target.checked)}
                  className="sr-only"
               />
               <div className={`w-12 h-6 rounded-full transition-colors ${
                  isRecurring ? 'bg-green-500' : 'bg-gray-300'
               }`}
               >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                     isRecurring ? 'translate-x-6' : 'translate-x-0.5'
                  } mt-0.5`}
                  />
               </div>
            </label>
         </div>

         {/* Recurring options details */}
         {showDetails && (
            <div className="space-y-4 bg-green-50 p-4 border border-green-200 rounded-lg">
               <h4 className="flex items-center gap-2 font-medium text-green-900">
                  <Calendar className="w-4 h-4" />
                  Configuración de Recurrencia
               </h4>

               {/* Frequency selection */}
               <div>
                  <label className="block mb-2 font-medium text-green-800 text-sm">
                     Frecuencia
                  </label>
                  <div className="gap-3 grid grid-cols-1 sm:grid-cols-3">
                     {Object.entries(frequencyLabels)
                        .map(([value, label]) => (
                           <label key={value} className="flex items-center cursor-pointer">
                              <input
                                 type="radio"
                                 name="frequency"
                                 value={value}
                                 checked={recurringPattern.frequency === value}
                                 onChange={(e) => handleFrequencyChange(e.target.value as 'weekly' | 'biweekly' | 'monthly')}
                                 className="border-gray-300 focus:ring-green-500 w-4 h-4 text-green-600"
                              />
                              <div className="ml-3">
                                 <span className="font-medium text-gray-900 text-sm">{label}</span>
                                 <p className="text-gray-600 text-xs">
                                    {frequencyDescriptions[value as keyof typeof frequencyDescriptions]}
                                 </p>
                              </div>
                           </label>
                        ))}
                  </div>
               </div>

               {/* Duration selection */}
               <div>
                  <label className="block mb-2 font-medium text-green-800 text-sm">
                     Número de citas
                  </label>
                  <div className="flex items-center gap-4">
                     <input
                        type="range"
                        min="2"
                        max="12"
                        value={recurringPattern.duration}
                        onChange={(e) => handleDurationChange(parseInt(e.target.value))}
                        className="flex-1 bg-green-200 rounded-lg h-2 appearance-none cursor-pointer slider"
                        style={{
                           background: `linear-gradient(to right, #10b981 0%, #10b981 ${((recurringPattern.duration - 2) / 10) * 100}%, #d1fae5 ${((recurringPattern.duration - 2) / 10) * 100}%, #d1fae5 100%)`
                        }}
                     />
                     <div className="min-w-[3rem] font-bold text-green-700 text-lg text-center">
                        {recurringPattern.duration}
                     </div>
                  </div>
                  <div className="flex justify-between mt-1 text-gray-500 text-xs">
                     <span>2 citas</span>
                     <span>12 citas</span>
                  </div>
               </div>

               {/* Summary */}
               <div className="bg-white p-3 border border-green-200 rounded-lg">
                  <h5 className="mb-2 font-medium text-green-900 text-sm">Resumen</h5>
                  <div className="space-y-1 text-green-800 text-sm">
                     <p>
                        <strong>Frecuencia:</strong> {frequencyLabels[recurringPattern.frequency]}
                     </p>
                     <p>
                        <strong>Total de citas:</strong> {recurringPattern.duration}
                     </p>
                     <p>
                        <strong>Fecha estimada de finalización:</strong> {calculateEndDate()}
                     </p>
                  </div>
               </div>
            </div>
         )}

         {/* Important information for hemodialysis */}
         {isRecurring && appointmentType === 'hemodialysis' && (
            <div className="bg-amber-50 p-4 border border-amber-200 rounded-lg">
               <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 w-5 h-5 text-amber-600" />
                  <div>
                     <h4 className="mb-1 font-medium text-amber-900 text-sm">
                        Citas Recurrentes de Hemodiálisis
                     </h4>
                     <p className="text-amber-800 text-sm">
                        Las citas recurrentes de hemodiálisis requieren aprobación médica adicional.
                        El equipo médico revisará tu solicitud y confirmará la disponibilidad para
                        todas las sesiones programadas.
                     </p>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
