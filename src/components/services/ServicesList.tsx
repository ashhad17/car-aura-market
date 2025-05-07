
import React, { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Service {
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
}

// Sample service data
const dummyServices: Service[] = [
  {
    id: "1",
    name: "Standard Oil Change",
    description: "Full synthetic oil change with filter replacement and fluid level check.",
    price: 49.99,
    duration: "30 mins",
    category: "maintenance",
    image: "https://images.unsplash.com/photo-1596040034934-22f29172a67e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    provider: {
      name: "Quick Lube Center",
      rating: 4.7
    },
    features: ["Same Day Service", "Certified Mechanics", "OEM Parts"]
  },
  {
    id: "2",
    name: "Brake Pad Replacement",
    description: "Front and rear brake pad replacement with rotor inspection.",
    price: 199.99,
    duration: "2 hours",
    category: "repair",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    provider: {
      name: "Precision Auto Care",
      rating: 4.8
    },
    features: ["Warranty", "Certified Mechanics", "OEM Parts"]
  },
  {
    id: "3",
    name: "Full Vehicle Inspection",
    description: "Comprehensive 50-point inspection covering all major systems.",
    price: 89.99,
    duration: "1 hour",
    category: "inspection",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1764&q=80",
    provider: {
      name: "Top Notch Inspections",
      rating: 4.9
    },
    features: ["Same Day Service", "Certified Mechanics", "Digital Report"]
  },
  {
    id: "4",
    name: "Deluxe Car Detailing",
    description: "Interior and exterior detailing with premium products.",
    price: 149.99,
    duration: "3 hours",
    category: "detailing",
    image: "https://images.unsplash.com/photo-1600322305530-45fbc5a32e66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    provider: {
      name: "Shine & Detail Co.",
      rating: 4.9
    },
    features: ["Premium Products", "Pickup & Dropoff", "Satisfaction Guarantee"]
  },
  {
    id: "5",
    name: "Tire Rotation & Balancing",
    description: "Tire rotation, balancing, and pressure check for optimal performance.",
    price: 69.99,
    duration: "45 mins",
    category: "maintenance",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    provider: {
      name: "Wheel Works",
      rating: 4.6
    },
    features: ["Same Day Service", "Multiple Locations", "Price Match"]
  },
  {
    id: "6",
    name: "AC System Repair",
    description: "Diagnose and repair air conditioning system issues.",
    price: 249.99,
    duration: "2-4 hours",
    category: "repair",
    image: "https://images.unsplash.com/photo-1613214150333-9581aeb80623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    provider: {
      name: "Cool Ride Services",
      rating: 4.7
    },
    features: ["Warranty", "Free Diagnostic", "OEM Parts"]
  },
  {
    id: "7",
    name: "Pre-Purchase Inspection",
    description: "Detailed inspection before buying a used car.",
    price: 129.99,
    duration: "1.5 hours",
    category: "inspection",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    provider: {
      name: "Buyer's Guardian",
      rating: 4.9
    },
    features: ["Same Day Service", "Digital Report", "Expert Advice"]
  },
  {
    id: "8",
    name: "Express Interior Detail",
    description: "Quick interior vacuum, wipe-down, and window cleaning.",
    price: 79.99,
    duration: "1 hour",
    category: "detailing",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    provider: {
      name: "Quick Clean Auto",
      rating: 4.5
    },
    features: ["Express Service", "Eco Friendly Products"]
  }
];

interface ServicesListProps {
  category: string | null;
}

const ServicesList: React.FC<ServicesListProps> = ({ category }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    const fetchServices = () => {
      setIsLoading(true);
      setTimeout(() => {
        if (category && category !== "all") {
          setServices(dummyServices.filter(service => service.category === category));
        } else {
          setServices(dummyServices);
        }
        setIsLoading(false);
      }, 800);
    };

    fetchServices();
  }, [category]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium mb-2">No services found</h3>
        <p className="text-gray-600">Try adjusting your filters or category selection.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServicesList;
