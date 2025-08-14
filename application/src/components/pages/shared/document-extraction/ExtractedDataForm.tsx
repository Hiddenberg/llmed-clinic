"use client"

import { useState, useEffect, useCallback } from 'react';
import { 
   User, Phone, Heart, Pill, TestTube, Activity, 
   FileText, AlertTriangle, CheckCircle, Edit3, Save
} from 'lucide-react';
import { ExtractedPatientData, FieldAnimationState } from './types';
import AnimatedField from './AnimatedField';

interface ExtractedDataFormProps {
   extractedData: ExtractedPatientData;
   onConfirm: () => void;
   onEdit: (updatedData: ExtractedPatientData) => void;
}

export default function ExtractedDataForm({ extractedData, onConfirm, onEdit }: ExtractedDataFormProps) {
   const [activeTab, setActiveTab] = useState('personal');
   const [isAnimating, setIsAnimating] = useState(true);
   const [animationState, setAnimationState] = useState<FieldAnimationState>({});
   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState<ExtractedPatientData>(extractedData);

   // Animation sequence for filling fields
   useEffect(() => {
      if (!isAnimating) return;

      const fieldsWithTabs = [
         // Personal info fields
         { field: 'fullName', tab: 'personal' },
         { field: 'dateOfBirth', tab: 'personal' },
         { field: 'gender', tab: 'personal' },
         { field: 'phone', tab: 'personal' },
         { field: 'email', tab: 'personal' },
         { field: 'address', tab: 'personal' },
         { field: 'mrn', tab: 'personal' },
         { field: 'bloodType', tab: 'personal' },
         { field: 'emergencyContactName', tab: 'personal' },
         { field: 'emergencyContactPhone', tab: 'personal' },
         { field: 'insuranceProvider', tab: 'personal' },
         // Medical history fields
         { field: 'medicalHistory', tab: 'medical' },
         { field: 'allergies', tab: 'medical' },
         // Medications
         { field: 'medications', tab: 'medications' },
         // Lab results
         { field: 'labResults', tab: 'labs' },
         // Vital signs
         { field: 'vitalSigns', tab: 'vitals' },
         // Clinical notes
         { field: 'clinicalNotes', tab: 'notes' }
      ];

      let currentFieldIndex = 0;
      const animateNextField = () => {
         if (currentFieldIndex >= fieldsWithTabs.length) {
            setIsAnimating(false);
            return;
         }

         const { field: fieldId, tab } = fieldsWithTabs[currentFieldIndex];
         
         // Switch to the appropriate tab
         setActiveTab(tab);
         
         // Start animation
         setAnimationState(prev => ({
            ...prev,
            [fieldId]: { isAnimating: true, isCompleted: false }
         }));

         // Complete animation after delay (faster now)
         setTimeout(() => {
            setAnimationState(prev => ({
               ...prev,
               [fieldId]: { isAnimating: false, isCompleted: true }
            }));
            
            currentFieldIndex++;
            setTimeout(animateNextField, 100); // Faster delay between fields
         }, 400 + Math.random() * 200); // Faster duration for each field
      };

      // Start animation sequence after a brief delay
      setTimeout(animateNextField, 300);
   }, [isAnimating]);

   const handleEdit = useCallback(() => {
      setIsEditing(true);
   }, []);

   const handleSave = useCallback(() => {
      setIsEditing(false);
      onEdit(editedData);
   }, [editedData, onEdit]);

   const handleCancel = useCallback(() => {
      setIsEditing(false);
      setEditedData(extractedData);
   }, [extractedData]);

   const tabs = [
      { id: 'personal', label: 'Información Personal', icon: User },
      { id: 'medical', label: 'Historia Médica', icon: FileText },
      { id: 'medications', label: 'Medicamentos', icon: Pill },
      { id: 'labs', label: 'Laboratorios', icon: TestTube },
      { id: 'vitals', label: 'Signos Vitales', icon: Heart },
      { id: 'notes', label: 'Notas Clínicas', icon: Activity }
   ];

   // Check if any field in a tab is currently being filled
   const isTabBeingFilled = useCallback((tabId: string) => {
      const tabFields = {
         personal: ['fullName', 'dateOfBirth', 'gender', 'phone', 'email', 'address', 'mrn', 'bloodType', 'emergencyContactName', 'emergencyContactPhone', 'insuranceProvider'],
         medical: ['medicalHistory', 'allergies'],
         medications: ['medications'],
         labs: ['labResults'],
         vitals: ['vitalSigns'],
         notes: ['clinicalNotes']
      };

      const fields = tabFields[tabId as keyof typeof tabFields] || [];
      return fields.some(field => animationState[field]?.isAnimating);
   }, [animationState]);

   // Check if all fields in a tab are completed
   const isTabCompleted = useCallback((tabId: string) => {
      const tabFields = {
         personal: ['fullName', 'dateOfBirth', 'gender', 'phone', 'email', 'address', 'mrn', 'bloodType', 'emergencyContactName', 'emergencyContactPhone', 'insuranceProvider'],
         medical: ['medicalHistory', 'allergies'],
         medications: ['medications'],
         labs: ['labResults'],
         vitals: ['vitalSigns'],
         notes: ['clinicalNotes']
      };

      const fields = tabFields[tabId as keyof typeof tabFields] || [];
      return fields.length > 0 && fields.every(field => animationState[field]?.isCompleted);
   }, [animationState]);

   return (
      <div className="space-y-6">
         {/* Header */}
         <div className="bg-white/60 shadow-lg backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
               <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={28} />
                  <div>
                     <h2 className="font-bold text-gray-800 text-2xl">Datos Extraídos</h2>
                     <p className="text-gray-600">
                        Documento: {extractedData.documentInfo.fileName} • 
                        Confianza: {Math.round(extractedData.documentInfo.confidence * 100)}%
                     </p>
                  </div>
               </div>
               
               <div className="flex gap-3">
                  {!isEditing ? (
                     <button
                        onClick={handleEdit}
                        className="inline-flex items-center gap-2 bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg text-white transition-colors"
                     >
                        <Edit3 size={16} />
                        Editar
                     </button>
                  ) : (
                     <>
                        <button
                           onClick={handleCancel}
                           className="inline-flex items-center gap-2 bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg text-white transition-colors"
                        >
                           Cancelar
                        </button>
                        <button
                           onClick={handleSave}
                           className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white transition-colors"
                        >
                           <Save size={16} />
                           Guardar
                        </button>
                     </>
                  )}
                  
                  {!isAnimating && !isEditing && (
                     <button
                        onClick={onConfirm}
                        className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 px-6 py-2 rounded-lg text-white transition-colors"
                     >
                        <CheckCircle size={16} />
                        Confirmar y Procesar
                     </button>
                  )}
               </div>
            </div>

            {/* Animation Status */}
            {isAnimating && (
               <div className="bg-gradient-to-r from-brand-50 to-blue-50 shadow-sm p-4 border border-brand-300 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                     <div className="flex items-center gap-2">
                        <div className="relative">
                           <div className="absolute bg-brand-500 rounded-full w-3 h-3 animate-ping" />
                           <div className="bg-brand-600 rounded-full w-3 h-3" />
                        </div>
                        <span className="font-semibold text-brand-800 text-sm">
                           IA procesando información médica
                        </span>
                     </div>
                     <div className="bg-brand-100 px-3 py-1 rounded-full">
                        <span className="font-medium text-brand-700 text-xs">EN PROGRESO</span>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                     <div className="bg-brand-200 rounded-full w-full h-2 overflow-hidden">
                        <div className="bg-brand-500 rounded-full w-1/3 h-full animate-pulse" />
                     </div>
                     <span className="font-medium text-brand-600 text-xs whitespace-nowrap">Llenando...</span>
                  </div>
                  
                  <p className="text-brand-700 text-xs">
                     <span className="font-medium">Sección actual:</span> {tabs.find(tab => tab.id === activeTab)?.label || 'Información del paciente'}
                  </p>
               </div>
            )}
         </div>

         {/* Tabs */}
         <div className="bg-white/40 shadow-sm backdrop-blur-sm border border-white/50 rounded-2xl overflow-hidden">
            <div className="flex flex-wrap border-gray-200/50 border-b">
               {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isBeingFilled = isTabBeingFilled(tab.id);
                  const isCompleted = isTabCompleted(tab.id);
                  const isActive = activeTab === tab.id;
                  
                  return (
                     <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all ${
                           isActive
                              ? 'bg-brand-50 border-brand-500 border-b-2 text-brand-700'
                              : isCompleted
                                 ? 'text-green-600 hover:text-green-700 hover:bg-green-50/50'
                                 : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50/50'
                        } ${isBeingFilled && isAnimating ? 'animate-pulse' : ''}`}
                     >
                        <div className="flex items-center gap-2">
                           <Icon size={16} />
                           {isBeingFilled && isAnimating && (
                              <div className="bg-brand-500 rounded-full w-2 h-2 animate-pulse" />
                           )}
                           {isCompleted && !isBeingFilled && (
                              <CheckCircle size={14} className="text-green-500" />
                           )}
                        </div>
                        {tab.label}
                     </button>
                  );
               })}
            </div>

            {/* Tab Content */}
            <div className="p-6">
               {activeTab === 'personal' && (
                  <div className="space-y-6">
                     <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
                        <User size={20} className="text-brand-500" />
                        Información Personal
                     </h3>
                     
                     <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
                        <AnimatedField
                           label="Nombre Completo"
                           value={isEditing ? editedData.personalInfo.fullName : extractedData.personalInfo.fullName}
                           animationState={animationState.fullName}
                           isEditing={isEditing}
                           onChange={(value) => setEditedData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, fullName: value }
                           }))}
                        />
                        
                        <AnimatedField
                           label="Fecha de Nacimiento"
                           value={isEditing ? editedData.personalInfo.dateOfBirth : extractedData.personalInfo.dateOfBirth}
                           animationState={animationState.dateOfBirth}
                           isEditing={isEditing}
                           type="date"
                           onChange={(value) => setEditedData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, dateOfBirth: value }
                           }))}
                        />
                        
                        <AnimatedField
                           label="Género"
                           value={isEditing ? editedData.personalInfo.gender : extractedData.personalInfo.gender}
                           animationState={animationState.gender}
                           isEditing={isEditing}
                           type="select"
                           options={[
                              { value: 'male', label: 'Masculino' },
                              { value: 'female', label: 'Femenino' },
                              { value: 'other', label: 'Otro' }
                           ]}
                           onChange={(value) => setEditedData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, gender: value as 'male' | 'female' | 'other' }
                           }))}
                        />
                        
                        <AnimatedField
                           label="Teléfono"
                           value={isEditing ? editedData.personalInfo.phone : extractedData.personalInfo.phone}
                           animationState={animationState.phone}
                           isEditing={isEditing}
                           onChange={(value) => setEditedData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, phone: value }
                           }))}
                        />
                        
                        <AnimatedField
                           label="Email"
                           value={isEditing ? editedData.personalInfo.email : extractedData.personalInfo.email}
                           animationState={animationState.email}
                           isEditing={isEditing}
                           type="email"
                           onChange={(value) => setEditedData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, email: value }
                           }))}
                        />
                        
                        <AnimatedField
                           label="Dirección"
                           value={isEditing ? editedData.personalInfo.address : extractedData.personalInfo.address}
                           animationState={animationState.address}
                           isEditing={isEditing}
                           onChange={(value) => setEditedData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, address: value }
                           }))}
                        />
                        
                        <AnimatedField
                           label="MRN"
                           value={isEditing ? editedData.personalInfo.mrn : extractedData.personalInfo.mrn}
                           animationState={animationState.mrn}
                           isEditing={isEditing}
                           onChange={(value) => setEditedData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, mrn: value }
                           }))}
                        />
                        
                        <AnimatedField
                           label="Tipo de Sangre"
                           value={isEditing ? editedData.personalInfo.bloodType : extractedData.personalInfo.bloodType}
                           animationState={animationState.bloodType}
                           isEditing={isEditing}
                           onChange={(value) => setEditedData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, bloodType: value }
                           }))}
                        />
                     </div>

                     {/* Emergency Contact */}
                     <div className="space-y-4">
                        <h4 className="font-semibold text-gray-700">Contacto de Emergencia</h4>
                        <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
                           <AnimatedField
                              label="Nombre"
                              value={isEditing ? editedData.personalInfo.emergencyContact.name : extractedData.personalInfo.emergencyContact.name}
                              animationState={animationState.emergencyContactName}
                              isEditing={isEditing}
                              onChange={(value) => setEditedData(prev => ({
                                 ...prev,
                                 personalInfo: { 
                                    ...prev.personalInfo, 
                                    emergencyContact: { ...prev.personalInfo.emergencyContact, name: value }
                                 }
                              }))}
                           />
                           
                           <AnimatedField
                              label="Teléfono"
                              value={isEditing ? editedData.personalInfo.emergencyContact.phone : extractedData.personalInfo.emergencyContact.phone}
                              animationState={animationState.emergencyContactPhone}
                              isEditing={isEditing}
                              onChange={(value) => setEditedData(prev => ({
                                 ...prev,
                                 personalInfo: { 
                                    ...prev.personalInfo, 
                                    emergencyContact: { ...prev.personalInfo.emergencyContact, phone: value }
                                 }
                              }))}
                           />
                        </div>
                     </div>

                     {/* Insurance */}
                     <div className="space-y-4">
                        <h4 className="font-semibold text-gray-700">Información del Seguro</h4>
                        <div className="gap-4 grid grid-cols-1 lg:grid-cols-3">
                           <AnimatedField
                              label="Proveedor"
                              value={isEditing ? editedData.personalInfo.insurance.provider : extractedData.personalInfo.insurance.provider}
                              animationState={animationState.insuranceProvider}
                              isEditing={isEditing}
                              onChange={(value) => setEditedData(prev => ({
                                 ...prev,
                                 personalInfo: { 
                                    ...prev.personalInfo, 
                                    insurance: { ...prev.personalInfo.insurance, provider: value }
                                 }
                              }))}
                           />
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === 'medical' && (
                  <div className="space-y-6">
                     <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
                        <FileText size={20} className="text-red-500" />
                        Historia Médica
                     </h3>
                     
                     <AnimatedField
                        label="Condiciones Médicas"
                        value={extractedData.medicalHistory.map(h => h.condition).join(', ')}
                        animationState={animationState.medicalHistory}
                        isEditing={false}
                        type="textarea"
                     />

                     <div className="space-y-4">
                        {extractedData.medicalHistory.map((condition, index) => (
                           <div key={index} className="bg-red-50/50 p-4 border border-red-200/50 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                 <h4 className="font-semibold text-red-800">{condition.condition}</h4>
                                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    condition.severity === 'severe' ? 'bg-red-100 text-red-700' :
                                    condition.severity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                 }`}>
                                    {condition.severity === 'severe' ? 'Severa' :
                                     condition.severity === 'moderate' ? 'Moderada' : 'Leve'}
                                 </span>
                              </div>
                              <p className="mb-2 text-red-700 text-sm">Código ICD-10: {condition.icd10Code}</p>
                              <p className="text-red-600 text-sm">{condition.notes}</p>
                              <p className="mt-2 text-red-600 text-xs">
                                 Diagnóstico: {new Date(condition.diagnosisDate).toLocaleDateString('es-ES')}
                              </p>
                           </div>
                        ))}
                     </div>

                     {/* Allergies */}
                     <div className="space-y-4">
                        <h4 className="flex items-center gap-2 font-semibold text-gray-700">
                           <AlertTriangle size={16} className="text-orange-500" />
                           Alergias
                        </h4>
                        <AnimatedField
                           label="Alergias Conocidas"
                           value={extractedData.allergies.map(a => a.allergen).join(', ')}
                           animationState={animationState.allergies}
                           isEditing={false}
                        />
                        
                        {extractedData.allergies.map((allergy, index) => (
                           <div key={index} className="bg-orange-50/50 p-4 border border-orange-200/50 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                 <h5 className="font-semibold text-orange-800">{allergy.allergen}</h5>
                                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    allergy.severity === 'severe' ? 'bg-red-100 text-red-700' :
                                    allergy.severity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                 }`}>
                                    {allergy.severity === 'severe' ? 'Severa' :
                                     allergy.severity === 'moderate' ? 'Moderada' : 'Leve'}
                                 </span>
                              </div>
                              <p className="text-orange-700 text-sm">{allergy.reaction}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {activeTab === 'medications' && (
                  <div className="space-y-6">
                     <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
                        <Pill size={20} className="text-blue-500" />
                        Medicamentos
                     </h3>
                     
                     <AnimatedField
                        label="Medicamentos Actuales"
                        value={extractedData.medications.map(m => m.name).join(', ')}
                        animationState={animationState.medications}
                        isEditing={false}
                        type="textarea"
                     />

                     <div className="space-y-4">
                        {extractedData.medications.map((medication, index) => (
                           <div key={index} className="bg-blue-50/50 p-4 border border-blue-200/50 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                 <h4 className="font-semibold text-blue-800">{medication.name}</h4>
                                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    medication.status === 'active' ? 'bg-green-100 text-green-700' :
                                    'bg-gray-100 text-gray-700'
                                 }`}>
                                    {medication.status === 'active' ? 'Activo' : 'Inactivo'}
                                 </span>
                              </div>
                              <div className="gap-4 grid grid-cols-2 lg:grid-cols-4 mb-2 text-sm">
                                 <div>
                                    <span className="font-medium text-blue-600">Dosis:</span>
                                    <p className="text-blue-800">{medication.dosage}</p>
                                 </div>
                                 <div>
                                    <span className="font-medium text-blue-600">Frecuencia:</span>
                                    <p className="text-blue-800">{medication.frequency}</p>
                                 </div>
                                 <div>
                                    <span className="font-medium text-blue-600">Vía:</span>
                                    <p className="text-blue-800">{medication.route}</p>
                                 </div>
                                 <div>
                                    <span className="font-medium text-blue-600">Prescrito por:</span>
                                    <p className="text-blue-800">{medication.prescribedBy}</p>
                                 </div>
                              </div>
                              <p className="text-blue-700 text-sm">
                                 <span className="font-medium">Indicación:</span> {medication.indication}
                              </p>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {activeTab === 'labs' && (
                  <div className="space-y-6">
                     <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
                        <TestTube size={20} className="text-purple-500" />
                        Resultados de Laboratorio
                     </h3>
                     
                     <AnimatedField
                        label="Estudios de Laboratorio"
                        value={extractedData.labResults.map(l => `${l.testName}: ${l.value} ${l.unit}`).join(', ')}
                        animationState={animationState.labResults}
                        isEditing={false}
                        type="textarea"
                     />

                     <div className="space-y-4">
                        {extractedData.labResults.map((result, index) => (
                           <div key={index} className="bg-purple-50/50 p-4 border border-purple-200/50 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                 <h4 className="font-semibold text-purple-800">{result.testName}</h4>
                                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    result.status === 'normal' ? 'bg-green-100 text-green-700' :
                                    result.status === 'critical' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                                 }`}>
                                    {result.status === 'normal' ? 'Normal' :
                                     result.status === 'critical' ? 'Crítico' : 'Anormal'}
                                 </span>
                              </div>
                              <div className="gap-4 grid grid-cols-1 lg:grid-cols-3 mb-2 text-sm">
                                 <div>
                                    <span className="font-medium text-purple-600">Valor:</span>
                                    <p className="text-purple-800">{result.value} {result.unit}</p>
                                 </div>
                                 <div>
                                    <span className="font-medium text-purple-600">Rango de Referencia:</span>
                                    <p className="text-purple-800">{result.referenceRange}</p>
                                 </div>
                                 <div>
                                    <span className="font-medium text-purple-600">Fecha:</span>
                                    <p className="text-purple-800">{new Date(result.date).toLocaleDateString('es-ES')}</p>
                                 </div>
                              </div>
                              {result.notes && (
                                 <p className="text-purple-700 text-sm">
                                    <span className="font-medium">Notas:</span> {result.notes}
                                 </p>
                              )}
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {activeTab === 'vitals' && (
                  <div className="space-y-6">
                     <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
                        <Heart size={20} className="text-red-500" />
                        Signos Vitales
                     </h3>
                     
                     <AnimatedField
                        label="Fecha de Registro"
                        value={extractedData.vitalSigns.date}
                        animationState={animationState.vitalSigns}
                        isEditing={false}
                        type="date"
                     />

                     <div className="gap-4 grid grid-cols-2 lg:grid-cols-4">
                        <div className="bg-red-50/50 p-4 border border-red-200/50 rounded-lg text-center">
                           <h4 className="font-semibold text-red-800 text-sm">Presión Arterial</h4>
                           <p className="font-bold text-red-700 text-lg">
                              {extractedData.vitalSigns.systolicBP}/{extractedData.vitalSigns.diastolicBP}
                           </p>
                           <p className="text-red-600 text-xs">mmHg</p>
                        </div>
                        
                        <div className="bg-blue-50/50 p-4 border border-blue-200/50 rounded-lg text-center">
                           <h4 className="font-semibold text-blue-800 text-sm">Frecuencia Cardíaca</h4>
                           <p className="font-bold text-blue-700 text-lg">{extractedData.vitalSigns.heartRate}</p>
                           <p className="text-blue-600 text-xs">lpm</p>
                        </div>
                        
                        <div className="bg-green-50/50 p-4 border border-green-200/50 rounded-lg text-center">
                           <h4 className="font-semibold text-green-800 text-sm">Temperatura</h4>
                           <p className="font-bold text-green-700 text-lg">{extractedData.vitalSigns.temperature}</p>
                           <p className="text-green-600 text-xs">°C</p>
                        </div>
                        
                        <div className="bg-purple-50/50 p-4 border border-purple-200/50 rounded-lg text-center">
                           <h4 className="font-semibold text-purple-800 text-sm">Peso</h4>
                           <p className="font-bold text-purple-700 text-lg">{extractedData.vitalSigns.weight}</p>
                           <p className="text-purple-600 text-xs">kg</p>
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === 'notes' && (
                  <div className="space-y-6">
                     <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
                        <Activity size={20} className="text-green-500" />
                        Notas Clínicas
                     </h3>
                     
                     <AnimatedField
                        label="Notas del Médico"
                        value={extractedData.clinicalNotes.map(n => n.assessment).join('\n\n')}
                        animationState={animationState.clinicalNotes}
                        isEditing={false}
                        type="textarea"
                     />

                     <div className="space-y-4">
                        {extractedData.clinicalNotes.map((note, index) => (
                           <div key={index} className="bg-green-50/50 p-6 border border-green-200/50 rounded-lg">
                              <div className="flex justify-between items-start mb-4">
                                 <div>
                                    <h4 className="font-semibold text-green-800">{note.author}</h4>
                                    <p className="text-green-600 text-sm">{note.specialty}</p>
                                 </div>
                                 <div className="text-green-600 text-sm text-right">
                                    <p>{new Date(note.date).toLocaleDateString('es-ES')}</p>
                                    <p className="capitalize">{note.type}</p>
                                 </div>
                              </div>
                              
                              {note.chiefComplaint && (
                                 <div className="mb-3">
                                    <h5 className="font-medium text-green-800 text-sm">Motivo de Consulta:</h5>
                                    <p className="text-green-700 text-sm">{note.chiefComplaint}</p>
                                 </div>
                              )}
                              
                              <div className="mb-3">
                                 <h5 className="font-medium text-green-800 text-sm">Evaluación:</h5>
                                 <p className="text-green-700 text-sm">{note.assessment}</p>
                              </div>
                              
                              <div className="mb-3">
                                 <h5 className="font-medium text-green-800 text-sm">Plan:</h5>
                                 <p className="text-green-700 text-sm">{note.plan}</p>
                              </div>
                              
                              {note.followUp && (
                                 <div>
                                    <h5 className="font-medium text-green-800 text-sm">Seguimiento:</h5>
                                    <p className="text-green-700 text-sm">{note.followUp}</p>
                                 </div>
                              )}
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
