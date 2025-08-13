export interface MedicalHistory {
   id: string;
   condition: string;
   diagnosisDate: string;
   icd10Code: string;
   status: 'active' | 'resolved' | 'chronic' | 'stable';
   severity: 'mild' | 'moderate' | 'severe';
   notes: string;
}

export interface Medication {
   id: string;
   name: string;
   genericName: string;
   dosage: string;
   frequency: string;
   route: string;
   startDate: string;
   endDate?: string;
   prescribedBy: string;
   indication: string;
   sideEffects?: string[];
   status: 'active' | 'discontinued' | 'suspended';
}

export interface LabResult {
   id: string;
   testName: string;
   value: number | string;
   unit: string;
   referenceRange: string;
   status: 'normal' | 'abnormal' | 'critical';
   date: string;
   orderedBy: string;
   notes?: string;
}

export interface VitalSignsRecord {
   id: string;
   date: string;
   time: string;
   systolicBP: number;
   diastolicBP: number;
   heartRate: number;
   respiratoryRate: number;
   temperature: number;
   oxygenSaturation: number;
   weight: number;
   height?: number;
   bmi?: number;
   painScale?: number;
   recordedBy: string;
}

export interface DialysisSession {
   id: string;
   date: string;
   startTime: string;
   endTime: string;
   duration: number; // minutes
   dialyzer: string;
   bloodFlow: number; // ml/min
   dialysateFlow: number; // ml/min
   ultraFiltrationGoal: number; // ml
   ultraFiltrationAchieved: number; // ml
   preWeight: number; // kg
   postWeight: number; // kg
   weightLoss: number; // kg
   accessType: string;
   accessSite: string;
   complications?: string;
   ktV: number;
   urr: number; // Urea Reduction Ratio
   conductedBy: string;
   notes?: string;
}

export interface ClinicalNote {
   id: string;
   date: string;
   time: string;
   type: 'progress' | 'assessment' | 'consultation' | 'procedure' | 'discharge';
   author: string;
   specialty: string;
   chiefComplaint?: string;
   historyOfPresentIllness?: string;
   assessment: string;
   plan: string;
   followUp?: string;
   signedBy: string;
   signedDate: string;
}

export interface AIInsight {
   id: string;
   category: 'risk_assessment' | 'treatment_optimization' | 'medication_alert' | 'trend_analysis' | 'recommendation';
   priority: 'low' | 'medium' | 'high' | 'critical';
   title: string;
   description: string;
   recommendation: string;
   confidence: number; // 0-100
   basedOn: string[];
   generatedAt: string;
   reviewed: boolean;
   reviewedBy?: string;
}

export interface PatientDetailData {
   personalInfo: {
      id: string;
      name: string;
      dateOfBirth: string;
      age: number;
      gender: 'male' | 'female';
      bloodType: string;
      mrn: string; // Medical Record Number
      ssn: string;
      address: string;
      phone: string;
      email: string;
      emergencyContact: {
         name: string;
         relation: string;
         phone: string;
      };
      insurance: {
         provider: string;
         policyNumber: string;
         groupNumber: string;
      };
   };
   medicalHistory: MedicalHistory[];
   currentMedications: Medication[];
   allergies: {
      allergen: string;
      reaction: string;
      severity: 'mild' | 'moderate' | 'severe';
      onsetDate?: string;
   }[];
   labResults: LabResult[];
   vitalSigns: VitalSignsRecord[];
   dialysisSessions: DialysisSession[];
   clinicalNotes: ClinicalNote[];
   aiInsights: AIInsight[];
}

