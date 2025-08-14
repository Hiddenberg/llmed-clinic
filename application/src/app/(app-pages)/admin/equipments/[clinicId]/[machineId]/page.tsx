import MachineDetailPage from '@/components/pages/admin/equipments/MachineDetailPage';

interface MachineDetailPageProps {
   params: Promise<{ clinicId: string; machineId: string }>;
}

export default async function MachineDetailRoute({ params }: MachineDetailPageProps) {
   const { clinicId, machineId } = await params;
   return <MachineDetailPage clinicId={clinicId} machineId={machineId} />;
}
