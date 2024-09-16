import React, { useEffect } from 'react';

const BracesClamps = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    const products = [
        { description: "DECK PANS", imageUrl: "https://via.placeholder.com/150" },
        { description: "STEEL PANS", imageUrl: "https://via.placeholder.com/150" },
        { description: "STEEL PANS WITH HOOKS", imageUrl: "https://via.placeholder.com/150" },
        { description: "BASE PLATES", imageUrl: "https://via.placeholder.com/150" },
        { description: "LADDER BEAM 10FT", imageUrl: "https://via.placeholder.com/150" },
        { description: "LADDER BEAM 16FT", imageUrl: "https://via.placeholder.com/150" },
      ];
    
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Pans and Beams</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={product.imageUrl} alt={product.description} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{product.description}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
};

export default BracesClamps;
