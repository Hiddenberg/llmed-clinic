"use client"

import {
   BarChart3, Users, Calendar, TrendingUp, Heart, Shield, Activity,
   DollarSign, Clock, AlertTriangle, CheckCircle, Settings,
   LucideIcon
} from 'lucide-react';
import { useState } from 'react';
import PatientAttendanceChart from './PatientAttendanceChart';
import StaffAttendanceChart from './StaffAttendanceChart';
import TreatmentEfficiencyChart from './TreatmentEfficiencyChart';
import MonthlyOverviewChart from './MonthlyOverviewChart';
import PatientDemographicsChart from './PatientDemographicsChart';
import EquipmentUtilizationChart from './EquipmentUtilizationChart';
import TreatmentOutcomesChart from './TreatmentOutcomesChart';
import KPICards from './KPICards';

// Floating geometric shapes for background decoration
function FloatingGeometry () {
   return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {/* Simplified gradient orbs */}
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

         {/* Geometric lines */}
         <div className="top-20 left-1/4 absolute bg-gradient-to-b from-brand-300/25 to-transparent w-px h-32" />
         <div className="top-32 right-1/3 absolute bg-gradient-to-r from-blue-300/25 to-transparent w-24 h-px" />

         {/* Small floating dots */}
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
function ReportsHeader ({
   selectedPeriod, setSelectedPeriod
}: {
   selectedPeriod: TimePeriod;
   setSelectedPeriod: (period: TimePeriod) => void;
}) {
   const currentDate = new Date()
      .toLocaleDateString('es-ES', {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric'
      });

   return (
      <div className="relative mb-8">
         <FloatingGeometry />

         <div className="relative bg-white/95 shadow-lg p-6 border border-gray-200/50 rounded-2xl">
            <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4">
               <div className="flex items-center gap-4">
                  <div className="relative">
                     <div className="relative flex justify-center items-center bg-gradient-to-r from-brand-500 to-blue-500 shadow-lg rounded-xl w-16 h-16 text-white">
                        <BarChart3 size={28} className="drop-shadow-sm" />
                     </div>
                  </div>

                  <div>
                     <div className="flex items-center gap-3 mb-1">
                        <h1 className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 font-bold text-transparent text-3xl">
                           Reportes y Estadísticas
                        </h1>
                        <div className="flex items-center gap-1">
                           <div className="bg-green-400 rounded-full w-2 h-2 animate-pulse" />
                           <TrendingUp size={14} className="text-green-500 animate-pulse" />
                        </div>
                     </div>
                     <p className="flex items-center gap-2 text-gray-600 text-sm">
                        <span className="font-medium text-brand-600">Dashboard Administrativo</span>
                        <span className="text-gray-400">•</span>
                        <span className="capitalize">{currentDate}</span>
                     </p>
                  </div>
               </div>

               {/* Time period selector */}
               <div className="flex items-center gap-3">
                  <select
                     value={selectedPeriod}
                     onChange={(e) => setSelectedPeriod(e.target.value as TimePeriod)}
                     className="px-3 py-2 border border-gray-200 focus:border-brand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-100 text-sm"
                  >
                     <option value="week">Última semana</option>
                     <option value="month">Último mes</option>
                     <option value="quarter">Últimos 3 meses</option>
                     <option value="year">Último año</option>
                  </select>
               </div>
            </div>
         </div>
      </div>
   );
}

// Section header component
function SectionHeader ({
   icon: Icon, title, subtitle, gradient
}: {
   icon: LucideIcon;
   title: string;
   subtitle?: string;
   gradient: string;
}) {
   return (
      <div className="flex items-center gap-3 mb-6">
         <div className={`flex items-center justify-center bg-gradient-to-r ${gradient} rounded-lg w-8 h-8 text-white`}>
            <Icon size={16} />
         </div>
         <div>
            <h2 className="font-semibold text-gray-800 text-lg">{title}</h2>
            {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
         </div>
         <div className="flex-1 bg-gradient-to-r from-gray-300/30 to-transparent ml-4 h-px" />
      </div>
   );
}

type TimePeriod = 'week' | 'month' | 'quarter' | 'year';

export default function AdminReportsPage () {
   const [activeTab, setActiveTab] = useState<'overview' | 'detailed'>('overview');
   const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('week');

   return (
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-brand-50/30 min-h-screen">
         {/* Background decoration */}
         <div className="fixed inset-0 pointer-events-none">
            <div className="top-0 right-0 absolute bg-gradient-to-bl from-brand-100/20 to-transparent w-1/3 h-1/3" />
            <div className="bottom-0 left-0 absolute bg-gradient-to-tr from-blue-100/15 to-transparent w-1/2 h-1/2" />
         </div>

         <div className="relative mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 max-w-7xl">
            {/* Header */}
            <ReportsHeader selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />

            {/* Tab Navigation */}
            <div className="bg-white/90 shadow-sm backdrop-blur-sm mb-8 p-1 border border-gray-200/50 rounded-xl">
               <div className="flex">
                  <button
                     onClick={() => setActiveTab('overview')}
                     className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                        activeTab === 'overview'
                           ? 'bg-gradient-to-r from-brand-500 to-blue-500 text-white shadow-md'
                           : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                     }`}
                  >
                     <BarChart3 size={16} />
                     Vista General
                  </button>
                  <button
                     onClick={() => setActiveTab('detailed')}
                     className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                        activeTab === 'detailed'
                           ? 'bg-gradient-to-r from-brand-500 to-blue-500 text-white shadow-md'
                           : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                     }`}
                  >
                     <Settings size={16} />
                     Análisis Detallado
                  </button>
               </div>
            </div>

            {activeTab === 'overview' ? (
               <div className="space-y-8">
                  {/* KPI Cards */}
                  <section>
                     <SectionHeader
                        icon={TrendingUp}
                        title="Indicadores Clave de Rendimiento"
                        subtitle="Métricas principales de la clínica"
                        gradient="from-brand-500 to-blue-500"
                     />
                     <KPICards selectedPeriod={selectedPeriod} />
                  </section>

                  {/* Patient and Staff Charts */}
                  <section>
                     <SectionHeader
                        icon={Users}
                        title="Asistencia y Personal"
                        subtitle="Estadísticas de pacientes y staff"
                        gradient="from-green-500 to-emerald-500"
                     />
                     <div className="gap-6 grid grid-cols-1 xl:grid-cols-2">
                        <PatientAttendanceChart selectedPeriod={selectedPeriod} />
                        <StaffAttendanceChart selectedPeriod={selectedPeriod} />
                     </div>
                  </section>

                  {/* Treatment Efficiency */}
                  <section>
                     <SectionHeader
                        icon={Activity}
                        title="Eficiencia de Tratamientos"
                        subtitle="Métricas de calidad y rendimiento"
                        gradient="from-purple-500 to-pink-500"
                     />
                     <TreatmentEfficiencyChart selectedPeriod={selectedPeriod} />
                  </section>

                  {/* Monthly Overview */}
                  <section>
                     <SectionHeader
                        icon={Calendar}
                        title="Resumen Mensual"
                        subtitle="Tendencias de los últimos 6 meses"
                        gradient="from-orange-500 to-amber-500"
                     />
                     <MonthlyOverviewChart selectedPeriod={selectedPeriod} />
                  </section>
               </div>
            ) : (
               <div className="space-y-8">
                  {/* Equipment Utilization */}
                  <section>
                     <SectionHeader
                        icon={Settings}
                        title="Utilización de Equipos"
                        subtitle="Estado y rendimiento de los equipos médicos"
                        gradient="from-indigo-500 to-purple-500"
                     />
                     <EquipmentUtilizationChart selectedPeriod={selectedPeriod} />
                  </section>

                  {/* Patient Demographics and Outcomes */}
                  <section>
                     <SectionHeader
                        icon={Heart}
                        title="Análisis de Pacientes"
                        subtitle="Demografía y resultados de tratamiento"
                        gradient="from-red-500 to-pink-500"
                     />
                     <div className="gap-6 grid grid-cols-1 xl:grid-cols-2">
                        <PatientDemographicsChart selectedPeriod={selectedPeriod} />
                        <TreatmentOutcomesChart selectedPeriod={selectedPeriod} />
                     </div>
                  </section>
               </div>
            )}

            {/* Footer */}
            <div className="from-transparent via-brand-200/30 to-transparent mt-16 pt-8 border-gradient-to-r border-t text-center">
               <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 to-blue-500/5 blur-xl rounded-lg" />
                  <div className="relative">
                     <p className="font-medium text-gray-600 text-sm">
                        LLMed Clinic - Sistema de Reportes Administrativos
                     </p>
                     <p className="flex justify-center items-center gap-1 mt-1 text-gray-400 text-xs">
                        Actualizado en tiempo real <Shield size={10} className="text-brand-400" />
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
