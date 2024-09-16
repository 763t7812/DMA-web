// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// // Load your Stripe public key
// const stripePromise = loadStripe("pk_test_51OhAN8HpJOQAZkGPt4vOoo4EhMaVXEt2B5c3nNJ036UPbHTIlADGFrZEhNk2erbNYtIhWxcgjgyaVRpfC2BZAo7U0036P4RhtJ");

// const PaymentModal = ({ show, onClose, onSubmit }) => {
//   const [paymentDetails, setPaymentDetails] = useState({
//     account_number: "",
//     total: 0,
//     details: "",
//     voucher: "",
//   });

//   const stripe = useStripe();
//   const elements = useElements();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     // Call your backend to create a PaymentIntent and get the clientSecret
//     const { clientSecret } = await fetch(`https://2lkz6gq8-5002.inc1.devtunnels.ms/api/payments/stripe`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: 1000 }), // Amount in cents
//     }).then((r) => r.json());

//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//         billing_details: {
//           name: paymentDetails.account_number, // Replace with a relevant field
//         },
//       },
//     });

//     if (error) {
//       console.log(error.message);
//     } else if (paymentIntent.status === "succeeded") {
//       // Payment succeeded, handle the success case here
//       onSubmit(paymentDetails);
//       onClose();
//     }
//   };

//   if (!show) return null;

//   return ReactDOM.createPortal(
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
//         <form onSubmit={(e) => e.preventDefault()}>
//           <div className="mb-4">
//             <label htmlFor="account_number" className="block text-gray-700 mb-1">Account Number </label>
//             <input
//               type="text"
//               id="account_number"
//               name="account_number"
//               value={paymentDetails.account_number}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="total" className="block text-gray-700 mb-1">Total</label>
//             <input
//               type="number"
//               id="total"
//               name="total"
//               value={paymentDetails.total}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="details" className="block text-gray-700 mb-1">Details</label>
//             <input
//               type="text"
//               id="details"
//               name="details"
//               value={paymentDetails.details}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="voucher" className="block text-gray-700 mb-1">Voucher</label>
//             <input
//               type="text"
//               id="voucher"
//               name="voucher"
//               value={paymentDetails.voucher}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="card-element" className="block text-gray-700 mb-1">Card Details</label>
//             <CardElement
//               id="card-element"
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={handleSubmit}
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               disabled={!stripe}
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>,
//     document.body
//   );
// };

// const PaymentModalWrapper = (props) => {
//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentModal {...props} />
//     </Elements>
//   );
// };

// export default PaymentModalWrapper;
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Load your Stripe public key
const stripePromise = loadStripe("pk_test_51OhAN8HpJOQAZkGPt4vOoo4EhMaVXEt2B5c3nNJ036UPbHTIlADGFrZEhNk2erbNYtIhWxcgjgyaVRpfC2BZAo7U0036P4RhtJ");

const PaymentModal = ({ show, onClose }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    account_number: "",
    total: 0,
    details: "",
    voucher: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const makePayment = async () => {
    const stripe = await stripePromise;

    // Example cart data, modify this with real data as needed
    let carts = [
      {
        name: "Sample Dish",
        price: 500, // Price in smallest currency unit (i.e., 500 means INR 5.00)
        qnty: 1
      }
    ];

    const body = { products: carts };
    const headers = { "Content-Type": "application/json" };

    const response = await fetch(`${ApiURl}/api/payments/stripe`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="account_number" className="block text-gray-700 mb-1">Account Number </label>
            <input
              type="text"
              id="account_number"
              name="account_number"
              value={paymentDetails.account_number}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="total" className="block text-gray-700 mb-1">Total</label>
            <input
              type="number"
              id="total"
              name="total"
              value={paymentDetails.total}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="details" className="block text-gray-700 mb-1">Details</label>
            <input
              type="text"
              id="details"
              name="details"
              value={paymentDetails.details}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="voucher" className="block text-gray-700 mb-1">Voucher</label>
            <input
              type="text"
              id="voucher"
              name="voucher"
              value={paymentDetails.voucher}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={makePayment}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

const PaymentModalWrapper = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentModal {...props} />
    </Elements>
  );
};

export default PaymentModalWrapper;
