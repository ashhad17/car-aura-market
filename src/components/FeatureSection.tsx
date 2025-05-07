
import { Car, Settings, ShoppingCart } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: <ShoppingCart className="h-8 w-8 text-accent" />,
      title: "Buy With Confidence",
      description: "Browse verified listings with transparent history, fair pricing, and detailed vehicle information.",
      delay: "delay-200"
    },
    {
      icon: <Car className="h-8 w-8 text-accent" />,
      title: "Sell With Ease",
      description: "List your vehicle, reach qualified buyers, and get fair market value without the usual hassles.",
      delay: "delay-400"
    },
    {
      icon: <Settings className="h-8 w-8 text-accent" />,
      title: "Service With Trust",
      description: "Compare transparent service prices, book appointments, and get your vehicle serviced by verified experts.",
      delay: "delay-600"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-gray-600 text-lg">
            CarAura provides a comprehensive solution for all your automotive needs, 
            combining buying, selling, and servicing in one trusted platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-slide-up ${feature.delay}`}
            >
              <div className="bg-primary/5 p-4 inline-block rounded-lg mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center animate-fade-in delay-800">
          <button className="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
