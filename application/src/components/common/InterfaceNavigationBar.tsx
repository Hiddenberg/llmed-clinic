"use client"

import {
   Heart, Stethoscope, User, Shield
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationItem {
   key: string;
   label: string;
   href: string;
   icon: any;
   color: string;
   description: string;
}

const navigationItems: NavigationItem[] = [
   {
      key: 'admin',
      label: 'Administración',
      href: '/admin',
      icon: Shield,
      color: 'from-brand-500 to-blue-500',
      description: 'Panel de administración'
   },
   {
      key: 'doctor',
      label: 'Doctor',
      href: '/doctor',
      icon: Stethoscope,
      color: 'from-green-500 to-emerald-500',
      description: 'Panel médico'
   },
   {
      key: 'patient',
      label: 'Paciente',
      href: '/patient',
      icon: Heart,
      color: 'from-purple-500 to-pink-500',
      description: 'Portal del paciente'
   }
];

export default function InterfaceNavigationBar () {
   const pathname = usePathname();

   // Determine current interface based on pathname
   const getCurrentInterface = () => {
      if (pathname.includes('/admin')) return 'admin';
      if (pathname.includes('/doctor')) return 'doctor';
      if (pathname.includes('/patient')) return 'patient';
      return '';
   };

   const currentInterface = getCurrentInterface();

   return (
      <div className="top-0 z-50 sticky bg-white/95 shadow-sm backdrop-blur-sm border-gray-200/50 border-b">
         <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-between items-center py-3">
               {/* Logo/Brand */}
               <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-gradient-to-r from-brand-500 to-blue-500 rounded-lg w-8 h-8 text-white">
                     <Heart size={18} />
                  </div>
                  <div>
                     <h1 className="font-bold text-gray-800 text-lg">LLMed Clinic</h1>
                     <p className="text-gray-500 text-xs">Sistema de Gestión Médica</p>
                  </div>
               </div>

               {/* Navigation Items */}
               <nav className="flex items-center gap-2">
                  {navigationItems.map((item) => {
                     const isActive = currentInterface === item.key;
                     
                     return (
                        <Link
                           key={item.key}
                           href={item.href}
                           className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                              isActive
                                 ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-md'
                                 : 'hover:bg-gray-50 text-gray-600 hover:text-gray-800'
                           }`}
                        >
                           {/* Icon */}
                           <div className={`flex items-center justify-center rounded-lg w-8 h-8 transition-all ${
                              isActive
                                 ? 'bg-white/20 text-white'
                                 : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                           }`}>
                              <item.icon size={16} />
                           </div>

                           {/* Label and Description */}
                           <div className="hidden sm:block">
                              <p className={`font-medium text-sm leading-tight ${
                                 isActive ? 'text-white' : 'text-gray-700 group-hover:text-gray-800'
                              }`}>
                                 {item.label}
                              </p>
                              <p className={`text-xs leading-tight ${
                                 isActive ? 'text-white/80' : 'text-gray-500 group-hover:text-gray-600'
                              }`}>
                                 {item.description}
                              </p>
                           </div>

                           {/* Active indicator */}
                           {isActive && (
                              <div className="top-0 right-0 absolute bg-white rounded-full w-2 h-2" />
                           )}

                           {/* Tooltip for mobile */}
                           <div className="sm:hidden -bottom-10 left-1/2 absolute bg-gray-800 opacity-0 group-hover:opacity-100 px-2 py-1 rounded text-white text-xs whitespace-nowrap transition-opacity -translate-x-1/2 pointer-events-none transform">
                              {item.label}
                           </div>
                        </Link>
                     );
                  })}
               </nav>

               {/* Demo Badge */}
               <div className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-brand-50 to-blue-50 px-3 py-1.5 border border-brand-200/50 rounded-full">
                  <div className="bg-brand-400 rounded-full w-2 h-2 animate-pulse" />
                  <span className="font-medium text-brand-700 text-xs">Demo v1.0</span>
               </div>
            </div>
         </div>
      </div>
   );
}
