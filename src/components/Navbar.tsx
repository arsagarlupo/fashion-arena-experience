
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, User, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This will be connected to auth later

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="text-2xl font-display font-bold text-primary">Drobe</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
            </a>
            {!isLoggedIn ? (
              <Button variant="outline" className="hover-scale">
                Sign Up
              </Button>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">John Doe</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <a
              href="/"
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              About Us
            </a>
            {!isLoggedIn ? (
              <Button variant="outline" className="w-full">
                Sign Up
              </Button>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">John Doe</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
