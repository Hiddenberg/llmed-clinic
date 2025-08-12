import {
   Heart, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { mockPatient } from '@/data/mockData/patientData';

export default function PatientWelcomeHeader () {
   const currentTime = new Date()
      .toLocaleDateString('es-MX', {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric'
      });

   const currentHour = new Date()
      .getHours();
   const getGreeting = () => {
      if (currentHour < 12) return 'Buenos días';
      if (currentHour <= 19) return 'Buenas tardes';
      return 'Buenas noches';
   };

   return (
      <div className="relative mb-8">
         {/* Patient header with personalized info */}
         <div className="relative bg-white/95 shadow-lg p-6 border border-gray-200/50 rounded-2xl">
            <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-4">
               <div className="flex items-start gap-4">
                  {/* Patient avatar/icon */}
                  <div className="relative">
                     <div className="relative flex justify-center items-center bg-gradient-to-r from-brand-500 to-blue-500 shadow-lg rounded-xl w-16 h-16 text-white">
                        <Heart size={28} className="drop-shadow-sm" />
                     </div>
                     {/* Online indicator */}
                     <div className="top-0 right-0 absolute bg-green-400 border-2 border-white rounded-full w-4 h-4" />
                  </div>

                  <div className="flex-1">
                     <div className="flex sm:flex-row flex-col sm:items-center gap-1 sm:gap-3 mb-2">
                        <h1 className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 font-bold text-transparent text-2xl sm:text-3xl">
                           {getGreeting()}, {mockPatient.name.split(' ')[0]}
                        </h1>
                        <div className="flex items-center gap-1">
                           <div className="bg-green-400 rounded-full w-2 h-2 animate-pulse" />
                           <Clock size={14} className="text-green-500 animate-pulse" />
                        </div>
                     </div>

                     <div className="space-y-2 text-gray-600 text-sm">
                        <div className="flex sm:flex-row flex-col sm:items-center gap-1 sm:gap-4">
                           <span className="font-medium">{mockPatient.age} años</span>
                           <span className="hidden sm:inline">•</span>
                           <span>Tipo de sangre: {mockPatient.bloodType}</span>
                           <span className="hidden sm:inline">•</span>
                           <span className="capitalize">{currentTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span>Doctor asignado:</span>
                           <span className="font-medium text-brand-600">{mockPatient.assignedDoctor.name}</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Patient status indicators */}
               <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3">
                  <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full text-green-700 text-sm">
                     <CheckCircle size={14} />
                     <span className="font-medium">Tratamiento Activo</span>
                  </div>

                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full text-blue-700 text-sm">
                     <Heart size={14} />
                     <span className="font-medium">Estado Estable</span>
                  </div>
               </div>
            </div>

            {/* Next appointment preview - Mobile optimized */}
            <div className="bg-gradient-to-r from-brand-50 to-blue-50 mt-4 p-4 border border-brand-200/30 rounded-xl">
               <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                     <div className="flex justify-center items-center bg-brand-500 rounded-lg w-10 h-10 text-white">
                        <Clock size={18} />
                     </div>
                     <div>
                        <p className="font-medium text-brand-800 text-sm">Próxima cita programada</p>
                        <p className="text-brand-600 text-xs">Mañana, 15 de Enero - 08:00 AM</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-2 bg-brand-100 px-3 py-1.5 rounded-full">
                     <div className="bg-brand-500 rounded-full w-2 h-2 animate-pulse" />
                     <span className="font-medium text-brand-700 text-xs">Hemodiálisis - Sala A-1</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
