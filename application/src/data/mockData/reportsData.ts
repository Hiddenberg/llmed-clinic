export interface DailyPatientStats {
   date: string;
   totalPatients: number;
   hemodialysisPatients: number;
   consultationPatients: number;
   emergencyPatients: number;
   completedSessions: number;
   cancelledSessions: number;
}

export interface StaffAttendance {
   date: string;
   doctors: number;
   nurses: number;
   technicians: number;
   totalStaff: number;
}

export interface TreatmentEfficiency {
   date: string;
   averageEfficiency: number;
   averageSessionDuration: number;
   averageFluidRemoval: number;
   complicationRate: number;
}



export interface EquipmentUtilization {
   equipmentName: string;
   utilizationRate: number;
   maintenanceHours: number;
   downtime: number;
   efficiency: number;
}

export interface MonthlyOverview {
   month: string;
   totalPatients: number;
   totalSessions: number;
   patientSatisfaction: number;
   staffUtilization: number;
}

export interface PatientDemographics {
   ageGroup: string;
   count: number;
   percentage: number;
}

export interface TreatmentOutcomes {
   outcome: string;
   count: number;
   percentage: number;
   color: string;
}

// Last 7 days patient attendance data
export const mockDailyPatientStats: DailyPatientStats[] = [
   {
      date: '2024-01-08',
      totalPatients: 42,
      hemodialysisPatients: 35,
      consultationPatients: 5,
      emergencyPatients: 2,
      completedSessions: 40,
      cancelledSessions: 2
   },
   {
      date: '2024-01-09',
      totalPatients: 38,
      hemodialysisPatients: 32,
      consultationPatients: 4,
      emergencyPatients: 2,
      completedSessions: 36,
      cancelledSessions: 2
   },
   {
      date: '2024-01-10',
      totalPatients: 45,
      hemodialysisPatients: 38,
      consultationPatients: 6,
      emergencyPatients: 1,
      completedSessions: 44,
      cancelledSessions: 1
   },
   {
      date: '2024-01-11',
      totalPatients: 41,
      hemodialysisPatients: 34,
      consultationPatients: 5,
      emergencyPatients: 2,
      completedSessions: 39,
      cancelledSessions: 2
   },
   {
      date: '2024-01-12',
      totalPatients: 39,
      hemodialysisPatients: 33,
      consultationPatients: 4,
      emergencyPatients: 2,
      completedSessions: 37,
      cancelledSessions: 2
   },
   {
      date: '2024-01-13',
      totalPatients: 43,
      hemodialysisPatients: 36,
      consultationPatients: 5,
      emergencyPatients: 2,
      completedSessions: 41,
      cancelledSessions: 2
   },
   {
      date: '2024-01-14',
      totalPatients: 37,
      hemodialysisPatients: 31,
      consultationPatients: 4,
      emergencyPatients: 2,
      completedSessions: 35,
      cancelledSessions: 2
   }
];

// Staff attendance data
export const mockStaffAttendance: StaffAttendance[] = [
   {
      date: '2024-01-08',
      doctors: 8,
      nurses: 15,
      technicians: 6,
      totalStaff: 29
   },
   {
      date: '2024-01-09',
      doctors: 7,
      nurses: 14,
      technicians: 5,
      totalStaff: 26
   },
   {
      date: '2024-01-10',
      doctors: 9,
      nurses: 16,
      technicians: 6,
      totalStaff: 31
   },
   {
      date: '2024-01-11',
      doctors: 8,
      nurses: 15,
      technicians: 6,
      totalStaff: 29
   },
   {
      date: '2024-01-12',
      doctors: 7,
      nurses: 13,
      technicians: 5,
      totalStaff: 25
   },
   {
      date: '2024-01-13',
      doctors: 8,
      nurses: 15,
      technicians: 6,
      totalStaff: 29
   },
   {
      date: '2024-01-14',
      doctors: 6,
      nurses: 12,
      technicians: 4,
      totalStaff: 22
   }
];

