import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SignUpForm from "@/components/auth/SignUpForm";
import { useTheme } from "@/context/ThemeContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme(); // Use `isDark` and `toggleTheme` from ThemeContext

  const handleComplete = () => {
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Helmet>
        <title>Sign Up | WheelsTrust</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className={`w-full max-w-md mx-auto p-8 rounded-lg shadow-md ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
          
          <SignUpForm 
            onComplete={handleComplete}
            onCancel={handleCancel}
          />
          
          <div className="mt-6 text-center">
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Already have an account?{" "}
              <Link to="/login" className={`${isDark ? "text-blue-400" : "text-primary"} hover:underline font-semibold`}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme} // Use the `toggleTheme` function from ThemeContext
          className={`px-4 py-2 rounded-md ${isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}`}
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default SignUp;