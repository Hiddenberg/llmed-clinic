import {
   Users, UserCheck, AlertTriangle, TrendingUp,
   Calendar, Activity, Heart, Target
} from 'lucide-react';
import { PatientMetrics } from '@/data/mockData/patientsListData';

interface PatientMetricsCardsProps {
   metrics: PatientMetrics;
   userType: 'admin' | 'doctor';
}

interface MetricCardProps {
   title: string;
   value: number | string;
   subtitle?: string;
   icon: React.ReactNode;
   color: string;
   trend?: {
      value: number;
      isPositive: boolean;
   };
}

function MetricCard ({
   title, value, subtitle, icon, color, trend
}: MetricCardProps) {
   return (
      <div className="group relative bg-white/60 hover:bg-white/80 shadow-sm hover:shadow-md backdrop-blur-sm p-6 border border-white/50 rounded-2xl transition-all">
         {/* Background gradient */}
         <div className={`absolute top-0 right-0 w-20 h-20 ${color} rounded-full blur-2xl opacity-10 group-hover:opacity-15 transition-opacity`} />

         <div className="relative">
            <div className="flex justify-between items-start mb-4">
               <div className={`flex items-center justify-center w-12 h-12 ${color} rounded-xl text-white shadow-lg`}>
                  {icon}
               </div>

               {trend && (
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                     trend.isPositive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                  }`}
                  >
                     <TrendingUp size={12} className={trend.isPositive ? '' : 'rotate-180'} />
                     {Math.abs(trend.value)}%
                  </div>
               )}
            </div>

            <div className="space-y-1">
               <p className="font-bold text-gray-800 text-2xl">{value}</p>
               <p className="font-medium text-gray-600 text-sm">{title}</p>
               {subtitle && (
                  <p className="text-gray-500 text-xs">{subtitle}</p>
               )}
            </div>
         </div>
      </div>
   );
}

export default function PatientMetricsCards ({
   metrics, userType
}: PatientMetricsCardsProps) {
   const adminMetrics = [
      {
         title: 'Total de Pacientes',
         value: metrics.totalPatients,
         subtitle: 'Pacientes registrados',
         icon: <Users size={20} />,
         color: 'bg-gradient-to-r from-brand-500 to-blue-500',
         trend: {
            value: 8.5,
            isPositive: true
         }
      },
      {
         title: 'Pacientes Activos',
         value: metrics.activePatients,
         subtitle: 'En tratamiento actual',
         icon: <UserCheck size={20} />,
         color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      },
      {
         title: 'Programados Hoy',
         value: metrics.scheduledToday,
         subtitle: 'Sesiones de hoy',
         icon: <Calendar size={20} />,
         color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      },
      {
         title: 'Casos de Emergencia',
         value: metrics.emergencyCases,
         subtitle: 'Requieren atención inmediata',
         icon: <AlertTriangle size={20} />,
         color: 'bg-gradient-to-r from-red-500 to-orange-500',
      },
      {
         title: 'Adherencia Promedio',
         value: `${metrics.averageAdherence}%`,
         subtitle: 'Cumplimiento del tratamiento',
         icon: <Target size={20} />,
         color: 'bg-gradient-to-r from-purple-500 to-pink-500',
         trend: {
            value: 2.3,
            isPositive: true
         }
      },
      {
         title: 'Pacientes Mejorando',
         value: metrics.patientsImproving,
         subtitle: 'Progreso ≥ 80%',
         icon: <TrendingUp size={20} />,
         color: 'bg-gradient-to-r from-green-600 to-teal-500',
      },
      {
         title: 'Pacientes en Riesgo',
         value: metrics.patientsAtRisk,
         subtitle: 'Riesgo alto identificado',
         icon: <AlertTriangle size={20} />,
         color: 'bg-gradient-to-r from-orange-500 to-red-500',
      },
      {
         title: 'Eficiencia General',
         value: '93%',
         subtitle: 'Efectividad del tratamiento',
         icon: <Activity size={20} />,
         color: 'bg-gradient-to-r from-indigo-500 to-purple-500',
         trend: {
            value: 1.8,
            isPositive: true
         }
      }
   ];

   const doctorMetrics = [
      {
         title: 'Mis Pacientes',
         value: metrics.totalPatients,
         subtitle: 'Pacientes asignados',
         icon: <Users size={20} />,
         color: 'bg-gradient-to-r from-brand-500 to-blue-500',
      },
      {
         title: 'Activos',
         value: metrics.activePatients,
         subtitle: 'En tratamiento',
         icon: <UserCheck size={20} />,
         color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      },
      {
         title: 'Hoy',
         value: metrics.scheduledToday,
         subtitle: 'Programados hoy',
         icon: <Calendar size={20} />,
         color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      },
      {
         title: 'Emergencias',
         value: metrics.emergencyCases,
         subtitle: 'Atención inmediata',
         icon: <AlertTriangle size={20} />,
         color: 'bg-gradient-to-r from-red-500 to-orange-500',
      },
      {
         title: 'Adherencia',
         value: `${metrics.averageAdherence}%`,
         subtitle: 'Cumplimiento promedio',
         icon: <Target size={20} />,
         color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      },
      {
         title: 'Mejorando',
         value: metrics.patientsImproving,
         subtitle: 'Progreso positivo',
         icon: <TrendingUp size={20} />,
         color: 'bg-gradient-to-r from-green-600 to-teal-500',
      }
   ];

   const metricsToShow = userType === 'admin' ? adminMetrics : doctorMetrics;

   return (
      <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
         <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-b from-brand-500 to-blue-500 rounded-full w-1 h-6" />
            <h2 className="font-semibold text-gray-800 text-lg">
               {userType === 'admin' ? 'Métricas Generales' : 'Resumen de Pacientes'}
            </h2>
            <div className="flex-1 bg-gradient-to-r from-gray-300/30 to-transparent ml-4 h-px" />
         </div>

         <div className={`grid gap-4 ${
            userType === 'admin'
               ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
               : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
         }`}
         >
            {metricsToShow.map((metric, index) => (
               <MetricCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  subtitle={metric.subtitle}
                  icon={metric.icon}
                  color={metric.color}
                  trend={metric.trend}
               />
            ))}
         </div>
      </div>
   );
}
