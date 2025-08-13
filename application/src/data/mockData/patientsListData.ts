export interface PatientListItem {
   id: string;
   name: string;
   age: number;
   email: string;
   phone: string;
   bloodType: string;
   status: 'active' | 'completed' | 'scheduled' | 'emergency' | 'inactive';
   nextSession: string | null;
   lastSession: string | null;
   assignedDoctor: {
      id: string;
      name: string;
      specialty: string;
   };
   progress: number; // 0-100 percentage
   riskLevel: 'low' | 'medium' | 'high';
   treatmentPlan: string;
   recentVitals: {
      bloodPressure: string;
      heartRate: number;
      weight: number;
   };
   alerts: number; // Number of active alerts
   sessionsThisMonth: number;
   adherence: number; // 0-100 percentage
}

export interface PatientMetrics {
   totalPatients: number;
   activePatients: number;
   scheduledToday: number;
   emergencyCases: number;
   averageAdherence: number;
   patientsImproving: number;
   patientsAtRisk: number;
   monthlyGrowth: number;
}

export interface TreatmentEffectivenessData {
   month: string;
   effectiveness: number;
   patientCount: number;
}

export interface AdherenceDistribution {
   range: string;
   count: number;
   percentage: number;
}

export interface RiskDistribution {
   level: 'low' | 'medium' | 'high';
   count: number;
   percentage: number;
   color: string;
}

