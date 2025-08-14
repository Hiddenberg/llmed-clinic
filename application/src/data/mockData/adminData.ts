export interface Patient {
   id: string;
   name: string;
   age: number;
   status: 'active' | 'completed' | 'scheduled' | 'emergency';
   nextSession: string;
   lastSession: string;
   doctor: string;
   progress: number;
}

export interface ActivityItem {
   id: string;
   type: 'patient' | 'doctor' | 'system' | 'appointment';
   title: string;
   description: string;
   timestamp: string;
   priority: 'low' | 'medium' | 'high';
   relatedPerson?: string;
}

export interface AdminNavCard {
   id: string;
   title: string;
   description: string;
   icon: string;
   href: string;
   color: 'brand' | 'success' | 'warning' | 'info';
}

export interface StaffMember {
   id: string;
   name: string;
   role: 'doctor' | 'nurse' | 'technician';
   status: 'on-duty' | 'off-duty' | 'break' | 'emergency';
   shift: 'morning' | 'afternoon' | 'night';
   patients: number;
   nextBreak?: string;
   specialization?: string;
}

export interface PriorityAlert {
   id: string;
   type: 'critical' | 'warning' | 'info';
   category: 'patient' | 'equipment' | 'staff' | 'supply';
   title: string;
   description: string;
   timestamp: string;
   location?: string;
   actionRequired: boolean;
}

export const mockPatients: Patient[] = [
   {
      id: '1',
      name: 'María González',
      age: 68,
      status: 'active',
      nextSession: '2024-01-15T08:00:00',
      lastSession: '2024-01-13T08:00:00',
      doctor: 'Dr. Carlos Ruiz',
      progress: 85
   },
   {
      id: '2',
      name: 'José Martínez',
      age: 72,
      status: 'active',
      nextSession: '2024-01-15T10:00:00',
      lastSession: '2024-01-13T10:00:00',
      doctor: 'Dr. Ana López',
      progress: 92
   },
   {
      id: '3',
      name: 'Carmen Rodríguez',
      age: 65,
      status: 'scheduled',
      nextSession: '2024-01-15T14:00:00',
      lastSession: '2024-01-12T14:00:00',
      doctor: 'Dr. Miguel Fernández',
      progress: 78
   },
   {
      id: '4',
      name: 'Antonio Silva',
      age: 70,
      status: 'emergency',
      nextSession: '2024-01-14T16:00:00',
      lastSession: '2024-01-13T16:00:00',
      doctor: 'Dr. Carlos Ruiz',
      progress: 45
   },
   {
      id: '5',
      name: 'Isabel Moreno',
      age: 63,
      status: 'completed',
      nextSession: '2024-01-16T08:00:00',
      lastSession: '2024-01-14T08:00:00',
      doctor: 'Dr. Ana López',
      progress: 95
   }
];

export const mockStaff: StaffMember[] = [
   {
      id: '1',
      name: 'Dr. Carlos Ruiz',
      role: 'doctor',
      status: 'on-duty',
      shift: 'morning',
      patients: 8,
      nextBreak: '2024-01-15T12:00:00',
      specialization: 'Nefrología'
   },
   {
      id: '2',
      name: 'Dr. Ana López',
      role: 'doctor',
      status: 'on-duty',
      shift: 'morning',
      patients: 6,
      nextBreak: '2024-01-15T11:30:00',
      specialization: 'Medicina Interna'
   },
   {
      id: '3',
      name: 'Enfermera María Torres',
      role: 'nurse',
      status: 'on-duty',
      shift: 'morning',
      patients: 12,
      nextBreak: '2024-01-15T10:30:00'
   },
   {
      id: '4',
      name: 'Enfermero Luis García',
      role: 'nurse',
      status: 'break',
      shift: 'morning',
      patients: 10,
      nextBreak: '2024-01-15T14:00:00'
   },
   {
      id: '5',
      name: 'Téc. Pedro Morales',
      role: 'technician',
      status: 'on-duty',
      shift: 'morning',
      patients: 0
   },
   {
      id: '6',
      name: 'Dr. Miguel Fernández',
      role: 'doctor',
      status: 'off-duty',
      shift: 'afternoon',
      patients: 0,
      specialization: 'Cardiología'
   }
];

export const mockPriorityAlerts: PriorityAlert[] = [
   {
      id: '1',
      type: 'critical',
      category: 'patient',
      title: 'Presión arterial crítica',
      description: 'Antonio Silva presenta presión arterial de 180/110 mmHg',
      timestamp: '2024-01-15T09:45:00',
      location: 'Sala 2 - Silla 8',
      actionRequired: true
   },
   {
      id: '2',
      type: 'warning',
      category: 'equipment',
      title: 'Máquina HD-03 requiere mantenimiento',
      description: 'Alerta de calibración vencida detectada',
      timestamp: '2024-01-15T09:30:00',
      location: 'Sala 1',
      actionRequired: true
   },
   {
      id: '3',
      type: 'critical',
      category: 'staff',
      title: 'Enfermera de turno ausente',
      description: 'Enfermera del turno tarde no se ha presentado',
      timestamp: '2024-01-15T09:15:00',
      actionRequired: true
   },
   {
      id: '4',
      type: 'warning',
      category: 'supply',
      title: 'Stock bajo de dializadores',
      description: 'Quedan solo 15 unidades de dializadores F8',
      timestamp: '2024-01-15T08:30:00',
      location: 'Almacén',
      actionRequired: false
   },
   {
      id: '5',
      type: 'info',
      category: 'patient',
      title: 'Paciente llegó temprano',
      description: 'Carmen Rodríguez llegó 30 minutos antes de su cita',
      timestamp: '2024-01-15T08:00:00',
      location: 'Recepción',
      actionRequired: false
   }
];

