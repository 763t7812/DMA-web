

// src/Pages/Details/Details.jsx

// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { FaCircleCheck } from "react-icons/fa6";
// import { GiCancel } from "react-icons/gi";
// import ApiUrl from "../../Common/ApiUrl";
// import { addToCart } from "../../Slice/Cart/CartSlice";
// import AlertModal from "../../Components/Modal/AlertModal";

// const Details = () => {
//   const location = useLocation();
//   const { card } = location.state;
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const dispatch = useDispatch();

//   const handleImageLoad = () => {
//     setImageLoaded(true);
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setModalMessage("Please log in first.");
//       setIsModalOpen(true);
//       return;
//     }
//     dispatch(addToCart({ ...card, _id: card._id })); // Ensure _id is correctly passed
//     // Show a success message or update the UI to indicate the item has been added
//     setModalMessage("Product added to cart!");
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex md:flex-row flex-col justify-between">
//       <div className="md:w-[50%] w-[100%]">
//         {!imageLoaded && <Skeleton height={300} />}
//         <img
//           src={`${ApiUrl}${card.image}`}
//           alt={card.name}
//           className={`w-[100%] mb-4 ${imageLoaded ? "block" : "hidden"}`}
//           onLoad={handleImageLoad}
//         />
//       </div>
//       <div className="md:w-[45%] w-[100%]">
//         <h2 className="md:text-3xl text-xl font-bold mb-4 capitalize">
//           {card.name}
//         </h2>
//         <p className="mb-2 md:text-md text-sm font-semibold text-gray-500">
//           {card.description}
//         </p>
//         <div className="flex justify-between">
//           <p className="mb-2 font-bold md:text-xl text-md">
//             ${card.rentalPrice}
//           </p>
//           <p className="mb-2 font-bold md:text-xl text-md">{card.duration}</p>
//         </div>
//         <div className="flex items-center">
//           <p className="mr-2">
//             {card.available ? (
//               <FaCircleCheck className="text-customColor-circleColor" />
//             ) : (
//               <GiCancel className="text-red-500" />
//             )}
//           </p>
//           <p className="font-semibold md:text-lg text-sm">In Stock</p>
//         </div>
//         <div>
//           <button
//             onClick={handleAddToCart}
//             className="bg-customColor-circleColor px-3 py-1 rounded text-white"
//           >
//             ADD TO CART
//           </button>
//         </div>
//       </div>
//       <AlertModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         message={modalMessage}
//       />
//     </div>
//   );
// };

// export default Details;


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaCircleCheck } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";
import ApiUrl from "../../Common/ApiUrl";
import { addToCart } from "../../Slice/Cart/CartSlice";
import AlertModal from "../../Components/Modal/AlertModal";

const Details = () => {
  const location = useLocation();
  const { card } = location.state;

  console.log("***************", card)
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(
    card?.size?.length > 0 ? card?.size[0] : ''
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    // if (!token) {
    //   setModalMessage("Please log in first.");
    //   setIsModalOpen(true);
    //   return;
    // }
    // if (!selectedSize) {
    //   setModalMessage("Please select a size.");
    //   setIsModalOpen(true);
    //   return;
    // }
    console.log(size)
    dispatch(addToCart({ ...card, _id: card._id, size: selectedSize })); // Ensure _id and size are correctly passed
    // Show a success message or update the UI to indicate the item has been added
    setModalMessage("Product added to cart!");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex md:flex-row flex-col justify-between">
      <div className="md:w-[50%] w-[100%]">
        {!imageLoaded && <Skeleton height={300} />}
        <img
          src={`${ApiUrl}${card.image}`}
          alt={card.name}
          className={`w-[100%] h-[70%] mb-4 ${imageLoaded ? "block" : "hidden"}`}
          onLoad={handleImageLoad}
        />
      </div>
      <div className="md:w-[45%] w-[100%]">
        <h2 className="md:text-3xl text-xl font-bold mb-4 capitalize">
          {card?.name}
        </h2>
        <p className="mb-2 md:text-md text-sm font-semibold text-gray-500">
          {card?.description}
        </p>
        <div className="flex justify-between">
          <p className="mb-2 font-bold md:text-xl text-md">
            ${card?.rentalPrice}
          </p>
          <p className="mb-2 font-bold md:text-xl text-md">{card?.duration}</p>
        </div>
        <div className="flex items-center">
          <p className="mr-2">
            {card?.available ? (
              <FaCircleCheck className="text-customColor-circleColor" />
            ) : (
              <GiCancel className="text-red-500" />
            )}
          </p>
          <p className="font-semibold md:text-lg text-sm">In Stock</p>
        </div>
        <div>
          <label htmlFor="size" className="block font-semibold md:text-lg text-sm">
            Select Size:
          </label>
          <select
            id="size"
            className="border border-gray-300 rounded px-2 py-1"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="" disabled>
              Choose size
            </option>
            {card?.size?.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            onClick={handleAddToCart}
            className="bg-customColor-circleColor px-3 py-1 rounded text-white mt-4"
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <AlertModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message={modalMessage}
      />
    </div>
  );
};

export default Details;
