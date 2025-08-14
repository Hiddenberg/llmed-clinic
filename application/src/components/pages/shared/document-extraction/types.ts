export interface DocumentInfo {
   fileName: string;
   documentType: 'clinical_record' | 'lab_results' | 'prescription' | 'imaging_report' | 'other';
   extractionDate: string;
   confidence: number; // 0-1 scale
   pagesProcessed: number;
}

export interface ExtractedPersonalInfo {
   fullName: string;
   dateOfBirth: string;
   gender: 'male' | 'female' | 'other';
   phone: string;
   email: string;
   address: string;
   mrn: string;
   bloodType: string;
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
}

export interface ExtractedMedicalHistory {
   condition: string;
   diagnosisDate: string;
   icd10Code: string;
   status: 'active' | 'resolved' | 'chronic' | 'stable';
   severity: 'mild' | 'moderate' | 'severe';
   notes: string;
}

export interface ExtractedMedication {
   name: string;
   dosage: string;
   frequency: string;
   route: string;
   indication: string;
   prescribedBy: string;
   status: 'active' | 'discontinued' | 'suspended';
}

export interface ExtractedLabResult {
   testName: string;
   value: string;
   unit: string;
   referenceRange: string;
   status: 'normal' | 'abnormal' | 'critical';
   date: string;
   notes?: string;
}

export interface ExtractedVitalSigns {
   date: string;
   systolicBP: number;
   diastolicBP: number;
   heartRate: number;
   respiratoryRate: number;
   temperature: number;
   weight: number;
   height: number;
   oxygenSaturation: number;
}

export interface ExtractedAllergy {
   allergen: string;
   reaction: string;
   severity: 'mild' | 'moderate' | 'severe';
   onsetDate: string;
}

export interface ExtractedClinicalNote {
   date: string;
   type: 'consultation' | 'progress' | 'assessment' | 'procedure';
   author: string;
   specialty: string;
   chiefComplaint: string;
   assessment: string;
   plan: string;
   followUp?: string;
}

export interface ExtractedPatientData {
   documentInfo: DocumentInfo;
   personalInfo: ExtractedPersonalInfo;
   medicalHistory: ExtractedMedicalHistory[];
   medications: ExtractedMedication[];
   labResults: ExtractedLabResult[];
   vitalSigns: ExtractedVitalSigns;
   allergies: ExtractedAllergy[];
   clinicalNotes: ExtractedClinicalNote[];
}

export interface FieldAnimationState {
   [key: string]: {
      isAnimating: boolean;
      isCompleted: boolean;
   };
}
