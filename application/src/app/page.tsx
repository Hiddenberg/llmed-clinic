import Link from "next/link";
import { ArrowRight } from "lucide-react";

function LLMedLogo ({ className }: { className?: string }) {
   return (
      <svg
         className={className}
         viewBox="0 0 80 18"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <g clipPath="url(#clip0_23_73)">
            <path d="M3.67117 0H0V18H12.4654V14.3051H3.67117V0Z" fill="currentColor"/>
            <path d="M29.3599 0V18H33.031V3.69434C31.597 2.25182 30.7933 1.44251 29.3599 0Z" fill="currentColor"/>
            <path d="M46.6568 1.20583C46.6206 1.24229 46.5843 1.27874 46.5487 1.31464C46.4768 1.38699 46.406 1.45822 46.3352 1.52944C46.3001 1.56478 46.265 1.60067 46.2293 1.63601C46.1591 1.70667 46.0894 1.77678 46.0192 1.84745C45.9841 1.88278 45.9495 1.91755 45.9144 1.95289C45.7043 2.16433 45.4931 2.37689 45.2718 2.59955L44.1833 3.6949L38.3909 9.52384V14.7487L44.1833 8.9198V18.0006H47.8545V0C47.4064 0.450925 47.0202 0.839596 46.6562 1.20583H46.6568Z" fill="currentColor"/>
            <path d="M18.4417 0H14.7705V18H27.2359V14.3051H18.4417V0Z" fill="currentColor"/>
            <path d="M62.4439 14.3051H49.9785V17.9994H62.4439V14.3051Z" fill="currentColor"/>
            <path d="M62.4439 0H49.9785V3.69434H62.4439V0Z" fill="currentColor"/>
            <path d="M71.057 0H64.7708V3.69434H71.057C73.9685 3.69434 76.3294 6.06955 76.3294 9C76.3294 11.9299 73.969 14.3057 71.057 14.3057H64.7708V18H71.057C75.9961 18 80.0005 13.9708 80.0005 9C80.0005 4.02973 75.9966 0 71.057 0Z" fill="currentColor"/>
            <path d="M62.4439 7.15253H49.9785V10.8469H62.4439V7.15253Z" fill="currentColor"/>
         </g>
         <defs>
            <clipPath id="clip0_23_73">
               <rect width="80" height="18" fill="white"/>
            </clipPath>
         </defs>
      </svg>
   );
}

// Floating decorative elements
function FloatingElement ({
   size = 'w-2 h-2',
   position = 'top-1/4 left-1/4',
   delay = '0s',
   duration = '6s'
}: {
   size?: string;
   position?: string;
   delay?: string;
   duration?: string;
}) {
   return (
      <div
         className={`absolute ${size} ${position} bg-brand-100 rounded-full opacity-40 animate-float`}
         style={{
            animationDelay: delay,
            animationDuration: duration
         }}
      />
   );
}

// Medical cross decorative element
function MedicalCross ({
   className = '',
   delay = '0s'
}: {
   className?: string;
   delay?: string;
}) {
   return (
      <div
         className={`absolute opacity-10 text-brand-200 animate-pulse-slow ${className}`}
         style={{
            animationDelay: delay
         }}
      >
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
               d="M9 2h6v6h7v6h-7v6H9v-6H2V8h7V2z"
               fill="currentColor"
            />
         </svg>
      </div>
   );
}

export default function Home () {
   return (
      <main className="relative flex flex-col justify-center items-center bg-bg px-6 min-h-screen overflow-hidden">
         {/* Subtle gradient background */}
         <div className="absolute inset-0 bg-gradient-to-br from-brand-50/30 via-transparent to-brand-100/20 pointer-events-none" />

         {/* Floating decorative elements */}
         <FloatingElement size="w-1.5 h-1.5" position="top-[20%] left-[15%]" delay="0s" duration="8s" />
         <FloatingElement size="w-2 h-2" position="top-[30%] right-[20%]" delay="2s" duration="10s" />
         <FloatingElement size="w-1 h-1" position="top-[60%] left-[10%]" delay="4s" duration="7s" />
         <FloatingElement size="w-1.5 h-1.5" position="bottom-[25%] right-[15%]" delay="1s" duration="9s" />
         <FloatingElement size="w-1 h-1" position="top-[45%] right-[8%]" delay="6s" duration="11s" />
         <FloatingElement size="w-2 h-2" position="bottom-[40%] left-[8%]" delay="3s" duration="8s" />

         {/* Medical cross decorations */}
         <MedicalCross className="top-[15%] right-[12%]" delay="0s" />
         <MedicalCross className="bottom-[20%] left-[12%]" delay="4s" />
         <MedicalCross className="top-[50%] left-[5%]" delay="8s" />

         {/* Logo container with gentle animation */}
         <div className="z-10 relative flex flex-col items-center space-y-12 animate-fade-in">
            {/* Logo with breathing animation */}
            <div className="text-brand-700 transition-colors animate-breathe duration-2">
               <LLMedLogo className="w-80 md:w-96 lg:w-[480px] h-18 md:h-20 lg:h-24" />
            </div>

            {/* Subtitle */}
            <div className="space-y-3 text-center">
               <h1 className="font-bold text-text text-2xl md:text-3xl tracking-tight animate-fade-in-up"
                  style={{
                     animationDelay: '0.2s'
                  }}
               >
                  Sistema de Gestión Clínica
               </h1>
               <p className="max-w-2xl text-text-muted text-lg md:text-xl leading-relaxed animate-fade-in-up"
                  style={{
                     animationDelay: '0.4s'
                  }}
               >
                  Plataforma integral para la administración y seguimiento de pacientes de hemodiálisis
               </p>
            </div>

            {/* Action button with enhanced hover */}
            <Link
               href="/admin"
               className="group inline-flex justify-center items-center gap-3 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 disabled:opacity-60 shadow-elevation-1 hover:shadow-elevation-2 px-8 rounded-md focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2 h-12 font-medium text-text-inverse text-base hover:scale-[1.02] active:scale-[0.98] transition-[colors,opacity,transform,box-shadow] animate-fade-in-up duration-2 ease-[--ease-out] disabled:cursor-not-allowed"
               style={{
                  animationDelay: '0.6s'
               }}
            >
               Acceder al Sistema
               <ArrowRight size={20} strokeWidth={1.75} className="transition-transform group-hover:translate-x-0.5 duration-200" />
            </Link>
         </div>

         {/* Subtle footer */}
         <div className="bottom-8 absolute text-center animate-fade-in"
            style={{
               animationDelay: '0.8s'
            }}
         >
            <p className="text-text-muted text-sm">
               Demo
            </p>
         </div>
      </main>
   );
}
