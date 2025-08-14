"use client"

import {
   Activity, Heart, Droplets, Clock, AlertTriangle,
   CheckCircle, Thermometer, Gauge, Monitor, Users
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
   mockEquipmentData, mockRealTimeData, DialysisMachine, RealTimeData
} from '@/data/mockData/equipmentData';
import PatientMonitorCard from './PatientMonitorCard';
import OverallStatsCard from './OverallStatsCard';
import AlertsPanel from './AlertsPanel';

// Floating geometric shapes for background decoration
function FloatingGeometry () {
   return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {/* Simplified gradient orbs */}
         <div className="-top-24 -right-24 absolute bg-gradient-to-br from-green-600/8 to-blue-500/4 rounded-full w-96 h-96 animate-pulse"
            style={{
               animationDuration: '4s'
            }}
         />
         <div className="top-1/2 -left-32 absolute bg-gradient-to-br from-blue-400/6 to-green-400/4 rounded-full w-64 h-64 animate-float"
            style={{
               animationDuration: '8s'
            }}
         />

         {/* Geometric lines */}
         <div className="top-20 left-1/4 absolute bg-gradient-to-b from-green-600/25 to-transparent w-px h-32" />
         <div className="top-32 right-1/3 absolute bg-gradient-to-r from-blue-300/25 to-transparent w-24 h-px" />

         {/* Small floating dots */}
         <div className="top-16 left-1/3 absolute bg-green-600 rounded-full w-2 h-2 animate-pulse" />
         <div className="right-1/4 bottom-20 absolute bg-blue-400 rounded-full w-1.5 h-1.5 animate-pulse"
            style={{
               animationDelay: '1s'
            }}
         />
      </div>
   );
}

