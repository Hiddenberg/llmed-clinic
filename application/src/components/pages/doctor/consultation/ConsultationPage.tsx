"use client"

import {
   Video, Users, Clock, Calendar, Play, Plus,
   Stethoscope, FileText, AlertTriangle, X, Search
} from 'lucide-react';
import { useState } from 'react';
import { DoctorAppointment, mockTodayAppointments } from '@/data/mockData/doctorData';
import { mockActiveConsultation } from '@/data/mockData/consultationData';

interface ConsultationCardProps {
   appointment: DoctorAppointment;
   onStartConsultation: (id: string, type: 'in-person' | 'video') => void;
}

function ConsultationCard ({
   appointment, onStartConsultation
}: ConsultationCardProps) {
   const getStatusColor = (status: string) => {
      switch (status) {
         case 'upcoming':
            return 'border-blue-200 bg-blue-50';
         case 'in-progress':
            return 'border-green-200 bg-green-50';
         default:
            return 'border-gray-200 bg-white';
      }
   };

   return (
      <div className={`rounded-xl border-2 p-6 transition-all hover:shadow-md ${getStatusColor(appointment.status)}`}>
         <div className="flex justify-between items-start mb-4">
            <div>
               <h3 className="font-semibold text-gray-900 text-lg">{appointment.patientName}</h3>
               <p className="text-gray-600 text-sm">{appointment.type === 'consultation' ? 'Consulta Médica' : 'Hemodiálisis'}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
               <Clock size={16} />
               {appointment.time} - {appointment.duration}
            </div>
         </div>

         <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
               <Calendar size={14} />
               <span>Último control: hace 3 días</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
               <AlertTriangle size={14} />
               <span>Riesgo: Medio</span>
            </div>
         </div>

         {appointment.status === 'upcoming' && (
            <div className="flex gap-2">
               <button
                  onClick={() => onStartConsultation(appointment.id, 'in-person')}
                  className="flex flex-1 justify-center items-center gap-2 bg-brand-600 hover:bg-brand-700 px-4 py-2 rounded-lg text-white transition-colors"
               >
                  <Users size={16} />
                  Presencial
               </button>
               <button
                  onClick={() => onStartConsultation(appointment.id, 'video')}
                  className="flex flex-1 justify-center items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white transition-colors"
               >
                  <Video size={16} />
                  Video Llamada
               </button>
            </div>
         )}

         {appointment.status === 'in-progress' && (
            <div className="flex gap-2">
               <button className="flex flex-1 justify-center items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white transition-colors">
                  <Play size={16} />
                  Continuar Consulta
               </button>
            </div>
         )}
      </div>
   );
}

function QuickActions ({ onNewConsultation }: { onNewConsultation: () => void }) {
   const handleReviewNotes = () => {
      // Navigate to medical records or notes section
      window.location.href = '/doctor/medical-records';
   };

   return (
      <div className="bg-white p-6 border border-gray-200 rounded-xl">
         <h2 className="mb-4 font-semibold text-gray-900">Acciones Rápidas</h2>
         <div className="space-y-3">
            <button
               onClick={onNewConsultation}
               className="flex items-center gap-3 hover:bg-gray-50 p-3 border border-gray-200 rounded-lg w-full text-left transition-colors"
            >
               <div className="flex justify-center items-center bg-brand-100 rounded-lg w-10 h-10">
                  <Plus size={20} className="text-brand-600" />
               </div>
               <div>
                  <p className="font-medium text-gray-900">Nueva Consulta</p>
                  <p className="text-gray-500 text-sm">Iniciar consulta no programada</p>
               </div>
            </button>

            <button
               onClick={handleReviewNotes}
               className="flex items-center gap-3 hover:bg-gray-50 p-3 border border-gray-200 rounded-lg w-full text-left transition-colors"
            >
               <div className="flex justify-center items-center bg-green-100 rounded-lg w-10 h-10">
                  <FileText size={20} className="text-green-600" />
               </div>
               <div>
                  <p className="font-medium text-gray-900">Revisar Notas</p>
                  <p className="text-gray-500 text-sm">Ver consultas anteriores</p>
               </div>
            </button>
         </div>
      </div>
   );
}

