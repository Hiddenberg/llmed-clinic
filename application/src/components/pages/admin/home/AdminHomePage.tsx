import { Heart } from 'lucide-react';
import TrackingBar from './TrackingBar';
import ActivityFeed from './ActivityFeed';
import NavigationCards from './NavigationCards';

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
      <div className="mb-8">
         <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
               <div className="flex justify-center items-center bg-brand-50 rounded-lg w-12 h-12 text-brand-600 animate-breathe">
                  <Heart size={24} />
               </div>
               <div>
                  <div className="flex items-center gap-2">
                     <h1 className="font-bold text-text text-2xl">Panel de Administración</h1>
                     <div className="bg-green-400 rounded-full w-2 h-2 animate-pulse" />
                  </div>
                  <p className="text-text-muted text-sm">
                     {getGreeting()}, administrador • {currentTime}
                  </p>
               </div>
            </div>
         </div>
         <div className="bg-gradient-to-r from-brand-50 to-blue-50 p-4 border border-brand-100 rounded-lg">
            <p className="text-text-muted">
               Bienvenido al sistema de gestión integral de LLMed Clinic. Aquí puedes supervisar
               todas las actividades y gestionar los recursos de la clínica de hemodiálisis.
            </p>
         </div>
      </div>
   );
}

export default function AdminHomePage () {
   return (
      <div className="bg-muted min-h-screen">
         <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
            <Header />

            {/* Tracking Bar */}
            <div className="mb-8">
               <TrackingBar />
            </div>

            {/* Main Content Grid */}
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

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-border text-center">
               <p className="text-text-muted text-sm">
                  LLMed Clinic - Sistema de Gestión Médica
               </p>
               <p className="mt-1 text-text-muted text-xs">
                  Demo v1.0
               </p>
            </div>
         </div>
      </div>
   );
}
