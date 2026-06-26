import { Hero } from "@/components/home/hero";
import { TrustStats } from "@/components/home/trust-stats";
import { ProgramsGrid } from "@/components/home/programs-grid";
import { HowItWorks } from "@/components/home/how-it-works";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { FaqPreview } from "@/components/home/faq-preview";
import { FinalCta } from "@/components/home/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStats />
      <ProgramsGrid />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
