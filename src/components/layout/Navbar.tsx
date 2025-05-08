
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useScrollPosition } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Bell, User, LogOut, Settings, Car } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrolled = useScrollPosition(50);
  const { pathname } = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Close the mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary mr-2">
                Wheels<span className="text-secondary">Trust</span>
              </span>
            </Link>

            <nav className="ml-8 hidden md:flex space-x-6">
              <Link
                to="/cars/buy"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.includes("/cars") ? "text-primary" : "text-gray-600"
                }`}
              >
                Buy Cars
              </Link>
              <Link
                to="/cars/sell"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.includes("/cars") ? "text-primary" : "text-gray-600"
                }`}
              >
                Sell Car
              </Link>
              <Link
                to="/services"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/services" ? "text-primary" : "text-gray-600"
                }`}
              >
                Services
              </Link>
              <Link
                to="/service-providers"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/service-providers" ? "text-primary" : "text-gray-600"
                }`}
              >
                Service Providers
              </Link>
              <Link
                to="/find-your-car"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/find-your-car" ? "text-primary" : "text-gray-600"
                }`}
              >
                Find Your Car
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/about" ? "text-primary" : "text-gray-600"
                }`}
              >
                About
              </Link>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/notifications" className="relative">
                  <Bell className="h-5 w-5 text-gray-600 hover:text-primary transition-colors" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                    3
                  </span>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user?.avatar || ""}
                          alt={user?.name || "User avatar"}
                        />
                        <AvatarFallback className="bg-primary text-white">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    
                    {user?.role === 'admin' && (
                      <DropdownMenuItem onClick={() => navigate('/admin-dashboard')}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </DropdownMenuItem>
                    )}
                    
                    {user?.role === 'service_provider' && (
                      <DropdownMenuItem onClick={() => navigate('/service-provider-dashboard')}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Provider Dashboard</span>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={handleLogin}
                  className="transition-colors"
                >
                  Login
                </Button>
                <Button
                  onClick={handleSignUp}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        } border-t`}
      >
        <div className="space-y-1 px-4 py-3">
          <Link
            to="/cars/buy"
            className="block py-2 text-base font-medium text-gray-700 hover:text-primary"
          >
            Buy Cars
          </Link>
          <Link
            to="/services"
            className="block py-2 text-base font-medium text-gray-700 hover:text-primary"
          >
            Services
          </Link>
          <Link
            to="/service-providers"
            className="block py-2 text-base font-medium text-gray-700 hover:text-primary"
          >
            Service Providers
          </Link>
          <Link
            to="/find-your-car"
            className="block py-2 text-base font-medium text-gray-700 hover:text-primary"
          >
            Find Your Car
          </Link>
          <Link
            to="/about"
            className="block py-2 text-base font-medium text-gray-700 hover:text-primary"
          >
            About
          </Link>
          <div className="py-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block py-2 text-base font-medium text-gray-700 hover:text-primary"
                >
                  Profile
                </Link>
                <Link
                  to="/notifications"
                  className="block py-2 text-base font-medium text-gray-700 hover:text-primary"
                >
                  Notifications
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin-dashboard"
                    className="block py-2 text-base font-medium text-gray-700 hover:text-primary"
                  >
                    Admin Dashboard
                  </Link>
                )}
                {user?.role === 'service_provider' && (
                  <Link
                    to="/service-provider-dashboard"
                    className="block py-2 text-base font-medium text-gray-700 hover:text-primary"
                  >
                    Provider Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-base font-medium text-gray-700 hover:text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="pt-4 pb-2 space-y-2">
                <Button
                  onClick={handleLogin}
                  variant="outline"
                  className="w-full"
                >
                  Login
                </Button>
                <Button 
                  onClick={handleSignUp} 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
