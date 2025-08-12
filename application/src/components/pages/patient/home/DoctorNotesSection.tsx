"use client"

import {
   FileText, User, Clock, AlertTriangle, Info, CheckCircle, ChevronRight, Eye, EyeOff
} from 'lucide-react';
import { mockDoctorNotes } from '@/data/mockData/patientData';
import { useState } from 'react';

// Helper function to get note type info
function getNoteTypeInfo (type: string) {
   const types = {
      'general': {
         label: 'General',
         color: 'from-gray-500 to-gray-600',
         bgColor: 'bg-gray-50',
         textColor: 'text-gray-700',
         icon: FileText
      },
      'treatment-update': {
         label: 'Actualización de Tratamiento',
         color: 'from-blue-500 to-cyan-500',
         bgColor: 'bg-blue-50',
         textColor: 'text-blue-700',
         icon: Info
      },
      'medication-change': {
         label: 'Cambio de Medicación',
         color: 'from-orange-500 to-amber-500',
         bgColor: 'bg-orange-50',
         textColor: 'text-orange-700',
         icon: AlertTriangle
      },
      'lab-results': {
         label: 'Resultados de Laboratorio',
         color: 'from-green-500 to-emerald-500',
         bgColor: 'bg-green-50',
         textColor: 'text-green-700',
         icon: CheckCircle
      },
      'recommendation': {
         label: 'Recomendación',
         color: 'from-purple-500 to-pink-500',
         bgColor: 'bg-purple-50',
         textColor: 'text-purple-700',
         icon: Info
      }
   };
   return types[type as keyof typeof types] || types.general;
}

// Helper function to get priority info
function getPriorityInfo (priority: string) {
   const priorities = {
      'low': {
         label: 'Baja',
         color: 'text-green-600',
         bgColor: 'bg-green-100',
         dotColor: 'bg-green-400'
      },
      'medium': {
         label: 'Media',
         color: 'text-orange-600',
         bgColor: 'bg-orange-100',
         dotColor: 'bg-orange-400'
      },
      'high': {
         label: 'Alta',
         color: 'text-red-600',
         bgColor: 'bg-red-100',
         dotColor: 'bg-red-400'
      }
   };
   return priorities[priority as keyof typeof priorities] || priorities.medium;
}

// Helper function to format date
function formatNoteDate (date: string) {
   const noteDate = new Date(date);
   const today = new Date();
   const yesterday = new Date(today);
   yesterday.setDate(yesterday.getDate() - 1);

   if (noteDate.toDateString() === today.toDateString()) {
      return 'Hoy';
   } else if (noteDate.toDateString() === yesterday.toDateString()) {
      return 'Ayer';
   } else {
      return noteDate.toLocaleDateString('es-MX', {
         day: 'numeric',
         month: 'short',
         year: 'numeric'
      });
   }
}

