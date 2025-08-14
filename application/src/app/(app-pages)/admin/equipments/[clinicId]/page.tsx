import ClinicEquipmentPage from '@/components/pages/admin/equipments/ClinicEquipmentPage';

interface ClinicEquipmentPageProps {
   params: Promise<{ clinicId: string }>;
}

export default async function ClinicEquipmentRoute ({ params }: ClinicEquipmentPageProps) {
   const { clinicId } = await params;
   return <ClinicEquipmentPage clinicId={clinicId} />;
}
