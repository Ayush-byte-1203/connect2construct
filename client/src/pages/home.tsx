import HeroSection from "@/components/home/hero-section";
import StatsSection from "@/components/home/stats-section";
import FeaturedServices from "@/components/home/featured-services";
import FeaturedContractors from "@/components/home/featured-contractors";
import ContactForm from "@/components/contact/contact-form";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FeaturedServices />
      <FeaturedContractors />
      <ContactForm />
    </div>
  );
}
