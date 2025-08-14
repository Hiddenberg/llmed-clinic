export interface ResearchPatientDemographics {
   ageGroup: string;
   count: number;
   percentage: number;
   averageDialysisYears: number;
   comorbidityRate: number;
}

export interface TreatmentCorrelation {
   parameter1: string;
   parameter2: string;
   correlationCoefficient: number;
   pValue: number;
   significance: 'high' | 'medium' | 'low' | 'not_significant';
   sampleSize: number;
}

export interface SurvivalData {
   timePoint: string; // months
   survivalRate: number;
   confidenceInterval: [number, number];
   atRisk: number;
}

export interface TreatmentEffectivenessData {
   treatment: string;
   effectivenessScore: number;
   patientCount: number;
   averageKtV: number;
   averageURR: number;
   complicationRate: number;
   hospitalizations: number;
}

export interface ComorbiditiesData {
   condition: string;
   prevalence: number;
   impact: 'high' | 'medium' | 'low';
   averageAge: number;
   treatmentComplications: number;
}

export interface LabParameterTrend {
   parameter: string;
   unit: string;
   normalRange: string;
   averageValue: number;
   trend: 'improving' | 'stable' | 'declining';
   monthlyData: {
      month: string;
      value: number;
      patientCount: number;
   }[];
}

export interface AIResearchInsight {
   id: string;
   category: 'predictive_modeling' | 'treatment_optimization' | 'risk_stratification' | 'outcome_prediction' | 'population_health';
   priority: 'critical' | 'high' | 'medium' | 'low';
   title: string;
   description: string;
   clinicalImplication: string;
   recommendedAction: string;
   evidenceLevel: 'A' | 'B' | 'C' | 'D';
   confidence: number; // 0-100
   dataPoints: number;
   generatedDate: string;
}

export interface ResearchMetrics {
   totalPatients: number;
   studyDuration: string;
   averageFollowUp: string;
   dataCompleteness: number;
   publicationsGenerated: number;
   ongoingStudies: number;
}

// Mock data for patient demographics in research context
export const mockResearchPatientDemographics: ResearchPatientDemographics[] = [
   {
      ageGroup: '18-30',
      count: 12,
      percentage: 4.2,
      averageDialysisYears: 2.1,
      comorbidityRate: 15.8
   },
   {
      ageGroup: '31-45',
      count: 45,
      percentage: 15.8,
      averageDialysisYears: 3.7,
      comorbidityRate: 28.9
   },
   {
      ageGroup: '46-60',
      count: 89,
      percentage: 31.2,
      averageDialysisYears: 5.2,
      comorbidityRate: 47.2
   },
   {
      ageGroup: '61-75',
      count: 98,
      percentage: 34.4,
      averageDialysisYears: 4.8,
      comorbidityRate: 68.4
   },
   {
      ageGroup: '76+',
      count: 41,
      percentage: 14.4,
      averageDialysisYears: 3.1,
      comorbidityRate: 85.4
   }
];

// Treatment correlations for research
export const mockTreatmentCorrelations: TreatmentCorrelation[] = [
   {
      parameter1: 'Kt/V',
      parameter2: 'Supervivencia a 5 años',
      correlationCoefficient: 0.78,
      pValue: 0.001,
      significance: 'high',
      sampleSize: 285
   },
   {
      parameter1: 'Ganancia de peso interdialítica',
      parameter2: 'Hospitalizaciones',
      correlationCoefficient: 0.65,
      pValue: 0.003,
      significance: 'high',
      sampleSize: 285
   },
   {
      parameter1: 'Hemoglobina',
      parameter2: 'Calidad de vida',
      correlationCoefficient: 0.72,
      pValue: 0.001,
      significance: 'high',
      sampleSize: 285
   },
   {
      parameter1: 'Fósforo sérico',
      parameter2: 'Eventos cardiovasculares',
      correlationCoefficient: 0.58,
      pValue: 0.008,
      significance: 'medium',
      sampleSize: 285
   },
   {
      parameter1: 'Adherencia al tratamiento',
      parameter2: 'Resultados clínicos',
      correlationCoefficient: 0.81,
      pValue: 0.001,
      significance: 'high',
      sampleSize: 285
   },
   {
      parameter1: 'Edad al inicio',
      parameter2: 'Complicaciones vasculares',
      correlationCoefficient: 0.43,
      pValue: 0.025,
      significance: 'medium',
      sampleSize: 285
   }
];

