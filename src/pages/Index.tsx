import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import { ArrowRight, BadgeCheck, Truck, LifeBuoy, ShieldCheck, Sparkles, Cpu, Sofa, Shirt, Book, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api, Product } from '@/lib/api';

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showAllFeatured, setShowAllFeatured] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Show a preloader while content is loading
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
      </div>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  // Show message when no products are found
  if (products.length === 0) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background text-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary animate-bounce">
          No Products Found
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-6">
          Please add some products to get started
        </p>
        <Button onClick={() => window.location.reload()} size="lg">
          Refresh Page
        </Button>
      </div>
    );
  }

  // Get new arrivals (products with highest rating)
  const newArrivals = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Get unique categories from products
  const uniqueCategories = Array.from(new Set(products.map(product => product.category)));

  // Map category names to icons
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'beauty':
        return <Sparkles size={24} />;
      case 'electronics':
        return <Cpu size={24} />;
      case 'furniture':
        return <Sofa size={24} />;
      case 'clothing':
        return <Shirt size={24} />;
      case 'books':
        return <Book size={24} />;
      case 'sports':
        return <Trophy size={24} />;
      default:
        return <Sparkles size={24} />;
    }
  };

  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Truck className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">Free shipping on all orders over $50</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm animate-fade-in animate-stagger-1">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BadgeCheck className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Authentic Products</h3>
                  <p className="text-sm text-muted-foreground">100% authentic products guaranteed</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm animate-fade-in animate-stagger-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-medium mb-2">2-Year Warranty</h3>
                  <p className="text-sm text-muted-foreground">Extended warranty for peace of mind</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm animate-fade-in animate-stagger-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <LifeBuoy className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-medium mb-2">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">Customer support available at all times</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedProducts 
          products={products} 
          showAll={showAllFeatured}
          onShowAll={() => setShowAllFeatured(!showAllFeatured)}
        />
        
        {/* New Arrivals Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
              <div className="max-w-lg">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in">New Arrivals</h2>
                <p className="text-muted-foreground animate-fade-in animate-stagger-1">
                  Check out our latest products fresh off the innovation line.
                </p>
              </div>
              <Button variant="ghost" className="mt-4 md:mt-0 animate-fade-in animate-stagger-2">
                View All
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product, index) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm group transition-all hover:-translate-y-1 hover:shadow-md animate-scale-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-square overflow-hidden bg-secondary/20">
                    <img 
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-base mb-1">{product.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">${product.price.toFixed(2)}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs h-8 px-3 hover:bg-primary hover:text-white"
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-20 px-4 md:px-6 bg-secondary/20">
          <div className="container mx-auto">
            <div className="max-w-lg mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-fade-in">Shop by Category</h2>
              <p className="text-muted-foreground animate-fade-in animate-stagger-1">
                Browse our full collection of products organized by category.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {uniqueCategories.map((category, index) => (
                <div 
                  key={category}
                  className="bg-white p-6 rounded-xl shadow-sm text-center transition-all hover:-translate-y-1 hover:shadow-md animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="font-medium text-sm capitalize">{category}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {products.filter(p => p.category === category).length} Products
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 px-4 md:px-6 bg-primary/5 border-y">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-fade-in">
              Stay Updated with eStore
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto animate-fade-in animate-stagger-1">
              Subscribe to our newsletter for exclusive offers, product launches, and tech insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto animate-fade-in animate-stagger-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 h-12 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button className="h-12 px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
