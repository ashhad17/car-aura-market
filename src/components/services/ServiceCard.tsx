
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ServiceProps {
  service: {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: string;
    category: string;
    image: string;
    provider: {
      name: string;
      rating: number;
    };
    features: string[];
  };
}

const ServiceCard: React.FC<ServiceProps> = ({ service }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate(`/services/${service.id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img 
          src={service.image} 
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <Badge 
          className="absolute top-3 right-3 bg-primary text-white"
          variant="secondary"
        >
          {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{service.name}</CardTitle>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="fill-yellow-500 h-4 w-4" />
            <span className="text-sm font-medium">{service.provider.rating.toFixed(1)}</span>
          </div>
        </div>
        <CardDescription className="text-sm text-gray-500">
          {service.provider.name}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
        <div className="flex items-center mb-3">
          <Clock className="h-4 w-4 mr-1 text-gray-500" />
          <span className="text-sm text-gray-500">{service.duration}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-1">
          {service.features.slice(0, 2).map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-gray-50">
              {feature}
            </Badge>
          ))}
          {service.features.length > 2 && (
            <Badge variant="outline" className="text-xs bg-gray-50">
              +{service.features.length - 2} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-2">
        <div className="text-xl font-bold text-primary">
          ${service.price.toFixed(2)}
        </div>
        <Button onClick={handleBookNow}>Book Now</Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
