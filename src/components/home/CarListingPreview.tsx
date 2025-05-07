
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CarCard from "@/components/car/CarCard";
import { CarType } from "@/lib/data";

interface CarListingPreviewProps {
  cars: CarType[];
}

const CarListingPreview: React.FC<CarListingPreviewProps> = ({ cars }) => {
  // Only show the first 3 cars in the preview
  const previewCars = cars.slice(0, 3);

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Vehicles</h2>
            <p className="text-gray-600 max-w-2xl">
              Explore our handpicked selection of certified pre-owned vehicles
              with complete history and thorough inspections.
            </p>
          </div>
          <Link to="/cars">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Listings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarListingPreview;
