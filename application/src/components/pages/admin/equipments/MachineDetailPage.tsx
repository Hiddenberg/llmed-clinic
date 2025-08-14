"use client"

import {
   ArrowLeft, Activity, AlertTriangle, Settings, User, Clock, Wifi, Bell, BellOff,
   Thermometer, Gauge, Droplets, Heart, Zap, Shield, Calendar, Wrench,
   TrendingUp, BarChart3, AlertCircle, CheckCircle, XCircle,
   LucideIcon
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
   mockClinics, mockEquipmentData, mockRealTimeData, type Clinic, type DialysisMachine, type RealTimeData
} from '@/data/mockData/equipmentData';

interface MachineDetailPageProps {
   clinicId: string;
   machineId: string;
}

// Floating geometric shapes for background decoration
function FloatingGeometry () {
   return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="-top-24 -right-24 absolute bg-gradient-to-br from-brand-500/6 to-blue-500/3 rounded-full w-96 h-96 animate-pulse"
            style={{
               animationDuration: '8s'
            }}
         />
         <div className="top-1/2 -left-32 absolute bg-gradient-to-br from-green-400/4 to-brand-400/3 rounded-full w-64 h-64 animate-float"
            style={{
               animationDuration: '10s'
            }}
         />
      </div>
   );
}

// Status indicator component
function StatusIndicator ({
   status, size = 'normal'
}: { status: DialysisMachine['status']; size?: 'normal' | 'large' }) {
   const getStatusConfig = (status: DialysisMachine['status']) => {
      switch (status) {
         case 'active':
            return {
               color: 'bg-green-500',
               label: 'Activo',
               textColor: 'text-green-700',
               bgColor: 'bg-green-50'
            };
         case 'standby':
            return {
               color: 'bg-blue-500',
               label: 'En espera',
               textColor: 'text-blue-700',
               bgColor: 'bg-blue-50'
            };
         case 'maintenance':
            return {
               color: 'bg-yellow-500',
               label: 'Mantenimiento',
               textColor: 'text-yellow-700',
               bgColor: 'bg-yellow-50'
            };
         case 'offline':
            return {
               color: 'bg-red-500',
               label: 'Fuera de línea',
               textColor: 'text-red-700',
               bgColor: 'bg-red-50'
            };
         case 'emergency':
            return {
               color: 'bg-red-600 animate-pulse',
               label: 'Emergencia',
               textColor: 'text-red-800',
               bgColor: 'bg-red-50'
            };
         default:
            return {
               color: 'bg-gray-500',
               label: 'Desconocido',
               textColor: 'text-gray-700',
               bgColor: 'bg-gray-50'
            };
      }
   };

   const config = getStatusConfig(status);
   const dotSize = size === 'large' ? 'w-4 h-4' : 'w-3 h-3';
   const textSize = size === 'large' ? 'text-base' : 'text-sm';

   return (
      <div className={`flex items-center gap-3 px-4 py-2 rounded-lg ${config.bgColor}`}>
         <div className={`${dotSize} rounded-full ${config.color}`} />
         <span className={`font-medium ${config.textColor} ${textSize}`}>{config.label}</span>
      </div>
   );
}

