import { Stethoscope } from 'lucide-react';
import Calendar from '@/features/calendar/components/Calendar';
import { mockDoctor } from '@/data/mockData/doctorData';

function Header () {
   const currentTime = new Date()
      .toLocaleDateString('es-MX', {
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
