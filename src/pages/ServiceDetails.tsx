
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Star, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Dummy service data
const serviceDetails = {
  id: "1",
  name: "Standard Oil Change",
  description: "Full synthetic oil change with filter replacement and multi-point inspection. Our certified technicians will change your oil, replace the filter, and check all your fluid levels to ensure your vehicle is running smoothly.",
  price: 49.99,
  duration: "30 mins",
  category: "maintenance",
  image: "https://images.unsplash.com/photo-1596040034934-22f29172a67e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  provider: {
    name: "Quick Lube Center",
    rating: 4.7,
    totalReviews: 132,
    address: "123 Auto Lane, Springfield, IL",
    phone: "(555) 123-4567",
    website: "https://quicklubecenter.example.com"
  },
  features: [
    "Same Day Service", 
    "Certified Mechanics", 
    "OEM Parts",
    "Free Multi-Point Inspection",
    "Warranty Included"
  ],
  includesDetails: [
    "Full synthetic oil (up to 5 quarts)",
    "New oil filter",
    "Fluid level check",
    "Tire pressure check",
    "Multi-point inspection",
    "Battery test"
  ],
  faqs: [
    {
      question: "How long does the service take?",
      answer: "The standard oil change service takes approximately 30 minutes to complete. However, wait times may vary depending on current shop volume."
    },
    {
      question: "Do you offer any warranty?",
      answer: "Yes, we offer a 90-day warranty on parts and labor for this service."
    },
    {
      question: "Can I wait while the service is being performed?",
      answer: "Yes, we have a comfortable waiting area with complimentary WiFi and refreshments."
    },
    {
      question: "What type of oil do you use?",
      answer: "We use premium full synthetic oil for all oil changes. We carry multiple brands and can accommodate specific requests."
    }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1596040034934-22f29172a67e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1636358807920-ef4e1aa45ab9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    "https://images.unsplash.com/photo-1627039119408-4a4e7c98a2f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  ],
  reviews: [
    {
      id: 1,
      author: "John D.",
      rating: 5,
      date: "2023-08-15",
      comment: "Great service! In and out in less than 30 minutes as promised. Very professional staff."
    },
    {
      id: 2,
      author: "Sarah M.",
      rating: 4,
      date: "2023-07-22",
      comment: "Good service but had to wait a bit longer than expected. Quality work otherwise."
    },
    {
      id: 3,
      author: "Robert L.",
      rating: 5,
      date: "2023-06-30",
      comment: "Excellent service. They found an issue with my coolant during the inspection and fixed it at no extra charge!"
    }
  ]
};

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>(serviceDetails.image);
  
  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setIsBookingDialogOpen(true);
  };
  
  const handleBookingSubmit = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing information",
        description: "Please select both a date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would normally submit the booking to an API
    setIsBookingDialogOpen(false);
    
    toast({
      title: "Booking Confirmed",
      description: `Your appointment is scheduled for ${format(selectedDate, 'PPP')} at ${selectedTime}.`,
    });
  };
  
  const availableTimes = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", 
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{serviceDetails.name} | WheelsTrust</title>
      </Helmet>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Hero Section */}
            <div className="relative h-72 md:h-96">
              <img 
                src={selectedImage}
                alt={serviceDetails.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="secondary" className="bg-primary text-white">
                    {serviceDetails.category.charAt(0).toUpperCase() + serviceDetails.category.slice(1)}
                  </Badge>
                  {serviceDetails.features.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="outline" className="bg-white/80 text-black">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {serviceDetails.name}
                </h1>
                <div className="flex items-center gap-2 text-white">
                  <div className="flex items-center">
                    <Star className="fill-yellow-500 text-yellow-500 h-4 w-4 mr-1" />
                    <span>{serviceDetails.provider.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-white/80">
                    ({serviceDetails.provider.totalReviews} reviews)
                  </span>
                  <span className="text-white/80 mx-2">•</span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {serviceDetails.duration}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column - Main Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold mb-1">
                        ${serviceDetails.price.toFixed(2)}
                      </h2>
                      <p className="text-gray-600">Provided by {serviceDetails.provider.name}</p>
                    </div>
                    <Button size="lg" onClick={handleBookNow}>
                      Book Now
                    </Button>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-3">Description</h3>
                    <p className="text-gray-700">{serviceDetails.description}</p>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-3">Service Includes</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {serviceDetails.includesDetails.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-3">Gallery</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {serviceDetails.gallery.map((image, index) => (
                        <img 
                          key={index}
                          src={image}
                          alt={`${serviceDetails.name} - image ${index+1}`}
                          className={`w-full h-24 object-cover rounded-md cursor-pointer transition-all ${selectedImage === image ? 'ring-2 ring-primary' : 'opacity-90 hover:opacity-100'}`}
                          onClick={() => setSelectedImage(image)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Tabs defaultValue="faq" className="w-full">
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="faq">FAQ</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        <TabsTrigger value="location">Location</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="faq">
                        <div className="space-y-4">
                          {serviceDetails.faqs.map((faq, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg">
                              <h4 className="font-medium mb-2">{faq.question}</h4>
                              <p className="text-gray-600 text-sm">{faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="reviews">
                        <div className="space-y-4">
                          {serviceDetails.reviews.map((review) => (
                            <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="font-medium">{review.author}</div>
                                  <div className="text-sm text-gray-500">{review.date}</div>
                                </div>
                                <div className="flex items-center text-yellow-500">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < review.rating ? "fill-yellow-500" : "fill-gray-300 text-gray-300"}`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="location">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-start gap-3 mb-3">
                            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">{serviceDetails.provider.name}</h4>
                              <p className="text-gray-600">{serviceDetails.provider.address}</p>
                            </div>
                          </div>
                          <div className="aspect-video bg-gray-200 rounded-lg mb-3">
                            {/* Map would be embedded here */}
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                              Map integration would be displayed here
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm">Get Directions</Button>
                            <Button variant="outline" size="sm">Contact Provider</Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
                
                {/* Right Column - Booking Card (Desktop) */}
                <div className="hidden md:block w-72 lg:w-80">
                  <div className="bg-gray-50 rounded-xl p-5 sticky top-24 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Book This Service</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label>Select Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal mt-1"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              initialFocus
                              disabled={(date) => 
                                date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                                date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div>
                        <Label>Select Time</Label>
                        <Select onValueChange={setSelectedTime}>
                          <SelectTrigger className="w-full mt-1">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableTimes.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Vehicle Info</Label>
                        <Select>
                          <SelectTrigger className="w-full mt-1">
                            <SelectValue placeholder="Select vehicle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="add-new">+ Add New Vehicle</SelectItem>
                            <SelectItem value="toyota-camry">Toyota Camry (2020)</SelectItem>
                            <SelectItem value="honda-accord">Honda Accord (2018)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Service Price</span>
                          <span>${serviceDetails.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>${serviceDetails.price.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full" onClick={handleBookNow}>
                        Book Now
                      </Button>
                      
                      <div className="text-xs text-gray-500 text-center">
                        <AlertCircle className="h-3 w-3 inline-block mr-1" />
                        You won't be charged until after the service is completed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Book {serviceDetails.name}</DialogTitle>
            <DialogDescription>
              Select your preferred date and time for this service
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    disabled={(date) => 
                      date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                      date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Select onValueChange={setSelectedTime}>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="vehicle">Vehicle</Label>
              <Select>
                <SelectTrigger id="vehicle">
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add-new">+ Add New Vehicle</SelectItem>
                  <SelectItem value="toyota-camry">Toyota Camry (2020)</SelectItem>
                  <SelectItem value="honda-accord">Honda Accord (2018)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Special Requests (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any special instructions or requests..."
                className="resize-none"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBookingSubmit}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ServiceDetails;
