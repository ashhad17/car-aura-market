
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User } from '@/types/user';
import { useAuthModal } from '@/components/auth/AuthModalProvider';

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  openAuthModal: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  updateUser: async () => false,
  openAuthModal: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { openModal } = useAuthModal();

  const checkAuthentication = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.data.success) {
        // Ensure user has both _id and id properties
        const userData = response.data.data;
        userData.id = userData._id;
        setUser(userData);
      } else {
        setUser(null);
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Login function called with:', { email });
      
      const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/auth/login`;
      console.log('Attempting to login at URL:', apiUrl);
      
      const response = await axios.post(
        apiUrl,
        { email, password }
      );
      
      console.log('Login response:', response.data);
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        
        // Ensure user has both _id and id properties
        const userData = response.data.data || response.data.user;
        console.log('User data received:', userData);
        
        if (!userData) {
          console.error('No user data received in successful response');
          return false;
        }
        
        userData.id = userData._id;
        
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        return true;
      }
      
      console.error('Login unsuccessful:', response.data);
      return false;
    } catch (error: any) {
      console.error('Login error:', error);
      console.error('Response data:', error.response?.data);
      console.error('Request config:', error.config);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      console.log('Signup function called with:', { email, name });
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/auth/register`,
        { email, password, name }
      );
      
      console.log('Signup response:', response.data);
      
      if (response.data.success) {
        // After successful signup, perform automatic login
        const loginSuccess = await login(email, password);
        return loginSuccess;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) return false;
      
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/auth/updatedetails`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.data.success) {
        // Ensure updated user has both _id and id
        const updatedUser = response.data.data;
        updatedUser.id = updatedUser._id;
        
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update user error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      signup, 
      logout, 
      updateUser,
      openAuthModal: openModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};
