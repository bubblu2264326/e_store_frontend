import React, { useState } from 'react';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { Product } from '@/lib/api';

interface FeaturedProductsProps {
  products: Product[];
  showAll: boolean;
  onShowAll: () => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, showAll, onShowAll }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // Get featured products (products with highest rating)
  const featuredProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, showAll ? products.length : 4);
  
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };
  
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <div className="max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in">Featured Products</h2>
            <p className="text-muted-foreground animate-fade-in animate-stagger-1">
              Explore our handpicked collection of innovative tech designed to elevate your experience.
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="mt-4 md:mt-0 animate-fade-in animate-stagger-2"
            onClick={onShowAll}
          >
            {showAll ? (
              <>
                Show Less
                <ArrowUp size={16} className="ml-2" />
              </>
            ) : (
              <>
                View All
                <ArrowRight size={16} className="ml-2" />
              </>
            )}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className={`animate-scale-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard 
                product={product} 
                onViewDetails={handleViewDetails} 
              />
            </div>
          ))}
        </div>
        
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={handleCloseModal} 
          />
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
