"use client"

import { useState, useEffect } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { FieldAnimationState } from './types';

interface AnimatedFieldProps {
   label: string;
   value: string;
   animationState?: FieldAnimationState[string];
   isEditing?: boolean;
   type?: 'text' | 'email' | 'date' | 'select' | 'textarea';
   options?: { value: string; label: string }[];
   onChange?: (value: string) => void;
}

export default function AnimatedField({
   label,
   value,
   animationState,
   isEditing = false,
   type = 'text',
   options,
   onChange
}: AnimatedFieldProps) {
   const [displayValue, setDisplayValue] = useState('');
   const [isTyping, setIsTyping] = useState(false);

   // Simulate typing animation
   useEffect(() => {
      if (!animationState?.isAnimating && !animationState?.isCompleted) {
         setDisplayValue('');
         return;
      }

      if (animationState?.isAnimating && !isEditing) {
         setIsTyping(true);
         setDisplayValue('');

         let currentIndex = 0;
         const typeInterval = setInterval(() => {
            if (currentIndex <= value.length) {
               setDisplayValue(value.slice(0, currentIndex));
               currentIndex++;
            } else {
               clearInterval(typeInterval);
               setIsTyping(false);
            }
         }, 30 + Math.random() * 40); // Variable typing speed for realism

         return () => clearInterval(typeInterval);
      } else if (animationState?.isCompleted || isEditing) {
         setDisplayValue(value);
         setIsTyping(false);
      }
   }, [value, animationState, isEditing]);

   const getDisplayLabel = () => {
      if (type === 'select' && options && !isEditing) {
         const option = options.find(opt => opt.value === value);
         return option ? option.label : value;
      }
      return displayValue;
   };

   const renderField = () => {
      if (isEditing) {
         if (type === 'select' && options) {
            return (
               <select
                  value={value}
                  onChange={(e) => onChange?.(e.target.value)}
                  className="focus:ring-opacity-50 px-3 py-2 border border-gray-300 focus:border-brand-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 w-full"
               >
                  {options.map((option) => (
                     <option key={option.value} value={option.value}>
                        {option.label}
                     </option>
                  ))}
               </select>
            );
         } else if (type === 'textarea') {
            return (
               <textarea
                  value={value}
                  onChange={(e) => onChange?.(e.target.value)}
                  rows={4}
                  className="focus:ring-opacity-50 px-3 py-2 border border-gray-300 focus:border-brand-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 w-full resize-none"
               />
            );
         } else {
            return (
               <input
                  type={type}
                  value={value}
                  onChange={(e) => onChange?.(e.target.value)}
                  className="focus:ring-opacity-50 px-3 py-2 border border-gray-300 focus:border-brand-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 w-full"
               />
            );
         }
      }

      // Display mode
      if (type === 'textarea') {
         return (
            <div className="bg-gray-50 px-3 py-2 border rounded-lg min-h-[100px] whitespace-pre-wrap">
               {getDisplayLabel()}
               {isTyping && <span className="text-brand-500 animate-pulse">|</span>}
            </div>
         );
      }

      return (
         <div className="bg-gray-50 px-3 py-2 border rounded-lg">
            {getDisplayLabel()}
            {isTyping && <span className="text-brand-500 animate-pulse">|</span>}
         </div>
      );
   };

   return (
      <div className="space-y-2">
         <div className="flex justify-between items-center">
            <label className="block font-medium text-gray-700 text-sm">
               {label}
            </label>
            
            {/* Animation Status Indicator */}
            {animationState && !isEditing && (
               <div className="flex items-center gap-1">
                  {animationState.isAnimating ? (
                     <>
                        <Loader2 size={14} className="text-brand-500 animate-spin" />
                        <span className="text-brand-600 text-xs">Llenando...</span>
                     </>
                  ) : animationState.isCompleted ? (
                     <>
                        <CheckCircle size={14} className="text-green-500" />
                        <span className="text-green-600 text-xs">Completado</span>
                     </>
                  ) : (
                     <div className="bg-gray-300 rounded-full w-3 h-3" />
                  )}
               </div>
            )}
         </div>

         <div className={`transition-all duration-200 ${
            animationState?.isAnimating && !isEditing
               ? 'ring-2 ring-brand-500 ring-opacity-50 shadow-sm'
               : animationState?.isCompleted && !isEditing
                  ? 'ring-2 ring-green-500 ring-opacity-50'
                  : ''
         }`}>
            {renderField()}
         </div>

         {/* Field confidence indicator for extracted data */}
         {!isEditing && animationState?.isCompleted && (
            <div className="flex items-center gap-1">
               <div className="bg-green-500 rounded-full w-2 h-2" />
               <span className="text-green-600 text-xs">
                  Extraído con alta confianza
               </span>
            </div>
         )}
      </div>
   );
}
