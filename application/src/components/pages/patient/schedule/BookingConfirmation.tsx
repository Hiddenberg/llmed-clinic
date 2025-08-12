'use client';
import {
   ArrowLeft, CheckCircle, Calendar, Clock, User, FileText, AlertCircle, RefreshCw
} from 'lucide-react';
import { AppointmentRequest, AvailableSlot } from '@/features/calendar/hooks/useAppointmentScheduling';
import { format } from '@formkit/tempo';

interface BookingConfirmationProps {
   appointmentData: Partial<AppointmentRequest>;
   selectedSlot: AvailableSlot | null;
   bookingStatus: 'idle' | 'booking' | 'success' | 'error';
   onConfirm: () => void;
   onStartOver: () => void;
   onBack: () => void;
}

const appointmentTypeLabels = {
   consultation: 'Consulta Médica',
   hemodialysis: 'Sesión de Hemodiálisis',
   'follow-up': 'Seguimiento'
};

export default function BookingConfirmation ({
   appointmentData,
   selectedSlot,
   bookingStatus,
   onConfirm,
   onStartOver,
   onBack
}: BookingConfirmationProps) {
   if (bookingStatus === 'success') {
      return (
         <div className="space-y-6 text-center">
            <div className="flex justify-center items-center bg-green-100 mx-auto rounded-full w-20 h-20">
               <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <div>
               <h2 className="mb-2 font-bold text-gray-900 text-2xl">
                  ¡Cita agendada exitosamente!
               </h2>
               <p className="text-gray-600">
                  Tu cita ha sido confirmada. Recibirás un recordatorio por correo electrónico.
               </p>
            </div>

            {selectedSlot && (
               <div className="bg-green-50 mx-auto p-6 border border-green-200 rounded-lg max-w-md text-left">
                  <h3 className="mb-4 font-semibold text-green-900 text-lg">
                     Detalles de tu cita
                  </h3>

                  <div className="space-y-3 text-sm">
                     <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-green-600" />
                        <div>
                           <span className="font-medium text-green-800">Tipo:</span>
                           <span className="ml-2 text-green-700">
                              {appointmentData.type && appointmentTypeLabels[appointmentData.type]}
                           </span>
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-green-600" />
                        <div>
                           <span className="font-medium text-green-800">Doctor:</span>
                           <span className="ml-2 text-green-700">{selectedSlot.doctorName}</span>
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-green-600" />
                        <div>
                           <span className="font-medium text-green-800">Fecha:</span>
                           <span className="ml-2 text-green-700">
                              {new Date(selectedSlot.date + 'T12:00:00')
                                 .toLocaleDateString('es-ES', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                 })}
                           </span>
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-green-600" />
                        <div>
                           <span className="font-medium text-green-800">Hora:</span>
                           <span className="ml-2 text-green-700">
                              {selectedSlot.time} ({selectedSlot.duration} min)
                           </span>
                        </div>
                     </div>

                     {appointmentData.reason && (
                        <div className="pt-2 border-green-200 border-t">
                           <span className="font-medium text-green-800">Motivo:</span>
                           <p className="mt-1 text-green-700">{appointmentData.reason}</p>
                        </div>
                     )}
                  </div>
               </div>
            )}

            <div className="space-y-3">
               <button
                  onClick={onStartOver}
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg w-full font-medium text-white transition-colors"
               >
                  Agendar otra cita
               </button>

               <button
                  onClick={() => window.location.href = '/patient'}
                  className="hover:bg-green-50 px-6 py-3 border border-green-600 rounded-lg w-full font-medium text-green-600 transition-colors"
               >
                  Volver al inicio
               </button>
            </div>

            <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg text-left">
               <div className="flex items-start gap-3">
                  <div className="flex justify-center items-center bg-blue-500 mt-0.5 rounded-full w-5 h-5">
                     <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                     </svg>
                  </div>
                  <div>
                     <h4 className="mb-1 font-medium text-blue-900 text-sm">
                        Próximos pasos
                     </h4>
                     <ul className="space-y-1 text-blue-800 text-sm">
                        <li>• Recibirás una confirmación por correo electrónico</li>
                        <li>• Te enviaremos un recordatorio 24 horas antes</li>
                        <li>• Puedes ver y gestionar tus citas en tu perfil</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   if (bookingStatus === 'error') {
      return (
         <div className="space-y-6 text-center">
            <div className="flex justify-center items-center bg-red-100 mx-auto rounded-full w-20 h-20">
               <AlertCircle className="w-12 h-12 text-red-600" />
            </div>

            <div>
               <h2 className="mb-2 font-bold text-gray-900 text-2xl">
                  Error al agendar la cita
               </h2>
               <p className="text-gray-600">
                  Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
               </p>
            </div>

            <div className="space-y-3">
               <button
                  onClick={onConfirm}
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg w-full font-medium text-white transition-colors"
               >
                  Intentar nuevamente
               </button>

               <button
                  onClick={onStartOver}
                  className="hover:bg-gray-50 px-6 py-3 border border-gray-300 rounded-lg w-full font-medium text-gray-600 transition-colors"
               >
                  Empezar de nuevo
               </button>
            </div>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center gap-4 mb-6">
            {bookingStatus === 'idle' && (
               <button
                  onClick={onBack}
                  className="flex justify-center items-center hover:bg-gray-50 border border-gray-300 rounded-lg w-10 h-10 transition-colors"
               >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
               </button>
            )}

            <div>
               <h2 className="font-bold text-gray-900 text-2xl">
                  Confirmar cita
               </h2>
               <p className="text-gray-600">
                  Revisa los detalles antes de confirmar tu cita
               </p>
            </div>
         </div>

         {selectedSlot && (
            <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg">
               <h3 className="mb-4 font-semibold text-gray-900 text-lg">
                  Resumen de tu cita
               </h3>

               <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-500" />
                        <div>
                           <p className="font-medium text-gray-700 text-sm">Tipo de cita</p>
                           <p className="text-gray-900">
                              {appointmentData.type && appointmentTypeLabels[appointmentData.type]}
                           </p>
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-gray-500" />
                        <div>
                           <p className="font-medium text-gray-700 text-sm">Doctor</p>
                           <p className="text-gray-900">{selectedSlot.doctorName}</p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <div>
                           <p className="font-medium text-gray-700 text-sm">Fecha</p>
                           <p className="text-gray-900">
                              {format(selectedSlot.date, 'dddd, DD MMMM YYYY')}
                           </p>
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <div>
                           <p className="font-medium text-gray-700 text-sm">Hora</p>
                           <p className="text-gray-900">
                              {selectedSlot.time} ({selectedSlot.duration} minutos)
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               {appointmentData.reason && (
                  <div className="mt-6 pt-6 border-gray-200 border-t">
                     <p className="mb-2 font-medium text-gray-700 text-sm">Motivo de la cita</p>
                     <p className="text-gray-900">{appointmentData.reason}</p>
                  </div>
               )}

               {appointmentData.notes && (
                  <div className="mt-4">
                     <p className="mb-2 font-medium text-gray-700 text-sm">Notas adicionales</p>
                     <p className="text-gray-600 text-sm leading-relaxed">{appointmentData.notes}</p>
                  </div>
               )}
            </div>
         )}

         <div className="flex justify-between items-center pt-6">
            <button
               onClick={onBack}
               disabled={bookingStatus === 'booking'}
               className="hover:bg-gray-100 disabled:opacity-50 px-6 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-900 text-sm transition-colors disabled:cursor-not-allowed"
            >
               Anterior
            </button>

            <button
               onClick={onConfirm}
               disabled={bookingStatus === 'booking'}
               className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-8 py-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium text-white transition-colors disabled:cursor-not-allowed"
            >
               {bookingStatus === 'booking' ? (
                  <div className="flex items-center gap-2">
                     <RefreshCw className="w-4 h-4 animate-spin" />
                     <span>Confirmando cita...</span>
                  </div>
               ) : (
                  'Confirmar cita'
               )}
            </button>
         </div>

         <div className="bg-green-50 p-4 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
               <CheckCircle className="mt-0.5 w-5 h-5 text-green-600" />
               <div>
                  <h4 className="mb-1 font-medium text-green-900 text-sm">
                     Política de cancelación
                  </h4>
                  <p className="text-green-800 text-sm">
                     Puedes cancelar o reagendar tu cita hasta 24 horas antes sin costo adicional.
                     Las cancelaciones con menos de 24 horas de anticipación pueden incurrir en una tarifa.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
