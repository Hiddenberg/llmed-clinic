"use client"

import {
   Target, Users, TrendingUp, AlertTriangle
} from 'lucide-react';
import {
   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { mockTreatmentEffectivenessData } from '@/data/mockData/researchAnalyticsData';

export default function TreatmentEffectivenessChart () {
   const data = mockTreatmentEffectivenessData;
   const maxScore = Math.max(...data.map(d => d.effectivenessScore));



   return (
      <div className="bg-white p-6 border border-gray-200 rounded-xl">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h2 className="mb-1 font-bold text-gray-900 text-xl">
                  Efectividad por Modalidad de Tratamiento
               </h2>
               <p className="text-gray-600 text-sm">
                  Comparación de resultados clínicos entre diferentes tipos de diálisis
               </p>
            </div>
            <div className="bg-brand-50 p-2 rounded-lg">
               <Target className="w-5 h-5 text-brand-600" />
            </div>
         </div>

         {/* Effectiveness comparison chart */}
         <div className="mb-8">
            <h3 className="mb-4 font-semibold text-gray-900 text-lg">
               Comparación de Efectividad
            </h3>
            <div className="h-80">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}
                     margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5
                     }}
                  >
                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                     <XAxis
                        dataKey="treatment"
                        tick={{
                           fontSize: 11,
                           fill: '#6b7280'
                        }}
                        axisLine={{
                           stroke: '#e5e7eb'
                        }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                     />
                     <YAxis
                        domain={[0, 10]}
                        tick={{
                           fontSize: 12,
                           fill: '#6b7280'
                        }}
                        axisLine={{
                           stroke: '#e5e7eb'
                        }}
                        label={{
                           value: 'Puntuación',
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
                        formatter={(value: number) => [`${value.toFixed(1)}/10`, 'Efectividad']}
                     />
                     <Bar dataKey="effectivenessScore" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                           <Cell key={`cell-${index}`}
                              fill={
                               entry.effectivenessScore >= 8.5 ? '#10B981' :
                                  entry.effectivenessScore >= 7.5 ? '#F59E0B' : '#EF4444'
                            }
                           />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Radar chart for multi-dimensional comparison */}
         <div className="mb-8">
            <h3 className="mb-4 font-semibold text-gray-900 text-lg">
               Análisis Multidimensional
            </h3>
            <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
               {data.map((treatment, index) => {
                  const radarMetrics = [
                     {
                        subject: 'Efectividad',
                        value: treatment.effectivenessScore,
                        fullMark: 10
                     },
                     {
                        subject: 'Kt/V',
                        value: treatment.averageKtV * 6,
                        fullMark: 10
                     },
                     {
                        subject: 'URR',
                        value: treatment.averageURR / 8,
                        fullMark: 10
                     },
                     {
                        subject: 'Seguridad',
                        value: 10 - (treatment.complicationRate / 2),
                        fullMark: 10
                     },
                     {
                        subject: 'Calidad',
                        value: 10 - (treatment.hospitalizations * 2.5),
                        fullMark: 10
                     }
                  ];

                  return (
                     <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="mb-3 font-medium text-gray-900 text-sm text-center">
                           {treatment.treatment}
                        </h4>
                        <div className="h-64">
                           <ResponsiveContainer width="100%" height="100%">
                              <RadarChart data={radarMetrics}
                                 margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 20,
                                    left: 20
                                 }}
                              >
                                 <PolarGrid stroke="#e5e7eb" />
                                 <PolarAngleAxis
                                    dataKey="subject"
                                    tick={{
                                       fontSize: 10,
                                       fill: '#6b7280'
                                    }}
                                    className="text-xs"
                                 />
                                 <PolarRadiusAxis
                                    domain={[0, 10]}
                                    tick={{
                                       fontSize: 8,
                                       fill: '#6b7280'
                                    }}
                                    tickCount={3}
                                 />
                                 <Radar
                                    name={treatment.treatment}
                                    dataKey="value"
                                    stroke={index === 0 ? '#3B82F6' : index === 1 ? '#10B981' : '#F59E0B'}
                                    fill={index === 0 ? '#3B82F6' : index === 1 ? '#10B981' : '#F59E0B'}
                                    fillOpacity={0.2}
                                    strokeWidth={2}
                                 />
                                 <Tooltip
                                    formatter={(value: number) => [value.toFixed(1), 'Puntuación']}
                                    labelStyle={{
                                       color: '#374151'
                                    }}
                                    contentStyle={{
                                       backgroundColor: 'white',
                                       border: '1px solid #e5e7eb',
                                       borderRadius: '8px',
                                       fontSize: '12px'
                                    }}
                                 />
                              </RadarChart>
                           </ResponsiveContainer>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>

         {/* Treatment comparison */}
         <div className="space-y-6">
            {data.map((treatment, index) => {
               const effectivenessPercentage = (treatment.effectivenessScore / maxScore) * 100;

               return (
                  <div key={index} className="p-5 border border-gray-200 rounded-lg">
                     <div className="flex justify-between items-center mb-4">
                        <div>
                           <h3 className="font-semibold text-gray-900 text-lg">
                              {treatment.treatment}
                           </h3>
                           <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
                              <Users className="w-4 h-4" />
                              <span>{treatment.patientCount} pacientes</span>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="font-bold text-brand-900 text-2xl">
                              {treatment.effectivenessScore}/10
                           </div>
                           <div className="text-gray-600 text-sm">Puntuación</div>
                        </div>
                     </div>

                     {/* Effectiveness bar */}
                     <div className="mb-4">
                        <div className="flex justify-between items-center mb-2 text-sm">
                           <span className="text-gray-600">Efectividad Global</span>
                           <span className="font-medium text-gray-900">
                              {treatment.effectivenessScore.toFixed(1)}/10
                           </span>
                        </div>
                        <div className="bg-gray-200 rounded-full w-full h-3">
                           <div
                              className={`h-3 rounded-full transition-all duration-700 ${
                                 treatment.effectivenessScore >= 8.5
                                    ? 'bg-gradient-to-r from-green-400 to-green-600'
                                    : treatment.effectivenessScore >= 7.5
                                       ? 'bg-gradient-to-r from-amber-400 to-amber-600'
                                       : 'bg-gradient-to-r from-orange-400 to-orange-600'
                              }`}
                              style={{
                                 width: `${effectivenessPercentage}%`
                              }}
                           />
                        </div>
                     </div>

                     {/* Clinical metrics */}
                     <div className="gap-4 grid grid-cols-2 lg:grid-cols-4">
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                           <div className="font-bold text-blue-900 text-lg">
                              {treatment.averageKtV.toFixed(2)}
                           </div>
                           <div className="text-blue-600 text-xs">Kt/V Promedio</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                           <div className="font-bold text-green-900 text-lg">
                              {treatment.averageURR.toFixed(1)}%
                           </div>
                           <div className="text-green-600 text-xs">URR Promedio</div>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg text-center">
                           <div className="font-bold text-amber-900 text-lg">
                              {treatment.complicationRate.toFixed(1)}%
                           </div>
                           <div className="text-amber-600 text-xs">Complicaciones</div>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg text-center">
                           <div className="font-bold text-red-900 text-lg">
                              {treatment.hospitalizations.toFixed(1)}
                           </div>
                           <div className="text-red-600 text-xs">Hospitalizaciones/año</div>
                        </div>
                     </div>

                     {/* Quality indicators */}
                     <div className="flex items-center gap-4 mt-4 text-sm">
                        <div className="flex items-center gap-1">
                           {treatment.averageKtV >= 1.4 ? (
                              <div className="bg-green-500 rounded-full w-2 h-2" />
                           ) : (
                              <div className="bg-red-500 rounded-full w-2 h-2" />
                           )}
                           <span className="text-gray-600">
                              Kt/V {treatment.averageKtV >= 1.4 ? 'Adecuado' : 'Inadecuado'}
                           </span>
                        </div>
                        <div className="flex items-center gap-1">
                           {treatment.averageURR >= 65 ? (
                              <div className="bg-green-500 rounded-full w-2 h-2" />
                           ) : (
                              <div className="bg-red-500 rounded-full w-2 h-2" />
                           )}
                           <span className="text-gray-600">
                              URR {treatment.averageURR >= 65 ? 'Adecuado' : 'Inadecuado'}
                           </span>
                        </div>
                        <div className="flex items-center gap-1">
                           {treatment.complicationRate <= 15 ? (
                              <div className="bg-green-500 rounded-full w-2 h-2" />
                           ) : (
                              <div className="bg-amber-500 rounded-full w-2 h-2" />
                           )}
                           <span className="text-gray-600">
                              Complicaciones {treatment.complicationRate <= 15 ? 'Bajas' : 'Moderadas'}
                           </span>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>

         {/* Summary insights */}
         <div className="mt-6 pt-6 border-gray-200 border-t">
            <h3 className="mb-3 font-semibold text-gray-900 text-sm">
               Conclusiones del Análisis
            </h3>
            <div className="space-y-2 text-gray-700 text-sm">
               <div className="flex items-start gap-2">
                  <TrendingUp className="flex-shrink-0 mt-0.5 w-4 h-4 text-green-600" />
                  <p>
                     La Hemodiafiltración Online muestra la mayor efectividad (9.1/10) con
                     mejores parámetros de depuración y menor tasa de complicaciones.
                  </p>
               </div>
               <div className="flex items-start gap-2">
                  <Target className="flex-shrink-0 mt-0.5 w-4 h-4 text-blue-600" />
                  <p>
                     La Hemodiálisis de Alto Flujo demuestra un buen balance entre efectividad
                     y aplicabilidad, tratando al mayor número de pacientes (156).
                  </p>
               </div>
               <div className="flex items-start gap-2">
                  <AlertTriangle className="flex-shrink-0 mt-0.5 w-4 h-4 text-amber-600" />
                  <p>
                     La Hemodiálisis Convencional, aunque efectiva, muestra mayor tasa de
                     hospitalizaciones, sugiriendo necesidad de optimización.
                  </p>
               </div>
            </div>
         </div>

         {/* Recommendations */}
         <div className="bg-gradient-to-r from-brand-50 to-blue-50 mt-4 p-4 border border-brand-100 rounded-lg">
            <h4 className="mb-2 font-semibold text-brand-900 text-sm">
               Recomendaciones Basadas en Evidencia
            </h4>
            <ul className="space-y-1 text-brand-800 text-sm">
               <li>• Considerar migración gradual hacia modalidades de alto flujo</li>
               <li>• Evaluar candidatos para hemodiafiltración online</li>
               <li>• Optimizar protocolos de hemodiálisis convencional</li>
               <li>• Implementar seguimiento estrecho de parámetros de adecuación</li>
            </ul>
         </div>
      </div>
   );
}
