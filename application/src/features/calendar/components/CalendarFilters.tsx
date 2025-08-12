'use client';

import { useState } from 'react';
import { X, Check, RotateCcw } from 'lucide-react';
import { CalendarFilter, eventTypeConfig, statusConfig, priorityConfig } from '@/data/mockData/calendarData';

interface CalendarFiltersProps {
   filters: Partial<CalendarFilter>;
   onFiltersChange: (filters: Partial<CalendarFilter>) => void;
   onClearFilters: () => void;
   onClose: () => void;
   filterOptions: {
      types: string[];
      statuses: string[];
      priorities: string[];
      doctors: string[];
      rooms: string[];
   };
}

export default function CalendarFilters({
   filters,
   onFiltersChange,
   onClearFilters,
   onClose,
   filterOptions
}: CalendarFiltersProps) {
   const [localFilters, setLocalFilters] = useState<Partial<CalendarFilter>>(filters);

   const handleFilterChange = (category: keyof CalendarFilter, value: string) => {
      const currentValues = localFilters[category] || [];
      const newValues = currentValues.includes(value)
         ? currentValues.filter(v => v !== value)
         : [...currentValues, value];
      
      const updatedFilters = {
         ...localFilters,
         [category]: newValues
      };
      
      setLocalFilters(updatedFilters);
      onFiltersChange(updatedFilters);
   };

   const handleClearFilters = () => {
      setLocalFilters({
         types: [],
         statuses: [],
         priorities: [],
         doctors: [],
         rooms: []
      });
      onClearFilters();
   };

   const isFilterActive = (category: keyof CalendarFilter, value: string) => {
      return (localFilters[category] || []).includes(value);
   };

   const hasActiveFilters = Object.values(localFilters).some(arr => arr && arr.length > 0);

   return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
         <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
               <h2 className="text-xl font-semibold text-gray-900">Filtrar Eventos</h2>
               <div className="flex items-center gap-2">
                  {hasActiveFilters && (
                     <button
                        onClick={handleClearFilters}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                     >
                        <RotateCcw className="w-4 h-4" />
                        Limpiar
                     </button>
                  )}
                  <button
                     onClick={onClose}
                     className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                     <X className="w-5 h-5 text-gray-500" />
                  </button>
               </div>
            </div>

            {/* Filters Content */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
               {/* Event Types */}
               <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Tipo de Evento</h3>
                  <div className="grid grid-cols-2 gap-3">
                     {filterOptions.types.map((type) => {
                        const config = eventTypeConfig[type as keyof typeof eventTypeConfig];
                        const isActive = isFilterActive('types', type);
                        
                        return (
                           <button
                              key={type}
                              onClick={() => handleFilterChange('types', type)}
                              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                                 isActive
                                    ? 'border-brand-300 bg-brand-50 text-brand-700'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                           >
                              <div 
                                 className="w-3 h-3 rounded-full flex-shrink-0"
                                 style={{ backgroundColor: config?.color || '#6b7280' }}
                              />
                              <span className="text-sm font-medium truncate">
                                 {config?.label || type}
                              </span>
                              {isActive && <Check className="w-4 h-4 ml-auto" />}
                           </button>
                        );
                     })}
                  </div>
               </div>

               {/* Status */}
               <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Estado</h3>
                  <div className="grid grid-cols-2 gap-3">
                     {filterOptions.statuses.map((status) => {
                        const config = statusConfig[status as keyof typeof statusConfig];
                        const isActive = isFilterActive('statuses', status);
                        
                        return (
                           <button
                              key={status}
                              onClick={() => handleFilterChange('statuses', status)}
                              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                                 isActive
                                    ? 'border-brand-300 bg-brand-50 text-brand-700'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                           >
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${config?.badgeColor || 'bg-gray-100 text-gray-800'}`}>
                                 {config?.label || status}
                              </span>
                              {isActive && <Check className="w-4 h-4 ml-auto" />}
                           </button>
                        );
                     })}
                  </div>
               </div>

               {/* Priority */}
               <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Prioridad</h3>
                  <div className="grid grid-cols-2 gap-3">
                     {filterOptions.priorities.map((priority) => {
                        const config = priorityConfig[priority as keyof typeof priorityConfig];
                        const isActive = isFilterActive('priorities', priority);
                        
                        return (
                           <button
                              key={priority}
                              onClick={() => handleFilterChange('priorities', priority)}
                              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                                 isActive
                                    ? 'border-brand-300 bg-brand-50 text-brand-700'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                           >
                              <div 
                                 className="w-3 h-3 rounded-full flex-shrink-0"
                                 style={{ backgroundColor: config?.color || '#6b7280' }}
                              />
                              <span className="text-sm font-medium">
                                 {config?.label || priority}
                              </span>
                              {isActive && <Check className="w-4 h-4 ml-auto" />}
                           </button>
                        );
                     })}
                  </div>
               </div>

               {/* Doctors */}
               {filterOptions.doctors.length > 0 && (
                  <div>
                     <h3 className="text-lg font-medium text-gray-900 mb-3">Doctores</h3>
                     <div className="space-y-2">
                        {filterOptions.doctors.map((doctorId) => {
                           const isActive = isFilterActive('doctors', doctorId);
                           
                           return (
                              <button
                                 key={doctorId}
                                 onClick={() => handleFilterChange('doctors', doctorId)}
                                 className={`flex items-center justify-between w-full p-3 rounded-lg border transition-all ${
                                    isActive
                                       ? 'border-brand-300 bg-brand-50 text-brand-700'
                                       : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                 }`}
                              >
                                 <span className="text-sm font-medium">
                                    {doctorId === 'all' ? 'Todo el personal' : `Doctor ${doctorId}`}
                                 </span>
                                 {isActive && <Check className="w-4 h-4" />}
                              </button>
                           );
                        })}
                     </div>
                  </div>
               )}

               {/* Rooms */}
               {filterOptions.rooms.length > 0 && (
                  <div>
                     <h3 className="text-lg font-medium text-gray-900 mb-3">Salas</h3>
                     <div className="grid grid-cols-2 gap-3">
                        {filterOptions.rooms.map((room) => {
                           const isActive = isFilterActive('rooms', room);
                           
                           return (
                              <button
                                 key={room}
                                 onClick={() => handleFilterChange('rooms', room)}
                                 className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                                    isActive
                                       ? 'border-brand-300 bg-brand-50 text-brand-700'
                                       : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                 }`}
                              >
                                 <span className="text-sm font-medium">{room}</span>
                                 {isActive && <Check className="w-4 h-4" />}
                              </button>
                           );
                        })}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
