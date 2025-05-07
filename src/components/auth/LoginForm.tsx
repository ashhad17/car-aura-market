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
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onComplete: () => void;
  onForgotPassword: () => void;
  onOtpLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onComplete, onForgotPassword, onOtpLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real app, you would make an API call here to authenticate the user
      // const response = await axios.post('/api/login', data);
      // if (response.data.success) {
      //   onComplete();
      // } else {
      //   toast({
      //     title: "Error",
      //     description: "Invalid credentials. Please try again.",
      //     variant: "destructive",
      //   });
      // }

      // For demo purposes, we'll just simulate a successful login
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
      });

      setTimeout(() => {
        onComplete();
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormLabel className={`absolute left-3 transition-all duration-200 ${
                    field.value ? '-top-2.5 bg-white px-1 text-xs' : 'top-2.5 text-sm text-gray-500'
                  }`}>
                    Password
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
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button variant="link" onClick={onForgotPassword}>
              Forgot password?
            </Button>
            <Button variant="link" onClick={onOtpLogin}>
              Login with OTP
            </Button>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Login
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
