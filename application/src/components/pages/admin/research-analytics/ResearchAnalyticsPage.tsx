"use client"

import {
   Brain, TrendingUp, Users, BarChart3, Activity, Target,
   AlertCircle, FileText, Calendar, Database, LucideIcon
} from 'lucide-react';
import { useState } from 'react';
import ResearchMetricsCards from './ResearchMetricsCards';
import PatientDemographicsChart from './PatientDemographicsChart';
import TreatmentCorrelationsChart from './TreatmentCorrelationsChart';
import SurvivalAnalysisChart from './SurvivalAnalysisChart';
import TreatmentEffectivenessChart from './TreatmentEffectivenessChart';
import ComorbiditiesAnalysis from './ComorbiditiesAnalysis';
import LabParameterTrends from './LabParameterTrends';
import AIResearchInsights from './AIResearchInsights';

// Floating geometric shapes for background decoration
function FloatingGeometry () {
   return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {/* Simplified gradient orbs */}
         <div className="-top-24 -right-24 absolute bg-gradient-to-br from-brand-500/8 to-blue-500/4 rounded-full w-96 h-96 animate-pulse"
            style={{
               animationDuration: '6s'
            }}
         />
         <div className="top-1/2 -left-32 absolute bg-gradient-to-br from-green-400/6 to-brand-400/4 rounded-full w-64 h-64 animate-float"
            style={{
               animationDuration: '8s'
            }}
         />

         {/* Geometric lines */}
         <div className="top-20 left-1/4 absolute bg-gradient-to-b from-brand-300/25 to-transparent w-px h-32" />
         <div className="top-32 right-1/3 absolute bg-gradient-to-r from-blue-300/25 to-transparent w-24 h-px" />

         {/* Small floating dots */}
         <div className="top-16 left-1/3 absolute bg-brand-400 rounded-full w-2 h-2 animate-pulse" />
         <div className="right-1/4 bottom-20 absolute bg-blue-400 rounded-full w-1.5 h-1.5 animate-pulse"
            style={{
               animationDelay: '1s'
            }}
         />
      </div>
   );
}

// Header component
function ResearchHeader ({
   selectedPeriod, setSelectedPeriod
}: {
   selectedPeriod: string;
   setSelectedPeriod: (period: string) => void;
}) {
   const periods = [
      {
         value: '1year',
         label: '1 Año'
      },
      {
         value: '2years',
         label: '2 Años'
      },
      {
         value: '5years',
         label: '5 Años'
      },
      {
         value: 'all',
         label: 'Todo el período'
      }
   ];

   return (
      <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-6 mb-8">
         <div>
            <h1 className="mb-2 font-bold text-gray-900 text-3xl">
               Análisis de Investigación
            </h1>
            <p className="text-gray-600 text-lg">
               Datos y correlaciones clínicas para investigación médica
            </p>
         </div>

         <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
               <Calendar className="w-4 h-4 text-gray-500" />
               <span className="text-gray-500 text-sm">Período de análisis:</span>
            </div>
            <select
               value={selectedPeriod}
               onChange={(e) => setSelectedPeriod(e.target.value)}
               className="bg-white px-4 py-2 border border-gray-200 hover:border-brand-300 focus:border-brand-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-medium text-gray-700 text-sm transition-colors"
            >
               {periods.map((period) => (
                  <option key={period.value} value={period.value}>
                     {period.label}
                  </option>
               ))}
            </select>
         </div>
      </div>
   );
}

// Navigation tabs for different analysis sections
function AnalysisNavigation ({
   activeSection, setActiveSection
}: {
   activeSection: string;
   setActiveSection: (section: string) => void;
}) {
   const sections = [
      {
         id: 'overview',
         label: 'Resumen General',
         icon: BarChart3
      },
      {
         id: 'demographics',
         label: 'Demografia',
         icon: Users
      },
      {
         id: 'correlations',
         label: 'Correlaciones',
         icon: TrendingUp
      },
      {
         id: 'survival',
         label: 'Supervivencia',
         icon: Activity
      },
      {
         id: 'effectiveness',
         label: 'Efectividad',
         icon: Target
      },
      {
         id: 'ai-insights',
         label: 'IA Insights',
         icon: Brain
      }
   ];

   return (
      <div className="bg-white mb-8 p-2 border border-gray-200 rounded-xl">
         <div className="flex flex-wrap gap-2">
            {sections.map((section) => {
               const Icon = section.icon;
               const isActive = activeSection === section.id;

               return (
                  <button
                     key={section.id}
                     onClick={() => setActiveSection(section.id)}
                     className={`
                        flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                        ${isActive
                        ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                        : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50'
                        }
                     `}
                  >
                     <Icon className="w-4 h-4" />
                     {section.label}
                  </button>
               );
            })}
         </div>
      </div>
   );
}

// Main component
export default function ResearchAnalyticsPage () {
   const [selectedPeriod, setSelectedPeriod] = useState('5years');
   const [activeSection, setActiveSection] = useState('overview');

   const renderSection = () => {
      switch (activeSection) {
         case 'overview':
            return (
               <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
                  <ResearchMetricsCards />
                  <PatientDemographicsChart />
                  <div className="lg:col-span-2">
                     <LabParameterTrends />
                  </div>
               </div>
            );
         case 'demographics':
            return (
               <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
                  <PatientDemographicsChart />
                  <ComorbiditiesAnalysis />
               </div>
            );
         case 'correlations':
            return (
               <div className="space-y-8">
                  <TreatmentCorrelationsChart />
                  <LabParameterTrends />
               </div>
            );
         case 'survival':
            return (
               <div className="space-y-8">
                  <SurvivalAnalysisChart />
                  <TreatmentEffectivenessChart />
               </div>
            );
         case 'effectiveness':
            return (
               <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
                  <TreatmentEffectivenessChart />
                  <ComorbiditiesAnalysis />
               </div>
            );
         case 'ai-insights':
            return (
               <div className="space-y-8">
                  <AIResearchInsights />
               </div>
            );
         default:
            return (
               <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
                  <ResearchMetricsCards />
                  <PatientDemographicsChart />
               </div>
            );
      }
   };

   return (
      <div className="relative bg-gray-50 min-h-screen">
         <FloatingGeometry />

         <div className="z-10 relative mx-auto p-6 max-w-7xl">
            <ResearchHeader
               selectedPeriod={selectedPeriod}
               setSelectedPeriod={setSelectedPeriod}
            />

            <AnalysisNavigation
               activeSection={activeSection}
               setActiveSection={setActiveSection}
            />

            <div className="space-y-8">
               {renderSection()}
            </div>

            {/* Footer with data disclaimer */}
            <div className="bg-blue-50 mt-12 p-4 border border-blue-200 rounded-xl">
               <div className="flex items-start gap-3">
                  <AlertCircle className="flex-shrink-0 mt-0.5 w-5 h-5 text-blue-600" />
                  <div>
                     <h4 className="mb-1 font-medium text-blue-900">
                        Nota sobre los datos de investigación
                     </h4>
                     <p className="text-blue-700 text-sm">
                        Los datos presentados en esta sección están diseñados para demostración y propósitos de investigación.
                        Todos los análisis estadísticos y correlaciones mostrados se basan en datos simulados que reflejan
                        patrones típicos observados en centros de hemodiálisis. Para uso en investigación real, se requiere
                        validación adicional y aprobación del comité de ética correspondiente.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
