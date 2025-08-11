/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home () {
   return (
      <div className="flex justify-center items-center bg-bg px-4 min-h-screen">
         <div className="mx-auto max-w-md text-center">
            {/* Logo */}
            <div className="flex justify-center mb-12">
               <div className="bg-surface shadow-elevation-1 p-8 border border-border rounded-lg">
                  <img src="/llmed-logo.svg"
                     className='w-44'
                     alt="LLMed Clinic"
                  />
               </div>
            </div>

            {/* Content */}
            <div className="mb-10">
               <h1 className="mb-4 font-bold text-text text-3xl md:text-4xl tracking-tight">
                  LLMed Clinic
               </h1>
               <p className="text-text-muted text-lg leading-relaxed">
                  Plataforma digital para la gestión integral de clínicas de hemodiálisis
               </p>
            </div>

            {/* CTA Button */}
            <Link href="/admin">
               <button className="group inline-flex justify-center items-center gap-2.5 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 disabled:opacity-60 shadow-elevation-1 px-8 rounded-md focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2 h-12 font-medium text-text-inverse text-base transition-[colors,opacity,transform] duration-[--dur-2] ease-[--ease-out] disabled:cursor-not-allowed">
                  Acceder al Panel de Administración
                  <ArrowRight
                     size={20}
                     strokeWidth={1.75}
                     className="transition-transform group-hover:translate-x-0.5 duration-[--dur-2] ease-[--ease-out]"
                  />
               </button>
            </Link>

            {/* Subtitle */}
            <p className="mt-6 text-text-muted text-sm">
               Versión de demostración para presentación
            </p>
         </div>
      </div>
   )
}
