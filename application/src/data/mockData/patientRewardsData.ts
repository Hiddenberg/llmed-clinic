export interface RewardPoint {
   id: string;
   type: 'attendance' | 'punctuality' | 'treatment_completion' | 'health_milestone' | 'bonus';
   points: number;
   date: string;
   description: string;
   relatedAppointmentId?: string;
}

export interface Achievement {
   id: string;
   name: string;
   description: string;
   icon: string; // lucide-react icon name
   category: 'attendance' | 'punctuality' | 'health' | 'engagement' | 'milestone';
   pointsRequired: number;
   unlocked: boolean;
   unlockedDate?: string;
   progress: number; // 0-100 percentage
   rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Reward {
   id: string;
   name: string;
   description: string;
   pointsCost: number;
   category: 'health' | 'comfort' | 'education' | 'special';
   available: boolean;
   claimed: boolean;
   claimedDate?: string;
   expiresAt?: string;
   image?: string;
}

export interface AttendanceStreak {
   id: string;
   currentStreak: number;
   longestStreak: number;
   lastAttendanceDate: string;
   streakType: 'appointment' | 'punctuality';
}

export interface PatientRewardProfile {
   totalPoints: number;
   availablePoints: number;
   spentPoints: number;
   level: number;
   nextLevelPoints: number;
   attendanceRate: number; // percentage
   punctualityRate: number; // percentage
   streaks: AttendanceStreak[];
   achievements: Achievement[];
   recentPoints: RewardPoint[];
   availableRewards: Reward[];
}

// Mock data for patient rewards
export const mockRewardPoints: RewardPoint[] = [
   {
      id: '1',
      type: 'attendance',
      points: 50,
      date: '2024-01-13',
      description: 'Asistencia a sesión de hemodiálisis',
      relatedAppointmentId: 'apt_001'
   },
   {
      id: '2',
      type: 'punctuality',
      points: 25,
      date: '2024-01-13',
      description: 'Llegada puntual (5 min antes)',
      relatedAppointmentId: 'apt_001'
   },
   {
      id: '3',
      type: 'treatment_completion',
      points: 30,
      date: '2024-01-13',
      description: 'Sesión de tratamiento completada',
      relatedAppointmentId: 'apt_001'
   },
   {
      id: '4',
      type: 'attendance',
      points: 50,
      date: '2024-01-11',
      description: 'Asistencia a sesión de hemodiálisis',
      relatedAppointmentId: 'apt_002'
   },
   {
      id: '5',
      type: 'punctuality',
      points: 25,
      date: '2024-01-11',
      description: 'Llegada puntual (2 min antes)',
      relatedAppointmentId: 'apt_002'
   },
   {
      id: '6',
      type: 'bonus',
      points: 100,
      date: '2024-01-10',
      description: 'Racha de 5 citas consecutivas puntuales'
   }
];

export const mockAchievements: Achievement[] = [
   {
      id: 'perfect_week',
      name: 'Semana Perfecta',
      description: 'Asiste a todas tus citas de la semana puntualmente',
      icon: 'Calendar',
      category: 'punctuality',
      pointsRequired: 0,
      unlocked: true,
      unlockedDate: '2024-01-13',
      progress: 100,
      rarity: 'common'
   },
   {
      id: 'early_bird',
      name: 'Madrugador',
      description: 'Llega 10 minutos antes a 10 citas consecutivas',
      icon: 'Sunrise',
      category: 'punctuality',
      pointsRequired: 0,
      unlocked: true,
      unlockedDate: '2024-01-11',
      progress: 100,
      rarity: 'rare'
   },
   {
      id: 'consistent_care',
      name: 'Cuidado Constante',
      description: 'Asiste a 20 sesiones de hemodiálisis sin faltar',
      icon: 'Heart',
      category: 'attendance',
      pointsRequired: 0,
      unlocked: false,
      progress: 65,
      rarity: 'epic'
   },
   {
      id: 'health_champion',
      name: 'Campeón de Salud',
      description: 'Mantén tus signos vitales en rango óptimo por 30 días',
      icon: 'Trophy',
      category: 'health',
      pointsRequired: 0,
      unlocked: false,
      progress: 80,
      rarity: 'legendary'
   },
   {
      id: 'milestone_month',
      name: 'Mes Ejemplar',
      description: 'Completa un mes completo sin faltar a ninguna cita',
      icon: 'Star',
      category: 'milestone',
      pointsRequired: 0,
      unlocked: false,
      progress: 45,
      rarity: 'epic'
   }
];

export const mockRewards: Reward[] = [
   {
      id: 'comfort_pillow',
      name: 'Almohada de Comodidad',
      description: 'Almohada ergonómica para sesiones de diálisis más cómodas',
      pointsCost: 200,
      category: 'comfort',
      available: true,
      claimed: false
   },
   {
      id: 'nutrition_guide',
      name: 'Guía Nutricional Personalizada',
      description: 'Consulta con nutricionista y plan alimentario personalizado',
      pointsCost: 300,
      category: 'health',
      available: true,
      claimed: false
   },
   {
      id: 'wellness_kit',
      name: 'Kit de Bienestar',
      description: 'Kit con productos para el cuidado de la piel y relajación',
      pointsCost: 150,
      category: 'comfort',
      available: true,
      claimed: true,
      claimedDate: '2024-01-10'
   },
   {
      id: 'priority_scheduling',
      name: 'Programación Prioritaria',
      description: 'Acceso prioritario para programar citas en horarios preferenciales',
      pointsCost: 500,
      category: 'special',
      available: true,
      claimed: false
   },
   {
      id: 'health_monitor',
      name: 'Monitor de Salud Domiciliario',
      description: 'Dispositivo para monitorear presión arterial y peso en casa',
      pointsCost: 800,
      category: 'health',
      available: true,
      claimed: false
   }
];

export const mockAttendanceStreaks: AttendanceStreak[] = [
   {
      id: 'appointment_streak',
      currentStreak: 8,
      longestStreak: 12,
      lastAttendanceDate: '2024-01-13',
      streakType: 'appointment'
   },
   {
      id: 'punctuality_streak',
      currentStreak: 5,
      longestStreak: 9,
      lastAttendanceDate: '2024-01-13',
      streakType: 'punctuality'
   }
];

export const mockPatientRewardProfile: PatientRewardProfile = {
   totalPoints: 1280,
   availablePoints: 930,
   spentPoints: 350,
   level: 4,
   nextLevelPoints: 1500,
   attendanceRate: 92,
   punctualityRate: 87,
   streaks: mockAttendanceStreaks,
   achievements: mockAchievements,
   recentPoints: mockRewardPoints,
   availableRewards: mockRewards
};
