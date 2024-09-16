// //20july24
// // import React, { useEffect, useState } from "react";
// // import { GiThorHammer } from "react-icons/gi";
// // import { GrSettingsOption } from "react-icons/gr";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import axios from "axios";
// // import Banner1 from "../../assets/Images/dma_work.jpg";
// // import Card from "../../Components/Card/Card";
// // import ApiUrl from "../../Common/ApiUrl";
// // import MoneyBack from "../../Components/Sections/MoneyBack";
// // import Scaffolding from "../../Components/Sections/Scaffolding";
// // import { setAuthData, clearAuthData } from "../../Slice/Auth/AuthSlice"; // Import your actions

// // const HomePage = () => {
// //   const [cardData, setCardData] = useState([]);
// //   const [showAllCards, setShowAllCards] = useState(false);
// //   const [favorites, setFavorites] = useState({});
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const { userId } = useSelector((state) => state.auth); // Access userId from Redux state

// //   const card = [
// //     {
// //       icon: <GiThorHammer />,
// //       heading: "Visit Auction",
// //       desc: "Find machineries on auction",
// //       coming: "coming soon",
// //     },
// //     {
// //       icon: <GrSettingsOption />,
// //       heading: "Browse Parts",
// //       desc: "Find attachments and parts",
// //       coming: "coming soon",
// //     },
// //   ];

// //   useEffect(() => {
// //     const getNewArrivals = async () => {
// //       try {
// //         const res = await axios.get(`${ApiUrl}/api/inventory/get-inventory`);
// //         const resData = res.data;
// //         setCardData(resData);
// //       } catch (error) {
// //         console.error("Error fetching new arrivals:", error);
// //       }
// //     };

// //     getNewArrivals();
// //   }, []);

// //   const handleCardClick = (card) => {
// //     navigate("/detail", { state: { card } });
// //   };

// //   const handleShowAllProducts = () => {
// //     navigate("/show-all-products");
// //   };

// //   const handleFavorite = async (card) => {

// //     console.log("item id", card._id)
// //     console.log("user's id", userId)
// //     try {
// //       const response = await axios.post(`${ApiUrl}/api/favourites/add`, {
// //         itemId: card._id,
// //         userId, // Send userId along with the request
// //       });
// //       console.log("favourite response", response)
// //       if (response.data.success) {
// //         setFavorites((prevFavorites) => ({
// //           ...prevFavorites,
// //           [card._id]: true,
// //         }));
// //         alert("Product added to favorites"); // Show success message
// //       }
// //     } catch (error) {
// //       console.error("Error adding to favorites:", error);
// //     }
// //   };