// Mock patients data for the list
export const mockPatientsList: PatientListItem[] = [
   {
      id: '1',
      name: 'María González',
      age: 68,
      email: 'maria.gonzalez@email.com',
      phone: '+34 612 345 678',
      bloodType: 'A+',
      status: 'active',
      nextSession: '2024-01-15T08:00:00',
      lastSession: '2024-01-13T08:00:00',
      assignedDoctor: {
         id: 'dr1',
         name: 'Dr. Carlos Ruiz',
         specialty: 'Nefrología'
      },
      progress: 85,
      riskLevel: 'low',
      treatmentPlan: 'Hemodiálisis 3x/semana',
      recentVitals: {
         bloodPressure: '130/85',
         heartRate: 72,
         weight: 68.5
      },
      alerts: 0,
      sessionsThisMonth: 12,
      adherence: 95
   },
   {
      id: '2',
      name: 'José Martínez',
      age: 72,
      email: 'jose.martinez@email.com',
      phone: '+34 612 345 679',
      bloodType: 'O-',
      status: 'active',
      nextSession: '2024-01-15T10:00:00',
      lastSession: '2024-01-13T10:00:00',
      assignedDoctor: {
         id: 'dr2',
         name: 'Dr. Ana López',
         specialty: 'Medicina Interna'
      },
      progress: 92,
      riskLevel: 'low',
      treatmentPlan: 'Hemodiálisis 3x/semana',
      recentVitals: {
         bloodPressure: '140/90',
         heartRate: 75,
         weight: 71.2
      },
      alerts: 1,
      sessionsThisMonth: 11,
      adherence: 89
   },
   {
      id: '3',
      name: 'Carmen Rodríguez',
      age: 65,
      email: 'carmen.rodriguez@email.com',
      phone: '+34 612 345 680',
      bloodType: 'B+',
      status: 'scheduled',
      nextSession: '2024-01-15T14:00:00',
      lastSession: '2024-01-12T14:00:00',
      assignedDoctor: {
         id: 'dr3',
         name: 'Dr. Miguel Fernández',
         specialty: 'Cardiología'
      },
      progress: 78,
      riskLevel: 'medium',
      treatmentPlan: 'Hemodiálisis 2x/semana',
      recentVitals: {
         bloodPressure: '125/80',
         heartRate: 68,
         weight: 65.8
      },
      alerts: 2,
      sessionsThisMonth: 8,
      adherence: 82
   },
   {
      id: '4',
      name: 'Antonio Silva',
      age: 70,
      email: 'antonio.silva@email.com',
      phone: '+34 612 345 681',
      bloodType: 'AB+',
      status: 'emergency',
      nextSession: '2024-01-14T16:00:00',
      lastSession: '2024-01-13T16:00:00',
      assignedDoctor: {
         id: 'dr1',
         name: 'Dr. Carlos Ruiz',
         specialty: 'Nefrología'
      },
      progress: 45,
      riskLevel: 'high',
      treatmentPlan: 'Hemodiálisis intensiva',
      recentVitals: {
         bloodPressure: '160/95',
         heartRate: 88,
         weight: 74.3
      },
      alerts: 5,
      sessionsThisMonth: 15,
      adherence: 67
   },
   {
      id: '5',
      name: 'Isabel Moreno',
      age: 63,
      email: 'isabel.moreno@email.com',
      phone: '+34 612 345 682',
      bloodType: 'A-',
      status: 'completed',
      nextSession: '2024-01-16T08:00:00',
      lastSession: '2024-01-14T08:00:00',
      assignedDoctor: {
         id: 'dr2',
         name: 'Dr. Ana López',
         specialty: 'Medicina Interna'
      },
      progress: 95,
      riskLevel: 'low',
      treatmentPlan: 'Hemodiálisis 3x/semana',
      recentVitals: {
         bloodPressure: '120/80',
         heartRate: 65,
         weight: 59.2
      },
      alerts: 0,
      sessionsThisMonth: 12,
      adherence: 98
   },
   {
      id: '6',
      name: 'Francisco López',
      age: 69,
      email: 'francisco.lopez@email.com',
      phone: '+34 612 345 683',
      bloodType: 'O+',
      status: 'active',
      nextSession: '2024-01-15T12:00:00',
      lastSession: '2024-01-13T12:00:00',
      assignedDoctor: {
         id: 'dr1',
         name: 'Dr. Carlos Ruiz',
         specialty: 'Nefrología'
      },
      progress: 88,
      riskLevel: 'medium',
      treatmentPlan: 'Hemodiálisis 3x/semana',
      recentVitals: {
         bloodPressure: '135/88',
         heartRate: 78,
         weight: 72.1
      },
      alerts: 1,
      sessionsThisMonth: 11,
      adherence: 91
   },
   {
      id: '7',
      name: 'Dolores Ruiz',
      age: 74,
      email: 'dolores.ruiz@email.com',
      phone: '+34 612 345 684',
      bloodType: 'B-',
      status: 'inactive',
      nextSession: null,
      lastSession: '2024-01-10T10:00:00',
      assignedDoctor: {
         id: 'dr3',
         name: 'Dr. Miguel Fernández',
         specialty: 'Cardiología'
      },
      progress: 60,
      riskLevel: 'high',
      treatmentPlan: 'Tratamiento suspendido',
      recentVitals: {
         bloodPressure: '150/95',
         heartRate: 82,
         weight: 58.7
      },
      alerts: 3,
      sessionsThisMonth: 0,
      adherence: 45
   },
   {
      id: '8',
      name: 'Miguel Sánchez',
      age: 66,
      email: 'miguel.sanchez@email.com',
      phone: '+34 612 345 685',
      bloodType: 'A+',
      status: 'scheduled',
      nextSession: '2024-01-15T16:00:00',
      lastSession: '2024-01-12T16:00:00',
      assignedDoctor: {
         id: 'dr2',
         name: 'Dr. Ana López',
         specialty: 'Medicina Interna'
      },
      progress: 75,
      riskLevel: 'medium',
      treatmentPlan: 'Hemodiálisis 2x/semana',
      recentVitals: {
         bloodPressure: '142/85',
         heartRate: 73,
         weight: 69.8
      },
      alerts: 2,
      sessionsThisMonth: 8,
      adherence: 78
   },
   {
      id: '9',
      name: 'Elena Martín',
      age: 58,
      email: 'elena.martin@email.com',
      phone: '+34 612 345 686',
      bloodType: 'O+',
      status: 'active',
      nextSession: '2024-01-15T06:00:00',
      lastSession: '2024-01-13T06:00:00',
      assignedDoctor: {
         id: 'dr1',
         name: 'Dr. Carlos Ruiz',
         specialty: 'Nefrología'
      },
      progress: 92,
      riskLevel: 'low',
      treatmentPlan: 'Hemodiálisis 3x/semana',
      recentVitals: {
         bloodPressure: '128/82',
         heartRate: 68,
         weight: 62.3
      },
      alerts: 0,
      sessionsThisMonth: 12,
      adherence: 96
   },
   {
      id: '10',
      name: 'Roberto Jiménez',
      age: 71,
      email: 'roberto.jimenez@email.com',
      phone: '+34 612 345 687',
      bloodType: 'B-',
      status: 'emergency',
      nextSession: '2024-01-14T14:00:00',
      lastSession: '2024-01-13T14:00:00',
      assignedDoctor: {
         id: 'dr3',
         name: 'Dr. Miguel Fernández',
         specialty: 'Cardiología'
      },
      progress: 38,
      riskLevel: 'high',
      treatmentPlan: 'Hemodiálisis intensiva + monitoreo cardíaco',
      recentVitals: {
         bloodPressure: '170/105',
         heartRate: 95,
         weight: 78.9
      },
      alerts: 7,
      sessionsThisMonth: 16,
      adherence: 58
   },
   {
      id: '11',
      name: 'Lucía Herrera',
      age: 45,
      email: 'lucia.herrera@email.com',
      phone: '+34 612 345 688',
      bloodType: 'A-',
      status: 'active',
      nextSession: '2024-01-15T09:00:00',
      lastSession: '2024-01-13T09:00:00',
      assignedDoctor: {
         id: 'dr4',
         name: 'Dra. Elena Castillo',
         specialty: 'Nefrología'
      },
      progress: 88,
      riskLevel: 'low',
      treatmentPlan: 'Hemodiálisis 3x/semana',
      recentVitals: {
         bloodPressure: '122/78',
         heartRate: 64,
         weight: 55.7
      },
      alerts: 1,
      sessionsThisMonth: 12,
      adherence: 94
   },
   {
      id: '12',
      name: 'Fernando Castro',
      age: 64,
      email: 'fernando.castro@email.com',
      phone: '+34 612 345 689',
      bloodType: 'AB-',
      status: 'completed',
      nextSession: '2024-01-16T11:00:00',
      lastSession: '2024-01-14T11:00:00',
      assignedDoctor: {
         id: 'dr1',
         name: 'Dr. Carlos Ruiz',
         specialty: 'Nefrología'
      },
      progress: 96,
      riskLevel: 'low',
      treatmentPlan: 'Hemodiálisis 3x/semana',
      recentVitals: {
         bloodPressure: '118/75',
         heartRate: 62,
         weight: 67.2
      },
      alerts: 0,
      sessionsThisMonth: 12,
      adherence: 99
   },
   {
      id: '13',
      name: 'Amparo Vega',
      age: 73,
      email: 'amparo.vega@email.com',
      phone: '+34 612 345 690',
      bloodType: 'O-',
      status: 'scheduled',
      nextSession: '2024-01-15T13:00:00',
      lastSession: '2024-01-12T13:00:00',
      assignedDoctor: {
         id: 'dr3',
         name: 'Dr. Miguel Fernández',
         specialty: 'Cardiología'
      },
      progress: 72,
      riskLevel: 'medium',
      treatmentPlan: 'Hemodiálisis 2x/semana + seguimiento cardíaco',
      recentVitals: {
         bloodPressure: '145/88',
         heartRate: 76,
         weight: 61.5
      },
      alerts: 3,
      sessionsThisMonth: 8,
      adherence: 81
   },
   {
      id: '14',
      name: 'Joaquín Morales',
      age: 69,
      email: 'joaquin.morales@email.com',
      phone: '+34 612 345 691',
      bloodType: 'A+',
      status: 'active',
      nextSession: '2024-01-15T15:00:00',
      lastSession: '2024-01-13T15:00:00',
      assignedDoctor: {
         id: 'dr5',
         name: 'Dr. Roberto Méndez',
         specialty: 'Medicina Interna'
      },
      progress: 84,
      riskLevel: 'low',
      treatmentPlan: 'Hemodiálisis 3x/semana',
      recentVitals: {
         bloodPressure: '132/84',
         heartRate: 70,
         weight: 73.1
      },
      alerts: 0,
      sessionsThisMonth: 11,
      adherence: 92
   },
   {
      id: '15',
      name: 'Rosario Delgado',
      age: 67,
      email: 'rosario.delgado@email.com',
      phone: '+34 612 345 692',
      bloodType: 'B+',
      status: 'inactive',
      nextSession: null,
      lastSession: '2024-01-08T10:00:00',
      assignedDoctor: {
         id: 'dr1',
         name: 'Dr. Carlos Ruiz',
         specialty: 'Nefrología'
      },
      progress: 55,
      riskLevel: 'high',
      treatmentPlan: 'Tratamiento suspendido - evaluación médica',
      recentVitals: {
         bloodPressure: '155/98',
         heartRate: 85,
         weight: 64.8
      },
      alerts: 4,
      sessionsThisMonth: 2,
      adherence: 42
   },
   {
      id: '16',
      name: 'Andrés Peña',
      age: 52,
      email: 'andres.pena@email.com',
      phone: '+34 612 345 693',
      bloodType: 'O+',
      status: 'active',
      nextSession: '2024-01-15T17:00:00',
      lastSession: '2024-01-13T17:00:00',
      assignedDoctor: {
         id: 'dr4',
         name: 'Dra. Elena Castillo',
         specialty: 'Nefrología'
      },
      progress: 90,
      riskLevel: 'low',
      treatmentPlan: 'Hemodiálisis 3x/semana',
      recentVitals: {
         bloodPressure: '125/80',
         heartRate: 66,
         weight: 70.4
      },
      alerts: 0,
      sessionsThisMonth: 12,
      adherence: 97
   },
   {
      id: '17',
      name: 'Pilar Romero',
      age: 61,
      email: 'pilar.romero@email.com',
      phone: '+34 612 345 694',
      bloodType: 'A-',
      status: 'scheduled',
      nextSession: '2024-01-15T18:00:00',
      lastSession: '2024-01-12T18:00:00',
      assignedDoctor: {
         id: 'dr1',
         name: 'Dr. Carlos Ruiz',
         specialty: 'Nefrología'
      },
      progress: 79,
      riskLevel: 'medium',
      treatmentPlan: 'Hemodiálisis 3x/semana',
      recentVitals: {
         bloodPressure: '138/86',
         heartRate: 74,
         weight: 58.9
      },
      alerts: 1,
      sessionsThisMonth: 9,
      adherence: 85
   },
   {
      id: '18',
      name: 'Manuel Ortega',
      age: 75,
      email: 'manuel.ortega@email.com',
      phone: '+34 612 345 695',
      bloodType: 'AB+',
      status: 'emergency',
      nextSession: '2024-01-14T12:00:00',
      lastSession: '2024-01-13T12:00:00',
      assignedDoctor: {
         id: 'dr2',
         name: 'Dr. Ana López',
         specialty: 'Medicina Interna'
      },
      progress: 42,
      riskLevel: 'high',
      treatmentPlan: 'Hemodiálisis intensiva + soporte nutricional',
      recentVitals: {
         bloodPressure: '165/100',
         heartRate: 92,
         weight: 76.3
      },
      alerts: 6,
      sessionsThisMonth: 14,
      adherence: 62
   },
   {
      id: '19',
      name: 'Esperanza Gil',
      age: 59,
      email: 'esperanza.gil@email.com',
      phone: '+34 612 345 696',
      bloodType: 'B-',
      status: 'completed',
      nextSession: '2024-01-16T07:00:00',
      lastSession: '2024-01-14T07:00:00',
      assignedDoctor: {
         id: 'dr3',
         name: 'Dr. Miguel Fernández',
         specialty: 'Cardiología'
      },
      progress: 93,
      riskLevel: 'low',
      treatmentPlan: 'Hemodiálisis 3x/semana',
      recentVitals: {
         bloodPressure: '124/79',
         heartRate: 65,
         weight: 63.7
      },
      alerts: 0,
      sessionsThisMonth: 12,
      adherence: 98
   },
   {
      id: '20',
      name: 'Ramón Silva',
      age: 68,
      email: 'ramon.silva@email.com',
      phone: '+34 612 345 697',
      bloodType: 'O+',
      status: 'active',
      nextSession: '2024-01-15T19:00:00',
      lastSession: '2024-01-13T19:00:00',
      assignedDoctor: {
         id: 'dr1',
         name: 'Dr. Carlos Ruiz',
         specialty: 'Nefrología'
      },
      progress: 86,
      riskLevel: 'medium',
      treatmentPlan: 'Hemodiálisis 3x/semana',
      recentVitals: {
         bloodPressure: '140/87',
         heartRate: 72,
         weight: 71.8
      },
      alerts: 2,
      sessionsThisMonth: 11,
      adherence: 88
   },
   {
      id: '21',
      name: 'Remedios Vargas',
      age: 72,
      email: 'remedios.vargas@email.com',
      phone: '+34 612 345 698',
      bloodType: 'A+',
      status: 'scheduled',
      nextSession: '2024-01-16T08:00:00',
      lastSession: '2024-01-13T08:00:00',
      assignedDoctor: {
         id: 'dr5',
         name: 'Dr. Roberto Méndez',
         specialty: 'Medicina Interna'
      },
      progress: 77,
      riskLevel: 'medium',
      treatmentPlan: 'Hemodiálisis 2x/semana',
      recentVitals: {
         bloodPressure: '143/89',
         heartRate: 78,
         weight: 66.2
      },
      alerts: 2,
      sessionsThisMonth: 8,
      adherence: 83
   },
   {
      id: '22',
      name: 'Esteban Ramos',
      age: 56,
      email: 'esteban.ramos@email.com',
      phone: '+34 612 345 699',
      bloodType: 'B+',
      status: 'active',
      nextSession: '2024-01-15T20:00:00',
      lastSession: '2024-01-13T20:00:00',
      assignedDoctor: {
         id: 'dr6',
         name: 'Dra. Patricia Vidal',
         specialty: 'Nefrología'
      },
      progress: 91,
      riskLevel: 'low',
      treatmentPlan: 'Hemodiálisis 3x/semana',
      recentVitals: {
         bloodPressure: '126/81',
         heartRate: 67,
         weight: 68.5
      },
      alerts: 0,
      sessionsThisMonth: 12,
      adherence: 95
   },
   {
      id: '23',
      name: 'Consuelo Mendoza',
      age: 65,
      email: 'consuelo.mendoza@email.com',
      phone: '+34 612 345 700',
      bloodType: 'O-',
      status: 'completed',
      nextSession: '2024-01-16T09:00:00',
      lastSession: '2024-01-14T09:00:00',
      assignedDoctor: {
         id: 'dr1',
         name: 'Dr. Carlos Ruiz',
         specialty: 'Nefrología'
      },
      progress: 89,
      riskLevel: 'low',
      treatmentPlan: 'Hemodiálisis 3x/semana',
      recentVitals: {
         bloodPressure: '129/83',
         heartRate: 69,
         weight: 59.8
      },
      alerts: 0,
      sessionsThisMonth: 12,
      adherence: 93
   },
   {
      id: '24',
      name: 'Patricio Aguilar',
      age: 63,
      email: 'patricio.aguilar@email.com',
      phone: '+34 612 345 701',
      bloodType: 'AB-',
      status: 'inactive',
      nextSession: null,
      lastSession: '2024-01-09T14:00:00',
      assignedDoctor: {
         id: 'dr2',
         name: 'Dr. Ana López',
         specialty: 'Medicina Interna'
      },
      progress: 48,
      riskLevel: 'high',
      treatmentPlan: 'Tratamiento pausado - complicaciones',
      recentVitals: {
         bloodPressure: '162/102',
         heartRate: 89,
         weight: 72.6
      },
      alerts: 5,
      sessionsThisMonth: 3,
      adherence: 38
   },
   {
      id: '25',
      name: 'Soledad Torres',
      age: 70,
      email: 'soledad.torres@email.com',
      phone: '+34 612 345 702',
      bloodType: 'A+',
      status: 'scheduled',
      nextSession: '2024-01-16T10:00:00',
      lastSession: '2024-01-13T10:00:00',
      assignedDoctor: {
         id: 'dr6',
         name: 'Dra. Patricia Vidal',
         specialty: 'Nefrología'
      },
      progress: 81,
      riskLevel: 'medium',
      treatmentPlan: 'Hemodiálisis 3x/semana + monitoreo cardíaco',
      recentVitals: {
         bloodPressure: '136/85',
         heartRate: 75,
         weight: 64.1
      },
      alerts: 1,
      sessionsThisMonth: 9,
      adherence: 87
   }
];