// Survival analysis data
export const mockSurvivalData: SurvivalData[] = [
   { timePoint: '0', survivalRate: 100, confidenceInterval: [100, 100], atRisk: 285 },
   { timePoint: '6', survivalRate: 96.8, confidenceInterval: [94.2, 99.4], atRisk: 276 },
   { timePoint: '12', survivalRate: 92.3, confidenceInterval: [88.9, 95.7], atRisk: 263 },
   { timePoint: '18', survivalRate: 87.9, confidenceInterval: [83.8, 92.0], atRisk: 251 },
   { timePoint: '24', survivalRate: 83.2, confidenceInterval: [78.5, 87.9], atRisk: 237 },
   { timePoint: '30', survivalRate: 78.1, confidenceInterval: [72.8, 83.4], atRisk: 223 },
   { timePoint: '36', survivalRate: 72.8, confidenceInterval: [67.0, 78.6], atRisk: 208 },
   { timePoint: '42', survivalRate: 67.3, confidenceInterval: [61.0, 73.6], atRisk: 192 },
   { timePoint: '48', survivalRate: 61.5, confidenceInterval: [54.8, 68.2], atRisk: 175 },
   { timePoint: '54', survivalRate: 55.4, confidenceInterval: [48.2, 62.6], atRisk: 158 },
   { timePoint: '60', survivalRate: 49.1, confidenceInterval: [41.5, 56.7], atRisk: 140 }
];

// Treatment effectiveness data
export const mockTreatmentEffectivenessData: TreatmentEffectivenessData[] = [
   {
      treatment: 'Hemodiálisis de Alto Flujo',
      effectivenessScore: 8.7,
      patientCount: 156,
      averageKtV: 1.65,
      averageURR: 72.3,
      complicationRate: 12.8,
      hospitalizations: 1.2
   },
   {
      treatment: 'Hemodiálisis Convencional',
      effectivenessScore: 7.2,
      patientCount: 89,
      averageKtV: 1.42,
      averageURR: 68.1,
      complicationRate: 18.4,
      hospitalizations: 1.8
   },
   {
      treatment: 'Hemodiafiltración Online',
      effectivenessScore: 9.1,
      patientCount: 40,
      averageKtV: 1.72,
      averageURR: 75.6,
      complicationRate: 8.2,
      hospitalizations: 0.9
   }
];

// Comorbidities data
export const mockComorbiditiesData: ComorbiditiesData[] = [
   {
      condition: 'Diabetes Mellitus',
      prevalence: 68.4,
      impact: 'high',
      averageAge: 64.2,
      treatmentComplications: 24.7
   },
   {
      condition: 'Hipertensión Arterial',
      prevalence: 89.1,
      impact: 'high',
      averageAge: 61.8,
      treatmentComplications: 18.3
   },
   {
      condition: 'Enfermedad Cardiovascular',
      prevalence: 45.3,
      impact: 'high',
      averageAge: 67.5,
      treatmentComplications: 31.2
   },
   {
      condition: 'Anemia',
      prevalence: 76.8,
      impact: 'medium',
      averageAge: 63.1,
      treatmentComplications: 15.6
   },
   {
      condition: 'Osteodistrofia Renal',
      prevalence: 52.6,
      impact: 'medium',
      averageAge: 65.9,
      treatmentComplications: 12.4
   },
   {
      condition: 'Hepatitis C',
      prevalence: 8.7,
      impact: 'medium',
      averageAge: 58.3,
      treatmentComplications: 22.1
   }
];

// Lab parameter trends
export const mockLabParameterTrends: LabParameterTrend[] = [
   {
      parameter: 'Hemoglobina',
      unit: 'g/dL',
      normalRange: '11.0-12.0',
      averageValue: 10.8,
      trend: 'improving',
      monthlyData: [
         { month: 'Ene', value: 10.2, patientCount: 285 },
         { month: 'Feb', value: 10.4, patientCount: 283 },
         { month: 'Mar', value: 10.6, patientCount: 281 },
         { month: 'Abr', value: 10.7, patientCount: 279 },
         { month: 'May', value: 10.8, patientCount: 277 },
         { month: 'Jun', value: 10.9, patientCount: 275 }
      ]
   },
   {
      parameter: 'Fósforo',
      unit: 'mg/dL',
      normalRange: '3.5-5.5',
      averageValue: 5.8,
      trend: 'stable',
      monthlyData: [
         { month: 'Ene', value: 5.9, patientCount: 285 },
         { month: 'Feb', value: 5.8, patientCount: 283 },
         { month: 'Mar', value: 5.7, patientCount: 281 },
         { month: 'Abr', value: 5.8, patientCount: 279 },
         { month: 'May', value: 5.9, patientCount: 277 },
         { month: 'Jun', value: 5.8, patientCount: 275 }
      ]
   },
   {
      parameter: 'Kt/V',
      unit: 'ratio',
      normalRange: '>1.4',
      averageValue: 1.58,
      trend: 'improving',
      monthlyData: [
         { month: 'Ene', value: 1.52, patientCount: 285 },
         { month: 'Feb', value: 1.54, patientCount: 283 },
         { month: 'Mar', value: 1.56, patientCount: 281 },
         { month: 'Abr', value: 1.57, patientCount: 279 },
         { month: 'May', value: 1.58, patientCount: 277 },
         { month: 'Jun', value: 1.59, patientCount: 275 }
      ]
   }
];

