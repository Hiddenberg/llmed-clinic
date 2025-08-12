"use client"

import {
   PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import { mockPatientDemographics } from '@/data/mockData/reportsData';

// Colors for each age group
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

// Custom tooltip
function CustomTooltip ({ active, payload }: any) {
   if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
         <div className="bg-white shadow-lg p-4 border border-gray-200 rounded-lg">
            <p className="mb-1 font-semibold text-gray-800">{data.ageGroup} años</p>
            <p className="text-gray-600 text-sm">Pacientes: {data.count}</p>
            <p className="text-gray-600 text-sm">Porcentaje: {data.percentage}%</p>
         </div>
      );
   }
   return null;
}

// Custom label function
function renderCustomLabel ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) {
   const RADIAN = Math.PI / 180;
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
   const x = cx + radius * Math.cos(-midAngle * RADIAN);
   const y = cy + radius * Math.sin(-midAngle * RADIAN);

   return (
      <text 
         x={x} 
         y={y} 
         fill="white" 
         textAnchor={x > cx ? 'start' : 'end'} 
         dominantBaseline="central"
         fontSize={12}
         fontWeight="bold"
      >
         {`${(percent * 100).toFixed(0)}%`}
      </text>
   );
}

export default function PatientDemographicsChart ({ selectedPeriod }: { selectedPeriod: 'week' | 'month' | 'quarter' | 'year' }) {
   const totalPatients = mockPatientDemographics.reduce((sum, group) => sum + group.count, 0);
   const dominantGroup = mockPatientDemographics.reduce((prev, current) => 
      prev.count > current.count ? prev : current
   );

   return (
      <div className="bg-white/95 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="font-semibold text-gray-800 text-lg">Demografía de Pacientes</h3>
               <p className="text-gray-500 text-sm">Distribución por grupos de edad</p>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full text-blue-700 text-sm">
               <div className="bg-blue-400 rounded-full w-2 h-2" />
               <span className="font-medium">{totalPatients} pacientes</span>
            </div>
         </div>

         <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                  <Pie
                     data={mockPatientDemographics}
                     cx="50%"
                     cy="50%"
                     labelLine={false}
                     label={renderCustomLabel}
                     outerRadius={100}
                     fill="#8884d8"
                     dataKey="count"
                  >
                     {mockPatientDemographics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                     verticalAlign="bottom" 
                     height={36}
                     wrapperStyle={{ fontSize: '12px' }}
                  />
               </PieChart>
            </ResponsiveContainer>
         </div>

         {/* Demographics summary */}
         <div className="gap-3 grid grid-cols-2 lg:grid-cols-5 mt-6 pt-4 border-gray-100 border-t">
            {mockPatientDemographics.map((group, index) => (
               <div key={index} className="text-center">
                  <div className="flex justify-center items-center gap-2 mb-1">
                     <div 
                        className="rounded-full w-3 h-3" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                     />
                     <span className="font-medium text-gray-700 text-xs">{group.ageGroup}</span>
                  </div>
                  <p className="font-bold text-gray-800 text-lg">{group.count}</p>
                  <p className="text-gray-500 text-xs">{group.percentage}%</p>
               </div>
            ))}
         </div>

         {/* Key insight */}
         <div className="bg-blue-50 mt-4 p-3 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
               <strong>Grupo predominante:</strong> {dominantGroup.ageGroup} años ({dominantGroup.percentage}% de pacientes)
            </p>
         </div>
      </div>
   );
}
