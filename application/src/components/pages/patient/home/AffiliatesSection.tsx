'use client';

import Link from 'next/link';
import {
   MapPin, Building2, Pill, Shield, Star, ArrowRight,
   Users, Clock, Phone
} from 'lucide-react';
import { mockAffiliates } from '@/data/mockData/affiliatesData';

export default function AffiliatesSection () {
   return (
      <div className="space-y-6">
         {/* Call to Action */}
         <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 border border-blue-200 rounded-xl text-center">
            <div className="flex justify-center mb-3">
               <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-full">
                  <Users className="w-6 h-6 text-white" />
               </div>
            </div>

            <h3 className="mb-2 font-semibold text-gray-900 text-lg">
               Red de Afiliados LLMed Clinic
            </h3>

            <p className="mb-4 text-gray-600 text-sm">
               Descubre todas las clínicas y farmacias aliadas cerca de ti.
               Encuentra ubicaciones, horarios y servicios disponibles.
            </p>

            <Link
               href="/patient/affiliates"
               className="inline-flex justify-center items-center space-x-2 bg-gradient-to-r from-blue-500 hover:from-blue-600 to-green-500 hover:to-green-600 shadow-sm hover:shadow-md px-6 py-3 rounded-lg font-medium text-white text-sm transition-all duration-200"
            >
               <span>Ver Todos los Afiliados</span>
               <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex justify-center items-center space-x-4 mt-4 text-gray-500 text-xs">
               <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>Mapa interactivo</span>
               </div>
               <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>Red verificada</span>
               </div>
               <div className="flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>Información de contacto</span>
               </div>
            </div>
         </div>
      </div>
   );
}
