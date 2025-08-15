import {
   FileText, Plus, Save, Edit3, Trash2, Clock, MessageSquare
} from 'lucide-react';
import { useState } from 'react';

interface PatientNote {
   id: string;
   timestamp: string;
   content: string;
}

function EditNoteForm ({
   note,
   onSave,
   onCancel
}: {
   note: PatientNote;
   onSave: (content: string) => void;
   onCancel: () => void;
}) {
   const [content, setContent] = useState(note.content);

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && e.ctrlKey) {
         onSave(content);
      }
      if (e.key === 'Escape') {
         onCancel();
      }
   };

   return (
      <div>
         <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            className="!p-2 !border !border-gray-300 focus:!border-transparent !rounded-lg focus:!ring-2 focus:!ring-blue-500 !w-full !text-sm !resize-none"
            rows={2}
            autoFocus
         />
         <div className="flex justify-end gap-2 mt-2">
            <button
               onClick={onCancel}
               className="!px-2 !py-1 !text-gray-600 hover:!text-gray-800 !text-xs !transition-colors"
            >
               Cancelar
            </button>
            <button
               onClick={() => onSave(content)}
               disabled={!content.trim()}
               className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-2 py-1 rounded text-white text-xs transition-colors disabled:cursor-not-allowed"
            >
               <Save size={12} />
               Guardar
            </button>
         </div>
      </div>
   );
}

