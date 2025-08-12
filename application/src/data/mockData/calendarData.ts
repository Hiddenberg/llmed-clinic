export interface CalendarEvent {
   id: string;
   title: string;
   description?: string;
   startTime: string; // ISO string
   endTime: string; // ISO string
   type: 'hemodialysis' | 'consultation' | 'follow-up' | 'emergency' | 'maintenance' | 'meeting' | 'performance-review' | 'training';
   status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled';
   priority: 'low' | 'medium' | 'high' | 'critical';

   // Participants
   patientId?: string;
   patientName?: string;
   doctorId?: string;
   doctorName?: string;

   // Location and resources
   room?: string;
   equipment?: string[];

   // Additional metadata
   notes?: string;
   createdBy: string;
   createdAt: string;
   updatedAt: string;

   // Visual styling
   color: string;
   textColor?: string;
}

export interface CalendarFilter {
   types: string[];
   statuses: string[];
   priorities: string[];
   doctors: string[];
   rooms: string[];
}

export const eventTypeConfig = {
   hemodialysis: {
      label: 'Hemodiálisis',
      color: '#3a86ff',
      textColor: '#ffffff',
      icon: 'Droplets'
   },
   consultation: {
      label: 'Consulta',
      color: '#22c55e',
      textColor: '#ffffff',
      icon: 'Stethoscope'
   },
   'follow-up': {
      label: 'Seguimiento',
      color: '#f59e0b',
      textColor: '#ffffff',
      icon: 'FileText'
   },
   emergency: {
      label: 'Emergencia',
      color: '#ef4444',
      textColor: '#ffffff',
      icon: 'AlertTriangle'
   },
   maintenance: {
      label: 'Mantenimiento',
      color: '#8b5cf6',
      textColor: '#ffffff',
      icon: 'Wrench'
   },
   meeting: {
      label: 'Reunión',
      color: '#06b6d4',
      textColor: '#ffffff',
      icon: 'Users'
   },
   'performance-review': {
      label: 'Evaluación',
      color: '#f97316',
      textColor: '#ffffff',
      icon: 'ClipboardCheck'
   },
   training: {
      label: 'Capacitación',
      color: '#84cc16',
      textColor: '#ffffff',
      icon: 'GraduationCap'
   }
};

export const statusConfig = {
   scheduled: {
      label: 'Programado',
      color: '#64748b',
      badgeColor: 'bg-gray-100 text-gray-800'
   },
   'in-progress': {
      label: 'En curso',
      color: '#3b82f6',
      badgeColor: 'bg-blue-100 text-blue-800'
   },
   completed: {
      label: 'Completado',
      color: '#22c55e',
      badgeColor: 'bg-green-100 text-green-800'
   },
   cancelled: {
      label: 'Cancelado',
      color: '#ef4444',
      badgeColor: 'bg-red-100 text-red-800'
   },
   rescheduled: {
      label: 'Reagendado',
      color: '#f59e0b',
      badgeColor: 'bg-amber-100 text-amber-800'
   }
};

export const priorityConfig = {
   low: {
      label: 'Baja',
      color: '#64748b',
      badgeColor: 'bg-gray-100 text-gray-800'
   },
   medium: {
      label: 'Media',
      color: '#f59e0b',
      badgeColor: 'bg-amber-100 text-amber-800'
   },
   high: {
      label: 'Alta',
      color: '#f97316',
      badgeColor: 'bg-orange-100 text-orange-800'
   },
   critical: {
      label: 'Crítica',
      color: '#ef4444',
      badgeColor: 'bg-red-100 text-red-800'
   }
};

// Generate dates for the next 30 days
// const getDateRange = (days: number = 30): Date[] => {
//    const dates: Date[] = [];
//    const today = new Date();

//    for (let i = 0; i < days; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);
//       dates.push(date);
//    }

//    return dates;
// };

