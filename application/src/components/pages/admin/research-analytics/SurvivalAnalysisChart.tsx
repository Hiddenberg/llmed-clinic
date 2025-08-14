"use client"

import {
   Activity, TrendingDown, Users, Info
} from 'lucide-react';
import {
   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { mockSurvivalData } from '@/data/mockData/researchAnalyticsData';

export default function SurvivalAnalysisChart () {
   const data = mockSurvivalData;

   // Calculate key metrics
   const survivalAt1Year = data.find(d => d.timePoint === '12')?.survivalRate || 0;
   const survivalAt3Years = data.find(d => d.timePoint === '36')?.survivalRate || 0;
   const survivalAt5Years = data.find(d => d.timePoint === '60')?.survivalRate || 0;

   const maxSurvival = Math.max(...data.map(d => d.survivalRate));
   const minSurvival = Math.min(...data.map(d => d.survivalRate));

   return (
      <div className="bg-white p-6 border border-gray-200 rounded-xl">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h2 className="mb-1 font-bold text-gray-900 text-xl">
                  Análisis de Supervivencia
               </h2>
               <p className="text-gray-600 text-sm">
                  Curva de Kaplan-Meier con intervalos de confianza del 95%
               </p>
            </div>
            <div className="bg-brand-50 p-2 rounded-lg">
               <Activity className="w-5 h-5 text-brand-600" />
            </div>
         </div>

         {/* Key survival metrics */}
         <div className="gap-4 grid grid-cols-3 mb-6">
            <div className="bg-green-50 p-4 rounded-lg text-center">
               <div className="font-bold text-green-900 text-2xl">{survivalAt1Year.toFixed(1)}%</div>
               <div className="text-green-600 text-sm">Supervivencia a 1 año</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg text-center">
               <div className="font-bold text-amber-900 text-2xl">{survivalAt3Years.toFixed(1)}%</div>
               <div className="text-amber-600 text-sm">Supervivencia a 3 años</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
               <div className="font-bold text-blue-900 text-2xl">{survivalAt5Years.toFixed(1)}%</div>
               <div className="text-blue-600 text-sm">Supervivencia a 5 años</div>
            </div>
         </div>

         {/* Chart area */}
         <div className="mb-6 h-96">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data}
                  margin={{
                     top: 20,
                     right: 30,
                     left: 20,
                     bottom: 60
                  }}
               >
                  <defs>
                     <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
                     </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                     dataKey="timePoint"
                     tick={{
                        fontSize: 12,
                        fill: '#6b7280'
                     }}
                     axisLine={{
                        stroke: '#e5e7eb'
                     }}
                     label={{
                        value: 'Tiempo (meses)',
                        position: 'insideBottom',
                        offset: -10
                     }}
                  />
                  <YAxis
                     domain={[40, 100]}
                     tick={{
                        fontSize: 12,
                        fill: '#6b7280'
                     }}
                     axisLine={{
                        stroke: '#e5e7eb'
                     }}
                     label={{
                        value: 'Supervivencia (%)',
                        angle: -90,
                        position: 'insideLeft'
                     }}
                  />
                  <YAxis
                     yAxisId="right"
                     orientation="right"
                     domain={[0, 300]}
                     tick={{
                        fontSize: 12,
                        fill: '#6b7280'
                     }}
                     axisLine={{
                        stroke: '#e5e7eb'
                     }}
                     label={{
                        value: 'Pacientes en Riesgo',
                        angle: 90,
                        position: 'insideRight'
                     }}
                  />
                  <Tooltip
                     contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                     }}
                     formatter={(value: number, name: string) => {
                        if (name === 'survivalRate') return [`${value.toFixed(1)}%`, 'Supervivencia'];
                        if (name === 'atRisk') return [`${value}`, 'En riesgo'];
                        return [value, name];
                     }}
                     labelFormatter={(label: string) => `Mes ${label}`}
                  />

                  {/* Main survival line */}
                  <Line
                     type="monotone"
                     dataKey="survivalRate"
                     stroke="#3B82F6"
                     strokeWidth={3}
                     dot={{
                        fill: '#3B82F6',
                        strokeWidth: 2,
                        r: 4
                     }}
                     activeDot={{
                        r: 6,
                        stroke: '#3B82F6',
                        strokeWidth: 2
                     }}
                  />

                  {/* At-risk line for reference */}
                  <Line
                     type="monotone"
                     dataKey="atRisk"
                     stroke="#10B981"
                     strokeWidth={2}
                     strokeDasharray="5 5"
                     dot={{
                        fill: '#10B981',
                        strokeWidth: 1,
                        r: 3
                     }}
                     yAxisId="right"
                  />
               </AreaChart>
            </ResponsiveContainer>
         </div>

         {/* At-risk table */}
         <div className="mb-6">
            <h3 className="mb-3 font-semibold text-gray-900 text-sm">
               Pacientes en Riesgo por Período
            </h3>
            <div className="overflow-x-auto">
               <table className="w-full text-sm">
                  <thead>
                     <tr className="border-gray-200 border-b">
                        <th className="py-2 font-medium text-gray-600 text-left">Tiempo (meses)</th>
                        {data.filter((_, i) => i % 2 === 0)
                           .map(point => (
                              <th key={point.timePoint} className="py-2 min-w-16 font-medium text-gray-600 text-center">
                                 {point.timePoint}
                              </th>
                           ))}
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td className="py-2 font-medium text-gray-900">En riesgo</td>
                        {data.filter((_, i) => i % 2 === 0)
                           .map(point => (
                              <td key={point.timePoint} className="py-2 text-gray-700 text-center">
                                 {point.atRisk}
                              </td>
                           ))}
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>

         {/* Clinical insights */}
         <div className="pt-6 border-gray-200 border-t">
            <h3 className="mb-3 font-semibold text-gray-900 text-sm">
               Interpretación Clínica
            </h3>
            <div className="space-y-2 text-gray-700 text-sm">
               <div className="flex items-start gap-2">
                  <Info className="flex-shrink-0 mt-0.5 w-4 h-4 text-blue-600" />
                  <p>
                     La supervivencia a 1 año del {survivalAt1Year.toFixed(1)}% está dentro del rango esperado
                     para pacientes en hemodiálisis según literatura internacional.
                  </p>
               </div>
               <div className="flex items-start gap-2">
                  <TrendingDown className="flex-shrink-0 mt-0.5 w-4 h-4 text-amber-600" />
                  <p>
                     La reducción gradual de supervivencia muestra la importancia del seguimiento
                     a largo plazo y la optimización continua del tratamiento.
                  </p>
               </div>
               <div className="flex items-start gap-2">
                  <Users className="flex-shrink-0 mt-0.5 w-4 h-4 text-green-600" />
                  <p>
                     Los intervalos de confianza estrechos indican robustez estadística del análisis
                     con una muestra inicial de 285 pacientes.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
