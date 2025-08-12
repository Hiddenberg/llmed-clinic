export interface PatientInfo {
   id: string;
   name: string;
   age: number;
   email: string;
   phone: string;
   bloodType: string;
   emergencyContact: {
      name: string;
      phone: string;
      relation: string;
   };
   assignedDoctor: {
      name: string;
      specialty: string;
      phone: string;
   };
}

export interface PatientAppointment {
   id: string;
   date: string;
   time: string;
   type: 'hemodialysis' | 'consultation' | 'follow-up' | 'lab-work';
   status: 'upcoming' | 'completed' | 'cancelled' | 'rescheduled';
   doctor: string;
   location: string;
   duration: number; // in minutes
   notes?: string;
}

export interface VitalSign {
   id: string;
   date: string;
   bloodPressure: {
      systolic: number;
      diastolic: number;
   };
   heartRate: number;
   weight: number; // in kg
   temperature: number; // in celsius
   oxygenSaturation: number; // percentage
}

export interface TreatmentMetric {
   id: string;
   date: string;
   sessionDuration: number; // in minutes
   fluidRemoval: number; // in liters
   dialysisEfficiency: number; // percentage
   complications?: string;
   patientComfort: 1 | 2 | 3 | 4 | 5; // 1-5 scale
}

export interface DoctorNote {
   id: string;
   date: string;
   doctor: string;
   type: 'general' | 'treatment-update' | 'medication-change' | 'lab-results' | 'recommendation';
   title: string;
   content: string;
   priority: 'low' | 'medium' | 'high';
   read: boolean;
}

export interface PatientNotification {
   id: string;
   type: 'appointment' | 'medication' | 'lab-results' | 'general';
   title: string;
   message: string;
   timestamp: string;
   read: boolean;
   priority: 'low' | 'medium' | 'high';
}

// Mock patient data
export const mockPatient: PatientInfo = {
   id: '1',
   name: 'María González',
   age: 68,
   email: 'maria.gonzalez@email.com',
   phone: '+34 612 345 678',
   bloodType: 'A+',
   emergencyContact: {
      name: 'Carlos González',
      phone: '+34 612 345 679',
      relation: 'Hijo'
   },
   assignedDoctor: {
      name: 'Dr. Carlos Ruiz',
      specialty: 'Nefrología',
      phone: '+34 612 345 680'
   }
};

export const mockUpcomingAppointments: PatientAppointment[] = [
   {
      id: '1',
      date: '2024-01-15',
      time: '08:00',
      type: 'hemodialysis',
      status: 'upcoming',
      doctor: 'Dr. Carlos Ruiz',
      location: 'Sala A-1',
      duration: 240,
      notes: 'Sesión regular de hemodiálisis'
   },
   {
      id: '2',
      date: '2024-01-17',
      time: '08:00',
      type: 'hemodialysis',
      status: 'upcoming',
      doctor: 'Dr. Carlos Ruiz',
      location: 'Sala A-1',
      duration: 240
   },
   {
      id: '3',
      date: '2024-01-19',
      time: '10:30',
      type: 'consultation',
      status: 'upcoming',
      doctor: 'Dr. Carlos Ruiz',
      location: 'Consultorio 1',
      duration: 30,
      notes: 'Revisión mensual y ajuste de medicación'
   }
];

export const mockRecentVitalSigns: VitalSign[] = [
   {
      id: '1',
      date: '2024-01-13',
      bloodPressure: {
         systolic: 140,
         diastolic: 85
      },
      heartRate: 72,
      weight: 68.5,
      temperature: 36.7,
      oxygenSaturation: 98
   },
   {
      id: '2',
      date: '2024-01-11',
      bloodPressure: {
         systolic: 135,
         diastolic: 82
      },
      heartRate: 75,
      weight: 69.2,
      temperature: 36.5,
      oxygenSaturation: 97
   },
   {
      id: '3',
      date: '2024-01-09',
      bloodPressure: {
         systolic: 142,
         diastolic: 88
      },
      heartRate: 78,
      weight: 69.8,
      temperature: 36.8,
      oxygenSaturation: 98
   }
];

export const mockTreatmentMetrics: TreatmentMetric[] = [
   {
      id: '1',
      date: '2024-01-13',
      sessionDuration: 240,
      fluidRemoval: 2.1,
      dialysisEfficiency: 92,
      patientComfort: 4
   },
   {
      id: '2',
      date: '2024-01-11',
      sessionDuration: 240,
      fluidRemoval: 1.8,
      dialysisEfficiency: 89,
      patientComfort: 5
   },
   {
      id: '3',
      date: '2024-01-09',
      sessionDuration: 235,
      fluidRemoval: 2.3,
      dialysisEfficiency: 91,
      complications: 'Leve hipotensión al final de la sesión',
      patientComfort: 3
   }
];

export const mockDoctorNotes: DoctorNote[] = [
   {
      id: '1',
      date: '2024-01-13',
      doctor: 'Dr. Carlos Ruiz',
      type: 'treatment-update',
      title: 'Sesión de Hemodiálisis - Enero 13',
      content: 'Sesión completada exitosamente. Paciente toleró bien el tratamiento. Presión arterial estable durante toda la sesión. Se recomienda continuar con la medicación actual.',
      priority: 'medium',
      read: false
   },
   {
      id: '2',
      date: '2024-01-11',
      doctor: 'Dr. Carlos Ruiz',
      type: 'lab-results',
      title: 'Resultados de Laboratorio',
      content: 'Los resultados de laboratorio muestran una mejora en los niveles de creatinina. El potasio se mantiene en rangos normales. Continuar con la dieta actual.',
      priority: 'low',
      read: true
   },
   {
      id: '3',
      date: '2024-01-10',
      doctor: 'Dr. Carlos Ruiz',
      type: 'medication-change',
      title: 'Ajuste de Medicación',
      content: 'Se ha ajustado la dosis de eritropoyetina para mejorar los niveles de hemoglobina. Tomar 3000 UI tres veces por semana después de la diálisis.',
      priority: 'high',
      read: true
   }
];

export const mockNotifications: PatientNotification[] = [
   {
      id: '1',
      type: 'appointment',
      title: 'Próxima Cita Programada',
      message: 'Su próxima sesión de hemodiálisis está programada para mañana a las 08:00 AM',
      timestamp: '2024-01-14T18:30:00',
      read: false,
      priority: 'medium'
   },
   {
      id: '2',
      type: 'lab-results',
      title: 'Resultados de Laboratorio Disponibles',
      message: 'Sus resultados de laboratorio del 11 de enero ya están disponibles',
      timestamp: '2024-01-12T14:20:00',
      read: true,
      priority: 'low'
   },
   {
      id: '3',
      type: 'medication',
      title: 'Recordatorio de Medicación',
      message: 'No olvide tomar su eritropoyetina después de la sesión de hoy',
      timestamp: '2024-01-13T16:00:00',
      read: true,
      priority: 'high'
   }
];