// //   return (
// //     <div className="h-auto">
// //       <section>
// //         <div
// //           className="relative w-full  h-[70vh] bg-cover"
// //           style={{ backgroundImage: `url(${Banner1})` }}
// //         >
// //           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center">
// //             <h1 className="text-white lg:text-4xl md:text-2xl text-xl px-20 font-bold flex">
// //               World's Top Marketplace for Scaffolding, Attachments and Parts
// //             </h1>
// //           </div>
// //         </div>
// //       </section>
// //       <section className="relative overflow-hidden mb-10">
// //         <div className="w-96 h-96 bg-customColor-circleColor opacity-55 absolute -right-28 -top-10 rounded-full blur-sm -z-10"></div>
// //         <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
// //           <div className="flex flex-wrap items-center">
// //             <div className="w-full md:w-1/2 md:pr-6">
// //               <h1 className="lg:text-3xl md:text-2xl text-xl font-bold mb-4">
// //                 Shop for{" "}
// //                 <span className="text-customColor-circleColor">
// //                   Scaffolding
// //                 </span>
// //               </h1>
// //               <p className="lg:text-lg text-md mb-4 text-customColor-paraColor font-normal">
// //                 Browse excavators, forklift, trucks, rollers, cranes etc. Brands
// //                 include Komatsu, Kobelco, Caterpillar and more
// //               </p>
// //               <p className="cursor-pointer font-bold underline underline-offset-4">
// //                 See More
// //               </p>
// //             </div>
// //             <div className="w-full md:w-1/2 mt-4 md:mt-0 flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row gap-4">
// //               {card.map((Ele, index) => (
// //                 <div
// //                   className="bg-white p-4 rounded-lg shadow-md w-full"
// //                   key={index}
// //                 >
// //                   <div className="flex justify-center items-center">
// //                     <p className="lg:text-6xl md:text-3xl text-xl text-customColor-circleColor">
// //                       {Ele.icon}
// //                     </p>
// //                   </div>
// //                   <h1 className="lg:text-xl text-md font-bold mb-2">
// //                     {Ele.heading}
// //                   </h1>
// //                   <p className="text-customColor-paraColor font-normal mb-4">
// //                     {Ele.desc}
// //                   </p>
// //                   <div className="text-center">
// //                     <Link
// //                       to=""
// //                       className="text-sm font-bold underline-offset-4 underline"
// //                     >
// //                       {Ele.coming}
// //                     </Link>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       <section className="relative overflow-hidden">
// //         <div className="w-96 h-96 bg-customColor-circleColor opacity-55 absolute -left-28 top-10 rounded-full blur-sm -z-10"></div>
// //         <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
// //           <h1 className="lg:text-4xl md:text-2xl text-lg font-bold">
// //             New <span className="text-customColor-circleColor">Arrivals</span>
// //           </h1>
// //           <div className="flex justify-between mb-10">
// //             <div>
// //               <p className="text-customColor-paraColor text-sm font-semibold">
// //                 See the latest machine listings. While stock lasts.
// //               </p>
// //             </div>
// //             <p className="">
// //               <button
// //                 onClick={handleShowAllProducts}
// //                 className="font-bold underline underline-offset-4 lg:text-sm text-xs"
// //               >
// //                 Show All Products
// //               </button>
// //             </p>
// //           </div>
// //           <section>
// //             <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
// //               {showAllCards
// //                 ? cardData.map((card, index) => (
// //                     <Card
// //                       key={index}
// //                       image={card.image}
// //                       title={card.name}
// //                       description={card.description}
// //                       price={card.rentalPrice}
// //                       onClick={() => handleCardClick(card)}
// //                       onFavorite={() => handleFavorite(card)}
// //                       isFavorite={favorites[card._id]}
// //                     />
// //                   ))
// //                 : cardData
// //                     .slice(0, 8)
// //                     .map((card, index) => (
// //                       <Card
// //                         key={index}
// //                         image={card.image}
// //                         title={card.name}
// //                         description={card.description}
// //                         price={card.rentalPrice}
// //                         onClick={() => handleCardClick(card)}
// //                         onFavorite={() => handleFavorite(card)}
// //                         isFavorite={favorites[card._id]}
// //                       />
// //                     ))}
// //             </div>
// //           </section>
// //         </div>
// //       </section>

// //       <section className="text-center">
// //         <h1 className="lg:text-4xl md:text-2xl text-xl font-bold">
// //           Shop from world renowned machinery
// //           <span className="text-customColor-circleColor">brands</span>
// //         </h1>
// //       </section>

// //       <section>
// //         <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
// //           <h1 className="lg:text-4xl md:text-2xl text-xl font-bold">
// //             Shop
// //             <span className="text-customColor-circleColor">
// //               Attachments and Parts
// //             </span>
// //           </h1>
// //           <p className="text-customColor-paraColor font-semibold">
// //             Accept that it’s sometimes okay to focus just on the content.
// //           </p>
// //           {/* <div className="text-right">
// //             <Link className=" underline underline-offset-4 font-bold">
// //               All Products
// //             </Link>
// //           </div> */}
// //         </div>
// //       </section>

// //       <div>
// //         <MoneyBack />
// //       </div>
// //       <div>
// //         <Scaffolding />
// //       </div>
// //     </div>
// //   );
// // };

// // export default HomePage;

// import React, { useEffect, useState } from "react";
// import { GiThorHammer } from "react-icons/gi";
// import { GrSettingsOption } from "react-icons/gr";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import Banner1 from "../../assets/Images/dma_work.jpg";
// import Card from "../../Components/Card/Card";
// import ApiUrl from "../../Common/ApiUrl";
// import MoneyBack from "../../Components/Sections/MoneyBack";
// import Scaffolding from "../../Components/Sections/Scaffolding";
// import { setAuthData, clearAuthData } from "../../Slice/Auth/AuthSlice"; // Import your actions

