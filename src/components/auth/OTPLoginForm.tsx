
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

interface OTPLoginFormProps {
  onComplete: () => void;
}

const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const otpStep1Schema = z.object({
  phone: z.string()
    .refine(value => phoneRegex.test(value), {
      message: 'Please enter a valid phone number',
    }),
});

const otpStep2Schema = z.object({
  otp: z.string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d+$/, 'OTP can only contain numbers'),
});

type OTPStep1Values = z.infer<typeof otpStep1Schema>;
type OTPStep2Values = z.infer<typeof otpStep2Schema>;

const OTPLoginForm: React.FC<OTPLoginFormProps> = ({
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { loginWithOtp } = useAuth();

  const step1Form = useForm<OTPStep1Values>({
    resolver: zodResolver(otpStep1Schema),
    defaultValues: {
      phone: '',
    },
  });

  const step2Form = useForm<OTPStep2Values>({
    resolver: zodResolver(otpStep2Schema),
    defaultValues: {
      otp: '',
    },
  });

  const handleStep1Submit = async (data: OTPStep1Values) => {
    setIsLoading(true);
    setError(null);
    setPhone(data.phone);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/auth/send-otp`,
        { phone: data.phone }
      );

      toast({
        title: 'OTP Sent',
        description: 'A verification code has been sent to your phone',
      });
      
      setStep(2);
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Failed to send OTP. Please try again.');
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Failed to send OTP',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2Submit = async (data: OTPStep2Values) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, we'd verify the OTP with the backend
      const response = await loginWithOtp(phone, data.otp);
      
      toast({
        title: 'Success',
        description: 'You have successfully logged in',
      });
      
      onComplete();
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Invalid OTP. Please try again.');
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Invalid OTP',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    setIsLoading(true);
    
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/auth/resend-otp`,
        { phone }
      );
      
      toast({
        title: 'OTP Resent',
        description: 'A new verification code has been sent to your phone',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Failed to resend OTP',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {step === 1 ? 'Login with Phone' : 'Enter Verification Code'}
        </CardTitle>
        <CardDescription className="text-center">
          {step === 1 
            ? 'Enter your phone number to receive a verification code' 
            : `A 6-digit code has been sent to ${phone}`
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        {step === 1 ? (
          <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                {...step1Form.register('phone')}
                className="w-full"
              />
              {step1Form.formState.errors.phone && (
                <p className="text-sm text-destructive">
                  {step1Form.formState.errors.phone.message}
                </p>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Code'}
            </Button>
          </form>
        ) : (
          <form onSubmit={step2Form.handleSubmit(handleStep2Submit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <div className="flex justify-center">
                <Input
                  id="otp"
                  placeholder="Enter 6-digit code"
                  {...step2Form.register('otp')}
                  className="w-full text-center tracking-widest font-mono text-lg"
                  maxLength={6}
                />
              </div>
              {step2Form.formState.errors.otp && (
                <p className="text-sm text-destructive text-center">
                  {step2Form.formState.errors.otp.message}
                </p>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Didn't receive a code?
              </p>
              <Button
                type="button"
                variant="link"
                onClick={resendOTP}
                disabled={isLoading}
                className="h-auto p-0"
              >
                Resend Code
              </Button>
            </div>
          </form>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => setStep(1)}
          className={step === 1 ? 'hidden' : ''}
        >
          Change Phone Number
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OTPLoginForm;
