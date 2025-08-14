import {
   Users, Calendar, Database, FileText, TrendingUp, Activity,
   LucideIcon
} from 'lucide-react';
import { mockResearchMetrics } from '@/data/mockData/researchAnalyticsData';

interface MetricCardProps {
   title: string;
   value: string | number;
   subtitle?: string;
   icon: LucideIcon;
   color: 'brand' | 'success' | 'warning' | 'info';
   trend?: {
      value: number;
      label: string;
   };
}

function MetricCard ({
   title, value, subtitle, icon: Icon, color, trend
}: MetricCardProps) {
   const colorClasses = {
      brand: {
         bg: 'bg-brand-50',
         icon: 'text-brand-600',
         text: 'text-brand-900',
         accent: 'border-brand-200'
      },
      success: {
         bg: 'bg-green-50',
         icon: 'text-green-600',
         text: 'text-green-900',
         accent: 'border-green-200'
      },
      warning: {
         bg: 'bg-amber-50',
         icon: 'text-amber-600',
         text: 'text-amber-900',
         accent: 'border-amber-200'
      },
      info: {
         bg: 'bg-blue-50',
         icon: 'text-blue-600',
         text: 'text-blue-900',
         accent: 'border-blue-200'
      }
   };

   const classes = colorClasses[color];

   return (
      <div className={`bg-white rounded-xl border ${classes.accent} p-6 hover:shadow-lg transition-all duration-200`}>
         <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-lg ${classes.bg}`}>
               <Icon className={`w-6 h-6 ${classes.icon}`} />
            </div>
            {trend && (
               <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-green-600">+{trend.value}%</span>
                  <span className="text-gray-500">{trend.label}</span>
               </div>
            )}
         </div>

         <div className="space-y-2">
            <h3 className="font-medium text-gray-600 text-sm">{title}</h3>
            <div className={`text-2xl font-bold ${classes.text}`}>
               {value}
            </div>
            {subtitle && (
               <p className="text-gray-500 text-sm">{subtitle}</p>
            )}
         </div>
      </div>
   );
}

export default function ResearchMetricsCards () {
   const metrics = [
      {
         title: 'Total de Pacientes',
         value: mockResearchMetrics.totalPatients.toLocaleString(),
         subtitle: 'En base de datos de investigación',
         icon: Users,
         color: 'brand' as const,
         trend: {
            value: 12,
            label: 'vs año anterior'
         }
      },
      {
         title: 'Duración del Estudio',
         value: mockResearchMetrics.studyDuration,
         subtitle: 'Período de recolección de datos',
         icon: Calendar,
         color: 'info' as const
      },
      {
         title: 'Seguimiento Promedio',
         value: mockResearchMetrics.averageFollowUp,
         subtitle: 'Por paciente en el estudio',
         icon: Activity,
         color: 'success' as const
      },
      {
         title: 'Completitud de Datos',
         value: `${mockResearchMetrics.dataCompleteness}%`,
         subtitle: 'Registros completos y validados',
         icon: Database,
         color: 'success' as const,
         trend: {
            value: 3,
            label: 'mejora continua'
         }
      },
      {
         title: 'Publicaciones Generadas',
         value: mockResearchMetrics.publicationsGenerated,
         subtitle: 'Artículos científicos publicados',
         icon: FileText,
         color: 'warning' as const
      },
      {
         title: 'Estudios en Curso',
         value: mockResearchMetrics.ongoingStudies,
         subtitle: 'Investigaciones activas',
         icon: TrendingUp,
         color: 'info' as const
      }
   ];

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <h2 className="font-bold text-gray-900 text-xl">
               Métricas de Investigación
            </h2>
            <div className="text-gray-500 text-sm">
               Actualizado: {new Date()
               .toLocaleDateString('es-ES')}
            </div>
         </div>

         <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric, index) => (
               <MetricCard key={index} {...metric} />
            ))}
         </div>

         {/* Additional context */}
         <div className="bg-gradient-to-r from-blue-50 to-brand-50 p-6 border border-blue-100 rounded-xl">
            <div className="flex items-start gap-4">
               <div className="bg-white shadow-sm p-2 rounded-lg">
                  <Database className="w-5 h-5 text-brand-600" />
               </div>
               <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                     Calidad de los Datos de Investigación
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                     Nuestros datos de investigación mantienen estándares internacionales de calidad,
                     con validación automática y revisión manual. La alta completitud de datos ({mockResearchMetrics.dataCompleteness}%)
                     permite análisis estadísticos robustos y conclusiones científicamente válidas.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
