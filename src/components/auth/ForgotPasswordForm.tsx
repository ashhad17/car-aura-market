
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// Email schema
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// Password reset schema
const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .refine((value) => /[A-Z]/.test(value), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((value) => /[a-z]/.test(value), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((value) => /[0-9]/.test(value), {
      message: 'Password must contain at least one number',
    })
    .refine((value) => /[^A-Za-z0-9]/.test(value), {
      message: 'Password must contain at least one special character',
    }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type EmailFormValues = z.infer<typeof emailSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface ForgotPasswordFormProps {
  onCancel: () => void;
  onComplete: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onCancel, onComplete }) => {
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { toast } = useToast();

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Watch password to calculate strength
  React.useEffect(() => {
    const password = resetPasswordForm.watch('password');
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
  }, [resetPasswordForm.watch('password')]);

  // Handle email form submission
  const onEmailSubmit = async (data: EmailFormValues) => {
    setIsLoading(true);
    setEmail(data.email);
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/auth/forgot-password`,
        { email: data.email }
      );
  
      toast({
        title: "Reset Link Sent",
        description: response.data.message || "If an account exists with this email, you will receive password reset instructions.",
      });
  
      // Move to the reset password step
      setStep('reset');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to send password reset link. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reset password form submission
  const onResetSubmit = async (data: ResetPasswordFormValues) => {
    setIsLoading(true);

    try {
      // Simulate API request to reset password
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Password Reset Successful",
        description: "Your password has been reset successfully. You can now log in with your new password.",
      });

      // Complete the flow
      setTimeout(() => {
        onComplete();
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderPasswordStrengthIndicator = () => {
    const strengthText = [
      'Very Weak',
      'Weak',
      'Fair',
      'Good',
      'Strong'
    ];
    
    const strengthColors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-blue-500',
      'bg-green-500'
    ];

    return (
      <div className="mt-2">
        <div className="flex gap-1 h-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className={`h-full flex-1 rounded-full transition-colors duration-300 ${
                i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        {resetPasswordForm.watch('password') && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-xs mt-1"
            style={{ color: passwordStrength > 3 ? '#16a34a' : 
                           passwordStrength > 2 ? '#2563eb' : 
                           passwordStrength > 1 ? '#d97706' : '#ef4444' }}
          >
            {strengthText[passwordStrength - 1] || 'Very Weak'}
          </motion.p>
        )}
      </div>
    );
  };

  const containerVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {step === 'email' ? (
          <motion.div
            key="email-step"
            className="space-y-6"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Forgot Password?</h2>
              <p className="text-sm text-gray-500">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>

            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormLabel className={`absolute left-3 transition-all duration-200 ${
                          field.value ? '-top-2.5 bg-white px-1 text-xs' : 'top-2.5 text-sm text-gray-500'
                        }`}>
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            className={`pt-5 pl-3 h-14 ${field.value ? 'border-primary' : ''}`}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>

                  <Button 
                    type="submit" 
                    disabled={isLoading || !emailForm.formState.isValid}
                    className="flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Reset Link <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        ) : (
          <motion.div
            key="reset-step"
            className="space-y-6"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
              <p className="text-sm text-gray-500">
                Create a new password for your account
              </p>
            </div>

            <Form {...resetPasswordForm}>
              <form onSubmit={resetPasswordForm.handleSubmit(onResetSubmit)} className="space-y-4">
                <FormField
                  control={resetPasswordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormLabel className={`absolute left-3 transition-all duration-200 ${
                          field.value ? '-top-2.5 bg-white px-1 text-xs' : 'top-2.5 text-sm text-gray-500'
                        }`}>
                          New Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              {...field}
                              className={`pt-5 pl-3 h-14 pr-10 ${field.value ? 'border-primary' : ''}`}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </FormControl>
                        {renderPasswordStrengthIndicator()}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={resetPasswordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormLabel className={`absolute left-3 transition-all duration-200 ${
                          field.value ? '-top-2.5 bg-white px-1 text-xs' : 'top-2.5 text-sm text-gray-500'
                        }`}>
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            {...field}
                            className={`pt-5 pl-3 h-14 ${field.value ? 'border-primary' : ''}`}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setStep('email')}
                    className="flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>

                  <Button 
                    type="submit" 
                    disabled={isLoading || !resetPasswordForm.formState.isValid}
                    className="flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Resetting...
                      </>
                    ) : (
                      <>
                        Reset Password <CheckCircle className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForgotPasswordForm;
