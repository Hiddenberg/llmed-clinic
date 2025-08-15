'use client';

import {
   User, Clock, Video, Users,
   Activity,
   Mic, MicOff, VideoOff, Phone, Settings
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
   ConsultationStage, ConsultationNote, mockActiveConsultation, mockPatientQuickInfo
} from '@/data/mockData/consultationData';
import PatientInfoCurtain from './PatientInfoCurtain';
import AIConsultationAssistant from './AIConsultationAssistant';
import ConsultationNotes from './ConsultationNotes';
import ConsultationStages from './ConsultationStages';
import VitalsInput from './VitalsInput';
import { ZoomSessionProvider } from '@/features/zoomCall/contexts/ZoomSessionContext';
import ZoomCallInterface from '@/features/zoomCall/components/ZoomCallInterface';

interface ActiveConsultationPageProps {
   consultationId: string;
}

function VideoInterface () {
   const [isMuted, setIsMuted] = useState(false);
   const [isVideoOff, setIsVideoOff] = useState(false);

   return (
      <div className="!relative !bg-gray-900 !rounded-xl !overflow-hidden">
         {/* Video Placeholder */}
         <div className="!flex !justify-center !items-center !bg-gray-800 !aspect-video">
            <div className="!text-white !text-center">
               <Video size={48} className="opacity-50 mx-auto mb-4" />
               <p className="font-medium text-lg">Video llamada con paciente</p>
               <p className="opacity-75 text-sm">Integración con Zoom pendiente</p>
            </div>
         </div>

         {/* Video Controls */}
         <div className="!bottom-4 !left-1/2 !absolute !flex !items-center !gap-3 !-translate-x-1/2 !transform">
            <button
               onClick={() => setIsMuted(!isMuted)}
               className={`!w-12 !h-12 !rounded-full !flex !items-center !justify-center !transition-colors ${
                  isMuted ? '!bg-red-600 hover:!bg-red-700' : '!bg-gray-700 hover:!bg-gray-600'
               }`}
            >
               {isMuted ? <MicOff size={20} className="text-white" /> : <Mic size={20} className="text-white" />}
            </button>

            <button
               onClick={() => setIsVideoOff(!isVideoOff)}
               className={`!w-12 !h-12 !rounded-full !flex !items-center !justify-center !transition-colors ${
                  isVideoOff ? '!bg-red-600 hover:!bg-red-700' : '!bg-gray-700 hover:!bg-gray-600'
               }`}
            >
               {isVideoOff ? <VideoOff size={20} className="text-white" /> : <Video size={20} className="text-white" />}
            </button>

            <button className="!flex !justify-center !items-center !bg-red-600 hover:!bg-red-700 !rounded-full !w-12 !h-12 !transition-colors">
               <Phone size={20} className="text-white" />
            </button>

            <button className="!flex !justify-center !items-center !bg-gray-700 hover:!bg-gray-600 !rounded-full !w-12 !h-12 !transition-colors">
               <Settings size={20} className="text-white" />
            </button>
         </div>

         {/* Patient Video (Small) */}
         <div className="!top-4 !right-4 !absolute !bg-gray-700 !rounded-lg !w-32 !h-24 !overflow-hidden">
            <div className="!flex !justify-center !items-center !w-full !h-full">
               <User size={24} className="text-gray-400" />
            </div>
         </div>
      </div>
   );
}

function InPersonInterface () {
   return (
      <div className="!bg-gradient-to-br !from-blue-50 !to-green-50 !p-8 !rounded-xl">
         <div className="text-center">
            <div className="!flex !justify-center !items-center !bg-brand-100 !mx-auto !mb-6 !rounded-full !w-24 !h-24">
               <Users size={40} className="text-brand-600" />
            </div>
            <h3 className="!mb-2 !font-semibold !text-gray-900 !text-xl">Consulta Presencial</h3>
            <p className="!mb-6 !text-gray-600">El paciente está presente en la consulta</p>

            <div className="!gap-4 !grid !grid-cols-2 !mx-auto !max-w-md">
               <div className="!bg-white !p-4 !rounded-lg !text-center">
                  <Clock size={24} className="mx-auto mb-2 text-blue-600" />
                  <p className="!font-medium !text-gray-900 !text-sm">Duración</p>
                  <p className="!font-bold !text-blue-600 !text-lg">15:30</p>
               </div>
               <div className="!bg-white !p-4 !rounded-lg !text-center">
                  <Activity size={24} className="mx-auto mb-2 text-green-600" />
                  <p className="!font-medium !text-gray-900 !text-sm">Estado</p>
                  <p className="!font-bold !text-green-600 !text-lg">Activa</p>
               </div>
            </div>
         </div>
      </div>
   );
}

