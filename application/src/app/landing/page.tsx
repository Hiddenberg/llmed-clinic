import LandingPage from '@/components/pages/shared/landing/LandingPage';

export default function LandingPageRoute () {
   const landingVideoURL = "/hemodialisis-clinic.webm";

   return <LandingPage videoUrl={landingVideoURL} />;
}