import PatientDetailPage from '@/components/pages/shared/patients/PatientDetailPage';

interface PatientDetailPageProps {
   params: Promise<{
      patientId: string;
   }>;
}

export default async function DoctorPatientDetailPage ({ params }: PatientDetailPageProps) {
   const { patientId } = await params;
   return <PatientDetailPage patientId={patientId} userType="doctor" />;
}
