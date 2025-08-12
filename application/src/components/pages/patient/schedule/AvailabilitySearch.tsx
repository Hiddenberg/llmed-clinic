import { useState } from 'react';
import {
   Search, Calendar, Clock, Filter, X, ArrowLeft
} from 'lucide-react';
import { AvailableSlot } from '@/features/calendar/hooks/useAppointmentScheduling';

interface AvailabilitySearchProps {
   onSearch: (criteria: {
      searchType: 'day' | 'time';
      value: string;
      doctorId?: string;
      appointmentType?: string;
      dateRange?: { start: Date; end: Date };
   }) => AvailableSlot[];
   doctors: Array<{ id: string; name: string; specialty: string }>;
   appointmentTypes: Record<string, { label: string; duration: number; description: string }>;
   onSlotSelect: (slot: AvailableSlot) => void;
   onBack?: () => void;
   isLoading?: boolean;
}

const dayLabels = {
   '1': 'Lunes',
   '2': 'Martes',
   '3': 'Miércoles',
   '4': 'Jueves',
   '5': 'Viernes'
};

const timeSlots = [
   '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
   '10:00', '10:30', '11:00', '11:30', '14:00', '14:30',
   '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];

export default function AvailabilitySearch ({
   onSearch,
   doctors,
   appointmentTypes,
   onSlotSelect,
   onBack,
   isLoading: externalLoading = false
}: AvailabilitySearchProps) {
   const [searchType, setSearchType] = useState<'day' | 'time'>('day');
   const [searchValue, setSearchValue] = useState('');
   const [filters, setFilters] = useState({
      doctorId: '',
      appointmentType: '',
      dateRange: {
         start: new Date()
            .toISOString()
            .split('T')[0],
         end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0]
      }
   });
   const [searchResults, setSearchResults] = useState<AvailableSlot[]>([]);
   const [isSearching, setIsSearching] = useState(false);
   const [showFilters, setShowFilters] = useState(false);

   const handleSearch = async () => {
      if (!searchValue) return;

      setIsSearching(true);

      // Simulate search delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const criteria = {
         searchType,
         value: searchValue,
         doctorId: filters.doctorId || undefined,
         appointmentType: filters.appointmentType || undefined,
         dateRange: {
            start: new Date(filters.dateRange.start),
            end: new Date(filters.dateRange.end)
         }
      };

      const results = onSearch(criteria);
      setSearchResults(results);
      setIsSearching(false);
   };



   const clearSearch = () => {
      setSearchValue('');
      setSearchResults([]);
   };

   const clearFilters = () => {
      setFilters({
         doctorId: '',
         appointmentType: '',
         dateRange: {
            start: new Date()
               .toISOString()
               .split('T')[0],
            end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
               .toISOString()
               .split('T')[0]
         }
      });
   };

   return (
      <div className="space-y-6">
         {/* Search Header */}
         <div className="text-center">
            {onBack && (
               <div className="flex justify-start items-center mb-4">
                  <button
                     onClick={onBack}
                     className="flex items-center gap-2 font-medium text-gray-600 hover:text-gray-900"
                  >
                     <ArrowLeft className="w-4 h-4" />
                     Volver al calendario
                  </button>
               </div>
            )}

            <h3 className="mb-2 font-semibold text-gray-900 text-xl">
               Buscar Disponibilidad
            </h3>
            <p className="text-gray-600">
               Encuentra citas disponibles por día de la semana o horario específico
            </p>
         </div>

         {/* Loading or No Slots Available Message */}
         {externalLoading && (
            <div className="py-8 text-center">
               <div className="mx-auto mb-4 border-green-500 border-b-2 rounded-full w-12 h-12 animate-spin" />
               <p className="text-gray-600">Cargando horarios disponibles...</p>
            </div>
         )}

         {/* Search Type Toggle */}
         {!externalLoading && (
            <div className="flex justify-center">
               <div className="bg-gray-100 p-1 rounded-lg">
                  <button
                     onClick={() => setSearchType('day')}
                     className={`px-4 py-2 rounded-md font-medium transition-colors ${
                        searchType === 'day'
                           ? 'bg-white text-green-600 shadow-sm'
                           : 'text-gray-600 hover:text-gray-900'
                     }`}
                  >
                     <Calendar className="inline mr-2 w-4 h-4" />
                     Por Día
                  </button>
                  <button
                     onClick={() => setSearchType('time')}
                     className={`px-4 py-2 rounded-md font-medium transition-colors ${
                        searchType === 'time'
                           ? 'bg-white text-green-600 shadow-sm'
                           : 'text-gray-600 hover:text-gray-900'
                     }`}
                  >
                     <Clock className="inline mr-2 w-4 h-4" />
                     Por Horario
                  </button>
               </div>
            </div>
         )}

         {/* Search Input */}
         {!externalLoading && (
            <div className="space-y-4">
               <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                     {searchType === 'day' ? 'Selecciona el día de la semana' : 'Selecciona el horario'}
                  </label>

                  {searchType === 'day' ? (
                     <select
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="px-4 py-2 border border-gray-300 focus:border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 w-full"
                     >
                        <option value="">Selecciona un día</option>
                        {Object.entries(dayLabels)
                           .map(([value, label]) => (
                              <option key={value} value={value}>{label}</option>
                           ))}
                     </select>
                  ) : (
                     <select
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="px-4 py-2 border border-gray-300 focus:border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 w-full"
                     >
                        <option value="">Selecciona un horario</option>
                        {timeSlots.map(time => (
                           <option key={time} value={time}>{time}</option>
                        ))}
                     </select>
                  )}
               </div>

               {/* Filter Toggle */}
               <div className="flex justify-between items-center">
                  <button
                     onClick={() => setShowFilters(!showFilters)}
                     className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm"
                  >
                     <Filter className="w-4 h-4" />
                     Filtros adicionales
                     {(filters.doctorId || filters.appointmentType) && (
                     <span className="bg-green-100 px-2 py-1 rounded-full text-green-800 text-xs">
                        Activos
                     </span>
                     )}
                  </button>

                  {(filters.doctorId || filters.appointmentType) && (
                  <button
                     onClick={clearFilters}
                     className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                     Limpiar filtros
                  </button>
                  )}
               </div>

               {/* Filters */}
               {showFilters && (
               <div className="space-y-4 bg-gray-50 p-4 border border-gray-200 rounded-lg">
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                     <div>
                        <label className="block mb-1 font-medium text-gray-700 text-sm">
                           Doctor
                        </label>
                        <select
                           value={filters.doctorId}
                           onChange={(e) => setFilters(prev => ({
                              ...prev,
                              doctorId: e.target.value
                           }))}
                           className="px-3 py-2 border border-gray-300 focus:border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 w-full"
                        >
                           <option value="">Cualquier doctor</option>
                           {doctors.map(doctor => (
                              <option key={doctor.id} value={doctor.id}>
                                 {doctor.name} - {doctor.specialty}
                              </option>
                           ))}
                        </select>
                     </div>

                     <div>
                        <label className="block mb-1 font-medium text-gray-700 text-sm">
                           Tipo de cita
                        </label>
                        <select
                           value={filters.appointmentType}
                           onChange={(e) => setFilters(prev => ({
                              ...prev,
                              appointmentType: e.target.value
                           }))}
                           className="px-3 py-2 border border-gray-300 focus:border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 w-full"
                        >
                           <option value="">Cualquier tipo</option>
                           {Object.entries(appointmentTypes)
                              .map(([type, config]) => (
                                 <option key={type} value={type}>{config.label}</option>
                              ))}
                        </select>
                     </div>
                  </div>

                  <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                     <div>
                        <label className="block mb-1 font-medium text-gray-700 text-sm">
                           Fecha inicio
                        </label>
                        <input
                           type="date"
                           value={filters.dateRange.start}
                           onChange={(e) => setFilters(prev => ({
                              ...prev,
                              dateRange: {
                                 ...prev.dateRange,
                                 start: e.target.value
                              }
                           }))}
                           className="px-3 py-2 border border-gray-300 focus:border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 w-full"
                        />
                     </div>

                     <div>
                        <label className="block mb-1 font-medium text-gray-700 text-sm">
                           Fecha fin
                        </label>
                        <input
                           type="date"
                           value={filters.dateRange.end}
                           onChange={(e) => setFilters(prev => ({
                              ...prev,
                              dateRange: {
                                 ...prev.dateRange,
                                 end: e.target.value
                              }
                           }))}
                           className="px-3 py-2 border border-gray-300 focus:border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 w-full"
                        />
                     </div>
                  </div>
               </div>
               )}

               {/* Search Button */}
               <div className="flex gap-3">
                  <button
                     onClick={handleSearch}
                     disabled={!searchValue || isSearching || externalLoading}
                     className="flex flex-1 justify-center items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 px-4 py-2 rounded-lg font-medium text-white transition-colors"
                  >
                     {isSearching || externalLoading ? (
                        <>
                           <div className="border-white border-b-2 rounded-full w-4 h-4 animate-spin" />
                           {externalLoading ? 'Cargando disponibilidad...' : 'Buscando...'}
                        </>
                     ) : (
                        <>
                           <Search className="w-4 h-4" />
                           Buscar Disponibilidad
                        </>
                     )}
                  </button>

                  {searchResults.length > 0 && (
                  <button
                     onClick={clearSearch}
                     className="hover:bg-gray-50 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 transition-colors"
                  >
                     <X className="w-4 h-4" />
                  </button>
                  )}
               </div>
            </div>
         )}

         {/* Search Results */}
         {searchResults.length > 0 && (
            <div className="space-y-4">
               <h4 className="font-medium text-gray-900">
                  Resultados de búsqueda ({searchResults.length} disponibles)
               </h4>

               <div className="gap-3 grid grid-cols-1 md:grid-cols-2 max-h-96 overflow-y-auto">
                  {searchResults.map((slot) => (
                     <button
                        key={`${slot.date}-${slot.time}-${slot.doctorId}`}
                        onClick={() => onSlotSelect(slot)}
                        className="bg-white hover:bg-green-50 p-4 border border-gray-200 hover:border-green-300 rounded-lg text-left transition-all"
                     >
                        <div className="flex justify-between items-center mb-2">
                           <div className="font-medium text-gray-900">
                              {new Date(slot.date)
                                 .toLocaleDateString('es-MX', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric'
                                 })}
                           </div>
                           <div className="font-medium text-green-600 text-sm">
                              {slot.time}
                           </div>
                        </div>

                        <div className="space-y-1 text-gray-600 text-sm">
                           <div>{slot.doctorName}</div>
                           <div className="text-gray-500 text-xs">
                              {appointmentTypes[slot.type]?.label} ({slot.duration} min)
                           </div>
                        </div>
                     </button>
                  ))}
               </div>
            </div>
         )}

         {/* No Results */}
         {searchValue && searchResults.length === 0 && !isSearching && (
            <div className="py-8 text-center">
               <div className="flex justify-center items-center bg-gray-100 mx-auto mb-4 rounded-full w-16 h-16">
                  <Search className="w-8 h-8 text-gray-400" />
               </div>
               <h4 className="mb-2 font-medium text-gray-900 text-lg">
                  No se encontraron citas disponibles
               </h4>
               <p className="text-gray-600">
                  Intenta con otros criterios de búsqueda o ajusta los filtros.
               </p>
            </div>
         )}
      </div>
   );
}