function ConsultationStats () {
   const stats = [
      {
         label: 'Consultas Hoy',
         value: '8',
         icon: Calendar,
         color: 'bg-blue-100 text-blue-600'
      },
      {
         label: 'En Progreso',
         value: '2',
         icon: Stethoscope,
         color: 'bg-green-100 text-green-600'
      },
      {
         label: 'Completadas',
         value: '5',
         icon: FileText,
         color: 'bg-gray-100 text-gray-600'
      }
   ];

   return (
      <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-8">
         {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 border border-gray-200 rounded-xl">
               <div className="flex justify-between items-center">
                  <div>
                     <p className="mb-1 text-gray-600 text-sm">{stat.label}</p>
                     <p className="font-bold text-gray-900 text-2xl">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                     <stat.icon size={24} />
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}

export default function ConsultationPage () {
   const [selectedDate, setSelectedDate] = useState(new Date()
      .toISOString()
      .split('T')[0]);
   const [showNewConsultationModal, setShowNewConsultationModal] = useState(false);

   const handleStartConsultation = (appointmentId: string, type: 'in-person' | 'video') => {
      // Navigate to active consultation
      window.location.href = `/doctor/consultation/cons-${appointmentId}?type=${type}`;
   };

   const handleNewConsultation = () => {
      setShowNewConsultationModal(true);
   };

   const handleContinueActiveConsultation = () => {
      window.location.href = `/doctor/consultation/${mockActiveConsultation.id}?type=${mockActiveConsultation.consultationType}`;
   };

   // Filter consultations by selected date
   const todayConsultations = mockTodayAppointments.filter(apt => {
      const isConsultationType = apt.type === 'consultation' || apt.type === 'follow-up';
      // For demo purposes, we'll show all consultations regardless of date
      return isConsultationType;
   });

   return (
      <div className="bg-gray-50 min-h-screen">
         {/* Header */}
         <div className="bg-white border-gray-200 border-b">
            <div className="mx-auto px-6 py-6 max-w-7xl">
               <div className="flex justify-between items-center">
                  <div>
                     <h1 className="font-bold text-gray-900 text-2xl">Consultas Médicas</h1>
                     <p className="mt-1 text-gray-600">Gestiona tus consultas presenciales y por video llamada</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-4 py-2 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-brand-500"
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="mx-auto px-6 py-8 max-w-7xl">
            <ConsultationStats />

            <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
               {/* Consultations List */}
               <div className="lg:col-span-2">
                  <div className="flex justify-between items-center mb-6">
                     <h2 className="font-semibold text-gray-900 text-xl">Consultas de Hoy</h2>
                     <span className="text-gray-500 text-sm">{todayConsultations.length} consultas programadas</span>
                  </div>

                  <div className="space-y-4">
                     {todayConsultations.map((appointment) => (
                        <ConsultationCard
                           key={appointment.id}
                           appointment={appointment}
                           onStartConsultation={handleStartConsultation}
                        />
                     ))}
                  </div>
               </div>

               {/* Sidebar */}
               <div className="space-y-6">
                  <QuickActions onNewConsultation={handleNewConsultation} />

                  {/* Active Consultation Preview */}
                  <div className="bg-white p-6 border border-gray-200 rounded-xl">
                     <h3 className="mb-4 font-semibold text-gray-900">Consulta Activa</h3>
                     <div className="space-y-3">
                        <div className="flex items-center gap-3">
                           <div className="bg-green-500 rounded-full w-3 h-3 animate-pulse" />
                           <span className="text-gray-600 text-sm">En progreso</span>
                        </div>
                        <p className="font-medium text-gray-900">{mockActiveConsultation.patientName}</p>
                        <p className="text-gray-500 text-sm">Iniciada hace 15 minutos</p>
                        <button
                           onClick={handleContinueActiveConsultation}
                           className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg w-full text-white transition-colors"
                        >
                           Regresar a la Consulta
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* New Consultation Modal */}
         {showNewConsultationModal && (
            <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
               <div className="bg-white p-6 rounded-xl w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="font-semibold text-gray-900 text-lg">Nueva Consulta</h3>
                     <button
                        onClick={() => setShowNewConsultationModal(false)}
                        className="text-gray-400 hover:text-gray-600"
                     >
                        <X size={20} />
                     </button>
                  </div>

                  <div className="space-y-4">
                     <div>
                        <label className="block mb-2 font-medium text-gray-700 text-sm">
                           Buscar Paciente
                        </label>
                        <div className="relative">
                           <Search size={16} className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2 transform" />
                           <input
                              type="text"
                              placeholder="Nombre del paciente..."
                              className="py-2 pr-4 pl-10 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-brand-500 w-full"
                           />
                        </div>
                     </div>

                     <div>
                        <label className="block mb-2 font-medium text-gray-700 text-sm">
                           Tipo de Consulta
                        </label>
                        <div className="gap-3 grid grid-cols-2">
                           <button
                              onClick={() => {
                                 setShowNewConsultationModal(false);
                                 window.location.href = '/doctor/consultation/new-consultation?type=in-person';
                              }}
                              className="flex justify-center items-center gap-2 hover:bg-gray-50 p-3 border border-gray-300 rounded-lg transition-colors"
                           >
                              <Users size={16} />
                              Presencial
                           </button>
                           <button
                              onClick={() => {
                                 setShowNewConsultationModal(false);
                                 window.location.href = '/doctor/consultation/new-consultation?type=video';
                              }}
                              className="flex justify-center items-center gap-2 hover:bg-gray-50 p-3 border border-gray-300 rounded-lg transition-colors"
                           >
                              <Video size={16} />
                              Video Llamada
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
