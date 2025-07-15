import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ContractorCard from "@/components/contractors/contractor-card";
import ContractorFilters from "@/components/contractors/contractor-filters";
import type { Contractor } from "@shared/schema";

export default function Contractors() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: contractors, isLoading } = useQuery<Contractor[]>({
    queryKey: ["/api/contractors"],
  });

  const filteredContractors = contractors?.filter(contractor => {
    const matchesSearch = contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contractor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contractor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || contractor.specialty === selectedSpecialty;
    const matchesLocation = selectedLocation === "all" || contractor.location === selectedLocation;
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading contractors...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Contractors</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified, experienced contractors ready to bring your project to life
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <Input
            placeholder="Search contractors by name, specialty, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md mx-auto"
          />
        </div>

        {/* Filters */}
        <ContractorFilters
          selectedSpecialty={selectedSpecialty}
          selectedLocation={selectedLocation}
          onSpecialtyChange={setSelectedSpecialty}
          onLocationChange={setSelectedLocation}
        />

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredContractors?.length || 0} contractor{filteredContractors?.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Contractor Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredContractors?.map((contractor) => (
            <ContractorCard key={contractor.id} contractor={contractor} />
          ))}
        </div>

        {filteredContractors?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No contractors found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSelectedSpecialty("all");
                setSelectedLocation("all");
                setSearchTerm("");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
