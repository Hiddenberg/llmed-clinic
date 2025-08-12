import {
   Heart, Zap, TrendingUp
} from 'lucide-react';
import TrackingBar from './TrackingBar';
import ActivityFeed from './ActivityFeed';
import NavigationCards from './NavigationCards';
import StaffPanel from './StaffPanel';
import PriorityAlerts from './PriorityAlerts';

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

         {/* Simplified header */}
         <div className="relative bg-white/95 shadow-lg p-6 py-4 border border-gray-200/50 rounded-2xl">
            <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4">
               <div className="flex items-center gap-4">
                  {/* Simplified logo */}
                  <div className="relative">
                     <div className="relative flex justify-center items-center bg-gradient-to-r from-brand-500 to-blue-500 shadow-lg rounded-xl w-14 h-14 text-white">
                        <Heart size={26} className="drop-shadow-sm" />
                     </div>
                  </div>

                  <div>
                     <div className="flex items-center gap-3 mb-1">
                        <h1 className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 font-bold text-transparent text-3xl">
                           Panel de Administración
                        </h1>
                        <div className="flex items-center gap-1">
                           <div className="bg-green-400 rounded-full w-2 h-2 animate-pulse" />
                           <Zap size={14} className="text-green-500 animate-pulse" />
                        </div>
                     </div>
                     <p className="flex items-center gap-2 text-gray-600 text-sm">
                        <span className="font-medium text-brand-600">{getGreeting()}, administrador</span>
                        <span className="text-gray-400">•</span>
                        <span className="capitalize">{currentTime}</span>
                     </p>
                  </div>
               </div>

               {/* Status indicators */}
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full text-green-700 text-sm">
                     <TrendingUp size={14} />
                     <span className="font-medium">Sistema Operando Correctamente</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

// Section separator component for visual hierarchy
function SectionSeparator ({
   title, subtitle
}: { title?: string; subtitle?: string }) {
   return (
      <div className="relative py-6">
         {/* Gradient line */}
         <div className="absolute inset-0 flex items-center">
            <div className="bg-gradient-to-r from-transparent via-gray-300/50 to-transparent w-full h-px" />
         </div>

         {title && (
            <div className="relative flex justify-center">
               <div className="bg-gray-50 px-6 py-2 border border-gray-200/50 rounded-full">
                  <h3 className="font-medium text-gray-600 text-sm">{title}</h3>
                  {subtitle && <p className="mt-0.5 text-gray-500 text-xs">{subtitle}</p>}
               </div>
            </div>
         )}
      </div>
   );
}

export default function AdminHomePage () {
   return (
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-brand-50/30 min-h-screen overflow-hidden">
         {/* Background decoration */}
         <div className="fixed inset-0 pointer-events-none">
            <div className="top-0 right-0 absolute bg-gradient-to-bl from-brand-100/20 to-transparent w-1/3 h-1/3" />
            <div className="bottom-0 left-0 absolute bg-gradient-to-tr from-blue-100/15 to-transparent w-1/2 h-1/2" />
         </div>

         <div className="relative mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 max-w-7xl">
            {/* Header Section */}
            <Header />

            {/* Patient Overview Section */}
            <section className="mb-12">
               <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="bg-gradient-to-b from-brand-500 to-blue-500 rounded-full w-1 h-6" />
                     <h2 className="font-semibold text-gray-800 text-lg">Resumen General</h2>
                     <div className="flex-1 bg-gradient-to-r from-gray-300/30 to-transparent ml-4 h-px" />
                  </div>
                  <TrackingBar />
               </div>
            </section>

            {/* Main Content Sections */}
            <div className="space-y-8">
               {/* Activity Feed Section */}
               <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full w-1 h-6" />
                     <h2 className="font-semibold text-gray-800 text-lg">Actividad Reciente</h2>
                     <div className="flex-1 bg-gradient-to-r from-gray-300/30 to-transparent ml-4 h-px" />
                  </div>
                  <ActivityFeed />
               </div>

               {/* Staff and Alerts Section */}
               <section>
                  <div className="flex items-center gap-3 mb-6">
                     <div className="bg-gradient-to-b from-green-500 to-orange-500 rounded-full w-1 h-6" />
                     <h2 className="font-semibold text-gray-800 text-lg">Personal y Alertas</h2>
                     <div className="flex-1 bg-gradient-to-r from-gray-300/30 to-transparent ml-4 h-px" />
                  </div>

                  <div className="gap-6 grid grid-cols-1 xl:grid-cols-2">
                     <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
                        <StaffPanel />
                     </div>
                     <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
                        <PriorityAlerts />
                     </div>
                  </div>
               </section>

               {/* Navigation Section */}
               <section>
                  <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="bg-gradient-to-b from-purple-500 to-pink-500 rounded-full w-1 h-6" />
                        <h2 className="font-semibold text-gray-800 text-lg">Accesos Rápidos</h2>
                        <div className="flex-1 bg-gradient-to-r from-gray-300/30 to-transparent ml-4 h-px" />
                     </div>
                     <NavigationCards />
                  </div>
               </section>
            </div>

            {/* Enhanced Footer */}
            <div className="from-transparent via-brand-200/30 to-transparent mt-16 pt-8 border-gradient-to-r border-t text-center">
               <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 to-blue-500/5 blur-xl rounded-lg" />
                  <div className="relative">
                     <p className="font-medium text-gray-600 text-sm">
                        LLMed Clinic - Sistema de Gestión Médica
                     </p>
                     <p className="flex justify-center items-center gap-1 mt-1 text-gray-400 text-xs">
                        Demo v1.0 <Zap size={10} className="text-brand-400" />
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
