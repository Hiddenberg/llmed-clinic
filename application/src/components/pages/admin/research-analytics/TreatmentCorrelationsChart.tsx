"use client"

import {
   TrendingUp, Users, Target, AlertCircle
} from 'lucide-react';
import {
   ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { mockTreatmentCorrelations } from '@/data/mockData/researchAnalyticsData';

export default function TreatmentCorrelationsChart () {
   const data = mockTreatmentCorrelations;

   const getSignificanceColor = (significance: string) => {
      switch (significance) {
         case 'high':
            return 'text-green-700 bg-green-100';
         case 'medium':
            return 'text-amber-700 bg-amber-100';
         case 'low':
            return 'text-orange-700 bg-orange-100';
         default:
            return 'text-gray-700 bg-gray-100';
      }
   };

   const getSignificanceLabel = (significance: string) => {
      switch (significance) {
         case 'high':
            return 'Alta';
         case 'medium':
            return 'Media';
         case 'low':
            return 'Baja';
         default:
            return 'N/S';
      }
   };

   const getCorrelationStrength = (coefficient: number) => {
      const abs = Math.abs(coefficient);
      if (abs >= 0.7) return {
         label: 'Fuerte',
         color: 'text-green-600'
      };
      if (abs >= 0.5) return {
         label: 'Moderada',
         color: 'text-amber-600'
      };
      if (abs >= 0.3) return {
         label: 'Débil',
         color: 'text-orange-600'
      };
      return {
         label: 'Muy débil',
         color: 'text-gray-600'
      };
   };

   return (
      <div className="bg-white p-6 border border-gray-200 rounded-xl">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h2 className="mb-1 font-bold text-gray-900 text-xl">
                  Correlaciones de Tratamiento
               </h2>
               <p className="text-gray-600 text-sm">
                  Análisis estadístico de relaciones entre parámetros clínicos
               </p>
            </div>
            <div className="bg-brand-50 p-2 rounded-lg">
               <TrendingUp className="w-5 h-5 text-brand-600" />
            </div>
         </div>

         {/* Legend */}
         <div className="bg-gray-50 mb-6 p-4 rounded-lg">
            <h3 className="mb-2 font-semibold text-gray-900 text-sm">Interpretación</h3>
            <div className="gap-4 grid grid-cols-2 text-gray-600 text-xs">
               <div>
                  <strong>Coeficiente de Correlación:</strong>
                  <div className="space-y-1 mt-1">
                     <div>0.7-1.0: Correlación fuerte</div>
                     <div>0.5-0.69: Correlación moderada</div>
                     <div>0.3-0.49: Correlación débil</div>
                  </div>
               </div>
               <div>
                  <strong>Valor p:</strong>
                  <div className="space-y-1 mt-1">
                     <div>&lt;0.01: Altamente significativo</div>
                     <div>0.01-0.05: Significativo</div>
                     <div>&gt;0.05: No significativo</div>
                  </div>
               </div>
            </div>
         </div>

         {/* Correlation strength visualization */}
         <div className="mb-8">
            <h3 className="mb-4 font-semibold text-gray-900 text-lg">
               Fuerza de Correlaciones
            </h3>
            <div className="h-80">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}
                     margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 100
                     }}
                  >
                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                     <XAxis
                        dataKey="parameter1"
                        tick={{
                           fontSize: 10,
                           fill: '#6b7280'
                        }}
                        axisLine={{
                           stroke: '#e5e7eb'
                        }}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                     />
                     <YAxis
                        domain={[0, 1]}
                        tick={{
                           fontSize: 12,
                           fill: '#6b7280'
                        }}
                        axisLine={{
                           stroke: '#e5e7eb'
                        }}
                        label={{
                           value: 'Coeficiente de Correlación',
                           angle: -90,
                           position: 'insideLeft'
                        }}
                     />
                     <Tooltip
                        contentStyle={{
                           backgroundColor: 'white',
                           border: '1px solid #e5e7eb',
                           borderRadius: '8px',
                           fontSize: '12px'
                        }}
                        formatter={(value: number) => [
                           `r = ${value.toFixed(3)}`,
                           'Correlación'
                        ]}
                        labelFormatter={(label: string) => `${label}`}
                     />
                     <Bar dataKey="correlationCoefficient" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                           <Cell key={`cell-${index}`}
                              fill={
                               Math.abs(entry.correlationCoefficient) >= 0.7 ? '#10B981' :
                                  Math.abs(entry.correlationCoefficient) >= 0.5 ? '#F59E0B' : '#EF4444'
                            }
                           />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Correlations */}
         <div className="space-y-4">
            {data.map((correlation, index) => {
               const strength = getCorrelationStrength(correlation.correlationCoefficient);

               return (
                  <div key={index} className="hover:shadow-sm p-4 border border-gray-200 rounded-lg transition-shadow">
                     <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                           <div className="mb-1 font-medium text-gray-900">
                              {correlation.parameter1} ↔ {correlation.parameter2}
                           </div>
                           <div className="text-gray-600 text-sm">
                              Análisis de {correlation.sampleSize} pacientes
                           </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSignificanceColor(correlation.significance)}`}>
                           {getSignificanceLabel(correlation.significance)}
                        </div>
                     </div>

                     {/* Correlation strength visualization */}
                     <div className="mb-3">
                        <div className="flex justify-between items-center mb-2 text-sm">
                           <span className="text-gray-600">Fuerza de correlación</span>
                           <span className={`font-medium ${strength.color}`}>
                              {strength.label} ({correlation.correlationCoefficient.toFixed(3)})
                           </span>
                        </div>
                        <div className="bg-gray-200 rounded-full w-full h-2">
                           <div
                              className={`h-2 rounded-full transition-all duration-500 ${
                                 Math.abs(correlation.correlationCoefficient) >= 0.7
                                    ? 'bg-gradient-to-r from-green-400 to-green-600'
                                    : Math.abs(correlation.correlationCoefficient) >= 0.5
                                       ? 'bg-gradient-to-r from-amber-400 to-amber-600'
                                       : 'bg-gradient-to-r from-orange-400 to-orange-600'
                              }`}
                              style={{
                                 width: `${Math.abs(correlation.correlationCoefficient) * 100}%`
                              }}
                           />
                        </div>
                     </div>

                     {/* Statistics */}
                     <div className="gap-4 grid grid-cols-3 text-sm">
                        <div className="bg-gray-50 p-2 rounded text-center">
                           <div className="font-semibold text-gray-900">
                              {correlation.correlationCoefficient.toFixed(3)}
                           </div>
                           <div className="text-gray-600 text-xs">Coeficiente r</div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded text-center">
                           <div className="font-semibold text-gray-900">
                              {correlation.pValue.toFixed(3)}
                           </div>
                           <div className="text-gray-600 text-xs">Valor p</div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded text-center">
                           <div className="flex justify-center items-center gap-1 font-semibold text-gray-900">
                              <Users className="w-3 h-3" />
                              {correlation.sampleSize}
                           </div>
                           <div className="text-gray-600 text-xs">Muestra</div>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>

         {/* Research implications */}
         <div className="mt-6 pt-6 border-gray-200 border-t">
            <h3 className="mb-3 font-semibold text-gray-900 text-sm">
               Implicaciones Clínicas
            </h3>
            <div className="space-y-2 text-gray-700 text-sm">
               <div className="flex items-start gap-2">
                  <AlertCircle className="flex-shrink-0 mt-0.5 w-4 h-4 text-green-600" />
                  <p>
                     La fuerte correlación entre Kt/V y supervivencia (r=0.78) sugiere que
                     la optimización de la dosis de diálisis es crítica para mejorar resultados.
                  </p>
               </div>
               <div className="flex items-start gap-2">
                  <AlertCircle className="flex-shrink-0 mt-0.5 w-4 h-4 text-amber-600" />
                  <p>
                     La correlación entre adherencia al tratamiento y resultados clínicos (r=0.81)
                     resalta la importancia de programas de educación y seguimiento del paciente.
                  </p>
               </div>
               <div className="flex items-start gap-2">
                  <AlertCircle className="flex-shrink-0 mt-0.5 w-4 h-4 text-blue-600" />
                  <p>
                     El control del fósforo sérico muestra correlación significativa con eventos
                     cardiovasculares, indicando la necesidad de monitoreo estricto.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
