
import { Car, ShieldCheck, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background element */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[10%] -right-[10%] w-[45%] h-[40%] bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-[80px]"></div>
        <div className="absolute top-[60%] -left-[5%] w-[35%] h-[40%] bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-[80px]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 animate-slide-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Your Ultimate Car Platform for 
              <span className="text-accent"> Buy, Sell & Service</span>
            </h1>
            <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-lg">
              Experience transparency and trust in every automotive transaction. Connect with verified buyers, sellers, and service providers in one place.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-accent text-white font-medium rounded-full hover:bg-accent/90 transition-colors">
                Get Started
              </button>
              <button className="px-8 py-3 border border-primary text-primary font-medium rounded-full hover:bg-primary/5 transition-colors">
                Learn More
              </button>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
              <div className="flex items-center">
                <ShieldCheck className="text-accent mr-2 h-6 w-6" />
                <span className="text-gray-700 font-medium">Verified Providers</span>
              </div>
              <div className="flex items-center">
                <Star className="text-accent mr-2 h-6 w-6" />
                <span className="text-gray-700 font-medium">Transparent Pricing</span>
              </div>
              <div className="flex items-center">
                <Car className="text-accent mr-2 h-6 w-6" />
                <span className="text-gray-700 font-medium">10K+ Listings</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 animate-slide-left">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary to-accent p-1 rounded-2xl rotate-3 shadow-xl">
                <div className="bg-white p-1 rounded-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop" 
                    alt="Car marketplace" 
                    className="w-full h-auto rounded-lg" 
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3">
                <div className="bg-green-100 rounded-full p-2">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">100% Verified</p>
                  <p className="text-xs text-gray-500">All listings checked</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <Star className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">4.9/5 Rating</p>
                  <p className="text-xs text-gray-500">From 2K+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