// Mock calendar events
export const mockCalendarEvents: CalendarEvent[] = [
   // Today's events
   {
      id: '1',
      title: 'Hemodiálisis - María González',
      description: 'Sesión regular de hemodiálisis',
      startTime: new Date(new Date()
         .setHours(8, 0, 0, 0))
         .toISOString(),
      endTime: new Date(new Date()
         .setHours(12, 0, 0, 0))
         .toISOString(),
      type: 'hemodialysis',
      status: 'completed',
      priority: 'medium',
      patientId: '1',
      patientName: 'María González',
      doctorId: '1',
      doctorName: 'Dr. Carlos Ruiz',
      room: 'Sala A-1',
      equipment: ['HD-01', 'Monitor-01'],
      createdBy: 'admin',
      createdAt: new Date(Date.now() - 86400000)
         .toISOString(),
      updatedAt: new Date()
         .toISOString(),
      color: eventTypeConfig.hemodialysis.color,
      textColor: eventTypeConfig.hemodialysis.textColor
   },
   {
      id: '2',
      title: 'Consulta - José Martínez',
      description: 'Revisión mensual y ajuste de medicación',
      startTime: new Date(new Date()
         .setHours(10, 30, 0, 0))
         .toISOString(),
      endTime: new Date(new Date()
         .setHours(11, 0, 0, 0))
         .toISOString(),
      type: 'consultation',
      status: 'in-progress',
      priority: 'medium',
      patientId: '2',
      patientName: 'José Martínez',
      doctorId: '2',
      doctorName: 'Dr. Ana López',
      room: 'Consultorio 1',
      createdBy: 'doctor',
      createdAt: new Date(Date.now() - 172800000)
         .toISOString(),
      updatedAt: new Date()
         .toISOString(),
      color: eventTypeConfig.consultation.color,
      textColor: eventTypeConfig.consultation.textColor
   },
   {
      id: '3',
      title: 'Emergencia - Antonio Silva',
      description: 'Presión arterial crítica durante sesión',
      startTime: new Date(new Date()
         .setHours(14, 15, 0, 0))
         .toISOString(),
      endTime: new Date(new Date()
         .setHours(15, 0, 0, 0))
         .toISOString(),
      type: 'emergency',
      status: 'scheduled',
      priority: 'critical',
      patientId: '4',
      patientName: 'Antonio Silva',
      doctorId: '1',
      doctorName: 'Dr. Carlos Ruiz',
      room: 'Sala Emergencia',
      notes: 'Revisar medicación antihipertensiva urgente',
      createdBy: 'system',
      createdAt: new Date(Date.now() - 3600000)
         .toISOString(),
      updatedAt: new Date()
         .toISOString(),
      color: eventTypeConfig.emergency.color,
      textColor: eventTypeConfig.emergency.textColor
   },
   {
      id: '4',
      title: 'Mantenimiento HD-03',
      description: 'Mantenimiento preventivo programado',
      startTime: new Date(new Date()
         .setHours(16, 0, 0, 0))
         .toISOString(),
      endTime: new Date(new Date()
         .setHours(17, 30, 0, 0))
         .toISOString(),
      type: 'maintenance',
      status: 'scheduled',
      priority: 'medium',
      room: 'Sala A',
      equipment: ['HD-03'],
      createdBy: 'admin',
      createdAt: new Date(Date.now() - 259200000)
         .toISOString(),
      updatedAt: new Date()
         .toISOString(),
      color: eventTypeConfig.maintenance.color,
      textColor: eventTypeConfig.maintenance.textColor
   },

   // Tomorrow's events
   {
      id: '5',
      title: 'Hemodiálisis - Carmen Rodríguez',
      description: 'Sesión de hemodiálisis (reagendada)',
      startTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 1))
         .toISOString()
         .replace(/T.*/, 'T08:00:00.000Z'),
      endTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 1))
         .toISOString()
         .replace(/T.*/, 'T12:00:00.000Z'),
      type: 'hemodialysis',
      status: 'rescheduled',
      priority: 'medium',
      patientId: '3',
      patientName: 'Carmen Rodríguez',
      doctorId: '3',
      doctorName: 'Dr. Miguel Fernández',
      room: 'Sala B-1',
      equipment: ['HD-02'],
      notes: 'Reagendada desde ayer por solicitud del paciente',
      createdBy: 'admin',
      createdAt: new Date(Date.now() - 86400000)
         .toISOString(),
      updatedAt: new Date(Date.now() - 3600000)
         .toISOString(),
      color: eventTypeConfig.hemodialysis.color,
      textColor: eventTypeConfig.hemodialysis.textColor
   },
   {
      id: '6',
      title: 'Seguimiento - Isabel Moreno',
      description: 'Evaluación post-tratamiento',
      startTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 1))
         .toISOString()
         .replace(/T.*/, 'T14:30:00.000Z'),
      endTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 1))
         .toISOString()
         .replace(/T.*/, 'T15:15:00.000Z'),
      type: 'follow-up',
      status: 'scheduled',
      priority: 'medium',
      patientId: '5',
      patientName: 'Isabel Moreno',
      doctorId: '2',
      doctorName: 'Dr. Ana López',
      room: 'Consultorio 2',
      createdBy: 'doctor',
      createdAt: new Date(Date.now() - 172800000)
         .toISOString(),
      updatedAt: new Date()
         .toISOString(),
      color: eventTypeConfig['follow-up'].color,
      textColor: eventTypeConfig['follow-up'].textColor
   },
   {
      id: '7',
      title: 'Reunión de Personal Médico',
      description: 'Revisión semanal de casos y protocolos',
      startTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 1))
         .toISOString()
         .replace(/T.*/, 'T17:00:00.000Z'),
      endTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 1))
         .toISOString()
         .replace(/T.*/, 'T18:00:00.000Z'),
      type: 'meeting',
      status: 'scheduled',
      priority: 'medium',
      doctorId: 'all',
      doctorName: 'Todo el personal médico',
      room: 'Sala de Conferencias',
      createdBy: 'admin',
      createdAt: new Date(Date.now() - 604800000)
         .toISOString(),
      updatedAt: new Date()
         .toISOString(),
      color: eventTypeConfig.meeting.color,
      textColor: eventTypeConfig.meeting.textColor
   },

   // Next week events
   {
      id: '8',
      title: 'Evaluación de Desempeño - Dr. Carlos Ruiz',
      description: 'Revisión trimestral de desempeño',
      startTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 7))
         .toISOString()
         .replace(/T.*/, 'T10:00:00.000Z'),
      endTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 7))
         .toISOString()
         .replace(/T.*/, 'T11:30:00.000Z'),
      type: 'performance-review',
      status: 'scheduled',
      priority: 'high',
      doctorId: '1',
      doctorName: 'Dr. Carlos Ruiz',
      room: 'Oficina Administrativa',
      createdBy: 'admin',
      createdAt: new Date(Date.now() - 1209600000)
         .toISOString(),
      updatedAt: new Date()
         .toISOString(),
      color: eventTypeConfig['performance-review'].color,
      textColor: eventTypeConfig['performance-review'].textColor
   },
   {
      id: '9',
      title: 'Capacitación en Nuevos Protocolos',
      description: 'Entrenamiento sobre nuevos procedimientos de seguridad',
      startTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 10))
         .toISOString()
         .replace(/T.*/, 'T09:00:00.000Z'),
      endTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 10))
         .toISOString()
         .replace(/T.*/, 'T12:00:00.000Z'),
      type: 'training',
      status: 'scheduled',
      priority: 'high',
      doctorId: 'all',
      doctorName: 'Todo el personal',
      room: 'Auditorio',
      createdBy: 'admin',
      createdAt: new Date(Date.now() - 1814400000)
         .toISOString(),
      updatedAt: new Date()
         .toISOString(),
      color: eventTypeConfig.training.color,
      textColor: eventTypeConfig.training.textColor
   },

   // Additional events for better filtering demonstration
   {
      id: '10',
      title: 'Hemodiálisis - Roberto Jiménez',
      description: 'Sesión de hemodiálisis programada',
      startTime: new Date(new Date()
         .setHours(6, 0, 0, 0))
         .toISOString(),
      endTime: new Date(new Date()
         .setHours(10, 0, 0, 0))
         .toISOString(),
      type: 'hemodialysis',
      status: 'in-progress',
      priority: 'medium',
      patientId: '6',
      patientName: 'Roberto Jiménez',
      doctorId: '2',
      doctorName: 'Dr. Ana López',
      room: 'Sala A-3',
      equipment: ['HD-04', 'Monitor-04'],
      createdBy: 'admin',
      createdAt: new Date(Date.now() - 86400000)
         .toISOString(),
      updatedAt: new Date()
         .toISOString(),
      color: eventTypeConfig.hemodialysis.color,
      textColor: eventTypeConfig.hemodialysis.textColor
   },
   {
      id: '11',
      title: 'Consulta - Ana Morales',
      description: 'Primera consulta - evaluación inicial',
      startTime: new Date(new Date()
         .setHours(13, 0, 0, 0))
         .toISOString(),
      endTime: new Date(new Date()
         .setHours(13, 45, 0, 0))
         .toISOString(),
      type: 'consultation',
      status: 'scheduled',
      priority: 'low',
      patientId: '7',
      patientName: 'Ana Morales',
      doctorId: '3',
      doctorName: 'Dr. Miguel Fernández',
      room: 'Consultorio 3',
      createdBy: 'admin',
      createdAt: new Date(Date.now() - 172800000)
         .toISOString(),
      updatedAt: new Date()
         .toISOString(),
      color: eventTypeConfig.consultation.color,
      textColor: eventTypeConfig.consultation.textColor
   },
   {
      id: '12',
      title: 'Mantenimiento HD-01',
      description: 'Mantenimiento correctivo - bomba de infusión',
      startTime: new Date(new Date()
         .setHours(18, 0, 0, 0))
         .toISOString(),
      endTime: new Date(new Date()
         .setHours(19, 30, 0, 0))
         .toISOString(),
      type: 'maintenance',
      status: 'cancelled',
      priority: 'high',
      room: 'Sala A-1',
      equipment: ['HD-01'],
      notes: 'Cancelado - técnico no disponible, reagendar para mañana',
      createdBy: 'admin',
      createdAt: new Date(Date.now() - 259200000)
         .toISOString(),
      updatedAt: new Date(Date.now() - 7200000)
         .toISOString(),
      color: eventTypeConfig.maintenance.color,
      textColor: eventTypeConfig.maintenance.textColor
   },
   {
      id: '13',
      title: 'Seguimiento - Pedro Vásquez',
      description: 'Control post-operatorio',
      startTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 1))
         .toISOString()
         .replace(/T.*/, 'T09:30:00.000Z'),
      endTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 1))
         .toISOString()
         .replace(/T.*/, 'T10:15:00.000Z'),
      type: 'follow-up',
      status: 'rescheduled',
      priority: 'medium',
      patientId: '8',
      patientName: 'Pedro Vásquez',
      doctorId: '1',
      doctorName: 'Dr. Carlos Ruiz',
      room: 'Consultorio 1',
      notes: 'Reagendado desde la semana pasada por solicitud del paciente',
      createdBy: 'doctor',
      createdAt: new Date(Date.now() - 604800000)
         .toISOString(),
      updatedAt: new Date(Date.now() - 86400000)
         .toISOString(),
      color: eventTypeConfig['follow-up'].color,
      textColor: eventTypeConfig['follow-up'].textColor
   },
   {
      id: '14',
      title: 'Reunión Comité de Calidad',
      description: 'Revisión mensual de indicadores de calidad',
      startTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 2))
         .toISOString()
         .replace(/T.*/, 'T15:00:00.000Z'),
      endTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 2))
         .toISOString()
         .replace(/T.*/, 'T16:30:00.000Z'),
      type: 'meeting',
      status: 'scheduled',
      priority: 'medium',
      doctorId: 'all',
      doctorName: 'Personal directivo y médico',
      room: 'Sala de Juntas',
      createdBy: 'admin',
      createdAt: new Date(Date.now() - 1209600000)
         .toISOString(),
      updatedAt: new Date()
         .toISOString(),
      color: eventTypeConfig.meeting.color,
      textColor: eventTypeConfig.meeting.textColor
   },
   {
      id: '15',
      title: 'Emergencia - Lucía Herrera',
      description: 'Hipotensión severa durante sesión',
      startTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 2))
         .toISOString()
         .replace(/T.*/, 'T11:15:00.000Z'),
      endTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 2))
         .toISOString()
         .replace(/T.*/, 'T12:00:00.000Z'),
      type: 'emergency',
      status: 'completed',
      priority: 'critical',
      patientId: '9',
      patientName: 'Lucía Herrera',
      doctorId: '2',
      doctorName: 'Dr. Ana López',
      room: 'Sala Emergencia',
      notes: 'Paciente estabilizada, ajustar protocolo de ultrafiltración',
      createdBy: 'system',
      createdAt: new Date(Date.now() - 172800000)
         .toISOString(),
      updatedAt: new Date(Date.now() - 86400000)
         .toISOString(),
      color: eventTypeConfig.emergency.color,
      textColor: eventTypeConfig.emergency.textColor
   },
   {
      id: '16',
      title: 'Hemodiálisis - Miguel Torres',
      description: 'Sesión nocturna de hemodiálisis',
      startTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 3))
         .toISOString()
         .replace(/T.*/, 'T20:00:00.000Z'),
      endTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 4))
         .toISOString()
         .replace(/T.*/, 'T00:00:00.000Z'),
      type: 'hemodialysis',
      status: 'scheduled',
      priority: 'medium',
      patientId: '10',
      patientName: 'Miguel Torres',
      doctorId: '3',
      doctorName: 'Dr. Miguel Fernández',
      room: 'Sala B-2',
      equipment: ['HD-05', 'Monitor-05'],
      createdBy: 'admin',
      createdAt: new Date(Date.now() - 432000000)
         .toISOString(),
      updatedAt: new Date()
         .toISOString(),
      color: eventTypeConfig.hemodialysis.color,
      textColor: eventTypeConfig.hemodialysis.textColor
   },
   {
      id: '17',
      title: 'Capacitación Nuevos Enfermeros',
      description: 'Entrenamiento en manejo de equipos de diálisis',
      startTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 4))
         .toISOString()
         .replace(/T.*/, 'T08:00:00.000Z'),
      endTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 4))
         .toISOString()
         .replace(/T.*/, 'T17:00:00.000Z'),
      type: 'training',
      status: 'scheduled',
      priority: 'high',
      doctorId: 'all',
      doctorName: 'Personal de enfermería',
      room: 'Sala de Capacitación',
      equipment: ['HD-Demo', 'Simulador'],
      createdBy: 'admin',
      createdAt: new Date(Date.now() - 1814400000)
         .toISOString(),
      updatedAt: new Date()
         .toISOString(),
      color: eventTypeConfig.training.color,
      textColor: eventTypeConfig.training.textColor
   },
   {
      id: '18',
      title: 'Evaluación - Enfermera María Torres',
      description: 'Evaluación semestral de desempeño',
      startTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 5))
         .toISOString()
         .replace(/T.*/, 'T14:00:00.000Z'),
      endTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 5))
         .toISOString()
         .replace(/T.*/, 'T15:00:00.000Z'),
      type: 'performance-review',
      status: 'scheduled',
      priority: 'medium',
      doctorId: '3',
      doctorName: 'Enfermera María Torres',
      room: 'Oficina de RH',
      createdBy: 'admin',
      createdAt: new Date(Date.now() - 1209600000)
         .toISOString(),
      updatedAt: new Date()
         .toISOString(),
      color: eventTypeConfig['performance-review'].color,
      textColor: eventTypeConfig['performance-review'].textColor
   },
   {
      id: '19',
      title: 'Mantenimiento Sistema de Agua',
      description: 'Revisión y limpieza del sistema de tratamiento de agua',
      startTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 6))
         .toISOString()
         .replace(/T.*/, 'T06:00:00.000Z'),
      endTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 6))
         .toISOString()
         .replace(/T.*/, 'T08:00:00.000Z'),
      type: 'maintenance',
      status: 'scheduled',
      priority: 'critical',
      room: 'Cuarto de Máquinas',
      equipment: ['Sistema RO', 'Tanques'],
      notes: 'Mantenimiento crítico - suspender operaciones durante este período',
      createdBy: 'admin',
      createdAt: new Date(Date.now() - 604800000)
         .toISOString(),
      updatedAt: new Date()
         .toISOString(),
      color: eventTypeConfig.maintenance.color,
      textColor: eventTypeConfig.maintenance.textColor
   },
   {
      id: '20',
      title: 'Consulta - Elena Ramírez',
      description: 'Consulta de control - ajuste de medicación',
      startTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 7))
         .toISOString()
         .replace(/T.*/, 'T16:00:00.000Z'),
      endTime: new Date(new Date()
         .setDate(new Date()
            .getDate() + 7))
         .toISOString()
         .replace(/T.*/, 'T16:30:00.000Z'),
      type: 'consultation',
      status: 'cancelled',
      priority: 'low',
      patientId: '11',
      patientName: 'Elena Ramírez',
      doctorId: '2',
      doctorName: 'Dr. Ana López',
      room: 'Consultorio 2',
      notes: 'Cancelada por el paciente - reagendar para la próxima semana',
      createdBy: 'admin',
      createdAt: new Date(Date.now() - 259200000)
         .toISOString(),
      updatedAt: new Date(Date.now() - 3600000)
         .toISOString(),
      color: eventTypeConfig.consultation.color,
      textColor: eventTypeConfig.consultation.textColor
   }
];

