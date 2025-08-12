import { Stethoscope } from 'lucide-react';
import Calendar from '@/features/calendar/components/Calendar';
import { mockDoctor } from '@/data/mockData/doctorData';

// Floating geometric shapes for background decoration
function FloatingGeometry () {
   return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {/* Simplified gradient orbs with reduced blur */}
         <div className="-top-24 -right-24 absolute bg-gradient-to-br from-brand-600/8 to-green-500/4 rounded-full w-96 h-96 animate-pulse"
            style={{
               animationDuration: '4s'
            }}
         />
         <div className="top-1/2 -left-32 absolute bg-gradient-to-br from-green-400/6 to-brand-400/4 rounded-full w-64 h-64 animate-float"
            style={{
               animationDuration: '8s'
            }}
         />

         {/* Geometric lines */}
         <div className="top-20 left-1/4 absolute bg-gradient-to-b from-brand-600/25 to-transparent w-px h-32" />
         <div className="top-32 right-1/3 absolute bg-gradient-to-r from-green-300/25 to-transparent w-24 h-px" />

         {/* Small floating dots */}
         <div className="top-16 left-1/3 absolute bg-brand-600 rounded-full w-2 h-2 animate-pulse" />
         <div className="right-1/4 bottom-20 absolute bg-green-400 rounded-full w-1.5 h-1.5 animate-pulse"
            style={{
               animationDelay: '1s'
            }}
         />
         <div className="top-1/2 right-1/6 absolute bg-brand-400 rounded-full w-1 h-1 animate-pulse"
            style={{
               animationDelay: '2s'
            }}
         />
      </div>
   );
}

function Header () {
   const currentTime = new Date()
      .toLocaleDateString('es-ES', {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric'
      });

   return (
      <div className="relative mb-8">
         <div className="flex items-center gap-4 mb-2">
            <div className="flex justify-center items-center bg-green-100 rounded-full w-12 h-12">
               <Stethoscope className="w-6 h-6 text-green-600" />
            </div>
            <div>
               <h1 className="font-bold text-gray-900 text-3xl">
                  Mi Calendario Médico
               </h1>
               <p className="mt-1 text-gray-600">
                  Gestiona tus citas y horarios de pacientes
               </p>
            </div>
         </div>

         <div className="flex justify-between items-center">
            <div className="text-gray-500 text-sm capitalize">
               {currentTime}
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
               <div className="bg-green-500 rounded-full w-2 h-2" />
               <span>{mockDoctor.name} • {mockDoctor.specialty}</span>
            </div>
         </div>
      </div>
   );
}

export default function DoctorCalendarPage () {
   // In a real app, this would come from authentication context
   const doctorId = '1'; // Dr. Carlos Ruiz

   return (
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-green-50/30 min-h-screen">
         <FloatingGeometry />

         <div className="z-10 relative">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
               <Header />

               <div className="space-y-6">
                  <Calendar
                     userRole="doctor"
                     doctorId={doctorId}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
