import {
   TestTube, AlertTriangle, CheckCircle, TrendingUp, TrendingDown
} from 'lucide-react';
import { LabResult } from '@/data/mockData/patientDetailData';

interface LabResultsSectionProps {
   results: LabResult[];
}

function LabResultCard ({ result }: { result: LabResult }) {
   const getStatusConfig = (status: LabResult['status']) => {
      switch (status) {
         case 'normal':
            return {
               color: 'bg-green-50 border-green-200',
               textColor: 'text-green-700',
               icon: <CheckCircle size={16} className="text-green-500" />
            };
         case 'abnormal':
            return {
               color: 'bg-yellow-50 border-yellow-200',
               textColor: 'text-yellow-700',
               icon: <AlertTriangle size={16} className="text-yellow-500" />
            };
         case 'critical':
            return {
               color: 'bg-red-50 border-red-200',
               textColor: 'text-red-700',
               icon: <AlertTriangle size={16} className="text-red-500" />
            };
         default:
            return {
               color: 'bg-gray-50 border-gray-200',
               textColor: 'text-gray-700',
               icon: <TestTube size={16} className="text-gray-500" />
            };
      }
   };

   const config = getStatusConfig(result.status);

   return (
      <div className={`p-4 rounded-lg border ${config.color} mb-4`}>
         <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
               {config.icon}
               <h4 className="font-semibold text-gray-900">{result.testName}</h4>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.textColor} capitalize`}>
               {result.status === 'normal' ? 'Normal' :
                  result.status === 'abnormal' ? 'Anormal' : 'Crítico'}
            </span>
         </div>

         <div className="space-y-2 mb-3">
            <div className="flex justify-between items-center">
               <span className="text-gray-600 text-sm">Valor:</span>
               <span className="font-bold text-gray-900 text-lg">
                  {result.value} {result.unit}
               </span>
            </div>
            <div className="flex justify-between items-center text-sm">
               <span className="text-gray-600">Rango de Referencia:</span>
               <span className="font-medium text-gray-800">{result.referenceRange} {result.unit}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
               <span className="text-gray-600">Fecha:</span>
               <span className="font-medium text-gray-800">
                  {new Date(result.date)
                     .toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                     })}
               </span>
            </div>
            <div className="flex justify-between items-center text-sm">
               <span className="text-gray-600">Ordenado por:</span>
               <span className="font-medium text-gray-800">{result.orderedBy}</span>
            </div>
         </div>

         {result.notes && (
            <div className="bg-white/50 p-3 rounded-md">
               <h5 className="mb-2 font-medium text-gray-800 text-sm">Notas:</h5>
               <p className="text-gray-700 text-sm">{result.notes}</p>
            </div>
         )}
      </div>
   );
}

export default function LabResultsSection ({ results }: LabResultsSectionProps) {
   const normalResults = results.filter(r => r.status === 'normal');
   const abnormalResults = results.filter(r => r.status === 'abnormal');
   const criticalResults = results.filter(r => r.status === 'critical');

   // Sort results by date (most recent first)
   const sortedResults = [...results].sort((a, b) => new Date(b.date)
      .getTime() - new Date(a.date)
      .getTime());

   return (
      <div className="space-y-6">
         {/* Summary Stats */}
         <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
            <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg text-center">
               <div className="font-bold text-blue-800 text-2xl">{results.length}</div>
               <div className="text-blue-600 text-sm">Total de Pruebas</div>
            </div>
            <div className="bg-green-50 p-4 border border-green-200 rounded-lg text-center">
               <div className="font-bold text-green-800 text-2xl">{normalResults.length}</div>
               <div className="text-green-600 text-sm">Resultados Normales</div>
            </div>
            <div className="bg-yellow-50 p-4 border border-yellow-200 rounded-lg text-center">
               <div className="font-bold text-yellow-800 text-2xl">{abnormalResults.length}</div>
               <div className="text-yellow-600 text-sm">Resultados Anormales</div>
            </div>
            <div className="bg-red-50 p-4 border border-red-200 rounded-lg text-center">
               <div className="font-bold text-red-800 text-2xl">{criticalResults.length}</div>
               <div className="text-red-600 text-sm">Resultados Críticos</div>
            </div>
         </div>

         {/* Critical Results */}
         {criticalResults.length > 0 && (
            <div>
               <h3 className="flex items-center gap-2 mb-4 font-semibold text-gray-800 text-lg">
                  <AlertTriangle size={20} className="text-red-500" />
                  Resultados Críticos - Atención Inmediata
               </h3>
               {criticalResults.map((result) => (
                  <LabResultCard key={result.id} result={result} />
               ))}
            </div>
         )}

         {/* Abnormal Results */}
         {abnormalResults.length > 0 && (
            <div>
               <h3 className="flex items-center gap-2 mb-4 font-semibold text-gray-800 text-lg">
                  <AlertTriangle size={20} className="text-yellow-500" />
                  Resultados Anormales
               </h3>
               {abnormalResults.map((result) => (
                  <LabResultCard key={result.id} result={result} />
               ))}
            </div>
         )}

         {/* Normal Results */}
         {normalResults.length > 0 && (
            <div>
               <h3 className="flex items-center gap-2 mb-4 font-semibold text-gray-800 text-lg">
                  <CheckCircle size={20} className="text-green-500" />
                  Resultados Normales
               </h3>
               {normalResults.map((result) => (
                  <LabResultCard key={result.id} result={result} />
               ))}
            </div>
         )}

         {/* Latest Results Summary Table */}
         {results.length > 0 && (
            <div>
               <h3 className="flex items-center gap-2 mb-4 font-semibold text-gray-800 text-lg">
                  <TestTube size={20} className="text-blue-500" />
                  Resumen de Últimos Resultados
               </h3>
               <div className="bg-white/60 shadow-sm backdrop-blur-sm border border-white/50 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                     <table className="w-full">
                        <thead className="bg-gray-50/80">
                           <tr>
                              <th className="px-4 py-3 font-medium text-gray-700 text-sm text-left">Prueba</th>
                              <th className="px-4 py-3 font-medium text-gray-700 text-sm text-left">Valor</th>
                              <th className="px-4 py-3 font-medium text-gray-700 text-sm text-left">Referencia</th>
                              <th className="px-4 py-3 font-medium text-gray-700 text-sm text-left">Estado</th>
                              <th className="px-4 py-3 font-medium text-gray-700 text-sm text-left">Fecha</th>
                           </tr>
                        </thead>
                        <tbody>
                           {sortedResults.slice(0, 5)
                              .map((result, index) => (
                                 <tr key={result.id} className={index % 2 === 0 ? 'bg-white/40' : 'bg-gray-50/40'}>
                                    <td className="px-4 py-3 font-medium text-gray-800 text-sm">{result.testName}</td>
                                    <td className="px-4 py-3 text-gray-800 text-sm">
                                       {result.value} {result.unit}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 text-sm">
                                       {result.referenceRange} {result.unit}
                                    </td>
                                    <td className="px-4 py-3">
                                       <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                          result.status === 'normal' ? 'bg-green-100 text-green-700' :
                                             result.status === 'abnormal' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                       }`}
                                       >
                                          {result.status === 'normal' ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                                          {result.status === 'normal' ? 'Normal' :
                                             result.status === 'abnormal' ? 'Anormal' : 'Crítico'}
                                       </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 text-sm">
                                       {new Date(result.date)
                                          .toLocaleDateString('es-ES')}
                                    </td>
                                 </tr>
                              ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         )}

         {results.length === 0 && (
            <div className="py-8 text-center">
               <TestTube size={48} className="mx-auto mb-4 text-gray-300" />
               <p className="text-gray-500">No hay resultados de laboratorio disponibles</p>
            </div>
         )}
      </div>
   );
}
