"use client"

import {
   Users, Clock, AlertTriangle
} from 'lucide-react';
import {
   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { mockResearchPatientDemographics } from '@/data/mockData/researchAnalyticsData';

export default function PatientDemographicsChart () {
   const data = mockResearchPatientDemographics;
   const maxCount = Math.max(...data.map(d => d.count));

   // Calculate totals for summary
   const totalPatients = data.reduce((sum, d) => sum + d.count, 0);
   const avgDialysisYears = (data.reduce((sum, d) => sum + (d.averageDialysisYears * d.count), 0) / totalPatients).toFixed(1);
   const avgComorbidityRate = (data.reduce((sum, d) => sum + (d.comorbidityRate * d.percentage / 100), 0))
      .toFixed(1);

   return (
      <div className="bg-white p-6 border border-gray-200 rounded-xl">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h2 className="mb-1 font-bold text-gray-900 text-xl">
                  Demografía de Pacientes
               </h2>
               <p className="text-gray-600 text-sm">
                  Distribución por grupos etarios con métricas clínicas
               </p>
            </div>
            <div className="bg-brand-50 p-2 rounded-lg">
               <Users className="w-5 h-5 text-brand-600" />
            </div>
         </div>

         {/* Summary cards */}
         <div className="gap-4 grid grid-cols-3 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
               <div className="font-bold text-gray-900 text-2xl">{totalPatients}</div>
               <div className="text-gray-600 text-sm">Total Pacientes</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
               <div className="font-bold text-blue-900 text-2xl">{avgDialysisYears}</div>
               <div className="text-blue-600 text-sm">Años Promedio en Diálisis</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg text-center">
               <div className="font-bold text-amber-900 text-2xl">{avgComorbidityRate}%</div>
               <div className="text-amber-600 text-sm">Tasa de Comorbilidad</div>
            </div>
         </div>

         {/* Chart */}
         <div className="mb-6 h-80">
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
                     dataKey="ageGroup"
                     tick={{
                        fontSize: 12,
                        fill: '#6b7280'
                     }}
                     axisLine={{
                        stroke: '#e5e7eb'
                     }}
                  />
                  <YAxis
                     tick={{
                        fontSize: 12,
                        fill: '#6b7280'
                     }}
                     axisLine={{
                        stroke: '#e5e7eb'
                     }}
                     label={{
                        value: 'Pacientes',
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
                     formatter={(value: number, name: string) => [
                        `${value} pacientes`,
                        'Cantidad'
                     ]}
                     labelFormatter={(label: string) => `Grupo ${label} años`}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                     {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#3B82F6" />
                     ))}
                  </Bar>
               </BarChart>
            </ResponsiveContainer>
         </div>

         {/* Detailed metrics table */}
         <div className="mb-6 overflow-x-auto">
            <table className="w-full text-sm">
               <thead>
                  <tr className="border-gray-200 border-b">
                     <th className="py-2 font-medium text-gray-600 text-left">Grupo Etario</th>
                     <th className="py-2 font-medium text-gray-600 text-center">Pacientes</th>
                     <th className="py-2 font-medium text-gray-600 text-center">Porcentaje</th>
                     <th className="py-2 font-medium text-gray-600 text-center">Años Diálisis</th>
                     <th className="py-2 font-medium text-gray-600 text-center">Comorbilidades</th>
                  </tr>
               </thead>
               <tbody>
                  {data.map((group, index) => (
                     <tr key={index} className="border-gray-100 border-b">
                        <td className="py-2 font-medium text-gray-900">{group.ageGroup} años</td>
                        <td className="py-2 text-gray-700 text-center">{group.count}</td>
                        <td className="py-2 text-gray-700 text-center">{group.percentage}%</td>
                        <td className="py-2 text-gray-700 text-center">{group.averageDialysisYears}</td>
                        <td className="py-2 text-gray-700 text-center">{group.comorbidityRate}%</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Research insights */}
         <div className="mt-6 pt-6 border-gray-200 border-t">
            <h3 className="mb-3 font-semibold text-gray-900 text-sm">
               Hallazgos de Investigación
            </h3>
            <div className="space-y-2 text-gray-700 text-sm">
               <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 bg-brand-500 mt-2 rounded-full w-1.5 h-1.5" />
                  <p>
                     El grupo de 61-75 años representa el 34.4% de la población,
                     con una experiencia promedio de 4.8 años en diálisis.
                  </p>
               </div>
               <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 bg-amber-500 mt-2 rounded-full w-1.5 h-1.5" />
                  <p>
                     La tasa de comorbilidades aumenta significativamente con la edad,
                     alcanzando 85.4% en pacientes mayores de 76 años.
                  </p>
               </div>
               <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 bg-green-500 mt-2 rounded-full w-1.5 h-1.5" />
                  <p>
                     Los pacientes más jóvenes (18-30 años) muestran mayor duración
                     en tratamiento relativa a su edad, sugiriendo inicio temprano.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