// Mock metrics data for admin view
export const mockPatientMetrics: PatientMetrics = {
   totalPatients: mockPatientsList.length,
   activePatients: mockPatientsList.filter(p => p.status === 'active').length,
   scheduledToday: mockPatientsList.filter(p =>
      p.nextSession && new Date(p.nextSession)
         .toDateString() === new Date()
         .toDateString()
   ).length,
   emergencyCases: mockPatientsList.filter(p => p.status === 'emergency').length,
   averageAdherence: Math.round(
      mockPatientsList.reduce((sum, p) => sum + p.adherence, 0) / mockPatientsList.length
   ),
   patientsImproving: mockPatientsList.filter(p => p.progress >= 80).length,
   patientsAtRisk: mockPatientsList.filter(p => p.riskLevel === 'high').length,
   monthlyGrowth: 8.5 // percentage
};

// Mock treatment effectiveness data for charts
export const mockTreatmentEffectivenessData: TreatmentEffectivenessData[] = [
   {
      month: 'Ago',
      effectiveness: 82,
      patientCount: 18
   },
   {
      month: 'Sep',
      effectiveness: 85,
      patientCount: 20
   },
   {
      month: 'Oct',
      effectiveness: 88,
      patientCount: 22
   },
   {
      month: 'Nov',
      effectiveness: 91,
      patientCount: 23
   },
   {
      month: 'Dic',
      effectiveness: 89,
      patientCount: 24
   },
   {
      month: 'Ene',
      effectiveness: 93,
      patientCount: 25
   }
];

