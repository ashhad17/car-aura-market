
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  const [authView, setAuthView] = useState<"login" | "otp" | "forgot-password">("login");
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleOtpLogin = () => {
    navigate('/otp-login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Login | WheelsTrust</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Login to Your Account</h1>
          
          <LoginForm 
            onComplete={handleComplete}
            onForgotPassword={handleForgotPassword}
            onOtpLogin={handleOtpLogin}
          />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
