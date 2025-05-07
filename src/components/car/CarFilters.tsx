import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Car } from "@/types";

interface CarFiltersProps {
  cars: Car[];
  onFilter: (filteredCars: Car[]) => void;
}

const CarFilters: React.FC<CarFiltersProps> = ({ cars, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');

  useEffect(() => {
    // Apply filters whenever filter criteria change
    const filteredCars = cars.filter(car => {
      // Match search term
      const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Match selected make if any
      const matchesMake = selectedMake ? car.make === selectedMake : true;
      
      // Match selected body type if any
      const matchesBodyType = selectedBodyType ? car.bodyType === selectedBodyType : true;
      
      // Match price range
      const carPrice = Number(car.price);
      const minPriceNum = minPrice ? Number(minPrice) : 0;
      const maxPriceNum = maxPrice ? Number(maxPrice) : Infinity;
      
      const matchesMinPrice = !minPrice || carPrice >= minPriceNum;
      const matchesMaxPrice = !maxPrice || carPrice <= maxPriceNum;
      
      // Match year range
      const carYear = Number(car.year);
      const minYearNum = minYear ? Number(minYear) : 0;
      const maxYearNum = maxYear ? Number(maxYear) : Infinity;
      
      const matchesMinYear = !minYear || carYear >= minYearNum;
      const matchesMaxYear = !maxYear || carYear <= maxYearNum;
      
      return matchesSearch && matchesMake && matchesBodyType && 
             matchesMinPrice && matchesMaxPrice &&
             matchesMinYear && matchesMaxYear;
    });

    onFilter(filteredCars);
  }, [cars, searchTerm, selectedMake, selectedBodyType, minPrice, maxPrice, minYear, maxYear, onFilter]);

  // Extract unique makes and body types from the cars array
  const makes = [...new Set(cars.map(car => car.make))];
  const bodyTypes = [...new Set(cars.map(car => car.bodyType))];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Search Filter */}
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          type="text"
          id="search"
          placeholder="Search by make, model, or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Make Filter */}
      <div>
        <Label htmlFor="make">Make</Label>
        <Select onValueChange={setSelectedMake}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Makes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Makes</SelectItem>
            {makes.map(make => (
              <SelectItem key={make} value={make}>{make}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Body Type Filter */}
      <div>
        <Label htmlFor="bodyType">Body Type</Label>
        <Select onValueChange={setSelectedBodyType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Body Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Body Types</SelectItem>
            {bodyTypes.map(bodyType => (
              <SelectItem key={bodyType} value={bodyType}>{bodyType}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Filter */}
      <div className="md:col-span-2 lg:col-span-1">
        <Label>Price Range</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Year Range Filter */}
      <div className="lg:col-span-2">
        <Label>Year Range</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min Year"
            value={minYear}
            onChange={(e) => setMinYear(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max Year"
            value={maxYear}
            onChange={(e) => setMaxYear(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CarFilters;
