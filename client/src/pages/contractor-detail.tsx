import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, MapPin, Clock, Shield, CheckCircle, Phone, Mail, ArrowLeft } from "lucide-react";
import ProjectCard from "@/components/portfolio/project-card";
import { Link } from "wouter";
import type { Contractor, Project } from "@shared/schema";

export default function ContractorDetail() {
  const [match, params] = useRoute("/contractors/:id");
  const contractorId = params?.id ? parseInt(params.id) : null;

  const { data: contractor, isLoading: contractorLoading } = useQuery<Contractor>({
    queryKey: ["/api/contractors", contractorId],
    enabled: !!contractorId,
  });

  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects", contractorId],
    enabled: !!contractorId,
  });

  if (contractorLoading) {
    return (
      <div className="min-h-screen bg-neutral py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading contractor details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!contractor) {
    return (
      <div className="min-h-screen bg-neutral py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Contractor Not Found</h1>
          <Link href="/contractors">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Contractors
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/contractors">
            <Button variant="ghost" className="text-gray-600 hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Contractors
            </Button>
          </Link>
        </div>

        {/* Contractor Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={contractor.profileImage || ""} alt={contractor.name} />
                  <AvatarFallback className="text-2xl">
                    {contractor.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{contractor.name}</h1>
                    <Badge variant="secondary" className="text-primary bg-primary/10 mb-4">
                      {contractor.specialty}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="bg-primary hover:bg-primary/90">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(parseFloat(contractor.rating))} ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{contractor.rating} ({contractor.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {contractor.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {contractor.experience}
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{contractor.description}</p>

                <div className="flex gap-4">
                  {contractor.isLicensed && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Licensed
                    </div>
                  )}
                  {contractor.isInsured && (
                    <div className="flex items-center text-green-600">
                      <Shield className="h-5 w-5 mr-2" />
                      Insured
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">{contractor.phone}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">{contractor.email}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Service Area</h3>
              <p className="text-gray-600">{contractor.location}</p>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Projects */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Portfolio Projects</h2>
            
            {projectsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading projects...</p>
              </div>
            ) : projects && projects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No projects available for this contractor.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
