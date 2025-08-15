import {
   X, User, Calendar, AlertTriangle, Pill, Activity,
   Heart, Scale, Droplet, TestTube, Clock, TrendingUp,
   LucideIcon
} from 'lucide-react';
import { PatientQuickInfo } from '@/data/mockData/consultationData';

interface PatientInfoCurtainProps {
   isOpen: boolean;
   onClose: () => void;
   patientInfo: PatientQuickInfo;
}

function InfoSection ({
   title, children
}: { title: string; children: React.ReactNode }) {
   return (
      <div className="mb-6">
         <h3 className="mb-3 font-semibold text-gray-900 text-lg">{title}</h3>
         {children}
      </div>
   );
}

function InfoCard ({
   icon: Icon, label, value, color = 'text-gray-600'
}: {
   icon: LucideIcon;
   label: string;
   value: string | number;
   color?: string;
}) {
   return (
      <div className="!flex !items-center !gap-3 !bg-gray-50 !p-4 !rounded-lg">
         <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center ${color}`}>
            <Icon size={20} />
         </div>
         <div>
            <p className="text-gray-600 text-sm">{label}</p>
            <p className="font-semibold text-gray-900">{value}</p>
         </div>
      </div>
   );
}

function VitalsGrid ({ vitals }: { vitals: PatientQuickInfo['recentVitals'] }) {
   return (
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
         <InfoCard
            icon={Heart}
            label="Presión Arterial"
            value={vitals.bloodPressure}
            color="text-red-600"
         />
         <InfoCard
            icon={Activity}
            label="Frecuencia Cardíaca"
            value={`${vitals.heartRate} bpm`}
            color="text-blue-600"
         />
         <InfoCard
            icon={Scale}
            label="Peso"
            value={`${vitals.weight} kg`}
            color="text-green-600"
         />
      </div>
   );
}

function LabsGrid ({ labs }: { labs: PatientQuickInfo['recentLabs'] }) {
   const getLabColor = (value: number, normal: [number, number]) => {
      if (value < normal[0] || value > normal[1]) {
         return 'text-red-600 bg-red-50';
      }
      return 'text-green-600 bg-green-50';
   };

   return (
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
         <div className={`rounded-lg p-4 ${getLabColor(labs.creatinine, [0.7, 1.3])}`}>
            <div className="flex items-center gap-2 mb-2">
               <TestTube size={16} />
               <span className="font-medium text-sm">Creatinina</span>
            </div>
            <p className="font-bold text-lg">{labs.creatinine} mg/dL</p>
            <p className="opacity-75 text-xs">Normal: 0.7-1.3</p>
         </div>

         <div className={`rounded-lg p-4 ${getLabColor(labs.hemoglobin, [12, 16])}`}>
            <div className="flex items-center gap-2 mb-2">
               <Droplet size={16} />
               <span className="font-medium text-sm">Hemoglobina</span>
            </div>
            <p className="font-bold text-lg">{labs.hemoglobin} g/dL</p>
            <p className="opacity-75 text-xs">Normal: 12-16</p>
         </div>

         <div className={`rounded-lg p-4 ${getLabColor(labs.potassium, [3.5, 5.0])}`}>
            <div className="flex items-center gap-2 mb-2">
               <Activity size={16} />
               <span className="font-medium text-sm">Potasio</span>
            </div>
            <p className="font-bold text-lg">{labs.potassium} mEq/L</p>
            <p className="opacity-75 text-xs">Normal: 3.5-5.0</p>
         </div>

         <div className={`rounded-lg p-4 ${getLabColor(labs.phosphorus, [2.5, 4.5])}`}>
            <div className="flex items-center gap-2 mb-2">
               <TestTube size={16} />
               <span className="font-medium text-sm">Fósforo</span>
            </div>
            <p className="font-bold text-lg">{labs.phosphorus} mg/dL</p>
            <p className="opacity-75 text-xs">Normal: 2.5-4.5</p>
         </div>
      </div>
   );
}

function AlertsList ({ alerts }: { alerts: string[] }) {
   if (alerts.length === 0) {
      return (
         <div className="py-4 text-gray-500 text-center">
            <p>No hay alertas activas</p>
         </div>
      );
   }

   return (
      <div className="space-y-2">
         {alerts.map((alert, index) => (
            <div key={index} className="flex items-center gap-3 bg-yellow-50 p-3 border border-yellow-200 rounded-lg">
               <AlertTriangle size={16} className="flex-shrink-0 text-yellow-600" />
               <p className="text-yellow-800 text-sm">{alert}</p>
            </div>
         ))}
      </div>
   );
}

export default function PatientInfoCurtain ({
   isOpen, onClose, patientInfo
}: PatientInfoCurtainProps) {
   const getRiskColor = (risk: string) => {
      switch (risk) {
         case 'high':
            return 'text-red-600 bg-red-100';
         case 'medium':
            return 'text-yellow-600 bg-yellow-100';
         case 'low':
            return 'text-green-600 bg-green-100';
         default:
            return 'text-gray-600 bg-gray-100';
      }
   };

   return (
      <>
         {/* Backdrop */}
         {isOpen && (
            <div
               className="z-50 fixed inset-0 bg-black/50 transition-opacity"
               onClick={onClose}
            />
         )}

         {/* Curtain */}
         <div className={`!fixed !top-0 !right-0 !h-full !w-full !max-w-2xl !bg-white !shadow-2xl !z-50 !transform !transition-transform !duration-300 !ease-in-out ${
            isOpen ? '!translate-x-0' : '!translate-x-full'
         }`}
         >
            {/* Header */}
            <div className="!flex !justify-between !items-center !bg-brand-600 !p-6 !text-white">
               <div className="!flex !items-center !gap-3">
                  <div className="!flex !justify-center !items-center !bg-blue-500 !bg-opacity-20 !rounded-full !w-12 !h-12">
                     <User size={24} />
                  </div>
                  <div>
                     <h2 className="!font-bold !text-xl">{patientInfo.name}</h2>
                     <p className="!opacity-90">{patientInfo.age} años • Tipo {patientInfo.bloodType}</p>
                  </div>
               </div>
               <button
                  onClick={onClose}
                  className="flex justify-center items-center bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full w-10 h-10 transition-colors"
               >
                  <X className='text-red-500' size={20} />
               </button>
            </div>

            {/* Content */}
            <div className="!p-6 !pb-20 !h-full !overflow-y-auto">
               {/* Risk Level & Adherence */}
               <div className="!gap-4 !grid !grid-cols-1 sm:!grid-cols-2 !mb-6">
                  <div className={`rounded-lg p-4 ${getRiskColor(patientInfo.riskLevel)}`}>
                     <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={16} />
                        <span className="font-medium">Nivel de Riesgo</span>
                     </div>
                     <p className="font-bold text-lg capitalize">{patientInfo.riskLevel}</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg text-blue-600">
                     <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={16} />
                        <span className="font-medium">Adherencia</span>
                     </div>
                     <p className="font-bold text-lg">{patientInfo.adherence}%</p>
                  </div>
               </div>

               {/* Allergies */}
               <InfoSection title="Alergias">
                  <div className="flex flex-wrap gap-2">
                     {patientInfo.allergies.map((allergy, index) => (
                        <span key={index} className="bg-red-100 px-3 py-1 rounded-full font-medium text-red-800 text-sm">
                           {allergy}
                        </span>
                     ))}
                  </div>
               </InfoSection>

               {/* Chronic Conditions */}
               <InfoSection title="Condiciones Crónicas">
                  <div className="space-y-2">
                     {patientInfo.chronicConditions.map((condition, index) => (
                        <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                           <Activity size={16} className="text-blue-600" />
                           <span className="text-gray-900">{condition}</span>
                        </div>
                     ))}
                  </div>
               </InfoSection>

               {/* Current Medications */}
               <InfoSection title="Medicamentos Actuales">
                  <div className="space-y-2">
                     {patientInfo.currentMedications.map((medication, index) => (
                        <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                           <Pill size={16} className="text-green-600" />
                           <span className="text-gray-900">{medication}</span>
                        </div>
                     ))}
                  </div>
               </InfoSection>

               {/* Recent Vitals */}
               <InfoSection title="Signos Vitales Recientes">
                  <VitalsGrid vitals={patientInfo.recentVitals} />
               </InfoSection>

               {/* Lab Results */}
               <InfoSection title="Laboratorios Recientes">
                  <LabsGrid labs={patientInfo.recentLabs} />
               </InfoSection>

               {/* Treatment Plan */}
               <InfoSection title="Plan de Tratamiento">
                  <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
                     <p className="text-blue-900">{patientInfo.treatmentPlan}</p>
                  </div>
               </InfoSection>

               {/* Alerts */}
               <InfoSection title="Alertas Activas">
                  <AlertsList alerts={patientInfo.alerts} />
               </InfoSection>

               {/* Last Session */}
               <InfoSection title="Última Sesión">
                  <div className="!flex !items-center !gap-3 !bg-gray-50 !p-4 !rounded-lg">
                     <Clock size={20} className="text-gray-600" />
                     <div>
                        <p className="font-medium text-gray-900">
                           {new Date(patientInfo.lastSession)
                              .toLocaleDateString('es-ES', {
                                 weekday: 'long',
                                 year: 'numeric',
                                 month: 'long',
                                 day: 'numeric'
                              })}
                        </p>
                        <p className="text-gray-600 text-sm">
                           {new Date(patientInfo.lastSession)
                              .toLocaleTimeString('es-ES', {
                                 hour: '2-digit',
                                 minute: '2-digit'
                              })}
                        </p>
                     </div>
                  </div>
               </InfoSection>
            </div>
         </div>
      </>
   );
}