// Treatment efficiency data
export const mockTreatmentEfficiency: TreatmentEfficiency[] = [
   {
      date: '2024-01-08',
      averageEfficiency: 91.2,
      averageSessionDuration: 238,
      averageFluidRemoval: 2.1,
      complicationRate: 3.2
   },
   {
      date: '2024-01-09',
      averageEfficiency: 89.8,
      averageSessionDuration: 242,
      averageFluidRemoval: 2.0,
      complicationRate: 4.1
   },
   {
      date: '2024-01-10',
      averageEfficiency: 92.5,
      averageSessionDuration: 235,
      averageFluidRemoval: 2.2,
      complicationRate: 2.8
   },
   {
      date: '2024-01-11',
      averageEfficiency: 90.1,
      averageSessionDuration: 240,
      averageFluidRemoval: 2.1,
      complicationRate: 3.5
   },
   {
      date: '2024-01-12',
      averageEfficiency: 88.9,
      averageSessionDuration: 245,
      averageFluidRemoval: 1.9,
      complicationRate: 4.8
   },
   {
      date: '2024-01-13',
      averageEfficiency: 91.8,
      averageSessionDuration: 236,
      averageFluidRemoval: 2.2,
      complicationRate: 2.9
   },
   {
      date: '2024-01-14',
      averageEfficiency: 90.4,
      averageSessionDuration: 239,
      averageFluidRemoval: 2.0,
      complicationRate: 3.6
   }
];



// Equipment utilization data
export const mockEquipmentUtilization: EquipmentUtilization[] = [
   {
      equipmentName: 'Máquina Diálisis A-1',
      utilizationRate: 92.5,
      maintenanceHours: 4,
      downtime: 2.1,
      efficiency: 94.2
   },
   {
      equipmentName: 'Máquina Diálisis A-2',
      utilizationRate: 88.3,
      maintenanceHours: 6,
      downtime: 3.2,
      efficiency: 91.8
   },
   {
      equipmentName: 'Máquina Diálisis B-1',
      utilizationRate: 95.1,
      maintenanceHours: 2,
      downtime: 1.5,
      efficiency: 96.1
   },
   {
      equipmentName: 'Máquina Diálisis B-2',
      utilizationRate: 89.7,
      maintenanceHours: 5,
      downtime: 2.8,
      efficiency: 92.4
   },
   {
      equipmentName: 'Sistema Purificación',
      utilizationRate: 97.2,
      maintenanceHours: 8,
      downtime: 1.2,
      efficiency: 98.1
   },
   {
      equipmentName: 'Monitor Paciente 1',
      utilizationRate: 91.4,
      maintenanceHours: 3,
      downtime: 2.4,
      efficiency: 93.6
   }
];

// Monthly overview data (last 6 months)
export const mockMonthlyOverview: MonthlyOverview[] = [
   {
      month: 'Ago',
      totalPatients: 1247,
      totalSessions: 1089,
      patientSatisfaction: 4.6,
      staffUtilization: 87.2
   },
   {
      month: 'Sep',
      totalPatients: 1312,
      totalSessions: 1156,
      patientSatisfaction: 4.7,
      staffUtilization: 89.1
   },
   {
      month: 'Oct',
      totalPatients: 1289,
      totalSessions: 1134,
      patientSatisfaction: 4.5,
      staffUtilization: 86.8
   },
   {
      month: 'Nov',
      totalPatients: 1356,
      totalSessions: 1201,
      patientSatisfaction: 4.8,
      staffUtilization: 91.3
   },
   {
      month: 'Dec',
      totalPatients: 1298,
      totalSessions: 1143,
      patientSatisfaction: 4.6,
      staffUtilization: 88.7
   },
   {
      month: 'Ene',
      totalPatients: 1334,
      totalSessions: 1178,
      patientSatisfaction: 4.7,
      staffUtilization: 90.2
   }
];

// Patient demographics
export const mockPatientDemographics: PatientDemographics[] = [
   {
      ageGroup: '18-30',
      count: 45,
      percentage: 8.2
   },
   {
      ageGroup: '31-45',
      count: 89,
      percentage: 16.1
   },
   {
      ageGroup: '46-60',
      count: 167,
      percentage: 30.3
   },
   {
      ageGroup: '61-75',
      count: 189,
      percentage: 34.2
   },
   {
      ageGroup: '76+',
      count: 62,
      percentage: 11.2
   }
];

// Treatment outcomes
export const mockTreatmentOutcomes: TreatmentOutcomes[] = [
   {
      outcome: 'Excelente',
      count: 312,
      percentage: 56.5,
      color: '#10B981'
   },
   {
      outcome: 'Bueno',
      count: 178,
      percentage: 32.2,
      color: '#3B82F6'
   },
   {
      outcome: 'Regular',
      count: 45,
      percentage: 8.1,
      color: '#F59E0B'
   },
   {
      outcome: 'Complicaciones',
      count: 17,
      percentage: 3.1,
      color: '#EF4444'
   }
];

