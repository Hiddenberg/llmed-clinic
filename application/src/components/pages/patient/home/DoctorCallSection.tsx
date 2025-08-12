"use client"

import {
   Phone, Video, MessageSquare, CheckCircle, AlertCircle, User
} from 'lucide-react';
import { mockPatient } from '@/data/mockData/patientData';
import { useState } from 'react';

interface CallRequest {
   type: 'voice' | 'video' | 'message';
   priority: 'low' | 'medium' | 'high';
   reason: string;
}

export default function DoctorCallSection () {
   const [callRequest, setCallRequest] = useState<CallRequest>({
      type: 'voice',
      priority: 'medium',
      reason: ''
   });
   const [isRequesting, setIsRequesting] = useState(false);
   const [requestSent, setRequestSent] = useState(false);

   const doctor = mockPatient.assignedDoctor;

   // Mock doctor availability - in a real app this would come from an API
   const doctorAvailability = {
      isOnline: true,
      status: 'Disponible',
      nextAvailable: '14:30',
      responseTime: '5-10 min'
   };

   const callTypes = [
      {
         type: 'voice' as const,
         icon: Phone,
         label: 'Llamada de Voz',
         description: 'Consulta rápida por teléfono',
         color: 'from-green-500 to-emerald-500'
      },
      {
         type: 'video' as const,
         icon: Video,
         label: 'Video Llamada',
         description: 'Consulta visual completa',
         color: 'from-blue-500 to-cyan-500'
      },
      {
         type: 'message' as const,
         icon: MessageSquare,
         label: 'Mensaje',
         description: 'Consulta por mensaje de texto',
         color: 'from-purple-500 to-pink-500'
      }
   ];

   const priorityLevels = [
      {
         value: 'low',
         label: 'Consulta General',
         color: 'text-green-600'
      },
      {
         value: 'medium',
         label: 'Importante',
         color: 'text-orange-600'
      },
      {
         value: 'high',
         label: 'Urgente',
         color: 'text-red-600'
      }
   ] as const satisfies ReadonlyArray<{
      value: CallRequest['priority'];
      label: string;
      color: string;
   }>;

   const handleCallRequest = async () => {
      setIsRequesting(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsRequesting(false);
      setRequestSent(true);

      // Reset after 3 seconds
      setTimeout(() => {
         setRequestSent(false);
         setCallRequest({
            type: 'voice',
            priority: 'medium',
            reason: ''
         });
      }, 3000);
   };

   if (requestSent) {
      return (
         <div className="flex flex-col justify-center items-center py-8 text-center">
            <div className="flex justify-center items-center bg-green-100 mb-4 rounded-full w-16 h-16 text-green-600">
               <CheckCircle size={32} />
            </div>
            <h3 className="mb-2 font-semibold text-gray-800 text-lg">¡Solicitud Enviada!</h3>
            <p className="mb-1 text-gray-600 text-sm">Su solicitud de contacto ha sido enviada al doctor.</p>
            <p className="text-gray-500 text-xs">Recibirá una respuesta en {doctorAvailability.responseTime}</p>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         {/* Doctor Info and Availability */}
         <div className="bg-gradient-to-r from-brand-50 to-blue-50 p-4 border border-brand-200/30 rounded-xl">
            <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4">
               <div className="flex items-center gap-4">
                  <div className="relative">
                     <div className="flex justify-center items-center bg-gradient-to-r from-brand-500 to-blue-500 rounded-full w-12 h-12 text-white">
                        <User size={20} />
                     </div>
                     {doctorAvailability.isOnline && (
                        <div className="top-0 right-0 absolute bg-green-400 border-2 border-white rounded-full w-4 h-4" />
                     )}
                  </div>

                  <div>
                     <h3 className="font-semibold text-brand-800">{doctor.name}</h3>
                     <p className="text-brand-600 text-sm">{doctor.specialty}</p>
                     <p className="text-brand-600 text-xs">{doctor.phone}</p>
                  </div>
               </div>

               <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                     <div className="bg-green-400 rounded-full w-2 h-2 animate-pulse" />
                     <span className="font-medium text-green-700 text-sm">{doctorAvailability.status}</span>
                  </div>
                  <p className="text-gray-600 text-xs">Respuesta en {doctorAvailability.responseTime}</p>
               </div>
            </div>
         </div>

         {/* Call Type Selection */}
         <div>
            <label className="block mb-3 font-medium text-gray-700 text-sm">
               Tipo de contacto
            </label>
            <div className="gap-3 grid grid-cols-1 sm:grid-cols-3">
               {callTypes.map((type) => (
                  <button
                     key={type.type}
                     type="button"
                     onClick={() => setCallRequest(prev => ({
                        ...prev,
                        type: type.type
                     }))}
                     className={`flex flex-col items-center gap-3 p-4 border rounded-xl transition-all duration-200 ${
                        callRequest.type === type.type
                           ? 'border-brand-300 bg-brand-50 text-brand-700'
                           : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                     }`}
                  >
                     <div className={`flex items-center justify-center bg-gradient-to-r ${type.color} rounded-lg w-12 h-12 text-white`}>
                        <type.icon size={24} />
                     </div>
                     <div className="text-center">
                        <p className="font-medium text-sm">{type.label}</p>
                        <p className="opacity-80 text-xs">{type.description}</p>
                     </div>
                  </button>
               ))}
            </div>
         </div>

         {/* Priority Selection */}
         <div>
            <label className="block mb-3 font-medium text-gray-700 text-sm">
               Prioridad
            </label>
            <div className="gap-2 grid grid-cols-3">
               {priorityLevels.map((priority) => (
                  <button
                     key={priority.value}
                     type="button"
                     onClick={() => setCallRequest(prev => ({
                        ...prev,
                        priority: priority.value
                     }))}
                     className={`flex items-center justify-center gap-2 p-3 border rounded-lg text-sm transition-all duration-200 ${
                        callRequest.priority === priority.value
                           ? 'border-brand-300 bg-brand-50 text-brand-700'
                           : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                     }`}
                  >
                     <div className={`w-2 h-2 rounded-full ${
                        priority.value === 'low' ? 'bg-green-400' :
                           priority.value === 'medium' ? 'bg-orange-400' : 'bg-red-400'
                     }`}
                     />
                     <span className="font-medium">{priority.label}</span>
                  </button>
               ))}
            </div>
         </div>

         {/* Reason/Message */}
         <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
               Motivo de la consulta
            </label>
            <textarea
               value={callRequest.reason}
               onChange={(e) => setCallRequest(prev => ({
                  ...prev,
                  reason: e.target.value
               }))}
               placeholder="Describa brevemente el motivo de su consulta..."
               rows={3}
               className="px-4 py-3 border border-gray-200 focus:border-brand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-100 w-full text-sm transition-all resize-none"
               required
            />
         </div>

         {/* Action Buttons */}
         <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
            {/* Emergency Button */}
            <button
               onClick={() => {
                  setCallRequest({
                     type: 'voice',
                     priority: 'high',
                     reason: 'Emergencia médica'
                  });
                  handleCallRequest();
               }}
               className="flex justify-center items-center gap-2 bg-gradient-to-r from-red-500 hover:from-red-600 to-red-600 hover:to-red-700 hover:shadow-md px-6 py-3 rounded-lg font-medium text-white text-sm transition-all duration-200"
            >
               <AlertCircle size={16} />
               <span>Emergencia</span>
            </button>

            {/* Regular Request Button */}
            <button
               onClick={handleCallRequest}
               disabled={isRequesting || !callRequest.reason.trim()}
               className="flex justify-center items-center gap-2 bg-gradient-to-r from-brand-500 hover:from-brand-600 disabled:from-gray-400 to-blue-500 hover:to-blue-600 disabled:to-gray-400 hover:shadow-md px-6 py-3 rounded-lg font-medium text-white text-sm transition-all duration-200 disabled:cursor-not-allowed"
            >
               {isRequesting ? (
                  <>
                     <div className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin" />
                     <span>Enviando...</span>
                  </>
               ) : (
                  <>
                     {callRequest.type === 'voice' && <Phone size={16} />}
                     {callRequest.type === 'video' && <Video size={16} />}
                     {callRequest.type === 'message' && <MessageSquare size={16} />}
                     <span>Solicitar Contacto</span>
                  </>
               )}
            </button>
         </div>

         {/* Help Text */}
         <div className="bg-blue-50 p-3 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
               <strong>Horarios de atención:</strong> Lunes a Viernes 8:00 - 18:00, Sábados 8:00 - 14:00
            </p>
            <p className="mt-1 text-blue-700 text-xs">
               Para emergencias fuera del horario de atención, llame al número de emergencias: <strong>911</strong>
            </p>
         </div>
      </div>
   );
}
