import {
   Heart, Activity, Thermometer, Scale, Droplets, TrendingUp, TrendingDown, Minus, ChevronRight, BarChart3,
   LucideIcon
} from 'lucide-react';
import { mockRecentVitalSigns, mockTreatmentMetrics } from '@/data/mockData/patientData';

// Helper function to get trend icon and color
function getTrendInfo (current: number, previous: number) {
   const diff = current - previous;
   const percentChange = Math.abs((diff / previous) * 100);

   if (percentChange < 2) {
      return {
         icon: Minus,
         color: 'text-gray-500',
         bgColor: 'bg-gray-100',
         label: 'Estable'
      };
   } else if (diff > 0) {
      return {
         icon: TrendingUp,
         color: 'text-red-500',
         bgColor: 'bg-red-100',
         label: 'Subiendo'
      };
   } else {
      return {
         icon: TrendingDown,
         color: 'text-green-500',
         bgColor: 'bg-green-100',
         label: 'Bajando'
      };
   }
}

// Vital sign card component
function VitalSignCard ({
   icon: Icon, label, value, unit, trend, color
}: {
   icon: LucideIcon;
   label: string;
   value: string | number;
   unit: string;
   trend?: {
      icon: LucideIcon;
      color: string;
      bgColor: string;
      label: string;
   };
   color: string;
}) {
   return (
      <div className="bg-white p-4 border border-gray-200 rounded-xl">
         <div className="flex justify-between items-start mb-3">
            <div className={`flex items-center justify-center bg-gradient-to-r ${color} rounded-lg w-10 h-10 text-white`}>
               <Icon size={20} />
            </div>
            {trend && (
               <div className={`flex items-center gap-1 ${trend.bgColor} px-2 py-1 rounded-full`}>
                  <trend.icon size={12} className={trend.color} />
                  <span className={`${trend.color} text-xs font-medium`}>{trend.label}</span>
               </div>
            )}
         </div>

         <div>
            <p className="font-semibold text-gray-800 text-lg">{value} <span className="font-normal text-gray-500 text-sm">{unit}</span></p>
            <p className="text-gray-600 text-sm">{label}</p>
         </div>
      </div>
   );
}

// Treatment metric card component
function TreatmentMetricCard ({
   icon: Icon, label, value, unit, color, description
}: {
   icon: LucideIcon;
   label: string;
   value: string | number;
   unit: string;
   color: string;
   description?: string;
}) {
   return (
      <div className="bg-white p-4 border border-gray-200 rounded-xl">
         <div className="flex items-center gap-3 mb-2">
            <div className={`flex items-center justify-center bg-gradient-to-r ${color} rounded-lg w-8 h-8 text-white`}>
               <Icon size={16} />
            </div>
            <div className="flex-1">
               <p className="font-semibold text-gray-800 text-sm">{value} <span className="font-normal text-gray-500 text-xs">{unit}</span></p>
               <p className="text-gray-600 text-xs">{label}</p>
            </div>
         </div>
         {description && (
            <p className="text-gray-500 text-xs">{description}</p>
         )}
      </div>
   );
}

export default function VitalSignsOverview () {
   const latestVitals = mockRecentVitalSigns[0];
   const previousVitals = mockRecentVitalSigns[1];
   const latestTreatment = mockTreatmentMetrics[0];

   if (!latestVitals) {
      return (
         <div className="flex flex-col justify-center items-center py-8 text-center">
            <div className="flex justify-center items-center bg-gray-100 mb-4 rounded-full w-16 h-16 text-gray-400">
               <Activity size={24} />
            </div>
            <p className="font-medium text-gray-600">No hay datos de signos vitales</p>
            <p className="mt-1 text-gray-400 text-sm">Los datos aparecerán después de su próxima sesión</p>
         </div>
      );
   }

   // Calculate trends
   const bpTrend = previousVitals ? getTrendInfo(latestVitals.bloodPressure.systolic, previousVitals.bloodPressure.systolic) : undefined;
   const hrTrend = previousVitals ? getTrendInfo(latestVitals.heartRate, previousVitals.heartRate) : undefined;
   const weightTrend = previousVitals ? getTrendInfo(latestVitals.weight, previousVitals.weight) : undefined;

   return (
      <div className="space-y-6">
         {/* Latest Vital Signs */}
         <div>
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-medium text-gray-800">Última medición</h3>
               <span className="text-gray-500 text-xs">
                  {new Date(latestVitals.date)
                     .toLocaleDateString('es-MX', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                     })}
               </span>
            </div>

            <div className="gap-3 grid grid-cols-2 lg:grid-cols-4">
               <VitalSignCard
                  icon={Heart}
                  label="Presión Arterial"
                  value={`${latestVitals.bloodPressure.systolic}/${latestVitals.bloodPressure.diastolic}`}
                  unit="mmHg"
                  trend={bpTrend}
                  color="from-red-500 to-pink-500"
               />

               <VitalSignCard
                  icon={Activity}
                  label="Frecuencia Cardíaca"
                  value={latestVitals.heartRate}
                  unit="bpm"
                  trend={hrTrend}
                  color="from-blue-500 to-cyan-500"
               />

               <VitalSignCard
                  icon={Scale}
                  label="Peso"
                  value={latestVitals.weight}
                  unit="kg"
                  trend={weightTrend}
                  color="from-green-500 to-emerald-500"
               />

               <VitalSignCard
                  icon={Thermometer}
                  label="Temperatura"
                  value={latestVitals.temperature}
                  unit="°C"
                  color="from-orange-500 to-amber-500"
               />
            </div>
         </div>

         {/* Treatment Metrics */}
         {latestTreatment && (
            <div>
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-800">Última sesión de tratamiento</h3>
                  <span className="text-gray-500 text-xs">
                     {new Date(latestTreatment.date)
                        .toLocaleDateString('es-MX', {
                           day: 'numeric',
                           month: 'short'
                        })}
                  </span>
               </div>

               <div className="gap-3 grid grid-cols-1 sm:grid-cols-3">
                  <TreatmentMetricCard
                     icon={Droplets}
                     label="Líquido Removido"
                     value={latestTreatment.fluidRemoval}
                     unit="L"
                     color="from-blue-500 to-cyan-500"
                  />

                  <TreatmentMetricCard
                     icon={BarChart3}
                     label="Eficiencia"
                     value={latestTreatment.dialysisEfficiency}
                     unit="%"
                     color="from-green-500 to-emerald-500"
                  />

                  <TreatmentMetricCard
                     icon={Heart}
                     label="Comodidad"
                     value={`${latestTreatment.patientComfort}/5`}
                     unit="⭐"
                     color="from-purple-500 to-pink-500"
                  />
               </div>

               {latestTreatment.complications && (
                  <div className="bg-orange-50 mt-4 p-3 border border-orange-200 rounded-lg">
                     <p className="font-medium text-orange-800 text-sm">Observaciones:</p>
                     <p className="mt-1 text-orange-700 text-sm">{latestTreatment.complications}</p>
                  </div>
               )}
            </div>
         )}

         {/* View Full Timeline Button */}
         <button className="flex justify-center items-center gap-2 bg-gradient-to-r from-brand-500 hover:from-brand-600 to-blue-500 hover:to-blue-600 hover:shadow-md px-6 py-3 rounded-lg w-full font-medium text-white text-sm transition-all duration-200">
            <BarChart3 size={16} />
            <span>Ver Historial Completo</span>
            <ChevronRight size={16} />
         </button>
      </div>
   );
}
