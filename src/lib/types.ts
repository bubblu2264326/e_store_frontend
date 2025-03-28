export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
    rating: number;
    stock: number;
    discountPercentage: number;
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    material: string;
    color: string;
    features: string[];
    warranty: string;
    shipping: {
      weight: number;
      dimensions: string;
    };
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    total: number;
  }