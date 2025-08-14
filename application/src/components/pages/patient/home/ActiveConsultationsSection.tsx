'use client';

import {
   Video, Clock, User, Calendar, AlertCircle, CheckCircle
} from 'lucide-react';
import { useState } from 'react';

interface ActiveConsultation {
   id: string;
   doctorName: string;
   specialty: string;
   scheduledTime: string;
   status: 'scheduled' | 'active' | 'waiting';
   type: 'video' | 'follow-up';
   duration: string;
}

function ConsultationCard ({ consultation }: { consultation: ActiveConsultation }) {
   const getStatusInfo = (status: string) => {
      switch (status) {
         case 'active':
            return {
               color: 'bg-green-100 text-green-700 border-green-200',
               icon: CheckCircle,
               label: 'En curso',
               buttonText: 'Unirse Ahora',
               buttonColor: 'bg-green-600 hover:bg-green-700'
            };
         case 'waiting':
            return {
               color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
               icon: Clock,
               label: 'Doctor esperando',
               buttonText: 'Unirse a la Consulta',
               buttonColor: 'bg-blue-600 hover:bg-blue-700'
            };
         case 'scheduled':
            return {
               color: 'bg-blue-100 text-blue-700 border-blue-200',
               icon: Calendar,
               label: 'Programada',
               buttonText: 'Ver detalles',
               buttonColor: 'bg-gray-600 hover:bg-gray-700'
            };
         default:
            return {
               color: 'bg-gray-100 text-gray-700 border-gray-200',
               icon: AlertCircle,
               label: 'Desconocido',
               buttonText: 'Ver',
               buttonColor: 'bg-gray-600 hover:bg-gray-700'
            };
      }
   };

   const statusInfo = getStatusInfo(consultation.status);
   const StatusIcon = statusInfo.icon;

   const handleJoinConsultation = () => {
      if (consultation.status === 'active' || consultation.status === 'waiting') {
         window.location.href = `/patient/consultation/${consultation.id}`;
      } else {
         alert('La consulta aún no está disponible. Se le notificará cuando pueda unirse.');
      }
   };

   return (
      <div className="bg-white hover:shadow-md p-4 border border-gray-200 rounded-lg transition-shadow">
         <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
               <div className="flex justify-center items-center bg-blue-100 rounded-full w-12 h-12">
                  <User size={20} className="text-blue-600" />
               </div>
               <div>
                  <h3 className="font-semibold text-gray-900">{consultation.doctorName}</h3>
                  <p className="text-gray-600 text-sm">{consultation.specialty}</p>
               </div>
            </div>

            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
               <StatusIcon size={12} />
               {statusInfo.label}
            </div>
         </div>

         <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
               <Clock size={14} />
               <span>{consultation.scheduledTime}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
               <Video size={14} />
               <span>Video consulta • {consultation.duration}</span>
            </div>
         </div>

         <button
            onClick={handleJoinConsultation}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-colors ${statusInfo.buttonColor}`}
         >
            {consultation.status === 'active' || consultation.status === 'waiting' ? (
               <>
                  <Video size={16} />
                  {statusInfo.buttonText}
               </>
            ) : (
               <>
                  <Calendar size={16} />
                  {statusInfo.buttonText}
               </>
            )}
         </button>
      </div>
   );
}

export default function ActiveConsultationsSection () {
   const [consultations] = useState<ActiveConsultation[]>([
      {
         id: 'cons-video-001',
         doctorName: 'Dr. Carlos Ruiz',
         specialty: 'Nefrología',
         scheduledTime: 'Hoy, 14:30',
         status: 'waiting',
         type: 'video',
         duration: '30 min'
      },
      {
         id: 'cons-video-002',
         doctorName: 'Dr. Carlos Mendoza',
         specialty: 'Cardiología',
         scheduledTime: 'Mañana, 10:00',
         status: 'scheduled',
         type: 'follow-up',
         duration: '20 min'
      }
   ]);

   const activeConsultations = consultations.filter(c => c.status === 'active' || c.status === 'waiting');
   const upcomingConsultations = consultations.filter(c => c.status === 'scheduled');

   if (consultations.length === 0) {
      return (
         <div className="py-8 text-center">
            <div className="flex justify-center items-center bg-gray-100 mx-auto mb-4 rounded-full w-16 h-16">
               <Video size={24} className="text-gray-400" />
            </div>
            <h3 className="mb-2 font-medium text-gray-900 text-lg">
               No hay consultas programadas
            </h3>
            <p className="text-gray-600 text-sm">
               Las video consultas aparecerán aquí cuando sean programadas por su doctor.
            </p>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         {/* Active/Waiting Consultations */}
         {activeConsultations.length > 0 && (
            <div>
               <h3 className="mb-3 font-medium text-gray-700 text-sm uppercase tracking-wide">
                  Consultas Activas
               </h3>
               <div className="space-y-3">
                  {activeConsultations.map((consultation) => (
                     <div key={consultation.id} className="relative">
                        {consultation.status === 'waiting' && (
                           <div className="-top-2 -right-2 absolute bg-red-500 rounded-full w-4 h-4 animate-pulse">
                              <div className="absolute inset-0 bg-red-500 opacity-75 rounded-full animate-ping" />
                           </div>
                        )}
                        <ConsultationCard consultation={consultation} />
                     </div>
                  ))}
               </div>
            </div>
         )}

         {/* Upcoming Consultations */}
         {upcomingConsultations.length > 0 && (
            <div>
               <h3 className="mb-3 font-medium text-gray-700 text-sm uppercase tracking-wide">
                  Próximas Consultas
               </h3>
               <div className="space-y-3">
                  {upcomingConsultations.map((consultation) => (
                     <ConsultationCard key={consultation.id} consultation={consultation} />
                  ))}
               </div>
            </div>
         )}

         {/* Info Section */}
         <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
               <div className="flex flex-shrink-0 justify-center items-center bg-blue-100 rounded-full w-8 h-8">
                  <Video size={16} className="text-blue-600" />
               </div>
               <div>
                  <h4 className="mb-1 font-medium text-blue-900">
                     ¿Primera vez usando video consulta?
                  </h4>
                  <p className="mb-3 text-blue-800 text-sm">
                     Asegúrese de tener una buena conexión a internet y permita el acceso a su cámara y micrófono.
                  </p>
                  {/* <button
                     onClick={() => alert('Guía de video consulta próximamente disponible')}
                     className="font-medium text-blue-700 hover:text-blue-800 text-sm underline"
                  >
                     Ver guía de uso →
                  </button> */}
               </div>
            </div>
         </div>
      </div>
   );
}
