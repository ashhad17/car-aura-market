
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/context/ThemeContext';
import { Star, User } from 'lucide-react';
import { motion } from 'framer-motion';

const reviewSchema = z.object({
  rating: z.number().min(1, { message: 'Please select a rating' }).max(5),
  comment: z.string().min(5, { message: 'Please enter at least 5 characters' }).max(500),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  onSubmit: (data: ReviewFormValues) => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, onCancel }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const { toast } = useToast();
  const { isDark } = useTheme();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });

  const handleSubmit = (data: ReviewFormValues) => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit({ ...data, rating });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}
    >
      <div className="mb-6">
        <h3 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : ''}`}>Write a Review</h3>
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Share your experience to help others make better decisions
        </p>
      </div>
      
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div>
          <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray-200' : ''}`}>Your Rating*</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className="focus:outline-none"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  className={`h-8 w-8 transition-colors ${
                    value <= (hoverRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : isDark ? 'text-gray-600' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            <span className={`ml-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </span>
          </div>
          {form.formState.errors.rating && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.rating.message}</p>
          )}
        </div>
        
        <div>
          <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray-200' : ''}`}>Your Review*</label>
          <Textarea
            {...form.register('comment')}
            placeholder="Tell us about your experience..."
            className={`min-h-[120px] ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
          />
          {form.formState.errors.comment && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.comment.message}</p>
          )}
        </div>
        
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className={isDark ? 'border-gray-600 hover:bg-gray-700' : ''}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="hover:scale-105 transition-all duration-300 hover:shadow-glow"
          >
            Submit Review
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ReviewForm;
