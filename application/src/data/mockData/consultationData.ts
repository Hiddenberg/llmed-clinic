export interface ConsultationStage {
   id: string;
   name: string;
   description: string;
   status: 'pending' | 'active' | 'completed';
   estimatedDuration: number; // in minutes
   tasks: ConsultationTask[];
}

export interface ConsultationTask {
   id: string;
   title: string;
   description: string;
   completed: boolean;
   priority: 'low' | 'medium' | 'high';
}

export interface AIConsultationSuggestion {
   id: string;
   type: 'medication_alert' | 'vital_concern' | 'question_suggestion' | 'treatment_recommendation' | 'risk_warning';
   title: string;
   description: string;
   priority: 'low' | 'medium' | 'high' | 'critical';
   category: 'safety' | 'optimization' | 'monitoring' | 'education';
   relatedData?: {
      medication?: string;
      vitalSign?: string;
      labValue?: string;
   };
}

export interface ConsultationNote {
   id: string;
   timestamp: string;
   content: string;
   type: 'observation' | 'plan' | 'medication' | 'instruction';
   tags: string[];
}

export interface Consultation {
   id: string;
   patientId: string;
   patientName: string;
   patientAge: number;
   consultationType: 'in-person' | 'video';
   status: 'scheduled' | 'preparing' | 'active' | 'completed' | 'cancelled';
   startTime: string;
   endTime?: string;
   estimatedDuration: number;
   actualDuration?: number;
   stages: ConsultationStage[];
   notes: ConsultationNote[];
   aiSuggestions: AIConsultationSuggestion[];
   vitals?: {
      bloodPressure: string;
      heartRate: number;
      weight: number;
      temperature: number;
   };
   medications: {
      current: string[];
      prescribed: string[];
      discontinued: string[];
   };
   diagnosis: string[];
   followUpRequired: boolean;
   nextAppointment?: string;
}

export interface PatientQuickInfo {
   id: string;
   name: string;
   age: number;
   bloodType: string;
   allergies: string[];
   chronicConditions: string[];
   currentMedications: string[];
   lastSession: string;
   riskLevel: 'low' | 'medium' | 'high';
   recentVitals: {
      bloodPressure: string;
      heartRate: number;
      weight: number;
   };
   recentLabs: {
      creatinine: number;
      hemoglobin: number;
      potassium: number;
      phosphorus: number;
   };
   treatmentPlan: string;
   adherence: number;
   alerts: string[];
}

// Mock consultation stages
export const mockConsultationStages: ConsultationStage[] = [
   {
      id: 'preparation',
      name: 'Preparación',
      description: 'Revisión del historial y preparación para la consulta',
      status: 'completed',
      estimatedDuration: 5,
      tasks: [
         {
            id: 'review-history',
            title: 'Revisar historial médico',
            description: 'Revisar sesiones anteriores y evolución del paciente',
            completed: true,
            priority: 'high'
         },
         {
            id: 'check-labs',
            title: 'Verificar laboratorios recientes',
            description: 'Revisar resultados de laboratorio más recientes',
            completed: true,
            priority: 'medium'
         }
      ]
   },
   {
      id: 'assessment',
      name: 'Evaluación',
      description: 'Evaluación física y revisión de síntomas',
      status: 'active',
      estimatedDuration: 15,
      tasks: [
         {
            id: 'vital-signs',
            title: 'Tomar signos vitales',
            description: 'Registrar presión arterial, frecuencia cardíaca, peso',
            completed: false,
            priority: 'high'
         },
         {
            id: 'symptom-review',
            title: 'Revisión de síntomas',
            description: 'Evaluar síntomas actuales y cambios desde la última sesión',
            completed: false,
            priority: 'high'
         }
      ]
   },
   {
      id: 'treatment',
      name: 'Tratamiento',
      description: 'Ajustes de tratamiento y prescripciones',
      status: 'pending',
      estimatedDuration: 10,
      tasks: [
         {
            id: 'medication-review',
            title: 'Revisar medicamentos',
            description: 'Evaluar medicación actual y realizar ajustes necesarios',
            completed: false,
            priority: 'high'
         },
         {
            id: 'treatment-plan',
            title: 'Actualizar plan de tratamiento',
            description: 'Modificar plan según evolución del paciente',
            completed: false,
            priority: 'medium'
         }
      ]
   },
   {
      id: 'education',
      name: 'Educación',
      description: 'Educación al paciente e instrucciones',
      status: 'pending',
      estimatedDuration: 10,
      tasks: [
         {
            id: 'patient-education',
            title: 'Educar al paciente',
            description: 'Explicar cambios en el tratamiento y cuidados',
            completed: false,
            priority: 'medium'
         },
         {
            id: 'next-steps',
            title: 'Definir próximos pasos',
            description: 'Programar seguimiento y próximas citas',
            completed: false,
            priority: 'medium'
         }
      ]
   }
];