// Mock adherence distribution data
export const mockAdherenceDistribution: AdherenceDistribution[] = [
   {
      range: '90-100%',
      count: 12,
      percentage: 48
   },
   {
      range: '80-89%',
      count: 8,
      percentage: 32
   },
   {
      range: '70-79%',
      count: 3,
      percentage: 12
   },
   {
      range: '60-69%',
      count: 2,
      percentage: 8
   }
];

// Mock risk distribution data
export const mockRiskDistribution: RiskDistribution[] = [
   {
      level: 'low',
      count: 14,
      percentage: 56,
      color: 'text-green-600'
   },
   {
      level: 'medium',
      count: 7,
      percentage: 28,
      color: 'text-yellow-600'
   },
   {
      level: 'high',
      count: 4,
      percentage: 16,
      color: 'text-red-600'
   }
];

// Utility functions
export const getPatientsByDoctor = (doctorId: string): PatientListItem[] => {
   return mockPatientsList.filter(patient => patient.assignedDoctor.id === doctorId);
};

export const getPatientsByStatus = (status: PatientListItem['status']): PatientListItem[] => {
   return mockPatientsList.filter(patient => patient.status === status);
};

export const getPatientsByRiskLevel = (riskLevel: PatientListItem['riskLevel']): PatientListItem[] => {
   return mockPatientsList.filter(patient => patient.riskLevel === riskLevel);
};
