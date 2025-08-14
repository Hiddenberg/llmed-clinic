import {
   Heart, Thermometer, Droplets, Clock, AlertTriangle,
   Activity, TrendingUp, User, Gauge,
   LucideIcon
} from 'lucide-react';
import { DialysisMachine, RealTimeData } from '@/data/mockData/equipmentData';

interface PatientMonitorCardProps {
   machine: DialysisMachine;
   realTimeData?: RealTimeData;
}

function VitalSign ({
   icon: Icon,
   label,
   value,
   unit,
   status = 'normal',
   trend
}: {
   icon: LucideIcon;
   label: string;
   value: string | number;
   unit: string;
   status?: 'normal' | 'warning' | 'critical';
   trend?: 'up' | 'down' | 'stable';
}) {
   const statusColors = {
      normal: 'text-green-600 bg-green-50 border-green-200',
      warning: 'text-orange-600 bg-orange-50 border-orange-200',
      critical: 'text-red-600 bg-red-50 border-red-200'
   };

   const trendIcons = {
      up: '↗',
      down: '↘',
      stable: '→'
   };

   return (
      <div className={`flex items-center gap-3 p-3 rounded-lg border ${statusColors[status]}`}>
         <div className="flex-shrink-0">
            <Icon size={16} className={statusColors[status].split(' ')[0]} />
         </div>
         <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-600 text-xs">{label}</p>
            <div className="flex items-center gap-1">
               <span className="font-bold text-sm">{value}</span>
               <span className="text-gray-500 text-xs">{unit}</span>
               {trend && (
                  <span className="ml-1 text-gray-400 text-xs">
                     {trendIcons[trend]}
                  </span>
               )}
            </div>
         </div>
      </div>
   );
}

function ProgressRing ({
   progress, size = 60, strokeWidth = 4
}: {
   progress: number;
   size?: number;
   strokeWidth?: number;
}) {
   const radius = (size - strokeWidth) / 2;
   const circumference = 2 * Math.PI * radius;
   const strokeDasharray = circumference;
   const strokeDashoffset = circumference - (progress / 100) * circumference;

   return (
      <div className="inline-block relative">
         <svg width={size} height={size} className="-rotate-90 transform">
            <circle
               cx={size / 2}
               cy={size / 2}
               r={radius}
               fill="none"
               stroke="#e5e7eb"
               strokeWidth={strokeWidth}
            />
            <circle
               cx={size / 2}
               cy={size / 2}
               r={radius}
               fill="none"
               stroke="#10b981"
               strokeWidth={strokeWidth}
               strokeDasharray={strokeDasharray}
               strokeDashoffset={strokeDashoffset}
               strokeLinecap="round"
               className="transition-all duration-300"
            />
         </svg>
         <div className="absolute inset-0 flex justify-center items-center">
            <span className="font-bold text-gray-700 text-xs">{Math.round(progress)}%</span>
         </div>
      </div>
   );
}

