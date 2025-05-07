
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBuyCar = () => {
    navigate("/cars/buy");
  };

  const handleSellCar = () => {
    if (isAuthenticated) {
      navigate("/cars/sell");
    } else {
      navigate("/login");
    }
  };

  const handleFindCar = () => {
    navigate("/find-your-car");
  };

  return (
    <section className="relative bg-gradient-to-b from-primary/5 to-transparent pt-32 pb-24 md:py-48">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find Your Perfect Car Match
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          WheelsTrust connects you with trusted sellers and verified vehicles.
          Buy, sell, or service your car with confidence.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={handleBuyCar}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Browse Cars
          </Button>
          <Button onClick={handleSellCar} size="lg" variant="outline">
            Sell Your Car
          </Button>
          <Button onClick={handleFindCar} size="lg" variant="secondary">
            Find Your Match
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
