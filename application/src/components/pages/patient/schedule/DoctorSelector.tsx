import {
   ArrowLeft, User, Star, Clock
} from 'lucide-react';

interface Doctor {
   id: string;
   name: string;
   specialty: string;
}

interface DoctorSelectorProps {
   doctors: Doctor[];
   selectedDoctorId?: string;
   appointmentType?: string;
   onSelect: (doctorId: string) => void;
   onBack: () => void;
}

const specialtyDescriptions = {
   'Nefrología': 'Especialista en enfermedades renales y tratamientos de diálisis',
   'Medicina Interna': 'Médico internista para consultas generales y seguimiento',
   'Cardiología': 'Especialista en enfermedades del corazón y sistema cardiovascular'
};

const appointmentTypeLabels = {
   consultation: 'Consulta Médica',
   hemodialysis: 'Sesión de Hemodiálisis',
   'follow-up': 'Seguimiento'
};

export default function DoctorSelector ({
   doctors,
   selectedDoctorId,
   appointmentType,
   onSelect,
   onBack
}: DoctorSelectorProps) {
   // Filter doctors based on appointment type
   const getAvailableDoctors = () => {
      if (appointmentType === 'hemodialysis') {
         // Only nephrology doctors can perform hemodialysis
         return doctors.filter(doctor => doctor.specialty === 'Nefrología');
      }
      return doctors;
   };

   const availableDoctors = getAvailableDoctors();

   return (
      <div className="space-y-6">
         <div className="flex items-center gap-4 mb-6">
            <button
               onClick={onBack}
               className="flex justify-center items-center hover:bg-gray-50 border border-gray-300 rounded-lg w-10 h-10 transition-colors"
            >
               <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div>
               <h2 className="font-bold text-gray-900 text-2xl">
                  Selecciona tu doctor
               </h2>
               <p className="text-gray-600">
                  {appointmentType && `Para tu ${appointmentTypeLabels[appointmentType as keyof typeof appointmentTypeLabels].toLowerCase()}`}
               </p>
            </div>
         </div>

         <div className="space-y-4">
            {availableDoctors.map((doctor) => {
               const isSelected = selectedDoctorId === doctor.id;

               return (
                  <button
                     key={doctor.id}
                     onClick={() => onSelect(doctor.id)}
                     className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left group ${
                        isSelected
                           ? 'border-green-500 bg-green-50'
                           : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50'
                     }`}
                  >
                     <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                           isSelected ? 'bg-green-100' : 'bg-gray-100 group-hover:bg-green-100'
                        }`}
                        >
                           <User className={`w-8 h-8 ${
                              isSelected ? 'text-green-600' : 'text-gray-600 group-hover:text-green-600'
                           }`}
                           />
                        </div>

                        <div className="flex-1">
                           <div className="flex justify-between items-center mb-2">
                              <h3 className="font-semibold text-gray-900 text-xl">
                                 {doctor.name}
                              </h3>

                              {isSelected && (
                                 <div className="flex items-center gap-2 text-green-600">
                                    <div className="flex justify-center items-center bg-green-500 rounded-full w-5 h-5">
                                       <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                       </svg>
                                    </div>
                                    <span className="font-medium text-sm">Seleccionado</span>
                                 </div>
                              )}
                           </div>

                           <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                 <div className="bg-blue-500 rounded-full w-2 h-2" />
                                 <span className="font-medium text-blue-600 text-sm">
                                    {doctor.specialty}
                                 </span>
                              </div>

                              <p className="text-gray-600 text-sm leading-relaxed">
                                 {specialtyDescriptions[doctor.specialty as keyof typeof specialtyDescriptions] ||
                                  'Especialista médico con amplia experiencia'}
                              </p>

                              <div className="flex items-center gap-4 pt-2">
                                 <div className="flex items-center gap-1">
                                    <Star className="fill-current w-4 h-4 text-yellow-400" />
                                    <Star className="fill-current w-4 h-4 text-yellow-400" />
                                    <Star className="fill-current w-4 h-4 text-yellow-400" />
                                    <Star className="fill-current w-4 h-4 text-yellow-400" />
                                    <Star className="fill-current w-4 h-4 text-yellow-400" />
                                    <span className="ml-1 text-gray-600 text-sm">5.0</span>
                                 </div>

                                 <div className="flex items-center gap-1 text-gray-600 text-sm">
                                    <Clock className="w-4 h-4" />
                                    <span>Disponible hoy</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </button>
               );
            })}
         </div>

         {appointmentType === 'hemodialysis' && (
            <div className="bg-amber-50 p-4 border border-amber-200 rounded-lg">
               <div className="flex items-start gap-3">
                  <div className="flex justify-center items-center bg-amber-500 mt-0.5 rounded-full w-5 h-5">
                     <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                     </svg>
                  </div>
                  <div>
                     <h4 className="mb-1 font-medium text-amber-900 text-sm">
                        Especialista requerido
                     </h4>
                     <p className="text-amber-800 text-sm">
                        Las sesiones de hemodiálisis solo pueden ser realizadas por nefrólogos certificados.
                        Se muestran únicamente los especialistas disponibles para este tratamiento.
                     </p>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
