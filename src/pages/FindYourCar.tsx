
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Car } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import axios from "axios";

interface Question {
  id: string;
  question: string;
  type: "single" | "multiple" | "slider";
  options?: Option[];
  min?: number;
  max?: number;
  step?: number;
}

interface Option {
  id: string;
  label: string;
  value: string;
}

interface CarRecommendation {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: "new" | "used" | "certified";
  status: "active" | "sold" | "pending" | "draft";
  images:
  {
    url: string;
    publicId:string;
  };
  match: number;
  description: string;
  features: string[];
  fuelType: string;
  transmission: string;
  bodyType: string;
  exteriorColor: string;
  seller: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    location: string;


  };
  totalDriven:string;
  createdAt: string;
}

const questions: Question[] = [
  
  {
    id: "budget",
    question: "What's your budget range?",
    type: "slider",
    min: 100000,
    max: 5000000,
    step: 10000
  },
  {
    id: "fuelType",
    question: "What type of fuel/power do you prefer?",
    type: "single",
    options: [
      { id: "gasoline", label: "Gasoline", value: "gasoline" },
      { id: "diesel", label: "Diesel", value: "diesel" },
      { id: "hybrid", label: "Hybrid", value: "hybrid" },
      { id: "electric", label: "Electric", value: "electric" }
    ]
  },
  {
    id: "transmission",
    question: "What type of transmission do you prefer?",
    type: "single",
    options: [
      { id: "automatic", label: "Automatic", value: "automatic" },
      { id: "manual", label: "Manual", value: "manual" }
    ]
  },
  {
    id: "bodyType",
    question: "What type of car body style do you prefer?",
    type: "single",
    options: [
      { id: "sedan", label: "Sedan", value: "sedan" },
      { id: "suv", label: "SUV", value: "suv" },
      { id: "hatchback", label: "Hatchback", value: "hatchback" },
      { id: "truck", label: "Truck", value: "truck" },
      { id: "coupe", label: "Coupe", value: "coupe" },
      { id: "convertible", label: "Convertible", value: "convertible" }
    ]
  },
  {
    id: "features",
    question: "Which features are most important to you?",
    type: "multiple",
    options: [
      { id: "bluetooth", label: "Bluetooth", value: "Bluetooth" },
      { id: "backupCamera", label: "Backup Camera", value: "Backup Camera" },
      { id: "navigation", label: "Navigation", value: "Navigation" },
      { id: "heatedSeats", label: "Heated Seats", value: "Heated Seats" },
      { id: "sunroof", label: "Sunroof", value: "Sunroof" },
      { id: "leatherSeats", label: "Leather Seats", value: "Leather Seats" },
      { id: "appleCarPlay", label: "Apple CarPlay", value: "Apple CarPlay" },
      { id: "androidAuto", label: "Android Auto", value: "Android Auto" },
      { id: "blindSpotMonitor", label: "Blind Spot Monitor", value: "Blind Spot Monitor" },
      { id: "laneDepartureWarning", label: "Lane Departure Warning", value: "Lane Departure Warning" },
      { id: "cruiseControl", label: "Cruise Control", value: "Cruise Control" },
      { id: "remoteStart", label: "Remote Start", value: "Remote Start" },
      { id: "keylessEntry", label: "Keyless Entry", value: "Keyless Entry" },
      { id: "premiumAudio", label: "Premium Audio", value: "Premium Audio" },
      { id: "thirdRowSeating", label: "Third Row Seating", value: "Third Row Seating" }
    ]
  },
  {
    id: "exteriorColor",
    question: "What exterior color do you prefer?",
    type: "single",
    options: [
      { id: "black", label: "Black", value: "black" },
      { id: "white", label: "White", value: "white" },
      { id: "silver", label: "Silver", value: "silver" },
      { id: "blue", label: "Blue", value: "blue" },
      { id: "red", label: "Red", value: "red" },
      { id: "other", label: "Other", value: "other" }
    ]
  },
  {
    id: "mileage",
    question: "What is the maximum mileage you're comfortable with?",
    type: "slider",
    min: 0,
    max: 100,
    step: 5
  }
];



