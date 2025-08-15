'use client';

import { useState } from 'react';
import {
   MapPin, Phone, Mail, Clock, Star, Shield,
   Building2, Pill, ExternalLink, Filter, Search
} from 'lucide-react';
import { mockAffiliates, Affiliate } from '@/data/mockData/affiliatesData';
import { AffiliatesMap } from './AffiliatesMap';

export default function PatientAffiliatesPage () {
   const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
   const [filterType, setFilterType] = useState<'all' | 'clinic' | 'pharmacy'>('all');
   const [searchTerm, setSearchTerm] = useState('');

   const filteredAffiliates = mockAffiliates.filter(affiliate => {
      const matchesType = filterType === 'all' || affiliate.type === filterType;
      const matchesSearch = affiliate.name.toLowerCase()
         .includes(searchTerm.toLowerCase()) ||
                           affiliate.location.city.toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                           affiliate.location.state.toLowerCase()
                              .includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
   });

   // Get featured affiliates (highest rated ones)
   const featuredAffiliates = mockAffiliates
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);

   const totalAffiliates = mockAffiliates.length;
   const clinics = mockAffiliates.filter(a => a.type === 'clinic').length;
   const pharmacies = mockAffiliates.filter(a => a.type === 'pharmacy').length;

   return (
      <div className="bg-gray-50 mx-auto max-w-7xl min-h-screen">
         <div className='space-y-4 py-4'>

            <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
               <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl text-center">
                  <div className="flex justify-center mb-2">
                     <div className="bg-blue-500 p-2 rounded-full">
                        <Building2 className="w-5 h-5 text-white" />
                     </div>
                  </div>
                  <div className="font-bold text-blue-700 text-2xl">{clinics}</div>
                  <div className="text-blue-600 text-sm">Clínicas Aliadas</div>
               </div>

               <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-4 rounded-xl text-center">
                  <div className="flex justify-center mb-2">
                     <div className="bg-green-500 p-2 rounded-full">
                        <Pill className="w-5 h-5 text-white" />
                     </div>
                  </div>
                  <div className="font-bold text-green-700 text-2xl">{pharmacies}</div>
                  <div className="text-green-600 text-sm">Farmacias Aliadas</div>
               </div>

               <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 rounded-xl text-center">
                  <div className="flex justify-center mb-2">
                     <div className="bg-purple-500 p-2 rounded-full">
                        <MapPin className="w-5 h-5 text-white" />
                     </div>
                  </div>
                  <div className="font-bold text-purple-700 text-2xl">{totalAffiliates}</div>
                  <div className="text-purple-600 text-sm">Ubicaciones</div>
               </div>
            </div>

            {/* Featured Affiliates */}
            <div>
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800 text-lg">Afiliados Destacados</h3>
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                     <Shield className="w-4 h-4" />
                     <span>Verificados</span>
                  </div>
               </div>

               <div className="space-y-3">
                  {featuredAffiliates.map((affiliate) => (
                     <div
                        key={affiliate.id}
                        className="bg-white hover:shadow-sm p-4 border border-gray-200 hover:border-gray-300 rounded-lg transition-all duration-200"
                     >
                        <div className="flex items-start space-x-3">
                           <div className={`p-2 rounded-lg ${
                              affiliate.type === 'clinic'
                                 ? 'bg-blue-100 text-blue-600'
                                 : 'bg-green-100 text-green-600'
                           }`}
                           >
                              {affiliate.type === 'clinic' ?
                                 <Building2 className="w-4 h-4" /> :
                                 <Pill className="w-4 h-4" />}
                           </div>

                           <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                 <h4 className="font-medium text-gray-900 text-sm truncate leading-tight">
                                    {affiliate.name}
                                 </h4>
                                 <div className="flex items-center space-x-1 ml-2 text-yellow-500">
                                    <Star className="fill-current w-3 h-3" />
                                    <span className="font-medium text-gray-700 text-xs">{affiliate.rating}</span>
                                 </div>
                              </div>

                              <div className="flex items-center space-x-2 mb-2 text-gray-600">
                                 <MapPin className="w-3 h-3" />
                                 <span className="text-xs truncate">
                                    {affiliate.location.city}, {affiliate.location.state}
                                 </span>
                              </div>

                              <div className="flex justify-between items-center">
                                 <div className="flex items-center space-x-3 text-gray-500 text-xs">
                                    <div className="flex items-center space-x-1">
                                       <Phone className="w-3 h-3" />
                                       <span>Contacto</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                       <Clock className="w-3 h-3" />
                                       <span>Horarios</span>
                                    </div>
                                 </div>

                                 <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    affiliate.type === 'clinic'
                                       ? 'bg-blue-100 text-blue-700'
                                       : 'bg-green-100 text-green-700'
                                 }`}
                                 >
                                    {affiliate.type === 'clinic' ? 'Clínica' : 'Farmacia'}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
         {/* Header */}
         <div className="bg-white border-gray-200 border-b">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
               <div className="flex justify-between items-center">
                  <div>
                     <h1 className="font-bold text-gray-900 text-3xl">Afiliados y Aliados</h1>
                     <p className="mt-1 text-gray-600">
                        Encuentra clínicas y farmacias aliadas cerca de ti
                     </p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500 text-sm">
                     <Shield className="w-4 h-4" />
                     <span>Red verificada de aliados</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
            {/* Filters and Search */}
            <div className="bg-white shadow-sm mb-8 p-6 border border-gray-200 rounded-xl">
               <div className="flex sm:flex-row flex-col gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                     <Search className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform" />
                     <input
                        type="text"
                        placeholder="Buscar por nombre, ciudad o estado..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="py-3 pr-4 pl-10 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                     />
                  </div>

                  {/* Type Filter */}
                  <div className="flex items-center space-x-2">
                     <Filter className="w-5 h-5 text-gray-400" />
                     <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value as 'all' | 'clinic' | 'pharmacy')}
                        className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500"
                     >
                        <option value="all">Todos</option>
                        <option value="clinic">Clínicas</option>
                        <option value="pharmacy">Farmacias</option>
                     </select>
                  </div>
               </div>
            </div>

            <div className="gap-8 grid grid-cols-1">
               {/* Affiliates List */}
               <div className="space-y-4">
                  <h2 className="mb-4 font-semibold text-gray-900 text-xl">
                     Afiliados ({filteredAffiliates.length})
                  </h2>

                  <div className="space-y-4 max-h-[800px] overflow-y-auto">
                     {filteredAffiliates.map((affiliate) => (
                        <AffiliateCard
                           key={affiliate.id}
                           affiliate={affiliate}
                           isSelected={selectedAffiliate?.id === affiliate.id}
                           onSelect={() => setSelectedAffiliate(affiliate)}
                        />
                     ))}
                  </div>
               </div>

               {/* Map */}
               {/* <div className="lg:top-8 lg:sticky">
                  <h2 className="mb-4 font-semibold text-gray-900 text-xl">Ubicaciones</h2>
                  <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
                     <AffiliatesMap
                        affiliates={filteredAffiliates}
                        selectedAffiliate={selectedAffiliate}
                        onAffiliateSelect={setSelectedAffiliate}
                     />
                  </div>
               </div> */}
            </div>
         </div>
      </div>
   );
}

interface AffiliateCardProps {
   affiliate: Affiliate;
   isSelected: boolean;
   onSelect: () => void;
}

function AffiliateCard ({
   affiliate, isSelected, onSelect
}: AffiliateCardProps) {
   return (
      <div
         className={`bg-white rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
            isSelected ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
         }`}
         onClick={onSelect}
      >
         <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
               <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                     affiliate.type === 'clinic'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-green-100 text-green-600'
                  }`}
                  >
                     {affiliate.type === 'clinic' ?
                        <Building2 className="w-5 h-5" /> :
                        <Pill className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                     <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                        {affiliate.name}
                     </h3>
                     <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                           affiliate.type === 'clinic'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                        }`}
                        >
                           {affiliate.type === 'clinic' ? 'Clínica' : 'Farmacia'}
                        </span>
                        {affiliate.verified && (
                           <div className="flex items-center space-x-1">
                              <Shield className="w-3 h-3 text-blue-500" />
                              <span className="text-blue-600 text-xs">Verificado</span>
                           </div>
                        )}
                     </div>
                  </div>
               </div>

               <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="fill-current w-4 h-4" />
                  <span className="font-medium text-gray-700 text-sm">{affiliate.rating}</span>
               </div>
            </div>

            {/* Description */}
            <p className="mb-4 text-gray-600 text-sm line-clamp-2">
               {affiliate.description}
            </p>

            {/* Location */}
            <div className="flex items-center space-x-2 mb-3 text-gray-600">
               <MapPin className="w-4 h-4" />
               <span className="text-sm">
                  {affiliate.location.address}, {affiliate.location.city}, {affiliate.location.state}
               </span>
            </div>

            {/* Services */}
            <div className="mb-4">
               <div className="flex flex-wrap gap-1">
                  {affiliate.services.slice(0, 3)
                     .map((service, index) => (
                        <span
                           key={index}
                           className="bg-gray-100 px-2 py-1 rounded-md text-gray-700 text-xs"
                        >
                           {service}
                        </span>
                     ))}
                  {affiliate.services.length > 3 && (
                     <span className="bg-gray-100 px-2 py-1 rounded-md text-gray-700 text-xs">
                        +{affiliate.services.length - 3} más
                     </span>
                  )}
               </div>
            </div>

            {/* Contact Info */}
            <div className="flex justify-between items-center pt-4 border-gray-100 border-t">
               <div className="flex items-center space-x-4 text-gray-600 text-sm">
                  <div className="flex items-center space-x-1">
                     <Phone className="w-3 h-3" />
                     <span>{affiliate.phone}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                     <Clock className="w-3 h-3" />
                     <span>Ver horarios</span>
                  </div>
               </div>

               {affiliate.website && (
                  <a
                     href={affiliate.website}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                     onClick={(e) => e.stopPropagation()}
                  >
                     <ExternalLink className="w-3 h-3" />
                     <span>Sitio web</span>
                  </a>
               )}
            </div>
         </div>
      </div>
   );
}
