export interface Clinic {
   id: string;
   name: string;
   location: string;
   totalMachines: number;
   activeMachines: number;
   maintenanceMachines: number;
   offlineMachines: number;
   totalPatients: number;
   activePatients: number;
   utilizationRate: number;
   lastUpdated: string;
}

export interface DialysisMachine {
   id: string;
   clinicId: string;
   name: string;
   model: string;
   serialNumber: string;
   status: 'active' | 'standby' | 'maintenance' | 'offline' | 'emergency';
   currentPatient?: {
      id: string;
      name: string;
      sessionStart: string;
      sessionDuration: number;
      progress: number;
   };
   parameters: {
      bloodFlowRate: number; // mL/min
      dialysateFlowRate: number; // mL/min
      ultrafiltrationRate: number; // mL/hr
      temperature: number; // °C
      conductivity: number; // mS/cm
      pressure: {
         arterial: number; // mmHg
         venous: number; // mmHg
         dialysate: number; // mmHg
      };
   };
   alarms: {
      active: EquipmentAlarm[];
      total: number;
      critical: number;
      warning: number;
   };
   performance: {
      utilizationRate: number;
      efficiency: number;
      averageSessionDuration: number;
      totalOperatingHours: number;
      sessionsToday: number;
      sessionsThisWeek: number;
   };
   maintenance: {
      lastMaintenance: string;
      nextMaintenance: string;
      maintenanceHours: number;
      totalDowntime: number;
      maintenanceType: 'preventive' | 'corrective' | 'calibration';
   };
   location: {
      room: string;
      position: string;
   };
   lastUpdated: string;
}

export interface EquipmentAlarm {
   id: string;
   type: 'critical' | 'warning' | 'info';
   category: 'pressure' | 'temperature' | 'flow' | 'safety' | 'system';
   title: string;
   description: string;
   timestamp: string;
   acknowledged: boolean;
   resolvedAt?: string;
}

export interface RealTimeData {
   machineId: string;
   timestamp: string;
   vitals: {
      bloodPressure: { systolic: number; diastolic: number };
      heartRate: number;
      temperature: number;
   };
   fluidBalance: {
      removed: number; // mL
      target: number; // mL
      rate: number; // mL/hr
   };
   treatmentProgress: number; // 0-100%
   estimatedTimeRemaining: number; // minutes
}

// Mock Clinics Data
export const mockClinics: Clinic[] = [
   {
      id: 'clinic-1',
      name: 'LLMed Clinic Centro',
      location: 'Av. Reforma 123, Ciudad de México',
      totalMachines: 12,
      activeMachines: 8,
      maintenanceMachines: 2,
      offlineMachines: 2,
      totalPatients: 45,
      activePatients: 8,
      utilizationRate: 78.5,
      lastUpdated: new Date()
         .toISOString()
   },
   {
      id: 'clinic-2',
      name: 'LLMed Clinic Norte',
      location: 'Blvd. Norte 456, Monterrey',
      totalMachines: 8,
      activeMachines: 6,
      maintenanceMachines: 1,
      offlineMachines: 1,
      totalPatients: 32,
      activePatients: 6,
      utilizationRate: 82.3,
      lastUpdated: new Date()
         .toISOString()
   },
   {
      id: 'clinic-3',
      name: 'LLMed Clinic Sur',
      location: 'Av. Insurgentes Sur 789, CDMX',
      totalMachines: 15,
      activeMachines: 11,
      maintenanceMachines: 2,
      offlineMachines: 2,
      totalPatients: 58,
      activePatients: 11,
      utilizationRate: 85.1,
      lastUpdated: new Date()
         .toISOString()
   },
   {
      id: 'clinic-4',
      name: 'LLMed Clinic Occidente',
      location: 'Av. Chapultepec 321, Guadalajara',
      totalMachines: 10,
      activeMachines: 7,
      maintenanceMachines: 1,
      offlineMachines: 2,
      totalPatients: 38,
      activePatients: 7,
      utilizationRate: 74.2,
      lastUpdated: new Date()
         .toISOString()
   }
];

