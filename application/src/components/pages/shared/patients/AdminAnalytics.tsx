import {
   BarChart3, PieChart, TrendingUp, Activity,
   Users, Target, AlertTriangle, Calendar
} from 'lucide-react';
import {
   mockTreatmentEffectivenessData,
   mockAdherenceDistribution,
   mockRiskDistribution,
   TreatmentEffectivenessData,
   AdherenceDistribution,
   RiskDistribution
} from '@/data/mockData/patientsListData';

// Simple bar chart component
function TreatmentEffectivenessChart ({ data }: { data: TreatmentEffectivenessData[] }) {
   const maxEffectiveness = Math.max(...data.map(d => d.effectiveness));
   const maxPatientCount = Math.max(...data.map(d => d.patientCount));

   return (
      <div className="space-y-4">
         <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-800">Efectividad del Tratamiento</h4>
            <div className="flex items-center gap-4 text-sm">
               <div className="flex items-center gap-2">
                  <div className="bg-brand-500 rounded w-3 h-3" />
                  <span className="text-gray-600">Efectividad (%)</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="bg-blue-400 rounded w-3 h-3" />
                  <span className="text-gray-600">Pacientes</span>
               </div>
            </div>
         </div>

         <div className="space-y-3">
            {data.map((item, index) => (
               <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                     <span className="font-medium text-gray-700">{item.month}</span>
                     <div className="flex items-center gap-4">
                        <span className="font-medium text-brand-600">{item.effectiveness}%</span>
                        <span className="font-medium text-blue-600">{item.patientCount}</span>
                     </div>
                  </div>
                  <div className="relative">
                     {/* Effectiveness bar */}
                     <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                           className="bg-gradient-to-r from-brand-500 to-brand-400 rounded-full h-full transition-all duration-500"
                           style={{
                              width: `${(item.effectiveness / maxEffectiveness) * 100}%`
                           }}
                        />
                     </div>
                     {/* Patient count bar */}
                     <div className="bg-gray-100 mt-1 rounded-full h-2 overflow-hidden">
                        <div
                           className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-full h-full transition-all duration-500"
                           style={{
                              width: `${(item.patientCount / maxPatientCount) * 100}%`
                           }}
                        />
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

// Adherence distribution chart
function AdherenceChart ({ data }: { data: AdherenceDistribution[] }) {
   const getColor = (range: string) => {
      if (range.startsWith('90')) return 'bg-green-500';
      if (range.startsWith('80')) return 'bg-blue-500';
      if (range.startsWith('70')) return 'bg-yellow-500';
      return 'bg-red-500';
   };

   return (
      <div className="space-y-4">
         <h4 className="font-medium text-gray-800">Distribución de Adherencia</h4>
         <div className="space-y-3">
            {data.map((item, index) => (
               <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <div className={`w-4 h-4 rounded ${getColor(item.range)}`} />
                     <span className="text-gray-700 text-sm">{item.range}</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="font-medium text-gray-800 text-sm">{item.count} pacientes</span>
                     <span className="min-w-[40px] text-gray-500 text-xs text-right">{item.percentage}%</span>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

// Risk distribution chart
function RiskChart ({ data }: { data: RiskDistribution[] }) {
   const getRiskColor = (level: string) => {
      switch (level) {
         case 'low': return 'bg-green-500';
         case 'medium': return 'bg-yellow-500';
         case 'high': return 'bg-red-500';
         default: return 'bg-gray-500';
      }
   };

   const getRiskLabel = (level: string) => {
      switch (level) {
         case 'low': return 'Riesgo Bajo';
         case 'medium': return 'Riesgo Medio';
         case 'high': return 'Riesgo Alto';
         default: return level;
      }
   };

   return (
      <div className="space-y-4">
         <h4 className="font-medium text-gray-800">Distribución de Riesgo</h4>
         <div className="space-y-3">
            {data.map((item, index) => (
               <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                     <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${getRiskColor(item.level)}`} />
                        <span className="text-gray-700 text-sm">{getRiskLabel(item.level)}</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-800 text-sm">{item.count}</span>
                        <span className="min-w-[40px] text-gray-500 text-xs text-right">{item.percentage}%</span>
                     </div>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                     <div
                        className={`h-full rounded-full transition-all duration-500 ${getRiskColor(item.level)}`}
                        style={{
                           width: `${item.percentage}%`
                        }}
                     />
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

// Key insights component
function KeyInsights () {
   const insights = [
      {
         title: 'Tendencia Positiva',
         description: 'La adherencia promedio ha aumentado 2.3% este mes',
         icon: <TrendingUp size={20} className="text-green-500" />,
         color: 'bg-green-50 border-green-200'
      },
      {
         title: 'Atención Requerida',
         description: '4 pacientes necesitan seguimiento inmediato',
         icon: <AlertTriangle size={20} className="text-orange-500" />,
         color: 'bg-orange-50 border-orange-200'
      },
      {
         title: 'Eficiencia Alta',
         description: '93% de efectividad en tratamientos este mes',
         icon: <Target size={20} className="text-blue-500" />,
         color: 'bg-blue-50 border-blue-200'
      },
      {
         title: 'Crecimiento',
         description: '8 nuevos pacientes registrados esta semana',
         icon: <Users size={20} className="text-purple-500" />,
         color: 'bg-purple-50 border-purple-200'
      }
   ];

   return (
      <div className="space-y-4">
         <h4 className="font-medium text-gray-800">Insights Clave</h4>
         <div className="space-y-3">
            {insights.map((insight, index) => (
               <div key={index} className={`flex items-start gap-3 p-3 rounded-lg border ${insight.color}`}>
                  <div className="flex-shrink-0 mt-0.5">
                     {insight.icon}
                  </div>
                  <div>
                     <p className="font-medium text-gray-800 text-sm">{insight.title}</p>
                     <p className="mt-1 text-gray-600 text-xs">{insight.description}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

// Monthly trends component
function MonthlyTrends () {
   const trends = [
      {
         metric: 'Nuevos Pacientes',
         current: 8,
         previous: 5,
         change: 60.0
      },
      {
         metric: 'Sesiones Completadas',
         current: 298,
         previous: 276,
         change: 8.0
      },
      {
         metric: 'Adherencia Promedio',
         current: 87,
         previous: 85,
         change: 2.4
      },
      {
         metric: 'Tiempo Promedio/Sesión',
         current: 238,
         previous: 242,
         change: -1.7
      }
   ];

   return (
      <div className="space-y-4">
         <h4 className="font-medium text-gray-800">Tendencias Mensuales</h4>
         <div className="space-y-3">
            {trends.map((trend, index) => (
               <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <div>
                     <p className="font-medium text-gray-800 text-sm">{trend.metric}</p>
                     <p className="text-gray-600 text-xs">
                        {trend.metric.includes('Tiempo') ? `${trend.current} min` : trend.current}
                     </p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                     trend.change >= 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                  }`}
                  >
                     <TrendingUp size={12} className={trend.change >= 0 ? '' : 'rotate-180'} />
                     {Math.abs(trend.change)
                        .toFixed(1)}%
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

export default function AdminAnalytics () {
   return (
      <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
         <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-b from-purple-500 to-pink-500 rounded-full w-1 h-6" />
            <h2 className="font-semibold text-gray-800 text-lg">Análisis y Métricas</h2>
            <div className="flex-1 bg-gradient-to-r from-gray-300/30 to-transparent ml-4 h-px" />
            <div className="flex items-center gap-2">
               <BarChart3 size={18} className="text-purple-500" />
               <span className="font-medium text-purple-600 text-sm">Dashboard Administrativo</span>
            </div>
         </div>

         <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {/* Treatment Effectiveness Chart */}
            <div className="bg-white/60 shadow-sm backdrop-blur-sm p-5 border border-white/50 rounded-xl">
               <TreatmentEffectivenessChart data={mockTreatmentEffectivenessData} />
            </div>

            {/* Adherence Distribution */}
            <div className="bg-white/60 shadow-sm backdrop-blur-sm p-5 border border-white/50 rounded-xl">
               <AdherenceChart data={mockAdherenceDistribution} />
            </div>

            {/* Risk Distribution */}
            <div className="bg-white/60 shadow-sm backdrop-blur-sm p-5 border border-white/50 rounded-xl">
               <RiskChart data={mockRiskDistribution} />
            </div>

            {/* Key Insights */}
            <div className="bg-white/60 shadow-sm backdrop-blur-sm p-5 border border-white/50 rounded-xl">
               <KeyInsights />
            </div>

            {/* Monthly Trends */}
            <div className="lg:col-span-2 xl:col-span-2 bg-white/60 shadow-sm backdrop-blur-sm p-5 border border-white/50 rounded-xl">
               <MonthlyTrends />
            </div>
         </div>

         {/* Quick Actions for Admin */}
         <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-gray-200/50 border-t">
            <h4 className="font-medium text-gray-700 text-sm">Acciones Rápidas:</h4>
            <button className="flex items-center gap-2 bg-brand-50 hover:bg-brand-100 px-3 py-2 rounded-lg text-brand-600 text-sm transition-colors">
               <BarChart3 size={14} />
               Generar Reporte
            </button>
            <button className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg text-blue-600 text-sm transition-colors">
               <Users size={14} />
               Exportar Datos
            </button>
            <button className="flex items-center gap-2 bg-green-50 hover:bg-green-100 px-3 py-2 rounded-lg text-green-600 text-sm transition-colors">
               <Calendar size={14} />
               Programar Análisis
            </button>
         </div>
      </div>
   );
}
