
import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OTPLoginForm from "@/components/auth/OTPLoginForm";

const OtpLogin = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>OTP Login | WheelsTrust</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Login with OTP</h1>
          
          <div className="mb-6">
            <Link to="/login" className="text-sm text-primary hover:underline flex items-center">
              ← Back to login options
            </Link>
          </div>
          
          <OTPLoginForm onComplete={handleComplete} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OtpLogin;
