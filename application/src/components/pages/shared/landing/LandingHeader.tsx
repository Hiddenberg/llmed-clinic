"use client"

import {
   Heart, Menu, X
} from 'lucide-react';
import { useState } from 'react';

const navigationItems = [
   {
      label: 'Inicio',
      href: '#hero'
   },
   {
      label: 'Servicios',
      href: '#features'
   },
   {
      label: 'Nosotros',
      href: '#benefits'
   },
   {
      label: 'Testimonios',
      href: '#testimonials'
   },
   {
      label: 'Contacto',
      href: '#contact'
   }
];

export default function LandingHeader () {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
         <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-between items-center py-4">
               {/* Logo/Brand */}
               <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-gradient-to-r from-brand-500 to-blue-500 rounded-lg w-10 h-10 text-white">
                     <Heart size={20} />
                  </div>
                  <div>
                     <h1 className="font-bold text-gray-800 text-xl">LLMed Clinic</h1>
                     <p className="text-gray-500 text-xs">Sistema de Gestión Médica</p>
                  </div>
               </div>

               {/* Desktop Navigation */}
               <nav className="hidden md:flex items-center gap-1">
                  {navigationItems.map((item) => (
                     <a
                        key={item.label}
                        href={item.href}
                        className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200 font-medium"
                     >
                        {item.label}
                     </a>
                  ))}
               </nav>

               {/* CTA Button */}
               <div className="hidden md:flex items-center gap-4">
                  <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-brand-500 to-blue-500 hover:from-brand-600 hover:to-blue-600 px-6 py-2.5 rounded-xl font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg">
                     Agendar Cita
                  </button>
               </div>

               {/* Mobile Menu Button */}
               <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
               >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
               </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
               <div className="md:hidden bg-white border-t border-gray-200 py-4 animate-fade-in">
                  <nav className="flex flex-col space-y-2">
                     {navigationItems.map((item) => (
                        <a
                           key={item.label}
                           href={item.href}
                           className="px-4 py-3 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200 font-medium"
                           onClick={() => setIsMenuOpen(false)}
                        >
                           {item.label}
                        </a>
                     ))}
                     <div className="pt-2">
                        <button className="w-full group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-500 to-blue-500 hover:from-brand-600 hover:to-blue-600 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg">
                           Agendar Cita
                        </button>
                     </div>
                  </nav>
               </div>
            )}
         </div>
      </header>
   );
}
