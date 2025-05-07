
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ServiceType } from "@/lib/data";

interface ServiceCardProps {
  service: ServiceType;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  // Default image if none provided
  const serviceImage = service.image || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=200";
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={serviceImage}
          alt={service.name}
          className="h-full w-full object-cover object-center"
        />
        {service.featured && (
          <Badge className="absolute right-2 top-2 bg-yellow-500">Featured</Badge>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold truncate">{service.name}</h3>
          <Badge variant={service.available ? "default" : "outline"}>
            {service.available ? "Available" : "Unavailable"}
          </Badge>
        </div>
        
        <div className="flex items-center text-yellow-500 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4"
              fill={i < Math.round(service.rating) ? "currentColor" : "none"}
            />
          ))}
          <span className="text-gray-600 text-sm ml-1">
            ({service.reviewCount} reviews)
          </span>
        </div>
        
        <p className="text-gray-600 mb-3 line-clamp-2">{service.description}</p>
        
        {service.provider && (
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-full bg-gray-100 overflow-hidden">
              {service.provider.image ? (
                <img 
                  src={service.provider.image} 
                  alt={service.provider.name} 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {service.provider.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium flex items-center gap-1">
                {service.provider.name}
                {service.provider.verified && (
                  <CheckCircle className="h-3 w-3 text-blue-500" />
                )}
              </p>
              {service.provider.location && (
                <p className="text-xs text-gray-500 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {service.provider.location}
                </p>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4">
          <p className="font-bold text-xl">₹{service.price}</p>
          <Button asChild>
            <Link to={`/services/${service.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