// Mock Equipment Data for Centro Clinic
export const mockEquipmentData: DialysisMachine[] = [
   {
      id: 'machine-1',
      clinicId: 'clinic-1',
      name: 'Máquina HD-01',
      model: 'Fresenius 5008S',
      serialNumber: 'FS5008S-001',
      status: 'active',
      currentPatient: {
         id: 'patient-1',
         name: 'María González',
         sessionStart: new Date(Date.now() - 2 * 60 * 60 * 1000)
            .toISOString(),
         sessionDuration: 240,
         progress: 65
      },
      parameters: {
         bloodFlowRate: 300,
         dialysateFlowRate: 500,
         ultrafiltrationRate: 800,
         temperature: 37.0,
         conductivity: 14.2,
         pressure: {
            arterial: -180,
            venous: 120,
            dialysate: 50
         }
      },
      alarms: {
         active: [],
         total: 2,
         critical: 0,
         warning: 1
      },
      performance: {
         utilizationRate: 92.5,
         efficiency: 94.2,
         averageSessionDuration: 238,
         totalOperatingHours: 2847,
         sessionsToday: 3,
         sessionsThisWeek: 18
      },
      maintenance: {
         lastMaintenance: '2024-01-05',
         nextMaintenance: '2024-02-05',
         maintenanceHours: 4,
         totalDowntime: 12.5,
         maintenanceType: 'preventive'
      },
      location: {
         room: 'Sala A',
         position: 'A-01'
      },
      lastUpdated: new Date()
         .toISOString()
   },
   {
      id: 'machine-2',
      clinicId: 'clinic-1',
      name: 'Máquina HD-02',
      model: 'Fresenius 5008S',
      serialNumber: 'FS5008S-002',
      status: 'active',
      currentPatient: {
         id: 'patient-2',
         name: 'Carlos Hernández',
         sessionStart: new Date(Date.now() - 1.5 * 60 * 60 * 1000)
            .toISOString(),
         sessionDuration: 240,
         progress: 45
      },
      parameters: {
         bloodFlowRate: 280,
         dialysateFlowRate: 500,
         ultrafiltrationRate: 650,
         temperature: 36.8,
         conductivity: 14.0,
         pressure: {
            arterial: -175,
            venous: 115,
            dialysate: 48
         }
      },
      alarms: {
         active: [{
            id: 'alarm-1',
            type: 'warning',
            category: 'pressure',
            title: 'Presión Arterial Alta',
            description: 'Presión arterial por encima del rango normal',
            timestamp: new Date(Date.now() - 15 * 60 * 1000)
               .toISOString(),
            acknowledged: false
         }],
         total: 5,
         critical: 0,
         warning: 2
      },
      performance: {
         utilizationRate: 88.3,
         efficiency: 91.8,
         averageSessionDuration: 242,
         totalOperatingHours: 2654,
         sessionsToday: 2,
         sessionsThisWeek: 16
      },
      maintenance: {
         lastMaintenance: '2024-01-08',
         nextMaintenance: '2024-02-08',
         maintenanceHours: 6,
         totalDowntime: 18.2,
         maintenanceType: 'preventive'
      },
      location: {
         room: 'Sala A',
         position: 'A-02'
      },
      lastUpdated: new Date()
         .toISOString()
   },
   {
      id: 'machine-3',
      clinicId: 'clinic-1',
      name: 'Máquina HD-03',
      model: 'Baxter AK 200 Ultra S',
      serialNumber: 'BX200US-003',
      status: 'maintenance',
      parameters: {
         bloodFlowRate: 0,
         dialysateFlowRate: 0,
         ultrafiltrationRate: 0,
         temperature: 0,
         conductivity: 0,
         pressure: {
            arterial: 0,
            venous: 0,
            dialysate: 0
         }
      },
      alarms: {
         active: [{
            id: 'alarm-2',
            type: 'info',
            category: 'system',
            title: 'Mantenimiento Programado',
            description: 'Máquina en mantenimiento preventivo programado',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
               .toISOString(),
            acknowledged: true
         }],
         total: 1,
         critical: 0,
         warning: 0
      },
      performance: {
         utilizationRate: 95.1,
         efficiency: 96.1,
         averageSessionDuration: 235,
         totalOperatingHours: 3124,
         sessionsToday: 0,
         sessionsThisWeek: 15
      },
      maintenance: {
         lastMaintenance: new Date()
            .toISOString(),
         nextMaintenance: '2024-03-15',
         maintenanceHours: 2,
         totalDowntime: 8.5,
         maintenanceType: 'preventive'
      },
      location: {
         room: 'Sala B',
         position: 'B-01'
      },
      lastUpdated: new Date()
         .toISOString()
   },
   {
      id: 'machine-4',
      clinicId: 'clinic-1',
      name: 'Máquina HD-04',
      model: 'Nipro Surdial X',
      serialNumber: 'NSX-004',
      status: 'active',
      currentPatient: {
         id: 'patient-4',
         name: 'Laura Pérez',
         sessionStart: new Date(Date.now() - 50 * 60 * 1000)
            .toISOString(),
         sessionDuration: 240,
         progress: 22
      },
      parameters: {
         bloodFlowRate: 295,
         dialysateFlowRate: 505,
         ultrafiltrationRate: 720,
         temperature: 36.9,
         conductivity: 14.1,
         pressure: {
            arterial: -172,
            venous: 112,
            dialysate: 47
         }
      },
      alarms: {
         active: [],
         total: 3,
         critical: 0,
         warning: 1
      },
      performance: {
         utilizationRate: 89.7,
         efficiency: 92.4,
         averageSessionDuration: 240,
         totalOperatingHours: 2456,
         sessionsToday: 2,
         sessionsThisWeek: 14
      },
      maintenance: {
         lastMaintenance: '2024-01-10',
         nextMaintenance: '2024-02-10',
         maintenanceHours: 5,
         totalDowntime: 15.8,
         maintenanceType: 'preventive'
      },
      location: {
         room: 'Sala B',
         position: 'B-02'
      },
      lastUpdated: new Date()
         .toISOString()
   },
   {
      id: 'machine-5',
      clinicId: 'clinic-1',
      name: 'Máquina HD-05',
      model: 'Fresenius 5008S',
      serialNumber: 'FS5008S-005',
      status: 'active',
      currentPatient: {
         id: 'patient-5',
         name: 'Ana Martínez',
         sessionStart: new Date(Date.now() - 3 * 60 * 60 * 1000)
            .toISOString(),
         sessionDuration: 240,
         progress: 85
      },
      parameters: {
         bloodFlowRate: 320,
         dialysateFlowRate: 520,
         ultrafiltrationRate: 750,
         temperature: 37.1,
         conductivity: 14.1,
         pressure: {
            arterial: -185,
            venous: 125,
            dialysate: 52
         }
      },
      alarms: {
         active: [],
         total: 1,
         critical: 0,
         warning: 0
      },
      performance: {
         utilizationRate: 91.0,
         efficiency: 95.0,
         averageSessionDuration: 236,
         totalOperatingHours: 2789,
         sessionsToday: 3,
         sessionsThisWeek: 17
      },
      maintenance: {
         lastMaintenance: '2024-01-03',
         nextMaintenance: '2024-02-03',
         maintenanceHours: 3,
         totalDowntime: 8.0,
         maintenanceType: 'preventive'
      },
      location: {
         room: 'Sala A',
         position: 'A-03'
      },
      lastUpdated: new Date()
         .toISOString()
   },
   {
      id: 'machine-6',
      clinicId: 'clinic-1',
      name: 'Máquina HD-06',
      model: 'Baxter AK 200 Ultra S',
      serialNumber: 'BX200US-006',
      status: 'active',
      currentPatient: {
         id: 'patient-6',
         name: 'José Silva',
         sessionStart: new Date(Date.now() - 1 * 60 * 60 * 1000)
            .toISOString(),
         sessionDuration: 240,
         progress: 25
      },
      parameters: {
         bloodFlowRate: 290,
         dialysateFlowRate: 480,
         ultrafiltrationRate: 720,
         temperature: 36.9,
         conductivity: 14.0,
         pressure: {
            arterial: -170,
            venous: 110,
            dialysate: 45
         }
      },
      alarms: {
         active: [],
         total: 2,
         critical: 0,
         warning: 1
      },
      performance: {
         utilizationRate: 87.0,
         efficiency: 93.0,
         averageSessionDuration: 245,
         totalOperatingHours: 2234,
         sessionsToday: 2,
         sessionsThisWeek: 15
      },
      maintenance: {
         lastMaintenance: '2024-01-12',
         nextMaintenance: '2024-02-12',
         maintenanceHours: 4,
         totalDowntime: 11.0,
         maintenanceType: 'preventive'
      },
      location: {
         room: 'Sala B',
         position: 'B-03'
      },
      lastUpdated: new Date()
         .toISOString()
   },
   {
      id: 'machine-7',
      clinicId: 'clinic-1',
      name: 'Máquina HD-07',
      model: 'Nipro Surdial X',
      serialNumber: 'NSX-007',
      status: 'active',
      currentPatient: {
         id: 'patient-7',
         name: 'Carmen López',
         sessionStart: new Date(Date.now() - 2.5 * 60 * 60 * 1000)
            .toISOString(),
         sessionDuration: 240,
         progress: 70
      },
      parameters: {
         bloodFlowRate: 310,
         dialysateFlowRate: 510,
         ultrafiltrationRate: 680,
         temperature: 37.0,
         conductivity: 14.3,
         pressure: {
            arterial: -178,
            venous: 118,
            dialysate: 49
         }
      },
      alarms: {
         active: [],
         total: 0,
         critical: 0,
         warning: 0
      },
      performance: {
         utilizationRate: 94.0,
         efficiency: 96.0,
         averageSessionDuration: 232,
         totalOperatingHours: 3056,
         sessionsToday: 3,
         sessionsThisWeek: 19
      },
      maintenance: {
         lastMaintenance: '2024-01-06',
         nextMaintenance: '2024-02-06',
         maintenanceHours: 2,
         totalDowntime: 6.0,
         maintenanceType: 'preventive'
      },
      location: {
         room: 'Sala C',
         position: 'C-01'
      },
      lastUpdated: new Date()
         .toISOString()
   },
   {
      id: 'machine-8',
      clinicId: 'clinic-1',
      name: 'Máquina HD-08',
      model: 'Fresenius 5008S',
      serialNumber: 'FS5008S-008',
      status: 'active',
      currentPatient: {
         id: 'patient-8',
         name: 'Roberto Díaz',
         sessionStart: new Date(Date.now() - 0.5 * 60 * 60 * 1000)
            .toISOString(),
         sessionDuration: 240,
         progress: 12
      },
      parameters: {
         bloodFlowRate: 275,
         dialysateFlowRate: 495,
         ultrafiltrationRate: 820,
         temperature: 36.7,
         conductivity: 13.9,
         pressure: {
            arterial: -182,
            venous: 122,
            dialysate: 51
         }
      },
      alarms: {
         active: [],
         total: 3,
         critical: 0,
         warning: 1
      },
      performance: {
         utilizationRate: 85.0,
         efficiency: 91.0,
         averageSessionDuration: 248,
         totalOperatingHours: 1987,
         sessionsToday: 1,
         sessionsThisWeek: 13
      },
      maintenance: {
         lastMaintenance: '2024-01-14',
         nextMaintenance: '2024-02-14',
         maintenanceHours: 5,
         totalDowntime: 14.0,
         maintenanceType: 'preventive'
      },
      location: {
         room: 'Sala C',
         position: 'C-02'
      },
      lastUpdated: new Date()
         .toISOString()
   },
   {
      id: 'machine-9',
      clinicId: 'clinic-1',
      name: 'Máquina HD-09',
      model: 'Baxter AK 200 Ultra S',
      serialNumber: 'BX200US-009',
      status: 'active',
      currentPatient: {
         id: 'patient-9',
         name: 'Ernesto Valle',
         sessionStart: new Date(Date.now() - 1.2 * 60 * 60 * 1000)
            .toISOString(),
         sessionDuration: 240,
         progress: 35
      },
      parameters: {
         bloodFlowRate: 288,
         dialysateFlowRate: 490,
         ultrafiltrationRate: 700,
         temperature: 36.8,
         conductivity: 14.0,
         pressure: {
            arterial: -176,
            venous: 117,
            dialysate: 50
         }
      },
      alarms: {
         active: [],
         total: 1,
         critical: 0,
         warning: 0
      },
      performance: {
         utilizationRate: 86.5,
         efficiency: 92.2,
         averageSessionDuration: 242,
         totalOperatingHours: 2104,
         sessionsToday: 2,
         sessionsThisWeek: 14
      },
      maintenance: {
         lastMaintenance: '2024-01-09',
         nextMaintenance: '2024-02-09',
         maintenanceHours: 6,
         totalDowntime: 12.0,
         maintenanceType: 'preventive'
      },
      location: {
         room: 'Sala C',
         position: 'C-03'
      },
      lastUpdated: new Date()
         .toISOString()
   },
   {
      id: 'machine-10',
      clinicId: 'clinic-1',
      name: 'Máquina HD-10',
      model: 'Nipro Surdial X',
      serialNumber: 'NSX-010',
      status: 'maintenance',
      parameters: {
         bloodFlowRate: 0,
         dialysateFlowRate: 0,
         ultrafiltrationRate: 0,
         temperature: 0,
         conductivity: 0,
         pressure: {
            arterial: 0,
            venous: 0,
            dialysate: 0
         }
      },
      alarms: {
         active: [{
            id: 'alarm-10',
            type: 'info',
            category: 'system',
            title: 'Calibración en Curso',
            description: 'Calibración preventiva de sensores programada',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
               .toISOString(),
            acknowledged: true
         }],
         total: 1,
         critical: 0,
         warning: 0
      },
      performance: {
         utilizationRate: 82.0,
         efficiency: 88.0,
         averageSessionDuration: 255,
         totalOperatingHours: 1423,
         sessionsToday: 0,
         sessionsThisWeek: 10
      },
      maintenance: {
         lastMaintenance: new Date()
            .toISOString(),
         nextMaintenance: '2024-03-01',
         maintenanceHours: 8,
         totalDowntime: 28.0,
         maintenanceType: 'calibration'
      },
      location: {
         room: 'Sala D',
         position: 'D-01'
      },
      lastUpdated: new Date()
         .toISOString()
   },
   {
      id: 'machine-11',
      clinicId: 'clinic-1',
      name: 'Máquina HD-11',
      model: 'Fresenius 5008S',
      serialNumber: 'FS5008S-011',
      status: 'offline',
      parameters: {
         bloodFlowRate: 0,
         dialysateFlowRate: 0,
         ultrafiltrationRate: 0,
         temperature: 0,
         conductivity: 0,
         pressure: {
            arterial: 0,
            venous: 0,
            dialysate: 0
         }
      },
      alarms: {
         active: [{
            id: 'alarm-11',
            type: 'critical',
            category: 'system',
            title: 'Falla del Sistema',
            description: 'Error crítico en el módulo de control principal',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
               .toISOString(),
            acknowledged: false
         }],
         total: 8,
         critical: 1,
         warning: 2
      },
      performance: {
         utilizationRate: 72.0,
         efficiency: 85.0,
         averageSessionDuration: 260,
         totalOperatingHours: 2145,
         sessionsToday: 0,
         sessionsThisWeek: 8
      },
      maintenance: {
         lastMaintenance: '2023-12-28',
         nextMaintenance: '2024-01-28',
         maintenanceHours: 12,
         totalDowntime: 45.0,
         maintenanceType: 'corrective'
      },
      location: {
         room: 'Sala D',
         position: 'D-02'
      },
      lastUpdated: new Date()
         .toISOString()
   },
   {
      id: 'machine-12',
      clinicId: 'clinic-1',
      name: 'Máquina HD-12',
      model: 'Baxter AK 200 Ultra S',
      serialNumber: 'BX200US-012',
      status: 'offline',
      parameters: {
         bloodFlowRate: 0,
         dialysateFlowRate: 0,
         ultrafiltrationRate: 0,
         temperature: 0,
         conductivity: 0,
         pressure: {
            arterial: 0,
            venous: 0,
            dialysate: 0
         }
      },
      alarms: {
         active: [{
            id: 'alarm-12',
            type: 'warning',
            category: 'system',
            title: 'Comunicación Perdida',
            description: 'Pérdida de comunicación con el sistema central',
            timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000)
               .toISOString(),
            acknowledged: true
         }],
         total: 4,
         critical: 0,
         warning: 3
      },
      performance: {
         utilizationRate: 68.0,
         efficiency: 82.0,
         averageSessionDuration: 265,
         totalOperatingHours: 1876,
         sessionsToday: 0,
         sessionsThisWeek: 6
      },
      maintenance: {
         lastMaintenance: '2024-01-02',
         nextMaintenance: '2024-02-02',
         maintenanceHours: 15,
         totalDowntime: 52.0,
         maintenanceType: 'corrective'
      },
      location: {
         room: 'Sala D',
         position: 'D-03'
      },
      lastUpdated: new Date()
         .toISOString()
   }
];

