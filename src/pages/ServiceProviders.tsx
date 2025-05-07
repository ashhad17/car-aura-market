
import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceGrid from "@/components/service/ServiceGrid";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const ServiceProviders = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handlePartnerClick = () => {
    if (isAuthenticated) {
      navigate('/service-provider-dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Service Providers | WheelsTrust</title>
      </Helmet>
      <Navbar />
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Service Providers
              </h1>
              <p className="text-gray-600 max-w-3xl">
                Find trusted service providers for maintenance, repairs, and 
                inspections. All service providers are vetted and reviewed by 
                our community of car owners.
              </p>
            </div>
            <Button 
              className="mt-4 md:mt-0 bg-primary hover:bg-primary/90"
              onClick={handlePartnerClick}
            >
              Become a Partner
            </Button>
          </div>
          
          <ServiceGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceProviders;
