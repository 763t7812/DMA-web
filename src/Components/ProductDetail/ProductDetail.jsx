import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ApiUrl from "../../Common/ApiUrl";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${ApiUrl}/api/inventory/get-product/${productId}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Rental Price: {product.rentalPrice}</p>
      <p>Duration: {product.duration}</p>
      <p>Category: {product.category}</p>
      <p>Available: {product.available ? "Yes" : "No"}</p>
      <img src={`${ApiUrl}${product.image}`} alt={product.name} />
    </div>
  );
};

export default ProductDetail;
