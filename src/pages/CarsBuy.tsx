
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CarGrid from "@/components/car/CarGrid";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/components/auth/AuthModalProvider";

const CarsBuy = () => {
  const { openModal } = useAuthModal();

  return (
    <>
      <Helmet>
        <title>Buy Cars | WheelsTrust</title>
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Car</h1>
            <p className="text-gray-600 mb-6">
              Browse our selection of quality vehicles from trusted sellers. Each car is verified 
              and comes with a detailed history report.
            </p>
          </div>
          
          {/* Update CarGrid to not pass statusFilter if it's not supported */}
          <CarGrid />
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default CarsBuy;
