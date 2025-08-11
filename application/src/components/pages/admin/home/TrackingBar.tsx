import { Activity, Clock, AlertTriangle, CheckCircle, Users } from 'lucide-react';
import { getPatientStats } from '@/data/mockData/adminData';

interface StatCardProps {
   icon: React.ReactNode;
   label: string;
   value: number;
   color: 'brand' | 'success' | 'warning' | 'danger' | 'info';
   description: string;
}

function StatCard ({ icon, label, value, color, description }: StatCardProps) {
   const colorClasses = {
      brand: 'bg-brand-50 text-brand-600 border-brand-100',
      success: 'bg-green-50 text-green-600 border-green-100',
      warning: 'bg-orange-50 text-orange-600 border-orange-100',
      danger: 'bg-red-50 text-red-600 border-red-100',
      info: 'bg-blue-50 text-blue-600 border-blue-100'
   };

   const textColorClasses = {
      brand: 'text-brand-700',
      success: 'text-green-700',
      warning: 'text-orange-700',
      danger: 'text-red-700',
      info: 'text-blue-700'
   };

   return (
      <div className="bg-white border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-all duration-200 animate-fade-in">
         <div className="flex items-start justify-between">
            <div className="space-y-2">
               <div className={`inline-flex items-center justify-center w-10 h-10 rounded-md ${colorClasses[color]}`}>
                  {icon}
               </div>
               <div>
                  <p className="text-text-muted text-sm font-medium">{label}</p>
                  <p className={`text-2xl font-bold ${textColorClasses[color]}`}>{value}</p>
                  <p className="text-text-muted text-xs">{description}</p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default function TrackingBar () {
   const stats = getPatientStats();

   return (
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <div>
               <h2 className="text-xl font-semibold text-text">Resumen de Pacientes</h2>
               <p className="text-text-muted text-sm">Estado actual de los tratamientos en la clínica</p>
            </div>
            <div className="flex items-center gap-2 text-text-muted text-sm">
               <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div>
               En tiempo real
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatCard
               icon={<Users size={20} />}
               label="Total Pacientes"
               value={stats.total}
               color="brand"
               description="Pacientes registrados"
            />
            
            <StatCard
               icon={<Activity size={20} />}
               label="En Tratamiento"
               value={stats.active}
               color="success"
               description="Sesiones activas"
            />
            
            <StatCard
               icon={<Clock size={20} />}
               label="Programadas"
               value={stats.scheduled}
               color="info"
               description="Próximas sesiones"
            />
            
            <StatCard
               icon={<AlertTriangle size={20} />}
               label="Urgencias"
               value={stats.emergency}
               color="danger"
               description="Requieren atención"
            />
            
            <StatCard
               icon={<CheckCircle size={20} />}
               label="Completadas Hoy"
               value={stats.completed}
               color="success"
               description="Sesiones finalizadas"
            />
         </div>
      </div>
   );
}
