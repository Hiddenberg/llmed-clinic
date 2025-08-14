"use client"

import {
   ArrowLeft, Activity, AlertTriangle, Settings, User, Clock,
   Thermometer, Gauge, Droplets, Heart, Eye, Filter
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
   mockClinics, mockEquipmentData, mockRealTimeData, type Clinic, type DialysisMachine, type RealTimeData
} from '@/data/mockData/equipmentData';

interface ClinicEquipmentPageProps {
   clinicId: string;
}

// Floating geometric shapes for background decoration
function FloatingGeometry () {
   return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="-top-24 -right-24 absolute bg-gradient-to-br from-brand-500/8 to-blue-500/4 rounded-full w-96 h-96 animate-pulse"
            style={{
               animationDuration: '6s'
            }}
         />
         <div className="top-1/2 -left-32 absolute bg-gradient-to-br from-green-400/6 to-brand-400/4 rounded-full w-64 h-64 animate-float"
            style={{
               animationDuration: '8s'
            }}
         />
      </div>
   );
}

// Status indicator component
function StatusIndicator ({ status }: { status: DialysisMachine['status'] }) {
   const getStatusConfig = (status: DialysisMachine['status']) => {
      switch (status) {
         case 'active':
            return {
               color: 'bg-green-500',
               label: 'Activo',
               textColor: 'text-green-700'
            };
         case 'standby':
            return {
               color: 'bg-blue-500',
               label: 'En espera',
               textColor: 'text-blue-700'
            };
         case 'maintenance':
            return {
               color: 'bg-yellow-500',
               label: 'Mantenimiento',
               textColor: 'text-yellow-700'
            };
         case 'offline':
            return {
               color: 'bg-red-500',
               label: 'Fuera de línea',
               textColor: 'text-red-700'
            };
         case 'emergency':
            return {
               color: 'bg-red-600 animate-pulse',
               label: 'Emergencia',
               textColor: 'text-red-800'
            };
         default:
            return {
               color: 'bg-gray-500',
               label: 'Desconocido',
               textColor: 'text-gray-700'
            };
      }
   };

   const config = getStatusConfig(status);

   return (
      <div className="flex items-center gap-2">
         <div className={`w-3 h-3 rounded-full ${config.color}`} />
         <span className={`text-sm font-medium ${config.textColor}`}>{config.label}</span>
      </div>
   );
}

