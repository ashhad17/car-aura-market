
import { CheckCircle } from 'lucide-react';

const ValueSection = () => {
  const benefits = [
    {
      title: "Transparent Pricing",
      description: "Clear pricing information with no hidden costs or markups."
    },
    {
      title: "Verified Service Providers",
      description: "All service providers undergo thorough background checks."
    },
    {
      title: "Vehicle History Reports",
      description: "Complete history reports available for all listed vehicles."
    },
    {
      title: "Secure Transactions",
      description: "Protected payment system for worry-free transactions."
    },
    {
      title: "Price Comparison Tools",
      description: "Compare prices across multiple providers to find the best deal."
    },
    {
      title: "Customer Reviews",
      description: "Authentic reviews from real customers to guide your decisions."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 animate-slide-right">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Building Trust Through <span className="text-accent">Transparency</span>
            </h2>
            <p className="text-gray-700 mb-8">
              At CarAura, we understand that trust is the foundation of any automotive transaction. 
              That's why we've built our platform with transparency at its core, ensuring every 
              interaction is fair, honest, and beneficial for all parties involved.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex">
                  <CheckCircle className="h-6 w-6 text-accent mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-1/2 animate-slide-left">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-lg"></div>
              <div className="bg-white rounded-lg p-6 relative">
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h4 className="font-bold text-primary">Service Comparison</h4>
                        <p className="text-sm text-gray-500">Nearby Providers</p>
                      </div>
                      <button className="text-accent text-sm font-medium">View All</button>
                    </div>
                    
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-medium">Premium Auto Service</h5>
                            <div className="flex items-center mt-1">
                              <span className="text-yellow-500 text-sm">★★★★★</span>
                              <span className="text-gray-500 text-xs ml-1">(128)</span>
                            </div>
                            <span className="block text-xs text-gray-500 mt-1">2.3 miles away</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-primary">$89.99</span>
                            <span className="block text-xs text-gray-500">Basic Service</span>
                            <button className="text-xs text-accent mt-1">Book Now</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <button className="w-full mt-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-md hover:bg-accent/20 transition-colors">
                      Compare More Options
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
