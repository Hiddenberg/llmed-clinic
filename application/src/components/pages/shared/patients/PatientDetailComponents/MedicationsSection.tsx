import {
   Pill, AlertTriangle, CheckCircle, Clock, User
} from 'lucide-react';
import { Medication } from '@/data/mockData/patientDetailData';

interface MedicationsSectionProps {
   medications: Medication[];
}

function MedicationCard ({ medication }: { medication: Medication }) {
   const getStatusConfig = (status: Medication['status']) => {
      switch (status) {
         case 'active':
            return {
               color: 'bg-green-50 border-green-200',
               textColor: 'text-green-700',
               icon: <CheckCircle size={16} className="text-green-500" />
            };
         case 'discontinued':
            return {
               color: 'bg-red-50 border-red-200',
               textColor: 'text-red-700',
               icon: <AlertTriangle size={16} className="text-red-500" />
            };
         case 'suspended':
            return {
               color: 'bg-yellow-50 border-yellow-200',
               textColor: 'text-yellow-700',
               icon: <Clock size={16} className="text-yellow-500" />
            };
         default:
            return {
               color: 'bg-gray-50 border-gray-200',
               textColor: 'text-gray-700',
               icon: <Pill size={16} className="text-gray-500" />
            };
      }
   };

   const config = getStatusConfig(medication.status);

   return (
      <div className={`p-4 rounded-lg border ${config.color} mb-4`}>
         <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
               {config.icon}
               <h4 className="font-semibold text-gray-900">{medication.name}</h4>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.textColor} capitalize`}>
               {medication.status === 'active' ? 'Activo' :
                  medication.status === 'discontinued' ? 'Descontinuado' : 'Suspendido'}
            </span>
         </div>

         <div className="space-y-2 mb-3">
            <div className="flex justify-between items-center text-sm">
               <span className="text-gray-600">Nombre Genérico:</span>
               <span className="font-medium text-gray-800">{medication.genericName}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
               <span className="text-gray-600">Dosis:</span>
               <span className="font-medium text-gray-800">{medication.dosage}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
               <span className="text-gray-600">Frecuencia:</span>
               <span className="font-medium text-gray-800">{medication.frequency}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
               <span className="text-gray-600">Vía de Administración:</span>
               <span className="font-medium text-gray-800">{medication.route}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
               <span className="text-gray-600">Prescrito por:</span>
               <span className="font-medium text-gray-800">{medication.prescribedBy}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
               <span className="text-gray-600">Fecha de Inicio:</span>
               <span className="font-medium text-gray-800">
                  {new Date(medication.startDate)
                     .toLocaleDateString('es-ES')}
               </span>
            </div>
         </div>

         <div className="bg-white/50 mb-3 p-3 rounded-md">
            <h5 className="mb-2 font-medium text-gray-800 text-sm">Indicación:</h5>
            <p className="text-gray-700 text-sm">{medication.indication}</p>
         </div>

         {medication.sideEffects && medication.sideEffects.length > 0 && (
            <div className="bg-yellow-50 p-3 border border-yellow-200 rounded-md">
               <h5 className="flex items-center gap-2 mb-2 font-medium text-yellow-800 text-sm">
                  <AlertTriangle size={14} />
                  Efectos Secundarios Conocidos
               </h5>
               <div className="flex flex-wrap gap-1">
                  {medication.sideEffects.map((effect, index) => (
                     <span key={index} className="bg-yellow-100 px-2 py-1 rounded text-yellow-800 text-xs">
                        {effect}
                     </span>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
}

export default function MedicationsSection ({ medications }: MedicationsSectionProps) {
   const activeMedications = medications.filter(m => m.status === 'active');
   const inactiveMedications = medications.filter(m => m.status !== 'active');

   return (
      <div className="space-y-6">
         {/* Summary Stats */}
         <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            <div className="bg-green-50 p-4 border border-green-200 rounded-lg text-center">
               <div className="font-bold text-green-800 text-2xl">{activeMedications.length}</div>
               <div className="text-green-600 text-sm">Medicamentos Activos</div>
            </div>
            <div className="bg-red-50 p-4 border border-red-200 rounded-lg text-center">
               <div className="font-bold text-red-800 text-2xl">{inactiveMedications.length}</div>
               <div className="text-red-600 text-sm">Descontinuados/Suspendidos</div>
            </div>
            <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg text-center">
               <div className="font-bold text-blue-800 text-2xl">
                  {medications.filter(m => m.sideEffects && m.sideEffects.length > 0).length}
               </div>
               <div className="text-blue-600 text-sm">Con Efectos Secundarios</div>
            </div>
         </div>

         {/* Active Medications */}
         {activeMedications.length > 0 && (
            <div>
               <h3 className="flex items-center gap-2 mb-4 font-semibold text-gray-800 text-lg">
                  <CheckCircle size={20} className="text-green-500" />
                  Medicamentos Activos
               </h3>
               {activeMedications.map((medication) => (
                  <MedicationCard key={medication.id} medication={medication} />
               ))}
            </div>
         )}

         {/* Inactive Medications */}
         {inactiveMedications.length > 0 && (
            <div>
               <h3 className="flex items-center gap-2 mb-4 font-semibold text-gray-800 text-lg">
                  <Clock size={20} className="text-gray-500" />
                  Medicamentos Descontinuados/Suspendidos
               </h3>
               {inactiveMedications.map((medication) => (
                  <MedicationCard key={medication.id} medication={medication} />
               ))}
            </div>
         )}

         {medications.length === 0 && (
            <div className="py-8 text-center">
               <Pill size={48} className="mx-auto mb-4 text-gray-300" />
               <p className="text-gray-500">No hay medicamentos registrados</p>
            </div>
         )}
      </div>
   );
}
