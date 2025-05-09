import React from "react";
import { services } from "@/lib/data";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useTheme } from "@/context/ThemeContext";

interface ServiceSectionProps {
  services?: any[];
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ services: providedServices }) => {
  const { isDark } = useTheme(); // Access dark mode state
  const servicesToUse = providedServices || services;
  const featuredServices = servicesToUse.filter((service) => service.featured);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className={`section-padding ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our <span className="text-gradient">Service Providers</span>
          </h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            We offer a wide range of automotive service providers to keep your vehicle
            running smoothly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className={`rounded-xl shadow-lg overflow-hidden hover-scale ${
                isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
              }`}
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">
                    {formatPrice(service.price)}
                  </span>
                  <Link to={`/service-providers/${service.id}`}>
                    <Button variant="secondary">Learn More</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;