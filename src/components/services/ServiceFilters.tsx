
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

interface ServiceFiltersProps {
  onFilterChange: (category: string) => void;
  activeFilter: string;
}

const ServiceFilters: React.FC<ServiceFiltersProps> = ({ onFilterChange, activeFilter }) => {
  const [priceRange, setPriceRange] = React.useState([0, 500]);
  const [isFilterExpanded, setIsFilterExpanded] = React.useState(false);
  
  const serviceFeatures = [
    { id: "same_day", label: "Same Day Service" },
    { id: "warranty", label: "Service Warranty" },
    { id: "pick_drop", label: "Pickup & Dropoff" },
    { id: "certified", label: "Certified Mechanics" },
    { id: "oem_parts", label: "OEM Parts" },
  ];
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };
  
  const handleCategoryClick = (category: string) => {
    onFilterChange(category);
  };
  
  const handleReset = () => {
    setPriceRange([0, 500]);
    onFilterChange("all");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          className="md:hidden"
        >
          <Filter className="h-4 w-4 mr-2" />
          {isFilterExpanded ? "Hide" : "Show"}
        </Button>
      </div>
      
      <div className={`space-y-6 ${isFilterExpanded ? 'block' : 'hidden md:block'}`}>
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Categories</h4>
          <div className="space-y-2">
            {["all", "maintenance", "repair", "inspection", "detailing"].map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                size="sm"
                className="mr-2 mb-2 capitalize"
                onClick={() => handleCategoryClick(category)}
              >
                {category === "all" ? "All Services" : category}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Price Range</h4>
          <div className="space-y-4">
            <Slider
              min={0}
              max={500}
              step={10}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="py-2"
            />
            <div className="flex items-center justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Features</h4>
          <div className="space-y-2">
            {serviceFeatures.map((feature) => (
              <div key={feature.id} className="flex items-center space-x-2">
                <Checkbox id={feature.id} />
                <Label htmlFor={feature.id} className="text-sm font-normal cursor-pointer">
                  {feature.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={handleReset}
        >
          <X className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default ServiceFilters;
