import {
   Eye, Phone, Calendar, AlertTriangle, TrendingUp,
   Minus, ChevronRight, Activity,
   Heart, User, Clock
} from 'lucide-react';
import { PatientListItem } from '@/data/mockData/patientsListData';

interface PatientsListProps {
   patients: PatientListItem[];
   userType: 'admin' | 'doctor';
}

// Status badge component
function StatusBadge ({ status }: { status: PatientListItem['status'] }) {
   const statusConfig = {
      active: {
         label: 'Activo',
         color: 'bg-green-100 text-green-700 border-green-200',
         dot: 'bg-green-500'
      },
      scheduled: {
         label: 'Programado',
         color: 'bg-blue-100 text-blue-700 border-blue-200',
         dot: 'bg-blue-500'
      },
      completed: {
         label: 'Completado',
         color: 'bg-gray-100 text-gray-700 border-gray-200',
         dot: 'bg-gray-500'
      },
      emergency: {
         label: 'Emergencia',
         color: 'bg-red-100 text-red-700 border-red-200',
         dot: 'bg-red-500'
      },
      inactive: {
         label: 'Inactivo',
         color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
         dot: 'bg-yellow-500'
      }
   };

   const config = statusConfig[status];

   return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>
         <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
         {config.label}
      </span>
   );
}

