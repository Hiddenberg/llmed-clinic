import {
   Users, AlertTriangle, TrendingUp, Clock,
   Activity, CheckCircle, Heart, Monitor,
   LucideIcon
} from 'lucide-react';

interface OverallStatsCardProps {
   activeSessions: number;
   totalAlerts: number;
   criticalAlerts: number;
   averageProgress: number;
}

function StatCard ({
   icon: Icon,
   title,
   value,
   subtitle,
   color = 'blue',
   trend
}: {
   icon: LucideIcon;
   title: string;
   value: string | number;
   subtitle?: string;
   color?: 'blue' | 'green' | 'orange' | 'red' | 'gray';
   trend?: 'up' | 'down' | 'stable';
}) {
   const colorClasses = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      orange: 'bg-orange-50 border-orange-200 text-orange-700',
      red: 'bg-red-50 border-red-200 text-red-700',
      gray: 'bg-gray-50 border-gray-200 text-gray-700'
   };

   const iconColorClasses = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      orange: 'text-orange-600',
      red: 'text-red-600',
      gray: 'text-gray-600'
   };

   const trendIcons = {
      up: '↗️',
      down: '↘️',
      stable: '→'
   };

   return (
      <div className={`relative p-4 rounded-xl border ${colorClasses[color]} transition-all hover:shadow-sm`}>
         <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
               <Icon size={20} className={iconColorClasses[color]} />
               <h3 className="font-medium text-sm">{title}</h3>
            </div>
            {trend && (
               <span className="text-xs">{trendIcons[trend]}</span>
            )}
         </div>
         <div className="mb-1">
            <span className="font-bold text-2xl">{value}</span>
         </div>
         {subtitle && (
            <p className="opacity-75 text-xs">{subtitle}</p>
         )}
      </div>
   );
}

export default function OverallStatsCard ({
   activeSessions,
   totalAlerts,
   criticalAlerts,
   averageProgress
}: OverallStatsCardProps) {
   return (
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
         <StatCard
            icon={Users}
            title="Sesiones Activas"
            value={activeSessions}
            subtitle="Pacientes en tratamiento"
            color="green"
            trend="stable"
         />

         <StatCard
            icon={TrendingUp}
            title="Progreso Promedio"
            value={`${averageProgress}%`}
            subtitle="De todas las sesiones"
            color="blue"
            trend="up"
         />

         <StatCard
            icon={AlertTriangle}
            title="Alertas Totales"
            value={totalAlerts}
            subtitle={criticalAlerts > 0 ? `${criticalAlerts} críticas` : "Sin alertas críticas"}
            color={totalAlerts > 0 ? (criticalAlerts > 0 ? 'red' : 'orange') : 'gray'}
            trend={totalAlerts > 0 ? 'up' : 'stable'}
         />

         <StatCard
            icon={Monitor}
            title="Sistema"
            value="Operativo"
            subtitle="Todos los sistemas funcionando"
            color="green"
            trend="stable"
         />
      </div>
   );
}
