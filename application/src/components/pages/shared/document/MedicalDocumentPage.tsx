"use client"

import { Calendar, MapPin, Phone, Mail, User, Heart, FileText, Stethoscope } from 'lucide-react';

export default function MedicalDocumentPage() {
   return (
      <div className="bg-white min-h-screen">
         {/* Print Styles */}
         <style jsx>{`
            @media print {
               body { margin: 0; padding: 0; }
               .no-print { display: none !important; }
               .page-break { page-break-before: always; }
            }
         `}</style>

         <div className="mx-auto p-8 max-w-4xl">
            {/* Hospital Header */}
            <div className="mb-8 pb-6 border-gray-300 border-b-2 text-center">
               <div className="flex justify-center items-center gap-3 mb-4">
                  <div className="flex justify-center items-center bg-blue-600 rounded-full w-12 h-12 text-white">
                     <Heart size={24} />
                  </div>
                  <div>
                     <h1 className="font-bold text-blue-800 text-2xl">Hospital General San José</h1>
                     <p className="text-blue-600 text-sm">Centro Médico de Especialidades</p>
                  </div>
               </div>
               <div className="text-gray-600 text-sm">
                  <p>Av. Revolución 1234, Col. Centro, Ciudad de México, C.P. 06000</p>
                  <p>Tel: (55) 1234-5678 | Email: info@hospitalsanjose.mx | RFC: HSJ850101ABC</p>
                  <p>Cédula de Funcionamiento: SSA-DF-2018-001234</p>
               </div>
            </div>

            {/* Document Title */}
            <div className="mb-6 text-center">
               <h2 className="mb-2 font-bold text-gray-800 text-xl">HISTORIA CLÍNICA COMPLETA</h2>
               <div className="flex justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                     <Calendar size={16} className="text-blue-500" />
                     <span>Fecha: 15 de Enero, 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <FileText size={16} className="text-blue-500" />
                     <span>No. Expediente: HC-2024-001</span>
                  </div>
               </div>
            </div>

            {/* Patient Information Section */}
            <div className="bg-gray-50 mb-8 p-6 border border-gray-200 rounded-lg">
               <h3 className="flex items-center gap-2 mb-4 pb-2 border-gray-300 border-b font-semibold text-gray-800 text-lg">
                  <User className="text-blue-500" size={20} />
                  DATOS DEL PACIENTE
               </h3>
               
               <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                  <div className="space-y-3">
                     <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Nombre Completo:</span>
                        <span className="font-semibold text-gray-900">Juan Carlos Pérez González</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Fecha de Nacimiento:</span>
                        <span className="text-gray-900">15 de Agosto, 1975 (48 años)</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Género:</span>
                        <span className="text-gray-900">Masculino</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Estado Civil:</span>
                        <span className="text-gray-900">Casado</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Ocupación:</span>
                        <span className="text-gray-900">Contador Público</span>
                     </div>
                  </div>
                  
                  <div className="space-y-3">
                     <div className="flex justify-between">
                        <span className="font-medium text-gray-700">MRN:</span>
                        <span className="font-semibold text-gray-900">MRN-2024-001</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Tipo de Sangre:</span>
                        <span className="text-gray-900">O+</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Teléfono:</span>
                        <span className="text-gray-900">+52 55 1234 5678</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="text-gray-900">juan.perez@email.com</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="font-medium text-gray-700">NSS:</span>
                        <span className="text-gray-900">12345678901</span>
                     </div>
                  </div>
               </div>

               <div className="mt-4 pt-4 border-gray-300 border-t">
                  <div className="flex justify-between mb-2">
                     <span className="font-medium text-gray-700">Dirección:</span>
                     <span className="text-gray-900">Av. Reforma 123, Col. Centro, CDMX, C.P. 06000</span>
                  </div>
                  <div className="flex justify-between mb-2">
                     <span className="font-medium text-gray-700">Contacto de Emergencia:</span>
                     <span className="text-gray-900">María Elena González (Esposa) - +52 55 9876 5432</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="font-medium text-gray-700">Seguro Médico:</span>
                     <span className="text-gray-900">IMSS - Póliza: POL-123456789 - Grupo: GRP-001</span>
                  </div>
               </div>
            </div>

            {/* Administrative Information */}
            <div className="bg-blue-50 mb-8 p-6 border border-blue-200 rounded-lg">
               <h3 className="mb-4 font-semibold text-blue-800 text-lg">INFORMACIÓN ADMINISTRATIVA</h3>
               <div className="gap-4 grid grid-cols-1 md:grid-cols-3 text-sm">
                  <div>
                     <p><strong>Fecha de Ingreso:</strong> 15/01/2024 - 08:30 hrs</p>
                     <p><strong>Servicio:</strong> Nefrología</p>
                     <p><strong>Cama:</strong> 204-A</p>
                  </div>
                  <div>
                     <p><strong>Médico Tratante:</strong> Dr. Roberto Martínez Hernández</p>
                     <p><strong>Cédula Profesional:</strong> 1234567</p>
                     <p><strong>Especialidad:</strong> Nefrología</p>
                  </div>
                  <div>
                     <p><strong>Médico Residente:</strong> Dra. Ana Patricia López</p>
                     <p><strong>Enfermera Responsable:</strong> Enf. Carmen Rodríguez</p>
                     <p><strong>Turno:</strong> Matutino</p>
                  </div>
               </div>
            </div>

            {/* Current Consultation */}
            <div className="bg-white mb-8 p-6 border-2 border-red-300 rounded-lg">
               <h3 className="flex items-center gap-2 mb-4 font-semibold text-red-800 text-lg">
                  <Stethoscope className="text-red-500" size={20} />
                  CONSULTA ACTUAL - 15 DE ENERO 2024
               </h3>
               
               <div className="mb-6">
                  <h4 className="mb-2 font-medium text-gray-800">Motivo de Consulta:</h4>
                  <p className="text-gray-700 leading-relaxed">
                     Control de rutina de IRC. Paciente refiere sentirse "un poco más cansado de lo usual" en las últimas 2 semanas. 
                     Niega disnea en reposo, pero presenta leve disnea de medianos esfuerzos. Sin edema aparente en extremidades inferiores.
                     Refiere adherencia al tratamiento dialítico 3 veces por semana sin faltas. Apetito conservado, sin náuseas ni vómitos.
                  </p>
               </div>

               <div className="mb-6">
                  <h4 className="mb-2 font-medium text-gray-800">Historia de la Enfermedad Actual:</h4>
                  <p className="text-gray-700 leading-relaxed">
                     Paciente masculino de 48 años con antecedente de Insuficiencia Renal Crónica estadio 5 diagnosticada en marzo 2022, 
                     secundaria a nefropatía diabética e hipertensiva. Inició programa de hemodiálisis en abril 2022. Actualmente recibe 
                     hemodiálisis 3 veces por semana (lunes, miércoles y viernes) de 4 horas cada sesión en turno matutino. 
                     Acceso vascular mediante fístula arteriovenosa braquiocefálica izquierda funcionante desde mayo 2022.
                  </p>
               </div>
            </div>

            {/* Medical History */}
            <div className="mb-8">
               <h3 className="mb-4 pb-2 border-gray-300 border-b font-semibold text-gray-800 text-lg">
                  ANTECEDENTES MÉDICOS PERSONALES
               </h3>
               
               <div className="space-y-4">
                  <div className="bg-red-50 p-4 border-red-400 border-l-4 rounded">
                     <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-red-800">Insuficiencia Renal Crónica Estadio 5</h4>
                        <span className="bg-red-100 px-2 py-1 rounded text-red-700 text-xs">SEVERA - ACTIVA</span>
                     </div>
                     <p className="text-red-700 text-sm">
                        <strong>Diagnóstico:</strong> 15 de Marzo, 2022 | <strong>CIE-10:</strong> N18.6<br/>
                        <strong>Descripción:</strong> Paciente requiere hemodiálisis 3 veces por semana. TFG &lt; 15 ml/min/1.73m²
                     </p>
                  </div>

                  <div className="bg-yellow-50 p-4 border-yellow-400 border-l-4 rounded">
                     <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-yellow-800">Hipertensión Arterial</h4>
                        <span className="bg-yellow-100 px-2 py-1 rounded text-yellow-700 text-xs">MODERADA - ACTIVA</span>
                     </div>
                     <p className="text-yellow-700 text-sm">
                        <strong>Diagnóstico:</strong> 10 de Enero, 2020 | <strong>CIE-10:</strong> I10<br/>
                        <strong>Descripción:</strong> Controlada con medicación. TA promedio 140/85 mmHg
                     </p>
                  </div>

                  <div className="bg-orange-50 p-4 border-orange-400 border-l-4 rounded">
                     <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-orange-800">Diabetes Mellitus Tipo 2</h4>
                        <span className="bg-orange-100 px-2 py-1 rounded text-orange-700 text-xs">MODERADA - ACTIVA</span>
                     </div>
                     <p className="text-orange-700 text-sm">
                        <strong>Diagnóstico:</strong> 20 de Junio, 2018 | <strong>CIE-10:</strong> E11<br/>
                        <strong>Descripción:</strong> HbA1c: 7.2% - Control subóptimo, requiere ajuste de tratamiento
                     </p>
                  </div>
               </div>

               <div className="mt-6">
                  <h4 className="mb-3 font-medium text-gray-800">Otros Antecedentes:</h4>
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-2 text-sm">
                     <div>
                        <p><strong>Quirúrgicos:</strong> Creación de FAV braquiocefálica izq. (Mayo 2022)</p>
                        <p><strong>Traumáticos:</strong> Fractura de radio derecho (2010) - consolidada</p>
                        <p><strong>Transfusionales:</strong> Niega</p>
                     </div>
                     <div>
                        <p><strong>Hospitalizaciones:</strong> 2 en los últimos 2 años por IRC</p>
                        <p><strong>Familiares:</strong> Padre DM2, Madre HAS, Hermano IRC</p>
                        <p><strong>Tóxicos:</strong> Ex-fumador (dejó hace 5 años), alcohol ocasional</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Allergies */}
            <div className="bg-orange-50 mb-8 p-6 border border-orange-200 rounded-lg">
               <h3 className="mb-4 font-semibold text-orange-800 text-lg">ALERGIAS Y REACCIONES ADVERSAS</h3>
               <div className="bg-white p-4 border border-orange-300 rounded">
                  <div className="flex justify-between items-start mb-2">
                     <h4 className="font-semibold text-orange-800">Penicilina</h4>
                     <span className="bg-yellow-100 px-2 py-1 rounded text-yellow-700 text-xs">MODERADA</span>
                  </div>
                  <p className="text-orange-700 text-sm">
                     <strong>Reacción:</strong> Erupción cutánea generalizada<br/>
                     <strong>Fecha de Inicio:</strong> 10 de Marzo, 2015<br/>
                     <strong>Observaciones:</strong> Paciente desarrolló rash eritematoso en tórax y extremidades tras administración de ampicilina
                  </p>
               </div>
            </div>

            {/* Current Medications */}
            <div className="mb-8">
               <h3 className="mb-4 pb-2 border-gray-300 border-b font-semibold text-gray-800 text-lg">
                  MEDICAMENTOS ACTUALES
               </h3>
               
               <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <div className="bg-blue-50 p-4 border border-blue-200 rounded">
                     <h4 className="font-semibold text-blue-800">Losartán 50mg</h4>
                     <div className="mt-2 text-sm">
                        <p><strong>Dosis:</strong> 1 tableta cada 24 horas</p>
                        <p><strong>Vía:</strong> Oral, con alimentos</p>
                        <p><strong>Indicación:</strong> Hipertensión arterial</p>
                        <p><strong>Prescrito por:</strong> Dr. Roberto Martínez</p>
                        <p><strong>Fecha inicio:</strong> 15/01/2020</p>
                     </div>
                  </div>

                  <div className="bg-green-50 p-4 border border-green-200 rounded">
                     <h4 className="font-semibold text-green-800">Metformina 850mg</h4>
                     <div className="mt-2 text-sm">
                        <p><strong>Dosis:</strong> 1 tableta cada 12 horas</p>
                        <p><strong>Vía:</strong> Oral, con alimentos</p>
                        <p><strong>Indicación:</strong> Diabetes mellitus tipo 2</p>
                        <p><strong>Prescrito por:</strong> Dra. Ana López</p>
                        <p><strong>Fecha inicio:</strong> 20/06/2018</p>
                     </div>
                  </div>

                  <div className="bg-purple-50 p-4 border border-purple-200 rounded">
                     <h4 className="font-semibold text-purple-800">Eritropoyetina 4000 UI</h4>
                     <div className="mt-2 text-sm">
                        <p><strong>Dosis:</strong> 1 ampolleta 3 veces por semana</p>
                        <p><strong>Vía:</strong> Subcutánea</p>
                        <p><strong>Indicación:</strong> Anemia secundaria a IRC</p>
                        <p><strong>Prescrito por:</strong> Dr. Roberto Martínez</p>
                        <p><strong>Fecha inicio:</strong> 15/04/2022</p>
                     </div>
                  </div>

                  <div className="bg-yellow-50 p-4 border border-yellow-200 rounded">
                     <h4 className="font-semibold text-yellow-800">Quelante de Fósforo</h4>
                     <div className="mt-2 text-sm">
                        <p><strong>Dosis:</strong> 800mg con cada comida</p>
                        <p><strong>Vía:</strong> Oral</p>
                        <p><strong>Indicación:</strong> Control de hiperfosfatemia</p>
                        <p><strong>Prescrito por:</strong> Dr. Roberto Martínez</p>
                        <p><strong>Fecha inicio:</strong> 01/05/2022</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="page-break"></div>

            {/* Lab Results */}
            <div className="mb-8">
               <h3 className="mb-4 pb-2 border-gray-300 border-b font-semibold text-gray-800 text-lg">
                  RESULTADOS DE LABORATORIO - 15 DE ENERO 2024
               </h3>
               
               <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
                  <div>
                     <h4 className="mb-3 font-medium text-gray-700">Química Sanguínea</h4>
                     <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center py-1 border-gray-200 border-b">
                           <span>Glucosa en ayunas</span>
                           <span className="font-medium">145 mg/dL</span>
                           <span className="text-orange-600 text-xs">(70-100) ↑</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-gray-200 border-b">
                           <span>Creatinina</span>
                           <span className="font-bold text-red-600">8.5 mg/dL</span>
                           <span className="text-red-600 text-xs">(0.7-1.3) ↑↑</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-gray-200 border-b">
                           <span>BUN</span>
                           <span className="font-medium text-red-600">85 mg/dL</span>
                           <span className="text-red-600 text-xs">(7-20) ↑↑</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-gray-200 border-b">
                           <span>Ácido Úrico</span>
                           <span className="font-medium">7.8 mg/dL</span>
                           <span className="text-orange-600 text-xs">(3.5-7.0) ↑</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-gray-200 border-b">
                           <span>Sodio</span>
                           <span className="font-medium">138 mEq/L</span>
                           <span className="text-green-600 text-xs">(136-145) ✓</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-gray-200 border-b">
                           <span>Potasio</span>
                           <span className="font-medium">4.8 mEq/L</span>
                           <span className="text-green-600 text-xs">(3.5-5.0) ✓</span>
                        </div>
                     </div>
                  </div>

                  <div>
                     <h4 className="mb-3 font-medium text-gray-700">Hematología</h4>
                     <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center py-1 border-gray-200 border-b">
                           <span>Hemoglobina</span>
                           <span className="font-medium text-orange-600">9.2 g/dL</span>
                           <span className="text-orange-600 text-xs">(12.0-15.5) ↓</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-gray-200 border-b">
                           <span>Hematocrito</span>
                           <span className="font-medium">28%</span>
                           <span className="text-orange-600 text-xs">(36-46%) ↓</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-gray-200 border-b">
                           <span>Leucocitos</span>
                           <span className="font-medium">6,800/μL</span>
                           <span className="text-green-600 text-xs">(4,500-11,000) ✓</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-gray-200 border-b">
                           <span>Plaquetas</span>
                           <span className="font-medium">245,000/μL</span>
                           <span className="text-green-600 text-xs">(150,000-450,000) ✓</span>
                        </div>
                     </div>

                     <h4 className="mt-4 mb-3 font-medium text-gray-700">Control Diabético</h4>
                     <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center py-1 border-gray-200 border-b">
                           <span>HbA1c</span>
                           <span className="font-medium text-orange-600">7.2%</span>
                           <span className="text-orange-600 text-xs">(&lt;7.0%) ↑</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-gray-200 border-b">
                           <span>Fructosamina</span>
                           <span className="font-medium">285 μmol/L</span>
                           <span className="text-orange-600 text-xs">(205-285) ↑</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-gray-50 mt-6 p-4 border border-gray-200 rounded">
                  <h4 className="mb-2 font-medium text-gray-700">Interpretación de Laboratorios:</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                     <strong>Creatinina elevada (8.5 mg/dL):</strong> Indica función renal severamente comprometida, consistente con IRC estadio 5.<br/>
                     <strong>Anemia leve (Hb 9.2 g/dL):</strong> Secundaria a IRC, requiere ajuste de eritropoyetina.<br/>
                     <strong>Control glucémico subóptimo (HbA1c 7.2%):</strong> Considerar ajuste en tratamiento antidiabético.
                  </p>
               </div>
            </div>

            {/* Vital Signs */}
            <div className="bg-red-50 mb-8 p-6 border border-red-200 rounded-lg">
               <h3 className="mb-4 font-semibold text-red-800 text-lg">SIGNOS VITALES - 15 DE ENERO 2024, 09:00 HRS</h3>
               
               <div className="gap-4 grid grid-cols-2 md:grid-cols-4 text-center">
                  <div className="bg-white p-4 border border-red-300 rounded">
                     <h4 className="font-semibold text-red-800 text-sm">Presión Arterial</h4>
                     <p className="font-bold text-red-700 text-2xl">145/90</p>
                     <p className="text-red-600 text-xs">mmHg</p>
                  </div>
                  
                  <div className="bg-white p-4 border border-blue-300 rounded">
                     <h4 className="font-semibold text-blue-800 text-sm">Frecuencia Cardíaca</h4>
                     <p className="font-bold text-blue-700 text-2xl">78</p>
                     <p className="text-blue-600 text-xs">lpm</p>
                  </div>
                  
                  <div className="bg-white p-4 border border-green-300 rounded">
                     <h4 className="font-semibold text-green-800 text-sm">Temperatura</h4>
                     <p className="font-bold text-green-700 text-2xl">36.5</p>
                     <p className="text-green-600 text-xs">°C</p>
                  </div>
                  
                  <div className="bg-white p-4 border border-purple-300 rounded">
                     <h4 className="font-semibold text-purple-800 text-sm">Peso</h4>
                     <p className="font-bold text-purple-700 text-2xl">72.5</p>
                     <p className="text-purple-600 text-xs">kg</p>
                  </div>
               </div>

               <div className="gap-4 grid grid-cols-2 md:grid-cols-4 mt-4 text-center">
                  <div className="bg-white p-4 border border-indigo-300 rounded">
                     <h4 className="font-semibold text-indigo-800 text-sm">Frecuencia Respiratoria</h4>
                     <p className="font-bold text-indigo-700 text-2xl">18</p>
                     <p className="text-indigo-600 text-xs">rpm</p>
                  </div>
                  
                  <div className="bg-white p-4 border border-teal-300 rounded">
                     <h4 className="font-semibold text-teal-800 text-sm">Saturación O₂</h4>
                     <p className="font-bold text-teal-700 text-2xl">98</p>
                     <p className="text-teal-600 text-xs">%</p>
                  </div>
                  
                  <div className="bg-white p-4 border border-pink-300 rounded">
                     <h4 className="font-semibold text-pink-800 text-sm">Estatura</h4>
                     <p className="font-bold text-pink-700 text-2xl">175</p>
                     <p className="text-pink-600 text-xs">cm</p>
                  </div>
                  
                  <div className="bg-white p-4 border border-amber-300 rounded">
                     <h4 className="font-semibold text-amber-800 text-sm">IMC</h4>
                     <p className="font-bold text-amber-700 text-2xl">23.7</p>
                     <p className="text-amber-600 text-xs">kg/m²</p>
                  </div>
               </div>
            </div>

            {/* Clinical Assessment */}
            <div className="bg-green-50 mb-8 p-6 border-2 border-green-300 rounded-lg">
               <h3 className="mb-4 font-semibold text-green-800 text-lg">EVALUACIÓN CLÍNICA</h3>
               
               <div className="space-y-4">
                  <div>
                     <h4 className="mb-2 font-medium text-green-800">Evaluación del Dr. Roberto Martínez - Nefrología</h4>
                     <p className="text-green-700 leading-relaxed">
                        Paciente con IRC estadio 5 en programa de hemodiálisis. Presenta control adecuado de volemia y electrolitos. 
                        Se observa leve anemia secundaria a IRC que requiere ajuste de eritropoyetina. Control glucémico subóptimo 
                        que amerita interconsulta con endocrinología. Acceso vascular funcionante sin complicaciones.
                     </p>
                  </div>
                  
                  <div>
                     <h4 className="mb-2 font-medium text-green-800">Plan de Tratamiento:</h4>
                     <ul className="space-y-1 text-green-700 list-disc list-inside">
                        <li>Continuar con hemodiálisis 3 veces por semana (L-M-V)</li>
                        <li>Ajustar dosis de eritropoyetina a 6000 UI 3x/semana</li>
                        <li>Interconsulta con endocrinología para ajuste de tratamiento antidiabético</li>
                        <li>Control de laboratorios en 4 semanas</li>
                        <li>Vigilancia estrecha de acceso vascular</li>
                        <li>Educación nutricional para paciente renal</li>
                     </ul>
                  </div>
                  
                  <div>
                     <h4 className="mb-2 font-medium text-green-800">Seguimiento:</h4>
                     <p className="text-green-700">
                        Próxima cita en 4 semanas (12 de Febrero, 2024) para control y evaluación de respuesta al ajuste terapéutico.
                     </p>
                  </div>
               </div>
            </div>

            {/* Physical Examination */}
            <div className="bg-blue-50 mb-8 p-6 border border-blue-200 rounded-lg">
               <h3 className="mb-4 font-semibold text-blue-800 text-lg">EXPLORACIÓN FÍSICA COMPLETA</h3>
               
               <div className="gap-6 grid grid-cols-1 md:grid-cols-2 text-sm">
                  <div>
                     <h4 className="mb-3 font-medium text-blue-700">Aspecto General y Neurológico</h4>
                     <p className="mb-2 text-blue-600"><strong>Estado General:</strong> Paciente consciente, orientado en tiempo, lugar y persona. Cooperador durante la exploración.</p>
                     <p className="mb-2 text-blue-600"><strong>Marcha:</strong> Normal, sin alteraciones. Equilibrio conservado.</p>
                     <p className="mb-2 text-blue-600"><strong>Habla:</strong> Coherente, fluida, sin disartria.</p>
                     <p className="mb-2 text-blue-600"><strong>Reflejos:</strong> Osteotendinosos presentes y simétricos ++/++.</p>
                     <p className="text-blue-600"><strong>Fuerza Muscular:</strong> 5/5 en las cuatro extremidades.</p>
                  </div>
                  
                  <div>
                     <h4 className="mb-3 font-medium text-blue-700">Cabeza y Cuello</h4>
                     <p className="mb-2 text-blue-600"><strong>Cráneo:</strong> Normocéfalo, sin deformidades.</p>
                     <p className="mb-2 text-blue-600"><strong>Ojos:</strong> Pupilas isocóricas, reactivas a la luz. Conjuntivas ligeramente pálidas.</p>
                     <p className="mb-2 text-blue-600"><strong>Oídos:</strong> Conductos auditivos permeables, sin secreciones.</p>
                     <p className="mb-2 text-blue-600"><strong>Nariz:</strong> Sin alteraciones aparentes.</p>
                     <p className="mb-2 text-blue-600"><strong>Boca:</strong> Mucosas semihúmedas, dentadura en regular estado.</p>
                     <p className="text-blue-600"><strong>Cuello:</strong> Simétrico, sin adenopatías palpables. Tiroides no palpable.</p>
                  </div>
               </div>

               <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mt-4 text-sm">
                  <div>
                     <h4 className="mb-3 font-medium text-blue-700">Tórax y Aparato Respiratorio</h4>
                     <p className="mb-2 text-blue-600"><strong>Inspección:</strong> Tórax simétrico, sin deformidades. Respiración costoabdominal.</p>
                     <p className="mb-2 text-blue-600"><strong>Palpación:</strong> Expansibilidad torácica conservada bilateralmente.</p>
                     <p className="mb-2 text-blue-600"><strong>Percusión:</strong> Matidez normal, sin zonas de hipersonoridad.</p>
                     <p className="text-blue-600"><strong>Auscultación:</strong> Murmullo vesicular presente bilateralmente, sin ruidos agregados.</p>
                  </div>
                  
                  <div>
                     <h4 className="mb-3 font-medium text-blue-700">Aparato Cardiovascular</h4>
                     <p className="mb-2 text-blue-600"><strong>Inspección:</strong> Región precordial sin abombamientos ni retracciones.</p>
                     <p className="mb-2 text-blue-600"><strong>Palpación:</strong> Choque de punta en 5º EIC izquierdo, línea medioclavicular.</p>
                     <p className="mb-2 text-blue-600"><strong>Auscultación:</strong> Ruidos cardíacos rítmicos, de buena intensidad. No soplos audibles.</p>
                     <p className="text-blue-600"><strong>Pulsos:</strong> Simétricos y sincrónicos en las cuatro extremidades.</p>
                  </div>
               </div>

               <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mt-4 text-sm">
                  <div>
                     <h4 className="mb-3 font-medium text-blue-700">Abdomen</h4>
                     <p className="mb-2 text-blue-600"><strong>Inspección:</strong> Abdomen plano, simétrico, sin circulación colateral visible.</p>
                     <p className="mb-2 text-blue-600"><strong>Auscultación:</strong> Ruidos hidroaéreos presentes, de características normales.</p>
                     <p className="mb-2 text-blue-600"><strong>Palpación Superficial:</strong> Abdomen blando, depresible, sin dolor.</p>
                     <p className="mb-2 text-blue-600"><strong>Palpación Profunda:</strong> Sin masas palpables ni organomegalias.</p>
                     <p className="text-blue-600"><strong>Percusión:</strong> Timpanismo abdominal normal.</p>
                  </div>
                  
                  <div>
                     <h4 className="mb-3 font-medium text-blue-700">Extremidades y Acceso Vascular</h4>
                     <p className="mb-2 text-blue-600"><strong>Extremidades Superiores:</strong> Sin edema, pulsos presentes.</p>
                     <p className="mb-2 text-blue-600"><strong>FAV Braquiocefálica Izq:</strong> Thrill presente, soplo audible, sin datos de infección.</p>
                     <p className="mb-2 text-blue-600"><strong>Extremidades Inferiores:</strong> Sin edema, pulsos pedios presentes.</p>
                     <p className="text-blue-600"><strong>Piel:</strong> Íntegra, sin lesiones aparentes. Coloración normal.</p>
                  </div>
               </div>
            </div>

            {/* Dialysis Records */}
            <div className="bg-purple-50 mb-8 p-6 border border-purple-200 rounded-lg">
               <h3 className="mb-4 font-semibold text-purple-800 text-lg">REGISTRO DE SESIONES DE HEMODIÁLISIS - ÚLTIMAS 4 SEMANAS</h3>
               
               <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                     <thead>
                        <tr className="bg-purple-100">
                           <th className="px-3 py-2 border border-purple-300 text-left">Fecha</th>
                           <th className="px-3 py-2 border border-purple-300 text-left">Duración</th>
                           <th className="px-3 py-2 border border-purple-300 text-left">Peso Pre</th>
                           <th className="px-3 py-2 border border-purple-300 text-left">Peso Post</th>
                           <th className="px-3 py-2 border border-purple-300 text-left">UF Goal</th>
                           <th className="px-3 py-2 border border-purple-300 text-left">Kt/V</th>
                           <th className="px-3 py-2 border border-purple-300 text-left">Observaciones</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td className="px-3 py-2 border border-purple-300">12/01/2024</td>
                           <td className="px-3 py-2 border border-purple-300">4:00 hrs</td>
                           <td className="px-3 py-2 border border-purple-300">74.2 kg</td>
                           <td className="px-3 py-2 border border-purple-300">72.1 kg</td>
                           <td className="px-3 py-2 border border-purple-300">2.1 L</td>
                           <td className="px-3 py-2 border border-purple-300">1.35</td>
                           <td className="px-3 py-2 border border-purple-300">Sesión sin complicaciones</td>
                        </tr>
                        <tr className="bg-purple-25">
                           <td className="px-3 py-2 border border-purple-300">10/01/2024</td>
                           <td className="px-3 py-2 border border-purple-300">4:00 hrs</td>
                           <td className="px-3 py-2 border border-purple-300">73.8 kg</td>
                           <td className="px-3 py-2 border border-purple-300">71.9 kg</td>
                           <td className="px-3 py-2 border border-purple-300">1.9 L</td>
                           <td className="px-3 py-2 border border-purple-300">1.42</td>
                           <td className="px-3 py-2 border border-purple-300">Paciente refiere cefalea leve post-HD</td>
                        </tr>
                        <tr>
                           <td className="px-3 py-2 border border-purple-300">08/01/2024</td>
                           <td className="px-3 py-2 border border-purple-300">4:00 hrs</td>
                           <td className="px-3 py-2 border border-purple-300">74.5 kg</td>
                           <td className="px-3 py-2 border border-purple-300">72.3 kg</td>
                           <td className="px-3 py-2 border border-purple-300">2.2 L</td>
                           <td className="px-3 py-2 border border-purple-300">1.38</td>
                           <td className="px-3 py-2 border border-purple-300">Sesión exitosa, paciente estable</td>
                        </tr>
                        <tr className="bg-purple-25">
                           <td className="px-3 py-2 border border-purple-300">05/01/2024</td>
                           <td className="px-3 py-2 border border-purple-300">3:45 hrs</td>
                           <td className="px-3 py-2 border border-purple-300">73.9 kg</td>
                           <td className="px-3 py-2 border border-purple-300">72.0 kg</td>
                           <td className="px-3 py-2 border border-purple-300">1.9 L</td>
                           <td className="px-3 py-2 border border-purple-300">1.31</td>
                           <td className="px-3 py-2 border border-purple-300">Sesión acortada por hipotensión leve</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>

            <div className="page-break"></div>

            {/* Nutritional Assessment */}
            <div className="bg-green-50 mb-8 p-6 border border-green-200 rounded-lg">
               <h3 className="mb-4 font-semibold text-green-800 text-lg">EVALUACIÓN NUTRICIONAL</h3>
               
               <div className="gap-6 grid grid-cols-1 md:grid-cols-2 text-sm">
                  <div>
                     <h4 className="mb-3 font-medium text-green-700">Parámetros Antropométricos</h4>
                     <div className="space-y-2">
                        <p className="text-green-600"><strong>Peso Seco Actual:</strong> 72.5 kg</p>
                        <p className="text-green-600"><strong>Peso Habitual:</strong> 78 kg (antes de IRC)</p>
                        <p className="text-green-600"><strong>Talla:</strong> 175 cm</p>
                        <p className="text-green-600"><strong>IMC:</strong> 23.7 kg/m² (Normal)</p>
                        <p className="text-green-600"><strong>Circunferencia Braquial:</strong> 28 cm</p>
                        <p className="text-green-600"><strong>Pliegue Tricipital:</strong> 12 mm</p>
                     </div>
                  </div>
                  
                  <div>
                     <h4 className="mb-3 font-medium text-green-700">Evaluación Bioquímica</h4>
                     <div className="space-y-2">
                        <p className="text-green-600"><strong>Albúmina:</strong> 3.8 g/dL (3.5-5.0)</p>
                        <p className="text-green-600"><strong>Prealbúmina:</strong> 28 mg/dL (20-40)</p>
                        <p className="text-green-600"><strong>Transferrina:</strong> 185 mg/dL (200-360) ↓</p>
                        <p className="text-green-600"><strong>Colesterol Total:</strong> 165 mg/dL</p>
                        <p className="text-green-600"><strong>Triglicéridos:</strong> 145 mg/dL</p>
                        <p className="text-green-600"><strong>Fósforo:</strong> 4.8 mg/dL (2.5-4.5) ↑</p>
                     </div>
                  </div>
               </div>

               <div className="mt-4">
                  <h4 className="mb-3 font-medium text-green-700">Evaluación Dietética (Recordatorio de 24 horas)</h4>
                  <div className="bg-white p-4 border border-green-300 rounded text-sm">
                     <p className="mb-2 text-green-600"><strong>Desayuno:</strong> 1 taza de café con leche deslactosada, 2 rebanadas de pan integral, 1 huevo revuelto</p>
                     <p className="mb-2 text-green-600"><strong>Colación:</strong> 1 manzana pequeña</p>
                     <p className="mb-2 text-green-600"><strong>Comida:</strong> 150g de pollo a la plancha, 1/2 taza de arroz blanco, ensalada verde, 1 tortilla</p>
                     <p className="mb-2 text-green-600"><strong>Colación:</strong> 1 yogurt natural sin azúcar</p>
                     <p className="text-green-600"><strong>Cena:</strong> Sopa de verduras, 100g de pescado al vapor, 1/2 taza de frijoles</p>
                  </div>
                  
                  <div className="bg-yellow-50 mt-3 p-3 border border-yellow-300 rounded text-sm">
                     <p className="text-yellow-700"><strong>Recomendaciones Nutricionales:</strong></p>
                     <ul className="space-y-1 mt-1 text-yellow-600 list-disc list-inside">
                        <li>Restricción de fósforo a 800-1000 mg/día</li>
                        <li>Ingesta de proteínas: 1.2 g/kg/día</li>
                        <li>Restricción hídrica: 500-750 ml/día + diuresis</li>
                        <li>Control de potasio según niveles séricos</li>
                     </ul>
                  </div>
               </div>
            </div>

            {/* Psychological Assessment */}
            <div className="bg-pink-50 mb-8 p-6 border border-pink-200 rounded-lg">
               <h3 className="mb-4 font-semibold text-pink-800 text-lg">EVALUACIÓN PSICOLÓGICA</h3>
               
               <div className="text-sm">
                  <h4 className="mb-3 font-medium text-pink-700">Evaluación realizada por Psic. María Fernanda Ruiz - 10/01/2024</h4>
                  
                  <div className="space-y-3">
                     <div>
                        <p className="mb-2 text-pink-600"><strong>Estado Mental:</strong> Paciente consciente, orientado, colaborador. Presenta buen contacto visual y verbal.</p>
                        <p className="mb-2 text-pink-600"><strong>Estado de Ánimo:</strong> Eutímico, sin datos de depresión mayor. Refiere períodos de tristeza relacionados con la enfermedad.</p>
                        <p className="text-pink-600"><strong>Ansiedad:</strong> Nivel leve de ansiedad, principalmente relacionada con el futuro y la dependencia del tratamiento.</p>
                     </div>
                     
                     <div>
                        <p className="mb-2 text-pink-600"><strong>Adaptación a la Enfermedad:</strong> Buena adaptación al diagnóstico y tratamiento. Comprende su condición y la importancia de la adherencia.</p>
                        <p className="mb-2 text-pink-600"><strong>Apoyo Social:</strong> Cuenta con excelente apoyo familiar, especialmente de su esposa e hijos.</p>
                        <p className="text-pink-600"><strong>Calidad de Vida:</strong> Refiere impacto moderado en actividades laborales y recreativas.</p>
                     </div>
                     
                     <div className="bg-white p-3 border border-pink-300 rounded">
                        <p className="mb-2 font-medium text-pink-700">Escala de Depresión de Beck: 8/63 (Mínima)</p>
                        <p className="mb-2 font-medium text-pink-700">Escala de Ansiedad de Hamilton: 12/56 (Leve)</p>
                        <p className="font-medium text-pink-700">Índice de Calidad de Vida SF-36: 72/100</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Social Work Assessment */}
            <div className="bg-indigo-50 mb-8 p-6 border border-indigo-200 rounded-lg">
               <h3 className="mb-4 font-semibold text-indigo-800 text-lg">EVALUACIÓN DE TRABAJO SOCIAL</h3>
               
               <div className="gap-6 grid grid-cols-1 md:grid-cols-2 text-sm">
                  <div>
                     <h4 className="mb-3 font-medium text-indigo-700">Situación Socioeconómica</h4>
                     <div className="space-y-2">
                        <p className="text-indigo-600"><strong>Ocupación:</strong> Contador Público (trabajo desde casa)</p>
                        <p className="text-indigo-600"><strong>Ingresos Familiares:</strong> $25,000 MXN mensuales</p>
                        <p className="text-indigo-600"><strong>Vivienda:</strong> Propia, servicios completos</p>
                        <p className="text-indigo-600"><strong>Transporte:</strong> Automóvil propio</p>
                        <p className="text-indigo-600"><strong>Gastos Médicos:</strong> Cubiertos por IMSS</p>
                     </div>
                  </div>
                  
                  <div>
                     <h4 className="mb-3 font-medium text-indigo-700">Estructura Familiar</h4>
                     <div className="space-y-2">
                        <p className="text-indigo-600"><strong>Estado Civil:</strong> Casado</p>
                        <p className="text-indigo-600"><strong>Esposa:</strong> María Elena González (45 años)</p>
                        <p className="text-indigo-600"><strong>Hijos:</strong> 2 (Ana 20 años, Carlos 18 años)</p>
                        <p className="text-indigo-600"><strong>Cuidador Principal:</strong> Esposa</p>
                        <p className="text-indigo-600"><strong>Red de Apoyo:</strong> Extensa (hermanos, padres)</p>
                     </div>
                  </div>
               </div>

               <div className="bg-white mt-4 p-4 border border-indigo-300 rounded">
                  <h4 className="mb-2 font-medium text-indigo-700">Plan de Intervención Social</h4>
                  <ul className="space-y-1 text-indigo-600 list-disc list-inside">
                     <li>Orientación sobre derechos y servicios del IMSS</li>
                     <li>Vinculación con grupos de apoyo para pacientes renales</li>
                     <li>Asesoría para tramitar incapacidad laboral temporal si es necesario</li>
                     <li>Educación familiar sobre cuidados del paciente renal</li>
                  </ul>
               </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-100 mb-8 p-6 border border-gray-300 rounded-lg">
               <h3 className="mb-4 font-semibold text-gray-800 text-lg">INFORMACIÓN ADICIONAL DEL EXPEDIENTE</h3>
               
               <div className="gap-6 grid grid-cols-1 md:grid-cols-2 text-sm">
                  <div>
                     <h4 className="mb-2 font-medium text-gray-700">Estudios Complementarios Pendientes:</h4>
                     <ul className="space-y-1 text-gray-600 list-disc list-inside">
                        <li>Ecocardiograma de control (solicitado)</li>
                        <li>Radiografía de tórax PA y lateral</li>
                        <li>Ultrasonido renal bilateral</li>
                        <li>Evaluación oftalmológica (fondo de ojo)</li>
                        <li>Densitometría ósea</li>
                        <li>Tomografía de tórax sin contraste</li>
                     </ul>
                  </div>
                  
                  <div>
                     <h4 className="mb-2 font-medium text-gray-700">Interconsultas Programadas:</h4>
                     <ul className="space-y-1 text-gray-600 list-disc list-inside">
                        <li>Endocrinología - 20/01/2024</li>
                        <li>Cardiología - 25/01/2024</li>
                        <li>Nutrición - 18/01/2024</li>
                        <li>Trabajo Social - 22/01/2024</li>
                        <li>Psicología - 24/01/2024</li>
                        <li>Oftalmología - 30/01/2024</li>
                     </ul>
                  </div>
               </div>

               <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mt-6 text-sm">
                  <div>
                     <h4 className="mb-2 font-medium text-gray-700">Hospitalizaciones Previas:</h4>
                     <div className="space-y-2">
                        <div className="bg-white p-3 border border-gray-300 rounded">
                           <p className="font-medium">15/03/2022 - 22/03/2022</p>
                           <p className="text-gray-600">Diagnóstico inicial de IRC. Creación de acceso vascular.</p>
                        </div>
                        <div className="bg-white p-3 border border-gray-300 rounded">
                           <p className="font-medium">08/08/2023 - 12/08/2023</p>
                           <p className="text-gray-600">Infección de acceso vascular. Tratamiento antibiótico IV.</p>
                        </div>
                     </div>
                  </div>
                  
                  <div>
                     <h4 className="mb-2 font-medium text-gray-700">Vacunación:</h4>
                     <div className="space-y-2">
                        <div className="bg-white p-3 border border-gray-300 rounded">
                           <p className="font-medium">Hepatitis B: Esquema Completo (2022)</p>
                           <p className="font-medium">COVID-19: 4 dosis (última: Oct 2023)</p>
                           <p className="font-medium">Influenza: Anual (última: Nov 2023)</p>
                           <p className="font-medium">Neumococo: 2021</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mt-4 pt-4 border-gray-400 border-t">
                  <h4 className="mb-2 font-medium text-gray-700">Observaciones del Personal de Enfermería:</h4>
                  <p className="mb-3 text-gray-600 text-sm">
                     Paciente colaborador, orientado en las 3 esferas. Deambula sin dificultad. Fístula arteriovenosa con 
                     thrill y soplo presentes. Piel íntegra en sitio de punción. Sin datos de infección local. 
                     Educado sobre cuidados del acceso vascular y signos de alarma.
                  </p>
                  
                  <div className="bg-white p-3 border border-gray-300 rounded text-sm">
                     <h5 className="mb-2 font-medium text-gray-700">Registro de Enfermería - Últimas 48 horas:</h5>
                     <div className="space-y-1">
                        <p><strong>14/01/2024 08:00:</strong> Paciente ingresa para HD. Signos vitales estables. FAV permeable.</p>
                        <p><strong>14/01/2024 12:00:</strong> Sesión de HD completada sin complicaciones. Peso post: 72.1 kg.</p>
                        <p><strong>15/01/2024 08:00:</strong> Control médico. Paciente refiere sentirse bien. Sin edema.</p>
                        <p><strong>15/01/2024 09:30:</strong> Toma de laboratorios. Paciente cooperador.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="page-break"></div>

            {/* Historical Medical Records */}
            <div className="bg-amber-50 mb-8 p-6 border border-amber-200 rounded-lg">
               <h3 className="mb-4 font-semibold text-amber-800 text-lg">HISTORIAL MÉDICO DETALLADO - ÚLTIMOS 2 AÑOS</h3>
               
               <div className="space-y-4 text-sm">
                  <div className="bg-white p-4 border border-amber-300 rounded">
                     <h4 className="mb-2 font-medium text-amber-800">2022 - Diagnóstico Inicial y Manejo</h4>
                     <div className="space-y-2 text-amber-700">
                        <p><strong>Marzo 2022:</strong> Consulta inicial por edema y disnea. Creatinina 6.2 mg/dL.</p>
                        <p><strong>Abril 2022:</strong> Inicio de hemodiálisis de urgencia. Catéter temporal yugular derecho.</p>
                        <p><strong>Mayo 2022:</strong> Creación de FAV braquiocefálica izquierda. Cirugía exitosa.</p>
                        <p><strong>Junio 2022:</strong> Inicio de HD por FAV. Retirada de catéter temporal.</p>
                        <p><strong>Julio-Dic 2022:</strong> Controles mensuales. Ajuste de medicamentos y dosis de diálisis.</p>
                     </div>
                  </div>
                  
                  <div className="bg-white p-4 border border-amber-300 rounded">
                     <h4 className="mb-2 font-medium text-amber-800">2023 - Seguimiento y Complicaciones</h4>
                     <div className="space-y-2 text-amber-700">
                        <p><strong>Ene-Jul 2023:</strong> Evolución estable. HbA1c mejorada a 6.8%. Hemoglobina 10.5 g/dL.</p>
                        <p><strong>Agosto 2023:</strong> Infección de acceso vascular. Hospitalización 5 días. Antibióticos IV.</p>
                        <p><strong>Sep-Oct 2023:</strong> Recuperación completa. FAV funcionante. Sin complicaciones.</p>
                        <p><strong>Nov-Dic 2023:</strong> Control glucémico subóptimo. HbA1c 7.1%. Ajuste de metformina.</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Laboratory Trends */}
            <div className="bg-teal-50 mb-8 p-6 border border-teal-200 rounded-lg">
               <h3 className="mb-4 font-semibold text-teal-800 text-lg">TENDENCIAS DE LABORATORIO - ÚLTIMOS 6 MESES</h3>
               
               <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                     <thead>
                        <tr className="bg-teal-100">
                           <th className="px-3 py-2 border border-teal-300 text-left">Fecha</th>
                           <th className="px-3 py-2 border border-teal-300 text-left">Creatinina</th>
                           <th className="px-3 py-2 border border-teal-300 text-left">Hemoglobina</th>
                           <th className="px-3 py-2 border border-teal-300 text-left">HbA1c</th>
                           <th className="px-3 py-2 border border-teal-300 text-left">Fósforo</th>
                           <th className="px-3 py-2 border border-teal-300 text-left">Kt/V Promedio</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td className="px-3 py-2 border border-teal-300">15/01/2024</td>
                           <td className="px-3 py-2 border border-teal-300 font-medium text-red-600">8.5 mg/dL</td>
                           <td className="px-3 py-2 border border-teal-300 text-orange-600">9.2 g/dL</td>
                           <td className="px-3 py-2 border border-teal-300 text-orange-600">7.2%</td>
                           <td className="px-3 py-2 border border-teal-300 text-orange-600">4.8 mg/dL</td>
                           <td className="px-3 py-2 border border-teal-300 text-green-600">1.38</td>
                        </tr>
                        <tr className="bg-teal-25">
                           <td className="px-3 py-2 border border-teal-300">15/12/2023</td>
                           <td className="px-3 py-2 border border-teal-300 text-red-600">8.2 mg/dL</td>
                           <td className="px-3 py-2 border border-teal-300 text-orange-600">9.8 g/dL</td>
                           <td className="px-3 py-2 border border-teal-300 text-orange-600">7.1%</td>
                           <td className="px-3 py-2 border border-teal-300 text-green-600">4.2 mg/dL</td>
                           <td className="px-3 py-2 border border-teal-300 text-green-600">1.42</td>
                        </tr>
                        <tr>
                           <td className="px-3 py-2 border border-teal-300">15/11/2023</td>
                           <td className="px-3 py-2 border border-teal-300 text-red-600">7.9 mg/dL</td>
                           <td className="px-3 py-2 border border-teal-300 text-green-600">10.2 g/dL</td>
                           <td className="px-3 py-2 border border-teal-300 text-orange-600">6.9%</td>
                           <td className="px-3 py-2 border border-teal-300 text-green-600">4.1 mg/dL</td>
                           <td className="px-3 py-2 border border-teal-300 text-green-600">1.45</td>
                        </tr>
                        <tr className="bg-teal-25">
                           <td className="px-3 py-2 border border-teal-300">15/10/2023</td>
                           <td className="px-3 py-2 border border-teal-300 text-red-600">8.1 mg/dL</td>
                           <td className="px-3 py-2 border border-teal-300 text-green-600">10.5 g/dL</td>
                           <td className="px-3 py-2 border border-teal-300 text-green-600">6.8%</td>
                           <td className="px-3 py-2 border border-teal-300 text-green-600">3.9 mg/dL</td>
                           <td className="px-3 py-2 border border-teal-300 text-green-600">1.48</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Administrative and Legal Information */}
            <div className="bg-slate-50 mb-8 p-6 border border-slate-200 rounded-lg">
               <h3 className="mb-4 font-semibold text-slate-800 text-lg">INFORMACIÓN ADMINISTRATIVA Y LEGAL</h3>
               
               <div className="gap-6 grid grid-cols-1 md:grid-cols-2 text-sm">
                  <div>
                     <h4 className="mb-3 font-medium text-slate-700">Información del Expediente</h4>
                     <div className="space-y-2 text-slate-600">
                        <p><strong>Número de Expediente:</strong> HC-2024-001</p>
                        <p><strong>Fecha de Apertura:</strong> 15 de Marzo, 2022</p>
                        <p><strong>Última Actualización:</strong> 15 de Enero, 2024</p>
                        <p><strong>Total de Consultas:</strong> 48</p>
                        <p><strong>Total de Hospitalizaciones:</strong> 2</p>
                        <p><strong>Estado del Expediente:</strong> Activo</p>
                     </div>
                  </div>
                  
                  <div>
                     <h4 className="mb-3 font-medium text-slate-700">Consentimientos y Autorizaciones</h4>
                     <div className="space-y-2 text-slate-600">
                        <p><strong>Consentimiento Informado HD:</strong> ✓ Firmado (15/03/2022)</p>
                        <p><strong>Autorización Procedimientos:</strong> ✓ Firmado (15/03/2022)</p>
                        <p><strong>Aviso de Privacidad:</strong> ✓ Firmado (15/03/2022)</p>
                        <p><strong>Consentimiento Investigación:</strong> ✓ Firmado (20/05/2022)</p>
                        <p><strong>Directivas Anticipadas:</strong> ✓ Registradas (10/06/2022)</p>
                     </div>
                  </div>
               </div>

               <div className="bg-yellow-50 mt-6 p-4 border border-yellow-300 rounded">
                  <h4 className="mb-2 font-medium text-yellow-800">Notas Importantes de Seguridad</h4>
                  <ul className="space-y-1 text-yellow-700 text-sm list-disc list-inside">
                     <li><strong>ALERTA:</strong> Alergia a Penicilina - Reacción cutánea severa</li>
                     <li><strong>PRECAUCIÓN:</strong> Paciente en hemodiálisis - Ajustar dosis de medicamentos</li>
                     <li><strong>IMPORTANTE:</strong> Acceso vascular frágil - Evitar punciones en brazo izquierdo</li>
                     <li><strong>DIABETES:</strong> Control glucémico subóptimo - Monitoreo frecuente</li>
                  </ul>
               </div>
            </div>

            {/* Quality Indicators */}
            <div className="bg-emerald-50 mb-8 p-6 border border-emerald-200 rounded-lg">
               <h3 className="mb-4 font-semibold text-emerald-800 text-lg">INDICADORES DE CALIDAD - PROGRAMA DE HEMODIÁLISIS</h3>
               
               <div className="gap-6 grid grid-cols-1 md:grid-cols-3 text-sm">
                  <div className="bg-white p-4 border border-emerald-300 rounded text-center">
                     <h4 className="mb-2 font-semibold text-emerald-800">Kt/V Promedio</h4>
                     <p className="font-bold text-emerald-700 text-2xl">1.42</p>
                     <p className="text-emerald-600 text-xs">Meta: ≥1.2</p>
                     <p className="font-medium text-green-600 text-xs">✓ CUMPLE</p>
                  </div>
                  
                  <div className="bg-white p-4 border border-emerald-300 rounded text-center">
                     <h4 className="mb-2 font-semibold text-emerald-800">Adherencia al Tratamiento</h4>
                     <p className="font-bold text-emerald-700 text-2xl">98%</p>
                     <p className="text-emerald-600 text-xs">Meta: ≥95%</p>
                     <p className="font-medium text-green-600 text-xs">✓ CUMPLE</p>
                  </div>
                  
                  <div className="bg-white p-4 border border-emerald-300 rounded text-center">
                     <h4 className="mb-2 font-semibold text-emerald-800">Acceso Vascular Funcionante</h4>
                     <p className="font-bold text-emerald-700 text-2xl">22</p>
                     <p className="text-emerald-600 text-xs">Meses sin complicaciones</p>
                     <p className="font-medium text-green-600 text-xs">✓ EXCELENTE</p>
                  </div>
               </div>

               <div className="bg-white mt-4 p-4 border border-emerald-300 rounded">
                  <h4 className="mb-2 font-medium text-emerald-800">Certificaciones y Acreditaciones</h4>
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-2 text-sm">
                     <div>
                        <p className="text-emerald-700"><strong>Unidad de Hemodiálisis:</strong></p>
                        <ul className="space-y-1 text-emerald-600 list-disc list-inside">
                           <li>Certificación COFEPRIS: DH-2023-001</li>
                           <li>Acreditación IMSS: AC-HD-2023-15</li>
                           <li>ISO 9001:2015 - Gestión de Calidad</li>
                        </ul>
                     </div>
                     <div>
                        <p className="text-emerald-700"><strong>Personal Médico:</strong></p>
                        <ul className="space-y-1 text-emerald-600 list-disc list-inside">
                           <li>Certificación Consejo Mexicano de Nefrología</li>
                           <li>Recertificación vigente hasta 2026</li>
                           <li>Educación Médica Continua: 50 hrs/año</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>

            {/* Document Footer */}
            <div className="mt-8 pt-6 border-gray-300 border-t text-center">
               <div className="gap-8 grid grid-cols-1 md:grid-cols-2 mb-6">
                  <div>
                     <div className="mx-auto mb-4 border-gray-400 border-b w-64"></div>
                     <p className="font-medium text-gray-700">Dr. Roberto Martínez Hernández</p>
                     <p className="text-gray-600 text-sm">Médico Especialista en Nefrología</p>
                     <p className="text-gray-600 text-sm">Cédula Profesional: 1234567</p>
                     <p className="text-gray-600 text-sm">Cédula de Especialidad: 7654321</p>
                  </div>
                  
                  <div>
                     <div className="mx-auto mb-4 border-gray-400 border-b w-64"></div>
                     <p className="font-medium text-gray-700">Dra. Ana Patricia López Mendoza</p>
                     <p className="text-gray-600 text-sm">Médico Residente de Nefrología</p>
                     <p className="text-gray-600 text-sm">Cédula Profesional: 9876543</p>
                  </div>
               </div>
               
               <div className="text-gray-500 text-xs">
                  <p>Este documento es confidencial y contiene información médica protegida.</p>
                  <p>Generado el 15 de Enero, 2024 a las 14:30 hrs | Página 1 de 1</p>
                  <p>Hospital General San José - Sistema de Gestión Médica LLMed v2.1</p>
               </div>
            </div>
         </div>
      </div>
   );
}
