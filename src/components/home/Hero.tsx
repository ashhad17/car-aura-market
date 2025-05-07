
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
    <section className="relative min-h-screen bg-gradient-to-b  from-primary/5 to-transparent pt-16 pb-24 md:py-48">
      
      <div className="absolute top-20 right-0 w-3/4 h-3/4 opacity-10">
        <div className="absolute rounded-full bg-primary w-96 h-96 blur-3xl -top-20 -right-20"></div>
        <div className="absolute rounded-full bg-accent w-64 h-64 blur-3xl bottom-10 left-10"></div>
      </div>

      <div className="container mx-auto px-4 py-20 z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="max-w-xl md:mr-auto animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              <span className="text-gradient">The smarter way</span>
              <br />
              to buy, sell & service your car
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              A transparent marketplace built on trust, connecting vehicle owners with reliable buyers and trusted service providers.
            </p>
            
            
          </div>
          
          <div className="hidden md:block relative">
            <img
              src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop"
              alt="Car hero"
              className="rounded-lg shadow-2xl transform hover-scale animate-scale-in"
            />
            
            <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg animate-slide-in-bottom">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Verified Sellers</p>
                  <p className="text-sm text-gray-600">100% transparency & trust</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