// Machine card component
function MachineCard ({
   machine, realTimeData
}: { machine: DialysisMachine; realTimeData?: RealTimeData }) {
   const isActive = machine.status === 'active';

   return (
      <Link href={`/admin/equipments/${machine.clinicId}/${machine.id}`} className="block">
         <div className="group bg-white/95 hover:bg-white shadow-sm hover:shadow-md backdrop-blur-sm p-6 border border-white/50 rounded-2xl transition-all duration-200 cursor-pointer">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 text-lg transition-colors">
                     {machine.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{machine.model}</p>
                  <p className="text-gray-400 text-xs">{machine.location.room} - {machine.location.position}</p>
               </div>
               <StatusIndicator status={machine.status} />
            </div>

            {/* Current Patient (if active) */}
            {isActive && machine.currentPatient && (
               <div className="bg-blue-50 mb-4 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                     <User className="w-4 h-4 text-blue-600" />
                     <span className="font-medium text-blue-900 text-sm">{machine.currentPatient.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-blue-700 text-xs">
                     <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Progreso: {Math.round(machine.currentPatient.progress)}%</span>
                     </div>
                     {realTimeData && (
                        <div className="flex items-center gap-1">
                           <Heart className="w-3 h-3" />
                           <span>{Math.round(realTimeData.estimatedTimeRemaining)} min restantes</span>
                        </div>
                     )}
                  </div>
                  {realTimeData && (
                     <div className="bg-blue-200 mt-2 rounded-full h-1.5">
                        <div
                           className="bg-blue-600 rounded-full h-1.5 transition-all duration-500"
                           style={{
                              width: `${realTimeData.treatmentProgress}%`
                           }}
                        />
                     </div>
                  )}
               </div>
            )}

            {/* Key Parameters */}
            <div className="gap-4 grid grid-cols-2 mb-4">
               <div className="space-y-2">
                  <div className="flex items-center gap-2">
                     <Droplets className="w-4 h-4 text-blue-500" />
                     <span className="text-gray-600 text-xs">Flujo Sanguíneo</span>
                  </div>
                  <p className="font-semibold text-gray-900">
                     {isActive ? `${Math.round(machine.parameters.bloodFlowRate)} mL/min` : '-- mL/min'}
                  </p>
               </div>
               <div className="space-y-2">
                  <div className="flex items-center gap-2">
                     <Thermometer className="w-4 h-4 text-orange-500" />
                     <span className="text-gray-600 text-xs">Temperatura</span>
                  </div>
                  <p className="font-semibold text-gray-900">
                     {isActive ? `${machine.parameters.temperature.toFixed(1)}°C` : '-- °C'}
                  </p>
               </div>
               <div className="space-y-2">
                  <div className="flex items-center gap-2">
                     <Gauge className="w-4 h-4 text-purple-500" />
                     <span className="text-gray-600 text-xs">Presión Arterial</span>
                  </div>
                  <p className="font-semibold text-gray-900">
                     {isActive ? `${Math.round(machine.parameters.pressure.arterial)} mmHg` : '-- mmHg'}
                  </p>
               </div>
               <div className="space-y-2">
                  <div className="flex items-center gap-2">
                     <Activity className="w-4 h-4 text-green-500" />
                     <span className="text-gray-600 text-xs">Eficiencia</span>
                  </div>
                  <p className="font-semibold text-gray-900">{machine.performance.efficiency.toFixed(1)}%</p>
               </div>
            </div>

            {/* Alarms */}
            {machine.alarms.active.length > 0 && (
               <div className="bg-yellow-50 mb-4 p-3 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                     <AlertTriangle className="w-4 h-4 text-yellow-600" />
                     <span className="font-medium text-yellow-800 text-sm">
                        {machine.alarms.active.length} Alarma(s) Activa(s)
                     </span>
                  </div>
                  <p className="text-yellow-700 text-xs">
                     {machine.alarms.active[0].title}
                  </p>
               </div>
            )}

            {/* Footer Stats */}
            <div className="flex justify-between items-center pt-4 border-gray-100 border-t">
               <div className="flex items-center gap-4 text-gray-500 text-xs">
                  <span>Utilización: {machine.performance.utilizationRate.toFixed(1)}%</span>
                  <span>Sesiones hoy: {machine.performance.sessionsToday}</span>
               </div>
               <Eye className="w-4 h-4 text-gray-400 group-hover:text-brand-500 transition-colors" />
            </div>
         </div>
      </Link>
   );
}

// Filter component
function MachineFilters ({
   selectedStatus,
   onStatusChange
}: {
   selectedStatus: string;
   onStatusChange: (status: string) => void;
}) {
   const statusOptions = [
      {
         value: 'all',
         label: 'Todas las máquinas',
         count: 0
      },
      {
         value: 'active',
         label: 'Activas',
         count: 0
      },
      {
         value: 'standby',
         label: 'En espera',
         count: 0
      },
      {
         value: 'maintenance',
         label: 'Mantenimiento',
         count: 0
      },
      {
         value: 'offline',
         label: 'Fuera de línea',
         count: 0
      }
   ];

   return (
      <div className="bg-white/95 shadow-sm backdrop-blur-sm mb-6 p-4 border border-white/50 rounded-xl">
         <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-700 text-sm">Filtrar por estado</span>
         </div>
         <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
               <button
                  key={option.value}
                  onClick={() => onStatusChange(option.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                     selectedStatus === option.value
                        ? 'bg-brand-100 text-brand-700 border border-brand-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
               >
                  {option.label}
               </button>
            ))}
         </div>
      </div>
   );
}

export default function ClinicEquipmentPage ({ clinicId }: ClinicEquipmentPageProps) {
   const [machines, setMachines] = useState<DialysisMachine[]>([]);
   const [realTimeData, setRealTimeData] = useState<RealTimeData[]>([]);
   const [selectedStatus, setSelectedStatus] = useState('all');
   const [clinic, setClinic] = useState<Clinic | null>(null);

   useEffect(() => {
      // Find the clinic
      const foundClinic = mockClinics.find(c => c.id === clinicId);
      setClinic(foundClinic || null);

      // Get machines for this clinic
      const clinicMachines = mockEquipmentData.filter(m => m.clinicId === clinicId);
      setMachines(clinicMachines);
      setRealTimeData(mockRealTimeData);

      // Simulate real-time updates
      const interval = setInterval(() => {
         setMachines(prev => prev.map(machine => ({
            ...machine,
            parameters: machine.status === 'active' ? {
               ...machine.parameters,
               bloodFlowRate: Math.max(250, Math.min(350, machine.parameters.bloodFlowRate + (Math.random() - 0.5) * 10)),
               temperature: Math.max(36.5, Math.min(37.5, machine.parameters.temperature + (Math.random() - 0.5) * 0.2)),
               pressure: {
                  ...machine.parameters.pressure,
                  arterial: Math.max(-200, Math.min(-150, machine.parameters.pressure.arterial + (Math.random() - 0.5) * 10))
               }
            } : machine.parameters,
            currentPatient: machine.currentPatient ? {
               ...machine.currentPatient,
               progress: Math.min(100, machine.currentPatient.progress + Math.random() * 2)
            } : machine.currentPatient
         })));

         setRealTimeData(prev => prev.map(data => ({
            ...data,
            treatmentProgress: Math.min(100, data.treatmentProgress + Math.random() * 2),
            estimatedTimeRemaining: Math.max(0, data.estimatedTimeRemaining - Math.random() * 3),
            vitals: {
               ...data.vitals,
               heartRate: Math.max(60, Math.min(100, data.vitals.heartRate + (Math.random() - 0.5) * 4)),
               bloodPressure: {
                  systolic: Math.max(120, Math.min(160, data.vitals.bloodPressure.systolic + (Math.random() - 0.5) * 6)),
                  diastolic: Math.max(70, Math.min(100, data.vitals.bloodPressure.diastolic + (Math.random() - 0.5) * 4))
               }
            },
            fluidBalance: {
               ...data.fluidBalance,
               removed: Math.min(data.fluidBalance.target, data.fluidBalance.removed + Math.random() * 50)
            }
         })));
      }, 5000); // Update every 5 seconds

      return () => clearInterval(interval);
   }, [clinicId]);

   const filteredMachines = selectedStatus === 'all'
      ? machines
      : machines.filter(machine => machine.status === selectedStatus);

   if (!clinic) {
      return (
         <div className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 min-h-screen">
            <div className="z-10 relative mx-auto p-6 max-w-7xl">
               <div className="py-12 text-center">
                  <h2 className="mb-2 font-semibold text-gray-900 text-xl">Clínica no encontrada</h2>
                  <Link href="/admin/equipments" className="text-brand-600 hover:text-brand-700">
                     Volver a la lista de clínicas
                  </Link>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 min-h-screen">
         <FloatingGeometry />

         <div className="z-10 relative mx-auto p-6 max-w-7xl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
               <Link
                  href="/admin/equipments"
                  className="flex items-center gap-2 text-gray-600 hover:text-brand-600 transition-colors"
               >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Volver</span>
               </Link>
            </div>

            <div className="mb-8">
               <h1 className="mb-2 font-bold text-gray-900 text-3xl">{clinic.name}</h1>
               <p className="text-gray-600">{clinic.location}</p>
               <div className="flex items-center gap-6 mt-4 text-gray-500 text-sm">
                  <span>{clinic.totalMachines} máquinas totales</span>
                  <span>{clinic.activeMachines} activas</span>
                  <span>{clinic.activePatients} pacientes en tratamiento</span>
                  <span>Utilización: {clinic.utilizationRate}%</span>
               </div>
            </div>

            <MachineFilters
               selectedStatus={selectedStatus}
               onStatusChange={setSelectedStatus}
            />

            {/* Machines Grid */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
               {filteredMachines.map((machine) => {
                  const machineRealTimeData = realTimeData.find(data => data.machineId === machine.id);
                  return (
                     <MachineCard
                        key={machine.id}
                        machine={machine}
                        realTimeData={machineRealTimeData}
                     />
                  );
               })}
            </div>

            {filteredMachines.length === 0 && (
               <div className="py-12 text-center">
                  <Settings className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                  <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                     No hay máquinas {selectedStatus !== 'all' ? `en estado "${selectedStatus}"` : ''}
                  </h3>
                  <p className="text-gray-500">
                     {selectedStatus !== 'all'
                        ? 'Prueba seleccionando un filtro diferente'
                        : 'No se encontraron máquinas en esta clínica'}
                  </p>
               </div>
            )}
         </div>
      </div>
   );
}
