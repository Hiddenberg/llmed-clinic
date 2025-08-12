"use client"

import {
   PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import { mockTreatmentOutcomes } from '@/data/mockData/reportsData';

// Custom tooltip
function CustomTooltip ({ active, payload }: any) {
   if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
         <div className="bg-white shadow-lg p-4 border border-gray-200 rounded-lg">
            <p className="mb-1 font-semibold text-gray-800">{data.outcome}</p>
            <p className="text-gray-600 text-sm">Casos: {data.count}</p>
            <p className="text-gray-600 text-sm">Porcentaje: {data.percentage}%</p>
         </div>
      );
   }
   return null;
}

// Custom label function for donut chart
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

export default function TreatmentOutcomesChart ({ selectedPeriod }: { selectedPeriod: 'week' | 'month' | 'quarter' | 'year' }) {
   const totalCases = mockTreatmentOutcomes.reduce((sum, outcome) => sum + outcome.count, 0);
   const successRate = mockTreatmentOutcomes
      .filter(outcome => outcome.outcome === 'Excelente' || outcome.outcome === 'Bueno')
      .reduce((sum, outcome) => sum + outcome.percentage, 0);

   return (
      <div className="bg-white/95 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="font-semibold text-gray-800 text-lg">Resultados de Tratamiento</h3>
               <p className="text-gray-500 text-sm">Distribución de outcomes médicos</p>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full text-green-700 text-sm">
               <div className="bg-green-400 rounded-full w-2 h-2" />
               <span className="font-medium">{successRate.toFixed(1)}% éxito</span>
            </div>
         </div>

         <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                  <Pie
                     data={mockTreatmentOutcomes}
                     cx="50%"
                     cy="50%"
                     labelLine={false}
                     label={renderCustomLabel}
                     outerRadius={100}
                     innerRadius={40}
                     fill="#8884d8"
                     dataKey="count"
                  >
                     {mockTreatmentOutcomes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
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

         {/* Outcomes summary */}
         <div className="gap-3 grid grid-cols-2 lg:grid-cols-4 mt-6 pt-4 border-gray-100 border-t">
            {mockTreatmentOutcomes.map((outcome, index) => (
               <div key={index} className="text-center">
                  <div className="flex justify-center items-center gap-2 mb-1">
                     <div 
                        className="rounded-full w-3 h-3" 
                        style={{ backgroundColor: outcome.color }}
                     />
                     <span className="font-medium text-gray-700 text-xs">{outcome.outcome}</span>
                  </div>
                  <p className="font-bold text-gray-800 text-lg">{outcome.count}</p>
                  <p className="text-gray-500 text-xs">{outcome.percentage}%</p>
               </div>
            ))}
         </div>

         {/* Key insights */}
         <div className="gap-3 grid grid-cols-1 md:grid-cols-2 mt-4">
            <div className="bg-green-50 p-3 border border-green-200 rounded-lg">
               <p className="text-green-800 text-sm">
                  <strong>Tasa de éxito:</strong> {successRate.toFixed(1)}% (Excelente + Bueno)
               </p>
            </div>
            <div className="bg-blue-50 p-3 border border-blue-200 rounded-lg">
               <p className="text-blue-800 text-sm">
                  <strong>Total de casos:</strong> {totalCases} tratamientos evaluados
               </p>
            </div>
         </div>
      </div>
   );
}
