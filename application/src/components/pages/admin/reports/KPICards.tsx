import {
   Users, Heart, TrendingUp, Activity, Shield, Clock, AlertTriangle
} from 'lucide-react';
import { getFilteredKPIs } from '@/data/mockData/reportsData';

interface KPICardProps {
   icon: any;
   title: string;
   value: string | number;
   unit?: string;
   trend?: {
      value: number;
      isPositive: boolean;
   };
   color: string;
   bgColor: string;
}

function KPICard ({ icon: Icon, title, value, unit, trend, color, bgColor }: KPICardProps) {
   return (
      <div className={`${bgColor} p-6 border border-gray-200/50 rounded-xl hover:shadow-md transition-all duration-200`}>
         <div className="flex justify-between items-start mb-4">
            <div className={`flex items-center justify-center bg-gradient-to-r ${color} rounded-lg w-12 h-12 text-white`}>
               <Icon size={24} />
            </div>
            {trend && (
               <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  trend.isPositive 
                     ? 'bg-green-100 text-green-700' 
                     : 'bg-red-100 text-red-700'
               }`}>
                  <TrendingUp size={12} className={trend.isPositive ? 'rotate-0' : 'rotate-180'} />
                  {Math.abs(trend.value)}%
               </div>
            )}
         </div>
         
         <div>
            <p className="font-bold text-gray-800 text-2xl">
               {typeof value === 'number' ? value.toLocaleString('es-ES') : value}
               {unit && <span className="ml-1 font-normal text-gray-500 text-lg">{unit}</span>}
            </p>
            <p className="mt-1 text-gray-600 text-sm">{title}</p>
         </div>
      </div>
   );
}

export default function KPICards ({ selectedPeriod }: { selectedPeriod: 'week' | 'month' | 'quarter' | 'year' }) {
   const kpiData = getFilteredKPIs(selectedPeriod);
   const kpis = [
      {
         icon: Users,
         title: 'Total de Pacientes',
         value: kpiData.totalPatients,
         trend: { value: 2.3, isPositive: true },
         color: 'from-blue-500 to-cyan-500',
         bgColor: 'bg-blue-50/50'
      },
      {
         icon: Heart,
         title: 'Pacientes Activos',
         value: kpiData.activePatients,
         trend: { value: 1.8, isPositive: true },
         color: 'from-green-500 to-emerald-500',
         bgColor: 'bg-green-50/50'
      },
      {
         icon: Activity,
         title: 'Eficiencia Promedio',
         value: kpiData.averageTreatmentEfficiency,
         unit: '%',
         trend: { value: 0.5, isPositive: true },
         color: 'from-purple-500 to-pink-500',
         bgColor: 'bg-purple-50/50'
      },
      {
         icon: Shield,
         title: 'Retención de Pacientes',
         value: kpiData.patientRetentionRate,
         unit: '%',
         trend: { value: 0.3, isPositive: true },
         color: 'from-indigo-500 to-purple-500',
         bgColor: 'bg-indigo-50/50'
      },
      {
         icon: Users,
         title: 'Utilización del Personal',
         value: kpiData.staffUtilizationRate,
         unit: '%',
         trend: { value: 2.1, isPositive: true },
         color: 'from-teal-500 to-cyan-500',
         bgColor: 'bg-teal-50/50'
      },
      {
         icon: Clock,
         title: 'Tiempo Operativo Equipos',
         value: kpiData.equipmentUptimeRate,
         unit: '%',
         trend: { value: 0.8, isPositive: true },
         color: 'from-blue-600 to-indigo-600',
         bgColor: 'bg-blue-50/50'
      },
      {
         icon: Heart,
         title: 'Satisfacción Pacientes',
         value: kpiData.patientSatisfactionScore,
         unit: '/5',
         trend: { value: 0.2, isPositive: true },
         color: 'from-pink-500 to-rose-500',
         bgColor: 'bg-pink-50/50'
      },
      {
         icon: AlertTriangle,
         title: 'Tasa de Emergencias',
         value: kpiData.emergencyRate,
         unit: '%',
         trend: { value: 0.4, isPositive: false },
         color: 'from-red-500 to-pink-500',
         bgColor: 'bg-red-50/50'
      },
      {
         icon: Activity,
         title: 'Sesiones por Semana',
         value: kpiData.averageSessionsPerWeek,
         trend: { value: 0.1, isPositive: true },
         color: 'from-violet-500 to-purple-500',
         bgColor: 'bg-violet-50/50'
      },
      {
         icon: AlertTriangle,
         title: 'Tasa de Complicaciones',
         value: kpiData.complicationRate,
         unit: '%',
         trend: { value: 0.3, isPositive: false },
         color: 'from-amber-500 to-orange-500',
         bgColor: 'bg-amber-50/50'
      }
   ];

   return (
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {kpis.map((kpi, index) => (
            <KPICard
               key={index}
               icon={kpi.icon}
               title={kpi.title}
               value={kpi.value}
               unit={kpi.unit}
               trend={kpi.trend}
               color={kpi.color}
               bgColor={kpi.bgColor}
            />
         ))}
      </div>
   );
}
