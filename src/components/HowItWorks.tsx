
import { SearchIcon, ShoppingCart, Settings } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <SearchIcon className="h-8 w-8 text-white" />,
      title: "Search & Compare",
      description: "Browse listings or service providers with detailed information and transparent pricing.",
      color: "bg-primary",
      delay: "delay-200"
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-white" />,
      title: "Connect & Schedule",
      description: "Contact sellers directly or book service appointments with verified providers.",
      color: "bg-accent",
      delay: "delay-400"
    },
    {
      icon: <Settings className="h-8 w-8 text-white" />,
      title: "Complete & Review",
      description: "Finalize your transaction securely and share your experience to help others.",
      color: "bg-primary",
      delay: "delay-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            How CarAura Works
          </h2>
          <p className="text-gray-600 text-lg">
            Our platform makes it easy to buy, sell, or service your vehicle with just a few steps.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gray-200"></div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex-1 relative animate-slide-up ${step.delay}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-6 relative z-10`}>
                    {step.icon}
                    <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto animate-fade-in delay-800">
          <h3 className="text-2xl font-bold text-primary mb-4">Ready to Get Started?</h3>
          <p className="text-gray-600 mb-6">
            Join thousands of satisfied users who buy, sell, and service their vehicles with confidence.
          </p>
          <button className="px-8 py-3 bg-accent text-white font-medium rounded-full hover:bg-accent/90 transition-colors">
            Create Free Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