// Utility functions
export const getEventsForDate = (date: Date, events: CalendarEvent[] = mockCalendarEvents): CalendarEvent[] => {
   const targetDate = new Date(date);
   targetDate.setHours(0, 0, 0, 0);

   return events.filter(event => {
      const eventDate = new Date(event.startTime);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === targetDate.getTime();
   });
};

export const getEventsForWeek = (startDate: Date, events: CalendarEvent[] = mockCalendarEvents): CalendarEvent[] => {
   const weekStart = new Date(startDate);
   const weekEnd = new Date(startDate);
   weekEnd.setDate(weekStart.getDate() + 6);
   weekEnd.setHours(23, 59, 59, 999);

   return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate >= weekStart && eventDate <= weekEnd;
   });
};

export const getEventsForMonth = (year: number, month: number, events: CalendarEvent[] = mockCalendarEvents): CalendarEvent[] => {
   return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
   });
};

export const filterEvents = (events: CalendarEvent[], filters: Partial<CalendarFilter>): CalendarEvent[] => {
   return events.filter(event => {
      if (filters.types && filters.types.length > 0 && !filters.types.includes(event.type)) {
         return false;
      }
      if (filters.statuses && filters.statuses.length > 0 && !filters.statuses.includes(event.status)) {
         return false;
      }
      if (filters.priorities && filters.priorities.length > 0 && !filters.priorities.includes(event.priority)) {
         return false;
      }
      if (filters.doctors && filters.doctors.length > 0 && event.doctorId && !filters.doctors.includes(event.doctorId)) {
         return false;
      }
      if (filters.rooms && filters.rooms.length > 0 && event.room && !filters.rooms.includes(event.room)) {
         return false;
      }
      return true;
   });
};

