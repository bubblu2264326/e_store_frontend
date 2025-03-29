import React, { useState } from 'react';
import { X, ShoppingBag, ChevronRight, ChevronLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { toast } from 'sonner';
import { useCart } from '@/lib/cart';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Add the product to cart with the selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    toast.success(`Added ${quantity} ${product.title} to your cart`, {
      description: `$${(product.price * quantity).toFixed(2)}`,
      action: {
        label: "View Cart",
        onClick: () => console.log("View cart clicked")
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-white rounded-xl shadow-xl animate-scale-up">
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-4 right-4 z-10 rounded-full"
          onClick={onClose}
        >
          <X size={18} />
        </Button>
        
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="w-full md:w-1/2 h-[300px] md:h-auto relative bg-secondary/20">
            <img 
              src={product.thumbnail} 
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div className="w-full md:w-1/2 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium py-1 px-2 bg-primary/10 text-primary rounded">
                {product.category}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-xs font-medium py-1 px-2 bg-green-500/10 text-green-600 rounded">
                  {product.discountPercentage}% OFF
                </span>
              )}
              {product.stock < 10 && (
                <span className="text-xs font-medium py-1 px-2 bg-red-500/10 text-red-600 rounded">
                  Low Stock
                </span>
              )}
            </div>
            
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={`${
                      i < Math.floor(product.rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            
            <div className="mb-4">
              <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
              {product.discountPercentage > 0 && (
                <p className="text-sm text-muted-foreground line-through">
                  ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                </p>
              )}
            </div>
            
            <div className="mb-6">
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            {/* Product details */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3">Product Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Brand</span>
                  <span className="text-sm font-medium">{product.brand}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">SKU</span>
                  <span className="text-sm font-medium">{product.sku}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Weight</span>
                  <span className="text-sm font-medium">{product.weight}g</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Stock</span>
                  <span className="text-sm font-medium">{product.stock} units</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Material</span>
                  <span className="text-sm font-medium">{product.material}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Color</span>
                  <span className="text-sm font-medium">{product.color}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Warranty</span>
                  <span className="text-sm font-medium">{product.warranty}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Shipping</span>
                  <span className="text-sm font-medium">{product.shipping.dimensions}</span>
                </div>
              </div>
            </div>
            
            {/* Features */}
            {product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3">Features</h3>
                <ul className="list-disc list-inside space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-sm text-muted-foreground">{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-l border-r-0"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                  -
                </Button>
                <div className="h-8 px-4 flex items-center justify-center border-y">
                  {quantity}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-r border-l-0"
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                className="h-12 flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} className="mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="h-12 flex-1"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
