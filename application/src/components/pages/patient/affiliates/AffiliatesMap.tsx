'use client';

import { useState } from 'react';
import {
   MapPin, Building2, Pill, Navigation, Maximize2
} from 'lucide-react';
import { Affiliate } from '@/data/mockData/affiliatesData';

interface AffiliatesMapProps {
   affiliates: Affiliate[];
   selectedAffiliate: Affiliate | null;
   onAffiliateSelect: (affiliate: Affiliate) => void;
}

export function AffiliatesMap ({
   affiliates, selectedAffiliate, onAffiliateSelect
}: AffiliatesMapProps) {
   const [mapCenter, setMapCenter] = useState({
      lat: 19.4326,
      lng: -99.1332
   }); // Mexico City center
   const [zoomLevel, setZoomLevel] = useState(6);

   // Calculate bounds to show all affiliates
   const bounds = affiliates.reduce(
      (acc, affiliate) => ({
         minLat: Math.min(acc.minLat, affiliate.location.lat),
         maxLat: Math.max(acc.maxLat, affiliate.location.lat),
         minLng: Math.min(acc.minLng, affiliate.location.lng),
         maxLng: Math.max(acc.maxLng, affiliate.location.lng),
      }),
      {
         minLat: 90,
         maxLat: -90,
         minLng: 180,
         maxLng: -180
      }
   );

   const handleAffiliateClick = (affiliate: Affiliate) => {
      onAffiliateSelect(affiliate);
      setMapCenter({
         lat: affiliate.location.lat,
         lng: affiliate.location.lng
      });
   };

   const getDirectionsUrl = (affiliate: Affiliate) => {
      return `https://www.google.com/maps/dir/?api=1&destination=${affiliate.location.lat},${affiliate.location.lng}`;
   };

   return (
      <div className="relative bg-gray-100 rounded-lg h-[600px] overflow-hidden">
         {/* Map Header */}
         <div className="top-0 right-0 left-0 z-10 absolute bg-white/95 backdrop-blur-sm p-4 border-gray-200 border-b">
            <div className="flex justify-between items-center">
               <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">
                     Mapa de Afiliados ({affiliates.length})
                  </span>
               </div>
               <button
                  onClick={() => {
                     // Center map to show all affiliates
                     if (affiliates.length > 0) {
                        const centerLat = (bounds.minLat + bounds.maxLat) / 2;
                        const centerLng = (bounds.minLng + bounds.maxLng) / 2;
                        setMapCenter({
                           lat: centerLat,
                           lng: centerLng
                        });
                        setZoomLevel(5);
                     }
                  }}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
               >
                  <Maximize2 className="w-4 h-4" />
                  <span>Ver todos</span>
               </button>
            </div>
         </div>

         {/* Simplified Map View */}
         <div className="absolute inset-0 pt-16">
            <div className="relative bg-gradient-to-br from-blue-50 to-green-50 h-full overflow-hidden">
               {/* Mexico outline representation */}
               <div className="absolute inset-4 bg-white/50 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="top-2 left-2 absolute font-medium text-gray-500 text-xs">
                     República Mexicana
                  </div>

                  {/* Affiliate markers positioned relatively */}
                  {affiliates.map((affiliate) => {
                     // Simple positioning based on coordinates (normalized)
                     const normalizedLat = ((affiliate.location.lat - 14) / (33 - 14)) * 100;
                     const normalizedLng = ((affiliate.location.lng + 118) / (-86 + 118)) * 100;

                     return (
                        <div
                           key={affiliate.id}
                           className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                              selectedAffiliate?.id === affiliate.id
                                 ? 'scale-125 z-20'
                                 : 'hover:scale-110 z-10'
                           }`}
                           style={{
                              left: `${Math.max(10, Math.min(90, normalizedLng))}%`,
                              top: `${Math.max(10, Math.min(90, 100 - normalizedLat))}%`,
                           }}
                           onClick={() => handleAffiliateClick(affiliate)}
                        >
                           <div className={`relative ${
                              selectedAffiliate?.id === affiliate.id
                                 ? 'animate-pulse'
                                 : ''
                           }`}
                           >
                              <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                                 affiliate.type === 'clinic'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-green-500 text-white'
                              } ${
                                 selectedAffiliate?.id === affiliate.id
                                    ? 'ring-4 ring-blue-200'
                                    : ''
                              }`}
                              >
                                 {affiliate.type === 'clinic' ? (
                                    <Building2 className="w-4 h-4" />
                                 ) : (
                                    <Pill className="w-4 h-4" />
                                 )}
                              </div>

                              {/* Tooltip */}
                              <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 transition-all duration-200 ${
                                 selectedAffiliate?.id === affiliate.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                              }`}
                              >
                                 <div className="bg-gray-900 px-2 py-1 rounded-lg text-white text-xs whitespace-nowrap">
                                    {affiliate.name}
                                    <div className="text-gray-300">{affiliate.location.city}, {affiliate.location.state}</div>
                                    <div className="top-full left-1/2 absolute border-t-4 border-t-gray-900 border-transparent border-r-4 border-l-4 -translate-x-1/2 transform" />
                                 </div>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>

               {/* Legend */}
               <div className="bottom-4 left-4 absolute bg-white/95 shadow-sm backdrop-blur-sm p-3 rounded-lg">
                  <div className="mb-2 font-medium text-gray-900 text-xs">Leyenda</div>
                  <div className="space-y-1">
                     <div className="flex items-center space-x-2">
                        <div className="flex justify-center items-center bg-blue-500 rounded-full w-4 h-4">
                           <Building2 className="w-2 h-2 text-white" />
                        </div>
                        <span className="text-gray-700 text-xs">Clínicas</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <div className="flex justify-center items-center bg-green-500 rounded-full w-4 h-4">
                           <Pill className="w-2 h-2 text-white" />
                        </div>
                        <span className="text-gray-700 text-xs">Farmacias</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Selected Affiliate Info */}
         {selectedAffiliate && (
            <div className="right-4 bottom-4 absolute bg-white shadow-lg p-4 rounded-lg max-w-xs">
               <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                     selectedAffiliate.type === 'clinic'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-green-100 text-green-600'
                  }`}
                  >
                     {selectedAffiliate.type === 'clinic' ?
                        <Building2 className="w-4 h-4" /> :
                        <Pill className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                     <h4 className="font-medium text-gray-900 text-sm leading-tight">
                        {selectedAffiliate.name}
                     </h4>
                     <p className="mt-1 text-gray-600 text-xs">
                        {selectedAffiliate.location.city}, {selectedAffiliate.location.state}
                     </p>
                     <div className="mt-2">
                        <a
                           href={getDirectionsUrl(selectedAffiliate)}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-xs"
                        >
                           <Navigation className="w-3 h-3" />
                           <span>Cómo llegar</span>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
