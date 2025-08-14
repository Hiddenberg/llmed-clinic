import PatientConsultationPage from '@/components/pages/patient/consultation/PatientConsultationPage';

interface PatientConsultationPageProps {
   params: Promise<{
      consultationId: string;
   }>;
}

export default async function PatientConsultationRoute ({ params }: PatientConsultationPageProps) {
   const { consultationId } = await params;
   return <PatientConsultationPage consultationId={consultationId} />;
}
