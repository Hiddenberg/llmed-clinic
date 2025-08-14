import {
   Heart, Scale, Thermometer, Activity, Save, Edit3,
   LucideIcon
} from 'lucide-react';
import { useState } from 'react';

interface VitalsInputProps {
   vitals?: {
      bloodPressure: string;
      heartRate: number;
      weight: number;
      temperature: number;
   };
}

function VitalCard ({
   icon: Icon,
   label,
   value,
   unit,
   color,
   isEditing,
   onEdit,
   onChange
}: {
   icon: LucideIcon;
   label: string;
   value: string | number;
   unit: string;
   color: string;
   isEditing: boolean;
   onEdit: () => void;
   onChange: (value: string) => void;
}) {
   return (
      <div className="bg-white p-4 border border-gray-200 rounded-xl">
         <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
               <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
                  <Icon size={16} />
               </div>
               <span className="font-medium text-gray-900 text-sm">{label}</span>
            </div>
            <button
               onClick={onEdit}
               className="text-gray-400 hover:text-gray-600 transition-colors"
            >
               <Edit3 size={14} />
            </button>
         </div>

         {isEditing ? (
            <input
               type="text"
               value={value}
               onChange={(e) => onChange(e.target.value)}
               className="bg-gray-50 px-3 py-2 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full font-bold text-gray-900 text-lg"
               onBlur={onEdit}
               autoFocus
            />
         ) : (
            <div>
               <p className="font-bold text-gray-900 text-2xl">{value}</p>
               <p className="text-gray-500 text-sm">{unit}</p>
            </div>
         )}
      </div>
   );
}

export default function VitalsInput ({ vitals }: VitalsInputProps) {
   const [currentVitals, setCurrentVitals] = useState({
      bloodPressure: vitals?.bloodPressure || '',
      heartRate: vitals?.heartRate?.toString() || '',
      weight: vitals?.weight?.toString() || '',
      temperature: vitals?.temperature?.toString() || ''
   });

   const [editingField, setEditingField] = useState<string | null>(null);
   const [hasChanges, setHasChanges] = useState(false);

   const handleEdit = (field: string) => {
      setEditingField(editingField === field ? null : field);
   };

   const handleChange = (field: string, value: string) => {
      setCurrentVitals(prev => ({
         ...prev,
         [field]: value
      }));
      setHasChanges(true);
   };

   const handleSave = () => {
      // Here you would save the vitals to your backend
      console.log('Saving vitals:', currentVitals);
      setHasChanges(false);
      setEditingField(null);
   };

   const vitalConfigs = [
      {
         key: 'bloodPressure',
         icon: Heart,
         label: 'Presión Arterial',
         unit: 'mmHg',
         color: 'bg-red-100 text-red-600'
      },
      {
         key: 'heartRate',
         icon: Activity,
         label: 'Frecuencia Cardíaca',
         unit: 'bpm',
         color: 'bg-blue-100 text-blue-600'
      },
      {
         key: 'weight',
         icon: Scale,
         label: 'Peso',
         unit: 'kg',
         color: 'bg-green-100 text-green-600'
      },
      {
         key: 'temperature',
         icon: Thermometer,
         label: 'Temperatura',
         unit: '°C',
         color: 'bg-orange-100 text-orange-600'
      }
   ];

   return (
      <div className="bg-gray-50 p-6 border border-gray-200 rounded-xl">
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900 text-lg">Signos Vitales</h3>
            {hasChanges && (
               <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition-colors"
               >
                  <Save size={16} />
                  Guardar
               </button>
            )}
         </div>

         <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {vitalConfigs.map((config) => (
               <VitalCard
                  key={config.key}
                  icon={config.icon}
                  label={config.label}
                  value={currentVitals[config.key as keyof typeof currentVitals]}
                  unit={config.unit}
                  color={config.color}
                  isEditing={editingField === config.key}
                  onEdit={() => handleEdit(config.key)}
                  onChange={(value) => handleChange(config.key, value)}
               />
            ))}
         </div>

         {/* Quick Actions */}
         <div className="gap-3 grid grid-cols-1 md:grid-cols-3">
            <button
               onClick={() => {
                  const bp = prompt('Ingrese presión arterial (ej: 120/80):');
                  if (bp) handleChange('bloodPressure', bp);
               }}
               className="flex justify-center items-center gap-2 bg-white hover:bg-gray-50 p-3 border border-gray-200 rounded-lg transition-colors"
            >
               <Activity size={16} className="text-blue-600" />
               <span className="font-medium text-gray-900 text-sm">Tomar PA</span>
            </button>

            <button
               onClick={() => {
                  const weight = prompt('Ingrese peso en kg:');
                  if (weight && !isNaN(Number(weight))) handleChange('weight', weight);
               }}
               className="flex justify-center items-center gap-2 bg-white hover:bg-gray-50 p-3 border border-gray-200 rounded-lg transition-colors"
            >
               <Scale size={16} className="text-green-600" />
               <span className="font-medium text-gray-900 text-sm">Pesar Paciente</span>
            </button>

            <button
               onClick={() => {
                  const temp = prompt('Ingrese temperatura en °C:');
                  if (temp && !isNaN(Number(temp))) handleChange('temperature', temp);
               }}
               className="flex justify-center items-center gap-2 bg-white hover:bg-gray-50 p-3 border border-gray-200 rounded-lg transition-colors"
            >
               <Thermometer size={16} className="text-orange-600" />
               <span className="font-medium text-gray-900 text-sm">Temp. Corporal</span>
            </button>
         </div>

         {/* Historical Comparison */}
         <div className="bg-white mt-6 p-4 border border-gray-200 rounded-lg">
            <h4 className="mb-3 font-medium text-gray-900">Comparación con Última Sesión</h4>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-4 text-sm">
               <div>
                  <p className="text-gray-600">Presión Arterial</p>
                  <p className="font-medium">150/90 → {currentVitals.bloodPressure || '---'}</p>
                  <p className="text-green-600 text-xs">↓ Mejora</p>
               </div>
               <div>
                  <p className="text-gray-600">Frecuencia Cardíaca</p>
                  <p className="font-medium">82 → {currentVitals.heartRate || '---'} bpm</p>
                  <p className="text-blue-600 text-xs">→ Estable</p>
               </div>
               <div>
                  <p className="text-gray-600">Peso</p>
                  <p className="font-medium">69.2 → {currentVitals.weight || '---'} kg</p>
                  <p className="text-yellow-600 text-xs">↓ -0.7 kg</p>
               </div>
               <div>
                  <p className="text-gray-600">Temperatura</p>
                  <p className="font-medium">36.4 → {currentVitals.temperature || '---'} °C</p>
                  <p className="text-blue-600 text-xs">→ Normal</p>
               </div>
            </div>
         </div>
      </div>
   );
}