// Real-time parameter card
function ParameterCard ({
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
   const getStatusColor = (status: string) => {
      switch (status) {
         case 'warning': return 'border-yellow-200 bg-yellow-50';
         case 'critical': return 'border-red-200 bg-red-50';
         default: return 'border-gray-200 bg-white';
      }
   };

   const getValueColor = (status: string) => {
      switch (status) {
         case 'warning': return 'text-yellow-700';
         case 'critical': return 'text-red-700';
         default: return 'text-gray-900';
      }
   };

   const getTrendIcon = (trend?: string) => {
      switch (trend) {
         case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
         case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
         default: return null;
      }
   };

   return (
      <div className={`p-4 rounded-xl border-2 ${getStatusColor(status)} transition-all duration-200`}>
         <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
               <Icon className="w-5 h-5 text-brand-600" />
               <span className="font-medium text-gray-600 text-sm">{label}</span>
            </div>
            {getTrendIcon(trend)}
         </div>
         <div className="flex items-baseline gap-1">
            <span className={`font-bold text-2xl ${getValueColor(status)}`}>{value}</span>
            <span className="text-gray-500 text-sm">{unit}</span>
         </div>
      </div>
   );
}

// Patient info panel
function PatientInfoPanel ({
   machine, realTimeData
}: { machine: DialysisMachine; realTimeData?: RealTimeData | null }) {
   if (!machine.currentPatient || machine.status !== 'active') {
      return (
         <div className="bg-white/95 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
            <h3 className="mb-4 font-semibold text-gray-900 text-lg">Información del Paciente</h3>
            <div className="py-8 text-gray-500 text-center">
               <User className="mx-auto mb-4 w-12 h-12 text-gray-300" />
               <p>No hay paciente asignado</p>
            </div>
         </div>
      );
   }

   const { currentPatient } = machine;
   const sessionDuration = Math.floor((Date.now() - new Date(currentPatient.sessionStart)
      .getTime()) / 60000);

   return (
      <div className="bg-white/95 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
         <h3 className="mb-4 font-semibold text-gray-900 text-lg">Información del Paciente</h3>

         <div className="space-y-4">
            <div className="flex items-center gap-3">
               <div className="bg-blue-100 p-3 rounded-full">
                  <User className="w-6 h-6 text-blue-600" />
               </div>
               <div>
                  <h4 className="font-semibold text-gray-900">{currentPatient.name}</h4>
                  <p className="text-gray-500 text-sm">Paciente ID: {currentPatient.id}</p>
               </div>
            </div>

            <div className="gap-4 grid grid-cols-2">
               <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                     <Clock className="w-4 h-4 text-gray-600" />
                     <span className="text-gray-600 text-sm">Duración</span>
                  </div>
                  <p className="font-semibold text-gray-900">{sessionDuration} min</p>
               </div>
               <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                     <Activity className="w-4 h-4 text-gray-600" />
                     <span className="text-gray-600 text-sm">Progreso</span>
                  </div>
                  <p className="font-semibold text-gray-900">{Math.round(currentPatient.progress)}%</p>
               </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
               <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progreso de la sesión</span>
                  <span className="font-medium text-gray-900">{Math.round(currentPatient.progress)}%</span>
               </div>
               <div className="bg-gray-200 rounded-full h-2">
                  <div
                     className="bg-blue-600 rounded-full h-2 transition-all duration-500"
                     style={{
                        width: `${currentPatient.progress}%`
                     }}
                  />
               </div>
            </div>

            {/* Vital Signs */}
            {realTimeData && (
               <div className="space-y-3 pt-4 border-gray-100 border-t">
                  <h5 className="font-medium text-gray-900">Signos Vitales</h5>
                  <div className="gap-3 grid grid-cols-2">
                     <div className="bg-red-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                           <Heart className="w-4 h-4 text-red-600" />
                           <span className="font-medium text-red-700 text-sm">Presión Arterial</span>
                        </div>
                        <p className="font-bold text-red-800">
                           {Math.round(realTimeData.vitals.bloodPressure.systolic)}/{Math.round(realTimeData.vitals.bloodPressure.diastolic)} mmHg
                        </p>
                     </div>
                     <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                           <Activity className="w-4 h-4 text-green-600" />
                           <span className="font-medium text-green-700 text-sm">Frecuencia Cardíaca</span>
                        </div>
                        <p className="font-bold text-green-800">{Math.round(realTimeData.vitals.heartRate)} bpm</p>
                     </div>
                  </div>
               </div>
            )}

            {/* Fluid Balance */}
            {realTimeData && (
               <div className="space-y-3 pt-4 border-gray-100 border-t">
                  <h5 className="font-medium text-gray-900">Balance de Fluidos</h5>
                  <div className="bg-blue-50 p-3 rounded-lg">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-blue-700 text-sm">Fluido Removido</span>
                        <span className="font-semibold text-blue-900">
                           {Math.round(realTimeData.fluidBalance.removed)} / {Math.round(realTimeData.fluidBalance.target)} mL
                        </span>
                     </div>
                     <div className="bg-blue-200 rounded-full h-2">
                        <div
                           className="bg-blue-600 rounded-full h-2 transition-all duration-500"
                           style={{
                              width: `${(realTimeData.fluidBalance.removed / realTimeData.fluidBalance.target) * 100}%`
                           }}
                        />
                     </div>
                     <p className="mt-1 text-blue-700 text-xs">
                        Tasa: {realTimeData.fluidBalance.rate} mL/hr
                     </p>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

// Alarms panel
function AlarmsPanel ({ machine }: { machine: DialysisMachine }) {
   return (
      <div className="bg-white/95 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
         <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900 text-lg">Alarmas y Alertas</h3>
            <div className="flex items-center gap-2">
               {machine.alarms.active.length > 0 ? (
                  <Bell className="w-5 h-5 text-yellow-600" />
               ) : (
                  <BellOff className="w-5 h-5 text-gray-400" />
               )}
               <span className="text-gray-600 text-sm">
                  {machine.alarms.active.length} activas
               </span>
            </div>
         </div>

         {machine.alarms.active.length === 0 ? (
            <div className="py-8 text-gray-500 text-center">
               <CheckCircle className="mx-auto mb-4 w-12 h-12 text-green-400" />
               <p>No hay alarmas activas</p>
               <p className="mt-1 text-sm">Sistema funcionando normalmente</p>
            </div>
         ) : (
            <div className="space-y-3">
               {machine.alarms.active.map((alarm) => {
                  const getAlarmIcon = (type: string) => {
                     switch (type) {
                        case 'critical': return <XCircle className="w-5 h-5 text-red-600" />;
                        case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
                        default: return <AlertCircle className="w-5 h-5 text-blue-600" />;
                     }
                  };

                  const getAlarmBg = (type: string) => {
                     switch (type) {
                        case 'critical': return 'bg-red-50 border-red-200';
                        case 'warning': return 'bg-yellow-50 border-yellow-200';
                        default: return 'bg-blue-50 border-blue-200';
                     }
                  };

                  const timeAgo = Math.floor((Date.now() - new Date(alarm.timestamp)
                     .getTime()) / 60000);

                  return (
                     <div key={alarm.id} className={`p-4 rounded-lg border ${getAlarmBg(alarm.type)}`}>
                        <div className="flex items-start gap-3">
                           {getAlarmIcon(alarm.type)}
                           <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{alarm.title}</h4>
                              <p className="mt-1 text-gray-600 text-sm">{alarm.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-gray-500 text-xs">
                                 <span>Hace {timeAgo} min</span>
                                 <span className="capitalize">{alarm.category}</span>
                                 {!alarm.acknowledged && (
                                    <span className="bg-red-100 px-2 py-1 rounded-full text-red-700">
                                       No reconocida
                                    </span>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         )}

         {/* Alarm Summary */}
         <div className="gap-4 grid grid-cols-3 mt-6 pt-6 border-gray-100 border-t">
            <div className="text-center">
               <p className="font-bold text-red-600 text-lg">{machine.alarms.critical}</p>
               <p className="text-gray-500 text-sm">Críticas</p>
            </div>
            <div className="text-center">
               <p className="font-bold text-yellow-600 text-lg">{machine.alarms.warning}</p>
               <p className="text-gray-500 text-sm">Advertencias</p>
            </div>
            <div className="text-center">
               <p className="font-bold text-gray-600 text-lg">{machine.alarms.total}</p>
               <p className="text-gray-500 text-sm">Total hoy</p>
            </div>
         </div>
      </div>
   );
}

// Maintenance panel
function MaintenancePanel ({ machine }: { machine: DialysisMachine }) {
   const daysSinceLastMaintenance = Math.floor(
      (Date.now() - new Date(machine.maintenance.lastMaintenance)
         .getTime()) / (1000 * 60 * 60 * 24)
   );

   const daysUntilNextMaintenance = Math.floor(
      (new Date(machine.maintenance.nextMaintenance)
         .getTime() - Date.now()) / (1000 * 60 * 60 * 24)
   );

   const getMaintenanceUrgency = (days: number) => {
      if (days <= 7) return {
         color: 'text-red-600',
         bg: 'bg-red-50',
         label: 'Urgente'
      };
      if (days <= 14) return {
         color: 'text-yellow-600',
         bg: 'bg-yellow-50',
         label: 'Próximo'
      };
      return {
         color: 'text-green-600',
         bg: 'bg-green-50',
         label: 'Programado'
      };
   };

   const urgency = getMaintenanceUrgency(daysUntilNextMaintenance);

   return (
      <div className="bg-white/95 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
         <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900 text-lg">Mantenimiento</h3>
         </div>

         <div className="space-y-4">
            {/* Next Maintenance */}
            <div className={`p-4 rounded-lg ${urgency.bg}`}>
               <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">Próximo Mantenimiento</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgency.color} bg-white`}>
                     {urgency.label}
                  </span>
               </div>
               <p className={`font-bold text-lg ${urgency.color}`}>
                  {daysUntilNextMaintenance > 0 ? `En ${daysUntilNextMaintenance} días` : 'Atrasado'}
               </p>
               <p className="text-gray-600 text-sm">
                  {new Date(machine.maintenance.nextMaintenance)
                     .toLocaleDateString('es-MX', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                     })}
               </p>
            </div>

            {/* Maintenance Stats */}
            <div className="gap-4 grid grid-cols-2">
               <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                     <Calendar className="w-4 h-4 text-gray-600" />
                     <span className="text-gray-600 text-sm">Último Mantenimiento</span>
                  </div>
                  <p className="font-semibold text-gray-900">Hace {daysSinceLastMaintenance} días</p>
               </div>
               <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                     <Clock className="w-4 h-4 text-gray-600" />
                     <span className="text-gray-600 text-sm">Horas de Mantenimiento</span>
                  </div>
                  <p className="font-semibold text-gray-900">{machine.maintenance.maintenanceHours}h</p>
               </div>
               <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                     <Settings className="w-4 h-4 text-gray-600" />
                     <span className="text-gray-600 text-sm">Tipo</span>
                  </div>
                  <p className="font-semibold text-gray-900 capitalize">{machine.maintenance.maintenanceType}</p>
               </div>
               <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                     <XCircle className="w-4 h-4 text-gray-600" />
                     <span className="text-gray-600 text-sm">Tiempo Inactivo</span>
                  </div>
                  <p className="font-semibold text-gray-900">{machine.maintenance.totalDowntime}h</p>
               </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-blue-50 p-4 rounded-lg">
               <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Horas de Operación Total</span>
               </div>
               <p className="font-bold text-blue-800 text-xl">{machine.performance.totalOperatingHours.toLocaleString()}h</p>
               <p className="text-blue-700 text-sm">
                  Equivalente a {Math.round(machine.performance.totalOperatingHours / 24)} días de operación continua
               </p>
            </div>
         </div>
      </div>
   );
}

export default function MachineDetailPage ({
   clinicId, machineId
}: MachineDetailPageProps) {
   const [machine, setMachine] = useState<DialysisMachine | null>(null);
   const [realTimeData, setRealTimeData] = useState<RealTimeData | null>(null);
   const [clinic, setClinic] = useState<Clinic | null>(null);

   useEffect(() => {
      // Find the clinic and machine
      const foundClinic = mockClinics.find(c => c.id === clinicId);
      const foundMachine = mockEquipmentData.find(m => m.id === machineId && m.clinicId === clinicId);
      const foundRealTimeData = mockRealTimeData.find(d => d.machineId === machineId);

      setClinic(foundClinic || null);
      setMachine(foundMachine || null);
      setRealTimeData(foundRealTimeData || null);

      if (!foundMachine) return;

      // Simulate real-time updates
      const interval = setInterval(() => {
         if (foundMachine.status === 'active') {
            setMachine(prev => prev ? {
               ...prev,
               parameters: {
                  ...prev.parameters,
                  bloodFlowRate: Math.max(250, Math.min(350, prev.parameters.bloodFlowRate + (Math.random() - 0.5) * 8)),
                  dialysateFlowRate: Math.max(450, Math.min(550, prev.parameters.dialysateFlowRate + (Math.random() - 0.5) * 10)),
                  ultrafiltrationRate: Math.max(600, Math.min(1000, prev.parameters.ultrafiltrationRate + (Math.random() - 0.5) * 20)),
                  temperature: Math.max(36.5, Math.min(37.5, prev.parameters.temperature + (Math.random() - 0.5) * 0.1)),
                  conductivity: Math.max(13.8, Math.min(14.5, prev.parameters.conductivity + (Math.random() - 0.5) * 0.1)),
                  pressure: {
                     arterial: Math.max(-200, Math.min(-150, prev.parameters.pressure.arterial + (Math.random() - 0.5) * 8)),
                     venous: Math.max(100, Math.min(140, prev.parameters.pressure.venous + (Math.random() - 0.5) * 6)),
                     dialysate: Math.max(40, Math.min(60, prev.parameters.pressure.dialysate + (Math.random() - 0.5) * 4))
                  }
               },
               currentPatient: prev.currentPatient ? {
                  ...prev.currentPatient,
                  progress: Math.min(100, prev.currentPatient.progress + Math.random() * 1.5)
               } : prev.currentPatient
            } : prev);

            setRealTimeData(prev => prev ? {
               ...prev,
               treatmentProgress: Math.min(100, prev.treatmentProgress + Math.random() * 1.5),
               estimatedTimeRemaining: Math.max(0, prev.estimatedTimeRemaining - Math.random() * 2),
               vitals: {
                  ...prev.vitals,
                  heartRate: Math.max(65, Math.min(95, prev.vitals.heartRate + (Math.random() - 0.5) * 3)),
                  bloodPressure: {
                     systolic: Math.max(120, Math.min(160, prev.vitals.bloodPressure.systolic + (Math.random() - 0.5) * 4)),
                     diastolic: Math.max(70, Math.min(100, prev.vitals.bloodPressure.diastolic + (Math.random() - 0.5) * 3))
                  },
                  temperature: Math.max(36.0, Math.min(37.2, prev.vitals.temperature + (Math.random() - 0.5) * 0.1))
               },
               fluidBalance: {
                  ...prev.fluidBalance,
                  removed: Math.min(prev.fluidBalance.target, prev.fluidBalance.removed + Math.random() * 30)
               }
            } : prev);
         }
      }, 3000); // Update every 3 seconds

      return () => clearInterval(interval);
   }, [clinicId, machineId]);

   if (!machine || !clinic) {
      return (
         <div className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 min-h-screen">
            <div className="z-10 relative mx-auto p-6 max-w-7xl">
               <div className="py-12 text-center">
                  <h2 className="mb-2 font-semibold text-gray-900 text-xl">Máquina no encontrada</h2>
                  <Link href={`/admin/equipments/${clinicId}`} className="text-brand-600 hover:text-brand-700">
                     Volver a la lista de equipos
                  </Link>
               </div>
            </div>
         </div>
      );
   }

   const isActive = machine.status === 'active';

   return (
      <div className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 min-h-screen">
         <FloatingGeometry />

         <div className="z-10 relative mx-auto p-6 max-w-7xl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
               <Link
                  href={`/admin/equipments/${clinicId}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-brand-600 transition-colors"
               >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Volver</span>
               </Link>
            </div>

            <div className="flex justify-between items-start mb-8">
               <div>
                  <h1 className="mb-2 font-bold text-gray-900 text-3xl">{machine.name}</h1>
                  <p className="text-gray-600">{machine.model} • {machine.serialNumber}</p>
                  <p className="text-gray-500 text-sm">{clinic.name} • {machine.location.room} - {machine.location.position}</p>
               </div>
               <div className="flex items-center gap-4">
                  <StatusIndicator status={machine.status} size="large" />
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                     <Wifi className="w-4 h-4" />
                     <span>Tiempo real</span>
                  </div>
               </div>
            </div>

            {/* Real-time Parameters Grid */}
            {isActive && (
               <div className="mb-8">
                  <h2 className="mb-4 font-semibold text-gray-900 text-xl">Parámetros en Tiempo Real</h2>
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                     <ParameterCard
                        icon={Droplets}
                        label="Flujo Sanguíneo"
                        value={Math.round(machine.parameters.bloodFlowRate)}
                        unit="mL/min"
                        status={machine.parameters.bloodFlowRate < 280 ? 'warning' : 'normal'}
                     />
                     <ParameterCard
                        icon={Zap}
                        label="Flujo Dializado"
                        value={Math.round(machine.parameters.dialysateFlowRate)}
                        unit="mL/min"
                        status="normal"
                     />
                     <ParameterCard
                        icon={Thermometer}
                        label="Temperatura"
                        value={Number(machine.parameters.temperature.toFixed(1))}
                        unit="°C"
                        status={machine.parameters.temperature > 37.2 ? 'warning' : 'normal'}
                     />
                     <ParameterCard
                        icon={Gauge}
                        label="Presión Arterial"
                        value={Math.round(machine.parameters.pressure.arterial)}
                        unit="mmHg"
                        status={machine.parameters.pressure.arterial < -190 ? 'warning' : 'normal'}
                     />
                     <ParameterCard
                        icon={Activity}
                        label="Presión Venosa"
                        value={Math.round(machine.parameters.pressure.venous)}
                        unit="mmHg"
                        status="normal"
                     />
                     <ParameterCard
                        icon={Shield}
                        label="Conductividad"
                        value={Number(machine.parameters.conductivity.toFixed(1))}
                        unit="mS/cm"
                        status="normal"
                     />
                     <ParameterCard
                        icon={Droplets}
                        label="Ultrafiltración"
                        value={Math.round(machine.parameters.ultrafiltrationRate)}
                        unit="mL/hr"
                        status="normal"
                     />
                     <ParameterCard
                        icon={TrendingUp}
                        label="Eficiencia"
                        value={Number(machine.performance.efficiency.toFixed(1))}
                        unit="%"
                        status="normal"
                     />
                  </div>
               </div>
            )}

            {/* Main Content Grid */}
            <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
               {/* Patient Information */}
               <PatientInfoPanel machine={machine} realTimeData={realTimeData} />

               {/* Alarms */}
               <AlarmsPanel machine={machine} />

               {/* Maintenance Information */}
               <div className="lg:col-span-2">
                  <MaintenancePanel machine={machine} />
               </div>
            </div>
         </div>
      </div>
   );
}