// Mock AI suggestions
export const mockAISuggestions: AIConsultationSuggestion[] = [
   {
      id: 'med-alert-1',
      type: 'medication_alert',
      title: 'Interacción medicamentosa detectada',
      description: 'El paciente toma Warfarina y se prescribió Aspirina. Riesgo de sangrado aumentado.',
      priority: 'critical',
      category: 'safety',
      relatedData: {
         medication: 'Warfarina + Aspirina'
      }
   },
   {
      id: 'vital-concern-1',
      type: 'vital_concern',
      title: 'Presión arterial elevada',
      description: 'PA actual 160/95 mmHg, superior a valores previos. Considerar ajuste de antihipertensivos.',
      priority: 'high',
      category: 'monitoring',
      relatedData: {
         vitalSign: 'Presión arterial'
      }
   },
   {
      id: 'question-1',
      type: 'question_suggestion',
      title: 'Preguntas sugeridas',
      description: '¿Ha tenido episodios de mareo o fatiga? ¿Ha seguido la dieta baja en fósforo?',
      priority: 'medium',
      category: 'optimization'
   },
   {
      id: 'treatment-rec-1',
      type: 'treatment_recommendation',
      title: 'Optimización de diálisis',
      description: 'Considerar aumentar tiempo de sesión a 4 horas basado en Kt/V actual de 1.1',
      priority: 'medium',
      category: 'optimization'
   }
];

// Mock patient quick info
export const mockPatientQuickInfo: PatientQuickInfo = {
   id: '1',
   name: 'María González',
   age: 68,
   bloodType: 'A+',
   allergies: ['Penicilina', 'Mariscos'],
   chronicConditions: ['Insuficiencia Renal Crónica', 'Hipertensión', 'Diabetes Tipo 2'],
   currentMedications: ['Losartán 50mg', 'Metformina 850mg', 'Eritropoyetina', 'Calcio'],
   lastSession: '2024-01-13T08:00:00',
   riskLevel: 'medium',
   recentVitals: {
      bloodPressure: '150/90',
      heartRate: 78,
      weight: 68.5
   },
   recentLabs: {
      creatinine: 8.2,
      hemoglobin: 10.8,
      potassium: 4.8,
      phosphorus: 5.2
   },
   treatmentPlan: 'Hemodiálisis 3x/semana, 3.5 horas por sesión',
   adherence: 85,
   alerts: ['Fósforo elevado', 'Adherencia a medicamentos irregular']
};

// Mock active consultation
export const mockActiveConsultation: Consultation = {
   id: 'cons-001',
   patientId: '1',
   patientName: 'María González',
   patientAge: 68,
   consultationType: 'in-person',
   status: 'active',
   startTime: '2024-01-15T09:00:00',
   estimatedDuration: 30,
   stages: mockConsultationStages,
   notes: [
      {
         id: 'note-1',
         timestamp: '2024-01-15T09:05:00',
         content: 'Paciente refiere sentirse mejor desde el último ajuste de medicación',
         type: 'observation',
         tags: ['bienestar', 'medicación']
      }
   ],
   aiSuggestions: mockAISuggestions,
   vitals: {
      bloodPressure: '150/90',
      heartRate: 78,
      weight: 68.5,
      temperature: 36.5
   },
   medications: {
      current: ['Losartán 50mg', 'Metformina 850mg', 'Eritropoyetina'],
      prescribed: [],
      discontinued: []
   },
   diagnosis: ['Insuficiencia Renal Crónica Estadio 5'],
   followUpRequired: true,
   nextAppointment: '2024-01-22T09:00:00'
};
