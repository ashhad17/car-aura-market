
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ReviewList from "./ReviewList";
import ReviewModal from "./ReviewModal";
import { useToast } from "@/hooks/use-toast";

interface ServiceReviewsProps {
  serviceProviderId: string;
  rating?: number;
  reviewCount?: number;
}

const ServiceReviews: React.FC<ServiceReviewsProps> = ({
  serviceProviderId,
  rating = 0,
  reviewCount = 0,
}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to write a review",
        variant: "destructive",
      });
      return;
    }
    setIsReviewModalOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold">Customer Reviews</h3>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              Based on {reviewCount} review{reviewCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <Button
          onClick={handleWriteReview}
          className="mt-4 md:mt-0"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Write a Review
        </Button>
      </div>

      <ReviewList serviceProviderId={serviceProviderId} />
      
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        serviceProviderId={serviceProviderId}
      />
    </div>
  );
};

export default ServiceReviews;