// const HomePage = () => {
//   const [cardData, setCardData] = useState([]);
//   const [showAllCards, setShowAllCards] = useState(false);
//   const [favorites, setFavorites] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { userId } = useSelector((state) => state.auth); // Access userId from Redux state

//   const card = [
//     {
//       icon: <GiThorHammer />,
//       heading: "Visit Auction",
//       desc: "Find machineries on auction",
//       coming: "coming soon",
//     },
//     {
//       icon: <GrSettingsOption />,
//       heading: "Browse Parts",
//       desc: "Find attachments and parts",
//       coming: "coming soon",
//     },
//   ];

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     const getNewArrivals = async () => {
//       try {
//         const res = await axios.get(`${ApiUrl}/api/inventory/get-inventory`);
//         const resData = res.data;
//         setCardData(resData);
//       } catch (error) {
//         console.error("Error fetching new arrivals:", error);
//       }
//     };

//     getNewArrivals();
//   }, []);

//   const handleCardClick = (card) => {
//     navigate("/detail", { state: { card } });
//   };

//   const handleShowAllProducts = () => {
//     navigate("/show-all-products");
//   };

//   const handleFavorite = async (card) => {
//     console.log("item id", card._id);
//     console.log("user's id", userId);
//     try {
//       const response = await axios.post(`${ApiUrl}/api/favourites/add`, {
//         itemId: card._id,
//         userId, // Send userId along with the request
//       });
//       console.log("favourite response", response);
//       if (response.status == 201) {
//         setFavorites((prevFavorites) => ({
//           ...prevFavorites,
//           [card._id]: true,
//         }));
//         setShowSuccessMessage(true);
//         setTimeout(() => {
//           setShowSuccessMessage(false);
//         }, 3000); // Hide the success message after 3 seconds
//       }
//     } catch (error) {
//       console.error("Error adding to favorites:", error);
//     }
//   };

//   return (
//     <div className="h-auto">
//       {showSuccessMessage && (
//         <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2">
//           Product added to favorites successfully!
//         </div>
//       )}
//       <section>
//         <div
//           className="relative w-full h-[70vh] bg-cover"
//           style={{ backgroundImage: `url(${Banner1})` }}
//         >
//           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center">
//             <h1 className="text-white lg:text-6xl md:text-3xl text-2xl px-20 font-bold flex">
//               {/* World's Top Marketplace for Scaffolding, Attachments and Parts */}
//               No Job is Too Big or Too Small
//             </h1>
//           </div>
//         </div>
//       </section>
//       <section className="relative overflow-hidden mb-10">
//         <div className="w-96 h-96 bg-customColor-circleColor opacity-55 absolute -right-28 -top-10 rounded-full blur-sm -z-10"></div>
//         <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
//           <div className="flex flex-wrap items-center">
//             <div className="w-full  md:pr-6 flex flex-col justify-center items-center">
//               <h1 className="lg:text-5xl md:text-3xl text-2xl font-bold mb-4">
//                 Shop for{" "}
//                 <span className="text-customColor-circleColor">
//                   Scaffolding
//                 </span>
//               </h1>
//               <p className="lg:text-2xl text-lg mb-4 text-customColor-paraColor font-normal">
//                 “Browse for H-Frame, Cuplock, Tube&Clamp, Accessories,
//                 Equipment, tools”
//               </p>

//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="relative overflow-hidden">
//         <div className="w-96 h-96 bg-customColor-circleColor opacity-55 absolute -left-28 top-10 rounded-full blur-sm -z-10"></div>
//         <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
//           <h1 className="lg:text-4xl md:text-2xl text-lg font-bold">
//             New <span className="text-customColor-circleColor">Arrivals</span>
//           </h1>
//           <div className="flex justify-between mb-10">
//             <div>
//               <p className="text-customColor-paraColor text-sm font-semibold">
//                 See the latest scaffolding listings. While stocks last.
//               </p>
//             </div>
//             <p className="">
//               <button
//                 onClick={handleShowAllProducts}
//                 className="font-bold underline underline-offset-4 lg:text-sm text-xs"
//               >
//                 Show All Products
//               </button>
//             </p>
//           </div>
//           <section>
//             <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
//               {showAllCards
//                 ? cardData.map((card, index) => (
//                     <Card
//                       key={index}
//                       image={card.image}
//                       title={card.name}
//                       description={card.description}
//                       price={card.rentalPrice}
//                       onClick={() => handleCardClick(card)}
//                       onFavorite={() => handleFavorite(card)}
//                       isFavorite={favorites[card._id]}
//                     />
//                   ))
//                 : cardData
//                     .slice(0, 8)
//                     .map((card, index) => (
//                       <Card
//                         key={index}
//                         image={card.image}
//                         title={card.name}
//                         description={card.description}
//                         price={card.rentalPrice}
//                         onClick={() => handleCardClick(card)}
//                         onFavorite={() => handleFavorite(card)}
//                         isFavorite={favorites[card._id]}
//                       />
//                     ))}
//             </div>
//           </section>
//         </div>
//       </section>

//       <section className="text-center">
//         <h1 className="lg:text-4xl md:text-2xl text-xl font-bold">
//           Shop from world renowned Scaffolding {" "}
//           <span className="text-customColor-circleColor">brands</span>
//         </h1>
//       </section>

//       <section>
//         <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
//           <h1 className="lg:text-4xl md:text-2xl text-xl font-bold">
//             Shop{" "}
//             <span className="text-customColor-circleColor">
//               Attachments and Parts
//             </span>
//           </h1>
//           <p className="text-customColor-paraColor font-semibold">
//             Accept that it’s sometimes okay to focus just on the content.
//           </p>
//           {/* <div className="text-right">
//             <Link className=" underline underline-offset-4 font-bold">
//               All Products
//             </Link>
//           </div> */}
//         </div>
//       </section>

//       <div>
//         <MoneyBack />
//       </div>
//       <div>
//         <Scaffolding />
//       </div>
//     </div>
//   );
// };

// export default HomePage;

// //22july24
// // import React, { useEffect, useState } from "react";
// // import { GiThorHammer } from "react-icons/gi";
// // import { GrSettingsOption } from "react-icons/gr";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import axios from "axios";
// // import Banner1 from "../../assets/Images/dma_work.jpg";
// // import Card from "../../Components/Card/Card";
// // import ApiUrl from "../../Common/ApiUrl";
// // import MoneyBack from "../../Components/Sections/MoneyBack";
// // import Scaffolding from "../../Components/Sections/Scaffolding";
// // import { fetchFavorites, addFavorite, removeFavorite } from "../../Slice/FavouriteSlice/FavouriteSlice";

// // const HomePage = () => {
// //   const [cardData, setCardData] = useState([]);
// //   const [showAllCards, setShowAllCards] = useState(false);
// //   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const { userId } = useSelector((state) => state.auth);
// //   const favorites = useSelector((state) => state.favorites);

// //   const card = [
// //     {
// //       icon: <GiThorHammer />,
// //       heading: "Visit Auction",
// //       desc: "Find machineries on auction",
// //       coming: "coming soon",
// //     },
// //     {
// //       icon: <GrSettingsOption />,
// //       heading: "Browse Parts",
// //       desc: "Find attachments and parts",
// //       coming: "coming soon",
// //     },
// //   ];

// //   useEffect(() => {
// //     const getNewArrivals = async () => {
// //       try {
// //         const res = await axios.get(`${ApiUrl}/api/inventory/get-inventory`);
// //         const resData = res.data;
// //         setCardData(resData);
// //       } catch (error) {
// //         console.error("Error fetching new arrivals:", error);
// //       }
// //     };

// //     getNewArrivals();
// //     if (userId) {
// //       dispatch(fetchFavorites(userId));
// //     }
// //   }, [userId, dispatch]);

// //   const handleCardClick = (card) => {
// //     navigate("/detail", { state: { card } });
// //   };

// //   const handleShowAllProducts = () => {
// //     navigate("/show-all-products");
// //   };

// //   const handleFavorite = async (card) => {
// //     try {
// //       const isFavorite = favorites.some(fav => fav.itemId._id === card._id);
// //       let response;

// //       if (isFavorite) {
// //         response = await dispatch(removeFavorite({ itemId: card._id, userId }));
// //       } else {
// //         response = await dispatch(addFavorite({ itemId: card._id, userId }));
// //       }

// //       if (response.payload && response.payload.status === 201) {
// //         setShowSuccessMessage(true);
// //         setTimeout(() => setShowSuccessMessage(false), 3000); // Hide message after 3 seconds
// //       }
// //     } catch (error) {
// //       console.error("Error handling favorite:", error);
// //     }
// //   };

// //   return (
// //     <div className="h-auto">
// //       {showSuccessMessage && (
// //         <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2">
// //           Product added to favorites successfully!
// //         </div>
// //       )}
// //       <section>
// //         <div
// //           className="relative w-full h-[70vh] bg-cover"
// //           style={{ backgroundImage: `url(${Banner1})` }}
// //         >
// //           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center">
// //             <h1 className="text-white lg:text-4xl md:text-2xl text-xl px-20 font-bold flex">
// //               World's Top Marketplace for Scaffolding, Attachments and Parts
// //             </h1>
// //           </div>
// //         </div>
// //       </section>
// //       <section className="relative overflow-hidden mb-10">
// //         <div className="w-96 h-96 bg-customColor-circleColor opacity-55 absolute -right-28 -top-10 rounded-full blur-sm -z-10"></div>
// //         <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
// //           <div className="flex flex-wrap items-center">
// //             <div className="w-full md:w-1/2 md:pr-6">
// //               <h1 className="lg:text-3xl md:text-2xl text-xl font-bold mb-4">
// //                 Shop for{" "}
// //                 <span className="text-customColor-circleColor">
// //                   Scaffolding
// //                 </span>
// //               </h1>
// //               <p className="lg:text-lg text-md mb-4 text-customColor-paraColor font-normal">
// //                 Browse excavators, forklift, trucks, rollers, cranes etc. Brands
// //                 include Komatsu, Kobelco, Caterpillar and more
// //               </p>
// //               <p className="cursor-pointer font-bold underline underline-offset-4">
// //                 See More
// //               </p>
// //             </div>
// //             <div className="w-full md:w-1/2 mt-4 md:mt-0 flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row gap-4">
// //               {card.map((Ele, index) => (
// //                 <div
// //                   className="bg-white p-4 rounded-lg shadow-md w-full"
// //                   key={index}
// //                 >
// //                   <div className="flex justify-center items-center">
// //                     <p className="lg:text-6xl md:text-3xl text-xl text-customColor-circleColor">
// //                       {Ele.icon}
// //                     </p>
// //                   </div>
// //                   <h1 className="lg:text-xl text-md font-bold mb-2">
// //                     {Ele.heading}
// //                   </h1>
// //                   <p className="text-customColor-paraColor font-normal mb-4">
// //                     {Ele.desc}
// //                   </p>
// //                   <div className="text-center">
// //                     <Link
// //                       to=""
// //                       className="text-sm font-bold underline-offset-4 underline"
// //                     >
// //                       {Ele.coming}
// //                     </Link>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       <section className="relative overflow-hidden">
// //         <div className="w-96 h-96 bg-customColor-circleColor opacity-55 absolute -left-28 top-10 rounded-full blur-sm -z-10"></div>
// //         <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
// //           <h1 className="lg:text-4xl md:text-2xl text-lg font-bold">
// //             New <span className="text-customColor-circleColor">Arrivals</span>
// //           </h1>
// //           <div className="flex justify-between mb-10">
// //             <div>
// //               <p className="text-customColor-paraColor text-sm font-semibold">
// //                 See the latest machine listings in our inventory
// //               </p>
// //             </div>
// //             <div className="text-right">
// //               <button
// //                 className=" underline underline-offset-4 font-bold"
// //                 onClick={handleShowAllProducts}
// //               >
// //                 All Products
// //               </button>
// //             </div>
// //           </div>
// //           <section>
// //             <div className="flex flex-wrap justify-center gap-4 md:justify-between lg:gap-4">
// //               {cardData.length > 0 &&
// //                 cardData
// //                   .slice(0, showAllCards ? cardData.length : 8)
// //                   .map((card, index) => (
// //                     <Card
// //                       key={index}
// //                       image={card.image}
// //                       title={card.name}
// //                       description={card.description}
// //                       price={card.rentalPrice}
// //                       onClick={() => handleCardClick(card)}
// //                       onFavorite={() => handleFavorite(card)}
// //                       isFavorite={favorites.some(fav => fav.itemId._id === card._id)}
// //                     />
// //                   ))}
// //             </div>
// //           </section>
// //         </div>
// //       </section>

// //       <section className="text-center">
// //         <h1 className="lg:text-4xl md:text-2xl text-xl font-bold">
// //           Shop from world renowned machinery{" "}
// //           <span className="text-customColor-circleColor">brands</span>
// //         </h1>
// //       </section>

// //       <section>
// //         <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
// //           <h1 className="lg:text-4xl md:text-2xl text-xl font-bold">
// //             Shop{" "}
// //             <span className="text-customColor-circleColor">
// //               Attachments and Parts
// //             </span>
// //           </h1>
// //           <p className="text-customColor-paraColor font-semibold">
// //             Accept that it’s sometimes okay to focus just on the content.
// //           </p>
// //           {/* <div className="text-right">
// //             <Link className=" underline underline-offset-4 font-bold">
// //               All Products
// //             </Link>
// //           </div> */}
// //         </div>
// //       </section>

// //       <div>
// //         <MoneyBack />
// //       </div>
// //       <div>
// //         <Scaffolding />
// //       </div>
// //     </div>
// //   );
// // };

// // export default HomePage;



import React, { useEffect, useState } from "react";
import { GiThorHammer } from "react-icons/gi";
import { GrSettingsOption } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Banner1 from "../../assets/Images/dma_work.jpg";
import Card from "../../Components/Card/Card";
import ApiUrl from "../../Common/ApiUrl";
import MoneyBack from "../../Components/Sections/MoneyBack";
import Scaffolding from "../../Components/Sections/Scaffolding";
import { setAuthData, clearAuthData } from "../../Slice/Auth/AuthSlice"; // Import your actions
const HomePage = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [showAllCards, setShowAllCards] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { userId } = useSelector((state) => state.auth); // Access userId from Redux state

  const card = [
    {
      icon: <GiThorHammer />,
      heading: "Visit Auction",
      desc: "Find machineries on auction",
      coming: "coming soon",
    },
    {
      icon: <GrSettingsOption />,
      heading: "Browse Parts",
      desc: "Find attachments and parts",
      coming: "coming soon",
    },
  ];
const [shortAccess , setShortAccess] = useState([])


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getNewArrivals = async () => {
      try {
        const res = await axios.get(`${ApiUrl}/api/inventory/get-inventory`);
        const resData = res.data;
        setCardData(resData);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    const getShortAceessories = async () => {
      try {
        const shortRes = await axios.get(`${ApiUrl}/api/inventory/short`)
        console.log("api data coming from end points", shortRes)
        setShortAccess(shortRes.data)
      } catch (error) {
        console.log(error)
      }
    }
    getShortAceessories()
    getNewArrivals();
  }, []);

  console.log(shortAccess , "cdgjh  fshj ")



  const handleCardClick = (card) => {
    console.log(card , "asdf my cardsss")
    navigate("/detail", { state: { card } });
  };

  const handleShowAllProducts = () => {
    navigate("/show-all-products");
  };

  const handleFavorite = async (card) => {
    console.log("item id", card._id);
    const userId = localStorage.getItem("userId")
    console.log("user's id*************", userId);
    try {
      const response = await axios.post(`${ApiUrl}/api/favourites/add`, {
        itemId: card._id,
        userId, // Send userId along with the request
      });
      console.log("favourite response", response);
      if (response.status == 201) {
        setFavorites((prevFavorites) => ({
          ...prevFavorites,
          [card._id]: true,
        }));
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000); // Hide the success message after 3 seconds
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };



  console.log(favorites, "121213131")

  const handleShortItems = ()=>{
    navigate("/showAllShortAccessories")
  }


  return (
    <div className="h-auto">
      {showSuccessMessage && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2">
          Product added to favorites successfully!
        </div>
      )}
      <section>
        <div
          className="relative w-full h-[70vh] bg-cover"
          style={{ backgroundImage: `url(${Banner1})` }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center">
            <h1 className="text-white lg:text-6xl md:text-3xl text-2xl px-20 font-bold flex">
              No Job is Too Big or Too Small
            </h1>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden mb-10">
        <div className="w-96 h-96 bg-customColor-circleColor opacity-55 absolute -right-28 -top-10 rounded-full blur-sm -z-10"></div>
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:pr-6 flex flex-col justify-center items-center">
              <h1 className="lg:text-5xl md:text-3xl text-2xl font-bold mb-4" >
                Shop for{" "}
                <span className="text-customColor-circleColor">
                  Scaffolding
                </span>
              </h1>
              <p className="lg:text-2xl text-lg mb-4 text-customColor-paraColor font-normal">
                “Browse for H-Frame, Cuplock, Tube&Clamp, Accessories,
                Equipment, tools”
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="w-96 h-96 bg-customColor-circleColor opacity-55 absolute -left-28 top-10 rounded-full blur-sm -z-10"></div>
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="lg:text-4xl md:text-2xl text-lg font-bold">
            New <span className="text-customColor-circleColor">Arrivals</span>
          </h1>
          <div className="flex justify-between mb-10">
            <div>
              <p className="text-customColor-paraColor text-sm font-semibold">
                See the latest scaffolding listings. While stocks last.
              </p>
            </div>
            <p className="">
              <button
                onClick={handleShowAllProducts}
                className="font-bold underline underline-offset-4 lg:text-sm text-xs"
              >
                Show All Products
              </button>
            </p>
          </div>
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {loading
                ? Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="w-full">
                    <Skeleton height={200} />
                    <Skeleton count={3} />
                  </div>
                ))
                : (showAllCards ? cardData : cardData.slice(0, 8)).map((card, index) => (
                  <Card
                    key={index}
                    id={card._id}
                    image={card.image}
                    title={card.name}
                    description={card.description}
                    price={card.rentalPrice}
                    onClick={() => handleCardClick(card)}
                    onFavorite={() => handleFavorite(card)}
                    isFavorite={favorites[card._id]}
                  />
                ))}
            </div>
          </section>
        </div>
      </section>

      <section className="text-center">
        <h1 className="lg:text-4xl md:text-2xl text-xl font-bold">
          Shop for High quality and the best Standards {" "}
          <span className="text-customColor-circleColor">Scaffolding</span>
        </h1>
      </section>

      <section>
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="lg:text-4xl md:text-2xl text-xl font-bold">
            Shop for{" "}
            <span className="text-customColor-circleColor">
              Scaffolding Accessories
            </span>
          </h1>
          <p className="text-customColor-paraColor font-semibold">
            Get the highest quality and standard accessories here!
          </p>
          <p className="text-end">
              <button
                onClick={handleShortItems}
                className="font-bold underline underline-offset-4 lg:text-sm text-xs"
              >
                Show All Products
              </button>
            </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {loading
                ? Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="w-full">
                    <Skeleton height={200} />
                    <Skeleton count={3} />
                  </div>
                ))
                : (showAllCards ? shortAccess : shortAccess.slice(0, 8)).map((card, index) => (
                  <Card
                    key={index}
                    id={card._id}
                    image={card.image}
                    title={card.name}
                    description={card.description}
                    price={card.rentalPrice}
                    onClick={() => handleCardClick(card)}
                    onFavorite={() => handleFavorite(card)}
                    isFavorite={favorites[card._id]}
                  />
                ))}
            </div>
        </div>
      </section>

      <div>
        <MoneyBack />
      </div>
      <div>
        <Scaffolding />
      </div>
    </div>
  );
};

export default HomePage;