function Header () {
   const currentTime = new Date()
      .toLocaleDateString('es-MX', {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric'
      });

   const activeMachines = mockEquipmentData.filter(machine => machine.status === 'active');
   const activePatients = activeMachines.filter(machine => machine.currentPatient).length;

   return (
      <div className="relative mb-8">
         <FloatingGeometry />

         {/* Header with monitoring info */}
         <div className="relative bg-white/95 shadow-lg p-6 border border-gray-200/50 rounded-2xl">
            <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mb-6">
               <div className="flex items-center gap-4">
                  {/* Monitor icon */}
                  <div className="relative">
                     <div className="relative flex justify-center items-center bg-gradient-to-r from-green-600 to-blue-500 shadow-lg rounded-xl w-16 h-16 text-white">
                        <Monitor size={28} className="drop-shadow-sm" />
                     </div>
                     <div className="top-0 right-0 absolute bg-green-400 rounded-full w-4 h-4 animate-pulse border-2 border-white" />
                  </div>

                  <div>
                     <div className="flex items-center gap-3 mb-1">
                        <h1 className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 font-bold text-transparent text-3xl">
                           Monitoreo en Tiempo Real
                        </h1>
                        <div className="flex items-center gap-1">
                           <div className="bg-green-400 rounded-full w-2 h-2 animate-pulse" />
                           <Activity size={14} className="text-green-500 animate-pulse" />
                        </div>
                     </div>
                     <div className="flex items-center gap-4 text-gray-600 text-sm">
                        <span className="flex items-center gap-1">
                           <Users size={14} />
                           {activePatients} pacientes en sesión
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                           <Monitor size={14} />
                           {activeMachines.length} máquinas activas
                        </span>
                        <span>•</span>
                        <span className="capitalize">{currentTime}</span>
                     </div>
                  </div>
               </div>

               {/* Live indicator */}
               <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full text-green-700">
                     <div className="bg-green-400 rounded-full w-2 h-2 animate-pulse" />
                     <span className="font-medium text-sm">EN VIVO</span>
                  </div>
               </div>
            </div>

            {/* Welcome message */}
            <div className="relative">
               <div className="relative bg-gradient-to-r from-green-50 via-white to-blue-50 p-5 border border-green-100/50 rounded-xl">
                  <p className="text-gray-700 leading-relaxed">
                     Sistema de <span className="bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 font-semibold text-transparent">monitoreo continuo</span>
                     para supervisar el estado de todos los pacientes durante sus sesiones de hemodiálisis.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default function MonitoringPage () {
   const [realTimeData, setRealTimeData] = useState<RealTimeData[]>(mockRealTimeData);
   const [lastUpdate, setLastUpdate] = useState(new Date());

   // Simulate real-time data updates
   useEffect(() => {
      const interval = setInterval(() => {
         setRealTimeData(prevData =>
            prevData.map(data => ({
               ...data,
               timestamp: new Date()
                  .toISOString(),
               vitals: {
                  bloodPressure: {
                     systolic: Math.max(100, Math.min(180, data.vitals.bloodPressure.systolic + (Math.random() - 0.5) * 6)),
                     diastolic: Math.max(60, Math.min(110, data.vitals.bloodPressure.diastolic + (Math.random() - 0.5) * 4))
                  },
                  heartRate: Math.max(50, Math.min(120, data.vitals.heartRate + (Math.random() - 0.5) * 4)),
                  temperature: Math.max(35.5, Math.min(38.5, data.vitals.temperature + (Math.random() - 0.5) * 0.2))
               },
               fluidBalance: {
                  ...data.fluidBalance,
                  removed: Math.min(data.fluidBalance.target, data.fluidBalance.removed + Math.random() * 15),
                  rate: Math.max(400, Math.min(1000, data.fluidBalance.rate + (Math.random() - 0.5) * 20))
               },
               treatmentProgress: Math.min(100, data.treatmentProgress + Math.random() * 0.5),
               estimatedTimeRemaining: Math.max(0, data.estimatedTimeRemaining - Math.random() * 2)
            }))
         );
         setLastUpdate(new Date());
      }, 3000); // Update every 3 seconds

      return () => clearInterval(interval);
   }, []);

   // Get active machines with patients
   const activeMachinesWithPatients = mockEquipmentData
      .filter(machine => machine.status === 'active' && machine.currentPatient)
      .map(machine => {
         const rtData = realTimeData.find(data => data.machineId === machine.id);
         return {
            machine,
            realTimeData: rtData
         };
      });

   const totalAlerts = mockEquipmentData.reduce((acc, machine) => acc + machine.alarms.active.length, 0);
   const criticalAlerts = mockEquipmentData.reduce((acc, machine) =>
      acc + machine.alarms.active.filter(alarm => alarm.type === 'critical').length, 0
   );

   return (
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/20 min-h-screen overflow-hidden">
         {/* Background decoration */}
         <div className="fixed inset-0 pointer-events-none">
            <div className="top-0 right-0 absolute bg-gradient-to-bl from-green-100/15 to-transparent w-1/3 h-1/3" />
            <div className="bottom-0 left-0 absolute bg-gradient-to-tr from-blue-100/10 to-transparent w-1/2 h-1/2" />
         </div>

         <div className="relative mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 max-w-7xl">
            {/* Header Section */}
            <Header />

            {/* Overall Stats Section */}
            <section className="mb-8">
               <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="bg-gradient-to-b from-blue-600 to-green-500 rounded-full w-1 h-6" />
                     <h2 className="font-semibold text-gray-800 text-lg">Resumen General</h2>
                     <div className="flex-1 bg-gradient-to-r from-gray-300/30 to-transparent ml-4 h-px" />
                     <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock size={14} />
                        <span>Actualizado: {lastUpdate.toLocaleTimeString('es-MX')}</span>
                     </div>
                  </div>
                  <OverallStatsCard
                     activeSessions={activeMachinesWithPatients.length}
                     totalAlerts={totalAlerts}
                     criticalAlerts={criticalAlerts}
                     averageProgress={Math.round(realTimeData.reduce((acc, data) => acc + data.treatmentProgress, 0) / realTimeData.length)}
                  />
               </div>
            </section>

            {/* Alerts Panel */}
            {totalAlerts > 0 && (
               <section className="mb-8">
                  <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="bg-gradient-to-b from-red-600 to-orange-500 rounded-full w-1 h-6" />
                        <h2 className="font-semibold text-gray-800 text-lg">Alertas Activas</h2>
                        <div className="flex-1 bg-gradient-to-r from-gray-300/30 to-transparent ml-4 h-px" />
                        <div className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full text-red-700 text-sm">
                           <AlertTriangle size={14} />
                           <span className="font-medium">{totalAlerts} alertas</span>
                        </div>
                     </div>
                     <AlertsPanel machines={mockEquipmentData} />
                  </div>
               </section>
            )}

            {/* Patient Monitoring Grid */}
            <section>
               <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-b from-green-600 to-blue-500 rounded-full w-1 h-6" />
                  <h2 className="font-semibold text-gray-800 text-lg">Pacientes en Sesión</h2>
                  <div className="flex-1 bg-gradient-to-r from-gray-300/30 to-transparent ml-4 h-px" />
                  <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full text-green-700 text-sm">
                     <Activity size={14} />
                     <span className="font-medium">{activeMachinesWithPatients.length} pacientes activos</span>
                  </div>
               </div>

               <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                  {activeMachinesWithPatients.map(({
                     machine, realTimeData: rtData
                  }) => (
                     <PatientMonitorCard
                        key={machine.id}
                        machine={machine}
                        realTimeData={rtData}
                     />
                  ))}
               </div>
            </section>

            {/* Footer */}
            <div className="from-transparent via-green-200/20 to-transparent mt-16 pt-8 border-gradient-to-r border-t text-center">
               <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/3 to-blue-500/3 blur-xl rounded-lg" />
                  <div className="relative">
                     <p className="font-medium text-gray-600 text-sm">
                        LLMed Clinic - Sistema de Monitoreo
                     </p>
                     <p className="flex justify-center items-center gap-1 mt-1 text-gray-400 text-xs">
                        Monitoreo en Tiempo Real <Activity size={10} className="text-green-400" />
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
