
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Mail, AlertCircle } from 'lucide-react';
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp';

interface OTPLoginFormProps {
  onComplete?: () => void;
}

const OTPLoginForm: React.FC<OTPLoginFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();
  const { isDark } = useTheme();

  const startCountdown = () => {
    setCountdown(30);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      startCountdown();
      toast({
        title: "OTP Sent!",
        description: `A verification code has been sent to ${email}`,
      });
    }, 1500);
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully",
      });
      if (onComplete) onComplete();
    }, 1500);
  };

  const handleResendOTP = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      startCountdown();
      toast({
        title: "OTP Resent!",
        description: `A new verification code has been sent to ${email}`,
      });
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {step === 'email' ? (
        <form onSubmit={handleSendOTP} className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <label htmlFor="email" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : ''}`}>Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 ${isDark ? 'bg-gray-800 border-gray-700 text-white' : ''}`}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
          </div>

          <div className={`p-3 rounded-md flex items-start gap-3 ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <AlertCircle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-blue-700'}`}>
              We'll send a verification code to your email address to confirm it's you.
            </p>
          </div>

          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full hover:scale-105 transition-all duration-300 hover:shadow-glow"
          >
            {loading ? 'Sending...' : 'Send Verification Code'}
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <div>
            <p className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Enter the 6-digit code sent to <span className="font-medium">{email}</span>
            </p>
            
            <div className="flex justify-center my-6">
              <InputOTP
                value={otp}
                onChange={(value) => setOtp(value)}
                maxLength={6}
                containerClassName="gap-2 sm:gap-4"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className={isDark ? 'bg-gray-800 border-gray-700 text-white' : ''} />
                  <InputOTPSlot index={1} className={isDark ? 'bg-gray-800 border-gray-700 text-white' : ''} />
                  <InputOTPSlot index={2} className={isDark ? 'bg-gray-800 border-gray-700 text-white' : ''} />
                  <InputOTPSlot index={3} className={isDark ? 'bg-gray-800 border-gray-700 text-white' : ''} />
                  <InputOTPSlot index={4} className={isDark ? 'bg-gray-800 border-gray-700 text-white' : ''} />
                  <InputOTPSlot index={5} className={isDark ? 'bg-gray-800 border-gray-700 text-white' : ''} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <Button 
            onClick={handleVerifyOTP} 
            disabled={loading || otp.length !== 6} 
            className="w-full hover:scale-105 transition-all duration-300 hover:shadow-glow"
          >
            {loading ? 'Verifying...' : 'Verify & Login'}
          </Button>

          <div className="text-center">
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              {countdown > 0 
                ? `Resend code in ${countdown}s` 
                : (
                  <Button 
                    variant="link" 
                    onClick={handleResendOTP} 
                    disabled={loading}
                    className={isDark ? 'text-primary' : ''}
                  >
                    Resend verification code
                  </Button>
                )
              }
            </p>
            <Button 
              variant="link" 
              onClick={() => setStep('email')}
              className={isDark ? 'text-primary mt-2' : 'mt-2'}
            >
              Change email address
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default OTPLoginForm;
