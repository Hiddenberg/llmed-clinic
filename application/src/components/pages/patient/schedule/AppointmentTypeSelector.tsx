import {
   Stethoscope, Droplets, FileText
} from 'lucide-react';

interface AppointmentTypeOption {
   label: string;
   duration: number;
   description: string;
}

interface AppointmentTypeSelectorProps {
   appointmentTypes: Record<string, AppointmentTypeOption>;
   selectedType?: string;
   onSelect: (type: 'consultation' | 'hemodialysis' | 'follow-up') => void;
}

const typeIcons = {
   consultation: Stethoscope,
   hemodialysis: Droplets,
   'follow-up': FileText
};

const typeColors = {
   consultation: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      hoverBg: 'hover:bg-green-100',
      hoverBorder: 'hover:border-green-300',
      icon: 'text-green-600',
      selectedBg: 'bg-green-100',
      selectedBorder: 'border-green-500'
   },
   hemodialysis: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      hoverBg: 'hover:bg-blue-100',
      hoverBorder: 'hover:border-blue-300',
      icon: 'text-blue-600',
      selectedBg: 'bg-blue-100',
      selectedBorder: 'border-blue-500'
   },
   'follow-up': {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      hoverBg: 'hover:bg-amber-100',
      hoverBorder: 'hover:border-amber-300',
      icon: 'text-amber-600',
      selectedBg: 'bg-amber-100',
      selectedBorder: 'border-amber-500'
   }
};

export default function AppointmentTypeSelector ({
   appointmentTypes,
   selectedType,
   onSelect
}: AppointmentTypeSelectorProps) {
   return (
      <div className="space-y-6">
         <div className="text-center">
            <h2 className="mb-2 font-bold text-gray-900 text-2xl">
               ¿Qué tipo de cita necesitas?
            </h2>
            <p className="text-gray-600">
               Selecciona el tipo de consulta o tratamiento que requieres
            </p>
         </div>

         <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(appointmentTypes)
               .map(([type, config]) => {
                  const IconComponent = typeIcons[type as keyof typeof typeIcons];
                  const colors = typeColors[type as keyof typeof typeColors];
                  const isSelected = selectedType === type;

                  return (
                     <button
                        key={type}
                        onClick={() => onSelect(type as 'consultation' | 'hemodialysis' | 'follow-up')}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 text-left group ${
                           isSelected
                              ? `${colors.selectedBg} ${colors.selectedBorder}`
                              : `${colors.bg} ${colors.border} ${colors.hoverBg} ${colors.hoverBorder}`
                        }`}
                     >
                        <div className="flex items-center gap-4 mb-4">
                           <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center ${
                              isSelected ? colors.selectedBg : 'group-hover:bg-white'
                           }`}
                           >
                              <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                           </div>
                           <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-lg">
                                 {config.label}
                              </h3>
                              <p className="text-gray-500 text-sm">
                                 {config.duration} minutos
                              </p>
                           </div>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed">
                           {config.description}
                        </p>

                        {isSelected && (
                        <div className="flex items-center gap-2 mt-4 text-green-600">
                           <div className="flex justify-center items-center bg-green-500 rounded-full w-5 h-5">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                           </div>
                           <span className="font-medium text-sm">Seleccionado</span>
                        </div>
                        )}
                     </button>
                  );
               })}
         </div>

         <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
               <div className="flex justify-center items-center bg-blue-500 mt-0.5 rounded-full w-5 h-5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
               </div>
               <div>
                  <h4 className="mb-1 font-medium text-blue-900 text-sm">
                     Información importante
                  </h4>
                  <p className="text-blue-800 text-sm">
                     Las citas de hemodiálisis requieren autorización médica previa.
                     Si es tu primera vez, selecciona &quot;Consulta Médica&quot; para evaluación inicial.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
