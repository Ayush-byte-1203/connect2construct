import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LaborerCard from "@/components/laborers/laborer-card";
import { Hammer, Wrench, Zap, PaintBucket } from "lucide-react";
import type { Laborer } from "@shared/schema";

export default function Laborers() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: laborers, isLoading } = useQuery<Laborer[]>({
    queryKey: ["/api/laborers"],
  });

  const filteredLaborers = laborers?.filter(laborer => {
    const matchesSearch = laborer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         laborer.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || 
                            laborer.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    
    return matchesSearch && matchesSpecialty;
  });

  const specialtyCategories = [
    {
      name: "Carpentry",
      icon: <Hammer className="h-6 w-6" />,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Skilled carpenters for framing, finishing, and custom work",
      count: laborers?.filter(l => l.specialty.toLowerCase().includes("carpenter")).length || 0
    },
    {
      name: "Mechanical",
      icon: <Wrench className="h-6 w-6" />,
      color: "text-accent",
      bgColor: "bg-accent/10",
      description: "HVAC, plumbing, and mechanical system specialists",
      count: laborers?.filter(l => l.specialty.toLowerCase().includes("plumbing") || l.specialty.toLowerCase().includes("mechanical")).length || 0
    },
    {
      name: "Electrical",
      icon: <Zap className="h-6 w-6" />,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      description: "Licensed electricians and electrical assistants",
      count: laborers?.filter(l => l.specialty.toLowerCase().includes("electrical")).length || 0
    },
    {
      name: "Finishing",
      icon: <PaintBucket className="h-6 w-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "Painters, drywall, flooring, and finishing specialists",
      count: laborers?.filter(l => l.specialty.toLowerCase().includes("painting") || l.specialty.toLowerCase().includes("finishing")).length || 0
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading laborers...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-neutral min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Skilled Laborers by Specialty</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find experienced workers for every aspect of your construction project
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <Input
            placeholder="Search laborers by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md mx-auto"
          />
        </div>

        {/* Specialty Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {specialtyCategories.map((category) => (
            <Card 
              key={category.name}
              className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedSpecialty(category.name.toLowerCase())}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <div className={category.color}>{category.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                <div className={`${category.color} font-semibold`}>{category.count}+ Available</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="carpentry">Carpentry</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="mechanical">Mechanical</SelectItem>
                <SelectItem value="finishing">Finishing</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline"
              onClick={() => {
                setSelectedSpecialty("all");
                setSearchTerm("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredLaborers?.length || 0} skilled worker{filteredLaborers?.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Featured Laborers */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              {selectedSpecialty === "all" ? "Featured Skilled Workers" : `${selectedSpecialty.charAt(0).toUpperCase() + selectedSpecialty.slice(1)} Specialists`}
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLaborers?.map((laborer) => (
                <LaborerCard key={laborer.id} laborer={laborer} />
              ))}
            </div>
            
            {filteredLaborers?.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">No laborers found matching your criteria.</p>
                <Button 
                  onClick={() => {
                    setSelectedSpecialty("all");
                    setSearchTerm("");
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
