import LandingHeader from './LandingHeader';
import LandingHero from './LandingHero';
import LandingServices from './LandingServices';
import LandingAbout from './LandingAbout';
import LandingStats from './LandingStats';
import LandingBenefits from './LandingBenefits';
import LandingTestimonials from './LandingTestimonials';
import LandingCTA from './LandingCTA';
import LandingFooter from './LandingFooter';

interface LandingPageProps {
   videoUrl: string;
}

export default function LandingPage ({ videoUrl }: LandingPageProps) {
   return (
      <>
         <LandingHeader />
         <main className="min-h-screen">
            <section id="hero">
               <LandingHero videoUrl={videoUrl} />
            </section>
            <section id="features">
               <LandingServices />
            </section>
            <LandingAbout />
            <LandingStats />
            <section id="benefits">
               <LandingBenefits />
            </section>
            <section id="testimonials">
               <LandingTestimonials />
            </section>
            <section id="contact">
               <LandingCTA />
            </section>
            <LandingFooter />
         </main>
      </>
   );
}
