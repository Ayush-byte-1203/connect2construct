import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building, Factory, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import type { Service } from "@shared/schema";

export default function FeaturedServices() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const serviceCategories = [
    {
      title: "Residential Construction",
      icon: <Home className="h-8 w-8" />,
      color: "text-primary",
      bgColor: "bg-primary/10",
      items: ["Custom Home Building", "Home Renovations", "Kitchen & Bathroom Remodeling", "Additions & Extensions"]
    },
    {
      title: "Commercial Construction", 
      icon: <Building className="h-8 w-8" />,
      color: "text-accent",
      bgColor: "bg-accent/10",
      items: ["Office Buildings", "Retail Spaces", "Restaurants & Hospitality", "Tenant Improvements"]
    },
    {
      title: "Industrial Construction",
      icon: <Factory className="h-8 w-8" />,
      color: "text-secondary",
      bgColor: "bg-secondary/10", 
      items: ["Warehouses & Distribution", "Manufacturing Facilities", "Infrastructure Projects", "Specialized Industrial"]
    }
  ];

  if (isLoading) {
    return (
      <section className="py-20 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Construction Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive construction solutions from planning to completion
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {serviceCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${category.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                  <div className={category.color}>{category.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                <ul className="space-y-2 text-gray-600 mb-6">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/services">
                  <Button variant="outline" className={`${category.color} border-current hover:bg-current hover:text-white`}>
                    View All Services
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Services List */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Featured Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services?.slice(0, 6).map((service) => (
                <div key={service.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors duration-200">
                  <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
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
            <div className="text-center mt-8">
              <Link href="/services">
                <Button className="bg-primary text-white hover:bg-primary/90">
                  View All Services
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