export const getDoctorEvents = (doctorId: string, events: CalendarEvent[] = mockCalendarEvents): CalendarEvent[] => {
   return events.filter(event => event.doctorId === doctorId || event.doctorId === 'all');
};

export const getEventById = (id: string, events: CalendarEvent[] = mockCalendarEvents): CalendarEvent | undefined => {
   return events.find(event => event.id === id);
};

// Calendar view helpers
export const formatEventTime = (startTime: string, endTime: string): string => {
   const start = new Date(startTime);
   const end = new Date(endTime);

   const formatTime = (date: Date) => {
      return date.toLocaleTimeString('es-ES', {
         hour: '2-digit',
         minute: '2-digit',
         hour12: false
      });
   };

   return `${formatTime(start)} - ${formatTime(end)}`;
};

export const getEventDuration = (startTime: string, endTime: string): number => {
   const start = new Date(startTime);
   const end = new Date(endTime);
   return Math.round((end.getTime() - start.getTime()) / (1000 * 60)); // minutes
};

export const isEventToday = (eventDate: string): boolean => {
   const today = new Date();
   const event = new Date(eventDate);

   return today.toDateString() === event.toDateString();
};

export const isEventThisWeek = (eventDate: string): boolean => {
   const today = new Date();
   const event = new Date(eventDate);
   const weekStart = new Date(today);
   weekStart.setDate(today.getDate() - today.getDay());
   const weekEnd = new Date(weekStart);
   weekEnd.setDate(weekStart.getDate() + 6);

   return event >= weekStart && event <= weekEnd;
};

