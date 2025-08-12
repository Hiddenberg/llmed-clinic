'use client';

import { useState } from 'react';
import { Calendar, CheckCircle } from 'lucide-react';
import {
   useAppointmentScheduling, AppointmentRequest, AvailableSlot
} from '@/features/calendar/hooks/useAppointmentScheduling';
import AppointmentTypeSelector from './AppointmentTypeSelector';
import DoctorSelector from './DoctorSelector';
import DateTimeSelector from './DateTimeSelector';
import AppointmentForm from './AppointmentForm';
import BookingConfirmation from './BookingConfirmation';
import RecurringAppointmentOptions from './RecurringAppointmentOptions';
import AvailabilitySearch from './AvailabilitySearch';

type BookingStep = 'type' | 'doctor' | 'datetime' | 'search' | 'details' | 'confirmation';

// Floating geometric shapes for background decoration
function FloatingGeometry () {
   return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {/* Simplified gradient orbs with reduced blur */}
         <div className="-top-24 -right-24 absolute bg-gradient-to-br from-green-500/10 to-blue-500/5 rounded-full w-96 h-96 animate-pulse"
            style={{
               animationDuration: '4s'
            }}
         />
         <div className="top-1/2 -left-32 absolute bg-gradient-to-br from-blue-400/8 to-green-400/5 rounded-full w-64 h-64 animate-float"
            style={{
               animationDuration: '8s'
            }}
         />

         {/* Geometric lines */}
         <div className="top-20 left-1/4 absolute bg-gradient-to-b from-green-300/30 to-transparent w-px h-32" />
         <div className="top-32 right-1/3 absolute bg-gradient-to-r from-blue-300/30 to-transparent w-24 h-px" />

         {/* Small floating dots */}
         <div className="top-16 left-1/3 absolute bg-green-400 rounded-full w-2 h-2 animate-pulse" />
         <div className="right-1/4 bottom-20 absolute bg-blue-400 rounded-full w-1.5 h-1.5 animate-pulse"
            style={{
               animationDelay: '1s'
            }}
         />
         <div className="top-1/2 right-1/6 absolute bg-green-300 rounded-full w-1 h-1 animate-pulse"
            style={{
               animationDelay: '2s'
            }}
         />
      </div>
   );
}

function Header () {
   const currentTime = new Date()
      .toLocaleDateString('es-ES', {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric'
      });

   return (
      <div className="relative mb-8">
         <div className="flex items-center gap-4 mb-2">
            <div className="flex justify-center items-center bg-green-100 rounded-full w-12 h-12">
               <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
               <h1 className="font-bold text-gray-900 text-3xl">
                  Agendar Cita
               </h1>
               <p className="mt-1 text-gray-600">
                  Programa tu próxima cita médica de forma fácil y rápida
               </p>
            </div>
         </div>

         <div className="text-gray-500 text-sm capitalize">
            {currentTime}
         </div>
      </div>
   );
}

