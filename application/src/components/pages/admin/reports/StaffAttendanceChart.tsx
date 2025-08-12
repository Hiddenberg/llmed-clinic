"use client"

import {
   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getFilteredStaffAttendance } from '@/data/mockData/reportsData';

export default function StaffAttendanceChart ({ selectedPeriod }: { selectedPeriod: 'week' | 'month' | 'quarter' | 'year' }) {
   // Format data for the chart
   const chartData = getFilteredStaffAttendance(selectedPeriod).map(day => ({
   date: new Date(day.date).toLocaleDateString('es-ES', { 
      weekday: 'short', 
      day: 'numeric' 
   }),
   'Doctores': day.doctors,
   'Enfermeras': day.nurses,
   'Técnicos': day.technicians,
   'Total': day.totalStaff
   }));

   // Custom tooltip
   function CustomTooltip ({ active, payload, label }: any) {
   if (active && payload && payload.length) {
      return (
         <div className="bg-white shadow-lg p-4 border border-gray-200 rounded-lg">
            <p className="mb-2 font-semibold text-gray-800">{`${label}`}</p>
            {payload.map((entry: any, index: number) => (
               <p key={index} className="text-sm" style={{ color: entry.color }}>
                  {`${entry.dataKey}: ${entry.value} personas`}
               </p>
            ))}
         </div>
      );
   }
   return null;
   }

   const averageStaff = Math.round(
      chartData.reduce((sum, day) => sum + day.Total, 0) / chartData.length
   );

   return (
      <div className="bg-white/95 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="font-semibold text-gray-800 text-lg">Asistencia del Personal</h3>
               <p className="text-gray-500 text-sm">Personal presente por día y categoría</p>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full text-blue-700 text-sm">
               <div className="bg-blue-400 rounded-full w-2 h-2" />
               <span className="font-medium">Promedio: {averageStaff}</span>
            </div>
         </div>

         <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
               <LineChart
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
                     tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis 
                     axisLine={false}
                     tickLine={false}
                     tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line 
                     type="monotone" 
                     dataKey="Doctores" 
                     stroke="#3B82F6" 
                     strokeWidth={3}
                     dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                     activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                  />
                  <Line 
                     type="monotone" 
                     dataKey="Enfermeras" 
                     stroke="#10B981" 
                     strokeWidth={3}
                     dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                     activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
                  />
                  <Line 
                     type="monotone" 
                     dataKey="Técnicos" 
                     stroke="#F59E0B" 
                     strokeWidth={3}
                     dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                     activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2 }}
                  />
               </LineChart>
            </ResponsiveContainer>
         </div>

         {/* Summary stats */}
         <div className="gap-4 grid grid-cols-3 mt-6 pt-4 border-gray-100 border-t">
            <div className="text-center">
               <p className="font-bold text-blue-600 text-xl">
                  {Math.round(chartData.reduce((sum, day) => sum + day['Doctores'], 0) / chartData.length)}
               </p>
               <p className="text-gray-600 text-xs">Promedio Doctores</p>
            </div>
            <div className="text-center">
               <p className="font-bold text-green-600 text-xl">
                  {Math.round(chartData.reduce((sum, day) => sum + day['Enfermeras'], 0) / chartData.length)}
               </p>
               <p className="text-gray-600 text-xs">Promedio Enfermeras</p>
            </div>
            <div className="text-center">
               <p className="font-bold text-orange-600 text-xl">
                  {Math.round(chartData.reduce((sum, day) => sum + day['Técnicos'], 0) / chartData.length)}
               </p>
               <p className="text-gray-600 text-xs">Promedio Técnicos</p>
            </div>
         </div>
      </div>
   );
}
