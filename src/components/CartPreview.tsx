
import React from 'react';
import { X, ShoppingBag, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartPreviewProps {
  onClose: () => void;
}

const CartPreview: React.FC<CartPreviewProps> = ({ onClose }) => {
  // Dummy cart items
  const cartItems = [
    {
      id: '1',
      name: 'Quantum X Headphones',
      price: 299.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: '3',
      name: 'Aero Ultralight Laptop',
      price: 1499.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: '4',
      name: 'Pulse Smartwatch',
      price: 349.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop'
    }
  ];

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed top-0 right-0 bottom-0 w-full md:w-96 bg-white shadow-2xl z-50 animate-slide-in-right overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-5 border-b">
        <div className="flex items-center gap-2">
          <ShoppingBag size={18} />
          <h2 className="font-medium">Your Cart</h2>
          <span className="text-sm text-muted-foreground">({cartItems.length})</span>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-3">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 border-b last:border-0">
            <div className="w-16 h-16 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">Qty: {item.quantity}</p>
              <p className="text-sm font-medium mt-1">${item.price.toFixed(2)}</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-destructive/10 hover:text-destructive">
              <X size={16} />
            </Button>
          </div>
        ))}
      </div>

      <div className="p-5 border-t bg-secondary/30">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Subtotal</span>
          <span className="text-sm font-semibold">${totalPrice.toFixed(2)}</span>
        </div>
        <Button className="w-full mb-3 h-12">
          Checkout
          <ChevronRight size={16} className="ml-1" />
        </Button>
        <Button variant="outline" className="w-full h-10" onClick={onClose}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default CartPreview;
