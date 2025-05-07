
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ServicesList from "@/components/services/ServicesList";
import ServiceFilters from "@/components/services/ServiceFilters";

const Services = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = React.useState("all");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Automotive Services | WheelsTrust</title>
        <meta name="description" content="Browse our comprehensive automotive services including maintenance, repairs, detailing, and inspections." />
      </Helmet>
      <Navbar />
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Automotive <span className="text-primary">Services</span>
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of automotive services designed to keep your vehicle in optimal condition. 
              From routine maintenance to specialized repairs, our skilled professionals have got you covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div className="md:col-span-1">
              <ServiceFilters onFilterChange={setActiveCategory} activeFilter={activeCategory} />
            </div>
            
            <div className="md:col-span-3">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory} value={activeCategory}>
                <TabsList className="grid grid-cols-5 mb-8">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                  <TabsTrigger value="repair">Repair</TabsTrigger>
                  <TabsTrigger value="inspection">Inspection</TabsTrigger>
                  <TabsTrigger value="detailing">Detailing</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <ServicesList category={null} />
                </TabsContent>
                <TabsContent value="maintenance">
                  <ServicesList category="maintenance" />
                </TabsContent>
                <TabsContent value="repair">
                  <ServicesList category="repair" />
                </TabsContent>
                <TabsContent value="inspection">
                  <ServicesList category="inspection" />
                </TabsContent>
                <TabsContent value="detailing">
                  <ServicesList category="detailing" />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
