"use client"

import { useState } from 'react';
import {
   ArrowLeft, User, Phone, AlertTriangle,
   Activity, FileText, Pill, TestTube, Heart,
} from 'lucide-react';
import Link from 'next/link';
import { getPatientDetail } from '@/data/mockData/patientDetailData';
import PatientHeader from './PatientDetailComponents/PatientHeader';
import MedicalHistorySection from './PatientDetailComponents/MedicalHistorySection';
import MedicationsSection from './PatientDetailComponents/MedicationsSection';
import LabResultsSection from './PatientDetailComponents/LabResultsSection';
import VitalSignsSection from './PatientDetailComponents/VitalSignsSection';
import DialysisSessionsSection from './PatientDetailComponents/DialysisSessionsSection';
import ClinicalNotesSection from './PatientDetailComponents/ClinicalNotesSection';
import AIInsightsSidebar from './PatientDetailComponents/AIInsightsSidebar';

interface PatientDetailPageProps {
   patientId: string;
   userType: 'admin' | 'doctor';
}

export default function PatientDetailPage ({
   patientId, userType
}: PatientDetailPageProps) {
   const [activeTab, setActiveTab] = useState('overview');
   const patientData = getPatientDetail(patientId);

   if (!patientData) {
      return (
         <div className="flex justify-center items-center bg-gradient-to-br from-gray-50 via-white to-brand-50/30 min-h-screen">
            <div className="bg-white/60 shadow-lg backdrop-blur-sm p-8 border border-white/50 rounded-2xl text-center">
               <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
               <h2 className="mb-2 font-semibold text-gray-800 text-xl">Paciente no encontrado</h2>
               <p className="mb-4 text-gray-600">No se pudo encontrar la información del paciente solicitado.</p>
               <Link
                  href={`/${userType}/patients`}
                  className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 px-4 py-2 rounded-lg text-white transition-colors"
               >
                  <ArrowLeft size={16} />
                  Volver a la lista
               </Link>
            </div>
         </div>
      );
   }

   const tabs = [
      {
         id: 'overview',
         label: 'Resumen',
         icon: <User size={16} />
      },
      {
         id: 'history',
         label: 'Historia Médica',
         icon: <FileText size={16} />
      },
      {
         id: 'medications',
         label: 'Medicamentos',
         icon: <Pill size={16} />
      },
      {
         id: 'labs',
         label: 'Laboratorios',
         icon: <TestTube size={16} />
      },
      {
         id: 'vitals',
         label: 'Signos Vitales',
         icon: <Heart size={16} />
      },
      {
         id: 'dialysis',
         label: 'Diálisis',
         icon: <Activity size={16} />
      },
      {
         id: 'notes',
         label: 'Notas Clínicas',
         icon: <FileText size={16} />
      }
   ];

   return (
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-brand-50/30 min-h-screen">
         {/* Background decoration */}
         <div className="fixed inset-0 pointer-events-none">
            <div className="top-0 right-0 absolute bg-gradient-to-bl from-brand-100/20 to-transparent w-1/3 h-1/3" />
            <div className="bottom-0 left-0 absolute bg-gradient-to-tr from-blue-100/15 to-transparent w-1/2 h-1/2" />
         </div>

         <div className="relative mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 max-w-7xl">
            {/* Back Navigation */}
            <div className="mb-6">
               <Link
                  href={`/${userType}/patients`}
                  className="inline-flex items-center gap-2 bg-white/80 hover:bg-white/95 shadow-sm hover:shadow-md backdrop-blur-sm px-4 py-2 border border-white/50 rounded-xl text-gray-700 transition-all"
               >
                  <ArrowLeft size={16} />
                  Volver a la lista de pacientes
               </Link>
            </div>

            <div className="gap-6 grid grid-cols-1 xl:grid-cols-4">
               {/* Main Content */}
               <div className="space-y-6 xl:col-span-3">
                  {/* Patient Header */}
                  <PatientHeader patient={patientData.personalInfo} />

                  {/* Navigation Tabs */}
                  <div className="bg-white/40 shadow-sm backdrop-blur-sm border border-white/50 rounded-2xl overflow-hidden">
                     <div className="flex flex-wrap border-gray-200/50 border-b">
                        {tabs.map((tab) => (
                           <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all ${
                                 activeTab === tab.id
                                    ? 'bg-brand-50 border-brand-500 border-b-2 text-brand-700'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50/50'
                              }`}
                           >
                              {tab.icon}
                              {tab.label}
                           </button>
                        ))}
                     </div>

                     {/* Tab Content */}
                     <div className="p-6">
                        {activeTab === 'overview' && (
                           <div className="space-y-6">
                              <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
                                 <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
                                       <User size={20} className="text-brand-500" />
                                       Información Personal
                                    </h3>
                                    <div className="space-y-3">
                                       <div className="flex justify-between items-center py-2 border-gray-200/50 border-b">
                                          <span className="text-gray-600 text-sm">Fecha de Nacimiento:</span>
                                          <span className="font-medium text-gray-800">{new Date(patientData.personalInfo.dateOfBirth)
                                             .toLocaleDateString('es-ES')}</span>
                                       </div>
                                       <div className="flex justify-between items-center py-2 border-gray-200/50 border-b">
                                          <span className="text-gray-600 text-sm">Género:</span>
                                          <span className="font-medium text-gray-800">{patientData.personalInfo.gender === 'female' ? 'Femenino' : 'Masculino'}</span>
                                       </div>
                                       <div className="flex justify-between items-center py-2 border-gray-200/50 border-b">
                                          <span className="text-gray-600 text-sm">Tipo de Sangre:</span>
                                          <span className="font-medium text-gray-800">{patientData.personalInfo.bloodType}</span>
                                       </div>
                                       <div className="flex justify-between items-center py-2 border-gray-200/50 border-b">
                                          <span className="text-gray-600 text-sm">MRN:</span>
                                          <span className="font-medium text-gray-800">{patientData.personalInfo.mrn}</span>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
                                       <Phone size={20} className="text-green-500" />
                                       Contacto y Seguro
                                    </h3>
                                    <div className="space-y-3">
                                       <div className="flex justify-between items-center py-2 border-gray-200/50 border-b">
                                          <span className="text-gray-600 text-sm">Teléfono:</span>
                                          <span className="font-medium text-gray-800">{patientData.personalInfo.phone}</span>
                                       </div>
                                       <div className="flex justify-between items-center py-2 border-gray-200/50 border-b">
                                          <span className="text-gray-600 text-sm">Email:</span>
                                          <span className="font-medium text-gray-800">{patientData.personalInfo.email}</span>
                                       </div>
                                       <div className="flex justify-between items-center py-2 border-gray-200/50 border-b">
                                          <span className="text-gray-600 text-sm">Seguro:</span>
                                          <span className="font-medium text-gray-800">{patientData.personalInfo.insurance.provider}</span>
                                       </div>
                                       <div className="flex justify-between items-center py-2 border-gray-200/50 border-b">
                                          <span className="text-gray-600 text-sm">Contacto de Emergencia:</span>
                                          <span className="font-medium text-gray-800">
                                             {patientData.personalInfo.emergencyContact.name} ({patientData.personalInfo.emergencyContact.relation})
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              {/* Allergies Section */}
                              <div className="space-y-4">
                                 <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
                                    <AlertTriangle size={20} className="text-red-500" />
                                    Alergias
                                 </h3>
                                 <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                                    {patientData.allergies.map((allergy, index) => (
                                       <div key={index} className="bg-red-50 p-4 border border-red-200 rounded-lg">
                                          <div className="flex justify-between items-start mb-2">
                                             <h4 className="font-semibold text-red-800">{allergy.allergen}</h4>
                                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                allergy.severity === 'severe'
                                                   ? 'bg-red-100 text-red-700'
                                                   : allergy.severity === 'moderate'
                                                      ? 'bg-yellow-100 text-yellow-700'
                                                      : 'bg-green-100 text-green-700'
                                             }`}
                                             >
                                                {allergy.severity === 'severe' ? 'Severa' :
                                                   allergy.severity === 'moderate' ? 'Moderada' : 'Leve'}
                                             </span>
                                          </div>
                                          <p className="text-red-700 text-sm">{allergy.reaction}</p>
                                          {allergy.onsetDate && (
                                             <p className="mt-2 text-red-600 text-xs">
                                                Desde: {new Date(allergy.onsetDate)
                                                .toLocaleDateString('es-ES')}
                                             </p>
                                          )}
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        )}

                        {activeTab === 'history' && <MedicalHistorySection history={patientData.medicalHistory} />}
                        {activeTab === 'medications' && <MedicationsSection medications={patientData.currentMedications} />}
                        {activeTab === 'labs' && <LabResultsSection results={patientData.labResults} />}
                        {activeTab === 'vitals' && <VitalSignsSection vitals={patientData.vitalSigns} />}
                        {activeTab === 'dialysis' && <DialysisSessionsSection sessions={patientData.dialysisSessions} />}
                        {activeTab === 'notes' && <ClinicalNotesSection notes={patientData.clinicalNotes} />}
                     </div>
                  </div>
               </div>

               {/* AI Insights Sidebar */}
               <div className="xl:col-span-1">
                  <AIInsightsSidebar insights={patientData.aiInsights} />
               </div>
            </div>
         </div>
      </div>
   );
}
