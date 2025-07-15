import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  showDetails?: boolean;
}

export default function ProjectCard({ project, showDetails = false }: ProjectCardProps) {
  return (
    <Card className="group cursor-pointer overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-lg font-bold mb-1">{project.title}</h3>
          <p className="text-sm">By {project.contractorName}</p>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">{project.category}</Badge>
          <span className="text-sm text-gray-500">Completed {project.completionYear}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{project.category}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        {showDetails && (
          <div className="flex items-center justify-between">
            <span className="text-primary font-semibold">Completed {project.completionYear}</span>
            <Button variant="ghost" size="sm" className="text-accent hover:text-accent hover:bg-accent/10">
              View Details <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
