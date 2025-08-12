"use client";

import {
   CalendarIcon, PhoneIcon, FileTextIcon, ActivityIcon
} from "lucide-react";

export default function QuickActions () {
   const actions = [
      {
         icon: CalendarIcon,
         label: 'Agendar Cita',
         color: 'from-brand-500 to-blue-500',
         action: () => {
            // Scroll to schedule section
            document.getElementById('schedule-section')
               ?.scrollIntoView({
                  behavior: 'smooth'
               });
         }
      },
      {
         icon: PhoneIcon,
         label: 'Llamar Doctor',
         color: 'from-green-500 to-emerald-500',
         action: () => {
            document.getElementById('doctor-call-section')
               ?.scrollIntoView({
                  behavior: 'smooth'
               });
         }
      },
      {
         icon: ActivityIcon,
         label: 'Ver Signos',
         color: 'from-purple-500 to-pink-500',
         action: () => {
            document.getElementById('vitals-section')
               ?.scrollIntoView({
                  behavior: 'smooth'
               });
         }
      },
      {
         icon: FileTextIcon,
         label: 'Notas Médicas',
         color: 'from-orange-500 to-amber-500',
         action: () => {
            document.getElementById('notes-section')
               ?.scrollIntoView({
                  behavior: 'smooth'
               });
         }
      }
   ];

   return (
      <div className="mb-6">
         <div className="gap-3 grid grid-cols-2 sm:grid-cols-4">
            {actions.map((action, index) => (
               <button
                  key={index}
                  onClick={action.action}
                  className="group flex flex-col justify-center items-center bg-white/90 hover:bg-white shadow-sm hover:shadow-md p-4 border border-gray-200/50 rounded-xl hover:scale-105 transition-all duration-200"
               >
                  <div className={`flex items-center justify-center bg-gradient-to-r ${action.color} rounded-lg w-10 h-10 text-white mb-2 group-hover:scale-110 transition-transform`}>
                     <action.icon size={20} />
                  </div>
                  <span className="font-medium text-gray-700 text-xs text-center leading-tight">
                     {action.label}
                  </span>
               </button>
            ))}
         </div>
      </div>
   );
}
