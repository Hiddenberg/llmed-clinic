import {
   Stethoscope, Clock, User
} from 'lucide-react';
import { mockDoctor } from '@/data/mockData/doctorData';
import DoctorStatsBar from './DoctorStatsBar';
import TodayAppointments from './TodayAppointments';
import PatientEvolutionPanel from './PatientEvolutionPanel';
import DoctorActivityFeed from './DoctorActivityFeed';
import QuickNavigation from './QuickNavigation';

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
         <FloatingGeometry />

         {/* Doctor header with personalized info */}
         <div className="relative bg-white/95 shadow-lg p-6 border border-gray-200/50 rounded-2xl">
            <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mb-6">
               <div className="flex items-center gap-4">
                  {/* Doctor avatar/icon */}
                  <div className="relative">
                     <div className="relative flex justify-center items-center bg-gradient-to-r from-brand-600 to-green-500 shadow-lg rounded-xl w-16 h-16 text-white">
                        <Stethoscope size={28} className="drop-shadow-sm" />
                     </div>
                  </div>

                  <div>
                     <div className="flex items-center gap-3 mb-1">
                        <h1 className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 font-bold text-transparent text-3xl">
                           {getGreeting()}, {mockDoctor.name}
                        </h1>
                        <div className="flex items-center gap-1">
                           <div className="bg-green-400 rounded-full w-2 h-2 animate-pulse" />
                           <Clock size={14} className="text-green-500 animate-pulse" />
                        </div>
                     </div>
                     <div className="flex items-center gap-4 text-gray-600 text-sm">
                        <span className="font-medium">{mockDoctor.specialty}</span>
                        <span>•</span>
                        <span>{mockDoctor.patientsAssigned} pacientes asignados</span>
                        <span>•</span>
                        <span className="capitalize">{currentTime}</span>
                     </div>
                  </div>
               </div>

               {/* Doctor status indicators */}
               <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full text-green-700 text-sm">
                     <User size={14} />
                     <span className="font-medium">Disponible</span>
                  </div>
               </div>
            </div>

            {/* Welcome message */}
            <div className="relative">
               <div className="relative bg-gradient-to-r from-brand-50 via-white to-green-50 p-5 border border-brand-100/50 rounded-xl">
                  <p className="text-gray-700 leading-relaxed">
                     Bienvenido a tu <span className="bg-clip-text bg-gradient-to-r from-brand-600 to-green-600 font-semibold text-transparent">centro de trabajo médico</span>.
                     Aquí tienes acceso completo a la información de tus pacientes, citas programadas y herramientas de seguimiento clínico.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default function DoctorHomePage () {
   return (
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-green-50/20 min-h-screen overflow-hidden">
         {/* Background decoration */}
         <div className="fixed inset-0 pointer-events-none">
            <div className="top-0 right-0 absolute bg-gradient-to-bl from-brand-100/15 to-transparent w-1/3 h-1/3" />
            <div className="bottom-0 left-0 absolute bg-gradient-to-tr from-green-100/10 to-transparent w-1/2 h-1/2" />
         </div>

         <div className="relative mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 max-w-7xl">
            {/* Header Section */}
            <Header />

            {/* Doctor Stats Overview Section */}
            <section className="mb-12">
               <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="bg-gradient-to-b from-brand-600 to-green-500 rounded-full w-1 h-6" />
                     <h2 className="font-semibold text-gray-800 text-lg">Resumen de Actividad</h2>
                     <div className="flex-1 bg-gradient-to-r from-gray-300/30 to-transparent ml-4 h-px" />
                  </div>
                  <DoctorStatsBar />
               </div>
            </section>

            {/* Main Content Sections */}
            <div className="space-y-8">
               {/* Activity and Appointments Section */}
               <section>
                  <div className="flex items-center gap-3 mb-6">
                     <div className="bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full w-1 h-6" />
                     <h2 className="font-semibold text-gray-800 text-lg">Actividad y Citas de Hoy</h2>
                     <div className="flex-1 bg-gradient-to-r from-gray-300/30 to-transparent ml-4 h-px" />
                  </div>

                  <div className="gap-8 grid grid-cols-1 xl:grid-cols-3">
                     {/* Doctor Activity Feed */}
                     <div className="xl:col-span-2">
                        <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl" />
                     </div>
                     {/* Today's Appointments
                     <div className="xl:col-span-1">
                     <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl" />
                     </div> */}
                  </div>

                  <div>
                     <DoctorActivityFeed />
                  </div>
                  <TodayAppointments />
               </section>

               {/* Patient Evolution Section */}
               <section>
                  <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="bg-gradient-to-b from-green-600 to-emerald-500 rounded-full w-1 h-6" />
                        <h2 className="font-semibold text-gray-800 text-lg">Evolución de Pacientes</h2>
                        <div className="flex-1 bg-gradient-to-r from-gray-300/30 to-transparent ml-4 h-px" />
                     </div>
                     <PatientEvolutionPanel />
                  </div>
               </section>

               {/* Quick Navigation Section */}
               <section>
                  <QuickNavigation />
               </section>
            </div>

            {/* Enhanced Footer */}
            <div className="from-transparent via-brand-200/20 to-transparent mt-16 pt-8 border-gradient-to-r border-t text-center">
               <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-500/3 to-green-500/3 blur-xl rounded-lg" />
                  <div className="relative">
                     <p className="font-medium text-gray-600 text-sm">
                        LLMed Clinic - Portal Médico
                     </p>
                     <p className="flex justify-center items-center gap-1 mt-1 text-gray-400 text-xs">
                        Especialista en Nefrología <Stethoscope size={10} className="text-brand-400" />
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