// Risk level badge component
function RiskBadge ({ riskLevel }: { riskLevel: PatientListItem['riskLevel'] }) {
   const riskConfig = {
      low: {
         label: 'Bajo',
         color: 'bg-green-50 text-green-600 border-green-200',
         icon: <TrendingUp size={12} className="text-green-500" />
      },
      medium: {
         label: 'Medio',
         color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
         icon: <Minus size={12} className="text-yellow-500" />
      },
      high: {
         label: 'Alto',
         color: 'bg-red-50 text-red-600 border-red-200',
         icon: <AlertTriangle size={12} className="text-red-500" />
      }
   };

   const config = riskConfig[riskLevel];

   return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${config.color}`}>
         {config.icon}
         {config.label}
      </span>
   );
}

// Progress bar component
function ProgressBar ({ progress }: { progress: number }) {
   const getProgressColor = (progress: number) => {
      if (progress >= 80) return 'bg-green-500';
      if (progress >= 60) return 'bg-yellow-500';
      return 'bg-red-500';
   };

   return (
      <div className="flex items-center gap-2">
         <div className="bg-gray-200 rounded-full w-16 h-2 overflow-hidden">
            <div
               className={`h-full rounded-full transition-all duration-300 ${getProgressColor(progress)}`}
               style={{
                  width: `${progress}%`
               }}
            />
         </div>
         <span className="min-w-[35px] font-medium text-gray-600 text-xs">
            {progress}%
         </span>
      </div>
   );
}

// Patient row component
function PatientRow ({
   patient, userType
}: { patient: PatientListItem; userType: 'admin' | 'doctor' }) {
   const formatDate = (dateString: string | null) => {
      if (!dateString) return 'N/A';
      return new Date(dateString)
         .toLocaleDateString('es-MX', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
         });
   };

   const handleViewRecord = () => {
      window.location.href = `/${userType}/patients/${patient.id}`;
   };

   const handleCall = () => {
      // TODO: Initiate call
      console.log('Call patient:', patient.phone);
   };

   const handleSchedule = () => {
      // TODO: Open scheduling modal
      console.log('Schedule appointment for:', patient.id);
   };

   return (
      <tr className="group bg-white/60 hover:bg-white/80 border-gray-100 border-b transition-colors">
         {/* Patient Info */}
         <td className="px-6 py-4">
            <div className="flex items-center gap-3">
               <div className="flex justify-center items-center bg-gradient-to-r from-brand-500 to-blue-500 rounded-full w-10 h-10 font-medium text-white text-sm">
                  {patient.name.split(' ')
                     .map(n => n[0])
                     .join('')
                     .substring(0, 2)}
               </div>
               <div>
                  <p className="font-medium text-gray-800">{patient.name}</p>
                  <p className="text-gray-500 text-sm">{patient.age} años • {patient.bloodType}</p>
               </div>
            </div>
         </td>

         {/* Status */}
         <td className="px-6 py-4">
            <StatusBadge status={patient.status} />
         </td>

         {/* Doctor (only for admin) */}
         {userType === 'admin' && (
            <td className="px-6 py-4">
               <div className="text-sm">
                  <p className="font-medium text-gray-800">{patient.assignedDoctor.name}</p>
                  <p className="text-gray-500">{patient.assignedDoctor.specialty}</p>
               </div>
            </td>
         )}

         {/* Next Session */}
         <td className="px-6 py-4">
            <div className="flex items-center gap-2 text-sm">
               <Calendar size={14} className="text-gray-400" />
               <span className={patient.nextSession ? 'text-gray-800' : 'text-gray-500'}>
                  {formatDate(patient.nextSession)}
               </span>
            </div>
         </td>

         {/* Vitals */}
         <td className="px-6 py-4">
            <div className="space-y-1 text-sm">
               <div className="flex items-center gap-1">
                  <Activity size={12} className="text-red-500" />
                  <span className="text-gray-600">{patient.recentVitals.bloodPressure}</span>
               </div>
               <div className="flex items-center gap-1">
                  <Heart size={12} className="text-pink-500" />
                  <span className="text-gray-600">{patient.recentVitals.heartRate} bpm</span>
               </div>
            </div>
         </td>

         {/* Progress */}
         <td className="px-6 py-4">
            <ProgressBar progress={patient.progress} />
         </td>

         {/* Risk */}
         <td className="px-6 py-4">
            <RiskBadge riskLevel={patient.riskLevel} />
         </td>

         {/* Adherence */}
         <td className="px-6 py-4">
            <div className="flex items-center gap-2">
               <span className="font-medium text-gray-800 text-sm">{patient.adherence}%</span>
               <div className="bg-gray-200 rounded-full w-8 h-1.5 overflow-hidden">
                  <div
                     className={`h-full rounded-full ${
                        patient.adherence >= 90 ? 'bg-green-500' :
                           patient.adherence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                     }`}
                     style={{
                        width: `${patient.adherence}%`
                     }}
                  />
               </div>
            </div>
         </td>

         {/* Alerts */}
         <td className="px-6 py-4">
            {patient.alerts > 0 ? (
               <div className="flex items-center gap-1">
                  <AlertTriangle size={16} className="text-red-500" />
                  <span className="font-medium text-red-600 text-sm">{patient.alerts}</span>
               </div>
            ) : (
               <span className="text-gray-400 text-sm">—</span>
            )}
         </td>

         {/* Actions */}
         <td className="px-6 py-4">
            <div className="flex items-center gap-2">
               <button
                  onClick={handleViewRecord}
                  className="flex justify-center items-center bg-brand-50 hover:bg-brand-100 rounded-lg w-8 h-8 text-brand-600 transition-colors"
                  title="Ver historial médico"
               >
                  <Eye size={16} />
               </button>
               <button
                  onClick={handleCall}
                  className="flex justify-center items-center bg-green-50 hover:bg-green-100 rounded-lg w-8 h-8 text-green-600 transition-colors"
                  title="Llamar al paciente"
               >
                  <Phone size={16} />
               </button>
               <button
                  onClick={handleSchedule}
                  className="flex justify-center items-center bg-blue-50 hover:bg-blue-100 rounded-lg w-8 h-8 text-blue-600 transition-colors"
                  title="Programar cita"
               >
                  <Calendar size={16} />
               </button>
               <button
                  onClick={handleViewRecord}
                  className="flex justify-center items-center hover:bg-gray-100 opacity-0 group-hover:opacity-100 rounded-lg w-8 h-8 text-gray-600 transition-all"
                  title="Ver más detalles"
               >
                  <ChevronRight size={16} />
               </button>
            </div>
         </td>
      </tr>
   );
}

export default function PatientsList ({
   patients, userType
}: PatientsListProps) {
   if (patients.length === 0) {
      return (
         <div className="bg-white/40 shadow-sm backdrop-blur-sm p-8 border border-white/50 rounded-2xl text-center">
            <div className="flex justify-center items-center bg-gray-100 mx-auto mb-4 rounded-full w-16 h-16">
               <User size={24} className="text-gray-400" />
            </div>
            <h3 className="mb-2 font-medium text-gray-800 text-lg">No se encontraron pacientes</h3>
            <p className="text-gray-600">
               No hay pacientes que coincidan con los filtros aplicados.
            </p>
         </div>
      );
   }

   return (
      <div className="bg-white/40 shadow-sm backdrop-blur-sm border border-white/50 rounded-2xl overflow-hidden">
         <div className="flex items-center gap-3 p-6 pb-4">
            <div className="bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full w-1 h-6" />
            <h2 className="font-semibold text-gray-800 text-lg">Lista de Pacientes</h2>
            <div className="flex-1 bg-gradient-to-r from-gray-300/30 to-transparent ml-4 h-px" />
            <div className="flex items-center gap-2 text-gray-600 text-sm">
               <Clock size={14} />
               <span>Actualizado hace 5 min</span>
            </div>
         </div>

         <div className="max-h-[70dvh] overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="bg-gray-50/80 border-gray-200 border-b">
                     <th className="px-6 py-3 font-medium text-gray-700 text-sm text-left">Paciente</th>
                     <th className="px-6 py-3 font-medium text-gray-700 text-sm text-left">Estado</th>
                     {userType === 'admin' && (
                        <th className="px-6 py-3 font-medium text-gray-700 text-sm text-left">Doctor</th>
                     )}
                     <th className="px-6 py-3 font-medium text-gray-700 text-sm text-left">Próxima Sesión</th>
                     <th className="px-6 py-3 font-medium text-gray-700 text-sm text-left">Signos Vitales</th>
                     <th className="px-6 py-3 font-medium text-gray-700 text-sm text-left">Progreso</th>
                     <th className="px-6 py-3 font-medium text-gray-700 text-sm text-left">Riesgo</th>
                     <th className="px-6 py-3 font-medium text-gray-700 text-sm text-left">Adherencia</th>
                     <th className="px-6 py-3 font-medium text-gray-700 text-sm text-left">Alertas</th>
                     <th className="px-6 py-3 font-medium text-gray-700 text-sm text-left">Acciones</th>
                  </tr>
               </thead>
               <tbody>
                  {patients.map((patient) => (
                     <PatientRow
                        key={patient.id}
                        patient={patient}
                        userType={userType}
                     />
                  ))}
               </tbody>
            </table>
         </div>

         {/* Footer with summary */}
         <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 bg-gray-50/50 px-6 py-4 border-gray-200 border-t">
            <p className="text-gray-600 text-sm">
               Mostrando {patients.length} paciente{patients.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-4 text-sm">
               <div className="flex items-center gap-2">
                  <div className="bg-green-500 rounded-full w-3 h-3" />
                  <span className="text-gray-600">Bajo riesgo</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="bg-yellow-500 rounded-full w-3 h-3" />
                  <span className="text-gray-600">Riesgo medio</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="bg-red-500 rounded-full w-3 h-3" />
                  <span className="text-gray-600">Alto riesgo</span>
               </div>
            </div>
         </div>
      </div>
   );
}
