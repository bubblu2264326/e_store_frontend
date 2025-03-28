
import React from 'react';
import { ArrowRight, ArrowDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-28 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 space-y-6 md:pr-10 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight animate-fade-in">
              The Future of <span className="text-primary">Technology</span> is Here
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in animate-stagger-1">
              Discover our collection of cutting-edge devices that redefine what's possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-stagger-2">
              <Button className="h-12 px-8 text-sm">
                Shop Now
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button variant="outline" className="h-12 px-8 text-sm">
                Explore Products
              </Button>
            </div>
            <div className="flex items-center gap-10 pt-6 animate-fade-in animate-stagger-3">
              <div>
                <p className="text-3xl md:text-4xl font-bold">100+</p>
                <p className="text-sm text-muted-foreground mt-1">Products</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">50k+</p>
                <p className="text-sm text-muted-foreground mt-1">Customers</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">99%</p>
                <p className="text-sm text-muted-foreground mt-1">Satisfaction</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-10 md:mt-0 z-10">
            <div className="relative h-[500px] w-full">
              {/* Main product image */}
              <div className="absolute top-1/4 left-16  w-80 h-80 rounded-3xl overflow-hidden shadow-2xl animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop" 
                  alt="Featured Product" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Background decorative elements */}
              <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/10 animate-pulse-soft"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-primary/5"></div>
              
              {/* Floating product cards */}
              <div className="absolute top-5 left-10 w-48 p-3 bg-white rounded-lg shadow-lg animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-secondary">
                    <img 
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=100&auto=format&fit=crop" 
                      alt="Smart Watch" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium">Pulse Smartwatch</h3>
                    <p className="text-xs text-muted-foreground mt-1">$349.99</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-10 right-16 w-48 p-3 bg-white rounded-lg shadow-lg animate-float" style={{animationDelay: '1.5s'}}>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-secondary">
                    <img 
                      src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=100&auto=format&fit=crop" 
                      alt="Earbuds" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium">SoundForm Pro</h3>
                    <p className="text-xs text-muted-foreground mt-1">$199.99</p>
                  </div>
                </div>
              </div>
              
              {/* Arrow decoration */}
              <div className="absolute -bottom-5 left-1/3 hidden md:block">
                <ArrowDownRight size={32} className="text-muted-foreground/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient blur */}
      <div className="absolute top-32 right-0 w-2/3 h-96 bg-primary/10 rounded-full opacity-70 blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default HeroSection;
