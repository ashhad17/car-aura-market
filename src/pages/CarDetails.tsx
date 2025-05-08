
import React, { useState, useEffect } from "react";
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
import { 
  Calendar as CalendarIcon, 
  Phone, 
  Clock, 
  Star, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  Car, 
  Share,
  LogOut,
  Settings, 
  Heart, 
  Info, 
  Shield, 
  Fuel, 
  Gauge,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

// Sample car data
const carData = {
  id: "1",
  title: "2020 Toyota Camry XSE",
  price: 25999,
  year: 2020,
  mileage: 35000,
  condition: "Used - Excellent",
  exteriorColor: "Pearl White",
  interiorColor: "Black",
  fuelType: "Gasoline",
  transmission: "Automatic",
  drivetrain: "FWD",
  engine: "2.5L 4-Cylinder",
  vin: "4T1BF1FK5LU123456",
  description: "This beautiful Toyota Camry XSE is in excellent condition with low mileage. It features a premium sound system, leather seats, and advanced safety features. The car has been well maintained and comes with a clean history report.",
  features: [
    "Leather Seats",
    "Navigation System",
    "Bluetooth",
    "Backup Camera",
    "Sunroof/Moonroof",
    "Heated Seats",
    "Apple CarPlay/Android Auto",
    "Blind Spot Monitoring",
    "Lane Departure Warning",
    "Keyless Entry & Start"
  ],
  images: [
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1543465077-db45d34b88a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1734&q=80"
  ],
  seller: {
    id: "s1",
    name: "Premium Auto Sales",
    type: "Dealer",
    rating: 4.8,
    reviewCount: 124,
    location: "Springfield, IL",
    phone: "(555) 123-4567",
    email: "sales@premiumauto.example.com"
  },
  location: "Springfield, IL",
  listedDate: "2023-07-15"
};
interface CarListing {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: "new" | "used" | "certified";
  status: "active" | "sold" | "pending" | "draft";
  images: {
    url: string;
    publicId: string;
  }[];
  description: string;
  features: string[];
  seller: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  totalDriven: string;
  createdAt: string;
  exteriorColor?: string;
  interiorColor?: string;
  fuelType?: string;
  transmission?: string;
  sellerType?: string;
  location?: string;
}

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [carDetails, setCarDetails] = useState<CarListing | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  useEffect(() => {
    const fetchCarDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<{ success: boolean; data: CarListing }>(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/cars/${id}`
        );
    
        if (response.data.success) {
          setCarDetails(response.data.data);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch car details",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast({
          title: "Error",
          description: "Failed to load car details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchCarDetails();
  }, [id]);
  
  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    toast({
      title: "Booking Confirmed",
      description: `Your booking request for ${carDetails?.year} ${carDetails?.make} ${carDetails?.model} has been submitted.`,
    });
  };

  const handleTestDrive = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setIsBookingDialogOpen(true);
  };
  
  const handleTestDriveSubmit = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing information",
        description: "Please select both a date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }
    
    setIsBookingDialogOpen(false);
    
    toast({
      title: "Test Drive Scheduled",
      description: `Your test drive is scheduled for ${format(selectedDate, 'PPP')} at ${selectedTime}.`,
    });
  };
  
  const handleAddToFavorites = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    toast({
      title: "Added to Favorites",
      description: "This car has been added to your favorites.",
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    
    toast({
      title: "Link Copied",
      description: "Car listing URL copied to clipboard.",
    });
  };
  
  const availableTimes = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", 
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"
  ];

  const nextImage = () => {
    if (!carDetails?.images) return;
    setSelectedImageIndex((prev) => 
      prev === carDetails.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!carDetails?.images) return;
    setSelectedImageIndex((prev) => 
      prev === 0 ? carDetails.images.length - 1 : prev - 1
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <Skeleton className="h-96 w-full rounded-lg" />
                <div className="grid grid-cols-5 gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-md" />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4 rounded-md" />
                <Skeleton className="h-6 w-1/2 rounded-md" />
                <Skeleton className="h-6 w-1/3 rounded-md" />
                <Skeleton className="h-40 w-full rounded-md" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 flex-1 rounded-md" />
                  <Skeleton className="h-10 flex-1 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!carDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Car Not Found</h1>
            <p className="text-gray-600 mb-4">The car listing you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/cars/buy')}>Browse Cars</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{`${carDetails.make} ${carDetails.model} | WheelsTrust`}</title>
        <meta name="description" content={`${carDetails.year} ${carDetails.make} ${carDetails.model} - ${carDetails.mileage.toLocaleString()} miles - ₹${carDetails.price.toLocaleString()}`} />
      </Helmet>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Images */}
            <div className="md:col-span-2">
              <div className="relative mb-4 rounded-lg overflow-hidden group">
                <img 
                  src={carDetails.images[selectedImageIndex].url} 
                  alt={`${carDetails.make} ${carDetails.model}`}
                  className="w-full h-96 object-cover rounded-lg transition-transform duration-500"
                />
                
                {carDetails.images.length > 1 && (
                  <>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-6 w-6 text-white" />
                      <span className="sr-only">Previous image</span>
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-6 w-6 text-white" />
                      <span className="sr-only">Next image</span>
                    </Button>
                    
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                      {carDetails.images.map((_, index) => (
                        <button
                          key={index}
                          className={`h-2 rounded-full transition-all ${
                            selectedImageIndex === index ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white/80"
                          }`}
                          onClick={() => setSelectedImageIndex(index)}
                          aria-label={`View image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {carDetails.images.map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer rounded-md overflow-hidden ${
                      selectedImageIndex === index ? "ring-2 ring-primary" : "opacity-80 hover:opacity-100"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img 
                      src={image.url}
                      alt={`${carDetails.make} ${carDetails.model} - image ${index+1}`}
                      className="h-20 w-full object-cover transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Column - Car Details */}
            <div>
              <div className="bg-card rounded-lg shadow-sm p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl font-bold">{carDetails.make} {carDetails.model}</h1>
                    <p className="text-muted-foreground">{carDetails.condition}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      variant="outline"
                      onClick={handleAddToFavorites}
                      title="Add to favorites"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline"
                      onClick={handleShare}
                      title="Share"
                    >
                      <Share className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-primary mb-6">
                  ₹{carDetails.price.toLocaleString()}
                </div>
                
                <div className="grid grid-cols-2 gap-y-3 mb-6">
                  <div className="flex items-center">
                    <Gauge className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>{carDetails.mileage.toLocaleString()} miles</span>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>{carDetails.fuelType || "Not specified"}</span>
                  </div>
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>{carDetails.transmission || "Not specified"}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>{carDetails.location || "Not specified"}</span>
                  </div>
                </div>
                
                <div className="flex gap-3 mb-6">
                  <Button 
                    className="flex-1"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleTestDrive}
                  >
                    <Car className="h-4 w-4 mr-2" />
                    Test Drive
                  </Button>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>Listed on {new Date(carDetails.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {carDetails.seller?.name?.charAt(0) || 'S'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{carDetails.seller?.name || "Seller"}</h3>
                    <div className="flex items-center text-sm">
                      <span className="text-muted-foreground">{carDetails.sellerType || "Private Seller"}</span>
                      {carDetails.seller?.phone && (
                        <>
                          <span className="mx-2">•</span>
                          <div className="flex items-center text-muted-foreground">
                            <Phone className="h-4 w-4 mr-1" />
                            <span>{carDetails.seller.phone}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {carDetails.location && (
                  <div className="flex items-center mt-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">{carDetails.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Tabs Section */}
          <div className="mt-8">
            <Tabs defaultValue="details">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="history">Vehicle History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="bg-card rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Make</span>
                    <span className="font-medium">{carDetails.make}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Model</span>
                    <span className="font-medium">{carDetails.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year</span>
                    <span className="font-medium">{carDetails.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mileage</span>
                    <span className="font-medium">{carDetails.mileage.toLocaleString()} miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Exterior Color</span>
                    <span className="font-medium">{carDetails.exteriorColor || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Interior Color</span>
                    <span className="font-medium">{carDetails.interiorColor || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fuel Type</span>
                    <span className="font-medium">{carDetails.fuelType || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transmission</span>
                    <span className="font-medium">{carDetails.transmission || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Driven</span>
                    <span className="font-medium">{carDetails.totalDriven || "Not specified"}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-foreground mb-4">{carDetails.description}</p>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Info className="h-4 w-4 mr-1" />
                  <span>Report any issues with this listing</span>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="bg-card rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Features & Options</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {carDetails.features && carDetails.features.length > 0 ? (
                    carDetails.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))
                  ) : (
                    <p className="col-span-full text-muted-foreground">No features listed for this vehicle.</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="bg-card rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Vehicle History</h2>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
                    <Shield className="h-4 w-4 mr-1" />
                    Clean History
                  </Badge>
                </div>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="mr-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="h-full w-0.5 bg-muted mx-auto my-1"></div>
                    </div>
                    <div>
                      <h3 className="font-medium">No Accidents or Damage</h3>
                      <p className="text-muted-foreground text-sm">No accidents or damage reported</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="h-full w-0.5 bg-muted mx-auto my-1"></div>
                    </div>
                    <div>
                      <h3 className="font-medium">Regular Service History</h3>
                      <p className="text-muted-foreground text-sm">Vehicle has been regularly serviced</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">Single Owner</h3>
                      <p className="text-muted-foreground text-sm">Vehicle has had only one previous owner</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule a Test Drive</DialogTitle>
            <DialogDescription>
              Select your preferred date and time to test drive this {carDetails.year} {carDetails.make} {carDetails.model}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Select Date</Label>
              <div className="border rounded-md p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="pointer-events-auto"
                  disabled={(date) => 
                    date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                    date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                  }
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="time">Select Time</Label>
              <Select onValueChange={setSelectedTime}>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select a time" />
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
            <Button onClick={handleTestDriveSubmit}>
              Schedule Test Drive
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default CarDetails;
