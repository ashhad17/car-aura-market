
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceGrid from "@/components/service/ServiceGrid";
import AuthModal from "@/components/auth/AuthModal";
import ServiceProviderModal from "@/components/partner/ServiceProviderModal";
import { Button } from "@/components/ui/button";

const Services = () => {
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Vehicle Services | WheelsTrust</title>
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
              onClick={() => setIsPartnerModalOpen(true)}
            >
              Become a Partner
            </Button>
          </div>
          
          {/* Use ServiceGrid without providing services - it will fetch them from API */}
          <ServiceGrid />
        </div>
      </main>
      <Footer />
      <AuthModal />
      <ServiceProviderModal 
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />
    </div>
  );
};

export default Services;
