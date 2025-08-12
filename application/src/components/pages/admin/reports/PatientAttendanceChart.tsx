"use client"

import {
   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getFilteredDailyPatientStats } from '@/data/mockData/reportsData';

export default function PatientAttendanceChart ({ selectedPeriod }: { selectedPeriod: 'week' | 'month' | 'quarter' | 'year' }) {
   // Format data for the chart
   const chartData = getFilteredDailyPatientStats(selectedPeriod)
      .map(day => ({
         date: new Date(day.date)
            .toLocaleDateString('es-ES', {
               weekday: 'short',
               day: 'numeric'
            }),
         'Hemodiálisis': day.hemodialysisPatients,
         'Consultas': day.consultationPatients,
         'Emergencias': day.emergencyPatients,
         'Total': day.totalPatients
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
                     {`${entry.dataKey}: ${entry.value} pacientes`}
                  </p>
               ))}
            </div>
         );
      }
      return null;
   }

   return (
      <div className="bg-white/95 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="font-semibold text-gray-800 text-lg">Asistencia de Pacientes</h3>
               <p className="text-gray-500 text-sm">Últimos 7 días por tipo de atención</p>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full text-green-700 text-sm">
               <div className="bg-green-400 rounded-full w-2 h-2" />
               <span className="font-medium">Tendencia positiva</span>
            </div>
         </div>

         <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart
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
                     axisLine={false}
                     tickLine={false}
                     tick={{
                        fontSize: 12,
                        fill: '#6b7280'
                     }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                     wrapperStyle={{
                        fontSize: '12px'
                     }}
                  />
                  <Bar
                     dataKey="Hemodiálisis"
                     stackId="a"
                     fill="#3B82F6"
                     radius={[0, 0, 0, 0]}
                     name="Hemodiálisis"
                  />
                  <Bar
                     dataKey="Consultas"
                     stackId="a"
                     fill="#10B981"
                     radius={[0, 0, 0, 0]}
                     name="Consultas"
                  />
                  <Bar
                     dataKey="Emergencias"
                     stackId="a"
                     fill="#EF4444"
                     radius={[4, 4, 0, 0]}
                     name="Emergencias"
                  />
               </BarChart>
            </ResponsiveContainer>
         </div>

         {/* Summary stats */}
         <div className="gap-4 grid grid-cols-3 mt-6 pt-4 border-gray-100 border-t">
            <div className="text-center">
               <p className="font-bold text-blue-600 text-xl">
                  {chartData.reduce((sum, day) => sum + day['Hemodiálisis'], 0)}
               </p>
               <p className="text-gray-600 text-xs">Hemodiálisis</p>
            </div>
            <div className="text-center">
               <p className="font-bold text-green-600 text-xl">
                  {chartData.reduce((sum, day) => sum + day['Consultas'], 0)}
               </p>
               <p className="text-gray-600 text-xs">Consultas</p>
            </div>
            <div className="text-center">
               <p className="font-bold text-red-600 text-xl">
                  {chartData.reduce((sum, day) => sum + day['Emergencias'], 0)}
               </p>
               <p className="text-gray-600 text-xs">Emergencias</p>
            </div>
         </div>
      </div>
   );
}
