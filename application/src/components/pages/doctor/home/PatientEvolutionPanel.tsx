import {
   TrendingUp, TrendingDown, Minus, Heart, Droplets, Clock, User
} from 'lucide-react';
import { mockPatientEvolution, type PatientEvolution } from '@/data/mockData/doctorData';
import Link from 'next/link';

function getTrendIcon (trend: PatientEvolution['trend']) {
   const icons = {
      improving: <TrendingUp size={16} />,
      stable: <Minus size={16} />,
      declining: <TrendingDown size={16} />
   };
   return icons[trend];
}

function getTrendColor (trend: PatientEvolution['trend']) {
   const colors = {
      improving: 'text-green-600 bg-green-50 border-green-200',
      stable: 'text-blue-600 bg-blue-50 border-blue-200',
      declining: 'text-red-600 bg-red-50 border-red-200'
   };
   return colors[trend];
}

function getTrendLabel (trend: PatientEvolution['trend']) {
   const labels = {
      improving: 'Mejorando',
      stable: 'Estable',
      declining: 'Requiere atención'
   };
   return labels[trend];
}

function formatDate (dateString: string): string {
   const date = new Date(dateString);
   return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short'
   });
}

interface PatientEvolutionItemProps {
   patient: PatientEvolution;
   index: number;
}

function PatientEvolutionItem ({
   patient, index
}: PatientEvolutionItemProps) {
   return (
      <div
         className="group bg-white/90 hover:bg-white hover:shadow-md p-5 border border-gray-200/50 rounded-xl overflow-hidden hover:scale-[1.01] transition-all animate-fade-in-up duration-300"
         style={{
            animationDelay: `${index * 100}ms`
         }}
      >
         {/* Trend indicator line */}
         <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
            patient.trend === 'improving' ? 'bg-green-400' :
               patient.trend === 'stable' ? 'bg-blue-400' :
                  'bg-red-400'
         }`}
         />

         <div className="z-10 relative ml-2">
            <div className="flex justify-between items-start mb-4">
               <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="bg-gradient-to-r from-brand-500 to-blue-500 p-1.5 rounded-lg">
                        <User size={16} className="text-white" />
                     </div>
                     <h4 className="font-semibold text-gray-800 text-lg">{patient.patientName}</h4>
                  </div>

                  <p className="text-gray-600 text-sm">
                     Última sesión: {formatDate(patient.lastSession)}
                  </p>
               </div>

               <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getTrendColor(patient.trend)}`}>
                  {getTrendIcon(patient.trend)}
                  <span>{getTrendLabel(patient.trend)}</span>
               </div>
            </div>

            {/* Key Metrics */}
            <div className="gap-4 grid grid-cols-3 mb-4">
               <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                     <Heart size={14} className="text-red-500" />
                     <span className="font-medium text-gray-600 text-xs">Presión Arterial</span>
                  </div>
                  <p className="font-semibold text-gray-800">{patient.keyMetrics.bloodPressure}</p>
               </div>

               <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                     <Droplets size={14} className="text-blue-500" />
                     <span className="font-medium text-gray-600 text-xs">Fluido Removido</span>
                  </div>
                  <p className="font-semibold text-gray-800">{patient.keyMetrics.fluidRemoval}L</p>
               </div>

               <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                     <Clock size={14} className="text-green-500" />
                     <span className="font-medium text-gray-600 text-xs">Tiempo</span>
                  </div>
                  <p className="font-semibold text-gray-800">{patient.keyMetrics.treatmentTime}min</p>
               </div>
            </div>

            {/* Clinical Notes */}
            <div className="bg-gradient-to-r from-brand-50/50 to-blue-50/50 p-4 rounded-lg">
               <h5 className="mb-2 font-medium text-gray-800 text-sm">Notas Clínicas</h5>
               <p className="text-gray-700 text-sm leading-relaxed">{patient.notes}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
               <Link
                  href="/doctor/patients/1"
                  className="flex-1 bg-brand-500 hover:bg-brand-600 px-4 py-2 rounded-lg font-medium text-white text-sm transition-colors duration-200"
               >
                  Ver Historial
               </Link>
               <button className="hover:bg-gray-50 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 text-sm transition-colors duration-200">
                  Actualizar
               </button>
            </div>
         </div>
      </div>
   );
}

export default function PatientEvolutionPanel () {
   // Sort patients by trend priority (declining first, then improving, then stable)
   const sortedPatients = [...mockPatientEvolution].sort((a, b) => {
      const trendPriority = {
         declining: 0,
         improving: 1,
         stable: 2
      };
      return trendPriority[a.trend] - trendPriority[b.trend];
   });

   return (
      <div className="space-y-6">
         {/* Header */}
         <div className="bg-white/90 p-6 border border-gray-200/50 rounded-xl">
            <div className="flex items-center gap-3">
               <div className="bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg p-2 rounded-lg">
                  <TrendingUp size={20} className="drop-shadow-sm text-white" />
               </div>
               <div>
                  <h2 className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 font-bold text-transparent text-2xl">
                     Evolución de Pacientes
                  </h2>
                  <p className="text-gray-600 text-sm">Seguimiento y métricas clave</p>
               </div>
            </div>
         </div>

         {/* Summary Stats */}
         <div className="gap-4 grid grid-cols-3">
            <div className="bg-green-50 p-4 border border-green-200/50 rounded-lg">
               <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={16} className="text-green-600" />
                  <span className="font-medium text-green-800 text-sm">Mejorando</span>
               </div>
               <p className="font-bold text-green-700 text-2xl">
                  {mockPatientEvolution.filter(p => p.trend === 'improving').length}
               </p>
               <p className="text-green-600 text-xs">pacientes</p>
            </div>

            <div className="bg-blue-50 p-4 border border-blue-200/50 rounded-lg">
               <div className="flex items-center gap-2 mb-2">
                  <Minus size={16} className="text-blue-600" />
                  <span className="font-medium text-blue-800 text-sm">Estables</span>
               </div>
               <p className="font-bold text-blue-700 text-2xl">
                  {mockPatientEvolution.filter(p => p.trend === 'stable').length}
               </p>
               <p className="text-blue-600 text-xs">pacientes</p>
            </div>

            <div className="bg-red-50 p-4 border border-red-200/50 rounded-lg">
               <div className="flex items-center gap-2 mb-2">
                  <TrendingDown size={16} className="text-red-600" />
                  <span className="font-medium text-red-800 text-sm">Requieren atención</span>
               </div>
               <p className="font-bold text-red-700 text-2xl">
                  {mockPatientEvolution.filter(p => p.trend === 'declining').length}
               </p>
               <p className="text-red-600 text-xs">pacientes</p>
            </div>
         </div>

         {/* Patient Evolution List */}
         <div className="space-y-4 max-h-[70dvh] overflow-y-auto">
            {sortedPatients.map((patient, index) => (
               <PatientEvolutionItem key={patient.id} patient={patient} index={index} />
            ))}
         </div>
      </div>
   );
}
