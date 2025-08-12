'use client';

import { useState, useEffect } from 'react';
import {
   CalendarEvent,
   eventTypeConfig,
   loadEventsFromStorage,
   addEventToStorage
} from '@/data/mockData/calendarData';

export interface AvailableSlot {
   date: string; // YYYY-MM-DD
   time: string; // HH:MM
   doctorId: string;
   doctorName: string;
   type: 'consultation' | 'hemodialysis' | 'follow-up';
   duration: number; // minutes
}

export interface AppointmentRequest {
   patientId: string;
   patientName: string;
   doctorId: string;
   date: string;
   time: string;
   type: 'consultation' | 'hemodialysis' | 'follow-up';
   reason?: string;
   notes?: string;
   isRecurring?: boolean;
   recurringPattern?: {
      frequency: 'weekly' | 'biweekly' | 'monthly';
      duration: number; // number of occurrences
      endDate?: string;
   };
}

const DOCTORS = [
   {
      id: '1',
      name: 'Dr. Carlos Ruiz',
      specialty: 'Nefrología'
   },
   {
      id: '2',
      name: 'Dr. Ana López',
      specialty: 'Medicina Interna'
   },
   {
      id: '3',
      name: 'Dr. Miguel Fernández',
      specialty: 'Cardiología'
   }
];

const APPOINTMENT_TYPES = {
   consultation: {
      label: 'Consulta Médica',
      duration: 30,
      description: 'Consulta general con el médico especialista'
   },
   hemodialysis: {
      label: 'Sesión de Hemodiálisis',
      duration: 240,
      description: 'Sesión de tratamiento de hemodiálisis'
   },
   'follow-up': {
      label: 'Seguimiento',
      duration: 45,
      description: 'Consulta de seguimiento post-tratamiento'
   }
};

const WORKING_HOURS = {
   start: 7, // 7 AM
   end: 18, // 6 PM
   lunchBreak: {
      start: 12,
      end: 13
   } // 12 PM - 1 PM
};

