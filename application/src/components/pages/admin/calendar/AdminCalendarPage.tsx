import { Calendar as CalendarIcon } from 'lucide-react';
import Calendar from '@/features/calendar/components/Calendar';

// Floating geometric shapes for background decoration
function FloatingGeometry () {
   return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {/* Simplified gradient orbs with reduced blur */}
         <div className="-top-24 -right-24 absolute bg-gradient-to-br from-brand-500/10 to-blue-500/5 rounded-full w-96 h-96 animate-pulse"
            style={{
               animationDuration: '4s'
            }}
         />
         <div className="top-1/2 -left-32 absolute bg-gradient-to-br from-blue-400/8 to-brand-400/5 rounded-full w-64 h-64 animate-float"
            style={{
               animationDuration: '8s'
            }}
         />

         {/* Geometric lines */}
         <div className="top-20 left-1/4 absolute bg-gradient-to-b from-brand-300/30 to-transparent w-px h-32" />
         <div className="top-32 right-1/3 absolute bg-gradient-to-r from-blue-300/30 to-transparent w-24 h-px" />

         {/* Small floating dots */}
         <div className="top-16 left-1/3 absolute bg-brand-400 rounded-full w-2 h-2 animate-pulse" />
         <div className="right-1/4 bottom-20 absolute bg-blue-400 rounded-full w-1.5 h-1.5 animate-pulse"
            style={{
               animationDelay: '1s'
            }}
         />
         <div className="top-1/2 right-1/6 absolute bg-brand-300 rounded-full w-1 h-1 animate-pulse"
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
            <div className="flex justify-center items-center bg-brand-100 rounded-full w-12 h-12">
               <CalendarIcon className="w-6 h-6 text-brand-600" />
            </div>
            <div>
               <h1 className="font-bold text-gray-900 text-3xl">
                  Calendario Administrativo
               </h1>
               <p className="mt-1 text-gray-600">
                  Gestiona todos los eventos y citas de la clínica
               </p>
            </div>
         </div>

         <div className="text-gray-500 text-sm capitalize">
            {currentTime}
         </div>
      </div>
   );
}

export default function AdminCalendarPage () {
   return (
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 min-h-screen">
         <FloatingGeometry />

         <div className="z-10 relative">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
               <Header />

               <div className="space-y-6">
                  <Calendar userRole="admin" />
               </div>
            </div>
         </div>
      </div>
   );
}