// Local storage helpers
export const saveEventsToStorage = (events: CalendarEvent[]): void => {
   if (typeof window !== 'undefined') {
      localStorage.setItem('llmed-calendar-events', JSON.stringify(events));
   }
};

export const loadEventsFromStorage = (): CalendarEvent[] => {
   if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('llmed-calendar-events');
      if (stored) {
         try {
            return JSON.parse(stored);
         } catch (error) {
            console.error('Error parsing stored calendar events:', error);
         }
      }
   }
   return mockCalendarEvents;
};

export const addEventToStorage = (event: CalendarEvent): void => {
   const events = loadEventsFromStorage();
   const updatedEvents = [...events, event];
   saveEventsToStorage(updatedEvents);
};

export const updateEventInStorage = (eventId: string, updatedEvent: Partial<CalendarEvent>): void => {
   const events = loadEventsFromStorage();
   const eventIndex = events.findIndex(e => e.id === eventId);

   if (eventIndex !== -1) {
      events[eventIndex] = {
         ...events[eventIndex],
         ...updatedEvent,
         updatedAt: new Date()
            .toISOString()
      };
      saveEventsToStorage(events);
   }
};

export const deleteEventFromStorage = (eventId: string): void => {
   const events = loadEventsFromStorage();
   const filteredEvents = events.filter(e => e.id !== eventId);
   saveEventsToStorage(filteredEvents);
};

// Initialize storage with mock data if empty
export const initializeCalendarStorage = (): void => {
   if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('llmed-calendar-events');
      if (!stored) {
         saveEventsToStorage(mockCalendarEvents);
      }
   }
};
