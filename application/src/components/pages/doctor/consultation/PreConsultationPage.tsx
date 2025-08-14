'use client';

import {
   User, Clock, AlertTriangle, Pill, Activity,
   Heart, Scale, TestTube,
   ArrowRight, Stethoscope, Video, Users,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { mockPatientQuickInfo, PatientQuickInfo } from '@/data/mockData/consultationData';

interface PreConsultationPageProps {
   consultationId: string;
}

function PatientOverview ({ patientInfo }: { patientInfo: PatientQuickInfo }) {
   const getRiskColor = (risk: string) => {
      switch (risk) {
         case 'high':
            return 'text-red-600 bg-red-100 border-red-200';
         case 'medium':
            return 'text-yellow-600 bg-yellow-100 border-yellow-200';
         case 'low':
            return 'text-green-600 bg-green-100 border-green-200';
         default:
            return 'text-gray-600 bg-gray-100 border-gray-200';
      }
   };

   const getRiskLabel = (risk: string) => {
      switch (risk) {
         case 'high':
            return 'Riesgo Alto';
         case 'medium':
            return 'Riesgo Medio';
         case 'low':
            return 'Riesgo Bajo';
         default:
            return 'Riesgo';
      }
   };

   return (
      <div className="bg-white p-6 border border-gray-200 rounded-xl">
         <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
               <div className="flex justify-center items-center bg-brand-100 rounded-full w-16 h-16">
                  <User size={32} className="text-brand-600" />
               </div>
               <div>
                  <h2 className="font-bold text-gray-900 text-2xl">{patientInfo.name}</h2>
                  <p className="text-gray-600">{patientInfo.age} años • Tipo {patientInfo.bloodType}</p>
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border mt-2 ${getRiskColor(patientInfo.riskLevel)}`}>
                     <AlertTriangle size={14} />
                     {getRiskLabel(patientInfo.riskLevel)}
                  </div>
               </div>
            </div>
            <div className="text-right">
               <p className="text-gray-500 text-sm">Adherencia al tratamiento</p>
               <p className="font-bold text-blue-600 text-3xl">{patientInfo.adherence}%</p>
               <div className="bg-gray-200 mt-2 rounded-full w-20 h-2">
                  <div
                     className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                     style={{
                        width: `${patientInfo.adherence}%`
                     }}
                  />
               </div>
            </div>
         </div>

         <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            <div className="bg-gray-50 p-4 rounded-lg">
               <h4 className="mb-2 font-medium text-gray-900">Última Sesión</h4>
               <p className="text-gray-600 text-sm">
                  {new Date(patientInfo.lastSession)
                     .toLocaleDateString('es-ES', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                     })}
               </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
               <h4 className="mb-2 font-medium text-gray-900">Plan de Tratamiento</h4>
               <p className="text-gray-600 text-sm">{patientInfo.treatmentPlan}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
               <h4 className="mb-2 font-medium text-gray-900">Alertas Activas</h4>
               <p className="text-gray-600 text-sm">
                  {patientInfo.alerts.length > 0 ? `${patientInfo.alerts.length} alertas` : 'Sin alertas'}
               </p>
            </div>
         </div>
      </div>
   );
}

function VitalsPreview ({ patientInfo }: { patientInfo: PatientQuickInfo }) {
   const vitalsData = [
      {
         icon: Heart,
         label: 'Presión Arterial',
         value: patientInfo.recentVitals.bloodPressure,
         unit: 'mmHg',
         color: 'text-red-600 bg-red-100'
      },
      {
         icon: Activity,
         label: 'Frecuencia Cardíaca',
         value: patientInfo.recentVitals.heartRate,
         unit: 'bpm',
         color: 'text-blue-600 bg-blue-100'
      },
      {
         icon: Scale,
         label: 'Peso',
         value: patientInfo.recentVitals.weight,
         unit: 'kg',
         color: 'text-green-600 bg-green-100'
      }
   ];

   return (
      <div className="bg-white p-6 border border-gray-200 rounded-xl">
         <h3 className="mb-4 font-semibold text-gray-900 text-lg">Signos Vitales Recientes</h3>
         <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            {vitalsData.map((vital, index) => (
               <div key={index} className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${vital.color}`}>
                     <vital.icon size={20} />
                  </div>
                  <div>
                     <p className="text-gray-600 text-sm">{vital.label}</p>
                     <p className="font-bold text-gray-900 text-xl">
                        {vital.value} <span className="font-normal text-gray-500 text-sm">{vital.unit}</span>
                     </p>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

function LabResults ({ patientInfo }: { patientInfo: PatientQuickInfo }) {
   const getLabStatus = (value: number, normal: [number, number]) => {
      if (value < normal[0]) return {
         status: 'low',
         color: 'text-blue-600 bg-blue-50'
      };
      if (value > normal[1]) return {
         status: 'high',
         color: 'text-red-600 bg-red-50'
      };
      return {
         status: 'normal',
         color: 'text-green-600 bg-green-50'
      };
   };

   const labs = [
      {
         name: 'Creatinina',
         value: patientInfo.recentLabs.creatinine,
         unit: 'mg/dL',
         normal: [0.7, 1.3] as [number, number]
      },
      {
         name: 'Hemoglobina',
         value: patientInfo.recentLabs.hemoglobin,
         unit: 'g/dL',
         normal: [12, 16] as [number, number]
      },
      {
         name: 'Potasio',
         value: patientInfo.recentLabs.potassium,
         unit: 'mEq/L',
         normal: [3.5, 5.0] as [number, number]
      },
      {
         name: 'Fósforo',
         value: patientInfo.recentLabs.phosphorus,
         unit: 'mg/dL',
         normal: [2.5, 4.5] as [number, number]
      }
   ];

   return (
      <div className="bg-white p-6 border border-gray-200 rounded-xl">
         <h3 className="mb-4 font-semibold text-gray-900 text-lg">Laboratorios Recientes</h3>
         <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            {labs.map((lab, index) => {
               const status = getLabStatus(lab.value, lab.normal);
               return (
                  <div key={index} className={`p-4 rounded-lg border ${status.color}`}>
                     <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{lab.name}</span>
                        <TestTube size={16} className="text-gray-400" />
                     </div>
                     <p className="font-bold text-gray-900 text-2xl">
                        {lab.value} <span className="font-normal text-gray-500 text-sm">{lab.unit}</span>
                     </p>
                     <p className="mt-1 text-gray-500 text-xs">
                        Normal: {lab.normal[0]}-{lab.normal[1]} {lab.unit}
                     </p>
                  </div>
               );
            })}
         </div>
      </div>
   );
}

function MedicationsAndAllergies ({ patientInfo }: { patientInfo: PatientQuickInfo }) {
   return (
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
         {/* Current Medications */}
         <div className="bg-white p-6 border border-gray-200 rounded-xl">
            <h3 className="mb-4 font-semibold text-gray-900 text-lg">Medicamentos Actuales</h3>
            <div className="space-y-3">
               {patientInfo.currentMedications.map((medication: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 bg-green-50 p-3 rounded-lg">
                     <Pill size={16} className="text-green-600" />
                     <span className="text-gray-900">{medication}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Allergies */}
         <div className="bg-white p-6 border border-gray-200 rounded-xl">
            <h3 className="mb-4 font-semibold text-gray-900 text-lg">Alergias</h3>
            <div className="space-y-3">
               {patientInfo.allergies.map((allergy: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 bg-red-50 p-3 rounded-lg">
                     <AlertTriangle size={16} className="text-red-600" />
                     <span className="font-medium text-gray-900">{allergy}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

function StartConsultationCard ({
   consultationType, onStartConsultation
}: {
   consultationType: 'in-person' | 'video';
   onStartConsultation: () => void;
}) {
   return (
      <div className="bg-white p-6 border border-gray-200 rounded-xl">
         <div className="text-center">
            <div className="mb-4">
               <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                  consultationType === 'video' ? 'bg-green-100' : 'bg-blue-100'
               }`}
               >
                  {consultationType === 'video' ? (
                     <Video size={32} className="text-green-600" />
                  ) : (
                     <Users size={32} className="text-blue-600" />
                  )}
               </div>
            </div>

            <h3 className="mb-2 font-semibold text-gray-900 text-lg">
               {consultationType === 'video' ? 'Consulta por Video Llamada' : 'Consulta Presencial'}
            </h3>

            <p className="mb-6 text-gray-600 text-sm">
               Revise la información del paciente y proceda cuando esté listo para iniciar la consulta.
            </p>

            <button
               onClick={onStartConsultation}
               className={`flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-medium mx-auto transition-colors text-white ${
                  consultationType === 'video'
                     ? 'bg-green-600 hover:bg-green-700'
                     : 'bg-blue-600 hover:bg-blue-700'
               }`}
            >
               {consultationType === 'video' ? <Video size={20} /> : <Stethoscope size={20} />}
               Iniciar Consulta
               <ArrowRight size={16} />
            </button>
         </div>
      </div>
   );
}

export default function PreConsultationPage ({ consultationId }: PreConsultationPageProps) {
   const [consultationType, setConsultationType] = useState<'in-person' | 'video'>('in-person');
   const patientInfo = mockPatientQuickInfo;

   useEffect(() => {
      // Get consultation type from URL params
      const urlParams = new URLSearchParams(window.location.search);
      const type = urlParams.get('type') as 'in-person' | 'video';
      if (type) {
         setConsultationType(type);
      }
   }, []);

   const handleStartConsultation = () => {
      window.location.href = `/doctor/consultation/${consultationId}?type=${consultationType}`;
   };

   const handleGoBack = () => {
      window.location.href = '/doctor/consultation';
   };

   return (
      <div className="bg-gray-50 min-h-screen">
         {/* Header */}
         <div className="bg-white border-gray-200 border-b">
            <div className="mx-auto px-6 py-4 max-w-7xl">
               <div className="flex justify-between items-center">
                  <div>
                     <h1 className="font-bold text-gray-900 text-xl">
                        Preparación de Consulta
                     </h1>
                     <div className="flex items-center gap-4 mt-1">
                        <span className="text-gray-600 text-sm">
                           {consultationType === 'video' ? 'Video Llamada' : 'Presencial'}
                        </span>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                           <Clock size={14} />
                           <span>Preparación en curso</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-3">
                     <button
                        onClick={handleGoBack}
                        className="hover:bg-gray-50 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 transition-colors"
                     >
                        Volver
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="mx-auto px-6 py-8 max-w-7xl">
            <div className="space-y-6">
               {/* Patient Overview */}
               <PatientOverview patientInfo={patientInfo} />

               {/* Vitals and Labs */}
               <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
                  <VitalsPreview patientInfo={patientInfo} />
                  <LabResults patientInfo={patientInfo} />
               </div>

               {/* Medications and Allergies */}
               <MedicationsAndAllergies patientInfo={patientInfo} />

               {/* Start Consultation Card */}
               <StartConsultationCard
                  consultationType={consultationType}
                  onStartConsultation={handleStartConsultation}
               />
            </div>
         </div>
      </div>
   );
}
