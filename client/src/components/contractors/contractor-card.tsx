import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, MapPin, Clock, Shield, Phone, Mail } from "lucide-react";
import { Link } from "wouter";
import type { Contractor } from "@shared/schema";

interface ContractorCardProps {
  contractor: Contractor;
}

export default function ContractorCard({ contractor }: ContractorCardProps) {
  const rating = parseFloat(contractor.rating);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <Card className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={contractor.profileImage || ""} alt={contractor.name} />
            <AvatarFallback>
              {contractor.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{contractor.name}</h3>
            <p className="text-primary font-semibold mb-1">{contractor.specialty}</p>
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(fullStars)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                {hasHalfStar && <Star className="h-4 w-4 fill-current opacity-50" />}
                {[...Array(5 - Math.ceil(rating))].map((_, i) => (
                  <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="h-4 w-4" />
                ))}
              </div>
              <span className="text-sm text-gray-600">{contractor.rating} ({contractor.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{contractor.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{contractor.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>{contractor.experience}</span>
          </div>
          {(contractor.isLicensed || contractor.isInsured) && (
            <div className="flex items-center text-sm text-green-600">
              <Shield className="h-4 w-4 mr-2" />
              <span>
                {contractor.isLicensed && contractor.isInsured ? "Licensed & Insured" :
                 contractor.isLicensed ? "Licensed" : "Insured"}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Link href={`/contractors/${contractor.id}`}>
            <Button className="flex-1 bg-primary text-white hover:bg-primary/90">
              View Profile
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => window.location.href = `tel:${contractor.phone}`}
          >
            <Phone className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => window.location.href = `mailto:${contractor.email}`}
          >
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