function ProgressIndicator ({
   currentStep, steps
}: { currentStep: BookingStep; steps: BookingStep[] }) {
   const stepLabels = {
      type: 'Tipo de Cita',
      doctor: 'Seleccionar Doctor',
      datetime: 'Fecha y Hora',
      search: 'Buscar Disponibilidad',
      details: 'Detalles',
      confirmation: 'Confirmación'
   };

   const currentIndex = steps.indexOf(currentStep);

   return (
      <div className="mb-8">
         <div className="flex justify-center items-center">
            {steps.map((step, index) => (
               <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                     index <= currentIndex
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 bg-white text-gray-400'
                  }`}
                  >
                     {index < currentIndex ? (
                        <CheckCircle className="w-5 h-5" />
                     ) : (
                        <span className="font-medium text-sm">{index + 1}</span>
                     )}
                  </div>

                  {index < steps.length - 1 && (
                     <div className={`w-16 h-0.5 mx-2 transition-colors ${
                        index < currentIndex ? 'bg-green-500' : 'bg-gray-300'
                     }`}
                     />
                  )}
               </div>
            ))}
         </div>

         <div className="mt-4 text-center">
            <p className="font-medium text-gray-900 text-lg">
               {stepLabels[currentStep]}
            </p>
            <p className="text-gray-500 text-sm">
               Paso {currentIndex + 1} de {steps.length}
            </p>
         </div>
      </div>
   );
}

export default function PatientSchedulePage () {
   const [currentStep, setCurrentStep] = useState<BookingStep>('type');
   const [appointmentData, setAppointmentData] = useState<Partial<AppointmentRequest>>({
      patientId: 'patient-001', // In real app, this would come from auth
      patientName: 'Juan Pérez', // In real app, this would come from auth
      isRecurring: false,
      recurringPattern: {
         frequency: 'weekly' as const,
         duration: 4
      }
   });
   const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
   const [showSearch, setShowSearch] = useState(false);

   const {
      availableSlots,
      isLoading,
      bookingStatus,
      loadAvailableSlots,
      bookAppointment,
      resetBookingStatus,
      searchAvailableSlots,
      doctors,
      appointmentTypes
   } = useAppointmentScheduling();

   const steps: BookingStep[] = showSearch
      ? ['type', 'doctor', 'search', 'details', 'confirmation']
      : ['type', 'doctor', 'datetime', 'details', 'confirmation'];

   const handleNext = () => {
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex < steps.length - 1) {
         setCurrentStep(steps[currentIndex + 1]);
      }
   };

   const handleBack = () => {
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex > 0) {
         setCurrentStep(steps[currentIndex - 1]);
      }
   };

   const handleTypeSelect = (type: 'consultation' | 'hemodialysis' | 'follow-up') => {
      setAppointmentData(prev => ({
         ...prev,
         type
      }));
      handleNext();
   };

   const handleDoctorSelect = (doctorId: string) => {
      setAppointmentData(prev => ({
         ...prev,
         doctorId
      }));
      // Refresh available slots for selected doctor
      loadAvailableSlots({
         doctorId,
         type: appointmentData.type
      });
      handleNext();
   };

   const handleSlotSelect = (slot: AvailableSlot) => {
      setSelectedSlot(slot);
      setAppointmentData(prev => ({
         ...prev,
         date: slot.date,
         time: slot.time
      }));
      handleNext();
   };

   const handleRecurringChange = (isRecurring: boolean, pattern?: {
      frequency: 'weekly' | 'biweekly' | 'monthly';
      duration: number;
      endDate?: string;
   }) => {
      setAppointmentData(prev => ({
         ...prev,
         isRecurring,
         recurringPattern: pattern
      }));
   };

   const handleSearchSlotSelect = (slot: AvailableSlot) => {
      setSelectedSlot(slot);
      setAppointmentData(prev => ({
         ...prev,
         date: slot.date,
         time: slot.time,
         doctorId: slot.doctorId
      }));
      handleNext();
   };

   const handleFormSubmit = (formData: { reason?: string; notes?: string }) => {
      setAppointmentData(prev => ({
         ...prev,
         ...formData
      }));
      handleNext();
   };

   const handleConfirmBooking = async () => {
      if (appointmentData.patientId &&
          appointmentData.patientName &&
          appointmentData.doctorId &&
          appointmentData.date &&
          appointmentData.time &&
          appointmentData.type) {

         const success = await bookAppointment(appointmentData as AppointmentRequest);

         if (success) {
            // Stay on confirmation step to show success message
            console.log('Appointment booked successfully');
         }
      }
   };

   const handleStartOver = () => {
      setCurrentStep('type');
      setAppointmentData({
         patientId: 'patient-001',
         patientName: 'Juan Pérez'
      });
      setSelectedSlot(null);
      resetBookingStatus();
      loadAvailableSlots();
   };

   return (
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-green-50/30 min-h-screen">
         <FloatingGeometry />

         <div className="z-10 relative">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
               <Header />

               <div className="bg-white shadow-lg border border-gray-200 rounded-xl overflow-hidden">
                  <div className="p-8">
                     <ProgressIndicator currentStep={currentStep} steps={steps} />

                     <div className="mx-auto max-w-2xl">
                        {currentStep === 'type' && (
                           <AppointmentTypeSelector
                              appointmentTypes={appointmentTypes}
                              selectedType={appointmentData.type}
                              onSelect={handleTypeSelect}
                           />
                        )}

                        {currentStep === 'doctor' && (
                           <DoctorSelector
                              doctors={doctors}
                              selectedDoctorId={appointmentData.doctorId}
                              appointmentType={appointmentData.type}
                              onSelect={handleDoctorSelect}
                              onBack={handleBack}
                           />
                        )}

                        {currentStep === 'datetime' && (
                           <div className="space-y-6">
                              {/* Option to switch to search */}
                              <div className="text-center">
                                 <button
                                    onClick={() => {
                                       setShowSearch(true);
                                       setCurrentStep('search');
                                       // Ensure slots are loaded for search
                                       if (availableSlots.length === 0) {
                                          loadAvailableSlots({
                                             doctorId: appointmentData.doctorId,
                                             type: appointmentData.type
                                          });
                                       }
                                    }}
                                    className="font-medium text-green-600 hover:text-green-700 text-sm hover:underline"
                                 >
                                    ¿Prefieres buscar por día o horario específico? →
                                 </button>
                              </div>

                              <DateTimeSelector
                                 availableSlots={availableSlots}
                                 selectedSlot={selectedSlot}
                                 isLoading={isLoading}
                                 doctorId={appointmentData.doctorId}
                                 appointmentType={appointmentData.type}
                                 onSlotSelect={handleSlotSelect}
                                 onBack={handleBack}
                              />
                           </div>
                        )}

                        {currentStep === 'search' && (
                           <AvailabilitySearch
                              onSearch={searchAvailableSlots}
                              doctors={doctors}
                              appointmentTypes={appointmentTypes}
                              onSlotSelect={handleSearchSlotSelect}
                              onBack={() => {
                                 setShowSearch(false);
                                 setCurrentStep('datetime');
                              }}
                              isLoading={isLoading}
                           />
                        )}

                        {currentStep === 'details' && (
                           <div className="space-y-6">
                              <RecurringAppointmentOptions
                                 isRecurring={appointmentData.isRecurring || false}
                                 recurringPattern={appointmentData.recurringPattern || {
                                    frequency: 'weekly',
                                    duration: 4
                                 }}
                                 onRecurringChange={handleRecurringChange}
                                 appointmentType={appointmentData.type}
                              />

                              <AppointmentForm
                                 appointmentData={appointmentData}
                                 selectedSlot={selectedSlot}
                                 onSubmit={handleFormSubmit}
                                 onBack={handleBack}
                              />
                           </div>
                        )}

                        {currentStep === 'confirmation' && (
                           <BookingConfirmation
                              appointmentData={appointmentData}
                              selectedSlot={selectedSlot}
                              bookingStatus={bookingStatus}
                              onConfirm={handleConfirmBooking}
                              onStartOver={handleStartOver}
                              onBack={handleBack}
                           />
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
