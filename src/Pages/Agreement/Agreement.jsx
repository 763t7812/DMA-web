import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { clearCart } from "../../Slice/Cart/CartSlice";
import PaymentModal from "../../Components/Modal/PaymentModal";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";
import { setOrderData } from "../../Slice/OrderDataSlice";
import ApiUrl from "../../Common/ApiUrl";
const Agreement = () => {
  const location = useLocation();

  const { orderData } = location.state || {};

  console.log(orderData, "***");
  // const itemData = orderData.items.map(item => item.)
  const totalQuantity = orderData.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalPrice = orderData.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  console.log("Total Quantity:", totalQuantity);
  console.log("Total Price:", totalPrice);

  const ApiUrl = "http://localhost:5002";

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nnicNumber, setNnicNumber] = useState("");
  const [address, setAddress] = useState("");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [year, setYear] = useState(24);
  const [agreed, setAgreed] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
const [profilePage,setProfilePage] = useState(false)

const navigate = useNavigate();
const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Fetch data from local storage
    const savedName = localStorage.getItem("name");
    const savedPhoneNumber = localStorage.getItem("phoneNumber");
    const savedNnicNumber = localStorage.getItem("nationalId");
    const savedAddress = localStorage.getItem("address");
    const savedFrontImage = localStorage.getItem("imageFront");
    const savedBackImage = localStorage.getItem("imageBack");

    // Set state with fetched data
    if (savedName) setName(savedName);
    if (savedPhoneNumber) setPhoneNumber(savedPhoneNumber);
    if (savedNnicNumber) setNnicNumber(savedNnicNumber);
    if (savedAddress) setAddress(savedAddress);
    if (savedFrontImage) setFrontImage(`${ApiUrl}/uploads/${savedFrontImage}`);
    if (savedBackImage) setBackImage(`${ApiUrl}/uploads/${savedBackImage}`);

    // Log the URLs to ensure they are correct
    console.log("first ", name, phoneNumber, nnicNumber, address);
    console.log("Front Image URL:", `${ApiUrl}/gallery${savedFrontImage}`);
    console.log("Back Image URL:", `${ApiUrl}/gallery${savedBackImage}`);
  }, [ApiUrl]);

  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  const [modal, setModal] = useState(false);

  const openPaymentMethodModal = () => {
    setShowPaymentMethodModal(true);
  };

  const handlePaymentSubmit = async (details) => {
    setPaymentDetails(details); // Set the payment details in state

    try {
      const pres = await fetch(`${ApiUrl}/wipay/voucher_pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      const paymentData = await pres.json();
      console.log(paymentData);

      if (paymentData.status === "success") {
        // If payment is successful, place the order
        handleOrderPlacement();
      } else {
        setModalMessage("Payment failed. Please try again.");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setModalMessage("Error processing payment. Please try again.");
      setShowModal(true);
    }
  };

  const [frontImagePreview, setFrontImagePreview] = useState(null);
  const [backImagePreview, setBackImagePreview] = useState(null);
  const handleImageUpload = (event, setImage, setImagePreview) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update the imagePreview state with the file URL
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAgreementChange = () => {
    setAgreed(!agreed);
  };

  const handleAgree = () => {

      if (!name || !phoneNumber || !nnicNumber || !address || !frontImage || !backImage) {
        setProfilePage(true)
        return;
      }

    localStorage.setItem("GuestName", name);
    if (!name || !phoneNumber || !nnicNumber || !address) {
      alert("Please fill in all required fields.");
      setModalMessage("Please fill in all required fields.");
      return;
    }
    openPaymentMethodModal();
  };
  console.log(orderData, "hfsjkf sdjfh djksh fk");

  const handleOrderPlacement = async () => {
    let paymentType = "Cash";
    let myorder =  "Pending Payment"
    const fullOrderData = {
      ...orderData,
      customerInfo: {
        name,
        phoneNumber,
        nationalId: nnicNumber,
        address,
      },
      isPaymentVerified:myorder,
      paymentType,
        
    };

    const formData = new FormData();
    formData.append("orderData", JSON.stringify(fullOrderData));

    if (frontImage) {
      formData.append("imageFront", frontImage);
    }

    if (backImage) {
      formData.append("imageBack", backImage);
    }

    try {
      // Determine the correct URL based on whether userId is null
      console.log("asdf");
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
        console.log("data coming successfully after placing order", response);
        setOrderDetails(response.data);
        console.log("Order Details Set:", response.data);

        dispatch(clearCart());
        setModalMessage("Order Placed Successfully");
        setShowModal(true);
      } else {
        setModalMessage(
          response.data.message || "Order placement failed. Please try again."
        );
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setModalMessage("Error placing order. Please try again.");
      setShowModal(true);
    }
  };




  const handleOrderPlacementByBank = async () => {
  let paymentType = "BankTransfer";

  const fullOrderData = {
    ...orderData,
    customerInfo: {
      name,
      phoneNumber,
      nationalId: nnicNumber,
      address,
    },
    paymentType,
    isPaymentVerified: "Pending Payment"
     // Use the screenshot path here
  };

  const formData = new FormData();
  formData.append("orderData", JSON.stringify(fullOrderData));
  if (screenshot) {
    formData.append("bankTransferScreenshot", screenshot); // Attach the screenshot
  }
  

  try {
    // Determine the correct URL based on whether userId is null
    const targetUrl = fullOrderData.userId
      ? `${ApiUrl}/api/users/order-item`
      : `${ApiUrl}/api/users/add`;

    const response = await axios.post(targetUrl, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response)

    if (response.status === 200) {
      console.log("data coming successfully after placing order", response);
      setOrderDetails(response.data);
      console.log("Order Details Set:", response.data);

      dispatch(clearCart());
      setModalMessage("Order Placed Successfully");
      setShowModal(true);
    } else {
      setModalMessage(
        response.data.message || "Order placement failed. Please try again."
      );
      setShowModal(true);
    }
  } catch (error) {
    console.error("Error placing order:", error);
    setModalMessage("Error placing order. Please try again.");
    setShowModal(true);
  }
};

  const handleOrderPlacementByStripe = async () => {
    let paymentType = "online";
    const fullOrderData = {
      ...orderData,
      customerInfo: {
        name,
        phoneNumber,
        nationalId: nnicNumber,
        address,
      },
      isPaymentVerified: "Payment Success",
      paymentType,
    };

    const formData = new FormData();
    formData.append("orderData", JSON.stringify(fullOrderData));

    if (frontImage) {
      formData.append("imageFront", frontImage);
    }

    if (backImage) {
      formData.append("imageBack", backImage);
    }

    try {
      // Determine the correct URL based on whether userId is null
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
        console.log("data coming successfully after placing order", response);
        setOrderDetails(response.data);
        console.log("Order Details Set:", response.data);

        dispatch(clearCart());
        setModalMessage("Order Placed Successfully");
        // setShowModal(true);
      } else {
        setModalMessage(
          response.data.message || "Order placement failed. Please try again."
        );
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setModalMessage("Error placing order. Please try again.");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    if (modalMessage === "Order Placed Successfully") {
      navigate("/orderHistory");
    } else {
      setShowModal(false);
      setModalMessage("");
    }
  };

  const handlePaymentMethodSelection = (method) => {
    setShowPaymentMethodModal(false);
    if (method === "bankTransfer") {
      setShowBankTransferModal(true);
    } else if (method === "card") {
      setShowPaymentModal(true);
    }
  };

  const stripePromise = loadStripe(
    "pk_test_51OhAN8HpJOQAZkGPt4vOoo4EhMaVXEt2B5c3nNJ036UPbHTIlADGFrZEhNk2erbNYtIhWxcgjgyaVRpfC2BZAo7U0036P4RhtJ"
  );

  const itemNames = orderData.items.map((item) => item.productName);

  console.log("Item Names:", itemNames);



  // const makePayment = async () => {
  //   console.log("makePayment called"); // Add this

  //   const stripe = await stripePromise;

  //   let carts = [
  //     {
  //       name: "itemNam",
  //       price: totalPrice,
  //       qnty: totalQuantity,
  //     },
  //   ];

  //   console.log("Carts:", carts); // Add this

  //   const body = { products: carts };
  //   const headers = { "Content-Type": "application/json" };

  //   try {
  //     console.log("Sending request to:", `${ApiUrl}/api/payments/stripe`); // Add this
  //     const response = await fetch(`${ApiUrl}/api/payments/stripe`, {
  //       method: "POST",
  //       headers: headers,
  //       body: JSON.stringify(body),
  //     });
  //     console.log("Response received:", response); // Add this

  //     if (!response.ok) {
  //       throw new Error("Payment initiation failed");
  //     }

  //     const session = await response.json();
  //     console.log("Session ID:", session.id); // Add this

  //     const result = await stripe.redirectToCheckout({
  //       sessionId: session.id,
  //     });
  //     const navigate = useNavigate();
  //     navigate('/success', { state: { onOrderPlacement: handleOrderPlacementByStripe } });
  //     console.log("Stripe redirect result:", result); // Add this

  //     if (result.error) {
  //       console.log("Error during redirect:", result.error); // Add this
  //       setModalMessage("Payment failed. Please try again.");
  //       setShowModal(true);
  //     } else {
  //       // Payment was successful, proceed to place the order
       
  //       console.log("orderplacement");
  //     }
  //   } catch (error) {
  //     console.error("Error processing payment:", error);
  //     setModalMessage("Error processing payment. Please try again.");
  //     setShowModal(true);
  //   }
  // };
  


  const makePayment = async () => {
    console.log("makePayment called");

    const stripe = await stripePromise;

    let carts = [
      {
        name: "itemName",
        price: totalPrice,
        qnty: totalQuantity,
      },
    ];

    console.log("Carts:", carts);

    const body = { products: carts };
    const headers = { "Content-Type": "application/json" };

    try {
      console.log("Sending request to:", `${ApiUrl}/api/payments/stripe`);

      const fullOrderData = {
        ...orderData,
        customerInfo: {
          name,
          phoneNumber,
          nationalId: nnicNumber,
          address,
        },
        isPaymentVerified: "Payment Success",
        paymentType: "online",
      };
      console.log(fullOrderData, "Order data to store");

      // Store the order data in local storage
      localStorage.setItem('orderData', JSON.stringify(fullOrderData));

      const response = await fetch(`${ApiUrl}/api/payments/stripe`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      console.log("Response received:", response);

      if (!response.ok) {
        throw new Error("Payment initiation failed");
      }

      const session = await response.json();
      console.log("Session ID:", session.id);

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      navigate('/success');
      console.log("Stripe redirect result:", result);

      if (result.error) {
        console.log("Error during redirect:", result.error);
        setModalMessage("Payment failed. Please try again.");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setModalMessage("Error processing payment. Please try again.");
      setShowModal(true);
    }
  };

  
  
  
  
  
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
    }
  };

  const handleSubmit = () => {
    if (!screenshot) {
      toast.error("Please upload a screenshot.");
      return;
    }
    

    setLoading(true);
    const userId = localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("paymentMethod", "BankTransfer");
    formData.append("screenshot", screenshot);
    formData.append("userId", userId);
    axios
      .post(`${ApiUrl}/api/payments/bankPayment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setLoading(false);
        toast.success("Screenshot uploaded successfully!");

        handleOrderPlacementByBank(response.data.filePath);

        setShowBankTransferModal(false);
        // onSubmit({
        //   paymentMethod: "bankTransfer",
        //   screenshot: response.data.filePath,
        // });
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Error uploading screenshot.");
        console.error("Error:", error);
      });
  };

  const userId = localStorage.getItem("userId")

  return (
    <div className="flex flex-col md:flex-row py-10 px-2 gap-1">
      {/* Card for Additional Information */}
      <div className="flex-1 flex items-center justify-center md:w-[40%] w-[100%]">
        <div className="bg-gray-200 shadow-lg rounded-lg p-6 mb-8 w-full h-full">
          <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone Number:</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Address:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                National ID Number:
              </label>
              <input
                type="text"
                value={nnicNumber}
                onChange={(e) => setNnicNumber(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                NNIC Front Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageUpload(e, setFrontImage, setFrontImagePreview)
                }
                className="w-full p-2 border rounded"
              />
              {frontImagePreview && (
                <img
                  src={frontImagePreview}
                  alt="Front Image Preview"
                  className="mt-2 w-48 h-32"
                />
              )}

              {frontImage && (
                <img
                  src={frontImage}
                  alt="NNIC Front"
                  className="mt-4 w-48 h-32 object-cover"
                />
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                NNIC Back Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageUpload(e, setBackImage, setBackImagePreview)
                }
                className="w-full p-2 border rounded"
              />
              {backImagePreview && (
                <img
                  src={backImagePreview}
                  alt="Back Image Preview"
                  className="mt-2 w-48 h-32"
                />
              )}
              {backImage && (
                <img
                  src={backImage}
                  alt="NNIC Back"
                  className="mt-4 w-48 h-32 object-cover"
                />
              )}
            </div>
          </form>
        </div>
      </div>
      {/* Agreement Section */}
      <div className="flex-1 bg-white shadow-lg rounded-lg p-6 md:w-[60%] w-[100%]">
        <h1 className="text-2xl font-bold mb-4">
          Conditions for Rental of Scaffolding
        </h1>
        <p className="mb-4">
          This is an agreement made between{" "}
          <span className="font-bold">DMA Transport & Scaffolding Ltd</span>{" "}
          (Owner) and{" "}
          <span className="underline">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-b-gray-950"
            />
          </span>{" "}
          (Customer) in the year of our Lord 20
          <span className="underline">
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border border-b-gray-950"
            />
          </span>
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-2">
            Scaffolding must be maintained in proper manner by client.
          </li>
          <li className="mb-2">
            Scaffolding and/or components must not be thrown from any height so
            as to cause damage to same.
          </li>
          <li className="mb-2">
            All scaffolding must be kept at the job location for which it is
            rented and must not be transferred to any other site without the
            owner's written permission.
          </li>
          <li className="mb-2">
            Scaffolding is rented on a daily basis for any part thereof.
          </li>
          <li className="mb-2">
            Cost of rental and deposit must be paid in advance.
          </li>
          <li className="mb-2">
            Saturday Sunday and Public Holidays are included in the days for
            which rental is charged.
          </li>
          <li className="mb-2">
            Scaffolding could be collected and rented between the hours of:
          </li>
          <ul className="list-disc list-inside pl-6 mb-2">
            <li>7:30am - 3:30pm Mondays - Fridays</li>
            <li>8:00am - 12:00noon Sundays</li>
          </ul>
          <li className="mb-2">
            Scaffolding must be loaded or unloaded in the presence of the owner
            or appointed agent at the time of collection or return.
          </li>
          <li className="mb-2">
            In any case where any scaffolding and/or components are lost or
            damaged the customer agrees to pay the owner the cost for the
            equipment.
          </li>
        </ol>

        <div className="flex items-center mt-8">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={handleAgreementChange}
            className="mr-2"
          />
          <label htmlFor="agree" className="text-gray-700 font-bold">
            I agree to the terms and conditions
          </label>
        </div>

        {agreed && (
          <div className="mt-4">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded font-bold"
              onClick={handleAgree}
            >
              I Agree
            </button>

            {/* Payment Method Modal */}

            {profilePage && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-lg relative">
                  <p className="absolute top-0 right-3 text-3xl cursor-pointer" onClick={()=> setProfilePage(false)}>x</p>
                  <h2 className="text-2xl font-bold mb-4">
                    First Complete your Profile
                  </h2>
                  <div className="flex flex-col gap-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => navigate(`/profile/${userId}`)}
                    >
                      Go To Profile
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showPaymentMethodModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-lg relative">
                  <p className="absolute top-0 right-3 text-3xl cursor-pointer" onClick={()=> setShowPaymentMethodModal(false)}>x</p>
                  <h2 className="text-2xl font-bold mb-4">
                    Select Payment Method
                  </h2>
                  <div className="flex flex-col gap-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={handleOrderPlacement}
                    >
                      Cash On delivery
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={makePayment}
                    >
                      Card
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => setShowBankTransferModal(true)}
                    >
                      Bank Transfer
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bank Transfer Modal */}
            {/* <BankTransferModal
              show={showBankTransferModal}
              onClose={() => setShowBankTransferModal(false)}
              onSubmit={handlePaymentSubmit}
            /> */}

            {showBankTransferModal && (
              <>
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                      Bank Transfer Details
                    </h2>
                    <div className="mb-5">
                      <label className="block text-lg font-medium text-gray-600 mb-1">
                        Bank Name:
                      </label>
                      <p className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700">
                        XYZ Bank
                      </p>
                    </div>
                    <div className="mb-5">
                      <label className="block text-lg font-medium text-gray-600 mb-1">
                        Account Number:
                      </label>
                      <p className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700">
                        123456789012
                      </p>
                    </div>
                    <div className="mb-5">
                      <label className="block text-lg font-medium text-gray-600 mb-1">
                        Transaction ID:
                      </label>
                      <p className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700">
                        TXN123456
                      </p>
                    </div>
                    <div className="mb-6">
                      <label className="block text-lg font-medium text-gray-600 mb-1">
                        Upload Screenshot:
                      </label>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full p-3 border rounded-lg bg-white text-gray-700"
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        className="bg-gray-400 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-500"
                        onClick={() => setShowBankTransferModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-5 py-2 rounded-lg shadow hover:bg-yellow-600"
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? "Uploading..." : "Submit"}
                      </button>
                    </div>
                  </div>
                  <ToastContainer />
                </div>
              </>
            )}

            {/* Card Payment Modal */}
            <PaymentModal
              show={showPaymentModal}
              onClose={() => setShowPaymentModal(false)}
              onSubmit={handlePaymentSubmit}
            />
          </div>
        )}
      </div>
      {/* Modal for showing messages and order details */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Message</h2>
            <p>{modalMessage}</p>
            {orderDetails && modalMessage === "Order Placed Successfully" && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-4">Message</h2>
                  <p>{modalMessage}</p>

                  {orderDetails.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold">Order Details:</h3>
                      <ul className="list-disc pl-6 mt-2">
                        {orderDetails.map((order, index) => (
                          <li key={index} className="mb-4">
                            <div className="mt-2">
                              <h4 className="font-bold">Order {index + 1}:</h4>
                              <ul className="pl-4">
                                <li>
                                  <strong>Product Name:</strong>{" "}
                                  {order.productName}
                                </li>
                                <li>
                                  <strong>Quantity:</strong> {order.quantity}
                                </li>
                                <li>
                                  <strong>Price:</strong> {order.price}
                                </li>
                                <li>
                                  <strong>Duration:</strong> {order.duration}
                                </li>
                                <li>
                                  <strong>Rent Date:</strong>{" "}
                                  {new Date(
                                    order.rentDate
                                  ).toLocaleDateString()}
                                </li>
                                <li>
                                  <strong>Rent Return Date:</strong>{" "}
                                  {new Date(
                                    order.rentReturnDate
                                  ).toLocaleDateString()}
                                </li>
                                <li>
                                  <strong>Size:</strong> {order.size || "N/A"}
                                </li>
                              </ul>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agreement;


// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import { clearCart } from "../../Slice/Cart/CartSlice";
// import PaymentModal from "../../Components/Modal/PaymentModal";
// import { loadStripe } from "@stripe/stripe-js";
// import { toast, ToastContainer } from "react-toastify";
// const Agreement = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { orderData } = location.state || {};

//   console.log(orderData, "***************");
//   // const itemData = orderData.items.map(item => item.)
//   const totalQuantity = orderData.items.reduce(
//     (acc, item) => acc + item.quantity,
//     0
//   );
//   const totalPrice = orderData.items.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   console.log("Total Quantity:", totalQuantity);
//   console.log("Total Price:", totalPrice);

//   const ApiUrl = "https://2lkz6gq8-5002.inc1.devtunnels.ms";

//   const [name, setName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [nnicNumber, setNnicNumber] = useState("");
//   const [address, setAddress] = useState("");
//   const [frontImage, setFrontImage] = useState(null);
//   const [backImage, setBackImage] = useState(null);
//   const [year, setYear] = useState(24);
//   const [agreed, setAgreed] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [paymentDetails, setPaymentDetails] = useState(null);
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [screenshot, setScreenshot] = useState(null);
//   const [loading, setLoading] = useState(false);
// const [profilePage,setProfilePage] = useState(false)
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     // Fetch data from local storage
//     const savedName = localStorage.getItem("name");
//     const savedPhoneNumber = localStorage.getItem("phoneNumber");
//     const savedNnicNumber = localStorage.getItem("nationalId");
//     const savedAddress = localStorage.getItem("address");
//     const savedFrontImage = localStorage.getItem("imageFront");
//     const savedBackImage = localStorage.getItem("imageBack");

//     // Set state with fetched data
//     if (savedName) setName(savedName);
//     if (savedPhoneNumber) setPhoneNumber(savedPhoneNumber);
//     if (savedNnicNumber) setNnicNumber(savedNnicNumber);
//     if (savedAddress) setAddress(savedAddress);
//     if (savedFrontImage) setFrontImage(`${ApiUrl}/uploads/${savedFrontImage}`);
//     if (savedBackImage) setBackImage(`${ApiUrl}/uploads/${savedBackImage}`);

//     // Log the URLs to ensure they are correct
//     console.log("first ", name, phoneNumber, nnicNumber, address);
//     console.log("Front Image URL:", `${ApiUrl}/gallery${savedFrontImage}`);
//     console.log("Back Image URL:", `${ApiUrl}/gallery${savedBackImage}`);
//   }, [ApiUrl]);

//   const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [showBankTransferModal, setShowBankTransferModal] = useState(false);
//   const [modal, setModal] = useState(false);

//   const openPaymentMethodModal = () => {
//     setShowPaymentMethodModal(true);
//   };

//   const handlePaymentSubmit = async (details) => {
//     setPaymentDetails(details); // Set the payment details in state

//     try {
//       const pres = await fetch(`${ApiUrl}/wipay/voucher_pay`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(details),
//       });

//       const paymentData = await pres.json();
//       console.log(paymentData);

//       if (paymentData.status === "success") {
//         // If payment is successful, place the order
//         handleOrderPlacement();
//       } else {
//         setModalMessage("Payment failed. Please try again.");
//         setShowModal(true);
//       }
//     } catch (error) {
//       console.error("Error processing payment:", error);
//       setModalMessage("Error processing payment. Please try again.");
//       setShowModal(true);
//     }
//   };

//   const [frontImagePreview, setFrontImagePreview] = useState(null);
//   const [backImagePreview, setBackImagePreview] = useState(null);
//   const handleImageUpload = (event, setImage, setImagePreview) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         // Update the imagePreview state with the file URL
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAgreementChange = () => {
//     setAgreed(!agreed);
//   };

//   const handleAgree = () => {

//       if (!name || !phoneNumber || !nnicNumber || !address || !frontImage || !backImage) {
//         setProfilePage(true)
//         return;
//       }

//     localStorage.setItem("GuestName", name);
//     if (!name || !phoneNumber || !nnicNumber || !address) {
//       alert("Please fill in all required fields.");
//       setModalMessage("Please fill in all required fields.");
//       return;
//     }
//     openPaymentMethodModal();
//   };
//   console.log(orderData, "hfsjkf sdjfh djksh fk");

//   const handleOrderPlacement = async () => {
//     let paymentType = "Cash";
//     const fullOrderData = {
//       ...orderData,
//       customerInfo: {
//         name,
//         phoneNumber,
//         nationalId: nnicNumber,
//         address,
//       },
//       paymentType,
//     };

//     const formData = new FormData();
//     formData.append("orderData", JSON.stringify(fullOrderData));

//     if (frontImage) {
//       formData.append("imageFront", frontImage);
//     }

//     if (backImage) {
//       formData.append("imageBack", backImage);
//     }

//     try {
//       // Determine the correct URL based on whether userId is null
//       console.log("asdf");
//       const targetUrl = fullOrderData.userId
//         ? `${ApiUrl}/api/users/order-item`
//         : `${ApiUrl}/api/users/add`;

//       const response = await axios.post(targetUrl, formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.status === 200) {
//         console.log("data coming successfully after placing order", response);
//         setOrderDetails(response.data);
//         console.log("Order Details Set:", response.data);

//         dispatch(clearCart());
//         setModalMessage("Order Placed Successfully");
//         setShowModal(true);
//       } else {
//         setModalMessage(
//           response.data.message || "Order placement failed. Please try again."
//         );
//         setShowModal(true);
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       setModalMessage("Error placing order. Please try again.");
//       setShowModal(true);
//     }
//   };




//   const handleOrderPlacementByBank = async () => {
//   let paymentType = "BankTransfer";

//   const fullOrderData = {
//     ...orderData,
//     customerInfo: {
//       name,
//       phoneNumber,
//       nationalId: nnicNumber,
//       address,
//     },
//     paymentType,
//      // Use the screenshot path here
//   };

//   const formData = new FormData();
//   formData.append("orderData", JSON.stringify(fullOrderData));
//   if (screenshot) {
//     formData.append("bankTransferScreenshot", screenshot); // Attach the screenshot
//   }
  

//   try {
//     // Determine the correct URL based on whether userId is null
//     const targetUrl = fullOrderData.userId
//       ? `${ApiUrl}/api/users/order-item`
//       : `${ApiUrl}/api/users/add`;

//     const response = await axios.post(targetUrl, formData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     console.log(response)

//     if (response.status === 200) {
//       console.log("data coming successfully after placing order", response);
//       setOrderDetails(response.data);
//       console.log("Order Details Set:", response.data);

//       dispatch(clearCart());
//       setModalMessage("Order Placed Successfully");
//       setShowModal(true);
//     } else {
//       setModalMessage(
//         response.data.message || "Order placement failed. Please try again."
//       );
//       setShowModal(true);
//     }
//   } catch (error) {
//     console.error("Error placing order:", error);
//     setModalMessage("Error placing order. Please try again.");
//     setShowModal(true);
//   }
// };

//   const handleOrderPlacementByStripe = async () => {
//     let paymentType = "online";
//     const fullOrderData = {
//       ...orderData,
//       customerInfo: {
//         name,
//         phoneNumber,
//         nationalId: nnicNumber,
//         address,
//       },
//       paymentType,
//     };

//     const formData = new FormData();
//     formData.append("orderData", JSON.stringify(fullOrderData));

//     if (frontImage) {
//       formData.append("imageFront", frontImage);
//     }

//     if (backImage) {
//       formData.append("imageBack", backImage);
//     }

//     try {
//       // Determine the correct URL based on whether userId is null
//       const targetUrl = fullOrderData.userId
//         ? `${ApiUrl}/api/users/order-item`
//         : `${ApiUrl}/api/users/add`;

//       const response = await axios.post(targetUrl, formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.status === 200) {
//         console.log("data coming successfully after placing order", response);
//         setOrderDetails(response.data);
//         console.log("Order Details Set:", response.data);

//         dispatch(clearCart());
//         setModalMessage("Order Placed Successfully");
//         // setShowModal(true);
//       } else {
//         setModalMessage(
//           response.data.message || "Order placement failed. Please try again."
//         );
//         setShowModal(true);
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       setModalMessage("Error placing order. Please try again.");
//       setShowModal(true);
//     }
//   };

//   const closeModal = () => {
//     if (modalMessage === "Order Placed Successfully") {
//       navigate("/orderHistory");
//     } else {
//       setShowModal(false);
//       setModalMessage("");
//     }
//   };

//   const handlePaymentMethodSelection = (method) => {
//     setShowPaymentMethodModal(false);
//     if (method === "bankTransfer") {
//       setShowBankTransferModal(true);
//     } else if (method === "card") {
//       setShowPaymentModal(true);
//     }
//   };

//   const stripePromise = loadStripe(
//     "pk_test_51OhAN8HpJOQAZkGPt4vOoo4EhMaVXEt2B5c3nNJ036UPbHTIlADGFrZEhNk2erbNYtIhWxcgjgyaVRpfC2BZAo7U0036P4RhtJ"
//   );

//   const itemNames = orderData.items.map((item) => item.productName);

//   console.log("Item Names:", itemNames);



//   const makePayment = async () => {
//     console.log("makePayment called"); // Add this

//     const stripe = await stripePromise;

//     let carts = [
//       {
//         name: "itemNam",
//         price: totalPrice,
//         qnty: totalQuantity,
//       },
//     ];

//     console.log("Carts:", carts); // Add this

//     const body = { products: carts };
//     console.log(products,carts)
//     carts.map((item)=>{
//       console.log(item)
//     })
//     const headers = { "Content-Type": "application/json" };

//     try {
//       console.log("Sending request to:", `${ApiUrl}/api/payments/stripe`); // Add this
//       const response = await fetch(`${ApiUrl}/api/payments/stripe`, {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(body),
//       });
//       handleOrderPlacementByStripe();
//       console.log("Response received:", response); // Add this

//       if (!response.ok) {
//         throw new Error("Payment initiation failed");
//       }

//       const session = await response.json();
//       console.log("Session ID:", session.id); // Add this

//       const result = await stripe.redirectToCheckout({
//         sessionId: session.id,
//       });

//       console.log("Stripe redirect result:", result); // Add this

//       if (result.error) {
//         console.log("Error during redirect:", result.error); // Add this
//         setModalMessage("Payment failed. Please try again.");
//         setShowModal(true);
//       } else {
//         // Payment was successful, proceed to place the order
//         handleOrderPlacementByStripe();
//         console.log("orderplacement");
//       }
//     } catch (error) {
//       console.error("Error processing payment:", error);
//       setModalMessage("Error processing payment. Please try again.");
//       setShowModal(true);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setScreenshot(file);
//     }
//   };

//   const handleSubmit = () => {
//     if (!screenshot) {
//       toast.error("Please upload a screenshot.");
//       return;
//     }
    

//     setLoading(true);
//     const userId = localStorage.getItem("userId");

//     const formData = new FormData();
//     formData.append("paymentMethod", "BankTransfer");
//     formData.append("screenshot", screenshot);
//     formData.append("userId", userId);
//     axios
//       .post(`${ApiUrl}/api/payments/bankPayment`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((response) => {
//         setLoading(false);
//         toast.success("Screenshot uploaded successfully!");

//         handleOrderPlacementByBank(response.data.filePath);

//         setShowBankTransferModal(false);
//         // onSubmit({
//         //   paymentMethod: "bankTransfer",
//         //   screenshot: response.data.filePath,
//         // });
//       })
//       .catch((error) => {
//         setLoading(false);
//         toast.error("Error uploading screenshot.");
//         console.error("Error:", error);
//       });
//   };

//   const userId = localStorage.getItem("userId")

//   return (
//     <div className="flex flex-col md:flex-row py-10 px-2 gap-1">
//       {/* Card for Additional Information */}
//       <div className="flex-1 flex items-center justify-center md:w-[40%] w-[100%]">
//         <div className="bg-gray-200 shadow-lg rounded-lg p-6 mb-8 w-full h-full">
//           <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
//           <form>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Name:</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Phone Number:</label>
//               <input
//                 type="text"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Address:</label>
//               <input
//                 type="text"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">
//                 National ID Number:
//               </label>
//               <input
//                 type="text"
//                 value={nnicNumber}
//                 onChange={(e) => setNnicNumber(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">
//                 NNIC Front Image:
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) =>
//                   handleImageUpload(e, setFrontImage, setFrontImagePreview)
//                 }
//                 className="w-full p-2 border rounded"
//               />
//               {frontImagePreview && (
//                 <img
//                   src={frontImagePreview}
//                   alt="Front Image Preview"
//                   className="mt-2 w-48 h-32"
//                 />
//               )}

//               {frontImage && (
//                 <img
//                   src={frontImage}
//                   alt="NNIC Front"
//                   className="mt-4 w-48 h-32 object-cover"
//                 />
//               )}
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">
//                 NNIC Back Image:
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) =>
//                   handleImageUpload(e, setBackImage, setBackImagePreview)
//                 }
//                 className="w-full p-2 border rounded"
//               />
//               {backImagePreview && (
//                 <img
//                   src={backImagePreview}
//                   alt="Back Image Preview"
//                   className="mt-2 w-48 h-32"
//                 />
//               )}
//               {backImage && (
//                 <img
//                   src={backImage}
//                   alt="NNIC Back"
//                   className="mt-4 w-48 h-32 object-cover"
//                 />
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//       {/* Agreement Section */}
//       <div className="flex-1 bg-white shadow-lg rounded-lg p-6 md:w-[60%] w-[100%]">
//         <h1 className="text-2xl font-bold mb-4">
//           Conditions for Rental of Scaffolding
//         </h1>
//         <p className="mb-4">
//           This is an agreement made between{" "}
//           <span className="font-bold">DMA Transport & Scaffolding Ltd</span>{" "}
//           (Owner) and{" "}
//           <span className="underline">
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="border border-b-gray-950"
//             />
//           </span>{" "}
//           (Customer) in the year of our Lord 20
//           <span className="underline">
//             <input
//               type="number"
//               value={year}
//               onChange={(e) => setYear(e.target.value)}
//               className="border border-b-gray-950"
//             />
//           </span>
//         </p>
//         <ol className="list-decimal list-inside mb-4">
//           <li className="mb-2">
//             Scaffolding must be maintained in proper manner by client.
//           </li>
//           <li className="mb-2">
//             Scaffolding and/or components must not be thrown from any height so
//             as to cause damage to same.
//           </li>
//           <li className="mb-2">
//             All scaffolding must be kept at the job location for which it is
//             rented and must not be transferred to any other site without the
//             owner's written permission.
//           </li>
//           <li className="mb-2">
//             Scaffolding is rented on a daily basis for any part thereof.
//           </li>
//           <li className="mb-2">
//             Cost of rental and deposit must be paid in advance.
//           </li>
//           <li className="mb-2">
//             Saturday Sunday and Public Holidays are included in the days for
//             which rental is charged.
//           </li>
//           <li className="mb-2">
//             Scaffolding could be collected and rented between the hours of:
//           </li>
//           <ul className="list-disc list-inside pl-6 mb-2">
//             <li>7:30am - 3:30pm Mondays - Fridays</li>
//             <li>8:00am - 12:00noon Sundays</li>
//           </ul>
//           <li className="mb-2">
//             Scaffolding must be loaded or unloaded in the presence of the owner
//             or appointed agent at the time of collection or return.
//           </li>
//           <li className="mb-2">
//             In any case where any scaffolding and/or components are lost or
//             damaged the customer agrees to pay the owner the cost for the
//             equipment.
//           </li>
//         </ol>

//         <div className="flex items-center mt-8">
//           <input
//             type="checkbox"
//             id="agree"
//             checked={agreed}
//             onChange={handleAgreementChange}
//             className="mr-2"
//           />
//           <label htmlFor="agree" className="text-gray-700 font-bold">
//             I agree to the terms and conditions
//           </label>
//         </div>

//         {agreed && (
//           <div className="mt-4">
//             <button
//               className="bg-blue-500 text-white px-6 py-2 rounded font-bold"
//               onClick={handleAgree}
//             >
//               I Agree
//             </button>

//             {/* Payment Method Modal */}

//             {profilePage && (
//               <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                 <div className="bg-white p-6 rounded shadow-lg relative">
//                   <p className="absolute top-0 right-3 text-3xl cursor-pointer" onClick={()=> setProfilePage(false)}>x</p>
//                   <h2 className="text-2xl font-bold mb-4">
//                     First Complete your Profile
//                   </h2>
//                   <div className="flex flex-col gap-4">
//                     <button
//                       className="bg-blue-500 text-white px-4 py-2 rounded"
//                       onClick={() => navigate(`/profile/${userId}`)}
//                     >
//                       Go To Profile
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {showPaymentMethodModal && (
//               <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                 <div className="bg-white p-6 rounded shadow-lg relative">
//                   <p className="absolute top-0 right-3 text-3xl cursor-pointer" onClick={()=> setShowPaymentMethodModal(false)}>x</p>
//                   <h2 className="text-2xl font-bold mb-4">
//                     Select Payment Method
//                   </h2>
//                   <div className="flex flex-col gap-4">
//                     <button
//                       className="bg-blue-500 text-white px-4 py-2 rounded"
//                       onClick={handleOrderPlacement}
//                     >
//                       Cash On delivery
//                     </button>
//                     <button
//                       className="bg-blue-500 text-white px-4 py-2 rounded"
//                       onClick={makePayment}
//                     >
//                       Card
//                     </button>
//                     <button
//                       className="bg-blue-500 text-white px-4 py-2 rounded"
//                       onClick={() => setShowBankTransferModal(true)}
//                     >
//                       Bank Transfer
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Bank Transfer Modal */}
//             {/* <BankTransferModal
//               show={showBankTransferModal}
//               onClose={() => setShowBankTransferModal(false)}
//               onSubmit={handlePaymentSubmit}
//             /> */}

//             {showBankTransferModal && (
//               <>
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                   <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
//                     <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
//                       Bank Transfer Details
//                     </h2>
//                     <div className="mb-5">
//                       <label className="block text-lg font-medium text-gray-600 mb-1">
//                         Bank Name:
//                       </label>
//                       <p className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700">
//                         XYZ Bank
//                       </p>
//                     </div>
//                     <div className="mb-5">
//                       <label className="block text-lg font-medium text-gray-600 mb-1">
//                         Account Number:
//                       </label>
//                       <p className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700">
//                         123456789012
//                       </p>
//                     </div>
//                     <div className="mb-5">
//                       <label className="block text-lg font-medium text-gray-600 mb-1">
//                         Transaction ID:
//                       </label>
//                       <p className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700">
//                         TXN123456
//                       </p>
//                     </div>
//                     <div className="mb-6">
//                       <label className="block text-lg font-medium text-gray-600 mb-1">
//                         Upload Screenshot:
//                       </label>
//                       <input
//                         type="file"
//                         onChange={handleFileChange}
//                         className="w-full p-3 border rounded-lg bg-white text-gray-700"
//                       />
//                     </div>
//                     <div className="flex justify-end space-x-3">
//                       <button
//                         className="bg-gray-400 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-500"
//                         onClick={() => setShowBankTransferModal(false)}
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         className="bg-yellow-500 text-white px-5 py-2 rounded-lg shadow hover:bg-yellow-600"
//                         onClick={handleSubmit}
//                         disabled={loading}
//                       >
//                         {loading ? "Uploading..." : "Submit"}
//                       </button>
//                     </div>
//                   </div>
//                   <ToastContainer />
//                 </div>
//               </>
//             )}

//             {/* Card Payment Modal */}
//             <PaymentModal
//               show={showPaymentModal}
//               onClose={() => setShowPaymentModal(false)}
//               onSubmit={handlePaymentSubmit}
//             />
//           </div>
//         )}
//       </div>
//       {/* Modal for showing messages and order details */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h2 className="text-2xl font-bold mb-4">Message</h2>
//             <p>{modalMessage}</p>
//             {orderDetails && modalMessage === "Order Placed Successfully" && (
//               <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                 <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
//                   <h2 className="text-2xl font-bold mb-4">Message</h2>
//                   <p>{modalMessage}</p>

//                   {orderDetails.length > 0 && (
//                     <div className="mt-4">
//                       <h3 className="text-xl font-semibold">Order Details:</h3>
//                       <ul className="list-disc pl-6 mt-2">
//                         {orderDetails.map((order, index) => (
//                           <li key={index} className="mb-4">
//                             <div className="mt-2">
//                               <h4 className="font-bold">Order {index + 1}:</h4>
//                               <ul className="pl-4">
//                                 <li>
//                                   <strong>Product Name:</strong>{" "}
//                                   {order.productName}
//                                 </li>
//                                 <li>
//                                   <strong>Quantity:</strong> {order.quantity}
//                                 </li>
//                                 <li>
//                                   <strong>Price:</strong> {order.price}
//                                 </li>
//                                 <li>
//                                   <strong>Duration:</strong> {order.duration}
//                                 </li>
//                                 <li>
//                                   <strong>Rent Date:</strong>{" "}
//                                   {new Date(
//                                     order.rentDate
//                                   ).toLocaleDateString()}
//                                 </li>
//                                 <li>
//                                   <strong>Rent Return Date:</strong>{" "}
//                                   {new Date(
//                                     order.rentReturnDate
//                                   ).toLocaleDateString()}
//                                 </li>
//                                 <li>
//                                   <strong>Size:</strong> {order.size || "N/A"}
//                                 </li>
//                               </ul>
//                             </div>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}

//                   <button
//                     className="bg-red-500 text-white px-4 py-2 rounded mt-4"
//                     onClick={closeModal}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             )}

//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded mt-4"
//               onClick={closeModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Agreement;
