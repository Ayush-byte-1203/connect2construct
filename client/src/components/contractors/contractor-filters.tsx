import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ContractorFiltersProps {
  selectedSpecialty: string;
  selectedLocation: string;
  onSpecialtyChange: (specialty: string) => void;
  onLocationChange: (location: string) => void;
}

export default function ContractorFilters({
  selectedSpecialty,
  selectedLocation,
  onSpecialtyChange,
  onLocationChange
}: ContractorFiltersProps) {
  const specialties = [
    "General Contractor",
    "Electrical Contractor", 
    "Plumbing Contractor",
    "HVAC Contractor",
    "Roofing Contractor",
    "Landscaping Contractor"
  ];

  const locations = [
    "Downtown District",
    "North District",
    "South District", 
    "East District",
    "West District"
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-6 mb-12">
      <div className="flex flex-wrap gap-4 items-center">
        <Select value={selectedSpecialty} onValueChange={onSpecialtyChange}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="All Specialties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedLocation} onValueChange={onLocationChange}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          variant="outline"
          onClick={() => {
            onSpecialtyChange("all");
            onLocationChange("all");
          }}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
