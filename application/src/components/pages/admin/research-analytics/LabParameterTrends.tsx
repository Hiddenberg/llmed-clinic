"use client"

import { TrendingUp, TrendingDown, Minus, Activity, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { mockLabParameterTrends } from '@/data/mockData/researchAnalyticsData';

export default function LabParameterTrends () {
   const data = mockLabParameterTrends;

   const getTrendIcon = (trend: string) => {
      switch (trend) {
         case 'improving':
            return <TrendingUp className="w-4 h-4 text-green-600" />;
         case 'declining':
            return <TrendingDown className="w-4 h-4 text-red-600" />;
         case 'stable':
            return <Minus className="w-4 h-4 text-gray-600" />;
         default:
            return <Minus className="w-4 h-4 text-gray-600" />;
      }
   };

   const getTrendColor = (trend: string) => {
      switch (trend) {
         case 'improving':
            return 'text-green-600 bg-green-50';
         case 'declining':
            return 'text-red-600 bg-red-50';
         case 'stable':
            return 'text-gray-600 bg-gray-50';
         default:
            return 'text-gray-600 bg-gray-50';
      }
   };

   const getTrendLabel = (trend: string) => {
      switch (trend) {
         case 'improving':
            return 'Mejorando';
         case 'declining':
            return 'Deteriorando';
         case 'stable':
            return 'Estable';
         default:
            return 'Estable';
      }
   };

   return (
      <div className="bg-white p-6 border border-gray-200 rounded-xl">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h2 className="mb-1 font-bold text-gray-900 text-xl">
                  Tendencias de Parámetros de Laboratorio
               </h2>
               <p className="text-gray-600 text-sm">
                  Evolución temporal de biomarcadores clave
               </p>
            </div>
            <div className="bg-brand-50 p-2 rounded-lg">
               <Activity className="w-5 h-5 text-brand-600" />
            </div>
         </div>

         <div className="space-y-8">
            {data.map((parameter, index) => {
               const maxValue = Math.max(...parameter.monthlyData.map(d => d.value));
               const minValue = Math.min(...parameter.monthlyData.map(d => d.value));
               const range = maxValue - minValue;

               return (
                  <div key={index} className="p-5 border border-gray-200 rounded-lg">
                     <div className="flex justify-between items-center mb-4">
                        <div>
                           <h3 className="font-semibold text-gray-900 text-lg">
                              {parameter.parameter}
                           </h3>
                           <div className="flex items-center gap-4 mt-1 text-gray-600 text-sm">
                              <span>Rango normal: {parameter.normalRange} {parameter.unit}</span>
                              <span>Promedio actual: {parameter.averageValue} {parameter.unit}</span>
                           </div>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getTrendColor(parameter.trend)}`}>
                           {getTrendIcon(parameter.trend)}
                           {getTrendLabel(parameter.trend)}
                        </div>
                     </div>

                                           {/* Chart area */}
                      <div className="mb-4 h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={parameter.monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                               <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                               <XAxis 
                                  dataKey="month" 
                                  tick={{ fontSize: 12, fill: '#6b7280' }}
                                  axisLine={{ stroke: '#e5e7eb' }}
                               />
                               <YAxis 
                                  domain={['dataMin - 0.1', 'dataMax + 0.1']}
                                  tick={{ fontSize: 12, fill: '#6b7280' }}
                                  axisLine={{ stroke: '#e5e7eb' }}
                                  label={{ value: parameter.unit, angle: -90, position: 'insideLeft' }}
                               />
                               <Tooltip 
                                  contentStyle={{
                                     backgroundColor: 'white',
                                     border: '1px solid #e5e7eb',
                                     borderRadius: '8px',
                                     fontSize: '12px'
                                  }}
                                  formatter={(value: number, name: string) => [
                                     `${value.toFixed(2)} ${parameter.unit}`,
                                     parameter.parameter
                                  ]}
                                  labelFormatter={(label: string) => `Mes: ${label}`}
                               />
                               
                               {/* Reference line for normal range if applicable */}
                               {parameter.parameter === 'Hemoglobina' && (
                                  <>
                                     <ReferenceLine y={11.0} stroke="#10B981" strokeDasharray="5 5" label="Min Normal" />
                                     <ReferenceLine y={12.0} stroke="#10B981" strokeDasharray="5 5" label="Max Normal" />
                                  </>
                               )}
                               {parameter.parameter === 'Fósforo' && (
                                  <>
                                     <ReferenceLine y={3.5} stroke="#10B981" strokeDasharray="5 5" label="Min Normal" />
                                     <ReferenceLine y={5.5} stroke="#10B981" strokeDasharray="5 5" label="Max Normal" />
                                  </>
                               )}
                               {parameter.parameter === 'Kt/V' && (
                                  <ReferenceLine y={1.4} stroke="#10B981" strokeDasharray="5 5" label="Objetivo Min" />
                               )}
                               
                               <Line 
                                  type="monotone" 
                                  dataKey="value" 
                                  stroke={parameter.trend === 'improving' ? '#10B981' : parameter.trend === 'declining' ? '#EF4444' : '#6B7280'}
                                  strokeWidth={3}
                                  dot={{ 
                                     fill: parameter.trend === 'improving' ? '#10B981' : parameter.trend === 'declining' ? '#EF4444' : '#6B7280', 
                                     strokeWidth: 2, 
                                     r: 4 
                                  }}
                                  activeDot={{ r: 6, strokeWidth: 2 }}
                               />
                            </LineChart>
                         </ResponsiveContainer>
                      </div>

                     {/* Data table */}
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                           <thead>
                              <tr className="border-gray-200 border-b">
                                 <th className="py-2 font-medium text-gray-600 text-left">Mes</th>
                                 {parameter.monthlyData.map((point) => (
                                    <th key={point.month} className="py-2 min-w-16 font-medium text-gray-600 text-center">
                                       {point.month}
                                    </th>
                                 ))}
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td className="py-2 font-medium text-gray-900">
                                    Valor ({parameter.unit})
                                 </td>
                                 {parameter.monthlyData.map((point) => (
                                    <td key={point.month} className="py-2 text-gray-700 text-center">
                                       {point.value.toFixed(1)}
                                    </td>
                                 ))}
                              </tr>
                              <tr>
                                 <td className="py-2 font-medium text-gray-900">Pacientes</td>
                                 {parameter.monthlyData.map((point) => (
                                    <td key={point.month} className="py-2 text-gray-700 text-center">
                                       {point.patientCount}
                                    </td>
                                 ))}
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               );
            })}
         </div>

         {/* Clinical interpretation */}
         <div className="mt-6 pt-6 border-gray-200 border-t">
            <h3 className="mb-3 font-semibold text-gray-900 text-sm">
               Interpretación Clínica
            </h3>
            <div className="space-y-2 text-gray-700 text-sm">
               <div className="flex items-start gap-2">
                  <TrendingUp className="flex-shrink-0 mt-0.5 w-4 h-4 text-green-600" />
                  <p>
                     La hemoglobina muestra tendencia de mejora gradual, alcanzando 10.9 g/dL en junio, 
                     aproximándose al rango objetivo (11.0-12.0 g/dL).
                  </p>
               </div>
               <div className="flex items-start gap-2">
                  <Minus className="flex-shrink-0 mt-0.5 w-4 h-4 text-gray-600" />
                  <p>
                     Los niveles de fósforo se mantienen estables pero ligeramente elevados (5.8 mg/dL), 
                     requiriendo optimización del manejo dietético y farmacológico.
                  </p>
               </div>
               <div className="flex items-start gap-2">
                  <TrendingUp className="flex-shrink-0 mt-0.5 w-4 h-4 text-green-600" />
                  <p>
                     El Kt/V muestra mejora sostenida (1.59), superando consistentemente el objetivo mínimo 
                     de 1.4, indicando adecuación dialítica apropiada.
                  </p>
               </div>
            </div>
         </div>

         {/* Action items */}
         <div className="bg-gradient-to-r from-blue-50 to-green-50 mt-4 p-4 border border-blue-100 rounded-lg">
            <div className="flex items-start gap-3">
               <AlertCircle className="flex-shrink-0 mt-0.5 w-5 h-5 text-blue-600" />
               <div>
                  <h4 className="mb-2 font-semibold text-blue-900 text-sm">
                     Acciones Recomendadas
                  </h4>
                  <div className="space-y-1 text-blue-800 text-sm">
                     <div>• Continuar protocolo actual de manejo de anemia</div>
                     <div>• Revisar adherencia a quelantes de fósforo</div>
                     <div>• Mantener parámetros de diálisis actuales</div>
                     <div>• Monitoreo mensual de tendencias</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