export default function DoctorNotesSection () {
   const [expandedNote, setExpandedNote] = useState<string | null>(null);
   const [notes, setNotes] = useState(mockDoctorNotes);

   const markAsRead = (noteId: string) => {
      setNotes(prev => prev.map(note =>
         note.id === noteId ? {
            ...note,
            read: true
         } : note
      ));
   };

   const toggleExpanded = (noteId: string) => {
      setExpandedNote(expandedNote === noteId ? null : noteId);
      markAsRead(noteId);
   };

   const unreadCount = notes.filter(note => !note.read).length;

   if (notes.length === 0) {
      return (
         <div className="flex flex-col justify-center items-center py-8 text-center">
            <div className="flex justify-center items-center bg-gray-100 mb-4 rounded-full w-16 h-16 text-gray-400">
               <FileText size={24} />
            </div>
            <p className="font-medium text-gray-600">No hay notas del doctor</p>
            <p className="mt-1 text-gray-400 text-sm">Las notas aparecerán aquí después de sus consultas</p>
         </div>
      );
   }

   return (
      <div className="space-y-4">
         {/* Header with unread count */}
         {unreadCount > 0 && (
            <div className="bg-blue-50 p-3 border border-blue-200 rounded-lg">
               <div className="flex items-center gap-2">
                  <div className="bg-blue-500 rounded-full w-2 h-2 animate-pulse" />
                  <p className="font-medium text-blue-800 text-sm">
                     Tienes {unreadCount} nota{unreadCount > 1 ? 's' : ''} nueva{unreadCount > 1 ? 's' : ''} sin leer
                  </p>
               </div>
            </div>
         )}

         {/* Notes List */}
         <div className="space-y-3">
            {notes.map((note) => {
               const typeInfo = getNoteTypeInfo(note.type);
               const priorityInfo = getPriorityInfo(note.priority);
               const dateFormatted = formatNoteDate(note.date);
               const isExpanded = expandedNote === note.id;

               return (
                  <div
                     key={note.id}
                     className={`border rounded-xl transition-all duration-200 ${
                        !note.read
                           ? 'border-blue-200 bg-blue-50/50'
                           : 'border-gray-200 bg-white hover:bg-gray-50/50'
                     }`}
                  >
                     <div
                        className="flex items-start gap-4 p-4 cursor-pointer"
                        onClick={() => toggleExpanded(note.id)}
                     >
                        {/* Note type icon */}
                        <div className="flex flex-col items-center min-w-[48px]">
                           <div className={`flex items-center justify-center bg-gradient-to-r ${typeInfo.color} rounded-lg w-10 h-10 text-white mb-1`}>
                              <typeInfo.icon size={18} />
                           </div>
                           <span className="font-medium text-gray-700 text-xs text-center">{dateFormatted}</span>
                        </div>

                        {/* Note content */}
                        <div className="flex-1 min-w-0">
                           <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-2 mb-2">
                              <div className="flex-1">
                                 <div className="flex items-center gap-2 mb-1">
                                    <span className={`px-2 py-1 ${typeInfo.bgColor} ${typeInfo.textColor} rounded-md text-xs font-medium`}>
                                       {typeInfo.label}
                                    </span>
                                    <div className={`flex items-center gap-1 ${priorityInfo.bgColor} px-2 py-1 rounded-full`}>
                                       <div className={`w-1.5 h-1.5 rounded-full ${priorityInfo.dotColor}`} />
                                       <span className={`${priorityInfo.color} text-xs font-medium`}>
                                          {priorityInfo.label}
                                       </span>
                                    </div>
                                    {!note.read && (
                                       <div className="bg-blue-500 rounded-full w-2 h-2" />
                                    )}
                                 </div>
                                 <h3 className="mb-1 font-semibold text-gray-800 text-sm">{note.title}</h3>
                                 <div className="flex items-center gap-2 text-gray-500 text-xs">
                                    <User size={12} />
                                    <span>{note.doctor}</span>
                                    <span>•</span>
                                    <Clock size={12} />
                                    <span>{new Date(note.date)
                                       .toLocaleTimeString('es-MX', {
                                          hour: '2-digit',
                                          minute: '2-digit'
                                       })}</span>
                                 </div>
                              </div>

                              <div className="flex items-center gap-2">
                                 {note.read ? (
                                    <Eye size={16} className="text-gray-400" />
                                 ) : (
                                    <EyeOff size={16} className="text-blue-500" />
                                 )}
                                 <ChevronRight
                                    size={16}
                                    className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                 />
                              </div>
                           </div>

                           {/* Preview text when collapsed */}
                           {!isExpanded && (
                              <p className="text-gray-600 text-sm line-clamp-2">
                                 {note.content.substring(0, 120)}...
                              </p>
                           )}
                        </div>
                     </div>

                     {/* Expanded content */}
                     {isExpanded && (
                        <div className="px-4 pb-4 border-gray-200 border-t">
                           <div className="bg-gray-50 mt-4 p-4 rounded-lg">
                              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                 {note.content}
                              </p>
                           </div>
                        </div>
                     )}
                  </div>
               );
            })}
         </div>

         {/* View All Notes Button */}
         {notes.length > 5 && (
            <button className="flex justify-center items-center gap-2 bg-gray-50 hover:bg-gray-100 p-3 border border-gray-200 hover:border-brand-200 rounded-xl w-full text-gray-600 hover:text-brand-600 text-sm transition-all duration-200">
               <FileText size={16} />
               <span>Ver todas las notas ({notes.length})</span>
               <ChevronRight size={14} />
            </button>
         )}
      </div>
   );
}
