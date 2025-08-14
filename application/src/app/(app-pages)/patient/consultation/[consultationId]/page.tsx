import PatientConsultationPage from '@/components/pages/patient/consultation/PatientConsultationPage';

interface PatientConsultationPageProps {
   params: {
      consultationId: string;
   };
}

export default function PatientConsultationRoute ({ params }: PatientConsultationPageProps) {
   return <PatientConsultationPage consultationId={params.consultationId} />;
}
