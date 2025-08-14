"use client"

import React, { useState, useEffect } from 'react';
import {
   Loader2, FileText, Brain, Search, Database, CheckCircle
} from 'lucide-react';

interface ProcessingSectionProps {
   fileName: string;
}

interface ProcessingStep {
   id: string;
   label: string;
   icon: React.ComponentType<{ size?: number; className?: string }>;
   description: string;
}

const processingSteps: ProcessingStep[] = [
   {
      id: 'reading',
      label: 'Leyendo documento',
      icon: FileText,
      description: 'Analizando el contenido del PDF'
   },
   {
      id: 'ocr',
      label: 'Extrayendo texto',
      icon: Search,
      description: 'Reconocimiento óptico de caracteres'
   },
   {
      id: 'ai_analysis',
      label: 'Análisis con IA',
      icon: Brain,
      description: 'Identificando información médica relevante'
   },
   {
      id: 'structuring',
      label: 'Estructurando datos',
      icon: Database,
      description: 'Organizando la información extraída'
   },
   {
      id: 'validation',
      label: 'Validando resultados',
      icon: CheckCircle,
      description: 'Verificando la precisión de los datos'
   }
];

export default function ProcessingSection ({ fileName }: ProcessingSectionProps) {
   const [currentStep, setCurrentStep] = useState(0);
   const [progress, setProgress] = useState(0);

   useEffect(() => {
      const stepDuration = 600; // 600ms per step
      const progressInterval = 50; // Update progress every 50ms

      const interval = setInterval(() => {
         setProgress(prev => {
            const newProgress = prev + (100 / (processingSteps.length * (stepDuration / progressInterval)));

            if (newProgress >= 100) {
               clearInterval(interval);
               return 100;
            }

            return newProgress;
         });
      }, progressInterval);

      const stepInterval = setInterval(() => {
         setCurrentStep(prev => {
            if (prev < processingSteps.length - 1) {
               return prev + 1;
            } else {
               clearInterval(stepInterval);
               return prev;
            }
         });
      }, stepDuration);

      return () => {
         clearInterval(interval);
         clearInterval(stepInterval);
      };
   }, []);

   return (
      <div className="space-y-6">
         {/* Processing Header */}
         <div className="bg-white/60 shadow-lg backdrop-blur-sm p-8 border border-white/50 rounded-2xl text-center">
            <div className="mb-6">
               <div className="relative mx-auto mb-4 w-16 h-16">
                  <Loader2 size={64} className="text-brand-500 animate-spin" />
               </div>
               <h2 className="mb-2 font-bold text-gray-800 text-2xl">Procesando Documento</h2>
               <p className="text-gray-600 text-lg">
                  Nuestro sistema de IA está analizando: <span className="font-medium text-brand-600">{fileName}</span>
               </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
               <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700 text-sm">Progreso</span>
                  <span className="font-medium text-brand-600 text-sm">{Math.round(progress)}%</span>
               </div>
               <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                     className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-full h-full transition-all duration-100 ease-out"
                     style={{
                        width: `${progress}%`
                     }}
                  />
               </div>
            </div>

            {/* Current Step */}
            <div className="bg-brand-50/50 p-4 border border-brand-200 rounded-lg">
               <div className="flex justify-center items-center gap-3 mb-2">
                  {React.createElement(processingSteps[currentStep].icon, {
                     size: 24,
                     className: "text-brand-600"
                  })}
                  <span className="font-semibold text-brand-800 text-lg">
                     {processingSteps[currentStep].label}
                  </span>
               </div>
               <p className="text-brand-700 text-sm">
                  {processingSteps[currentStep].description}
               </p>
            </div>
         </div>

         {/* Processing Steps */}
         <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
            <h3 className="mb-6 font-semibold text-gray-800 text-lg">Pasos del Procesamiento</h3>
            <div className="space-y-4">
               {processingSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = index < currentStep;
                  const isActive = index === currentStep;
                  const isPending = index > currentStep;

                  return (
                     <div key={step.id} className="flex items-center gap-4">
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
                              <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                           )}
                        </div>

                        <div className="flex-1">
                           <div className="flex items-center gap-2">
                              <h4 className={`font-medium ${
                                 isActive ? 'text-brand-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                              }`}
                              >
                                 {step.label}
                              </h4>
                              {isActive && (
                                 <div className="flex gap-1">
                                    <div className="bg-brand-500 rounded-full w-2 h-2 animate-bounce"
                                       style={{
                                          animationDelay: '0ms'
                                       }}
                                    />
                                    <div className="bg-brand-500 rounded-full w-2 h-2 animate-bounce"
                                       style={{
                                          animationDelay: '150ms'
                                       }}
                                    />
                                    <div className="bg-brand-500 rounded-full w-2 h-2 animate-bounce"
                                       style={{
                                          animationDelay: '300ms'
                                       }}
                                    />
                                 </div>
                              )}
                           </div>
                           <p className={`text-sm ${
                              isActive ? 'text-brand-700' : isCompleted ? 'text-green-700' : 'text-gray-500'
                           }`}
                           >
                              {step.description}
                           </p>
                        </div>

                        {isCompleted && (
                           <CheckCircle size={20} className="text-green-500" />
                        )}
                     </div>
                  );
               })}
            </div>
         </div>

         {/* AI Information */}
         <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
               <Brain className="text-purple-500" size={24} />
               <h3 className="font-semibold text-gray-800 text-lg">Tecnología de IA</h3>
            </div>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
               <div className="bg-purple-50/50 p-4 border border-purple-200/50 rounded-lg">
                  <h4 className="font-medium text-purple-800 text-sm">OCR Avanzado</h4>
                  <p className="mt-1 text-purple-700 text-xs">
                     Reconocimiento de texto con precisión del 99.5%
                  </p>
               </div>
               <div className="bg-blue-50/50 p-4 border border-blue-200/50 rounded-lg">
                  <h4 className="font-medium text-blue-800 text-sm">NLP Médico</h4>
                  <p className="mt-1 text-blue-700 text-xs">
                     Procesamiento especializado en terminología médica
                  </p>
               </div>
               <div className="bg-green-50/50 p-4 border border-green-200/50 rounded-lg">
                  <h4 className="font-medium text-green-800 text-sm">Validación Automática</h4>
                  <p className="mt-1 text-green-700 text-xs">
                     Verificación de coherencia y completitud de datos
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