function ConsultationTimer () {
   const [duration, setDuration] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setDuration(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
   }, []);

   const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString()
         .padStart(2, '0')}:${secs.toString()
         .padStart(2, '0')}`;
   };

   return (
      <div className="!flex !items-center !gap-2 !text-gray-600 !text-sm">
         <Clock size={16} />
         <span>Duración: {formatTime(duration)}</span>
      </div>
   );
}

export default function ActiveConsultationPage ({ consultationId }: ActiveConsultationPageProps) {
   const [showPatientInfo, setShowPatientInfo] = useState(false);
   const [consultationType, setConsultationType] = useState<'in-person' | 'video'>('in-person');
   const [consultation, setConsultation] = useState(mockActiveConsultation);

   useEffect(() => {
      // Get consultation type from URL params
      const urlParams = new URLSearchParams(window.location.search);
      const type = urlParams.get('type') as 'in-person' | 'video';
      if (type) {
         setConsultationType(type);
      }
   }, []);

   const handleEndConsultation = () => {
      // Navigate back to consultations list
      window.location.href = '/doctor/consultation';
   };

   const handleUpdateStage = (stageId: string, updates: Partial<ConsultationStage>) => {
      setConsultation(prev => ({
         ...prev,
         stages: prev.stages.map(stage =>
            stage.id === stageId ? {
               ...stage,
               ...updates
            } : stage
         )
      }));
   };

   const handleToggleTask = (stageId: string, taskId: string) => {
      setConsultation(prev => ({
         ...prev,
         stages: prev.stages.map(stage => {
            if (stage.id === stageId) {
               const updatedTasks = stage.tasks.map(task =>
                  task.id === taskId ? {
                     ...task,
                     completed: !task.completed
                  } : task
               );
               return {
                  ...stage,
                  tasks: updatedTasks
               };
            }
            return stage;
         })
      }));
   };

   const handleAddNote = (note: Omit<ConsultationNote, 'id' | 'timestamp'>) => {
      const newNote = {
         id: `note-${Date.now()}`,
         timestamp: new Date()
            .toISOString(),
         ...note
      };
      setConsultation(prev => ({
         ...prev,
         notes: [...prev.notes, newNote]
      }));
   };

   return (
      <div className="!relative !bg-gray-50 !min-h-screen">
         {/* Header */}
         <div className="!top-0 !z-50 !sticky !bg-white !border-gray-200 !border-b">
            <div className="!mx-auto !px-6 !py-4 !max-w-7xl">
               <div className="!flex !justify-between !items-center">
                  <div className="!flex !items-center !gap-4">
                     <div>
                        <h1 className="!font-bold !text-gray-900 !text-xl">
                           Consulta - {consultation.patientName}
                        </h1>
                        <div className="flex items-center gap-4 mt-1">
                           <span className="!text-gray-600 !text-sm">
                              {consultationType === 'video' ? 'Video Llamada' : 'Presencial'}
                           </span>
                           <ConsultationTimer />
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-3">
                     <button
                        onClick={() => setShowPatientInfo(true)}
                        className="!flex !items-center !gap-2 !bg-brand-600 hover:!bg-brand-700 !px-4 !py-2 !rounded-lg !text-white !transition-colors"
                     >
                        <User size={16} />
                        Info del Paciente
                     </button>
                     <button
                        onClick={handleEndConsultation}
                        className="!bg-red-600 hover:!bg-red-700 !px-4 !py-2 !rounded-lg !text-white !transition-colors"
                     >
                        Finalizar Consulta
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="!mx-auto !px-6 !py-6 !max-w-7xl">
            <div className="!gap-6 !grid !grid-cols-1 lg:!grid-cols-3">
               {/* Left Column - Video/In-Person Interface */}
               <div className="space-y-6 lg:col-span-2">
                  {
                     consultationType === 'video' && (
                     <div className="!bg-white !p-6 !border !border-gray-200 !rounded-xl">
                        {/* <VideoInterface /> */}
                        <ZoomSessionProvider sessionName="Consulta" sessionKey="555448987">
                           <ZoomCallInterface username="María Gonzáles" setIsLoading={() => {}} />
                        </ZoomSessionProvider>
                     </div>
                     )
                  }

                  {/* Consultation Stages */}
                  <ConsultationStages
                     stages={consultation.stages}
                     onUpdateStage={handleUpdateStage}
                     onToggleTask={handleToggleTask}
                  />

                  {/* Vitals Input */}
                  <VitalsInput vitals={consultation.vitals} />

                  {/* Notes Section */}
                  <ConsultationNotes
                     notes={consultation.notes}
                     onAddNote={handleAddNote}
                  />
               </div>

               {/* Right Column - AI Assistant */}
               <div className="space-y-6">
                  <AIConsultationAssistant suggestions={consultation.aiSuggestions} />
               </div>
            </div>
         </div>

         {/* Patient Info Curtain */}
         <PatientInfoCurtain
            isOpen={showPatientInfo}
            onClose={() => setShowPatientInfo(false)}
            patientInfo={mockPatientQuickInfo}
         />
      </div>
   );
}
