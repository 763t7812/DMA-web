// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const OrdersHistory = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     const fetchOrdersHistory = async () => {
//       try {
//         const userId = localStorage.getItem('userId');
//         const response = await axios.get(`https://2lkz6gq8-5002.inc1.devtunnels.ms/api/users/order-details/${userId}`);

//         console.log("order History", response.data);

//         setOrders(response.data);

//       } catch (error) {
//         console.error('Error fetching order history:', error);
//       }
//     };

//     fetchOrdersHistory();
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Order History</h1>
//       {orders.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
//                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent Date</th>
//                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
//                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {orders.map((order, index) => (
//                 <tr key={index}>
//                   <td className="py-4 px-6 whitespace-nowrap">{order.productName}</td>
//                   <td className="py-4 px-6 whitespace-nowrap">{order.quantity}</td>
//                   <td className="py-4 px-6 whitespace-nowrap">{order.price}</td>
//                   <td className="py-4 px-6 whitespace-nowrap">{new Date(order.rentDate).toLocaleDateString()}</td>
//                   <td className="py-4 px-6 whitespace-nowrap">{new Date(order.rentReturnDate).toLocaleDateString()}</td>
//                   <td className="py-4 px-6 whitespace-nowrap">{order.isOrderVerified}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-gray-600">No orders found.</p>
//       )}
//     </div>
//   );
// };

// export default OrdersHistory;

import React, { useState, useEffect } from "react";
import axios from "axios";
import ApiUrl from "../../Common/ApiUrl";
const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchOrdersHistory = async () => {
      try {
        const response = await axios.get(
          `${ApiUrl}/api/users/order-details/${userId}`
        );

        console.log("order History", response.data);

        // Access orders from the user data object
        if (response.data && response.data.orders) {
          setOrders(response.data.orders);
        } else {
          console.error("No orders found in the response");
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    const fetchOrdersHistoryGust = async () => {
      try {
        const response = await axios.get(
          `${ApiUrl}/api/users/get-guest`
        );

        console.log("order History", response.data);

        // Access orders from the user data object
        if (response.data ) {
          setOrders(response.data);
        } else {
          console.error("No orders found in the response");
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    {
      userId ? fetchOrdersHistory() : fetchOrdersHistoryGust();
    }
  }, []);


  console.log(orders , "ordersordersorders")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rent Date
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Return Date
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  payment Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Type
                </th>
                {/* <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Statuss
                </th> */}
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comments
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {order.productName}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {order.quantity}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">{order.price}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {new Date(order.rentDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {new Date(order.rentReturnDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {order.isPaymentVerified}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {order.isOrderVerified}
                  </td>
                  
                  <td className="py-4 px-6 whitespace-nowrap">
                    {order.paymentType}
                  </td>
                  
                  <td className="py-4 px-6 whitespace-nowrap">
                    {order.comment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default OrdersHistory;
