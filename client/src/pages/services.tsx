import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Building, Home, Factory, CheckCircle } from "lucide-react";
import { useState } from "react";
import type { Service } from "@shared/schema";

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services", selectedCategory === "all" ? undefined : selectedCategory],
  });

  const filteredServices = services?.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "residential":
        return <Home className="h-6 w-6" />;
      case "commercial":
        return <Building className="h-6 w-6" />;
      case "industrial":
        return <Factory className="h-6 w-6" />;
      default:
        return <Home className="h-6 w-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "residential":
        return "text-primary";
      case "commercial":
        return "text-accent";
      case "industrial":
        return "text-secondary";
      default:
        return "text-primary";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-neutral min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Construction Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive construction solutions from planning to completion
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Service Categories Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className={`w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6`}>
                <Home className="text-primary text-2xl h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Residential Construction</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Custom Home Building</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Home Renovations</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Kitchen & Bathroom Remodeling</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Additions & Extensions</li>
              </ul>
              <Button 
                variant="outline" 
                className="text-primary border-primary hover:bg-primary hover:text-white"
                onClick={() => setSelectedCategory("residential")}
              >
                View Residential Services
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className={`w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6`}>
                <Building className="text-accent text-2xl h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Commercial Construction</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Office Buildings</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Retail Spaces</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Restaurants & Hospitality</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Tenant Improvements</li>
              </ul>
              <Button 
                variant="outline"
                className="text-accent border-accent hover:bg-accent hover:text-white"
                onClick={() => setSelectedCategory("commercial")}
              >
                View Commercial Services
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className={`w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-6`}>
                <Factory className="text-secondary text-2xl h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Industrial Construction</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Warehouses & Distribution</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Manufacturing Facilities</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Infrastructure Projects</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Specialized Industrial</li>
              </ul>
              <Button 
                variant="outline"
                className="text-secondary border-secondary hover:bg-secondary hover:text-white"
                onClick={() => setSelectedCategory("industrial")}
              >
                View Industrial Services
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Service List */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              {selectedCategory === "all" ? "All Construction Services" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Services`}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices?.map((service) => (
                <div key={service.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors duration-200">
                  <div className="flex items-center mb-3">
                    <div className={`${getCategoryColor(service.category)} mr-3`}>
                      {getCategoryIcon(service.category)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{service.name}</h4>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-semibold">Starting at ${service.startingPrice}</span>
                    <Button size="sm" variant="ghost" className="text-accent hover:text-accent hover:bg-accent/10">
                      Get Quote
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
