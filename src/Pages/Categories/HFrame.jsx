import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiUrl from "../../Common/ApiUrl";
import Card from "../../Components/Card/Card";

const HFrame = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchHframe = async () => {
      try {
        const category = "h-Frame"; // Define the category directly
        const response = await fetch(
          `${ApiUrl}/api/inventory/categorize-items/${encodeURIComponent(
            category
          )}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();
        console.log("Categorized category data is coming", data);
        setProducts(data);
      } catch (error) {
        console.log("Error in fetching categorized items", error.message);
      }
    };

    fetchHframe();
  }, []);

  const handleCardClick = (card) => {
    navigate("/detail", { state: { card } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">H Frame</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div key={index} className="flex flex-col">
            <Card
              image={product.image}
              title={product.name}
              description={product.description}
              price={product.rentalPrice}
              onClick={() => handleCardClick(product)}
            />
            <p className="text-gray-700 mb-2">
              Quantity Available: {product.quantity}
            </p>
            <p className="text-gray-700 mb-2">Sizes:</p>
            <ul className="list-disc list-inside ml-4">
              {product.size.map((size, sizeIndex) => (
                <li key={sizeIndex} className="text-gray-700">
                  {size}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HFrame;
