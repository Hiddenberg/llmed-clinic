import {
   Heart, Activity, Thermometer, User
} from 'lucide-react';
import { VitalSignsRecord } from '@/data/mockData/patientDetailData';

interface VitalSignsSectionProps {
   vitals: VitalSignsRecord[];
}

export default function VitalSignsSection ({ vitals }: VitalSignsSectionProps) {
   if (vitals.length === 0) {
      return (
         <div className="py-8 text-center">
            <Heart size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No hay registros de signos vitales disponibles</p>
         </div>
      );
   }

   return (
      <div className="space-y-4">
         {vitals.map((vital) => (
            <div key={vital.id} className="bg-white/60 shadow-sm backdrop-blur-sm p-4 border border-white/50 rounded-lg">
               <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-900">
                     {new Date(vital.date)
                        .toLocaleDateString('es-ES')} - {vital.time}
                  </h4>
                  <span className="text-gray-600 text-sm">Por: {vital.recordedBy}</span>
               </div>
               <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
                  <div className="text-center">
                     <div className="font-bold text-gray-800 text-lg">{vital.systolicBP}/{vital.diastolicBP}</div>
                     <div className="text-gray-600 text-sm">Presión Arterial (mmHg)</div>
                  </div>
                  <div className="text-center">
                     <div className="font-bold text-gray-800 text-lg">{vital.heartRate}</div>
                     <div className="text-gray-600 text-sm">Frecuencia Cardíaca (bpm)</div>
                  </div>
                  <div className="text-center">
                     <div className="font-bold text-gray-800 text-lg">{vital.weight}</div>
                     <div className="text-gray-600 text-sm">Peso (kg)</div>
                  </div>
                  <div className="text-center">
                     <div className="font-bold text-gray-800 text-lg">{vital.oxygenSaturation}%</div>
                     <div className="text-gray-600 text-sm">Saturación O₂</div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}
