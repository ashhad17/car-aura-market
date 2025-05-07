
import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUp = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Sign Up | WheelsTrust</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
          
          <SignUpForm 
            onComplete={handleComplete}
            onCancel={handleCancel}
          />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignUp;
