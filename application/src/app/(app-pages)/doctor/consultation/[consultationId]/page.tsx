import ActiveConsultationPage from '@/components/pages/doctor/consultation/ActiveConsultationPage';

interface ConsultationPageProps {
   params: Promise<{
      consultationId: string;
   }>;
}

export default async function ConsultationPage ({ params }: ConsultationPageProps) {
   const { consultationId } = await params;
   return <ActiveConsultationPage consultationId={consultationId} />;
}
