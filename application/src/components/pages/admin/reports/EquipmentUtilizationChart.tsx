"use client"

import {
   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { mockEquipmentUtilization } from '@/data/mockData/reportsData';

// Format data for the chart
const chartData = mockEquipmentUtilization.map(equipment => ({
   name: equipment.equipmentName.replace('Máquina Diálisis ', '')
      .replace('Sistema ', '')
      .replace('Monitor Paciente ', 'Monitor '),
   'Utilización (%)': equipment.utilizationRate,
   'Eficiencia (%)': equipment.efficiency,
   'Tiempo Parada (h)': equipment.downtime,
   'Mantenimiento (h)': equipment.maintenanceHours
}));

// Local tooltip types
interface ChartTooltipEntry {
   dataKey?: string;
   value?: number | string;
   color?: string;
}

interface CustomTooltipProps {
   active?: boolean;
   payload?: ChartTooltipEntry[] | null;
   label?: string | number;
}

// Custom tooltip
function CustomTooltip ({
   active, payload, label
}: CustomTooltipProps) {
   if (active && payload && payload.length) {
      return (
         <div className="bg-white shadow-lg p-4 border border-gray-200 rounded-lg">
            <p className="mb-2 font-semibold text-gray-800">{`${label}`}</p>
            {payload.map((entry: ChartTooltipEntry, index: number) => {
               let suffix = '';
               if (entry.dataKey?.includes('(%)')) suffix = '%';
               if (entry.dataKey?.includes('(h)')) suffix = 'h';

               return (
                  <p key={index}
                     className="text-sm"
                     style={{
                        color: entry.color
                     }}
                  >
                     {`${entry.dataKey}: ${entry.value}${suffix}`}
                  </p>
               );
            })}
         </div>
      );
   }
   return null;
}

export default function EquipmentUtilizationChart ({ selectedPeriod }: { selectedPeriod: 'week' | 'month' | 'quarter' | 'year' }) {
   const averageUtilization = Math.round(
      chartData.reduce((sum, equipment) => sum + equipment['Utilización (%)'], 0) / chartData.length * 10
   ) / 10;

   return (
      <div className="bg-white/95 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="font-semibold text-gray-800 text-lg">Rendimiento de Equipos</h3>
               <p className="text-gray-500 text-sm">Utilización, eficiencia y mantenimiento</p>
            </div>
            <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full text-indigo-700 text-sm">
               <div className="bg-indigo-400 rounded-full w-2 h-2" />
               <span className="font-medium">{averageUtilization}% utilización</span>
            </div>
         </div>

         <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart
                  data={chartData}
                  margin={{
                     top: 20,
                     right: 30,
                     left: 20,
                     bottom: 60,
                  }}
               >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                     dataKey="name"
                     axisLine={false}
                     tickLine={false}
                     tick={{
                        fontSize: 10,
                        fill: '#6b7280'
                     }}
                     angle={-45}
                     textAnchor="end"
                     height={80}
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
                  <Legend wrapperStyle={{
                     fontSize: '12px'
                  }}
                  />
                  <Bar
                     dataKey="Utilización (%)"
                     fill="#6366F1"
                     radius={[2, 2, 0, 0]}
                     opacity={0.8}
                  />
                  <Bar
                     dataKey="Eficiencia (%)"
                     fill="#10B981"
                     radius={[2, 2, 0, 0]}
                     opacity={0.7}
                  />
                  <Bar
                     dataKey="Tiempo Parada (h)"
                     fill="#EF4444"
                     radius={[2, 2, 0, 0]}
                     opacity={0.6}
                  />
                  <Bar
                     dataKey="Mantenimiento (h)"
                     fill="#F59E0B"
                     radius={[2, 2, 0, 0]}
                     opacity={0.6}
                  />
               </BarChart>
            </ResponsiveContainer>
         </div>

         {/* Equipment status cards */}
         <div className="gap-4 grid grid-cols-2 lg:grid-cols-3 mt-6 pt-4 border-gray-100 border-t">
            {mockEquipmentUtilization.slice(0, 3)
               .map((equipment, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                     <h4 className="mb-2 font-medium text-gray-800 text-sm">
                        {equipment.equipmentName}
                     </h4>
                     <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                           <span className="text-gray-600">Utilización:</span>
                           <span className="font-medium text-indigo-600">{equipment.utilizationRate}%</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">Eficiencia:</span>
                           <span className="font-medium text-green-600">{equipment.efficiency}%</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">Estado:</span>
                           <span className={`font-medium ${equipment.utilizationRate > 90 ? 'text-green-600' : equipment.utilizationRate > 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {equipment.utilizationRate > 90 ? 'Óptimo' : equipment.utilizationRate > 80 ? 'Bueno' : 'Revisar'}
                           </span>
                        </div>
                     </div>
                  </div>
               ))}
         </div>
      </div>
   );
}
