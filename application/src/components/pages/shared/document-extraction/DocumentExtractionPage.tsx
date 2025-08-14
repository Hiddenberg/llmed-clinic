"use client"

import { useState, useCallback } from 'react';
import {
   Upload, FileText, CheckCircle, Loader2, ArrowLeft,
   User, AlertTriangle, Activity, TestTube, Heart, Pill
} from 'lucide-react';
import Link from 'next/link';
import FileUploadSection from './FileUploadSection';
import ProcessingSection from './ProcessingSection';
import ExtractedDataForm from './ExtractedDataForm';
import { ExtractedPatientData } from './types';

type ExtractionStage = 'upload' | 'processing' | 'extracted' | 'completed';

export default function DocumentExtractionPage () {
   const [currentStage, setCurrentStage] = useState<ExtractionStage>('upload');
   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
   const [extractedData, setExtractedData] = useState<ExtractedPatientData | null>(null);

   const handleFileUpload = useCallback((file: File) => {
      setUploadedFile(file);
      setCurrentStage('processing');

      // Simulate AI processing
      setTimeout(() => {
         setCurrentStage('extracted');
         // This would be replaced with actual AI extraction
         setExtractedData(generateMockExtractedData());
      }, 3000);
   }, []);

   const handleDataConfirmation = useCallback(() => {
      setCurrentStage('completed');
      // Here you would send the data to the backend
      console.log('Extracted data confirmed:', extractedData);
   }, [extractedData]);

   const resetProcess = useCallback(() => {
      setCurrentStage('upload');
      setUploadedFile(null);
      setExtractedData(null);
   }, []);

   return (
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-brand-50/30 min-h-screen">
         {/* Background decoration */}
         <div className="fixed inset-0 pointer-events-none">
            <div className="top-0 right-0 absolute bg-gradient-to-bl from-brand-100/20 to-transparent w-1/3 h-1/3" />
            <div className="bottom-0 left-0 absolute bg-gradient-to-tr from-blue-100/15 to-transparent w-1/2 h-1/2" />
         </div>

         <div className="relative mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 max-w-7xl">
            {/* Header */}
            <div className="mb-8">
               <div className="flex justify-between items-center mb-6">
                  <Link
                     href="/"
                     className="inline-flex items-center gap-2 bg-white/80 hover:bg-white/95 shadow-sm hover:shadow-md backdrop-blur-sm px-4 py-2 border border-white/50 rounded-xl text-gray-700 transition-all"
                  >
                     <ArrowLeft size={16} />
                     Volver al inicio
                  </Link>

                  {currentStage !== 'upload' && (
                     <button
                        onClick={resetProcess}
                        className="inline-flex items-center gap-2 bg-white/80 hover:bg-white/95 shadow-sm hover:shadow-md backdrop-blur-sm px-4 py-2 border border-white/50 rounded-xl text-gray-700 transition-all"
                     >
                        <Upload size={16} />
                        Subir otro documento
                     </button>
                  )}
               </div>

               <div className="bg-white/60 shadow-lg backdrop-blur-sm p-8 border border-white/50 rounded-2xl">
                  <h1 className="flex items-center gap-3 mb-4 font-bold text-gray-800 text-3xl">
                     <FileText className="text-brand-500" size={32} />
                     Extracción de Documentos Médicos
                  </h1>
                  <p className="text-gray-600 text-lg leading-relaxed">
                     Sube un documento médico en formato PDF (historia clínica, resultados de laboratorio, etc.)
                     y nuestro sistema de IA extraerá automáticamente la información relevante para integrarla
                     en el expediente del paciente.
                  </p>
               </div>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
               <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
                  <div className="flex justify-between items-center">
                     {[
                        {
                           id: 'upload',
                           label: 'Subir Documento',
                           icon: Upload
                        },
                        {
                           id: 'processing',
                           label: 'Procesando',
                           icon: Loader2
                        },
                        {
                           id: 'extracted',
                           label: 'Revisar Datos',
                           icon: FileText
                        },
                        {
                           id: 'completed',
                           label: 'Completado',
                           icon: CheckCircle
                        }
                     ].map((step, index) => {
                        const Icon = step.icon;
                        const isActive = currentStage === step.id;
                        const isCompleted = ['upload', 'processing', 'extracted'].indexOf(currentStage) > ['upload', 'processing', 'extracted'].indexOf(step.id);

                        return (
                           <div key={step.id} className="flex items-center">
                              <div className={`flex items-center gap-3 ${index < 3 ? 'mr-4' : ''}`}>
                                 <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                                    isCompleted
                                       ? 'bg-green-500 text-white'
                                       : isActive
                                          ? 'bg-brand-500 text-white'
                                          : 'bg-gray-200 text-gray-500'
                                 }`}
                                 >
                                    {isCompleted ? (
                                       <CheckCircle size={20} />
                                    ) : (
                                       <Icon size={20} className={isActive && step.id === 'processing' ? 'animate-spin' : ''} />
                                    )}
                                 </div>
                                 <span className={`font-medium ${
                                    isActive ? 'text-brand-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                                 }`}
                                 >
                                    {step.label}
                                 </span>
                              </div>
                              {index < 3 && (
                                 <div className={`flex-1 h-0.5 mx-4 transition-all ${
                                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                                 }`}
                                 />
                              )}
                           </div>
                        );
                     })}
                  </div>
               </div>
            </div>

            {/* Content based on current stage */}
            {currentStage === 'upload' && (
               <FileUploadSection onFileUpload={handleFileUpload} />
            )}

            {currentStage === 'processing' && uploadedFile && (
               <ProcessingSection fileName={uploadedFile.name} />
            )}

            {currentStage === 'extracted' && extractedData && (
               <ExtractedDataForm
                  extractedData={extractedData}
                  onConfirm={handleDataConfirmation}
                  onEdit={(updatedData) => setExtractedData(updatedData)}
               />
            )}

            {currentStage === 'completed' && (
               <div className="bg-white/60 shadow-lg backdrop-blur-sm p-8 border border-white/50 rounded-2xl text-center">
                  <CheckCircle size={64} className="mx-auto mb-6 text-green-500" />
                  <h2 className="mb-4 font-bold text-gray-800 text-2xl">¡Extracción Completada!</h2>
                  <p className="mb-6 text-gray-600 text-lg">
                     Los datos han sido extraídos exitosamente y están listos para ser integrados al sistema.
                  </p>
                  <div className="flex justify-center gap-4">
                     <button
                        onClick={resetProcess}
                        className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 px-6 py-3 rounded-lg text-white transition-colors"
                     >
                        <Upload size={20} />
                        Procesar otro documento
                     </button>
                     <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-gray-500 hover:bg-gray-600 px-6 py-3 rounded-lg text-white transition-colors"
                     >
                        Ir al inicio
                     </Link>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

// Mock data generator - this would be replaced with actual AI extraction
function generateMockExtractedData (): ExtractedPatientData {
   return {
      documentInfo: {
         fileName: 'historia_clinica_juan_perez.pdf',
         documentType: 'clinical_record',
         extractionDate: new Date()
            .toISOString(),
         confidence: 0.95,
         pagesProcessed: 3
      },
      personalInfo: {
         fullName: 'Juan Carlos Pérez González',
         dateOfBirth: '1975-08-15',
         gender: 'male',
         phone: '+52 55 1234 5678',
         email: 'juan.perez@email.com',
         address: 'Av. Reforma 123, Col. Centro, CDMX',
         mrn: 'MRN-2024-001',
         bloodType: 'O+',
         emergencyContact: {
            name: 'María Elena González',
            relation: 'Esposa',
            phone: '+52 55 9876 5432'
         },
         insurance: {
            provider: 'IMSS',
            policyNumber: 'POL-123456789',
            groupNumber: 'GRP-001'
         }
      },
      medicalHistory: [
         {
            condition: 'Insuficiencia Renal Crónica Estadio 5',
            diagnosisDate: '2022-03-15',
            icd10Code: 'N18.6',
            status: 'active',
            severity: 'severe',
            notes: 'Paciente requiere hemodiálisis 3 veces por semana'
         },
         {
            condition: 'Hipertensión Arterial',
            diagnosisDate: '2020-01-10',
            icd10Code: 'I10',
            status: 'active',
            severity: 'moderate',
            notes: 'Controlada con medicación'
         },
         {
            condition: 'Diabetes Mellitus Tipo 2',
            diagnosisDate: '2018-06-20',
            icd10Code: 'E11',
            status: 'active',
            severity: 'moderate',
            notes: 'HbA1c: 7.2%'
         }
      ],
      medications: [
         {
            name: 'Losartán',
            dosage: '50mg',
            frequency: '1 vez al día',
            route: 'Oral',
            indication: 'Hipertensión arterial',
            prescribedBy: 'Dr. Roberto Martínez',
            status: 'active'
         },
         {
            name: 'Metformina',
            dosage: '850mg',
            frequency: '2 veces al día',
            route: 'Oral',
            indication: 'Diabetes mellitus tipo 2',
            prescribedBy: 'Dr. Ana López',
            status: 'active'
         },
         {
            name: 'Eritropoyetina',
            dosage: '4000 UI',
            frequency: '3 veces por semana',
            route: 'Subcutánea',
            indication: 'Anemia secundaria a IRC',
            prescribedBy: 'Dr. Roberto Martínez',
            status: 'active'
         }
      ],
      labResults: [
         {
            testName: 'Creatinina',
            value: '8.5',
            unit: 'mg/dL',
            referenceRange: '0.7-1.3',
            status: 'critical',
            date: '2024-01-15',
            notes: 'Valor muy elevado, indica función renal severamente comprometida'
         },
         {
            testName: 'Hemoglobina',
            value: '9.2',
            unit: 'g/dL',
            referenceRange: '12.0-15.5',
            status: 'abnormal',
            date: '2024-01-15',
            notes: 'Anemia leve'
         },
         {
            testName: 'HbA1c',
            value: '7.2',
            unit: '%',
            referenceRange: '<7.0',
            status: 'abnormal',
            date: '2024-01-15',
            notes: 'Control glucémico subóptimo'
         }
      ],
      vitalSigns: {
         date: '2024-01-15',
         systolicBP: 145,
         diastolicBP: 90,
         heartRate: 78,
         respiratoryRate: 18,
         temperature: 36.5,
         weight: 72.5,
         height: 175,
         oxygenSaturation: 98
      },
      allergies: [
         {
            allergen: 'Penicilina',
            reaction: 'Erupción cutánea',
            severity: 'moderate',
            onsetDate: '2015-03-10'
         }
      ],
      clinicalNotes: [
         {
            date: '2024-01-15',
            type: 'consultation',
            author: 'Dr. Roberto Martínez',
            specialty: 'Nefrología',
            chiefComplaint: 'Control de rutina de IRC',
            assessment: 'Paciente con IRC estadio 5 en programa de hemodiálisis. Presenta control adecuado de volemia y electrolitos.',
            plan: 'Continuar con hemodiálisis 3x/semana. Ajustar dosis de eritropoyetina. Control en 4 semanas.',
            followUp: 'Próxima cita en 4 semanas'
         }
      ]
   };
}
