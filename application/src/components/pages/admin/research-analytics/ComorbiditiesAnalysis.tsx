"use client"

import { AlertTriangle, Users, TrendingUp, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { mockComorbiditiesData } from '@/data/mockData/researchAnalyticsData';

export default function ComorbiditiesAnalysis () {
   const data = mockComorbiditiesData;
   const maxPrevalence = Math.max(...data.map(d => d.prevalence));

   // Colors for pie chart
   const COLORS = ['#EF4444', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899'];

   // Prepare data for charts
   const pieData = data.map((item, index) => ({
      name: item.condition.replace(' Mellitus', '').replace(' Arterial', ''),
      value: item.prevalence,
      color: COLORS[index % COLORS.length]
   }));

   const getImpactColor = (impact: string) => {
      switch (impact) {
         case 'high':
            return 'bg-red-100 text-red-800 border-red-200';
         case 'medium':
            return 'bg-amber-100 text-amber-800 border-amber-200';
         case 'low':
            return 'bg-green-100 text-green-800 border-green-200';
         default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
      }
   };

   const getImpactLabel = (impact: string) => {
      switch (impact) {
         case 'high':
            return 'Alto';
         case 'medium':
            return 'Medio';
         case 'low':
            return 'Bajo';
         default:
            return 'N/A';
      }
   };

   return (
      <div className="bg-white p-6 border border-gray-200 rounded-xl">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h2 className="mb-1 font-bold text-gray-900 text-xl">
                  Análisis de Comorbilidades
               </h2>
               <p className="text-gray-600 text-sm">
                  Prevalencia e impacto de condiciones asociadas
               </p>
            </div>
            <div className="bg-brand-50 p-2 rounded-lg">
               <AlertTriangle className="w-5 h-5 text-brand-600" />
            </div>
         </div>

         {/* Summary statistics */}
         <div className="gap-4 grid grid-cols-2 mb-6">
            <div className="bg-red-50 p-4 rounded-lg text-center">
               <div className="font-bold text-red-900 text-2xl">
                  {data.filter(d => d.impact === 'high').length}
               </div>
               <div className="text-red-600 text-sm">Comorbilidades de Alto Impacto</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg text-center">
               <div className="font-bold text-amber-900 text-2xl">
                  {(data.reduce((sum, d) => sum + d.prevalence, 0) / data.length).toFixed(1)}%
               </div>
               <div className="text-amber-600 text-sm">Prevalencia Promedio</div>
            </div>
                   </div>

          {/* Charts section */}
          <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 mb-8">
             {/* Pie chart for prevalence */}
             <div>
                <h3 className="mb-4 font-semibold text-gray-900 text-lg">
                   Distribución de Prevalencia
                </h3>
                <div className="h-80">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                            labelLine={false}
                         >
                            {pieData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                         </Pie>
                         <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, 'Prevalencia']} />
                      </PieChart>
                   </ResponsiveContainer>
                </div>
             </div>

             {/* Bar chart for complications */}
             <div>
                <h3 className="mb-4 font-semibold text-gray-900 text-lg">
                   Complicaciones por Condición
                </h3>
                <div className="h-80">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                         <XAxis 
                            dataKey="condition" 
                            tick={{ fontSize: 10, fill: '#6b7280' }}
                            axisLine={{ stroke: '#e5e7eb' }}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                         />
                         <YAxis 
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            axisLine={{ stroke: '#e5e7eb' }}
                            label={{ value: 'Complicaciones (%)', angle: -90, position: 'insideLeft' }}
                         />
                         <Tooltip 
                            contentStyle={{
                               backgroundColor: 'white',
                               border: '1px solid #e5e7eb',
                               borderRadius: '8px',
                               fontSize: '12px'
                            }}
                            formatter={(value: number) => [`${value.toFixed(1)}%`, 'Complicaciones']}
                         />
                         <Bar dataKey="treatmentComplications" radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={
                                  entry.impact === 'high' ? '#EF4444' :
                                  entry.impact === 'medium' ? '#F59E0B' : '#10B981'
                               } />
                            ))}
                         </Bar>
                      </BarChart>
                   </ResponsiveContainer>
                </div>
             </div>
          </div>

          {/* Comorbidities list */}
          <div className="space-y-4">
            {data.map((condition, index) => (
               <div key={index} className="hover:shadow-sm p-4 border border-gray-200 rounded-lg transition-shadow">
                  <div className="flex justify-between items-center mb-3">
                     <div className="flex-1">
                        <h3 className="mb-1 font-semibold text-gray-900">
                           {condition.condition}
                        </h3>
                        <div className="flex items-center gap-4 text-gray-600 text-sm">
                           <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>Edad promedio: {condition.averageAge.toFixed(1)} años</span>
                           </div>
                           <div className="flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Complicaciones: {condition.treatmentComplications.toFixed(1)}%</span>
                           </div>
                        </div>
                     </div>
                     <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getImpactColor(condition.impact)}`}>
                        Impacto {getImpactLabel(condition.impact)}
                     </div>
                  </div>

                  {/* Prevalence visualization */}
                  <div className="mb-3">
                     <div className="flex justify-between items-center mb-2 text-sm">
                        <span className="text-gray-600">Prevalencia</span>
                        <span className="font-medium text-gray-900">
                           {condition.prevalence.toFixed(1)}%
                        </span>
                     </div>
                     <div className="bg-gray-200 rounded-full w-full h-2">
                        <div 
                           className={`h-2 rounded-full transition-all duration-500 ${
                              condition.prevalence >= 70 
                                 ? 'bg-gradient-to-r from-red-400 to-red-600'
                                 : condition.prevalence >= 40
                                 ? 'bg-gradient-to-r from-amber-400 to-amber-600'
                                 : 'bg-gradient-to-r from-blue-400 to-blue-600'
                           }`}
                           style={{ width: `${(condition.prevalence / maxPrevalence) * 100}%` }}
                        />
                     </div>
                  </div>

                  {/* Additional metrics */}
                  <div className="gap-3 grid grid-cols-3 text-sm">
                     <div className="bg-gray-50 p-2 rounded text-center">
                        <div className="font-semibold text-gray-900">
                           {condition.prevalence.toFixed(1)}%
                        </div>
                        <div className="text-gray-600 text-xs">Prevalencia</div>
                     </div>
                     <div className="bg-gray-50 p-2 rounded text-center">
                        <div className="font-semibold text-gray-900">
                           {condition.averageAge.toFixed(0)}
                        </div>
                        <div className="text-gray-600 text-xs">Edad promedio</div>
                     </div>
                     <div className="bg-gray-50 p-2 rounded text-center">
                        <div className="font-semibold text-gray-900">
                           {condition.treatmentComplications.toFixed(1)}%
                        </div>
                        <div className="text-gray-600 text-xs">Complicaciones</div>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* Research insights */}
         <div className="mt-6 pt-6 border-gray-200 border-t">
            <h3 className="mb-3 font-semibold text-gray-900 text-sm">
               Hallazgos Relevantes
            </h3>
            <div className="space-y-2 text-gray-700 text-sm">
               <div className="flex items-start gap-2">
                  <TrendingUp className="flex-shrink-0 mt-0.5 w-4 h-4 text-red-600" />
                  <p>
                     La hipertensión arterial presenta la mayor prevalencia (89.1%), 
                     siendo prácticamente universal en nuestra población.
                  </p>
               </div>
               <div className="flex items-start gap-2">
                  <AlertTriangle className="flex-shrink-0 mt-0.5 w-4 h-4 text-amber-600" />
                  <p>
                     La diabetes mellitus afecta al 68.4% de los pacientes y está 
                     asociada con mayor tasa de complicaciones (24.7%).
                  </p>
               </div>
               <div className="flex items-start gap-2">
                  <Clock className="flex-shrink-0 mt-0.5 w-4 h-4 text-blue-600" />
                  <p>
                     Los pacientes con enfermedad cardiovascular tienen mayor edad promedio 
                     (67.5 años) y mayor tasa de complicaciones (31.2%).
                  </p>
               </div>
            </div>
         </div>

         {/* Clinical recommendations */}
         <div className="bg-gradient-to-r from-red-50 to-amber-50 mt-4 p-4 border border-red-100 rounded-lg">
            <h4 className="mb-2 font-semibold text-red-900 text-sm">
               Recomendaciones Clínicas
            </h4>
            <div className="space-y-1 text-red-800 text-sm">
               <div>• Screening cardiovascular intensivo para pacientes diabéticos</div>
               <div>• Monitoreo estricto de presión arterial en todos los pacientes</div>
               <div>• Protocolos específicos para manejo de anemia y osteodistrofia</div>
               <div>• Evaluación periódica de hepatitis C en pacientes de riesgo</div>
            </div>
         </div>
      </div>
   );
}
