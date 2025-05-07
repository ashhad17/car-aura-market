
import React, { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CarGrid from "@/components/car/CarGrid";
import { cars as carData, CarType } from "@/lib/data";
import { useAuthModal } from "@/components/auth/AuthModalProvider";

const CarsBuy = () => {
  const [cars, setCars] = useState<CarType[]>(carData);
  const { openModal: openAuthModal } = useAuthModal();

  return (
    <>
      <HelmetProvider>
        <title>Buy Cars | WheelsTrust</title>
      </HelmetProvider>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your Dream Car
          </h1>
          <CarGrid cars={cars} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CarsBuy;
