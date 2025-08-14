import PreConsultationPage from '@/components/pages/doctor/consultation/PreConsultationPage';

interface PreConsultationPageProps {
   params: {
      consultationId: string;
   };
}

export default function PreConsultationRoute({ params }: PreConsultationPageProps) {
   return <PreConsultationPage consultationId={params.consultationId} />;
}
