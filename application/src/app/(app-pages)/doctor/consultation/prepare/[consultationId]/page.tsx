import PreConsultationPage from '@/components/pages/doctor/consultation/PreConsultationPage';

interface PreConsultationPageProps {
   params: Promise<{
      consultationId: string;
   }>;
}

export default async function PreConsultationRoute ({ params }: PreConsultationPageProps) {
   const { consultationId } = await params;
   return <PreConsultationPage consultationId={consultationId} />;
}
