import {
   Heart, Activity, Phone, FileText, Plus,
   LucideIcon
} from 'lucide-react';
// import { mockPatient } from '@/data/mockData/patientData';

import PatientWelcomeHeader from './PatientWelcomeHeader';
import AppointmentSchedulingSection from './AppointmentSchedulingSection';
import VitalSignsOverview from './VitalSignsOverview';
import DoctorCallSection from './DoctorCallSection';
import DoctorNotesSection from './DoctorNotesSection';
import QuickActions from './QuickActionsButton';

// Floating geometric shapes for background decoration - patient themed
function FloatingGeometry () {
   return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {/* Gentle gradient orbs with medical theme */}
         <div className="-top-24 -right-24 absolute bg-gradient-to-br from-brand-400/8 to-green-400/5 rounded-full w-80 h-80 animate-pulse"
            style={{
               animationDuration: '5s'
            }}
         />
         <div className="top-1/2 -left-32 absolute bg-gradient-to-br from-blue-300/6 to-brand-300/4 rounded-full w-64 h-64 animate-float"
            style={{
               animationDuration: '7s'
            }}
         />

         {/* Subtle geometric elements */}
         <div className="top-20 left-1/4 absolute bg-gradient-to-b from-brand-200/20 to-transparent w-px h-24" />
         <div className="top-32 right-1/3 absolute bg-gradient-to-r from-green-200/20 to-transparent w-20 h-px" />

         {/* Small floating medical-themed dots */}
         <div className="top-16 left-1/3 absolute bg-brand-300 rounded-full w-1.5 h-1.5 animate-pulse" />
         <div className="right-1/4 bottom-20 absolute bg-green-300 rounded-full w-1 h-1 animate-pulse"
            style={{
               animationDelay: '1.5s'
            }}
         />
         <div className="top-1/2 right-1/6 absolute bg-blue-300 rounded-full w-1 h-1 animate-pulse"
            style={{
               animationDelay: '3s'
            }}
         />
      </div>
   );
}

// Section header component
function SectionHeader ({
   icon: Icon, title, gradient, id
}: {
   icon: LucideIcon;
   title: string;
   gradient: string;
   id?: string;
}) {
   return (
      <div id={id} className="flex items-center gap-3 mb-4">
         <div className={`flex items-center justify-center bg-gradient-to-r ${gradient} rounded-lg w-8 h-8 text-white`}>
            <Icon size={16} />
         </div>
         <h2 className="font-semibold text-gray-800 text-lg">{title}</h2>
         <div className="flex-1 bg-gradient-to-r from-gray-300/30 to-transparent ml-2 h-px" />
      </div>
   );
}

export default function PatientHomePage () {
   return (
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-brand-50/20 min-h-screen">
         {/* Background decoration */}
         <div className="fixed inset-0 pointer-events-none">
            <FloatingGeometry />
            <div className="top-0 right-0 absolute bg-gradient-to-bl from-brand-50/30 to-transparent w-1/2 h-1/2" />
            <div className="bottom-0 left-0 absolute bg-gradient-to-tr from-green-50/20 to-transparent w-1/2 h-1/2" />
         </div>

         <div className="relative mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 max-w-4xl">
            {/* Welcome Header */}
            <PatientWelcomeHeader />

            {/* Quick Actions - Mobile First */}
            <QuickActions />

            {/* Main Content Sections */}
            <div className="space-y-6">
               {/* Appointment Scheduling Section */}
               <section id="schedule-section" className="bg-white/95 shadow-sm backdrop-blur-sm p-5 border border-white/50 rounded-2xl">
                  <SectionHeader
                     icon={Plus}
                     title="Mis Citas Médicas"
                     gradient="from-green-500 to-emerald-500"
                     id="schedule-section"
                  />
                  <AppointmentSchedulingSection />
               </section>

               {/* Vital Signs Overview */}
               <section id="vitals-section" className="bg-white/95 shadow-sm backdrop-blur-sm p-5 border border-white/50 rounded-2xl">
                  <SectionHeader
                     icon={Activity}
                     title="Signos Vitales Recientes"
                     gradient="from-purple-500 to-pink-500"
                  />
                  <VitalSignsOverview />
               </section>

               {/* Doctor Call Section */}
               <section id="doctor-call-section" className="bg-white/95 shadow-sm backdrop-blur-sm p-5 border border-white/50 rounded-2xl">
                  <SectionHeader
                     icon={Phone}
                     title="Contactar con su Doctor"
                     gradient="from-orange-500 to-red-500"
                  />
                  <DoctorCallSection />
               </section>

               {/* Doctor Notes Section */}
               <section id="notes-section" className="bg-white/95 shadow-sm backdrop-blur-sm p-5 border border-white/50 rounded-2xl">
                  <SectionHeader
                     icon={FileText}
                     title="Notas de su Doctor"
                     gradient="from-indigo-500 to-purple-500"
                  />
                  <DoctorNotesSection />
               </section>
            </div>

            {/* Footer */}
            <div className="from-transparent via-brand-200/20 to-transparent mt-12 pt-6 border-gradient-to-r border-t text-center">
               <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-400/5 to-green-400/5 blur-xl rounded-lg" />
                  <div className="relative">
                     <p className="font-medium text-gray-600 text-sm">
                        LLMed Clinic - Portal del Paciente
                     </p>
                     <p className="flex justify-center items-center gap-1 mt-1 text-gray-400 text-xs">
                        Cuidando su salud <Heart size={10} className="text-brand-400" />
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