export default function PatientMonitorCard ({
   machine, realTimeData
}: PatientMonitorCardProps) {
   if (!machine.currentPatient || !realTimeData) {
      return null;
   }

   const { currentPatient } = machine;
   const {
      vitals, fluidBalance, treatmentProgress, estimatedTimeRemaining
   } = realTimeData;

   // Calculate session elapsed time
   const sessionStart = new Date(currentPatient.sessionStart);
   const now = new Date();
   const elapsedMinutes = Math.floor((now.getTime() - sessionStart.getTime()) / (1000 * 60));
   const elapsedHours = Math.floor(elapsedMinutes / 60);
   const remainingHours = Math.floor(estimatedTimeRemaining / 60);
   const remainingMinutes = Math.floor(estimatedTimeRemaining % 60);

   // Determine vital signs status
   const getBPStatus = () => {
      if (vitals.bloodPressure.systolic > 160 || vitals.bloodPressure.diastolic > 100) return 'critical';
      if (vitals.bloodPressure.systolic > 140 || vitals.bloodPressure.diastolic > 90) return 'warning';
      return 'normal';
   };

   const getHRStatus = () => {
      if (vitals.heartRate > 100 || vitals.heartRate < 60) return 'warning';
      return 'normal';
   };

   const getTempStatus = () => {
      if (vitals.temperature > 37.5) return 'warning';
      if (vitals.temperature > 38.0) return 'critical';
      return 'normal';
   };

   const hasActiveAlarms = machine.alarms.active.length > 0;

   return (
      <div className="relative bg-white/95 shadow-lg border border-gray-200/50 rounded-2xl overflow-hidden">
         {/* Header with patient info */}
         <div className="relative bg-gradient-to-r from-green-50 to-blue-50 p-4 border-gray-200/50 border-b">
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <div className="relative">
                     <div className="flex justify-center items-center bg-gradient-to-r from-green-500 to-blue-500 rounded-lg w-10 h-10 text-white">
                        <User size={20} />
                     </div>
                     <div className="top-0 right-0 absolute bg-green-400 border-2 border-white rounded-full w-3 h-3 animate-pulse" />
                  </div>
                  <div>
                     <h3 className="font-bold text-gray-800">{currentPatient.name}</h3>
                     <p className="text-gray-600 text-sm">{machine.location.room} - {machine.location.position}</p>
                  </div>
               </div>

               {hasActiveAlarms && (
                  <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-full text-orange-700">
                     <AlertTriangle size={14} />
                     <span className="font-medium text-xs">{machine.alarms.active.length}</span>
                  </div>
               )}
            </div>
         </div>

         {/* Progress and time info */}
         <div className="p-4 border-gray-100 border-b">
            <div className="flex justify-between items-center mb-3">
               <div className="flex items-center gap-3">
                  <ProgressRing progress={treatmentProgress} />
                  <div>
                     <p className="font-semibold text-gray-800">Progreso de Sesión</p>
                     <p className="text-gray-600 text-sm">
                        {elapsedHours}h {elapsedMinutes % 60}m transcurridos
                     </p>
                  </div>
               </div>
               <div className="text-right">
                  <div className="flex items-center gap-1 text-gray-600">
                     <Clock size={14} />
                     <span className="font-medium text-sm">
                        {remainingHours}h {remainingMinutes}m restantes
                     </span>
                  </div>
               </div>
            </div>
         </div>

         {/* Vital Signs */}
         <div className="p-4 border-gray-100 border-b">
            <h4 className="flex items-center gap-2 mb-3 font-medium text-gray-700 text-sm">
               <Activity size={16} className="text-green-600" />
               Signos Vitales
            </h4>
            <div className="space-y-2">
               <VitalSign
                  icon={Heart}
                  label="Presión Arterial"
                  value={`${Math.round(vitals.bloodPressure.systolic)}/${Math.round(vitals.bloodPressure.diastolic)}`}
                  unit="mmHg"
                  status={getBPStatus()}
               />
               <VitalSign
                  icon={Activity}
                  label="Frecuencia Cardíaca"
                  value={Math.round(vitals.heartRate)}
                  unit="bpm"
                  status={getHRStatus()}
               />
               <VitalSign
                  icon={Thermometer}
                  label="Temperatura"
                  value={vitals.temperature.toFixed(1)}
                  unit="°C"
                  status={getTempStatus()}
               />
            </div>
         </div>

         {/* Fluid Balance */}
         <div className="p-4">
            <h4 className="flex items-center gap-2 mb-3 font-medium text-gray-700 text-sm">
               <Droplets size={16} className="text-blue-600" />
               Balance de Fluidos
            </h4>
            <div className="space-y-2">
               <div className="flex justify-between items-center bg-blue-50 p-2 border border-blue-200 rounded-lg">
                  <span className="text-blue-800 text-sm">Removido</span>
                  <span className="font-bold text-blue-900">
                     {Math.round(fluidBalance.removed)} / {fluidBalance.target} mL
                  </span>
               </div>
               <div className="flex justify-between items-center bg-gray-50 p-2 border border-gray-200 rounded-lg">
                  <span className="text-gray-700 text-sm">Tasa de UF</span>
                  <span className="font-bold text-gray-900">
                     {Math.round(fluidBalance.rate)} mL/h
                  </span>
               </div>
            </div>
         </div>

         {/* Machine Parameters */}
         <div className="bg-gray-50 p-4">
            <h4 className="flex items-center gap-2 mb-3 font-medium text-gray-700 text-sm">
               <Gauge size={16} className="text-gray-600" />
               Parámetros de Máquina
            </h4>
            <div className="gap-2 grid grid-cols-2 text-xs">
               <div className="bg-white p-2 border rounded">
                  <span className="block text-gray-600">Flujo Sanguíneo</span>
                  <span className="font-bold text-gray-900">{machine.parameters.bloodFlowRate} mL/min</span>
               </div>
               <div className="bg-white p-2 border rounded">
                  <span className="block text-gray-600">Flujo Dializado</span>
                  <span className="font-bold text-gray-900">{machine.parameters.dialysateFlowRate} mL/min</span>
               </div>
               <div className="bg-white p-2 border rounded">
                  <span className="block text-gray-600">Presión Arterial</span>
                  <span className="font-bold text-gray-900">{machine.parameters.pressure.arterial} mmHg</span>
               </div>
               <div className="bg-white p-2 border rounded">
                  <span className="block text-gray-600">Presión Venosa</span>
                  <span className="font-bold text-gray-900">{machine.parameters.pressure.venous} mmHg</span>
               </div>
            </div>
         </div>

         {/* Active Alarms */}
         {hasActiveAlarms && (
            <div className="bg-orange-50 p-4 border-orange-200 border-t">
               <h4 className="flex items-center gap-2 mb-2 font-medium text-orange-800 text-sm">
                  <AlertTriangle size={16} />
                  Alertas Activas
               </h4>
               <div className="space-y-1">
                  {machine.alarms.active.slice(0, 2)
                     .map((alarm) => (
                        <div key={alarm.id} className="flex items-center gap-2 bg-white p-2 border border-orange-200 rounded">
                           <div className={`w-2 h-2 rounded-full ${
                              alarm.type === 'critical' ? 'bg-red-500' :
                                 alarm.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                           }`}
                           />
                           <span className="flex-1 text-orange-900 text-xs">{alarm.title}</span>
                        </div>
                     ))}
                  {machine.alarms.active.length > 2 && (
                     <p className="text-orange-700 text-xs">
                        +{machine.alarms.active.length - 2} alertas más
                     </p>
                  )}
               </div>
            </div>
         )}
      </div>
   );
}
