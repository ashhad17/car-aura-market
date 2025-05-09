
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, MessageSquare, User } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import ReviewForm from './ReviewForm';
import ReviewItem from './ReviewItem';
import { motion } from 'framer-motion';

interface ReviewsSectionProps {
  entityId: string;
  entityType: 'service' | 'car' | 'serviceProvider';
  initialRating?: number;
  initialReviewCount?: number;
}

// Sample review data (in a real app, this would come from your API)
const sampleReviews = [
  {
    id: '1',
    rating: 5,
    comment: 'Excellent service! My car looks brand new after the detailing. The team was very professional and thorough.',
    userName: 'John D.',
    createdAt: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
  },
  {
    id: '2',
    rating: 4,
    comment: 'Good service overall. They took great care of the interior, though I would have liked a bit more attention to the wheels.',
    userName: 'Sarah M.',
    createdAt: new Date(Date.now() - 1209600000).toISOString(), // 2 weeks ago
  },
  {
    id: '3',
    rating: 5,
    comment: 'I\'ve been using their services for years and they never disappoint. Always professional, always on time.',
    userName: 'Michael T.',
    createdAt: new Date(Date.now() - 2592000000).toISOString(), // 1 month ago
  },
];

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ 
  entityId, 
  entityType,
  initialRating = 4.5,
  initialReviewCount = 3
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState(sampleReviews);
  const [rating, setRating] = useState(initialRating);
  const [reviewCount, setReviewCount] = useState(initialReviewCount);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const { isDark } = useTheme();

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to write a review",
        variant: "destructive",
      });
      return;
    }
    setShowReviewForm(true);
  };

  const handleReviewSubmit = (data: any) => {
    const newReview = {
      id: Date.now().toString(),
      rating: data.rating,
      comment: data.comment,
      userName: user?.name || 'Anonymous',
      userImage: user?.avatar,
      createdAt: new Date().toISOString(),
    };

    // Add the new review to the top of the list
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    
    // Recalculate the average rating
    const totalRating = updatedReviews.reduce((acc, review) => acc + review.rating, 0);
    const newAverage = totalRating / updatedReviews.length;
    setRating(parseFloat(newAverage.toFixed(1)));
    setReviewCount(updatedReviews.length);
    
    setShowReviewForm(false);
    
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
  };

  const ratingDistribution = {
    5: Math.round(reviewCount * 0.65),
    4: Math.round(reviewCount * 0.25),
    3: Math.round(reviewCount * 0.07),
    2: Math.round(reviewCount * 0.02),
    1: Math.round(reviewCount * 0.01),
  };

  return (
    <Card className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg transition-all duration-300`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : ''}`}>Customer Reviews</h2>
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : isDark ? "text-gray-600" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className={`ml-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <strong>{rating}</strong> out of 5 ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>
        <Button
          onClick={handleWriteReview}
          className="mt-4 md:mt-0 hover:scale-105 transition-all duration-300 hover:shadow-glow"
          variant="glow"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Write a Review
        </Button>
      </div>

      {/* Rating Distribution */}
      <div className={`mb-8 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : ''}`}>Rating Distribution</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center">
              <div className="flex items-center w-16">
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{star}</span>
                <Star className={`ml-1 h-4 w-4 ${isDark ? 'text-yellow-400' : 'text-yellow-500'} fill-yellow-400`} />
              </div>
              <div className="w-full ml-2">
                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-600">
                  <div
                    className="h-2 rounded-full bg-yellow-400"
                    style={{ width: `${(ratingDistribution[star as keyof typeof ratingDistribution] / reviewCount) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className={`ml-2 w-10 text-right text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {ratingDistribution[star as keyof typeof ratingDistribution]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {showReviewForm && (
        <div className="mb-6">
          <ReviewForm
            onSubmit={handleReviewSubmit}
            onCancel={() => setShowReviewForm(false)}
          />
        </div>
      )}

      <div className={`rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white border'} mb-6`}>
        <h3 className={`px-4 py-3 border-b ${isDark ? 'text-white border-gray-600' : ''}`}>Recent Reviews</h3>
        <div className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))
          ) : (
            <div className={`p-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No reviews yet. Be the first to leave a review!
            </div>
          )}
        </div>
      </div>

      {reviewCount > 3 && (
        <div className="flex justify-center">
          <Button variant="outline" className={isDark ? 'border-gray-700 hover:bg-gray-700' : ''}>
            View All {reviewCount} Reviews
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ReviewsSection;
