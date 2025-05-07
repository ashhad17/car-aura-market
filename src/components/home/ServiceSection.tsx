
import React from "react";
import { services } from "@/lib/data";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface ServiceSectionProps {
  // Make it optional to allow default behavior
  services?: any[];
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ services: providedServices }) => {
  // Use provided services or fall back to imported services
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
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-gray-600">
            We offer a wide range of automotive services to keep your vehicle
            running smoothly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover-scale"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">
                    {formatPrice(service.price)}
                  </span>
                  <Link to={`/services/${service.id}`}>
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
