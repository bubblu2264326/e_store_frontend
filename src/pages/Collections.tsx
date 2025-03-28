import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  productCount: number;
}

const collections: Collection[] = [
  {
    id: "electronics",
    title: "Electronics",
    description: "Latest gadgets and electronic devices",
    image: "https://picsum.photos/800/400?random=1",
    productCount: 150
  },
  {
    id: "clothing",
    title: "Fashion & Apparel",
    description: "Trendy clothing and accessories",
    image: "https://picsum.photos/800/400?random=2",
    productCount: 200
  },
  {
    id: "home-living",
    title: "Home & Living",
    description: "Furniture and home decor",
    image: "https://picsum.photos/800/400?random=3",
    productCount: 180
  },
  {
    id: "books",
    title: "Books & Stationery",
    description: "Books, notebooks, and writing supplies",
    image: "https://picsum.photos/800/400?random=4",
    productCount: 120
  }
];

const Collections: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Shop by Collection</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our curated collections of products, carefully selected to bring you the best in each category.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            to={`/collections/${collection.id}`}
            className="group relative overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="aspect-[2/1] overflow-hidden">
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{collection.title}</h2>
              <p className="text-white/80 mb-4">{collection.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-white/60">{collection.productCount} products</span>
                <ArrowRight className="text-white group-hover:translate-x-1 transition-transform" size={20} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured Collection */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Featured Collection</h2>
        <div className="bg-primary/5 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">New Arrivals</h3>
              <p className="text-muted-foreground mb-6">
                Be the first to discover our latest products. From cutting-edge electronics to trendy fashion pieces,
                our new arrivals collection is constantly updated with the freshest items.
              </p>
              <Link
                to="/collections/new-arrivals"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                Shop New Arrivals
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="https://picsum.photos/800/800?random=5"
                alt="New Arrivals"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections; 