import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ApiUrl from '../Common/ApiUrl';

const Success = () => {
  const [orderData, setOrderData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedOrderData = localStorage.getItem('orderData');
    if (storedOrderData) {
      const parsedOrderData = JSON.parse(storedOrderData);
      setOrderData(parsedOrderData);
      console.log('Order data retrieved:', parsedOrderData);

      // Call the function to place the order using the stored order data
      handleOrderPlacementByStripe(parsedOrderData);
    } else {
      console.log('No order data available');
    }
  }, [location.pathname]);

  const handleOrderPlacementByStripe = async (fullOrderData) => {
    const formData = new FormData();
    formData.append("orderData", JSON.stringify(fullOrderData));

    if (fullOrderData.frontImage) {
      formData.append("imageFront", fullOrderData.frontImage);
    }

    if (fullOrderData.backImage) {
      formData.append("imageBack", fullOrderData.backImage);
    }

    try {
      const targetUrl = fullOrderData.userId
        ? `${ApiUrl}/api/users/order-item`
        : `${ApiUrl}/api/users/add`;

      const response = await axios.post(targetUrl, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Data successfully received after placing order", response);
        localStorage.removeItem('orderData');
      } else {
        console.log("Order placement failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Payment Successful!</h1>
        <p style={styles.message}>Your order has been placed successfully.</p>
        {orderData ? (
          <div style={styles.details}>
            <h2 style={styles.subheading}>Order Details</h2>
            <p style={styles.detailItem}><strong>Name:</strong> {orderData.customerInfo.name}</p>
            <p style={styles.detailItem}><strong>Phone Number:</strong> {orderData.customerInfo.phoneNumber}</p>
            <p style={styles.detailItem}><strong>National ID:</strong> {orderData.customerInfo.nationalId}</p>
            <p style={styles.detailItem}><strong>Address:</strong> {orderData.customerInfo.address}</p>
            <p style={styles.detailItem}><strong>Payment Status:</strong> {orderData.isPaymentVerified}</p>
            <p style={styles.detailItem}><strong>Payment Type:</strong> {orderData.paymentType}</p>
          </div>
        ) : (
          <p style={styles.noData}>No order data available.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    color: '#28a745',
    marginBottom: '20px',
  },
  message: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '20px',
  },
  details: {
    textAlign: 'left',
  },
  subheading: {
    fontSize: '20px',
    color: '#555',
    marginBottom: '15px',
  },
  detailItem: {
    fontSize: '16px',
    color: '#777',
    marginBottom: '10px',
  },
  noData: {
    fontSize: '16px',
    color: '#999',
  },
};

export default Success;
