"use client"

import {
   ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getFilteredTreatmentEfficiency } from '@/data/mockData/reportsData';

export default function TreatmentEfficiencyChart ({ selectedPeriod }: { selectedPeriod: 'week' | 'month' | 'quarter' | 'year' }) {
   // Format data for the chart
   const chartData = getFilteredTreatmentEfficiency(selectedPeriod)
      .map(day => ({
         date: new Date(day.date)
            .toLocaleDateString('es-MX', {
               weekday: 'short',
               day: 'numeric'
            }),
         'Eficiencia (%)': day.averageEfficiency,
         'Duración (min)': day.averageSessionDuration,
         'Complicaciones (%)': day.complicationRate
      }));

   // Custom tooltip
   function CustomTooltip ({
      active, payload, label
   }: any) {
      if (active && payload && payload.length) {
         return (
            <div className="bg-white shadow-lg p-4 border border-gray-200 rounded-lg">
               <p className="mb-2 font-semibold text-gray-800">{`${label}`}</p>
               {payload.map((entry: any, index: number) => (
                  <p key={index}
                     className="text-sm"
                     style={{
                        color: entry.color
                     }}
                  >
                     {`${entry.dataKey}: ${entry.value}${entry.dataKey.includes('%') ? '%' : entry.dataKey.includes('min') ? ' min' : ''}`}
                  </p>
               ))}
            </div>
         );
      }
      return null;
   }

   const averageEfficiency = Math.round(
      chartData.reduce((sum, day) => sum + day['Eficiencia (%)'], 0) / chartData.length * 10
   ) / 10;

   return (
      <div className="bg-white/95 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="font-semibold text-gray-800 text-lg">Eficiencia de Tratamientos</h3>
               <p className="text-gray-500 text-sm">Métricas de calidad y duración</p>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full text-purple-700 text-sm">
               <div className="bg-purple-400 rounded-full w-2 h-2" />
               <span className="font-medium">{averageEfficiency}% promedio</span>
            </div>
         </div>

         <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
               <ComposedChart
                  data={chartData}
                  margin={{
                     top: 20,
                     right: 30,
                     left: 20,
                     bottom: 5,
                  }}
               >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                     dataKey="date"
                     axisLine={false}
                     tickLine={false}
                     tick={{
                        fontSize: 12,
                        fill: '#6b7280'
                     }}
                  />
                  <YAxis
                     yAxisId="left"
                     axisLine={false}
                     tickLine={false}
                     tick={{
                        fontSize: 12,
                        fill: '#6b7280'
                     }}
                  />
                  <YAxis
                     yAxisId="right"
                     orientation="right"
                     axisLine={false}
                     tickLine={false}
                     tick={{
                        fontSize: 12,
                        fill: '#6b7280'
                     }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{
                     fontSize: '12px'
                  }}
                  />
                  <Bar
                     yAxisId="right"
                     dataKey="Duración (min)"
                     fill="#E5E7EB"
                     opacity={0.6}
                     radius={[2, 2, 0, 0]}
                  />
                  <Line
                     yAxisId="left"
                     type="monotone"
                     dataKey="Eficiencia (%)"
                     stroke="#8B5CF6"
                     strokeWidth={3}
                     dot={{
                        fill: '#8B5CF6',
                        strokeWidth: 2,
                        r: 4
                     }}
                     activeDot={{
                        r: 6,
                        stroke: '#8B5CF6',
                        strokeWidth: 2
                     }}
                  />
                  <Line
                     yAxisId="left"
                     type="monotone"
                     dataKey="Complicaciones (%)"
                     stroke="#EF4444"
                     strokeWidth={2}
                     strokeDasharray="5 5"
                     dot={{
                        fill: '#EF4444',
                        strokeWidth: 2,
                        r: 3
                     }}
                     activeDot={{
                        r: 5,
                        stroke: '#EF4444',
                        strokeWidth: 2
                     }}
                  />
               </ComposedChart>
            </ResponsiveContainer>
         </div>

         {/* Summary stats */}
         <div className="gap-4 grid grid-cols-3 mt-6 pt-4 border-gray-100 border-t">
            <div className="text-center">
               <p className="font-bold text-purple-600 text-xl">
                  {averageEfficiency}%
               </p>
               <p className="text-gray-600 text-xs">Eficiencia Promedio</p>
            </div>
            <div className="text-center">
               <p className="font-bold text-gray-600 text-xl">
                  {Math.round(chartData.reduce((sum, day) => sum + day['Duración (min)'], 0) / chartData.length)}
               </p>
               <p className="text-gray-600 text-xs">Duración Promedio (min)</p>
            </div>
            <div className="text-center">
               <p className="font-bold text-red-600 text-xl">
                  {Math.round(chartData.reduce((sum, day) => sum + day['Complicaciones (%)'], 0) / chartData.length * 10) / 10}%
               </p>
               <p className="text-gray-600 text-xs">Tasa Complicaciones</p>
            </div>
         </div>
      </div>
   );
}
