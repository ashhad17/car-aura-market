
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Car, MapPin, Calendar, Heart, Share, User } from "lucide-react";

interface CarCardProps {
  car: {
    id: string;
    title: string;
    price: number;
    year: number;
    mileage: number;
    location: string;
    imageUrl: string;
    condition: string;
    fuel?: string;
    transmission?: string;
    sellerName?: string;
    sellerType?: string;
    featured?: boolean;
  };
  variant?: "compact" | "full";
}

const CarCard: React.FC<CarCardProps> = ({ car, variant = "full" }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTestDrive = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    toast({
      title: "Test Drive Requested",
      description: `We'll contact you to schedule a test drive for this ${car.year} ${car.title}`,
    });
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    navigate(`/cars/details/${car.id}`);
  };

  const isCompact = variant === "compact";

  return (
    <Card className={`overflow-hidden ${car.featured ? "ring-2 ring-primary" : ""}`}>
      <div className="relative">
        <Link to={`/cars/details/${car.id}`}>
          <img
            src={car.imageUrl}
            alt={car.title}
            className={`w-full ${isCompact ? "h-36" : "h-48 md:h-60"} object-cover`}
          />
        </Link>
        {car.featured && (
          <Badge className="absolute top-2 left-2 bg-primary text-white">
            Featured
          </Badge>
        )}
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to favorites</span>
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
          >
            <Share className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
      </div>

      <CardContent className={`${isCompact ? "p-3" : "p-5"}`}>
        <div className="space-y-3">
          <div className="flex justify-between">
            <h3 className={`${isCompact ? "text-base" : "text-lg"} font-semibold`}>
              <Link to={`/cars/details/${car.id}`}>{car.title}</Link>
            </h3>
            <span className="font-bold text-primary">
              ${car.price.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-wrap gap-y-2 text-sm text-gray-500">
            <div className="flex items-center w-1/2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center w-1/2">
              <Car className="h-4 w-4 mr-1" />
              <span>{car.mileage.toLocaleString()} mi</span>
            </div>
            {!isCompact && (
              <>
                <div className="flex items-center w-1/2">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                    {car.condition}
                  </span>
                </div>
                <div className="flex items-center w-1/2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{car.location}</span>
                </div>
              </>
            )}
          </div>

          {!isCompact && (
            <div className="flex flex-wrap gap-2 pt-2">
              {car.fuel && (
                <Badge variant="outline">{car.fuel}</Badge>
              )}
              {car.transmission && (
                <Badge variant="outline">{car.transmission}</Badge>
              )}
            </div>
          )}

          {!isCompact && car.sellerName && (
            <div className="flex items-center pt-2 text-sm text-gray-500">
              <User className="h-4 w-4 mr-1" />
              <span>
                {car.sellerName} • {car.sellerType}
              </span>
            </div>
          )}

          {!isCompact && (
            <div className="flex gap-2 pt-3">
              <Button
                variant="default"
                className="flex-1"
                onClick={handleBookNow}
              >
                Book Now
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleTestDrive}
              >
                Test Drive
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