export const mockActivities: ActivityItem[] = [
   {
      id: '1',
      type: 'patient',
      title: 'Sesión completada exitosamente',
      description: 'María González completó su sesión de hemodiálisis sin complicaciones',
      timestamp: '2024-01-14T09:30:00',
      priority: 'low',
      relatedPerson: 'María González'
   },
   {
      id: '2',
      type: 'system',
      title: 'Mantenimiento de equipos programado',
      description: 'Mantenimiento preventivo de máquina HD-03 programado para mañana',
      timestamp: '2024-01-14T08:15:00',
      priority: 'medium'
   },
   {
      id: '3',
      type: 'doctor',
      title: 'Nueva evaluación médica',
      description: 'Dr. Carlos Ruiz ha actualizado el plan de tratamiento para Antonio Silva',
      timestamp: '2024-01-14T07:45:00',
      priority: 'high',
      relatedPerson: 'Dr. Carlos Ruiz'
   },
   {
      id: '4',
      type: 'appointment',
      title: 'Cita reagendada',
      description: 'La cita de Carmen Rodríguez ha sido reagendada para el viernes',
      timestamp: '2024-01-14T07:20:00',
      priority: 'medium',
      relatedPerson: 'Carmen Rodríguez'
   },
   {
      id: '5',
      type: 'patient',
      title: 'Alerta de presión arterial',
      description: 'Antonio Silva presentó presión arterial elevada durante la sesión',
      timestamp: '2024-01-13T16:30:00',
      priority: 'high',
      relatedPerson: 'Antonio Silva'
   },
   {
      id: '6',
      type: 'system',
      title: 'Actualización de registros',
      description: 'Se han actualizado los registros médicos de 15 pacientes',
      timestamp: '2024-01-13T15:00:00',
      priority: 'low'
   }
];

export const mockNavCards: AdminNavCard[] = [
   {
      id: '1',
      title: 'Calendario',
      description: 'Gestiona citas y horarios de tratamiento',
      icon: 'Calendar',
      href: '/admin/calendar',
      color: 'brand'
   },
   {
      id: '2',
      title: 'Pacientes',
      description: 'Administra información y historial médico',
      icon: 'Users',
      href: '/admin/patients',
      color: 'info'
   },
   // {
   //    id: '3',
   //    title: 'Doctores',
   //    description: 'Gestiona el personal médico y sus especialidades',
   //    icon: 'UserCheck',
   //    href: '/admin/doctors',
   //    color: 'success'
   // },
   {
      id: '4',
      title: 'Reportes',
      description: 'Analiza estadísticas y genera informes',
      icon: 'BarChart3',
      href: '/admin/reports',
      color: 'warning'
   },
   {
      id: '5',
      title: 'Equipos',
      description: 'Monitorea el estado de los equipos médicos',
      icon: 'Settings',
      href: '/admin/equipments',
      color: 'info'
   }
];

export const getPatientStats = () => {
   const total = mockPatients.length;
   const active = mockPatients.filter(p => p.status === 'active').length;
   const scheduled = mockPatients.filter(p => p.status === 'scheduled').length;
   const emergency = mockPatients.filter(p => p.status === 'emergency').length;
   const completed = mockPatients.filter(p => p.status === 'completed').length;

   return {
      total,
      active,
      scheduled,
      emergency,
      completed
   };
};

export const getStaffStats = () => {
   const total = mockStaff.length;
   const onDuty = mockStaff.filter(s => s.status === 'on-duty').length;
   const onBreak = mockStaff.filter(s => s.status === 'break').length;
   const doctors = mockStaff.filter(s => s.role === 'doctor' && s.status === 'on-duty').length;
   const nurses = mockStaff.filter(s => s.role === 'nurse' && s.status === 'on-duty').length;

   return {
      total,
      onDuty,
      onBreak,
      doctors,
      nurses
   };
};

export const getAlertStats = () => {
   const total = mockPriorityAlerts.length;
   const critical = mockPriorityAlerts.filter(a => a.type === 'critical').length;
   const warnings = mockPriorityAlerts.filter(a => a.type === 'warning').length;
   const actionRequired = mockPriorityAlerts.filter(a => a.actionRequired).length;

   return {
      total,
      critical,
      warnings,
      actionRequired
   };
};
