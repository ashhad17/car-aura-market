
import React, { useState } from "react";
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
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  features: string[];
  match: number;
}

const questions: Question[] = [
  {
    id: "purpose",
    question: "What will you primarily use this car for?",
    type: "single",
    options: [
      { id: "commuting", label: "Daily commuting", value: "commuting" },
      { id: "family", label: "Family transportation", value: "family" },
      { id: "adventure", label: "Off-road/Adventure", value: "adventure" },
      { id: "luxury", label: "Luxury/Comfort", value: "luxury" },
      { id: "sport", label: "Performance/Sport", value: "sport" }
    ]
  },
  {
    id: "passengers",
    question: "How many passengers do you need to accommodate?",
    type: "single",
    options: [
      { id: "1-2", label: "1-2 people", value: "1-2" },
      { id: "3-5", label: "3-5 people", value: "3-5" },
      { id: "6+", label: "6+ people", value: "6+" }
    ]
  },
  {
    id: "budget",
    question: "What's your budget range?",
    type: "slider",
    min: 5000,
    max: 100000,
    step: 5000
  },
  {
    id: "fuel",
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
    id: "features",
    question: "Which features are most important to you?",
    type: "multiple",
    options: [
      { id: "safety", label: "Safety features", value: "safety" },
      { id: "tech", label: "Technology/Infotainment", value: "tech" },
      { id: "comfort", label: "Comfort/Luxury", value: "comfort" },
      { id: "performance", label: "Performance", value: "performance" },
      { id: "efficiency", label: "Fuel efficiency", value: "efficiency" },
      { id: "reliability", label: "Reliability/Durability", value: "reliability" }
    ]
  }
];

// Sample car recommendations
const carRecommendations: CarRecommendation[] = [
  {
    id: "1",
    name: "Toyota Camry",
    price: "$26,420",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description: "Reliable mid-size sedan with excellent fuel economy and a comfortable ride.",
    features: ["32 MPG combined", "5 seats", "Reliability", "Standard safety features"],
    match: 98
  },
  {
    id: "2",
    name: "Honda CR-V",
    price: "$31,610",
    image: "https://images.unsplash.com/photo-1568844293986-ca411afa7978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description: "Versatile compact SUV with ample cargo space and room for five passengers.",
    features: ["30 MPG combined", "5 seats", "AWD available", "Spacious interior"],
    match: 92
  },
  {
    id: "3",
    name: "Tesla Model 3",
    price: "$40,240",
    image: "https://images.unsplash.com/photo-1549925245-f20a1244218d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description: "Electric sedan with impressive range, rapid acceleration, and cutting-edge technology.",
    features: ["358 miles range", "5 seats", "Advanced tech", "Low operating cost"],
    match: 89
  }
];

const FindYourCar = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<CarRecommendation[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  
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
        variant: "destructive"
      });
      return;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Generate recommendations (in a real app, this would use a more sophisticated algorithm)
      // For demo purposes, we're just displaying pre-defined recommendations
      setRecommendations(carRecommendations);
      setShowResults(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
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
                  {recommendations.map((car) => (
                    <Card key={car.id} className="overflow-hidden border-0 shadow-lg transition-shadow hover:shadow-xl">
                      <div className="md:flex">
                        <div className="md:w-2/5">
                          <img 
                            src={car.image} 
                            alt={car.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-6 md:w-3/5">
                          <div className="flex justify-between items-start">
                            <div>
                              <h2 className="text-2xl font-bold mb-1">{car.name}</h2>
                              <p className="text-lg font-medium text-primary mb-2">{car.price}</p>
                            </div>
                            <div className="bg-primary/10 text-primary rounded-full px-3 py-1 font-semibold">
                              {car.match}% Match
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
                            <Button
                              onClick={() => handleViewCarDetails(car.id)}
                              className="flex-1"
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleTestDrive(car.name)}
                            >
                              <Car className="h-4 w-4 mr-2" />
                              Test Drive
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
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
