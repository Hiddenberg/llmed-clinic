"use client"

import {
   Building2, Activity, AlertTriangle, Settings, TrendingUp, Users,
   ChevronRight, Wifi, WifiOff
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockClinics, type Clinic } from '@/data/mockData/equipmentData';

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
         <div className="top-20 left-1/4 absolute bg-gradient-to-b from-brand-300/25 to-transparent w-px h-32" />
         <div className="top-32 right-1/3 absolute bg-gradient-to-r from-blue-300/25 to-transparent w-24 h-px" />
         <div className="top-16 left-1/3 absolute bg-brand-400 rounded-full w-2 h-2 animate-pulse" />
         <div className="right-1/4 bottom-20 absolute bg-blue-400 rounded-full w-1.5 h-1.5 animate-pulse"
            style={{
               animationDelay: '1s'
            }}
         />
      </div>
   );
}

// Header component
function EquipmentHeader () {
   const currentTime = new Date()
      .toLocaleDateString('es-MX', {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric'
      });

   return (
      <div className="mb-8">
         <div className="flex justify-between items-center mb-2">
            <h1 className="font-bold text-gray-900 text-3xl">Gestión de Equipos</h1>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
               <Wifi className="w-4 h-4" />
               <span>Conectado en tiempo real</span>
            </div>
         </div>
         <p className="text-gray-600">{currentTime}</p>
         <p className="mt-1 text-gray-500 text-sm">
            Monitoreo y gestión de equipos de hemodiálisis en todas las clínicas
         </p>
      </div>
   );
}

// Status badge component
function StatusBadge ({
   status, count
}: { status: string; count: number }) {
   const getStatusColor = (status: string) => {
      switch (status) {
         case 'active': return 'bg-green-100 text-green-800';
         case 'maintenance': return 'bg-yellow-100 text-yellow-800';
         case 'offline': return 'bg-red-100 text-red-800';
         default: return 'bg-gray-100 text-gray-800';
      }
   };

   const getStatusLabel = (status: string) => {
      switch (status) {
         case 'active': return 'Activos';
         case 'maintenance': return 'Mantenimiento';
         case 'offline': return 'Fuera de línea';
         default: return status;
      }
   };

   return (
      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
         {count} {getStatusLabel(status)}
      </div>
   );
}

// Clinic card component
function ClinicCard ({ clinic }: { clinic: Clinic }) {
   const utilizationColor = clinic.utilizationRate >= 85 ? 'text-green-600' :
      clinic.utilizationRate >= 70 ? 'text-yellow-600' : 'text-red-600';

   const utilizationBg = clinic.utilizationRate >= 85 ? 'bg-green-50' :
      clinic.utilizationRate >= 70 ? 'bg-yellow-50' : 'bg-red-50';

   return (
      <Link href={`/admin/equipments/${clinic.id}`} className="block">
         <div className="group bg-white/95 hover:bg-white shadow-sm hover:shadow-md backdrop-blur-sm p-6 border border-white/50 rounded-2xl transition-all duration-200 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-3">
                  <div className="bg-brand-100 p-3 rounded-xl">
                     <Building2 className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                     <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 text-lg transition-colors">
                        {clinic.name}
                     </h3>
                     <p className="text-gray-500 text-sm">{clinic.location}</p>
                  </div>
               </div>
               <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-brand-500 transition-colors" />
            </div>

            {/* Status Overview */}
            <div className="gap-4 grid grid-cols-2 mb-4">
               <div className="space-y-2">
                  <div className="flex justify-between items-center">
                     <span className="text-gray-600 text-sm">Máquinas totales</span>
                     <span className="font-semibold text-gray-900">{clinic.totalMachines}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-gray-600 text-sm">Pacientes activos</span>
                     <span className="font-semibold text-gray-900">{clinic.activePatients}</span>
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between items-center">
                     <span className="text-gray-600 text-sm">Utilización</span>
                     <span className={`font-semibold ${utilizationColor}`}>
                        {clinic.utilizationRate.toFixed(1)}%
                     </span>
                  </div>
                  <div className={`${utilizationBg} px-2 py-1 rounded-full`}>
                     <div className="bg-current rounded-full h-1.5"
                        style={{
                           width: `${Math.round(clinic.utilizationRate)}%`,
                           opacity: 0.3
                        }}
                     />
                  </div>
               </div>
            </div>

            {/* Machine Status */}
            <div className="flex flex-wrap gap-2">
               <StatusBadge status="active" count={clinic.activeMachines} />
               <StatusBadge status="maintenance" count={clinic.maintenanceMachines} />
               <StatusBadge status="offline" count={clinic.offlineMachines} />
            </div>

            {/* Last Updated */}
            <div className="flex justify-between items-center mt-4 pt-4 border-gray-100 border-t">
               <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <Activity className="w-3 h-3" />
                  <span>Actualizado hace {Math.floor((Date.now() - new Date(clinic.lastUpdated)
                     .getTime()) / 60000)} min</span>
               </div>
               <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <Users className="w-3 h-3" />
                  <span>{clinic.totalPatients} pacientes</span>
               </div>
            </div>
         </div>
      </Link>
   );
}

