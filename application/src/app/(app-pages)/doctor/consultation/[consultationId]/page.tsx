import ActiveConsultationPage from '@/components/pages/doctor/consultation/ActiveConsultationPage';

interface ConsultationPageProps {
   params: {
      consultationId: string;
   };
}

export default function ConsultationPage ({ params }: ConsultationPageProps) {
   return <ActiveConsultationPage consultationId={params.consultationId} />;
}
