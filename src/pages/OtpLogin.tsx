import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OTPLoginForm from "@/components/auth/OTPLoginForm";
import { useTheme } from "@/context/ThemeContext";

const OtpLogin = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleComplete = () => {
    navigate("/");
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <Helmet>
        <title>OTP Login | WheelsTrust</title>
      </Helmet>

      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12">
        <div className={`w-full max-w-md mx-auto p-8 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <h1 className="text-2xl font-bold text-center mb-6">Login with OTP</h1>

          <div className="mb-6 flex justify-between items-center">
            <Link to="/login" className={`text-sm ${theme === "dark" ? "text-blue-400" : "text-primary"} hover:underline flex items-center`}>
              ← Back to login options
            </Link>
            {/* <button
              onClick={toggleTheme}
              className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Toggle Theme
            </button> */}
          </div>

          <OTPLoginForm onComplete={handleComplete} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OtpLogin;