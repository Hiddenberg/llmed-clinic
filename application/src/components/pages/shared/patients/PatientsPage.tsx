"use client"

import { useState, useMemo } from 'react';
import {
   Users, Search,
   Filter, Heart,
} from 'lucide-react';
import {
   PatientListItem,
   mockPatientsList,
   mockPatientMetrics,
   getPatientsByDoctor
} from '@/data/mockData/patientsListData';
import PatientMetricsCards from './PatientMetricsCards';
import PatientsList from './PatientsList';
import AdminAnalytics from './AdminAnalytics';

interface PatientsPageProps {
   userType: 'admin' | 'doctor';
   doctorId?: string; // Required when userType is 'doctor'
}

// Main header component
function PatientsHeader ({
   userType,
   totalPatients,
   searchTerm,
   onSearchChange
}: {
   userType: 'admin' | 'doctor';
   totalPatients: number;
   searchTerm: string;
   onSearchChange: (value: string) => void;
}) {
   return (
      <div className="relative mb-8">
         {/* Background decoration */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="-top-24 -right-24 absolute bg-gradient-to-br from-brand-500/10 to-blue-500/5 rounded-full w-96 h-96 animate-pulse"
               style={{
                  animationDuration: '4s'
               }}
            />
         </div>

         <div className="relative bg-white/95 shadow-lg p-6 border border-gray-200/50 rounded-2xl">
            <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4">
               <div className="flex items-center gap-4">
                  <div className="relative">
                     <div className="relative flex justify-center items-center bg-gradient-to-r from-brand-500 to-blue-500 shadow-lg rounded-xl w-14 h-14 text-white">
                        <Users size={26} className="drop-shadow-sm" />
                     </div>
                  </div>

                  <div>
                     <div className="flex items-center gap-3 mb-1">
                        <h1 className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 font-bold text-transparent text-3xl">
                           {userType === 'admin' ? 'Gestión de Pacientes' : 'Mis Pacientes'}
                        </h1>
                        <div className="flex items-center gap-1">
                           <div className="bg-green-400 rounded-full w-2 h-2 animate-pulse" />
                           <Heart size={14} className="text-green-500 animate-pulse" />
                        </div>
                     </div>
                     <p className="flex items-center gap-2 text-gray-600 text-sm">
                        <span className="font-medium text-brand-600">
                           {totalPatients} paciente{totalPatients !== 1 ? 's' : ''}
                           {userType === 'doctor' ? ' asignados' : ' registrados'}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="capitalize">
                           {new Date()
                              .toLocaleDateString('es-MX', {
                                 weekday: 'long',
                                 year: 'numeric',
                                 month: 'long',
                                 day: 'numeric'
                              })}
                        </span>
                     </p>
                  </div>
               </div>

               {/* Search bar */}
               <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                     <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                     type="text"
                     placeholder="Buscar pacientes..."
                     value={searchTerm}
                     onChange={(e) => onSearchChange(e.target.value)}
                     className="bg-white/80 shadow-sm backdrop-blur-sm py-2.5 pr-4 pl-10 border border-gray-200/50 focus:border-brand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 w-80 text-gray-700 transition-all placeholder-gray-400"
                  />
               </div>
            </div>
         </div>
      </div>
   );
}

export default function PatientsPage ({
   userType, doctorId
}: PatientsPageProps) {
   const [searchTerm, setSearchTerm] = useState('');
   const [statusFilter, setStatusFilter] = useState<PatientListItem['status'] | 'all'>('all');
   const [riskFilter, setRiskFilter] = useState<PatientListItem['riskLevel'] | 'all'>('all');

   // Get patients based on user type
   const allPatients = useMemo(() => {
      if (userType === 'doctor' && doctorId) {
         return getPatientsByDoctor(doctorId);
      }
      return mockPatientsList;
   }, [userType, doctorId]);

   // Filter patients based on search and filters
   const filteredPatients = useMemo(() => {
      let filtered = allPatients;

      // Search filter
      if (searchTerm) {
         filtered = filtered.filter(patient =>
            patient.name.toLowerCase()
               .includes(searchTerm.toLowerCase()) ||
            patient.email.toLowerCase()
               .includes(searchTerm.toLowerCase()) ||
            patient.assignedDoctor.name.toLowerCase()
               .includes(searchTerm.toLowerCase())
         );
      }

      // Status filter
      if (statusFilter !== 'all') {
         filtered = filtered.filter(patient => patient.status === statusFilter);
      }

      // Risk filter
      if (riskFilter !== 'all') {
         filtered = filtered.filter(patient => patient.riskLevel === riskFilter);
      }

      return filtered;
   }, [allPatients, searchTerm, statusFilter, riskFilter]);

   // Calculate metrics for filtered patients
   const currentMetrics = useMemo(() => {
      const patients = filteredPatients;
      return {
         ...mockPatientMetrics,
         totalPatients: patients.length,
         activePatients: patients.filter(p => p.status === 'active').length,
         scheduledToday: patients.filter(p =>
            p.nextSession && new Date(p.nextSession)
               .toDateString() === new Date()
               .toDateString()
         ).length,
         emergencyCases: patients.filter(p => p.status === 'emergency').length,
         averageAdherence: patients.length > 0 ? Math.round(
            patients.reduce((sum, p) => sum + p.adherence, 0) / patients.length
         ) : 0,
         patientsImproving: patients.filter(p => p.progress >= 80).length,
         patientsAtRisk: patients.filter(p => p.riskLevel === 'high').length,
      };
   }, [filteredPatients]);

   return (
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-brand-50/30 min-h-screen overflow-hidden">
         {/* Background decoration */}
         <div className="fixed inset-0 pointer-events-none">
            <div className="top-0 right-0 absolute bg-gradient-to-bl from-brand-100/20 to-transparent w-1/3 h-1/3" />
            <div className="bottom-0 left-0 absolute bg-gradient-to-tr from-blue-100/15 to-transparent w-1/2 h-1/2" />
         </div>

         <div className="relative mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 max-w-7xl">
            {/* Header */}
            <PatientsHeader
               userType={userType}
               totalPatients={allPatients.length}
               searchTerm={searchTerm}
               onSearchChange={setSearchTerm}
            />

            {/* Metrics Cards */}
            <section className="mb-8">
               <PatientMetricsCards
                  metrics={currentMetrics}
                  userType={userType}
               />
            </section>

            {/* Admin Analytics Section */}
            {userType === 'admin' && (
               <section className="mb-8">
                  <AdminAnalytics />
               </section>
            )}

            {/* Filters Section */}
            <section className="mb-6">
               <div className="bg-white/40 shadow-sm backdrop-blur-sm p-4 border border-white/50 rounded-2xl">
                  <div className="flex sm:flex-row flex-col sm:items-center gap-4">
                     <div className="flex items-center gap-2">
                        <Filter size={18} className="text-gray-600" />
                        <span className="font-medium text-gray-700 text-sm">Filtros:</span>
                     </div>

                     <div className="flex flex-wrap items-center gap-3">
                        {/* Status Filter */}
                        <select
                           value={statusFilter}
                           onChange={(e) => setStatusFilter(e.target.value as PatientListItem['status'])}
                           className="bg-white/80 shadow-sm backdrop-blur-sm px-3 py-2 border border-gray-200/50 focus:border-brand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-gray-700 text-sm transition-all"
                        >
                           <option value="all">Todos los estados</option>
                           <option value="active">Activos</option>
                           <option value="scheduled">Programados</option>
                           <option value="completed">Completados</option>
                           <option value="emergency">Emergencia</option>
                           <option value="inactive">Inactivos</option>
                        </select>

                        {/* Risk Filter */}
                        <select
                           value={riskFilter}
                           onChange={(e) => setRiskFilter(e.target.value as PatientListItem['riskLevel'])}
                           className="bg-white/80 shadow-sm backdrop-blur-sm px-3 py-2 border border-gray-200/50 focus:border-brand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-gray-700 text-sm transition-all"
                        >
                           <option value="all">Todos los riesgos</option>
                           <option value="low">Riesgo bajo</option>
                           <option value="medium">Riesgo medio</option>
                           <option value="high">Riesgo alto</option>
                        </select>

                        {/* Clear filters button */}
                        {(statusFilter !== 'all' || riskFilter !== 'all' || searchTerm) && (
                           <button
                              onClick={() => {
                                 setStatusFilter('all');
                                 setRiskFilter('all');
                                 setSearchTerm('');
                              }}
                              className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-gray-600 text-sm transition-colors"
                           >
                              Limpiar filtros
                           </button>
                        )}
                     </div>

                     <div className="ml-auto text-gray-600 text-sm">
                        {filteredPatients.length} de {allPatients.length} pacientes
                     </div>
                  </div>
               </div>
            </section>

            {/* Patients List */}
            <section>
               <PatientsList
                  patients={filteredPatients}
                  userType={userType}
               />
            </section>
         </div>
      </div>
   );
}