// Data filtering functions
export function getFilteredDailyPatientStats (period: 'week' | 'month' | 'quarter' | 'year') {
   const multiplier = period === 'week' ? 1 : period === 'month' ? 4 : period === 'quarter' ? 12 : 52;
   return mockDailyPatientStats.map(day => ({
      ...day,
      totalPatients: Math.round(day.totalPatients * multiplier * (0.8 + Math.random() * 0.4)),
      hemodialysisPatients: Math.round(day.hemodialysisPatients * multiplier * (0.8 + Math.random() * 0.4)),
      consultationPatients: Math.round(day.consultationPatients * multiplier * (0.8 + Math.random() * 0.4)),
      emergencyPatients: Math.round(day.emergencyPatients * multiplier * (0.8 + Math.random() * 0.4)),
      completedSessions: Math.round(day.completedSessions * multiplier * (0.8 + Math.random() * 0.4)),
      cancelledSessions: Math.round(day.cancelledSessions * multiplier * (0.8 + Math.random() * 0.4))
   }));
}

export function getFilteredStaffAttendance (period: 'week' | 'month' | 'quarter' | 'year') {
   const multiplier = period === 'week' ? 1 : period === 'month' ? 1.2 : period === 'quarter' ? 1.5 : 2;
   return mockStaffAttendance.map(day => ({
      ...day,
      doctors: Math.round(day.doctors * multiplier * (0.9 + Math.random() * 0.2)),
      nurses: Math.round(day.nurses * multiplier * (0.9 + Math.random() * 0.2)),
      technicians: Math.round(day.technicians * multiplier * (0.9 + Math.random() * 0.2)),
      totalStaff: Math.round(day.totalStaff * multiplier * (0.9 + Math.random() * 0.2))
   }));
}

export function getFilteredTreatmentEfficiency (period: 'week' | 'month' | 'quarter' | 'year') {
   const variation = period === 'week' ? 0.02 : period === 'month' ? 0.05 : period === 'quarter' ? 0.08 : 0.1;
   return mockTreatmentEfficiency.map(day => ({
      ...day,
      averageEfficiency: Math.round((day.averageEfficiency + (Math.random() - 0.5) * variation * 100) * 10) / 10,
      averageSessionDuration: Math.round(day.averageSessionDuration + (Math.random() - 0.5) * variation * 50),
      averageFluidRemoval: Math.round((day.averageFluidRemoval + (Math.random() - 0.5) * variation * 2) * 10) / 10,
      complicationRate: Math.round((day.complicationRate + (Math.random() - 0.5) * variation * 10) * 10) / 10
   }));
}

export function getFilteredKPIs (period: 'week' | 'month' | 'quarter' | 'year') {
   const multiplier = period === 'week' ? 1 : period === 'month' ? 4.3 : period === 'quarter' ? 13 : 52;
   const variation = period === 'week' ? 0.95 : period === 'month' ? 0.9 : period === 'quarter' ? 0.85 : 0.8;

   return {
      ...mockKPIs,
      totalPatients: Math.round(mockKPIs.totalPatients * multiplier * (variation + Math.random() * (2 - variation))),
      activePatients: Math.round(mockKPIs.activePatients * multiplier * (variation + Math.random() * (2 - variation))),
      averageSessionsPerWeek: Math.round((mockKPIs.averageSessionsPerWeek * (variation + Math.random() * (2 - variation))) * 10) / 10,
      patientRetentionRate: Math.round((mockKPIs.patientRetentionRate * (0.98 + Math.random() * 0.04)) * 10) / 10,
      averageTreatmentEfficiency: Math.round((mockKPIs.averageTreatmentEfficiency * (0.95 + Math.random() * 0.1)) * 10) / 10,
      staffUtilizationRate: Math.round((mockKPIs.staffUtilizationRate * (0.9 + Math.random() * 0.2)) * 10) / 10,
      equipmentUptimeRate: Math.round((mockKPIs.equipmentUptimeRate * (0.95 + Math.random() * 0.1)) * 10) / 10,
      patientSatisfactionScore: Math.round((mockKPIs.patientSatisfactionScore * (0.95 + Math.random() * 0.1)) * 10) / 10,
      emergencyRate: Math.round((mockKPIs.emergencyRate * (0.8 + Math.random() * 0.4)) * 10) / 10,
      complicationRate: Math.round((mockKPIs.complicationRate * (0.8 + Math.random() * 0.4)) * 10) / 10
   };
}

// Key performance indicators
export const mockKPIs = {
   totalPatients: 552,
   activePatients: 487,
   averageSessionsPerWeek: 3.2,
   patientRetentionRate: 94.8,
   averageTreatmentEfficiency: 91.2,
   staffUtilizationRate: 89.4,
   equipmentUptimeRate: 96.7,
   patientSatisfactionScore: 4.7,
   emergencyRate: 2.8, // percentage
   complicationRate: 3.4 // percentage
};