export function useAppointmentScheduling () {
   const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [bookingStatus, setBookingStatus] = useState<'idle' | 'booking' | 'success' | 'error'>('idle');

   // Generate available slots for the next 30 days
   const generateAvailableSlots = (startDate: Date = new Date(), days: number = 30) => {
      const slots: AvailableSlot[] = [];
      const existingEvents = loadEventsFromStorage();
      
      // Add some mock "busy" slots to simulate real-world availability
      const mockBusySlots = [
         { doctorId: '1', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], time: '09:00' },
         { doctorId: '1', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], time: '10:30' },
         { doctorId: '2', date: new Date(Date.now() + 172800000).toISOString().split('T')[0], time: '11:00' },
         { doctorId: '1', date: new Date(Date.now() + 259200000).toISOString().split('T')[0], time: '14:00' },
         { doctorId: '3', date: new Date(Date.now() + 345600000).toISOString().split('T')[0], time: '15:30' },
         { doctorId: '2', date: new Date(Date.now() + 432000000).toISOString().split('T')[0], time: '08:30' },
      ];

      for (let dayOffset = 1; dayOffset <= days; dayOffset++) {
         const date = new Date(startDate);
         date.setDate(startDate.getDate() + dayOffset);

         // Skip weekends for this demo
         if (date.getDay() === 0 || date.getDay() === 6) continue;

         const dateStr = date.toISOString()
            .split('T')[0];

         // Get existing events for this date
         const dayEvents = existingEvents.filter(event => {
            const eventDate = new Date(event.startTime)
               .toISOString()
               .split('T')[0];
            return eventDate === dateStr;
         });

         // Generate slots for each doctor
         DOCTORS.forEach(doctor => {
            for (let hour = WORKING_HOURS.start; hour < WORKING_HOURS.end; hour++) {
               // Skip lunch break
               if (hour >= WORKING_HOURS.lunchBreak.start && hour < WORKING_HOURS.lunchBreak.end) {
                  continue;
               }

               // Generate 30-minute slots
               for (let minute = 0; minute < 60; minute += 30) {
                  const timeStr = `${hour.toString()
                     .padStart(2, '0')}:${minute.toString()
                     .padStart(2, '0')}`;
                  const slotStart = new Date(date);
                  slotStart.setHours(hour, minute, 0, 0);

                  // Check if this slot conflicts with existing appointments
                  const hasConflict = dayEvents.some(event => {
                     if (event.doctorId !== doctor.id && event.doctorId !== 'all') return false;

                     const eventStart = new Date(event.startTime);
                     const eventEnd = new Date(event.endTime);

                     return slotStart >= eventStart && slotStart < eventEnd;
                  });
                  
                  // Check if this slot is in mock busy slots
                  const isBusy = mockBusySlots.some(busySlot => 
                     busySlot.doctorId === doctor.id && 
                     busySlot.date === dateStr && 
                     busySlot.time === timeStr
                  );

                  if (!hasConflict && !isBusy) {
                     // Add consultation slots
                     slots.push({
                        date: dateStr,
                        time: timeStr,
                        doctorId: doctor.id,
                        doctorName: doctor.name,
                        type: 'consultation',
                        duration: APPOINTMENT_TYPES.consultation.duration
                     });

                     // Add follow-up slots (less frequent)
                     if (minute === 0) {
                        slots.push({
                           date: dateStr,
                           time: timeStr,
                           doctorId: doctor.id,
                           doctorName: doctor.name,
                           type: 'follow-up',
                           duration: APPOINTMENT_TYPES['follow-up'].duration
                        });
                     }

                     // Add hemodialysis slots (only for nephrology doctor and specific times)
                     if (doctor.id === '1' && (hour === 8 || hour === 14) && minute === 0) {
                        slots.push({
                           date: dateStr,
                           time: timeStr,
                           doctorId: doctor.id,
                           doctorName: doctor.name,
                           type: 'hemodialysis',
                           duration: APPOINTMENT_TYPES.hemodialysis.duration
                        });
                     }
                  }
               }
            }
         });
      }

      return slots;
   };

   // Load available slots
   const loadAvailableSlots = async (filters?: {
      doctorId?: string;
      type?: string;
      startDate?: Date;
   }) => {
      setIsLoading(true);

      try {
         // Simulate API delay
         await new Promise(resolve => setTimeout(resolve, 500));

         let slots = generateAvailableSlots(filters?.startDate);

         // Apply filters
         if (filters?.doctorId) {
            slots = slots.filter(slot => slot.doctorId === filters.doctorId);
         }

         if (filters?.type) {
            slots = slots.filter(slot => slot.type === filters.type);
         }

         setAvailableSlots(slots);
      } catch (error) {
         console.error('Error loading available slots:', error);
      } finally {
         setIsLoading(false);
      }
   };

   // Book an appointment (single or recurring)
   const bookAppointment = async (request: AppointmentRequest): Promise<boolean> => {
      setBookingStatus('booking');

      try {
         // Simulate API delay
         await new Promise(resolve => setTimeout(resolve, 1000));

         const appointmentsToCreate: CalendarEvent[] = [];
         
         if (request.isRecurring && request.recurringPattern) {
            // Create recurring appointments
            const { frequency, duration } = request.recurringPattern;
            let currentDate = new Date(`${request.date}T${request.time}:00`);
            
            for (let i = 0; i < duration; i++) {
               const appointmentId = `apt-${Date.now()}-${i}-${Math.random()
                  .toString(36)
                  .substr(2, 9)}`;
               const startDateTime = new Date(currentDate);
               const endDateTime = new Date(startDateTime);
               endDateTime.setMinutes(startDateTime.getMinutes() + APPOINTMENT_TYPES[request.type].duration);
               
               const newEvent: CalendarEvent = {
                  id: appointmentId,
                  title: `${APPOINTMENT_TYPES[request.type].label} - ${request.patientName}${i > 0 ? ` (${i + 1}/${duration})` : ''}`,
                  description: `${request.reason || APPOINTMENT_TYPES[request.type].description}${i > 0 ? ` - Sesión ${i + 1} de ${duration}` : ''}`,
                  startTime: startDateTime.toISOString(),
                  endTime: endDateTime.toISOString(),
                  type: request.type,
                  status: 'scheduled',
                  priority: request.type === 'hemodialysis' ? 'high' : 'medium',
                  patientId: request.patientId,
                  patientName: request.patientName,
                  doctorId: request.doctorId,
                  doctorName: DOCTORS.find(d => d.id === request.doctorId)?.name || '',
                  room: request.type === 'hemodialysis' ? 'Sala A-4' : 'Consultorio 4',
                  notes: request.notes,
                  createdBy: 'patient',
                  createdAt: new Date()
                     .toISOString(),
                  updatedAt: new Date()
                     .toISOString(),
                  color: eventTypeConfig[request.type].color,
                  textColor: eventTypeConfig[request.type].textColor
               };
               
               appointmentsToCreate.push(newEvent);
               
               // Calculate next appointment date
               switch (frequency) {
                  case 'weekly':
                     currentDate.setDate(currentDate.getDate() + 7);
                     break;
                  case 'biweekly':
                     currentDate.setDate(currentDate.getDate() + 14);
                     break;
                  case 'monthly':
                     currentDate.setMonth(currentDate.getMonth() + 1);
                     break;
               }
            }
         } else {
            // Create single appointment
            const appointmentId = `apt-${Date.now()}-${Math.random()
               .toString(36)
               .substr(2, 9)}`;
            const startDateTime = new Date(`${request.date}T${request.time}:00`);
            const endDateTime = new Date(startDateTime);
            endDateTime.setMinutes(startDateTime.getMinutes() + APPOINTMENT_TYPES[request.type].duration);

            const newEvent: CalendarEvent = {
               id: appointmentId,
               title: `${APPOINTMENT_TYPES[request.type].label} - ${request.patientName}`,
               description: request.reason || APPOINTMENT_TYPES[request.type].description,
               startTime: startDateTime.toISOString(),
               endTime: endDateTime.toISOString(),
               type: request.type,
               status: 'scheduled',
               priority: request.type === 'hemodialysis' ? 'high' : 'medium',
               patientId: request.patientId,
               patientName: request.patientName,
               doctorId: request.doctorId,
               doctorName: DOCTORS.find(d => d.id === request.doctorId)?.name || '',
               room: request.type === 'hemodialysis' ? 'Sala A-4' : 'Consultorio 4',
               notes: request.notes,
               createdBy: 'patient',
               createdAt: new Date()
                  .toISOString(),
               updatedAt: new Date()
                  .toISOString(),
               color: eventTypeConfig[request.type].color,
               textColor: eventTypeConfig[request.type].textColor
            };

            appointmentsToCreate.push(newEvent);
         }

         // Add all appointments to storage
         appointmentsToCreate.forEach(event => {
            addEventToStorage(event);
         });

         // Remove the booked slots from available slots
         setAvailableSlots(prev => prev.filter(slot => {
            if (!request.isRecurring) {
               return !(slot.date === request.date &&
                       slot.time === request.time &&
                       slot.doctorId === request.doctorId &&
                       slot.type === request.type);
            }
            
            // For recurring appointments, remove all matching slots
            return !appointmentsToCreate.some(apt => {
               const aptDate = new Date(apt.startTime)
                  .toISOString()
                  .split('T')[0];
               const aptTime = new Date(apt.startTime)
                  .toLocaleTimeString('es-ES', { 
                     hour: '2-digit', 
                     minute: '2-digit' 
                  });
               return slot.date === aptDate &&
                      slot.time === aptTime &&
                      slot.doctorId === request.doctorId &&
                      slot.type === request.type;
            });
         }));

         setBookingStatus('success');
         return true;

      } catch (error) {
         console.error('Error booking appointment:', error);
         setBookingStatus('error');
         return false;
      }
   };

   // Get available slots for a specific date and doctor
   const getSlotsByDateAndDoctor = (date: string, doctorId?: string, type?: string) => {
      return availableSlots.filter(slot => {
         if (slot.date !== date) return false;
         if (doctorId && slot.doctorId !== doctorId) return false;
         if (type && slot.type !== type) return false;
         return true;
      });
   };

   // Get next available slot
   const getNextAvailableSlot = (doctorId?: string, type?: string) => {
      const filtered = availableSlots.filter(slot => {
         if (doctorId && slot.doctorId !== doctorId) return false;
         if (type && slot.type !== type) return false;
         return true;
      });

      return filtered.sort((a, b) => {
         const dateA = new Date(`${a.date}T${a.time}`);
         const dateB = new Date(`${b.date}T${b.time}`);
         return dateA.getTime() - dateB.getTime();
      })[0];
   };

   // Search available slots by criteria
   const searchAvailableSlots = (criteria: {
      searchType: 'day' | 'time';
      value: string; // day of week (0-6) or time (HH:MM)
      doctorId?: string;
      appointmentType?: string;
      dateRange?: { start: Date; end: Date };
   }) => {
      const { searchType, value, doctorId, appointmentType, dateRange } = criteria;
      
      let filteredSlots = availableSlots.filter(slot => {
         // Filter by doctor if specified
         if (doctorId && slot.doctorId !== doctorId) return false;
         
         // Filter by appointment type if specified
         if (appointmentType && slot.type !== appointmentType) return false;
         
         // Filter by date range if specified
         if (dateRange) {
            const slotDate = new Date(slot.date);
            if (slotDate < dateRange.start || slotDate > dateRange.end) return false;
         }
         
         return true;
      });
      
      if (searchType === 'day') {
         // Filter by day of week (0 = Sunday, 1 = Monday, etc.)
         const targetDay = parseInt(value);
         filteredSlots = filteredSlots.filter(slot => {
            const slotDay = new Date(slot.date).getDay();
            return slotDay === targetDay;
         });
      } else if (searchType === 'time') {
         // Filter by specific time
         filteredSlots = filteredSlots.filter(slot => slot.time === value);
      }
      
      // Sort by date and time
      return filteredSlots.sort((a, b) => {
         const dateA = new Date(`${a.date}T${a.time}`);
         const dateB = new Date(`${b.date}T${b.time}`);
         return dateA.getTime() - dateB.getTime();
      });
   };

   // Reset booking status
   const resetBookingStatus = () => {
      setBookingStatus('idle');
   };

   // Initialize slots on mount
   useEffect(() => {
      loadAvailableSlots();
   }, []);

      return {
      // State
      availableSlots,
      isLoading,
      bookingStatus,
      
      // Actions
      loadAvailableSlots,
      bookAppointment,
      resetBookingStatus,
      
      // Helpers
      getSlotsByDateAndDoctor,
      getNextAvailableSlot,
      searchAvailableSlots,
      
      // Constants
      doctors: DOCTORS,
      appointmentTypes: APPOINTMENT_TYPES
   };
}