// Summary stats component
function SummaryStats ({ clinics }: { clinics: Clinic[] }) {
   const totalMachines = clinics.reduce((sum, clinic) => sum + clinic.totalMachines, 0);
   const totalActive = clinics.reduce((sum, clinic) => sum + clinic.activeMachines, 0);
   const totalMaintenance = clinics.reduce((sum, clinic) => sum + clinic.maintenanceMachines, 0);
   const totalOffline = clinics.reduce((sum, clinic) => sum + clinic.offlineMachines, 0);
   const avgUtilization = Math.round(clinics.reduce((sum, clinic) => sum + clinic.utilizationRate, 0) / clinics.length * 10) / 10;

   const stats = [
      {
         label: 'Total de Máquinas',
         value: totalMachines,
         icon: Settings,
         color: 'text-gray-600',
         bg: 'bg-gray-50'
      },
      {
         label: 'Máquinas Activas',
         value: totalActive,
         icon: Activity,
         color: 'text-green-600',
         bg: 'bg-green-50'
      },
      {
         label: 'En Mantenimiento',
         value: totalMaintenance,
         icon: AlertTriangle,
         color: 'text-yellow-600',
         bg: 'bg-yellow-50'
      },
      {
         label: 'Fuera de Línea',
         value: totalOffline,
         icon: WifiOff,
         color: 'text-red-600',
         bg: 'bg-red-50'
      },
      {
         label: 'Utilización Promedio',
         value: `${avgUtilization.toFixed(1)}%`,
         icon: TrendingUp,
         color: 'text-brand-600',
         bg: 'bg-brand-50'
      }
   ];

   return (
      <div className="gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 mb-8">
         {stats.map((stat, index) => (
            <div key={index} className="bg-white/95 shadow-sm backdrop-blur-sm p-4 border border-white/50 rounded-xl">
               <div className="flex items-center gap-3">
                  <div className={`${stat.bg} p-2 rounded-lg`}>
                     <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                     <p className="font-semibold text-gray-900 text-lg">{stat.value}</p>
                     <p className="text-gray-500 text-xs">{stat.label}</p>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}

export default function EquipmentClinicsPage () {
   const [clinics, setClinics] = useState<Clinic[]>([]);

   useEffect(() => {
      // Simulate real-time updates
      setClinics(mockClinics);

      const interval = setInterval(() => {
         setClinics(prev => prev.map(clinic => ({
            ...clinic,
            utilizationRate: Math.max(60, Math.min(95, clinic.utilizationRate + (Math.random() - 0.5) * 2)),
            lastUpdated: new Date()
               .toISOString()
         })));
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
   }, []);

   return (
      <div className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 min-h-screen">
         <FloatingGeometry />

         <div className="z-10 relative mx-auto p-6 max-w-7xl">
            <EquipmentHeader />
            <SummaryStats clinics={clinics} />

            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
               {clinics.map((clinic) => (
                  <ClinicCard key={clinic.id} clinic={clinic} />
               ))}
            </div>
         </div>
      </div>
   );
}
