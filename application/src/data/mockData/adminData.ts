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
   },
   {
      id: '6',
      title: 'Investigación',
      description: 'Análisis avanzado y correlaciones para investigación médica',
      icon: 'Brain',
      href: '/admin/research-analytics',
      color: 'success'
   }
];

// Utilidades para generar valores realistas y deterministas (sin fluctuación en cada render)
function createSeededRandom (seed: number) {
   let state = seed >>> 0;
   return () => {
      // LCG simple (Numerical Recipes)
      state = (1664525 * state + 1013904223) >>> 0;
      return state / 4294967296;
   };
}

function withJitter (value: number, percent: number, rand: () => number) {
   const amplitude = value * percent;
   const delta = (rand() * 2 - 1) * amplitude; // [-amp, +amp]
   return Math.max(0, Math.round(value + delta));
}

export const getPatientStats = () => {
   // Generar totales realistas para una clínica grande
   const rand = createSeededRandom(20250115);
   const totalBase = 78; // base aproximada de pacientes registrados en una sola clínica
   const total = totalBase + Math.floor(rand() * 25 - 12); // 78 ±12 → [66, 90]

   // Distribuciones realistas (con ligeras variaciones)
   const activeRatio = Math.min(0.74, Math.max(0.64, 0.68 + (rand() * 0.06 - 0.03)));
   const scheduledRatio = Math.min(0.26, Math.max(0.18, 0.22 + (rand() * 0.04 - 0.02)));
   const emergencyRatio = Math.min(0.05, Math.max(0.02, 0.03 + (rand() * 0.02 - 0.01)));

   let active = Math.round(total * activeRatio);
   let scheduled = Math.round(total * scheduledRatio);
   let emergency = Math.round(total * emergencyRatio);
   let completed = total - (active + scheduled + emergency);

   // Ajustes finos para evitar números demasiado redondos
   active = withJitter(active, 0.02, rand);
   scheduled = withJitter(scheduled, 0.03, rand);
   emergency = Math.max(1, withJitter(emergency, 0.15, rand));
   completed = Math.max(0, total - (active + scheduled + emergency));

   return {
      total,
      active,
      scheduled,
      emergency,
      completed
   };
};

export const getStaffStats = () => {
   // Cálculo realista por turno (total = activos + en descanso)
   const rand = createSeededRandom(20250116);
   const onShiftBase = 24; // personal total en turno (clínica única)
   const total = onShiftBase + Math.floor(rand() * 13 - 6); // 24 ±6 → [18, 30]

   const onDutyRatio = Math.min(0.9, Math.max(0.82, 0.86 + (rand() * 0.06 - 0.03)));
   let onDuty = Math.round(total * onDutyRatio);
   let onBreak = total - onDuty;

   // Distribución de roles en el turno (no mostramos técnicos explícitamente)
   let doctors = Math.round(total * Math.min(0.39, Math.max(0.31, 0.35 + (rand() * 0.06 - 0.03))))
      ;
   let nurses = Math.round(total * Math.min(0.6, Math.max(0.48, 0.55 + (rand() * 0.06 - 0.03))))
      ;

   // Asegurar consistencia: doctores + enfermeras ≤ total
   if (doctors + nurses > total) {
      nurses = Math.max(0, total - doctors - 1);
   }

   // Toques de realismo (evitar múltiplos exactos)
   onDuty = withJitter(onDuty, 0.01, rand);
   onBreak = Math.max(0, total - onDuty);
   doctors = withJitter(doctors, 0.02, rand);
   nurses = withJitter(nurses, 0.02, rand);

   return {
      total,
      onDuty,
      onBreak,
      doctors,
      nurses
   };
};

export const getAlertStats = () => {
   // Totales realistas de alertas del día
   const rand = createSeededRandom(20250117);
   const totalBase = 16; // alertas en el día para una sola clínica
   const total = totalBase + Math.floor(rand() * 13 - 6); // 16 ±6 → [10, 22]

   const criticalRatio = Math.min(0.25, Math.max(0.1, 0.16 + (rand() * 0.1 - 0.05)));
   const warningsRatio = Math.min(0.65, Math.max(0.45, 0.55 + (rand() * 0.16 - 0.08)));

   let critical = Math.round(total * criticalRatio);
   let warnings = Math.round(total * warningsRatio);
   let info = Math.max(0, total - (critical + warnings));

   let actionRequired = Math.round(total * Math.min(0.6, Math.max(0.3, 0.45 + (rand() * 0.16 - 0.08))));
   actionRequired = Math.max(critical, Math.min(total, actionRequired));

   // Ligeros ajustes anti-redondeo
   critical = withJitter(critical, 0.05, rand);
   warnings = withJitter(warnings, 0.03, rand);
   info = Math.max(0, total - (critical + warnings));
   actionRequired = Math.max(critical, Math.min(total, withJitter(actionRequired, 0.04, rand)));

   return {
      total,
      critical,
      warnings,
      actionRequired
   };
};

// Conteo de actividades del día (escala para demo)
export const getActivityTodayCount = () => {
   const rand = createSeededRandom(20250118);
   const patients = getPatientStats().total;
   const base = Math.round(patients * 0.085); // ~8.5% de pacientes generan actividad hoy
   return withJitter(base, 0.08, rand);
};