// Detailed mock data for María González (ID: '1')
export const mockPatientDetail: PatientDetailData = {
   personalInfo: {
      id: '1',
      name: 'María González',
      dateOfBirth: '1956-03-15',
      age: 68,
      gender: 'female',
      bloodType: 'A+',
      mrn: 'MRN-2024-001',
      ssn: '***-**-4567',
      address: 'Calle Mayor 45, 3º B, 28013 Madrid, España',
      phone: '+34 612 345 678',
      email: 'maria.gonzalez@email.com',
      emergencyContact: {
         name: 'Carlos González',
         relation: 'Hijo',
         phone: '+34 612 345 679'
      },
      insurance: {
         provider: 'Seguridad Social Española',
         policyNumber: 'SS-2024-789456',
         groupNumber: 'GRP-MADRID-001'
      }
   },
   medicalHistory: [
      {
         id: 'mh1',
         condition: 'Enfermedad Renal Crónica Estadio 5',
         diagnosisDate: '2019-08-15',
         icd10Code: 'N18.6',
         status: 'chronic',
         severity: 'severe',
         notes: 'Nefropatía diabética con deterioro progresivo de la función renal. Iniciada hemodiálisis en octubre 2019.'
      },
      {
         id: 'mh2',
         condition: 'Diabetes Mellitus Tipo 2',
         diagnosisDate: '2008-02-20',
         icd10Code: 'E11.9',
         status: 'chronic',
         severity: 'moderate',
         notes: 'Diabetes mellitus tipo 2 con complicaciones microvasculares. Control glucémico subóptimo inicial, mejorado con tratamiento intensivo.'
      },
      {
         id: 'mh3',
         condition: 'Hipertensión Arterial',
         diagnosisDate: '2005-11-10',
         icd10Code: 'I10',
         status: 'chronic',
         severity: 'moderate',
         notes: 'Hipertensión arterial esencial. Bien controlada con tratamiento farmacológico combinado.'
      },
      {
         id: 'mh4',
         condition: 'Anemia de Enfermedad Crónica',
         diagnosisDate: '2020-01-12',
         icd10Code: 'D63.1',
         status: 'active',
         severity: 'moderate',
         notes: 'Anemia secundaria a insuficiencia renal crónica. Tratamiento con agentes estimulantes de eritropoyesis.'
      }
   ],
   currentMedications: [
      {
         id: 'med1',
         name: 'Epoetin Alfa',
         genericName: 'Eritropoyetina recombinante',
         dosage: '3000 UI',
         frequency: '3 veces por semana',
         route: 'Subcutánea',
         startDate: '2020-02-01',
         prescribedBy: 'Dr. Carlos Ruiz',
         indication: 'Anemia asociada a insuficiencia renal crónica',
         sideEffects: ['Hipertensión', 'Cefalea', 'Reacciones en sitio de inyección'],
         status: 'active'
      },
      {
         id: 'med2',
         name: 'Amlodipino',
         genericName: 'Amlodipino besilato',
         dosage: '10 mg',
         frequency: '1 vez al día',
         route: 'Oral',
         startDate: '2019-05-15',
         prescribedBy: 'Dr. Carlos Ruiz',
         indication: 'Hipertensión arterial',
         status: 'active'
      },
      {
         id: 'med3',
         name: 'Sevelamer',
         genericName: 'Sevelamer carbonate',
         dosage: '800 mg',
         frequency: '3 veces al día con comidas',
         route: 'Oral',
         startDate: '2020-03-10',
         prescribedBy: 'Dr. Carlos Ruiz',
         indication: 'Hiperfosfatemia en pacientes en diálisis',
         status: 'active'
      },
      {
         id: 'med4',
         name: 'Calcitriol',
         genericName: '1,25-dihidroxivitamina D3',
         dosage: '0.25 mcg',
         frequency: '1 vez al día',
         route: 'Oral',
         startDate: '2020-04-05',
         prescribedBy: 'Dr. Carlos Ruiz',
         indication: 'Hiperparatiroidismo secundario',
         status: 'active'
      },
      {
         id: 'med5',
         name: 'Furosemida',
         genericName: 'Furosemida',
         dosage: '40 mg',
         frequency: '1 vez al día',
         route: 'Oral',
         startDate: '2019-09-20',
         prescribedBy: 'Dr. Carlos Ruiz',
         indication: 'Edema y sobrecarga de volumen',
         status: 'active'
      }
   ],
   allergies: [
      {
         allergen: 'Penicilina',
         reaction: 'Erupción cutánea, urticaria',
         severity: 'moderate',
         onsetDate: '1985-07-12'
      },
      {
         allergen: 'Contraste yodado',
         reaction: 'Broncoespasmo leve',
         severity: 'mild',
         onsetDate: '2015-03-08'
      }
   ],
   labResults: [
      {
         id: 'lab1',
         testName: 'Creatinina sérica',
         value: 8.2,
         unit: 'mg/dL',
         referenceRange: '0.6-1.2',
         status: 'critical',
         date: '2024-01-13',
         orderedBy: 'Dr. Carlos Ruiz',
         notes: 'Elevación significativa, indicativa de disfunción renal severa'
      },
      {
         id: 'lab2',
         testName: 'Urea',
         value: 145,
         unit: 'mg/dL',
         referenceRange: '10-50',
         status: 'critical',
         date: '2024-01-13',
         orderedBy: 'Dr. Carlos Ruiz'
      },
      {
         id: 'lab3',
         testName: 'Hemoglobina',
         value: 10.2,
         unit: 'g/dL',
         referenceRange: '12.0-15.5',
         status: 'abnormal',
         date: '2024-01-13',
         orderedBy: 'Dr. Carlos Ruiz',
         notes: 'Anemia leve, mejoría respecto a valores previos'
      },
      {
         id: 'lab4',
         testName: 'Fósforo',
         value: 6.8,
         unit: 'mg/dL',
         referenceRange: '2.5-4.5',
         status: 'abnormal',
         date: '2024-01-13',
         orderedBy: 'Dr. Carlos Ruiz'
      },
      {
         id: 'lab5',
         testName: 'Calcio',
         value: 8.9,
         unit: 'mg/dL',
         referenceRange: '8.5-10.5',
         status: 'normal',
         date: '2024-01-13',
         orderedBy: 'Dr. Carlos Ruiz'
      },
      {
         id: 'lab6',
         testName: 'PTH intacta',
         value: 285,
         unit: 'pg/mL',
         referenceRange: '15-65',
         status: 'critical',
         date: '2024-01-13',
         orderedBy: 'Dr. Carlos Ruiz',
         notes: 'Hiperparatiroidismo secundario severo'
      },
      {
         id: 'lab7',
         testName: 'Kt/V',
         value: 1.4,
         unit: '',
         referenceRange: '>1.2',
         status: 'normal',
         date: '2024-01-13',
         orderedBy: 'Dr. Carlos Ruiz',
         notes: 'Adecuación de diálisis satisfactoria'
      }
   ],
   vitalSigns: [
      {
         id: 'vs1',
         date: '2024-01-13',
         time: '08:00',
         systolicBP: 140,
         diastolicBP: 85,
         heartRate: 72,
         respiratoryRate: 18,
         temperature: 36.7,
         oxygenSaturation: 98,
         weight: 68.5,
         height: 162,
         bmi: 26.1,
         painScale: 2,
         recordedBy: 'Enfermera María Torres'
      },
      {
         id: 'vs2',
         date: '2024-01-11',
         time: '08:15',
         systolicBP: 135,
         diastolicBP: 82,
         heartRate: 75,
         respiratoryRate: 16,
         temperature: 36.5,
         oxygenSaturation: 97,
         weight: 69.2,
         recordedBy: 'Enfermera María Torres'
      }
   ],
   dialysisSessions: [
      {
         id: 'ds1',
         date: '2024-01-13',
         startTime: '08:00',
         endTime: '12:00',
         duration: 240,
         dialyzer: 'Fresenius FX80',
         bloodFlow: 350,
         dialysateFlow: 500,
         ultraFiltrationGoal: 2100,
         ultraFiltrationAchieved: 2050,
         preWeight: 70.6,
         postWeight: 68.5,
         weightLoss: 2.1,
         accessType: 'Fístula arteriovenosa',
         accessSite: 'Brazo izquierdo - radiocefálica',
         ktV: 1.4,
         urr: 68,
         conductedBy: 'Téc. Pedro Morales',
         notes: 'Sesión sin complicaciones. Paciente toleró bien el procedimiento. Presión arterial estable durante toda la sesión.'
      },
      {
         id: 'ds2',
         date: '2024-01-11',
         startTime: '08:00',
         endTime: '12:00',
         duration: 240,
         dialyzer: 'Fresenius FX80',
         bloodFlow: 350,
         dialysateFlow: 500,
         ultraFiltrationGoal: 1800,
         ultraFiltrationAchieved: 1750,
         preWeight: 71.0,
         postWeight: 69.2,
         weightLoss: 1.8,
         accessType: 'Fístula arteriovenosa',
         accessSite: 'Brazo izquierdo - radiocefálica',
         ktV: 1.3,
         urr: 65,
         conductedBy: 'Téc. Pedro Morales',
         notes: 'Sesión completada exitosamente. Leve hipotensión en la última hora, corregida con reducción de UF.'
      }
   ],
   clinicalNotes: [
      {
         id: 'cn1',
         date: '2024-01-13',
         time: '14:30',
         type: 'progress',
         author: 'Dr. Carlos Ruiz',
         specialty: 'Nefrología',
         assessment: 'Paciente de 68 años con ERC estadio 5 en programa de hemodiálisis crónica. Evolución clínica estable. Última sesión de diálisis sin incidencias. Control analítico muestra adecuación dialítica satisfactoria (Kt/V 1.4). Persiste hiperparatiroidismo secundario severo (PTH 285 pg/mL) a pesar de tratamiento con calcitriol. Anemia en mejoría con EPO.',
         plan: '1. Continuar hemodiálisis 3x/semana con parámetros actuales\n2. Aumentar dosis de calcitriol a 0.5 mcg/día\n3. Considerar cinacalcet si PTH no mejora\n4. Mantener EPO 3000 UI 3x/semana\n5. Control analítico en 4 semanas\n6. Valoración por endocrinología para manejo de diabetes',
         followUp: 'Próxima consulta en 4 semanas. Control analítico previo.',
         signedBy: 'Dr. Carlos Ruiz',
         signedDate: '2024-01-13T14:45:00'
      },
      {
         id: 'cn2',
         date: '2024-01-10',
         time: '09:15',
         type: 'consultation',
         author: 'Dr. Carlos Ruiz',
         specialty: 'Nefrología',
         chiefComplaint: 'Control rutinario de hemodiálisis',
         historyOfPresentIllness: 'Paciente acude para control rutinario. Refiere sentirse bien en general. Niega disnea, edemas o dolor torácico. Cumple adecuadamente con restricciones dietéticas. Adherencia al tratamiento farmacológico correcta.',
         assessment: 'ERC estadio 5 en hemodiálisis. Estado general estable. Sin signos de sobrecarga de volumen. Acceso vascular funcionante sin signos de infección o estenosis.',
         plan: '1. Continuar programa actual de hemodiálisis\n2. Mantener medicación actual\n3. Refuerzo de educación nutricional\n4. Control analítico en 2 semanas',
         followUp: 'Próxima sesión de diálisis programada. Control médico en 4 semanas.',
         signedBy: 'Dr. Carlos Ruiz',
         signedDate: '2024-01-10T09:30:00'
      }
   ],
   aiInsights: [
      {
         id: 'ai1',
         category: 'risk_assessment',
         priority: 'high',
         title: 'Riesgo Elevado de Enfermedad Ósea Mineral',
         description: 'Los niveles de PTH (285 pg/mL) están significativamente elevados, indicando hiperparatiroidismo secundario severo que puede conducir a osteodistrofia renal.',
         recommendation: 'Considerar intensificar tratamiento con análogos de vitamina D o iniciar cinacalcet. Evaluación por especialista en metabolismo óseo.',
         confidence: 92,
         basedOn: ['PTH intacta: 285 pg/mL', 'Fósforo elevado: 6.8 mg/dL', 'Historial de ERC estadio 5'],
         generatedAt: '2024-01-13T15:00:00',
         reviewed: false
      },
      {
         id: 'ai2',
         category: 'treatment_optimization',
         priority: 'medium',
         title: 'Optimización de Adecuación Dialítica',
         description: 'Aunque el Kt/V actual (1.4) está dentro del rango aceptable, existe potencial para mejora que podría beneficiar el control de toxinas urémicas.',
         recommendation: 'Considerar aumento de tiempo de diálisis a 4.5 horas o incremento de flujo sanguíneo a 400 mL/min para mejorar clearance.',
         confidence: 78,
         basedOn: ['Kt/V: 1.4', 'URR: 68%', 'Creatinina: 8.2 mg/dL', 'Urea: 145 mg/dL'],
         generatedAt: '2024-01-13T15:05:00',
         reviewed: false
      },
      {
         id: 'ai3',
         category: 'trend_analysis',
         priority: 'low',
         title: 'Tendencia Positiva en Control de Anemia',
         description: 'Los niveles de hemoglobina muestran tendencia ascendente (10.2 g/dL vs 9.8 g/dL hace 4 semanas), indicando respuesta favorable al tratamiento con EPO.',
         recommendation: 'Mantener dosis actual de eritropoyetina. Monitorizar niveles de hierro y ferritina para optimizar respuesta.',
         confidence: 85,
         basedOn: ['Hemoglobina actual: 10.2 g/dL', 'Hemoglobina previa: 9.8 g/dL', 'Tratamiento con EPO 3000 UI'],
         generatedAt: '2024-01-13T15:10:00',
         reviewed: true,
         reviewedBy: 'Dr. Carlos Ruiz'
      },
      {
         id: 'ai4',
         category: 'medication_alert',
         priority: 'medium',
         title: 'Interacción Potencial: Sevelamer y Medicamentos Orales',
         description: 'El sevelamer puede reducir la absorción de otros medicamentos orales si se administran simultáneamente.',
         recommendation: 'Verificar que otros medicamentos orales se administren al menos 1 hora antes o 3 horas después del sevelamer.',
         confidence: 90,
         basedOn: ['Sevelamer 800 mg 3x/día', 'Amlodipino oral', 'Calcitriol oral', 'Furosemida oral'],
         generatedAt: '2024-01-13T15:15:00',
         reviewed: false
      },
      {
         id: 'ai5',
         category: 'recommendation',
         priority: 'medium',
         title: 'Evaluación Cardiovascular Recomendada',
         description: 'Paciente con múltiples factores de riesgo cardiovascular (DM, HTA, ERC) sin evaluación cardiológica reciente documentada.',
         recommendation: 'Considerar ecocardiograma y evaluación por cardiología dado el alto riesgo cardiovascular en pacientes en diálisis.',
         confidence: 82,
         basedOn: ['Diabetes Mellitus tipo 2', 'Hipertensión arterial', 'ERC estadio 5', 'Edad: 68 años'],
         generatedAt: '2024-01-13T15:20:00',
         reviewed: false
      }
   ]
};

// Utility function to get patient detail by ID
export const getPatientDetail = (patientId: string): PatientDetailData | null => {
   // For demo purposes, we'll return María González's data for any ID
   // In a real application, this would fetch specific patient data
   if (patientId === '1' || patientId) {
      return mockPatientDetail;
   }
   return null;
};
