import React from 'react';
// import { FaCheckCircle } from 'react-icons/fa'; // Import a success icon from react-icons
// import { useHistory } from 'react-router-dom';

const Success = () => {
  // const history = useHistory();

  // const handleCheckOrderClick = () => {
  //   history.push('/your-orders'); // Redirect to your orders page
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        {/* <FaCheckCircle className="text-green-500 text-6xl mb-4" /> */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your payment was processed successfully. Thank you for your purchase!
        </p>
        <button
          onClick={handleCheckOrderClick}
          className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg hover:bg-blue-600 transition-colors"
        >
          Check Your Order
        </button>
      </div>
    </div>
  );
};

export default Success;
