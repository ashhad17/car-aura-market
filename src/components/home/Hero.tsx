
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleBuyCar = () => {
    navigate("/cars/buy");
  };

  const handleSellCar = () => {
    if (isAuthenticated) {
      navigate("/cars/sell");
    } else {
      navigate("/login");
    }
  };

  const handleFindCar = () => {
    navigate("/find-your-car");
  };

  return (
    <section className={`relative min-h-screen pt-16 pb-24 md:py-48 overflow-hidden ${
      isDark ? 'bg-gradient-to-b from-gray-900/50 to-black/80' : 'bg-gradient-to-b from-primary/5 to-transparent'
    }`}>
      
      <div className="absolute top-20 right-0 w-3/4 h-3/4 opacity-10">
        <motion.div 
          className={`absolute rounded-full ${isDark ? 'bg-blue-500' : 'bg-primary'} w-96 h-96 blur-3xl -top-20 -right-20`}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        <motion.div 
          className={`absolute rounded-full ${isDark ? 'bg-purple-500' : 'bg-accent'} w-64 h-64 blur-3xl bottom-10 left-10`}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 py-20 z-10 relative">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="max-w-xl md:mr-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              <span className={`${isDark ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'text-gradient'} bg-clip-text text-transparent`}>
                The smarter way
              </span>
              <br />
              to buy, sell & service your car
            </h1>
            <motion.p 
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-8`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              A transparent marketplace built on trust, connecting vehicle owners with reliable buyers and trusted service providers.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="hidden md:block relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop"
              alt="Car hero"
              className="rounded-lg shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div 
              className={`absolute -bottom-5 -left-5 ${isDark ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center">
                <div className={`${isDark ? 'bg-green-900/30' : 'bg-green-100'} p-2 rounded-full mr-3`}>
                  <svg className={`h-6 w-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Verified Sellers</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>100% transparency & trust</p>
                </div>
              </div>
            </motion.div>

            {/* Add floating car animations */}
            <motion.div 
              className="absolute -top-10 -right-16 w-24 h-24"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, 0] 
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3202/3202926.png" 
                alt="Car icon" 
                className="w-full h-full object-contain opacity-80" 
              />
            </motion.div>

            <motion.div 
              className="absolute -bottom-10 right-20 w-16 h-16"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -8, 0] 
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1 
              }}
            >
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3774/3774278.png" 
                alt="Car icon" 
                className="w-full h-full object-contain opacity-80" 
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Find Your Perfect Car Match
        </motion.h1>
        <motion.p 
          className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto mb-8`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          WheelsTrust connects you with trusted sellers and verified vehicles.
          Buy, sell, or service your car with confidence.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleBuyCar}
              size="lg"
              variant="glow"
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Browse Cars
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleSellCar} size="lg" variant="outline" className="glow-btn">
              Sell Your Car
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleFindCar} size="lg" variant="secondary" className="glow-btn">
              Find Your Match
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Add animated car silhouette at the bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full overflow-hidden h-16 z-10"
        style={{ opacity: 0.2 }}
      >
        <motion.div
          initial={{ x: -500 }}
          animate={{ x: window.innerWidth + 500 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 left-0"
        >
          <svg width="180" height="60" viewBox="0 0 180 60" fill={isDark ? "white" : "black"} xmlns="http://www.w3.org/2000/svg">
            <path d="M39.5,12.2c-2.5-1-5.2-1.5-8-1.5H22.8l-5.3,13.3h-13L0,35.7V46h7.7c0,0,0,4,3.5,4s3.5-4,3.5-4h121.9c0,0,0,4,3.5,4
              s3.5-4,3.5-4H180V35.9l-4.8-12.7c0,0-1-2.5-3.5-2.5h-32.4l-5.2-2.7c-3-1.5-6.2-2.3-9.6-2.3h-23.2c-3.2,0-6.4,0.8-9.3,2.3L82,24.7
              H58.7l-5-13.2C51.3,11.5,39.5,12.2,39.5,12.2z M14.3,38.5c-3.6,0-6.5-2.9-6.5-6.5S10.7,25.5,14.3,25.5s6.5,2.9,6.5,6.5
              S17.9,38.5,14.3,38.5z M140.1,38.5c-3.6,0-6.5-2.9-6.5-6.5s2.9-6.5,6.5-6.5s6.5,2.9,6.5,6.5S143.7,38.5,140.1,38.5z M24.5,20.7h8.5c3.2,0,6.3,0.7,9.2,2.1
              L59.7,31h14.8l13.5-9c2.5-1.7,5.5-2.5,8.5-2.5h23.2c3.3,0,6.5,0.8,9.5,2.3l17.1,9.1h28.7l2.5-7.5h-76.6c-2.8-2.7-6.5-4.1-10.3-4.1
              c-3.8,0-7.7,1.4-10.4,4.1H31.4L24.5,20.7z"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