export default function PatientNotesSection () {
   const [notes, setNotes] = useState<PatientNote[]>([]);
   const [isAddingNote, setIsAddingNote] = useState(false);
   const [noteContent, setNoteContent] = useState('');
   const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
   const [showQuickTemplates, setShowQuickTemplates] = useState(false);

   const quickTemplates = [
      'Preguntar sobre cambios en la medicación',
      'Recordar comentar síntomas recientes',
      'Consultar sobre dieta y restricciones',
      'Preguntar por próxima cita de seguimiento',
      'Mencionar efectos secundarios experimentados',
      'Consultar sobre ejercicios recomendados'
   ];

   const handleAddNote = () => {
      if (noteContent.trim()) {
         const newNote: PatientNote = {
            id: Date.now()
               .toString(),
            timestamp: new Date()
               .toISOString(),
            content: noteContent.trim()
         };
         setNotes(prev => [newNote, ...prev]);
         setNoteContent('');
         setIsAddingNote(false);
      }
   };

   const handleQuickTemplate = (template: string) => {
      const newNote: PatientNote = {
         id: Date.now()
            .toString(),
         timestamp: new Date()
            .toISOString(),
         content: template
      };
      setNotes(prev => [newNote, ...prev]);
      setShowQuickTemplates(false);
   };

   const handleEditNote = (noteId: string, newContent: string) => {
      if (newContent.trim()) {
         setNotes(prev => prev.map(note =>
            note.id === noteId
               ? {
                  ...note,
                  content: newContent.trim()
               }
               : note
         ));
         setEditingNoteId(null);
      }
   };

   const handleDeleteNote = (noteId: string) => {
      if (confirm('¿Está seguro de que desea eliminar esta nota?')) {
         setNotes(prev => prev.filter(note => note.id !== noteId));
      }
   };

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && e.ctrlKey) {
         handleAddNote();
      }
      if (e.key === 'Escape') {
         setIsAddingNote(false);
         setNoteContent('');
         setEditingNoteId(null);
      }
   };

   const formatTime = (timestamp: string) => {
      return new Date(timestamp)
         .toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
         });
   };

   return (
      <div className="!bg-white !p-6 !border !border-gray-200 !rounded-lg">
         <div className="!flex !flex-col !justify-between !items-center !space-y-4 !mb-4">
            <div className="!flex !items-center !gap-2">
               <FileText size={20} className="!text-blue-600" />
               <h3 className="!font-semibold !text-gray-900 !text-lg">Mis Notas</h3>
               {notes.length > 0 && (
                  <span className="bg-blue-100 px-2 py-0.5 rounded-full text-blue-600 text-xs">
                     {notes.length}
                  </span>
               )}
            </div>
            {!isAddingNote && (
               <div className="!flex !gap-2">
                  <button
                     onClick={() => setIsAddingNote(true)}
                     className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-white text-sm transition-colors"
                  >
                     <Plus size={16} />
                     Agregar
                  </button>
                  <button
                     onClick={() => setShowQuickTemplates(!showQuickTemplates)}
                     className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-gray-700 text-sm transition-colors"
                  >
                     <MessageSquare size={14} />
                     Sugerencias
                  </button>
               </div>
            )}
         </div>

         <p className="mb-4 text-gray-600 text-sm text-center">
            Tome notas personales durante su consulta para recordar información importante.
         </p>

         {/* Quick Templates */}
         {showQuickTemplates && (
            <div className="bg-green-50 mb-4 p-4 border border-green-200 rounded-lg">
               <h4 className="mb-3 font-medium text-green-800 text-sm">Recordatorios Útiles</h4>
               <div className="gap-2 grid grid-cols-1">
                  {quickTemplates.map((template, index) => (
                     <button
                        key={index}
                        onClick={() => handleQuickTemplate(template)}
                        className="bg-white hover:bg-green-50 p-2 border border-green-200 rounded text-green-800 text-sm text-left transition-colors"
                     >
                        {template}
                     </button>
                  ))}
               </div>
               <button
                  onClick={() => setShowQuickTemplates(false)}
                  className="mt-3 text-green-600 hover:text-green-800 text-xs transition-colors"
               >
                  Ocultar sugerencias
               </button>
            </div>
         )}

         {/* Add Note Input */}
         {isAddingNote && (
            <div className="bg-blue-50 mb-4 p-4 border border-blue-200 rounded-lg">
               <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escriba su nota aquí..."
                  className="p-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full resize-none"
                  rows={3}
                  autoFocus
               />
               <div className="flex justify-between items-center mt-3">
                  <span className="text-blue-600 text-xs">Ctrl + Enter para guardar</span>
                  <div className="!flex !gap-2">
                     <button
                        onClick={() => {
                           setIsAddingNote(false);
                           setNoteContent('');
                        }}
                        className="px-3 py-1.5 text-gray-600 hover:text-gray-800 text-sm transition-colors"
                     >
                        Cancelar
                     </button>
                     <button
                        onClick={handleAddNote}
                        disabled={!noteContent.trim()}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-3 py-1.5 rounded-lg text-white text-sm transition-colors disabled:cursor-not-allowed"
                     >
                        <Save size={14} />
                        Guardar
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* Notes List */}
         <div className="!space-y-3 !max-h-96 !overflow-y-auto">
            {notes.length === 0 ? (
               <div className="py-8 text-gray-500 text-center">
                  <FileText size={32} className="opacity-50 mx-auto mb-3" />
                  <p className="mb-2 font-medium text-sm">¡Comience a tomar notas!</p>
                  <p className="mb-3 text-xs">Anote preguntas importantes o información que desee recordar</p>
                  <button
                     onClick={() => setIsAddingNote(true)}
                     className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 mx-auto px-3 py-2 rounded-lg text-white text-sm transition-colors"
                  >
                     <Plus size={14} />
                     Agregar primera nota
                  </button>
               </div>
            ) : (
               notes.map((note) => (
                  <div key={note.id} className="bg-gray-50 p-3 border border-gray-200 rounded-lg">
                     {editingNoteId === note.id ? (
                        <EditNoteForm
                           note={note}
                           onSave={(content) => handleEditNote(note.id, content)}
                           onCancel={() => setEditingNoteId(null)}
                        />
                     ) : (
                        <>
                           <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2 text-gray-500 text-xs">
                                 <Clock size={12} />
                                 {formatTime(note.timestamp)}
                              </div>
                              <div className="flex gap-1">
                                 <button
                                    onClick={() => setEditingNoteId(note.id)}
                                    className="text-gray-400 hover:text-blue-600 transition-colors"
                                    title="Editar nota"
                                 >
                                    <Edit3 size={14} />
                                 </button>
                                 <button
                                    onClick={() => handleDeleteNote(note.id)}
                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                    title="Eliminar nota"
                                 >
                                    <Trash2 size={14} />
                                 </button>
                              </div>
                           </div>
                           <p className="text-gray-900 text-sm leading-relaxed">{note.content}</p>
                        </>
                     )}
                  </div>
               ))
            )}
         </div>
      </div>
   );
}
