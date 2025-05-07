
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthModalProvider } from '@/components/auth/AuthModalProvider';
// import { AuthProvider } from '@/context/AuthContext';
// import { HelmetProvider } from 'react-helmet-async';
// import Index from '@/pages/Index';
// import Cars from '@/pages/Cars';
// import CarsBuy from '@/pages/CarsBuy';
// import CarsSell from '@/pages/CarsSell';
// import CarDetails from '@/pages/CarDetails';
// import Services from '@/pages/Services';
// import ServiceDetails from '@/pages/ServiceDetails';
// import About from '@/pages/About';
// import NotFound from '@/pages/NotFound';
// import Profile from '@/pages/Profile';
// import AdminDashboard from '@/pages/AdminDashboard';
// import ServiceProviderDashboard from '@/pages/ServiceProviderDashboard';
// import Notifications from '@/pages/Notifications';

// function App() {
//   return (
//     <HelmetProvider>
//       <Router>
//         <AuthModalProvider>
//           <AuthProvider>
//             <Routes>
//               <Route path="/" element={<Index />} />
//               <Route path="/cars" element={<Cars />} />
//               <Route path="/cars/buy" element={<CarsBuy />} />
//               <Route path="/cars/sell" element={<CarsSell />} />
//               <Route path="/cars/:id" element={<CarDetails />} />
//               <Route path="/services" element={<Services />} />
//               <Route path="/services/:id" element={<ServiceDetails />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/admin-dashboard" element={<AdminDashboard />} />
//               <Route path="/service-provider-dashboard" element={<ServiceProviderDashboard />} />
//               <Route path="/notifications" element={<Notifications />} />
//               <Route path="/dashboard" element={<Navigate to="/profile" replace />} />
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </AuthProvider>
//         </AuthModalProvider>
//       </Router>
//     </HelmetProvider>
//   );
// }

// export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import CarsBuy from "./pages/CarsBuy";
import CarsSell from "./pages/CarsSell";
import CarDetails from "./pages/CarDetails";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";
import ServiceProviderDashboard from "./pages/ServiceProviderDashboard";
import NotFound from "./pages/NotFound";
import ChatSystem from "./components/chat/ChatSystem";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cars/buy" element={<CarsBuy />} />
              <Route path="/cars/sell" element={<CarsSell />} />
              <Route path="/cars/details/:id" element={<CarDetails />} />
              {/* Redirect /cars to /cars/buy */}
              <Route path="/cars" element={<Navigate to="/cars/buy" replace />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
              <Route path="/service-provider-dashboard/*" element={<ServiceProviderDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ChatSystem minimized={true} />
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
