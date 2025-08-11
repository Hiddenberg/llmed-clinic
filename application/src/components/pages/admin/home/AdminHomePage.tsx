import {
   Heart, Zap, TrendingUp
} from 'lucide-react';
import TrackingBar from './TrackingBar';
import ActivityFeed from './ActivityFeed';
import NavigationCards from './NavigationCards';

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

   const currentHour = new Date()
      .getHours();
   const getGreeting = () => {
      if (currentHour < 12) return 'Buenos días';
      if (currentHour < 18) return 'Buenas tardes';
      return 'Buenas noches';
   };

   return (
      <div className="relative mb-8">
         <FloatingGeometry />

         {/* Simplified header */}
         <div className="relative bg-white/95 shadow-lg p-6 border border-gray-200/50 rounded-2xl">
            <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mb-6">
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
                     <span className="font-medium">Sistema Operativo</span>
                  </div>
               </div>
            </div>

            {/* Simplified welcome message */}
            <div className="relative">
               <div className="relative bg-gradient-to-r from-brand-50 via-white to-blue-50 p-5 border border-brand-100/50 rounded-xl">
                  <p className="text-gray-700 leading-relaxed">
                     Bienvenido al <span className="bg-clip-text bg-gradient-to-r from-brand-600 to-blue-600 font-semibold text-transparent">sistema de gestión integral</span> de LLMed Clinic.
                     Supervisa todas las actividades y gestiona los recursos de la clínica de hemodiálisis.
                  </p>
               </div>
            </div>
         </div>
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

         <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
            <Header />

            {/* Enhanced Tracking Bar */}
            <div className="mb-8">
               <TrackingBar />
            </div>

            {/* Main Content Grid with better spacing */}
            <div className="gap-8 grid grid-cols-1 xl:grid-cols-3">
               {/* Navigation Cards */}
               <div className="order-1 xl:col-span-2">
                  <NavigationCards />
               </div>

               {/* Activity Feed */}
               <div className="order-2 xl:col-span-1">
                  <ActivityFeed />
               </div>
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
