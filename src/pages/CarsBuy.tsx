
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CarGrid from "@/components/car/CarGrid";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

const CarsBuy = () => {
  const { openModal } = useAuthModal();
  const { isDark } = useTheme();

  return (
    <>
      <Helmet>
        <title>Buy Cars | WheelsTrust</title>
      </Helmet>
      
      <Navbar />
      
      <main className={`pt-24 pb-16 ${isDark ? 'bg-gray-900 text-white' : ''}`}>
        <section className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : ''}`}>Find Your Perfect Car</h1>
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              Browse our selection of quality vehicles from trusted sellers. Each car is verified 
              and comes with a detailed history report.
            </p>
            
            <div className="mt-6">
              <Button 
                className="hover:scale-105 transition-all duration-300 hover:shadow-glow mr-4"
                onClick={() => openModal("signup")}
              >
                Register to Save Favorites
              </Button>
              
              <Button 
                variant="outline" 
                className={`hover:scale-105 transition-all duration-300 ${
                  isDark ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : ''
                }`}
                onClick={() => window.location.href = "/find-your-car"}
              >
                Car Finder Tool
              </Button>
            </div>
          </motion.div>
          
          <CarGrid />
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default CarsBuy;
