import {
   Activity, Clock, Droplets, TrendingUp
} from 'lucide-react';
import { DialysisSession } from '@/data/mockData/patientDetailData';

interface DialysisSessionsSectionProps {
   sessions: DialysisSession[];
}

export default function DialysisSessionsSection ({ sessions }: DialysisSessionsSectionProps) {
   if (sessions.length === 0) {
      return (
         <div className="py-8 text-center">
            <Activity size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No hay registros de sesiones de diálisis disponibles</p>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         {sessions.map((session) => (
            <div key={session.id} className="bg-white/60 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-lg">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <h4 className="font-semibold text-gray-900 text-lg">
                        Sesión del {new Date(session.date)
                        .toLocaleDateString('es-ES')}
                     </h4>
                     <p className="text-gray-600 text-sm">
                        {session.startTime} - {session.endTime} ({session.duration} minutos)
                     </p>
                  </div>
                  <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-700 text-sm">
                     Kt/V: {session.ktV}
                  </span>
               </div>

               <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 mb-4">
                  <div className="space-y-3">
                     <h5 className="font-medium text-gray-800">Parámetros de Diálisis</h5>
                     <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                           <span className="text-gray-600">Dializador:</span>
                           <span className="font-medium text-gray-800">{session.dialyzer}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">Flujo Sanguíneo:</span>
                           <span className="font-medium text-gray-800">{session.bloodFlow} ml/min</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">Flujo Dializado:</span>
                           <span className="font-medium text-gray-800">{session.dialysateFlow} ml/min</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">URR:</span>
                           <span className="font-medium text-gray-800">{session.urr}%</span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <h5 className="font-medium text-gray-800">Ultrafiltración y Peso</h5>
                     <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                           <span className="text-gray-600">Peso Pre-diálisis:</span>
                           <span className="font-medium text-gray-800">{session.preWeight} kg</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">Peso Post-diálisis:</span>
                           <span className="font-medium text-gray-800">{session.postWeight} kg</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">Pérdida de Peso:</span>
                           <span className="font-medium text-gray-800">{session.weightLoss} kg</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">UF Objetivo:</span>
                           <span className="font-medium text-gray-800">{session.ultraFiltrationGoal} ml</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">UF Lograda:</span>
                           <span className="font-medium text-gray-800">{session.ultraFiltrationAchieved} ml</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-gray-600">Acceso Vascular:</span>
                     <span className="font-medium text-gray-800">{session.accessType} - {session.accessSite}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-gray-600">Realizada por:</span>
                     <span className="font-medium text-gray-800">{session.conductedBy}</span>
                  </div>
               </div>

               {session.notes && (
                  <div className="bg-blue-50 mt-4 p-3 border border-blue-200 rounded-md">
                     <h5 className="mb-2 font-medium text-blue-800 text-sm">Notas de la Sesión:</h5>
                     <p className="text-blue-700 text-sm">{session.notes}</p>
                  </div>
               )}

               {session.complications && (
                  <div className="bg-red-50 mt-4 p-3 border border-red-200 rounded-md">
                     <h5 className="mb-2 font-medium text-red-800 text-sm">Complicaciones:</h5>
                     <p className="text-red-700 text-sm">{session.complications}</p>
                  </div>
               )}
            </div>
         ))}
      </div>
   );
}
