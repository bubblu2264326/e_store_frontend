import React from 'react';
import { ShoppingBag, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cart';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm overflow-hidden transition-all product-card-hover">
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full bg-white shadow-md hover:bg-primary hover:text-white transition-all"
              onClick={() => onViewDetails(product)}
            >
              <Eye size={18} />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full bg-white shadow-md hover:bg-primary hover:text-white transition-all"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} />
            </Button>
          </div>
        </div>
        
        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discountPercentage > 0 && (
            <span className="text-[10px] font-medium py-1 px-2 bg-primary text-white rounded">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.stock < 10 && (
            <span className="text-[10px] font-medium py-1 px-2 bg-red-500 text-white rounded">
              LOW STOCK
            </span>
          )}
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-medium text-muted-foreground">{product.category}</p>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        </div>
        <h3 className="font-medium text-base mb-1 line-clamp-1">{product.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 h-10">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">${product.price.toFixed(2)}</p>
            {product.discountPercentage > 0 && (
              <p className="text-xs text-muted-foreground line-through">
                ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
              </p>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-8 px-3 hover:bg-primary hover:text-white"
            onClick={() => onViewDetails(product)}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
