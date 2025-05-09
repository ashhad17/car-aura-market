
import React from "react";
import { services } from "@/lib/data";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

interface ServiceSectionProps {
  services?: any[];
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ services: providedServices }) => {
  const { isDark } = useTheme();
  const servicesToUse = providedServices || services;
  const featuredServices = servicesToUse.filter((service) => service.featured);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };
  
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.section 
      className={`section-padding ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          variants={headerVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our <span className="text-gradient">Service Providers</span>
          </h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            We offer a wide range of automotive service providers to keep your vehicle
            running smoothly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              className={`rounded-xl shadow-lg overflow-hidden border border-transparent transition-all duration-300 ${
                isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
              }`}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03,
                boxShadow: isDark ? 
                  '0 0 20px 2px rgba(59, 130, 246, 0.3)' : 
                  '0 0 20px 2px rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 0.5)'
              }}
            >
              <motion.img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <motion.span 
                    className="text-primary font-bold"
                    whileHover={{ scale: 1.1 }}
                  >
                    {formatPrice(service.price)}
                  </motion.span>
                  <Link to={`/service-providers/${service.id}`}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="secondary">Learn More</Button>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ServiceSection;
