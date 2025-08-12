"use client"

import {
   AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { mockMonthlyOverview } from '@/data/mockData/reportsData';

export default function MonthlyOverviewChart ({ selectedPeriod }: { selectedPeriod: 'week' | 'month' | 'quarter' | 'year' }) {
   // Format data for the chart
   const chartData = mockMonthlyOverview.map(month => ({
      month: month.month,
      'Pacientes': month.totalPatients,
      'Sesiones': month.totalSessions,
      'Satisfacción': month.patientSatisfaction * 20, // Scale to 0-100 for visualization
      'Utilización Staff (%)': month.staffUtilization
   }));

   // Custom tooltip
   function CustomTooltip ({ active, payload, label }: any) {
      if (active && payload && payload.length) {
         return (
            <div className="bg-white shadow-lg p-4 border border-gray-200 rounded-lg">
               <p className="mb-2 font-semibold text-gray-800">{`${label}`}</p>
               {payload.map((entry: any, index: number) => {
                  let value = entry.value;
                  let suffix = '';
                  
                  if (entry.dataKey === 'Satisfacción') {
                     value = (value / 20).toFixed(1);
                     suffix = '/5';
                  } else if (entry.dataKey === 'Utilización Staff (%)') {
                     suffix = '%';
                  }
                  
                  return (
                     <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {`${entry.dataKey.replace(' (%)', '')}: ${value}${suffix}`}
                     </p>
                  );
               })}
            </div>
         );
      }
      return null;
   }

   const latestMonth = mockMonthlyOverview[mockMonthlyOverview.length - 1];
   const previousMonth = mockMonthlyOverview[mockMonthlyOverview.length - 2];
   const growth = ((latestMonth.totalPatients - previousMonth.totalPatients) / previousMonth.totalPatients * 100);

   return (
      <div className="bg-white/95 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="font-semibold text-gray-800 text-lg">Tendencias Mensuales</h3>
               <p className="text-gray-500 text-sm">Evolución de métricas clave últimos 6 meses</p>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
               growth > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
               <div className={`rounded-full w-2 h-2 ${growth > 0 ? 'bg-green-400' : 'bg-red-400'}`} />
               <span className="font-medium">{growth > 0 ? '+' : ''}{growth.toFixed(1)}% pacientes</span>
            </div>
         </div>

         <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart
                  data={chartData}
                  margin={{
                     top: 20,
                     right: 30,
                     left: 20,
                     bottom: 5,
                  }}
               >
                  <defs>
                     <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                     </linearGradient>
                     <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                     </linearGradient>
                     <linearGradient id="colorSatisfaction" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                     dataKey="month" 
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
                  <Area
                     type="monotone"
                     dataKey="Pacientes"
                     stroke="#3B82F6"
                     fillOpacity={0.6}
                     fill="url(#colorPatients)"
                     strokeWidth={2}
                  />
                  <Area
                     type="monotone"
                     dataKey="Sesiones"
                     stroke="#10B981"
                     fillOpacity={0.4}
                     fill="url(#colorSessions)"
                     strokeWidth={2}
                  />
                  <Area
                     type="monotone"
                     dataKey="Satisfacción"
                     stroke="#F59E0B"
                     fillOpacity={0.3}
                     fill="url(#colorSatisfaction)"
                     strokeWidth={2}
                  />
               </AreaChart>
            </ResponsiveContainer>
         </div>

         {/* Summary stats */}
         <div className="gap-4 grid grid-cols-4 mt-6 pt-4 border-gray-100 border-t">
            <div className="text-center">
               <p className="font-bold text-blue-600 text-xl">
                  {latestMonth.totalPatients.toLocaleString()}
               </p>
               <p className="text-gray-600 text-xs">Pacientes Enero</p>
            </div>
            <div className="text-center">
               <p className="font-bold text-green-600 text-xl">
                  {latestMonth.totalSessions.toLocaleString()}
               </p>
               <p className="text-gray-600 text-xs">Sesiones Enero</p>
            </div>
            <div className="text-center">
               <p className="font-bold text-orange-600 text-xl">
                  {latestMonth.patientSatisfaction}/5
               </p>
               <p className="text-gray-600 text-xs">Satisfacción</p>
            </div>
            <div className="text-center">
               <p className="font-bold text-purple-600 text-xl">
                  {latestMonth.staffUtilization}%
               </p>
               <p className="text-gray-600 text-xs">Utilización Staff</p>
            </div>
         </div>
      </div>
   );
}
