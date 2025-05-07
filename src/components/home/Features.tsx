import React from "react";
import { Search, Info, Settings, LayoutDashboard } from "lucide-react";
import { features } from "@/lib/data";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const featureIcons = {
  search: <Search className="h-6 w-6" />,
  info: <Info className="h-6 w-6" />,
  settings: <Settings className="h-6 w-6" />,
  dashboard: <LayoutDashboard className="h-6 w-6" />,
};

const Features = () => {
  return (
    <section className="bg-gray-50 section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-gradient">WheelsTrust</span>
          </h2>
          <p className="text-gray-600">
            We're revolutionizing the way people buy, sell, and service vehicles by
            prioritizing transparency and building trust between all parties.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover-scale"
            >
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {featureIcons[feature.icon as keyof typeof featureIcons]}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        
        <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4">Are you a service provider?</h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <p className="text-gray-600 mb-6">
                        Join our network of trusted automotive professionals. Increase your visibility,
                        connect with customers, and grow your business with transparent pricing.
                    </p>
                
                    <Link to="/services">
                        <Button className="button-gradient text-white">
                            Partner With Us
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    </section>
  );
};

export default Features;
