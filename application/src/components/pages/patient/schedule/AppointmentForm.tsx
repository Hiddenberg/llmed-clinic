import { useState } from 'react';
import {
   ArrowLeft, FileText, MessageCircle
} from 'lucide-react';
import { AppointmentRequest, AvailableSlot } from '@/features/calendar/hooks/useAppointmentScheduling';

interface AppointmentFormProps {
   appointmentData: Partial<AppointmentRequest>;
   selectedSlot: AvailableSlot | null;
   onSubmit: (formData: { reason?: string; notes?: string }) => void;
   onBack: () => void;
}

const appointmentTypeLabels = {
   consultation: 'Consulta Médica',
   hemodialysis: 'Sesión de Hemodiálisis',
   'follow-up': 'Seguimiento'
};

const commonReasons = {
   consultation: [
      'Primera consulta',
      'Control de rutina',
      'Síntomas nuevos',
      'Revisión de medicamentos',
      'Solicitud de exámenes',
      'Otro motivo'
   ],
   hemodialysis: [
      'Sesión regular de hemodiálisis',
      'Sesión de recuperación',
      'Evaluación pre-diálisis',
      'Ajuste de tratamiento'
   ],
   'follow-up': [
      'Control post-tratamiento',
      'Revisión de resultados',
      'Evaluación de progreso',
      'Ajuste de medicación',
      'Control de síntomas'
   ]
};

export default function AppointmentForm ({
   appointmentData,
   selectedSlot,
   onSubmit,
   onBack
}: AppointmentFormProps) {
   const [reason, setReason] = useState('');
   const [customReason, setCustomReason] = useState('');
   const [notes, setNotes] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      const finalReason = reason === 'Otro motivo' ? customReason : reason;

      // Simulate form processing
      await new Promise(resolve => setTimeout(resolve, 500));

      onSubmit({
         reason: finalReason || undefined,
         notes: notes || undefined
      });

      setIsSubmitting(false);
   };

   const reasons = appointmentData.type ? commonReasons[appointmentData.type] || [] : [];

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
                  Detalles de la cita
               </h2>
               <p className="text-gray-600">
                  Proporciona información adicional para tu cita
               </p>
            </div>
         </div>

         {/* Appointment Summary */}
         {selectedSlot && (
            <div className="bg-green-50 p-4 border border-green-200 rounded-lg">
               <h3 className="mb-3 font-semibold text-green-900 text-lg">
                  Resumen de tu cita
               </h3>
               <div className="gap-4 grid grid-cols-1 md:grid-cols-2 text-sm">
                  <div>
                     <span className="font-medium text-green-800">Tipo:</span>
                     <span className="ml-2 text-green-700">
                        {appointmentData.type && appointmentTypeLabels[appointmentData.type]}
                     </span>
                  </div>
                  <div>
                     <span className="font-medium text-green-800">Doctor:</span>
                     <span className="ml-2 text-green-700">{selectedSlot.doctorName}</span>
                  </div>
                  <div>
                     <span className="font-medium text-green-800">Fecha:</span>
                     <span className="ml-2 text-green-700">
                        {new Date(selectedSlot.date)
                           .toLocaleDateString('es-ES', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                           })}
                     </span>
                  </div>
                  <div>
                     <span className="font-medium text-green-800">Hora:</span>
                     <span className="ml-2 text-green-700">
                        {selectedSlot.time} ({selectedSlot.duration} min)
                     </span>
                  </div>
               </div>
            </div>
         )}

         <form onSubmit={handleSubmit} className="space-y-6">
            {/* Reason for appointment */}
            <div>
               <label className="flex items-center gap-2 mb-3 font-medium text-gray-700 text-sm">
                  <FileText className="w-4 h-4" />
                  Motivo de la cita
               </label>

               <div className="space-y-3">
                  {reasons.map((reasonOption) => (
                     <label key={reasonOption} className="flex items-center">
                        <input
                           type="radio"
                           name="reason"
                           value={reasonOption}
                           checked={reason === reasonOption}
                           onChange={(e) => setReason(e.target.value)}
                           className="border-gray-300 focus:ring-green-500 w-4 h-4 text-green-600"
                        />
                        <span className="ml-3 text-gray-700 text-sm">{reasonOption}</span>
                     </label>
                  ))}
               </div>

               {reason === 'Otro motivo' && (
                  <div className="mt-3">
                     <input
                        type="text"
                        placeholder="Describe el motivo de tu cita"
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        className="px-4 py-2 border border-gray-300 focus:border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 w-full"
                        required
                     />
                  </div>
               )}
            </div>

            {/* Additional notes */}
            <div>
               <label className="flex items-center gap-2 mb-3 font-medium text-gray-700 text-sm">
                  <MessageCircle className="w-4 h-4" />
                  Notas adicionales (opcional)
               </label>

               <textarea
                  placeholder="¿Hay algo específico que el doctor deba saber? Síntomas, medicamentos actuales, alergias, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="px-4 py-3 border border-gray-300 focus:border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 w-full resize-none"
               />

               <p className="mt-2 text-gray-500 text-xs">
                  Esta información ayudará al doctor a prepararse mejor para tu consulta.
               </p>
            </div>

            {/* Submit button */}
            <div className="flex justify-between items-center pt-6">
               <button
                  type="button"
                  onClick={onBack}
                  className="hover:bg-gray-100 px-6 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-900 text-sm transition-colors"
               >
                  Anterior
               </button>

               <button
                  type="submit"
                  disabled={isSubmitting || (!reason && appointmentData.type !== 'hemodialysis')}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-8 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium text-white text-sm transition-colors disabled:cursor-not-allowed"
               >
                  {isSubmitting ? (
                     <div className="flex items-center gap-2">
                        <div className="border-white border-b-2 rounded-full w-4 h-4 animate-spin" />
                        <span>Procesando...</span>
                     </div>
                  ) : (
                     'Continuar'
                  )}
               </button>
            </div>
         </form>

         <div className="bg-amber-50 p-4 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
               <div className="flex justify-center items-center bg-amber-500 mt-0.5 rounded-full w-5 h-5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
               </div>
               <div>
                  <h4 className="mb-1 font-medium text-amber-900 text-sm">
                     Información importante
                  </h4>
                  <p className="text-amber-800 text-sm">
                     Por favor, llega 15 minutos antes de tu cita con tu documento de identidad y tarjeta de seguro médico.
                     Si necesitas cancelar, hazlo con al menos 24 horas de anticipación.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
