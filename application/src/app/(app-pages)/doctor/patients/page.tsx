import PatientsPage from '@/components/pages/shared/patients/PatientsPage';

export default function DoctorPatientsPage () {
   // In a real application, you would get the doctor ID from authentication
   // For this demo, we'll use Dr. Carlos Ruiz's ID
   const doctorId = 'dr1'; // Dr. Carlos Ruiz

   return <PatientsPage userType="doctor" doctorId={doctorId} />;
}