const FindYourCar = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<CarRecommendation[]>([]);
  const { toast } = useToast();
  const [cars, setCars] = useState<CarRecommendation[]>([]); // Initialize as an empty array
  const navigate = useNavigate();
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/v1/cars`
        );
        console.log("Fetched cars:", response.data.data); // Debugging log
        setCars(response.data.data); // Assuming the backend returns cars in `response.data.cars`
      } catch (error) {
        console.error("Error fetching cars:", error);
        toast({
          title: "Error",
          description: "Failed to fetch cars. Please try again later.",
          variant: "destructive",
        });
      }
    };
  
    fetchCars();
  }, []);
  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleNext = () => {
    // Ensure the question is answered
    if (!answers[currentQuestion.id] && currentQuestion.type !== "slider") {
      toast({
        title: "Please answer the question",
        description: "Select an option to continue",
        variant: "destructive",
      });
      return;
    }
  
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Ensure cars are available before generating recommendations
      if (cars.length === 0) {
        toast({
          title: "No Cars Available",
          description: "Unable to generate recommendations as no cars are available.",
          variant: "destructive",
        });
        return;
      }
  
      generateRecommendations();
      setShowResults(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  const generateRecommendations = () => {
    if (!cars || cars.length === 0) {
      console.error("No cars available for recommendations.");
      return;
    }
  
    // Filter cars based on user answers
    const filteredCars = cars.filter((car) => {
      const statusMatch = car.status === "active"; // Only include active cars
      // const purposeMatch = !answers.purpose || car.features.includes(answers.purpose);
      const budgetMatch = !answers.budget || car.price <= parseInt(answers.budget, 10);
      const fuelTypeMatch =
        !answers.fuelType || car.fuelType?.toLowerCase() === answers.fuelType.toLowerCase();
      const transmissionMatch =
        !answers.transmission ||
        car.transmission?.toLowerCase() === answers.transmission.toLowerCase();
      const bodyTypeMatch =
        !answers.bodyType || car.bodyType?.toLowerCase() === answers.bodyType.toLowerCase();
      const featuresMatch =
        !answers.features ||
        answers.features.every((feature: string) => car.features.includes(feature));
      const exteriorColorMatch =
        !answers.exteriorColor ||
        car.exteriorColor?.toLowerCase() === answers.exteriorColor.toLowerCase();
      const mileageMatch = !answers.mileage || car.mileage <= parseInt(answers.mileage, 10);
  
      return (
        statusMatch &&
        budgetMatch &&
        fuelTypeMatch &&
        transmissionMatch &&
        bodyTypeMatch &&
        featuresMatch &&
        exteriorColorMatch &&
        mileageMatch
      );
    });
  
    setRecommendations(filteredCars);
  };
  const handleViewCarDetails = (carId: string) => {
    // In a real app, navigate to the actual car details page
    navigate(`/cars/details/${carId}`);
    
    toast({
      title: "Car Selected",
      description: "Navigating to car details page",
    });
  };
  
  const handleTestDrive = (carName: string) => {
    toast({
      title: "Test Drive Requested",
      description: `We'll contact you to schedule a test drive for the ${carName}.`,
    });
  };
  
  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };
  
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "single":
        return (
          <RadioGroup
            value={answers[currentQuestion.id] || ""}
            onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
            className="space-y-3"
          >
            {currentQuestion.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.id} />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );
        
      case "multiple":
        const selectedOptions = answers[currentQuestion.id] || [];
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={option.id}
                  checked={selectedOptions.includes(option.value)}
                  onChange={(e) => {
                    const value = option.value;
                    if (e.target.checked) {
                      handleAnswerChange(
                        currentQuestion.id,
                        [...selectedOptions, value]
                      );
                    } else {
                      handleAnswerChange(
                        currentQuestion.id,
                        selectedOptions.filter((v: string) => v !== value)
                      );
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </div>
        );
        
      case "slider":
        return (
          <div className="space-y-6">
            <Slider
              defaultValue={[answers[currentQuestion.id] || currentQuestion.min || 0]}
              max={currentQuestion.max}
              min={currentQuestion.min}
              step={currentQuestion.step}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value[0])}
            />
            <div className="flex justify-between items-center">
              <span>${currentQuestion.min?.toLocaleString()}</span>
              <span className="font-medium">${(answers[currentQuestion.id] || currentQuestion.min || 0).toLocaleString()}</span>
              <span>${currentQuestion.max?.toLocaleString()}</span>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Find Your Perfect Car | WheelsTrust</title>
        <meta name="description" content="Answer a few questions and we'll help you find the perfect car that matches your needs and preferences." />
      </Helmet>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {!showResults ? (
              <Card className="border shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl md:text-3xl">Find Your Perfect Car</CardTitle>
                  <CardDescription>
                    Answer a few questions to get personalized car recommendations
                  </CardDescription>
                  <Progress value={progress} className="mt-4" />
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                      {currentQuestionIndex + 1}. {currentQuestion.question}
                    </h2>
                    {renderQuestion()}
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  <Button onClick={handleNext}>
                    {currentQuestionIndex === questions.length - 1 ? "Get Results" : "Next"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Your Car Recommendations</h1>
                  <p className="text-gray-600">
                    Based on your preferences, here are the cars we think would be perfect for you
                  </p>
                </div>
                
                <div className="space-y-6">
  {recommendations.length > 0 ? (
    recommendations.map((car) => (
      <Card key={car._id} className="overflow-hidden border-0 shadow-lg transition-shadow hover:shadow-xl">
        <div className="md:flex">
          <div className="md:w-2/5">
            <img
              src={car.images?.[0] || "/placeholder.jpg"}
              alt={car.make+" "+car.model}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6 md:w-3/5">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-1">{car.make+" "+car.model}</h2>
                <p className="text-lg font-medium text-primary mb-2">${car.price.toLocaleString()}</p>
              </div>
              <div className="bg-primary/10 text-primary rounded-full px-3 py-1 font-semibold">
                {car.match || 0}% Match
              </div>
            </div>
            <p className="text-gray-600 mb-4">{car.description}</p>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => handleViewCarDetails(car._id)} className="flex-1">
                View Details
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => handleTestDrive(car.make+" "+car.model)}>
                <Car className="h-4 w-4 mr-2" />
                Test Drive
              </Button>
            </div>
          </div>
        </div>
      </Card>
    ))
  ) : (
    <div className="text-center py-10">
      <p className="text-gray-500">No cars found matching your criteria</p>
    </div>
  )}
</div>
                
                <div className="flex justify-center pt-6">
                  <Button variant="outline" onClick={handleRestart}>
                    Start Over
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindYourCar;