// Mock real-time data for active machines
export const mockRealTimeData: RealTimeData[] = [
   {
      machineId: 'machine-1',
      timestamp: new Date()
         .toISOString(),
      vitals: {
         bloodPressure: {
            systolic: 135,
            diastolic: 82
         },
         heartRate: 78,
         temperature: 36.4
      },
      fluidBalance: {
         removed: 1650,
         target: 2500,
         rate: 800
      },
      treatmentProgress: 65,
      estimatedTimeRemaining: 84
   },
   {
      machineId: 'machine-2',
      timestamp: new Date()
         .toISOString(),
      vitals: {
         bloodPressure: {
            systolic: 142,
            diastolic: 88
         },
         heartRate: 82,
         temperature: 36.6
      },
      fluidBalance: {
         removed: 975,
         target: 2100,
         rate: 650
      },
      treatmentProgress: 45,
      estimatedTimeRemaining: 132
   },
   {
      machineId: 'machine-4',
      timestamp: new Date()
         .toISOString(),
      vitals: {
         bloodPressure: {
            systolic: 130,
            diastolic: 80
         },
         heartRate: 76,
         temperature: 36.5
      },
      fluidBalance: {
         removed: 400,
         target: 2200,
         rate: 720
      },
      treatmentProgress: 22,
      estimatedTimeRemaining: 200
   },
   {
      machineId: 'machine-5',
      timestamp: new Date()
         .toISOString(),
      vitals: {
         bloodPressure: {
            systolic: 128,
            diastolic: 75
         },
         heartRate: 72,
         temperature: 36.8
      },
      fluidBalance: {
         removed: 2100,
         target: 2400,
         rate: 750
      },
      treatmentProgress: 85,
      estimatedTimeRemaining: 36
   },
   {
      machineId: 'machine-6',
      timestamp: new Date()
         .toISOString(),
      vitals: {
         bloodPressure: {
            systolic: 138,
            diastolic: 85
         },
         heartRate: 76,
         temperature: 36.5
      },
      fluidBalance: {
         removed: 600,
         target: 2200,
         rate: 720
      },
      treatmentProgress: 25,
      estimatedTimeRemaining: 180
   },
   {
      machineId: 'machine-7',
      timestamp: new Date()
         .toISOString(),
      vitals: {
         bloodPressure: {
            systolic: 132,
            diastolic: 78
         },
         heartRate: 74,
         temperature: 36.7
      },
      fluidBalance: {
         removed: 1680,
         target: 2300,
         rate: 680
      },
      treatmentProgress: 70,
      estimatedTimeRemaining: 72
   },
   {
      machineId: 'machine-8',
      timestamp: new Date()
         .toISOString(),
      vitals: {
         bloodPressure: {
            systolic: 145,
            diastolic: 90
         },
         heartRate: 85,
         temperature: 36.3
      },
      fluidBalance: {
         removed: 290,
         target: 2600,
         rate: 820
      },
      treatmentProgress: 12,
      estimatedTimeRemaining: 210
   },
   {
      machineId: 'machine-9',
      timestamp: new Date()
         .toISOString(),
      vitals: {
         bloodPressure: {
            systolic: 134,
            diastolic: 83
         },
         heartRate: 79,
         temperature: 36.6
      },
      fluidBalance: {
         removed: 840,
         target: 2300,
         rate: 700
      },
      treatmentProgress: 35,
      estimatedTimeRemaining: 150
   }
];
