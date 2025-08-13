import {
   FileText, User, Calendar, CheckCircle
} from 'lucide-react';
import { ClinicalNote } from '@/data/mockData/patientDetailData';

interface ClinicalNotesSectionProps {
   notes: ClinicalNote[];
}

export default function ClinicalNotesSection ({ notes }: ClinicalNotesSectionProps) {
   if (notes.length === 0) {
      return (
         <div className="py-8 text-center">
            <FileText size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No hay notas clínicas disponibles</p>
         </div>
      );
   }

   const getTypeLabel = (type: ClinicalNote['type']) => {
      switch (type) {
         case 'progress': return 'Nota de Progreso';
         case 'assessment': return 'Evaluación';
         case 'consultation': return 'Consulta';
         case 'procedure': return 'Procedimiento';
         case 'discharge': return 'Alta';
         default: return 'Nota Clínica';
      }
   };

   const getTypeColor = (type: ClinicalNote['type']) => {
      switch (type) {
         case 'progress': return 'bg-blue-100 text-blue-800';
         case 'assessment': return 'bg-purple-100 text-purple-800';
         case 'consultation': return 'bg-green-100 text-green-800';
         case 'procedure': return 'bg-orange-100 text-orange-800';
         case 'discharge': return 'bg-red-100 text-red-800';
         default: return 'bg-gray-100 text-gray-800';
      }
   };

   return (
      <div className="space-y-6">
         {notes.map((note) => (
            <div key={note.id} className="bg-white/60 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-lg">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(note.type)}`}>
                           {getTypeLabel(note.type)}
                        </span>
                        <span className="text-gray-600 text-sm">{note.specialty}</span>
                     </div>
                     <h4 className="font-semibold text-gray-900 text-lg">
                        {new Date(note.date)
                           .toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                           })} - {note.time}
                     </h4>
                     <p className="text-gray-600 text-sm">Por: {note.author}</p>
                  </div>
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                     <CheckCircle size={16} />
                     <span>Firmado</span>
                  </div>
               </div>

               {note.chiefComplaint && (
                  <div className="mb-4">
                     <h5 className="mb-2 font-medium text-gray-800">Motivo de Consulta:</h5>
                     <p className="text-gray-700 text-sm">{note.chiefComplaint}</p>
                  </div>
               )}

               {note.historyOfPresentIllness && (
                  <div className="mb-4">
                     <h5 className="mb-2 font-medium text-gray-800">Historia de la Enfermedad Actual:</h5>
                     <p className="text-gray-700 text-sm leading-relaxed">{note.historyOfPresentIllness}</p>
                  </div>
               )}

               <div className="mb-4">
                  <h5 className="mb-2 font-medium text-gray-800">Evaluación:</h5>
                  <p className="text-gray-700 text-sm leading-relaxed">{note.assessment}</p>
               </div>

               <div className="mb-4">
                  <h5 className="mb-2 font-medium text-gray-800">Plan de Tratamiento:</h5>
                  <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{note.plan}</div>
               </div>

               {note.followUp && (
                  <div className="mb-4">
                     <h5 className="mb-2 font-medium text-gray-800">Seguimiento:</h5>
                     <p className="text-gray-700 text-sm">{note.followUp}</p>
                  </div>
               )}

               <div className="flex justify-between items-center pt-4 border-gray-200 border-t">
                  <div className="text-gray-600 text-sm">
                     <span className="font-medium">Firmado por:</span> {note.signedBy}
                  </div>
                  <div className="text-gray-600 text-sm">
                     {new Date(note.signedDate)
                        .toLocaleDateString('es-ES')} - {new Date(note.signedDate)
                           .toLocaleTimeString('es-ES', {
                              hour: '2-digit',
                              minute: '2-digit'
                           })}
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}
