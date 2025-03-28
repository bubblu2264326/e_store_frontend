import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartSheet } from '@/components/CartSheet';

import { useCart } from '@/lib/cart';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="eStore Logo" className="h-12 md:h-16" />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium link-hover">
              Home
            </Link>
            <Link to="/shop" className="text-sm font-medium link-hover">
              Shop
            </Link>
            <Link to="/collections" className="text-sm font-medium link-hover">
              Collections
            </Link>
            <Link to="/about" className="text-sm font-medium link-hover">
              About
            </Link>
            <Link to="/manage" className="text-sm font-medium link-hover">
              Manage
            </Link>
          </nav>

          <div className="flex items-center space-x-3 md:space-x-5">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5">
              <User size={20} />
            </Button>
            <CartSheet />
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-black/5 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-slide-down">
          <div className="py-5 px-6 space-y-5">
            <Link to="/" className="block text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/shop" className="block text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Shop
            </Link>
            <Link to="/collections" className="block text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Collections
            </Link>
            <Link to="/about" className="block text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/manage" className="block text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Manage
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/collections"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Collections
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/manage"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Manage
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
