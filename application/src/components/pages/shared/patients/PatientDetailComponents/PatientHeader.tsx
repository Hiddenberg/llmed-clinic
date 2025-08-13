import {
   User, Calendar, Phone, Mail, MapPin
} from 'lucide-react';
import { PatientDetailData } from '@/data/mockData/patientDetailData';

interface PatientHeaderProps {
   patient: PatientDetailData['personalInfo'];
}

export default function PatientHeader ({ patient }: PatientHeaderProps) {
   return (
      <div className="bg-white/60 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
         <div className="flex sm:flex-row flex-col sm:items-center gap-6">
            {/* Patient Avatar */}
            <div className="flex-shrink-0">
               <div className="flex justify-center items-center bg-gradient-to-r from-brand-500 to-blue-500 shadow-lg rounded-full w-20 h-20 font-bold text-white text-2xl">
                  {patient.name.split(' ')
                     .map(n => n[0])
                     .join('')
                     .substring(0, 2)}
               </div>
            </div>

            {/* Patient Info */}
            <div className="flex-1">
               <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-4">
                  <div>
                     <h1 className="mb-2 font-bold text-gray-900 text-3xl">{patient.name}</h1>
                     <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                           <Calendar size={16} />
                           <span>{patient.age} años</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <User size={16} />
                           <span>{patient.gender === 'female' ? 'Femenino' : 'Masculino'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="bg-red-500 rounded-full w-3 h-3" />
                           <span>Tipo {patient.bloodType}</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 text-gray-600 text-sm">
                     <div className="flex items-center gap-2">
                        <Phone size={16} />
                        <span>{patient.phone}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Mail size={16} />
                        <span>{patient.email}</span>
                     </div>
                  </div>
               </div>

               {/* Additional Info */}
               <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mt-4 pt-4 border-gray-200/50 border-t">
                  <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm">
                     <div>
                        <span className="font-medium text-gray-800">MRN:</span> {patient.mrn}
                     </div>
                     <div>
                        <span className="font-medium text-gray-800">Seguro:</span> {patient.insurance.provider}
                     </div>
                  </div>

                  <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full text-green-700 text-sm">
                     <div className="bg-green-500 rounded-full w-2 h-2" />
                     <span className="font-medium">Paciente Activo</span>
                  </div>
               </div>

               {/* Address */}
               <div className="flex items-start gap-2 mt-3 text-gray-600 text-sm">
                  <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                  <span>{patient.address}</span>
               </div>
            </div>
         </div>
      </div>
   );
}
