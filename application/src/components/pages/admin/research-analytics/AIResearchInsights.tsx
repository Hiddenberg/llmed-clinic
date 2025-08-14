"use client"

import {
   Brain, TrendingUp, Target, AlertTriangle, Users, Database, Calendar, Lightbulb
} from 'lucide-react';
import { mockAIResearchInsights } from '@/data/mockData/researchAnalyticsData';

export default function AIResearchInsights () {
   const data = mockAIResearchInsights;

   const getPriorityColor = (priority: string) => {
      switch (priority) {
         case 'critical':
            return 'bg-red-100 text-red-800 border-red-200';
         case 'high':
            return 'bg-amber-100 text-amber-800 border-amber-200';
         case 'medium':
            return 'bg-blue-100 text-blue-800 border-blue-200';
         case 'low':
            return 'bg-gray-100 text-gray-800 border-gray-200';
         default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
      }
   };

   const getPriorityLabel = (priority: string) => {
      switch (priority) {
         case 'critical':
            return 'Crítica';
         case 'high':
            return 'Alta';
         case 'medium':
            return 'Media';
         case 'low':
            return 'Baja';
         default:
            return 'N/A';
      }
   };

   const getCategoryIcon = (category: string) => {
      switch (category) {
         case 'predictive_modeling':
            return <TrendingUp className="w-4 h-4" />;
         case 'treatment_optimization':
            return <Target className="w-4 h-4" />;
         case 'risk_stratification':
            return <AlertTriangle className="w-4 h-4" />;
         case 'outcome_prediction':
            return <Brain className="w-4 h-4" />;
         case 'population_health':
            return <Users className="w-4 h-4" />;
         default:
            return <Brain className="w-4 h-4" />;
      }
   };

   const getCategoryLabel = (category: string) => {
      switch (category) {
         case 'predictive_modeling':
            return 'Modelado Predictivo';
         case 'treatment_optimization':
            return 'Optimización de Tratamiento';
         case 'risk_stratification':
            return 'Estratificación de Riesgo';
         case 'outcome_prediction':
            return 'Predicción de Resultados';
         case 'population_health':
            return 'Salud Poblacional';
         default:
            return 'Análisis General';
      }
   };

   const getEvidenceLevelColor = (level: string) => {
      switch (level) {
         case 'A':
            return 'bg-green-100 text-green-800';
         case 'B':
            return 'bg-blue-100 text-blue-800';
         case 'C':
            return 'bg-amber-100 text-amber-800';
         case 'D':
            return 'bg-red-100 text-red-800';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   };

   // Sort by priority and confidence
   const sortedData = [...data].sort((a, b) => {
      const priorityOrder = {
         'critical': 4,
         'high': 3,
         'medium': 2,
         'low': 1
      };
      const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
      const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;

      if (aPriority !== bPriority) {
         return bPriority - aPriority;
      }
      return b.confidence - a.confidence;
   });

   return (
      <div className="bg-white p-6 border border-gray-200 rounded-xl">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h2 className="mb-1 font-bold text-gray-900 text-xl">
                  Insights de Inteligencia Artificial
               </h2>
               <p className="text-gray-600 text-sm">
                  Análisis automatizado y recomendaciones basadas en machine learning
               </p>
            </div>
            <div className="bg-brand-50 p-2 rounded-lg">
               <Brain className="w-5 h-5 text-brand-600" />
            </div>
         </div>

         {/* Summary stats */}
         <div className="gap-4 grid grid-cols-4 mb-6">
            <div className="bg-red-50 p-3 rounded-lg text-center">
               <div className="font-bold text-red-900 text-lg">
                  {data.filter(d => d.priority === 'critical').length}
               </div>
               <div className="text-red-600 text-xs">Críticos</div>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg text-center">
               <div className="font-bold text-amber-900 text-lg">
                  {data.filter(d => d.priority === 'high').length}
               </div>
               <div className="text-amber-600 text-xs">Alta Prioridad</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
               <div className="font-bold text-green-900 text-lg">
                  {(data.reduce((sum, d) => sum + d.confidence, 0) / data.length).toFixed(0)}%
               </div>
               <div className="text-green-600 text-xs">Confianza Promedio</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center">
               <div className="font-bold text-blue-900 text-lg">
                  {data.reduce((sum, d) => sum + d.dataPoints, 0)
                     .toLocaleString()}
               </div>
               <div className="text-blue-600 text-xs">Puntos de Datos</div>
            </div>
         </div>

         {/* AI Insights */}
         <div className="space-y-6">
            {sortedData.map((insight, index) => (
               <div key={insight.id} className="hover:shadow-sm p-5 border border-gray-200 rounded-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                           <div className="bg-brand-50 p-2 rounded-lg">
                              {getCategoryIcon(insight.category)}
                           </div>
                           <div>
                              <h3 className="font-semibold text-gray-900">
                                 {insight.title}
                              </h3>
                              <div className="text-gray-600 text-sm">
                                 {getCategoryLabel(insight.category)}
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(insight.priority)}`}>
                           {getPriorityLabel(insight.priority)}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getEvidenceLevelColor(insight.evidenceLevel)}`}>
                           Nivel {insight.evidenceLevel}
                        </div>
                     </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                     <p className="text-gray-700 text-sm leading-relaxed">
                        {insight.description}
                     </p>
                  </div>

                  {/* Clinical implication */}
                  <div className="bg-blue-50 mb-4 p-3 rounded-lg">
                     <h4 className="flex items-center gap-2 mb-2 font-semibold text-blue-900 text-sm">
                        <Lightbulb className="w-4 h-4" />
                        Implicación Clínica
                     </h4>
                     <p className="text-blue-800 text-sm">
                        {insight.clinicalImplication}
                     </p>
                  </div>

                  {/* Recommended action */}
                  <div className="bg-green-50 mb-4 p-3 rounded-lg">
                     <h4 className="flex items-center gap-2 mb-2 font-semibold text-green-900 text-sm">
                        <Target className="w-4 h-4" />
                        Acción Recomendada
                     </h4>
                     <p className="text-green-800 text-sm">
                        {insight.recommendedAction}
                     </p>
                  </div>

                  {/* Metrics */}
                  <div className="gap-4 grid grid-cols-4 text-sm">
                     <div className="bg-gray-50 p-2 rounded text-center">
                        <div className="font-semibold text-gray-900">
                           {insight.confidence}%
                        </div>
                        <div className="text-gray-600 text-xs">Confianza</div>
                     </div>
                     <div className="bg-gray-50 p-2 rounded text-center">
                        <div className="flex justify-center items-center gap-1 font-semibold text-gray-900">
                           <Database className="w-3 h-3" />
                           {insight.dataPoints.toLocaleString()}
                        </div>
                        <div className="text-gray-600 text-xs">Datos</div>
                     </div>
                     <div className="bg-gray-50 p-2 rounded text-center">
                        <div className="font-semibold text-gray-900">
                           {insight.evidenceLevel}
                        </div>
                        <div className="text-gray-600 text-xs">Evidencia</div>
                     </div>
                     <div className="bg-gray-50 p-2 rounded text-center">
                        <div className="flex justify-center items-center gap-1 font-semibold text-gray-900">
                           <Calendar className="w-3 h-3" />
                           {new Date(insight.generatedDate)
                              .toLocaleDateString('es-ES', {
                                 month: 'short',
                                 day: 'numeric'
                              })}
                        </div>
                        <div className="text-gray-600 text-xs">Generado</div>
                     </div>
                  </div>

                  {/* Confidence bar */}
                  <div className="mt-4">
                     <div className="flex justify-between items-center mb-1 text-xs">
                        <span className="text-gray-600">Nivel de confianza</span>
                        <span className="font-medium text-gray-900">{insight.confidence}%</span>
                     </div>
                     <div className="bg-gray-200 rounded-full w-full h-1.5">
                        <div
                           className={`h-1.5 rounded-full transition-all duration-500 ${
                              insight.confidence >= 85
                                 ? 'bg-gradient-to-r from-green-400 to-green-600'
                                 : insight.confidence >= 70
                                    ? 'bg-gradient-to-r from-amber-400 to-amber-600'
                                    : 'bg-gradient-to-r from-red-400 to-red-600'
                           }`}
                           style={{
                              width: `${insight.confidence}%`
                           }}
                        />
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* AI disclaimer */}
         <div className="mt-6 pt-6 border-gray-200 border-t">
            <div className="flex items-start gap-3 bg-gradient-to-r from-purple-50 to-blue-50 p-4 border border-purple-100 rounded-lg">
               <Brain className="flex-shrink-0 mt-0.5 w-5 h-5 text-purple-600" />
               <div>
                  <h4 className="mb-2 font-semibold text-purple-900 text-sm">
                     Acerca de los Insights de IA
                  </h4>
                  <p className="text-purple-800 text-sm leading-relaxed">
                     Estos insights son generados automáticamente mediante algoritmos de machine learning
                     que analizan patrones en los datos clínicos. Aunque están basados en evidencia científica
                     y estadística robusta, siempre deben ser interpretados por profesionales médicos calificados.
                     Los modelos se actualizan continuamente con nuevos datos para mejorar su precisión y relevancia clínica.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
