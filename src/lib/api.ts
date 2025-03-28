import axios from 'axios';
import { Product } from './types';


const API_BASE_URL = "https://estorebackend-production.up.railway.app"

export const api = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      console.log('Raw response:', response);
      console.log('Response data type:', typeof response.data);
      console.log('Response data:', JSON.stringify(response.data, null, 2));

      // If response.data is not an array, try to get the products from a nested property
      const productsArray = Array.isArray(response.data) ? response.data : 
                          response.data.products || response.data.data || [];

      if (!Array.isArray(productsArray)) {
        console.error('Expected array of products but got:', typeof productsArray);
        return [];
      }

      return productsArray.map((product: any, index: number) => {
        // Log each product for debugging
        console.log(`Processing product ${index}:`, product);

        // If id is undefined, generate a temporary one (not recommended for production)
        if (product.id === undefined) {
          console.warn(`Product at index ${index} has no ID:`, product);
          return null;
        }

        // Ensure id is a valid number
        const id = typeof product.id === 'string' ? parseInt(product.id, 10) : product.id;
        if (typeof id !== 'number' || isNaN(id)) {
          console.error('Invalid product ID:', product.id);
          return null;
        }

        return {
          id,
          title: product.title || 'Untitled Product',
          description: product.description || 'No description available',
          price: typeof product.price === 'number' ? product.price : 0,
          thumbnail: product.thumbnail || product.images?.[0] || 'https://placehold.co/400x400?text=No+Image',
          category: product.category || 'Uncategorized',
          rating: typeof product.rating === 'number' ? product.rating : 0,
          stock: typeof product.stock === 'number' ? product.stock : 0,
          discountPercentage: typeof product.discountPercentage === 'number' ? product.discountPercentage : 0,
          brand: product.brand || 'Generic',
          sku: product.sku || `SKU-${id}`,
          weight: typeof product.weight === 'number' ? product.weight : 1,
          dimensions: product.dimensions || {
            length: 10,
            width: 10,
            height: 10
          },
          material: product.material || 'Standard',
          color: product.color || 'Various',
          features: Array.isArray(product.features) ? product.features : [],
          warranty: product.warranty || '1 Year',
          shipping: product.shipping || {
            weight: 1,
            dimensions: '10x10x10'
          }
        };
      }).filter(Boolean) as Product[]; // Remove any null products
    } catch (error) {
      console.error('Error fetching products:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
      throw error;
    }
  },

  // Get a single product by ID
  getProductById: async (id: number): Promise<Product> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      const product = response.data;
      return {
        id: Number(product.id),
        title: product.title || 'Untitled Product',
        description: product.description || 'No description available',
        price: typeof product.price === 'number' ? product.price : 0,
        thumbnail: product.thumbnail || product.images?.[0] || 'https://placehold.co/400x400?text=No+Image',
        category: product.category || 'Uncategorized',
        rating: typeof product.rating === 'number' ? product.rating : 0,
        stock: typeof product.stock === 'number' ? product.stock : 0,
        discountPercentage: typeof product.discountPercentage === 'number' ? product.discountPercentage : 0,
        brand: product.brand || 'Generic',
        sku: product.sku || `SKU-${product.id}`,
        weight: typeof product.weight === 'number' ? product.weight : 1,
        dimensions: product.dimensions || {
          length: 10,
          width: 10,
          height: 10
        },
        material: product.material || 'Standard',
        color: product.color || 'Various',
        features: Array.isArray(product.features) ? product.features : [],
        warranty: product.warranty || '1 Year',
        shipping: product.shipping || {
          weight: 1,
          dimensions: '10x10x10'
        }
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Create a new product
  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    try {
      const productWithDefaults = {
        ...product,
        sku: product.sku || `SKU-${Date.now()}`,
        weight: product.weight || 1,
        dimensions: product.dimensions || {
          length: 10,
          width: 10,
          height: 10
        },
        material: product.material || 'Standard',
        color: product.color || 'Various',
        features: product.features || [],
        warranty: product.warranty || '1 Year',
        shipping: product.shipping || {
          weight: 1,
          dimensions: '10x10x10'
        }
      };
      
      const response = await axios.post(`${API_BASE_URL}/products`, productWithDefaults);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update a product
  updateProduct: async (id: number, product: Partial<Product>): Promise<Product> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, product);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete a product
  deleteProduct: async (id: number): Promise<void> => {
    try {
      // Ensure id is a valid number
      const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
      
      if (typeof numericId !== 'number' || isNaN(numericId) || numericId <= 0) {
        console.error('Invalid product ID:', id);
        throw new Error(`Invalid product ID: ${id}`);
      }
      
      console.log('Attempting to delete product with ID:', numericId); // Debug log
      const response = await axios.delete(`${API_BASE_URL}/products/${numericId}`);
      
      if (response.status !== 200 && response.status !== 204) {
        throw new Error(`Failed to delete product. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(`Failed to delete product: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          throw new Error('No response received from server. Please check if the backend server is running.');
        } else {
          throw new Error(`Error setting up delete request: ${error.message}`);
        }
      }
      throw error;
    }
  }
}; 
