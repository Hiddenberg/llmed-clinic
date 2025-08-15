import {
   FileText, Plus, Save, Tag, Clock, Eye, Pill,
   User, Target, X
} from 'lucide-react';
import { useState } from 'react';
import { ConsultationNote } from '@/data/mockData/consultationData';

interface ConsultationNotesProps {
   notes: ConsultationNote[];
   onAddNote: (note: Omit<ConsultationNote, 'id' | 'timestamp'>) => void;
}

function NoteCard ({ note }: { note: ConsultationNote }) {
   const getTypeConfig = (type: ConsultationNote['type']) => {
      switch (type) {
         case 'observation':
            return {
               icon: <Eye size={14} />,
               color: 'bg-blue-100 text-blue-700',
               label: 'Observación'
            };
         case 'plan':
            return {
               icon: <Target size={14} />,
               color: 'bg-green-100 text-green-700',
               label: 'Plan'
            };
         case 'medication':
            return {
               icon: <Pill size={14} />,
               color: 'bg-purple-100 text-purple-700',
               label: 'Medicación'
            };
         case 'instruction':
            return {
               icon: <User size={14} />,
               color: 'bg-orange-100 text-orange-700',
               label: 'Instrucción'
            };
      }
   };

   const typeConfig = getTypeConfig(note.type);

   return (
      <div className="!bg-white !p-4 !border !border-gray-200 !rounded-lg">
         <div className="!flex !justify-between !items-start !mb-2">
            <div className="!flex !items-center !gap-2">
               <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${typeConfig.color}`}>
                  {typeConfig.icon}
                  {typeConfig.label}
               </span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-xs">
               <Clock size={12} />
               {new Date(note.timestamp)
                  .toLocaleTimeString('es-ES', {
                     hour: '2-digit',
                     minute: '2-digit'
                  })}
            </div>
         </div>

         <p className="!mb-3 !text-gray-900">{note.content}</p>

         {note.tags.length > 0 && (
            <div className="!flex !items-center !gap-2">
               <Tag size={12} className="text-gray-400" />
               <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag, index) => (
                     <span key={index} className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 text-xs">
                        {tag}
                     </span>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
}

function NoteInput ({ onAddNote }: { onAddNote: (note: Omit<ConsultationNote, 'id' | 'timestamp'>) => void }) {
   const [isExpanded, setIsExpanded] = useState(false);
   const [content, setContent] = useState('');
   const [type, setType] = useState<ConsultationNote['type']>('observation');
   const [tags, setTags] = useState<string>('');

   const handleSubmit = () => {
      if (content.trim()) {
         onAddNote({
            content: content.trim(),
            type,
            tags: tags.split(',')
               .map(tag => tag.trim())
               .filter(tag => tag.length > 0)
         });
         setContent('');
         setTags('');
         setIsExpanded(false);
      }
   };

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && e.ctrlKey) {
         handleSubmit();
      }
   };

   const noteTypes = [
      {
         value: 'observation',
         label: 'Observación',
         icon: Eye
      },
      {
         value: 'plan',
         label: 'Plan',
         icon: Target
      },
      {
         value: 'medication',
         label: 'Medicación',
         icon: Pill
      },
      {
         value: 'instruction',
         label: 'Instrucción',
         icon: User
      }
   ] as const;

   return (
      <div className="!bg-gray-50 !p-4 !border !border-gray-200 !rounded-lg">
         {!isExpanded ? (
            <button
               onClick={() => setIsExpanded(true)}
               className="!flex !items-center !gap-2 !w-full !text-gray-600 hover:!text-gray-900 !text-left !transition-colors"
            >
               <Plus size={16} />
               <span>Agregar nota...</span>
            </button>
         ) : (
            <div className="!space-y-4">
               {/* Note Type Selector */}
               <div className="flex gap-2">
                  {noteTypes.map((noteType) => (
                     <button
                        key={noteType.value}
                        onClick={() => setType(noteType.value)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                           type === noteType.value
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                     >
                        <noteType.icon size={14} />
                        {noteType.label}
                     </button>
                  ))}
               </div>

               {/* Content Input */}
               <div className="relative">
                  <textarea
                     value={content}
                     onChange={(e) => setContent(e.target.value)}
                     onKeyDown={handleKeyDown}
                     placeholder="Escribir nota..."
                     className="p-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full resize-none"
                     rows={3}
                     autoFocus
                  />
               </div>

               {/* Tags Input */}
               <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Tags (separados por comas)"
                  className="p-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
               />

               {/* Action Buttons */}
               <div className="flex justify-between items-center">
                  <div className="text-gray-500 text-sm">
                     Ctrl + Enter para guardar rápido
                  </div>
                  <div className="flex gap-2">
                     <button
                        onClick={() => {
                           setIsExpanded(false);
                           setContent('');
                           setTags('');
                        }}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                     >
                        Cancelar
                     </button>
                     <button
                        onClick={handleSubmit}
                        disabled={!content.trim()}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded-lg text-white transition-colors disabled:cursor-not-allowed"
                     >
                        <Save size={16} />
                        Guardar
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

function QuickNoteTemplates ({ onAddNote }: { onAddNote: (note: Omit<ConsultationNote, 'id' | 'timestamp'>) => void }) {
   const templates = [
      {
         content: 'Paciente refiere sentirse mejor desde la última sesión',
         type: 'observation' as const,
         tags: ['bienestar', 'evolución']
      },
      {
         content: 'Continuar con el plan de tratamiento actual',
         type: 'plan' as const,
         tags: ['tratamiento', 'seguimiento']
      },
      {
         content: 'Ajustar dosis según evolución del paciente',
         type: 'medication' as const,
         tags: ['medicación', 'ajuste']
      },
      {
         content: 'Educar sobre adherencia al tratamiento',
         type: 'instruction' as const,
         tags: ['educación', 'adherencia']
      }
   ];

   return (
      <div className="space-y-2">
         <h4 className="mb-2 font-medium text-gray-700 text-sm">Plantillas Rápidas</h4>
         <div className="gap-2 grid grid-cols-1">
            {templates.map((template, index) => (
               <button
                  key={index}
                  onClick={() => onAddNote(template)}
                  className="bg-white hover:bg-gray-50 p-2 border border-gray-200 rounded-lg text-left transition-colors"
               >
                  <p className="text-gray-900 text-sm">{template.content}</p>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="text-gray-500 text-xs">{template.type}</span>
                     <div className="flex gap-1">
                        {template.tags.map((tag, tagIndex) => (
                           <span key={tagIndex} className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 text-xs">
                              {tag}
                           </span>
                        ))}
                     </div>
                  </div>
               </button>
            ))}
         </div>
      </div>
   );
}

export default function ConsultationNotes ({
   notes, onAddNote
}: ConsultationNotesProps) {
   const [showTemplates, setShowTemplates] = useState(false);

   return (
      <div className="!bg-white !p-6 !border !border-gray-200 !rounded-xl">
         <div className="!flex !justify-between !items-center !mb-6">
            <div className="!flex !items-center !gap-2">
               <FileText size={20} className="text-gray-600" />
               <h3 className="font-semibold text-gray-900 text-lg">Notas de Consulta</h3>
            </div>
            <button
               onClick={() => setShowTemplates(!showTemplates)}
               className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
            >
               {showTemplates ? 'Ocultar Plantillas' : 'Ver Plantillas'}
            </button>
         </div>

         {/* Quick Templates */}
         {showTemplates && (
            <div className="bg-gray-50 mb-6 p-4 rounded-lg">
               <QuickNoteTemplates onAddNote={onAddNote} />
            </div>
         )}

         {/* Note Input */}
         <div className="mb-6">
            <NoteInput onAddNote={onAddNote} />
         </div>

         {/* Notes List */}
         <div className="!space-y-4">
            {notes.length === 0 ? (
               <div className="py-8 text-gray-500 text-center">
                  <FileText size={32} className="opacity-50 mx-auto mb-3" />
                  <p className="text-sm">No hay notas aún</p>
                  <p className="text-xs">Agrega la primera nota de la consulta</p>
               </div>
            ) : (
               notes.map((note) => (
                  <NoteCard key={note.id} note={note} />
               ))
            )}
         </div>
      </div>
   );
}
