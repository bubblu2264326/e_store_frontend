import React from 'react';
import { Mail, Phone, MapPin, Globe, Clock } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <img src="/logo.png" alt="eStore Logo" className="h-24 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">About eStore</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your One-Stop Shopping Destination for Quality Products
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              eStore was founded with a simple mission: to provide high-quality products at competitive prices 
              while delivering exceptional customer service. Since our inception, we've grown to become one 
              of the most trusted online shopping destinations.
            </p>
            <p className="text-gray-600">
              We carefully curate our product selection to ensure that we offer only the best to our 
              customers. Our team works tirelessly to source products from reliable manufacturers and 
              brands that share our commitment to quality.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="font-semibold mr-2">Quality:</span> We never compromise on the quality of our products
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Customer First:</span> Your satisfaction is our top priority
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Transparency:</span> We believe in honest pricing and clear communication
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Innovation:</span> We continuously improve our services to serve you better
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-primary" />
                <span>123 eStore Street, Digital City, 12345</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <span>support@estore.com</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Globe className="w-5 h-5 mr-3 text-primary" />
                <span>www.estore.com</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-primary" />
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Join Our Community</h2>
          <p className="text-gray-600 mb-8">
            Stay updated with our latest products, special offers, and announcements by following us on social media.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Facebook
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Instagram
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 