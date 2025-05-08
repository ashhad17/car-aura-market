
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CarCard from "@/components/car/CarCard";
import { CarType } from "@/lib/data";
import axios from "axios";

interface CarListingPreviewProps {
  cars: CarType[];
}

const CarListingPreview: React.FC<CarListingPreviewProps> = ({ cars }) => {
  const [carData, setCarData] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCars();  
  }, []);
  
  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await axios.get<{
        success: boolean;
        data: any[];
      }>(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/cars`);
      
      if (response.data.success) {
        // Convert string values to numbers where necessary
        const formattedData = response.data.data.map((car: any) => ({
          ...car,
          price: Number(car.price),
          mileage: Number(car.mileage),
        }));
        setCarData(formattedData);
      } else {
        setError("Failed to fetch cars");
      }
    } catch (err) {
      setError("Failed to fetch cars");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  console.log(carData);

  const previewCars = carData.slice(0, 3);

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0 flex flex-col justify-center items-start">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Vehicles</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
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

        {/* Display loading, error, or car cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p>Loading cars...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            previewCars.map((car) => <CarCard key={car._id} car={car} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default CarListingPreview;
