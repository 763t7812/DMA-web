import React, { useEffect, useState } from "react";
import axios from "axios";
import ApiUrl from "../../Common/ApiUrl";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";

const ShowAllProducts = () => {
  const [cardData, setCardData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(`${ApiUrl}/api/inventory/get-inventory`);
        const resData = res.data;
        setCardData(resData);
      } catch (error) {
        console.error('Error fetching all products:', error);
      }
    };

    getAllProducts();
  }, []);
  const handleCardClick = (card) => {
    navigate('/detail', { state: { card } });
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.name}
            description={card.description}
            price={card.rentalPrice}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowAllProducts;
