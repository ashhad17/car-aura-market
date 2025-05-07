
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  User, 
  LogOut, 
  Bell, 
  MessageSquare,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle scroll event for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };
  
  // Get initials for avatar
  const getInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  // Navigate to profile or dashboard based on user role
  const handleProfileClick = () => {
    if (user?.role === 'admin') {
      navigate('/admin-dashboard');
    } else if (user?.role === 'service_provider') {
      navigate('/service-provider-dashboard'); 
    } else {
      navigate('/profile');
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">
              WheelsTrust
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 ${
                location.pathname === '/' ? 'text-primary' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/cars/buy" 
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 ${
                location.pathname.includes('/cars') ? 'text-primary' : 'text-gray-700'
              }`}
            >
              Buy Cars
            </Link>
            <Link 
              to="/cars/sell" 
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 ${
                location.pathname === '/cars/sell' ? 'text-primary' : 'text-gray-700'
              }`}
            >
              Sell Car
            </Link>
            <Link 
              to="/services" 
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 ${
                location.pathname.includes('/services') ? 'text-primary' : 'text-gray-700'
              }`}
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 ${
                location.pathname === '/about' ? 'text-primary' : 'text-gray-700'
              }`}
            >
              About
            </Link>
          </nav>
          
          {/* Account/Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                {/* Notifications */}
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => navigate('/notifications')}
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                    2
                  </Badge>
                </Button>
                
                {/* Messages */}
                <Button 
                  variant="ghost" 
                  size="icon"
                >
                  <MessageSquare className="h-5 w-5" />
                </Button>
                
                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <div className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full pr-3">
                      <Avatar>
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden lg:inline text-sm font-medium text-gray-900">
                        {user?.name?.split(' ')[0]}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    
                    <DropdownMenuItem onClick={handleProfileClick}>
                      <User className="mr-2 h-4 w-4" />
                      <span>{user?.role === 'admin' ? 'Admin Dashboard' : 
                              user?.role === 'service_provider' ? 'Provider Dashboard' : 
                              'My Profile'}</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => navigate('/notifications')}>
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleLoginClick}>
                  Login
                </Button>
                <Button onClick={handleSignupClick}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-2">
            <div className="border-t border-gray-200 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/' ? 'bg-gray-100 text-primary' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/cars/buy" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname.includes('/cars') && !location.pathname.includes('/sell') ? 
                    'bg-gray-100 text-primary' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Buy Cars
              </Link>
              <Link 
                to="/cars/sell" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/cars/sell' ? 'bg-gray-100 text-primary' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Sell Car
              </Link>
              <Link 
                to="/services" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname.includes('/services') ? 'bg-gray-100 text-primary' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Services
              </Link>
              <Link 
                to="/about" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/about' ? 'bg-gray-100 text-primary' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                About
              </Link>
              
              {/* Authentication for mobile */}
              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-200 pt-2"></div>
                  <div 
                    className="flex items-center px-3 py-2"
                    onClick={handleProfileClick}
                  >
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500">{
                        user?.role === 'admin' ? 'Admin' :
                        user?.role === 'service_provider' ? 'Service Provider' : 
                        'User'
                      }</p>
                    </div>
                  </div>
                  <Link 
                    to="/notifications" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <Bell className="mr-2 h-5 w-5" />
                      Notifications
                    </div>
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout
                    </div>
                  </button>
                </>
              ) : (
                <div className="border-t border-gray-200 pt-4 flex space-x-2 px-3">
                  <Button variant="outline" onClick={handleLoginClick} className="flex-1">
                    Login
                  </Button>
                  <Button onClick={handleSignupClick} className="flex-1">
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
