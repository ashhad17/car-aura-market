
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CarType } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";

interface BackendCar {
  _id: string;
  title: string;
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  condition: string;
  location: string;
  description: string;
  images: Array<{
    url: string;
    publicId: string;
  }>;
  seller: {
    _id: string;
    name: string;
  };
  status: string;
  createdAt: string;
  features?: string[];
  exteriorColor?: string;
  interiorColor?: string;
  fuelType?: string;
  transmission?: string;
}
interface CarCardProps {
  car: BackendCar ; // Accept both BackendCar and CarType
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/cars/details/${car._id}`);
  };

  const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/[^\d.]/g, '')) : price;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(numericPrice);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("en-US").format(mileage);
  };

  // Use car.title or construct one if it doesn't exist
  const title = car.title || `${car.make} ${car.model} ${car.year}`;

  // Safely format the transmission if it exists
  const formattedTransmission = car.transmission 
    ? car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1) 
    : "N/A";

  return (
    <Card className="overflow-hidden hover-scale transition-all duration-300 shadow-md h-full flex flex-col">
      <div className="relative">
        <img
          src={car.images[0].url} // Fixed: Use images[0] instead of image
          alt={title}
          className="w-full h-48 object-cover"
        />
        {car.condition && (
          <Badge
            variant="default"
            className={`absolute top-3 right-3 ${
              car.condition === "Excellent"
                ? "bg-green-600"
                : car.condition === "Good"
                ? "bg-blue-600"
                : "bg-amber-600"
            }`}
          >
            {car.condition}
          </Badge>
        )}
        {car.seller && (
          <Badge
            variant="outline"
            className="absolute top-3 left-3 bg-white bg-opacity-80"
          >
            "Private Seller"
          </Badge>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{title}</h3>
          <span className="text-lg font-semibold text-primary">
            {typeof car.price === 'string' ? car.price : formatPrice(car.price)}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Year:</span>
            <span className="ml-1">{car.year}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Mileage:</span>
            <span className="ml-1">{car.mileage} mi</span>
          </div>
          {car.fuelType && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium">Fuel:</span>
              <span className="ml-1">{car.fuelType}</span>
            </div>
          )}
          {car.transmission && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium">Transmission:</span>
              <span className="ml-1">{formattedTransmission}</span>
            </div>
          )}
        </div>
        
        <div className="mt-auto flex flex-col">
          <div className="flex items-center text-xs text-gray-600 mb-3">
            <Info className="h-3 w-3 mr-1" />
            <span>Located in {car.location}</span>
          </div>
          
          <Button 
            className="w-full button-gradient text-white"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CarCard;
