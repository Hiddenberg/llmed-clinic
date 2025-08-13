import PatientDetailPage from '@/components/pages/shared/patients/PatientDetailPage';

export default async function AdminPatientDetailPage ({ params }: { params: Promise<{ patientId: string }> }) {
   const { patientId } = await params;
   return <PatientDetailPage patientId={patientId} userType="admin" />;
}
