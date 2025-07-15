import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ContractorCard from "@/components/contractors/contractor-card";
import { Link } from "wouter";
import type { Contractor } from "@shared/schema";

export default function FeaturedContractors() {
  const { data: contractors, isLoading } = useQuery<Contractor[]>({
    queryKey: ["/api/contractors"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading contractors...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Contractors</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified, experienced contractors ready to bring your project to life
          </p>
        </div>
        
        {/* Contractor Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {contractors?.slice(0, 3).map((contractor) => (
            <ContractorCard key={contractor.id} contractor={contractor} />
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/contractors">
            <Button className="bg-accent text-white hover:bg-accent/90 font-semibold px-8 py-3">
              View All Contractors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
