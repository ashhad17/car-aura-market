
import React from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CarForm from '@/components/car/CarForm';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useNavigate } from 'react-router-dom';

const CarsSell = () => {
  const { isAuthenticated } = useRequireAuth();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/profile');
  };

  const handleCancel = () => {
    navigate('/cars/buy');
  };

  return (
    <>
      <Helmet>
        <title>Sell Your Car | WheelsTrust</title>
        <meta name="description" content="Sell your car with WheelsTrust - a transparent and trusted platform for car sellers." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-center mb-6">Sell Your Car</h1>
              <p className="text-gray-600 text-center mb-8">
                Fill out the form below to list your car on WheelsTrust and reach thousands of potential buyers.
              </p>
              
              {isAuthenticated && (
                <CarForm 
                  onSuccess={handleSuccess}
                  onCancel={handleCancel}
                />
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CarsSell;
