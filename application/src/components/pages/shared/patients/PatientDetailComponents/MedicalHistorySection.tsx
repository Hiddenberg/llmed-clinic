import {
   FileText, Calendar, AlertCircle, CheckCircle, Clock
} from 'lucide-react';
import { MedicalHistory } from '@/data/mockData/patientDetailData';

interface MedicalHistorySectionProps {
   history: MedicalHistory[];
}

function MedicalHistoryCard ({ condition }: { condition: MedicalHistory }) {
   const getStatusConfig = (status: MedicalHistory['status']) => {
      switch (status) {
         case 'active':
            return {
               color: 'bg-red-50 border-red-200',
               textColor: 'text-red-700',
               icon: <AlertCircle size={16} className="text-red-500" />
            };
         case 'chronic':
            return {
               color: 'bg-orange-50 border-orange-200',
               textColor: 'text-orange-700',
               icon: <Clock size={16} className="text-orange-500" />
            };
         case 'stable':
            return {
               color: 'bg-blue-50 border-blue-200',
               textColor: 'text-blue-700',
               icon: <CheckCircle size={16} className="text-blue-500" />
            };
         case 'resolved':
            return {
               color: 'bg-green-50 border-green-200',
               textColor: 'text-green-700',
               icon: <CheckCircle size={16} className="text-green-500" />
            };
         default:
            return {
               color: 'bg-gray-50 border-gray-200',
               textColor: 'text-gray-700',
               icon: <FileText size={16} className="text-gray-500" />
            };
      }
   };

   const getSeverityBadge = (severity: MedicalHistory['severity']) => {
      switch (severity) {
         case 'severe':
            return 'bg-red-100 text-red-800 border-red-200';
         case 'moderate':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
         case 'mild':
            return 'bg-green-100 text-green-800 border-green-200';
         default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
      }
   };

   const config = getStatusConfig(condition.status);

   return (
      <div className={`p-4 rounded-lg border ${config.color} mb-4`}>
         <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
               {config.icon}
               <h4 className="font-semibold text-gray-900">{condition.condition}</h4>
            </div>
            <div className="flex items-center gap-2">
               <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityBadge(condition.severity)}`}>
                  {condition.severity === 'severe' ? 'Severo' :
                     condition.severity === 'moderate' ? 'Moderado' : 'Leve'}
               </span>
               <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.textColor} capitalize`}>
                  {condition.status === 'active' ? 'Activo' :
                     condition.status === 'chronic' ? 'Crónico' :
                        condition.status === 'stable' ? 'Estable' : 'Resuelto'}
               </span>
            </div>
         </div>

         <div className="space-y-2 mb-3">
            <div className="flex justify-between items-center text-sm">
               <span className="text-gray-600">Código ICD-10:</span>
               <span className="font-mono font-medium text-gray-800">{condition.icd10Code}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
               <span className="text-gray-600">Fecha de Diagnóstico:</span>
               <span className="font-medium text-gray-800">
                  {new Date(condition.diagnosisDate)
                     .toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                     })}
               </span>
            </div>
         </div>

         <div className="bg-white/50 p-3 rounded-md">
            <h5 className="mb-2 font-medium text-gray-800 text-sm">Notas Clínicas:</h5>
            <p className="text-gray-700 text-sm leading-relaxed">{condition.notes}</p>
         </div>
      </div>
   );
}

export default function MedicalHistorySection ({ history }: MedicalHistorySectionProps) {
   const activeConditions = history.filter(h => h.status === 'active' || h.status === 'chronic');
   const resolvedConditions = history.filter(h => h.status === 'resolved' || h.status === 'stable');

   return (
      <div className="space-y-6">
         {/* Summary Stats */}
         <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
            <div className="bg-red-50 p-4 border border-red-200 rounded-lg text-center">
               <div className="font-bold text-red-800 text-2xl">{activeConditions.length}</div>
               <div className="text-red-600 text-sm">Condiciones Activas</div>
            </div>
            <div className="bg-green-50 p-4 border border-green-200 rounded-lg text-center">
               <div className="font-bold text-green-800 text-2xl">{resolvedConditions.length}</div>
               <div className="text-green-600 text-sm">Estables/Resueltas</div>
            </div>
            <div className="bg-orange-50 p-4 border border-orange-200 rounded-lg text-center">
               <div className="font-bold text-orange-800 text-2xl">
                  {history.filter(h => h.severity === 'severe').length}
               </div>
               <div className="text-orange-600 text-sm">Severidad Alta</div>
            </div>
            <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg text-center">
               <div className="font-bold text-blue-800 text-2xl">
                  {Math.round((new Date()
                     .getTime() - new Date(Math.min(...history.map(h => new Date(h.diagnosisDate)
                     .getTime())))
                     .getTime()) / (1000 * 60 * 60 * 24 * 365))}
               </div>
               <div className="text-blue-600 text-sm">Años de Historia</div>
            </div>
         </div>

         {/* Active/Chronic Conditions */}
         {activeConditions.length > 0 && (
            <div>
               <h3 className="flex items-center gap-2 mb-4 font-semibold text-gray-800 text-lg">
                  <AlertCircle size={20} className="text-red-500" />
                  Condiciones Activas y Crónicas
               </h3>
               {activeConditions.map((condition) => (
                  <MedicalHistoryCard key={condition.id} condition={condition} />
               ))}
            </div>
         )}

         {/* Resolved/Stable Conditions */}
         {resolvedConditions.length > 0 && (
            <div>
               <h3 className="flex items-center gap-2 mb-4 font-semibold text-gray-800 text-lg">
                  <CheckCircle size={20} className="text-green-500" />
                  Condiciones Estables y Resueltas
               </h3>
               {resolvedConditions.map((condition) => (
                  <MedicalHistoryCard key={condition.id} condition={condition} />
               ))}
            </div>
         )}

         {history.length === 0 && (
            <div className="py-8 text-center">
               <FileText size={48} className="mx-auto mb-4 text-gray-300" />
               <p className="text-gray-500">No hay historia médica registrada</p>
            </div>
         )}
      </div>
   );
}
