"use client"

import {
   Calendar, Clock, User, MessageSquare, Send, CheckCircle
} from 'lucide-react';
import { useState } from 'react';

interface AppointmentRequest {
   type: 'hemodialysis' | 'consultation' | 'follow-up' | 'lab-work';
   preferredDate: string;
   preferredTime: 'morning' | 'afternoon' | 'any';
   reason: string;
}

export default function ScheduleAppointment () {
   const [appointmentRequest, setAppointmentRequest] = useState<AppointmentRequest>({
      type: 'consultation',
      preferredDate: '',
      preferredTime: 'morning',
      reason: ''
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);

   const appointmentTypes = [
      { value: 'hemodialysis', label: 'Hemodiálisis', icon: '🩸' },
      { value: 'consultation', label: 'Consulta General', icon: '👨‍⚕️' },
      { value: 'follow-up', label: 'Seguimiento', icon: '📋' },
      { value: 'lab-work', label: 'Exámenes de Laboratorio', icon: '🧪' }
   ];

   const timePreferences = [
      { value: 'morning', label: 'Mañana (8:00 - 12:00)' },
      { value: 'afternoon', label: 'Tarde (13:00 - 17:00)' },
      { value: 'any', label: 'Cualquier hora' }
   ];

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
         setIsSubmitted(false);
         setAppointmentRequest({
            type: 'consultation',
            preferredDate: '',
            preferredTime: 'morning',
            reason: ''
         });
      }, 3000);
   };

   if (isSubmitted) {
      return (
         <div className="flex flex-col justify-center items-center py-8 text-center">
            <div className="flex justify-center items-center bg-green-100 mb-4 rounded-full w-16 h-16 text-green-600">
               <CheckCircle size={32} />
            </div>
            <h3 className="mb-2 font-semibold text-gray-800 text-lg">¡Solicitud Enviada!</h3>
            <p className="mb-1 text-gray-600 text-sm">Su solicitud de cita ha sido enviada correctamente.</p>
            <p className="text-gray-500 text-xs">Recibirá una confirmación en las próximas 24 horas.</p>
         </div>
      );
   }

   return (
      <form onSubmit={handleSubmit} className="space-y-4">
         {/* Appointment Type Selection */}
         <div>
            <label className="block mb-3 font-medium text-gray-700 text-sm">
               Tipo de cita
            </label>
            <div className="gap-2 grid grid-cols-1 sm:grid-cols-2">
               {appointmentTypes.map((type) => (
                  <button
                     key={type.value}
                     type="button"
                     onClick={() => setAppointmentRequest(prev => ({ ...prev, type: type.value as any }))}
                     className={`flex items-center gap-3 p-3 border rounded-lg text-left transition-all duration-200 ${
                        appointmentRequest.type === type.value
                           ? 'border-brand-300 bg-brand-50 text-brand-700'
                           : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                     }`}
                  >
                     <span className="text-lg">{type.icon}</span>
                     <span className="font-medium text-sm">{type.label}</span>
                  </button>
               ))}
            </div>
         </div>

         {/* Date and Time Preferences */}
         <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
            {/* Preferred Date */}
            <div>
               <label className="block mb-2 font-medium text-gray-700 text-sm">
                  Fecha preferida
               </label>
               <div className="relative">
                  <Calendar size={16} className="top-3 left-3 absolute text-gray-400" />
                  <input
                     type="date"
                     value={appointmentRequest.preferredDate}
                     onChange={(e) => setAppointmentRequest(prev => ({ ...prev, preferredDate: e.target.value }))}
                     min={new Date().toISOString().split('T')[0]}
                     className="py-2 pr-4 pl-10 border border-gray-200 focus:border-brand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-100 w-full text-sm transition-all"
                     required
                  />
               </div>
            </div>

            {/* Time Preference */}
            <div>
               <label className="block mb-2 font-medium text-gray-700 text-sm">
                  Horario preferido
               </label>
               <div className="relative">
                  <Clock size={16} className="top-3 left-3 absolute text-gray-400" />
                  <select
                     value={appointmentRequest.preferredTime}
                     onChange={(e) => setAppointmentRequest(prev => ({ ...prev, preferredTime: e.target.value as any }))}
                     className="py-2 pr-4 pl-10 border border-gray-200 focus:border-brand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-100 w-full text-sm transition-all appearance-none"
                  >
                     {timePreferences.map((time) => (
                        <option key={time.value} value={time.value}>
                           {time.label}
                        </option>
                     ))}
                  </select>
               </div>
            </div>
         </div>

         {/* Reason/Notes */}
         <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
               Motivo de la cita (opcional)
            </label>
            <div className="relative">
               <MessageSquare size={16} className="top-3 left-3 absolute text-gray-400" />
               <textarea
                  value={appointmentRequest.reason}
                  onChange={(e) => setAppointmentRequest(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="Describa brevemente el motivo de su cita..."
                  rows={3}
                  className="py-2 pr-4 pl-10 border border-gray-200 focus:border-brand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-100 w-full text-sm transition-all resize-none"
               />
            </div>
         </div>

         {/* Submit Button */}
         <button
            type="submit"
            disabled={isSubmitting || !appointmentRequest.preferredDate}
            className="flex justify-center items-center gap-2 bg-gradient-to-r from-brand-500 hover:from-brand-600 disabled:from-gray-400 to-blue-500 hover:to-blue-600 disabled:to-gray-400 hover:shadow-md px-6 py-3 rounded-lg w-full font-medium text-white text-sm transition-all duration-200 disabled:cursor-not-allowed"
         >
            {isSubmitting ? (
               <>
                  <div className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin" />
                  <span>Enviando solicitud...</span>
               </>
            ) : (
               <>
                  <Send size={16} />
                  <span>Solicitar Cita</span>
               </>
            )}
         </button>

         {/* Help text */}
         <p className="text-gray-500 text-xs text-center">
            Su solicitud será revisada y recibirá una confirmación en las próximas 24 horas
         </p>
      </form>
   );
}
