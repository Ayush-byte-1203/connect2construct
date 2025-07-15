import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Clock, DollarSign } from "lucide-react";
import type { Laborer } from "@shared/schema";

interface LaborerCardProps {
  laborer: Laborer;
}

export default function LaborerCard({ laborer }: LaborerCardProps) {
  const rating = parseFloat(laborer.rating);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <Card className="border border-gray-200 hover:border-primary transition-colors duration-200">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={laborer.profileImage || ""} alt={laborer.name} />
            <AvatarFallback>
              {laborer.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-bold text-gray-900">{laborer.name}</h4>
            <p className="text-sm text-primary">{laborer.specialty}</p>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(fullStars)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
              {hasHalfStar && <Star className="h-3 w-3 fill-current opacity-50" />}
              {[...Array(5 - Math.ceil(rating))].map((_, i) => (
                <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="h-3 w-3" />
              ))}
            </div>
            <span>{laborer.rating}/5.0 ({laborer.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>{laborer.experience}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>${laborer.hourlyRate}/hour</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button className="flex-1 bg-primary text-white hover:bg-primary/90 text-sm">
            Hire Now
          </Button>
          <Button variant="outline" className="text-sm">
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
