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
   {
      id: '3',
      title: 'Doctores',
      description: 'Gestiona el personal médico y sus especialidades',
      icon: 'UserCheck',
      href: '/admin/doctors',
      color: 'success'
   },
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
      icon: 'Activity',
      href: '/admin/equipment',
      color: 'info'
   },
   {
      id: '6',
      title: 'Configuración',
      description: 'Ajusta configuraciones del sistema',
      icon: 'Settings',
      href: '/admin/settings',
      color: 'brand'
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
