// src/components/Footer.js
import React from 'react';
import { Heart } from 'lucide-react'; // Make sure to import the Heart icon if you want to use it

const Footer = () => {
  return (
    <footer className="bg-red-800 text-white py-8 mt-12 h-400px">
      <div className="container mx-auto px-20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">My Book Collection</h2>
            <p className="mt-2">Discover and manage your favorite books</p>
          </div>
          <div className="flex items-center">
            <Heart className="mr-2" size={24} />
            <p>Made with love for book enthusiasts</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 My Book Collection. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