// AI Research Insights
export const mockAIResearchInsights: AIResearchInsight[] = [
   {
      id: '1',
      category: 'predictive_modeling',
      priority: 'critical',
      title: 'Modelo predictivo de mortalidad cardiovascular',
      description: 'Algoritmo de machine learning identifica pacientes con alto riesgo de eventos cardiovasculares en los próximos 12 meses.',
      clinicalImplication: 'Permite intervención temprana y personalización del tratamiento para reducir mortalidad cardiovascular en 34%.',
      recommendedAction: 'Implementar screening intensivo para pacientes identificados como alto riesgo y optimizar control de fósforo y calcio.',
      evidenceLevel: 'A',
      confidence: 89,
      dataPoints: 1247,
      generatedDate: '2024-01-15'
   },
   {
      id: '2',
      category: 'treatment_optimization',
      priority: 'high',
      title: 'Optimización personalizada de Kt/V objetivo',
      description: 'Análisis de datos sugiere que el Kt/V objetivo debe individualizarse basado en edad, comorbilidades y acceso vascular.',
      clinicalImplication: 'Personalización del Kt/V podría mejorar supervivencia en 18% y reducir hospitalizaciones en 25%.',
      recommendedAction: 'Ajustar protocolos de diálisis para objetivos personalizados de Kt/V basados en perfil de riesgo individual.',
      evidenceLevel: 'B',
      confidence: 82,
      dataPoints: 856,
      generatedDate: '2024-01-14'
   },
   {
      id: '3',
      category: 'risk_stratification',
      priority: 'high',
      title: 'Estratificación de riesgo de infección de acceso vascular',
      description: 'Identificación de factores de riesgo para infección de catéter y fístula arteriovenosa usando análisis multivariado.',
      clinicalImplication: 'Reducción potencial del 42% en infecciones de acceso vascular mediante intervenciones dirigidas.',
      recommendedAction: 'Implementar protocolo de prevención intensificado para pacientes de alto riesgo identificados por el modelo.',
      evidenceLevel: 'A',
      confidence: 91,
      dataPoints: 623,
      generatedDate: '2024-01-13'
   },
   {
      id: '4',
      category: 'outcome_prediction',
      priority: 'medium',
      title: 'Predicción de respuesta a tratamiento de anemia',
      description: 'Modelo predice respuesta a eritropoyetina basado en parámetros basales y genéticos.',
      clinicalImplication: 'Optimización de dosis de eritropoyetina podría reducir costos en 28% y mejorar control de anemia.',
      recommendedAction: 'Considerar implementación de dosificación personalizada de eritropoyetina basada en predicciones del modelo.',
      evidenceLevel: 'B',
      confidence: 76,
      dataPoints: 445,
      generatedDate: '2024-01-12'
   },
   {
      id: '5',
      category: 'population_health',
      priority: 'medium',
      title: 'Análisis de tendencias epidemiológicas regionales',
      description: 'Identificación de patrones emergentes en causas de enfermedad renal crónica en la población local.',
      clinicalImplication: 'Datos sugieren aumento del 15% en nefropatía diabética en menores de 50 años en los últimos 3 años.',
      recommendedAction: 'Desarrollar programas de prevención primaria dirigidos a población joven con diabetes.',
      evidenceLevel: 'C',
      confidence: 68,
      dataPoints: 1156,
      generatedDate: '2024-01-11'
   }
];

// Research metrics
export const mockResearchMetrics: ResearchMetrics = {
   totalPatients: 285,
   studyDuration: '5.2 años',
   averageFollowUp: '3.8 años',
   dataCompleteness: 94.7,
   publicationsGenerated: 12,
   ongoingStudies: 4
};
