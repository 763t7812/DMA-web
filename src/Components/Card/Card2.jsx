import React from "react";
import PropTypes from "prop-types";
import ApiUrl from "../../Common/ApiUrl";

const Card2 = ({ image, title, description, price, onClick, isFavorite }) => {
  console.log("Card2 props:", { image, title, description, price, onClick, isFavorite });
  
  return (
    <div className="card" onClick={onClick}>
      <img
        src={`${ApiUrl}${image}`}
        alt={title}
        className="w-full hover:scale-105 ease-in-out duration-2000 h-48 object-cover"
      />
      <div className="card-body">
        <h2 className="card-title font-bold">{title}</h2>
        <p className="card-description">{description}</p>
        <p className="card-price">${price}</p>
        {isFavorite && <span className="favorite-icon">❤️</span>}
      </div>
    </div>
  );
};

Card2.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default Card2;
