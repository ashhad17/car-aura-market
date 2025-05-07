
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CarType } from "@/lib/data";
import CarCard from "./CarCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CarGridProps {
  cars?: CarType[]; // Make this optional so it can fetch cars internally if not provided
}

const CarGrid: React.FC<CarGridProps> = ({ cars: initialCars }) => {
  const [carData, setCarData] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    bodyType: "",
    fuelType: "",
    transmission: "",
  });
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<string>("price");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const carsPerPage = 6;

  useEffect(() => {
    // If cars are provided as props, use those instead of fetching
    if (initialCars) {
      setCarData(initialCars);
      setLoading(false);
      return;
    }

    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{
          success: boolean;
          data: CarType[];
        }>(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/cars`);
        if (response.data.success) {
          setCarData(response.data.data);
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

    fetchCars();
  }, [initialCars]);

  // Define the filter handler interface
  interface FilterChangeHandler {
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, filterKey: string): void;
  }

  const handleFilterChange: FilterChangeHandler = (e, filterKey) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const handleSortOrderChange = (value: "asc" | "desc") => {
    setSortOrder(value);
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  const filteredCars = carData.filter((car) => {
    const makeMatch =
      !filters.make || car.make.toLowerCase().includes(filters.make.toLowerCase());
    const modelMatch =
      !filters.model || car.model.toLowerCase().includes(filters.model.toLowerCase());
    const yearMatch = !filters.year || String(car.year).includes(filters.year);
    const priceMatch = !filters.price || String(car.price).includes(filters.price);
    const mileageMatch =
      !filters.mileage || String(car.mileage).includes(filters.mileage);
    const bodyTypeMatch =
      !filters.bodyType || car.bodyType.toLowerCase().includes(filters.bodyType.toLowerCase());
    const fuelTypeMatch =
      !filters.fuelType || car.fuelType.toLowerCase().includes(filters.fuelType.toLowerCase());
    const transmissionMatch =
      !filters.transmission ||
      car.transmission.toLowerCase().includes(filters.transmission.toLowerCase());
    const searchTermMatch =
      !searchTerm ||
      car.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model?.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      makeMatch &&
      modelMatch &&
      yearMatch &&
      priceMatch &&
      mileageMatch &&
      bodyTypeMatch &&
      fuelTypeMatch &&
      transmissionMatch &&
      searchTermMatch
    );
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;

    switch (sortBy) {
      case "price":
        return order * (a.price - b.price);
      case "year":
        return order * (Number(a.year) - Number(b.year));
      case "mileage":
        return order * (a.mileage - b.mileage);
      default:
        return 0;
    }
  });

  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const carsToDisplay = sortedCars.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const generateMockData = (count: number): CarType[] => {
    const makes = ["Toyota", "Honda", "Ford", "BMW", "Mercedes"];
    const colors = ["Red", "Blue", "Silver", "Black", "White"];
    const engines = ["2.0L I4", "3.5L V6", "5.0L V8"];
    const transmissions = ["Automatic", "Manual"];
    const bodyTypes = ["Sedan", "SUV", "Truck", "Hatchback"];
    const fuelTypes = ["Gasoline", "Diesel", "Electric"];
    const locations = ["New York, NY", "Los Angeles, CA", "Chicago, IL"];
    const conditions = ["Excellent", "Good", "Fair"];
    const statuses = ["Available", "Sold", "Pending"];
    const sellerTypes = ["Dealer", "Private"];

    const mockCars: CarType[] = Array(count).fill(0).map((_, index) => ({
      id: `mock-${index}`,
      make: makes[Math.floor(Math.random() * makes.length)],
      model: `Model ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      year: 2015 + Math.floor(Math.random() * 9),
      price: 15000 + Math.floor(Math.random() * 35000),
      mileage: 10000 + Math.floor(Math.random() * 90000),
      color: colors[Math.floor(Math.random() * colors.length)],
      engine: engines[Math.floor(Math.random() * engines.length)],
      transmission: transmissions[Math.floor(Math.random() * transmissions.length)],
      bodyType: bodyTypes[Math.floor(Math.random() * bodyTypes.length)],
      fuelType: fuelTypes[Math.floor(Math.random() * fuelTypes.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      images: [
        `https://images.unsplash.com/photo-${1550000000 + index}?auto=format&fit=crop&w=300&q=80`,
      ],
      description: "This is a sample car description.",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      isFeatured: Math.random() > 0.7,
      isAvailable: true,
      // Add the optional fields being used
      title: `${makes[Math.floor(Math.random() * makes.length)]} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      sellerType: sellerTypes[Math.floor(Math.random() * sellerTypes.length)],
    }));

    return mockCars;
  };

  if (loading) {
    return <div className="text-center">Loading cars...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="md:w-1/4">
          {/* Create a simpler version of CarFilters integrated here */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Filter Cars</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  value={filters.make}
                  onChange={(e) => handleFilterChange(e, "make")}
                  placeholder="Enter make..."
                />
              </div>
              
              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={filters.model}
                  onChange={(e) => handleFilterChange(e, "model")}
                  placeholder="Enter model..."
                />
              </div>
              
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={filters.year}
                  onChange={(e) => handleFilterChange(e, "year")}
                  placeholder="Enter year..."
                />
              </div>
              
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  value={filters.price}
                  onChange={(e) => handleFilterChange(e, "price")}
                  placeholder="Enter price..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-3/4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div className="w-full md:w-1/2 mb-2 md:mb-0">
              <Input
                type="text"
                placeholder="Search cars..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <div>
                <Label htmlFor="sortOrder">Sort Order:</Label>
                <Select value={sortOrder} onValueChange={handleSortOrderChange}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Sort Order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="sortBy">Sort By:</Label>
                <Select value={sortBy} onValueChange={handleSortByChange}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="year">Year</SelectItem>
                    <SelectItem value="mileage">Mileage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {carsToDisplay.length > 0 ? (
              carsToDisplay.map((car) => (
                <CarCard key={car.id} car={car} />
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">No cars found matching your criteria</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mr-2"
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    variant={currentPage === page ? "default" : "outline"}
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-2"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarGrid;
