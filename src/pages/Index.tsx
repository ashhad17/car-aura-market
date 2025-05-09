
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CarListingPreview from "@/components/home/CarListingPreview";
import ServiceSection from "@/components/home/ServiceSection";
import Testimonials from "@/components/home/Testimonials";
import { services } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

const Index = () => {
  const navigate = useNavigate();
    const { isDark } = useTheme();
  const handlePartnerClick = () => {
    navigate('/service-provider-dashboard');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <CarListingPreview cars={[]} />
        <section className="py-16 bg-primary-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Partner With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Are you a service provider? Join our network of trusted mechanics, body shops,
              and inspection services to grow your business.
            </p>
            <Button 
              size="lg"
              className="px-8 bg-primary hover:bg-primary/90"
              onClick={handlePartnerClick}
            >
              Become a Service Partner
            </Button>
          </div>
        </section>
        <ServiceSection services={services} />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
