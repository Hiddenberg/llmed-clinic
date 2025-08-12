export interface DoctorAppointment {
   id: string;
   patientName: string;
   patientAge: number;
   time: string;
   status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
   type: 'hemodialysis' | 'consultation' | 'follow-up' | 'emergency';
   notes?: string;
   room: string;
   duration: number; // in minutes
}

export interface PatientEvolution {
   id: string;
   patientName: string;
   lastSession: string;
   trend: 'improving' | 'stable' | 'declining';
   keyMetrics: {
      bloodPressure: string;
      fluidRemoval: number; // in liters
      treatmentTime: number; // in minutes
   };
   notes: string;
}

export interface DoctorActivity {
   id: string;
   type: 'appointment' | 'patient-update' | 'medication' | 'alert' | 'note';
   title: string;
   description: string;
   timestamp: string;
   priority: 'low' | 'medium' | 'high';
   patientName?: string;
   actionRequired?: boolean;
}

export interface DoctorStats {
   todayAppointments: number;
   completedToday: number;
   cancelledToday: number;
   patientsImproving: number;
   alertsActive: number;
}

// Mock doctor info
export const mockDoctor = {
   name: 'Dr. Carlos Ruiz',
   specialty: 'Nefrología',
   patientsAssigned: 12,
   yearsExperience: 8
};

export const mockTodayAppointments: DoctorAppointment[] = [
   {
      id: '1',
      patientName: 'María González',
      patientAge: 68,
      time: '08:00',
      status: 'completed',
      type: 'hemodialysis',
      room: 'Sala A-1',
      duration: 240,
      notes: 'Sesión completada sin complicaciones'
   },
   {
      id: '2',
      patientName: 'José Martínez',
      patientAge: 72,
      time: '10:30',
      status: 'in-progress',
      type: 'hemodialysis',
      room: 'Sala A-2',
      duration: 240
   },
   {
      id: '3',
      patientName: 'Carmen Rodríguez',
      patientAge: 65,
      time: '14:00',
      status: 'upcoming',
      type: 'consultation',
      room: 'Consultorio 1',
      duration: 30
   },
   {
      id: '4',
      patientName: 'Antonio Silva',
      patientAge: 70,
      time: '15:30',
      status: 'upcoming',
      type: 'follow-up',
      room: 'Consultorio 1',
      duration: 45
   },
   {
      id: '5',
      patientName: 'Isabel Moreno',
      patientAge: 63,
      time: '16:30',
      status: 'cancelled',
      type: 'hemodialysis',
      room: 'Sala B-1',
      duration: 240,
      notes: 'Cancelada por el paciente - reagendar'
   }
];

export const mockPatientEvolution: PatientEvolution[] = [
   {
      id: '1',
      patientName: 'María González',
      lastSession: '2024-01-14',
      trend: 'improving',
      keyMetrics: {
         bloodPressure: '130/85',
         fluidRemoval: 2.1,
         treatmentTime: 240
      },
      notes: 'Excelente progreso, presión arterial estable'
   },
   {
      id: '2',
      patientName: 'José Martínez',
      lastSession: '2024-01-14',
      trend: 'stable',
      keyMetrics: {
         bloodPressure: '140/90',
         fluidRemoval: 2.5,
         treatmentTime: 240
      },
      notes: 'Mantiene valores estables, continuar tratamiento actual'
   },
   {
      id: '3',
      patientName: 'Antonio Silva',
      lastSession: '2024-01-13',
      trend: 'declining',
      keyMetrics: {
         bloodPressure: '160/95',
         fluidRemoval: 1.8,
         treatmentTime: 210
      },
      notes: 'Presión arterial elevada, revisar medicación'
   },
   {
      id: '4',
      patientName: 'Carmen Rodríguez',
      lastSession: '2024-01-12',
      trend: 'improving',
      keyMetrics: {
         bloodPressure: '125/80',
         fluidRemoval: 2.3,
         treatmentTime: 240
      },
      notes: 'Buena respuesta al nuevo protocolo'
   }
];

export const mockDoctorActivities: DoctorActivity[] = [
   {
      id: '1',
      type: 'alert',
      title: 'Alerta de presión arterial',
      description: 'Antonio Silva presentó presión arterial elevada (160/95) durante la sesión',
      timestamp: '2024-01-14T10:30:00',
      priority: 'high',
      patientName: 'Antonio Silva',
      actionRequired: true
   },
   {
      id: '2',
      type: 'appointment',
      title: 'Cita completada',
      description: 'Sesión de hemodiálisis de María González finalizada exitosamente',
      timestamp: '2024-01-14T12:00:00',
      priority: 'low',
      patientName: 'María González'
   },
   {
      id: '3',
      type: 'medication',
      title: 'Ajuste de medicación',
      description: 'Modificada dosis de antihipertensivos para Carmen Rodríguez',
      timestamp: '2024-01-14T09:15:00',
      priority: 'medium',
      patientName: 'Carmen Rodríguez'
   },
   {
      id: '4',
      type: 'patient-update',
      title: 'Evolución favorable',
      description: 'María González muestra mejora significativa en sus últimas 3 sesiones',
      timestamp: '2024-01-14T08:45:00',
      priority: 'medium',
      patientName: 'María González'
   },
   {
      id: '5',
      type: 'appointment',
      title: 'Cita cancelada',
      description: 'Isabel Moreno canceló su cita de las 16:30, reagendar para mañana',
      timestamp: '2024-01-14T08:00:00',
      priority: 'medium',
      patientName: 'Isabel Moreno',
      actionRequired: true
   },
   {
      id: '6',
      type: 'note',
      title: 'Nota clínica agregada',
      description: 'Actualizado plan de tratamiento para José Martínez',
      timestamp: '2024-01-13T17:30:00',
      priority: 'low',
      patientName: 'José Martínez'
   }
];

export const getDoctorStats = (): DoctorStats => {
   const todayAppointments = mockTodayAppointments.length;
   const completedToday = mockTodayAppointments.filter(apt => apt.status === 'completed').length;
   const cancelledToday = mockTodayAppointments.filter(apt => apt.status === 'cancelled').length;
   const patientsImproving = mockPatientEvolution.filter(patient => patient.trend === 'improving').length;
   const alertsActive = mockDoctorActivities.filter(activity => 
      activity.priority === 'high' && activity.actionRequired
   ).length;

   return {
      todayAppointments,
      completedToday,
      cancelledToday,
      patientsImproving,
      alertsActive
   };
};
