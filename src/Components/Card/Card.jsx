//20july24
// import React, { useState, useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton CSS
// import ApiUrl from "../../Common/ApiUrl";

// const Card = ({ image, title, description, price, onClick }) => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate data fetching
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 50); // Replace with actual data fetching logic
//   }, []);

//   return (
//     <div
//       className="max-w-xs overflow-hidden cursor-pointer r"
//       onClick={onClick}
//     >
//       {isLoading ? (
//         <Skeleton height={192} />
//       ) : (
//         <img
//           src={`${ApiUrl}${image}`}
//           alt={title}
//           className="w-full hover:scale-105 ease-in-out duration-2000 h-48  object-cover"
//         />
//       )}
//       <h2 className="lg:text-lg text-sm font-semibold">
//         {isLoading ? <Skeleton width={100} /> : title}
//       </h2>
//       <p className="text-gray-500 lg:text-md text-sm">
//         {isLoading ? <Skeleton count={2} /> : description.substring(0, 50)}.....
//       </p>
//       <p className="lg:text-sm text-xs font-bold text-red-600 mt-2">
//         {isLoading ? <Skeleton width={50} /> : `$${price}`}
//       </p>
//     </div>
//   );
// };

// export default Card;

//22july24
// import React, { useState, useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton CSS
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Import heart icons
// import ApiUrl from "../../Common/ApiUrl";

// const Card = ({ image, title, description, price, onClick, onFavorite, isFavorite }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [favouriteItems, setFavouriteItems] = useState("")

//   useEffect(() => {
//     // Simulate data fetching
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 50); // Replace with actual data fetching logic
//   }, []);


//   return (
//     <div className="relative max-w-xs overflow-hidden cursor-pointer" onClick={onClick}>
//       {isLoading ? (
//         <Skeleton height={192} />
//       ) : (
//         <img
//           src={`${ApiUrl}${image}`}
//           alt={title}
//           className="w-full hover:scale-105 ease-in-out duration-2000 h-48 object-cover"
//         />
//       )}
//       <div className="absolute top-2 right-2 bg-customColor-circleColor p-2 rounded">
//         {isFavorite ? (
//           <AiFillHeart
//             className="text-red-500 text-2xl cursor-pointer "
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent triggering onClick of the card
//               onFavorite();
//             }}
//           />
//         ) : (
//           <AiOutlineHeart
//             className="text-white text-2xl cursor-pointer"
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent triggering onClick of the card
//               onFavorite();
//             }}
//           />
//         )}
//       </div>
//       <h2 className="lg:text-lg text-sm font-semibold">
//         {isLoading ? <Skeleton width={100} /> : title}
//       </h2>
//       <p className="text-gray-500 lg:text-md text-sm">
//         {isLoading ? <Skeleton count={2} /> : `${description.substring(0, 50)}.....`}
//       </p>
//       <p className="lg:text-sm text-xs font-bold text-red-600 mt-2">
//         {isLoading ? <Skeleton width={50} /> : `$${price}`}
//       </p>
//     </div>
//   );
// };

// export default Card;



// import React, { useState, useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton CSS
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Import heart icons
// import ApiUrl from "../../Common/ApiUrl";

// const Card = ({ image, title, description, price, onClick, onFavorite, isFavorite, id }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [getId, setGetId] = useState([])
//   console.log(id, "*******my id")

//   const getAllIds = async () => {
//     try {
//       const res = await fetch(`https://2lkz6gq8-5002.inc1.devtunnels.ms/api/favourites/66bdd47a18760383ef698b01`)
//       const data = await res.json();
//       console.log(data, "its")
//       setGetId(data)
//     } catch (error) {
//       console.log(error)
//     }
//   }




//   useEffect(() => {
//     // Simulate data fetching
//     getAllIds()
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 50); // Replace with actual data fetching logic
//   }, []);

//   console.log(isFavorite, "favorite")

//   return (
//     <div className="relative max-w-xs overflow-hidden cursor-pointer" onClick={onClick}>
//       {isLoading ? (
//         <Skeleton height={192} />
//       ) : (
//         <img
//           src={`${ApiUrl}${image}`}
//           alt={title}
//           className="w-full hover:scale-105 ease-in-out duration-2000 h-48 object-cover"
//         />
//       )}
//       <div className="absolute top-2 right-2 bg-customColor-circleColor p-2 rounded">
//         {isFavorite ? (
//           <AiFillHeart
//             className="text-red-500 text-2xl cursor-pointer "
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent triggering onClick of the card
//               onFavorite();
//             }}
//           />
//         ) : (
//           <AiOutlineHeart
//             className="text-white text-2xl cursor-pointer"
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent triggering onClick of the card
//               onFavorite();
//             }}
//           />
//         )}
//       </div>
//       <h2 className="lg:text-lg text-sm font-semibold">
//         {isLoading ? <Skeleton width={100} /> : title}
//       </h2>
//       <p className="text-gray-500 lg:text-md text-sm">
//         {isLoading ? <Skeleton count={2} /> : `${description.substring(0, 50)}.....`}
//       </p>
//       <p className="lg:text-sm text-xs font-bold text-red-600 mt-2">
//         {isLoading ? <Skeleton width={50} /> : `$${price}`}
//       </p>
//     </div>
//   );
// };

// export default Card;



// import React, { useState, useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton CSS
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Import heart icons
// import ApiUrl from "../../Common/ApiUrl";

// const Card = ({ image, title, description, price, onClick, onFavorite, id }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [favoriteItemIds, setFavoriteItemIds] = useState([]); // State to hold favorite item IDs

//   const getAllIds = async () => {
//     try {
//       const res = await fetch(`https://2lkz6gq8-5002.inc1.devtunnels.ms/api/favourites/66bdd47a18760383ef698b01`);
//       const data = await res.json();

//       // Extract item IDs from the response and store in state
//       const itemIds = data.map(fav => fav.itemId._id);
//       setFavoriteItemIds(itemIds);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllIds();
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 50); // Simulate data fetching delay
//   }, []);

//   // Check if the current card's id is in the list of favorite item IDs
//   const isFavorite = favoriteItemIds.includes(id);

//   return (
//     <div className="relative max-w-xs overflow-hidden cursor-pointer" onClick={onClick}>
//       {isLoading ? (
//         <Skeleton height={192} />
//       ) : (
//         <img
//           src={`${ApiUrl}${image}`}
//           alt={title}
//           className="w-full hover:scale-105 ease-in-out duration-2000 h-48 object-cover"
//         />
//       )}
//       <div className="absolute top-2 right-2 bg-customColor-circleColor p-2 rounded">
//         {isFavorite ? (
//           <AiFillHeart
//             className="text-red-500 text-2xl cursor-pointer "
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent triggering onClick of the card
//               onFavorite();
//             }}
//           />
//         ) : (
//           <AiOutlineHeart
//             className="text-white text-2xl cursor-pointer"
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent triggering onClick of the card
//               onFavorite();
//             }}
//           />
//         )}
//       </div>
//       <h2 className="lg:text-lg text-sm font-semibold">
//         {isLoading ? <Skeleton width={100} /> : title}
//       </h2>
//       <p className="text-gray-500 lg:text-md text-sm">
//         {isLoading ? <Skeleton count={2} /> : `${description.substring(0, 50)}.....`}
//       </p>
//       <p className="lg:text-sm text-xs font-bold text-red-600 mt-2">
//         {isLoading ? <Skeleton width={50} /> : `$${price}`}
//       </p>
//     </div>
//   );
// };

// export default Card;


// import React, { useState, useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton CSS
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Import heart icons
// import ApiUrl from "../../Common/ApiUrl";

// const Card = ({ image, title, description, price, onClick, onFavorite, id }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [favoriteItemIds, setFavoriteItemIds] = useState([]); // State to hold favorite item IDs

//   const getAllIds = async () => {
//     try {
//       const res = await fetch(`https://2lkz6gq8-5002.inc1.devtunnels.ms/api/favourites/66bdd47a18760383ef698b01`);
//       const data = await res.json();

//       // Extract item IDs from the response and store in state
//       const itemIds = data.map(fav => fav.itemId._id);
//       setFavoriteItemIds(itemIds);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllIds();
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 50); // Simulate data fetching delay
//   }, []);

//   // Check if the current card's id is in the list of favorite item IDs
//   const isFavorite = favoriteItemIds.includes(id);

//   const handleFavoriteClick = async (e) => {
//     e.stopPropagation(); // Prevent triggering onClick of the card
//     if (isFavorite) {
//       // Item is already a favorite, so we should remove it or update it in the backend
//       try {
//         await fetch(`https://2lkz6gq8-5002.inc1.devtunnels.ms/api/favourites/${id}`, {
//           method: 'put', // Assuming you want to delete the favorite
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         setFavoriteItemIds(favoriteItemIds.filter(favId => favId !== id)); // Update state
//       } catch (error) {
//         console.log('Error removing favorite:', error);
//       }
//     } else {
//       // Item is not a favorite, so we should add it to the backend
//       try {
//         await fetch(`${ApiUrl}/api/favourites`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ itemId: id, userId: "66bdd47a18760383ef698b01" }), // Replace with dynamic userId if needed
//         });
//         setFavoriteItemIds([...favoriteItemIds, id]); // Update state
//       } catch (error) {
//         console.log('Error adding favorite:', error);
//       }
//     }
//     onFavorite(); // You can still call the onFavorite prop if it has other purposes
//   };

//   return (
//     <div className="relative max-w-xs overflow-hidden cursor-pointer" onClick={onClick}>
//       {isLoading ? (
//         <Skeleton height={192} />
//       ) : (
//         <img
//           src={`${ApiUrl}${image}`}
//           alt={title}
//           className="w-full hover:scale-105 ease-in-out duration-2000 h-48 object-cover"
//         />
//       )}
//       <div className="absolute top-2 right-2 bg-customColor-circleColor p-2 rounded">
//         {isFavorite ? (
//           <AiFillHeart
//             className="text-red-500 text-2xl cursor-pointer "
//             onClick={handleFavoriteClick}
//           />
//         ) : (
//           <AiOutlineHeart
//             className="text-white text-2xl cursor-pointer"
//             onClick={handleFavoriteClick}
//           />
//         )}
//       </div>
//       <h2 className="lg:text-lg text-sm font-semibold">
//         {isLoading ? <Skeleton width={100} /> : title}
//       </h2>
//       <p className="text-gray-500 lg:text-md text-sm">
//         {isLoading ? <Skeleton count={2} /> : `${description.substring(0, 50)}.....`}
//       </p>
//       <p className="lg:text-sm text-xs font-bold text-red-600 mt-2">
//         {isLoading ? <Skeleton width={50} /> : `$${price}`}
//       </p>
//     </div>
//   );
// };

// export default Card;

import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton CSS
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Import heart icons
import ApiUrl from "../../Common/ApiUrl";

const Card = ({ image, title, description, price, onClick, onFavorite, id }) => {
  console.log(`${ApiUrl}${image}`)
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteItemIds, setFavoriteItemIds] = useState([]); // State to hold favorite item IDs

  const getAllIds = async () => {
    const userId = localStorage.getItem("userId")
    try {
      const res = await fetch(`${ApiUrl}/api/favourites/${userId}`);
      const data = await res.json();

      // Extract item IDs from the response and store in state
      const itemIds = data.map(fav => fav._id);
      setFavoriteItemIds(itemIds);
      console.log(favoriteItemIds)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllIds();
    setTimeout(() => {
      setIsLoading(false);
    }, 50); // Simulate data fetching delay
  }, []);

  // Check if the current card's id is in the list of favorite item IDs
  const isFavorite = favoriteItemIds.includes(id);

  const handleFavoriteClick = async (e) => {
    e.stopPropagation(); // Prevent triggering onClick of the card

    const userId = localStorage.getItem("userId");

    if (isFavorite) {
      // Item is already a favorite, so delete it
      try {
        console.log(id, "its id");
        await fetch(`${ApiUrl}/api/favourites/${userId}/${id}`, {
          method: 'DELETE', // Use DELETE method to remove the favorite
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setFavoriteItemIds(favoriteItemIds.filter(favId => favId !== id)); // Update state to reflect removal
      } catch (error) {
        console.log('Error removing favorite:', error);
      }
    } else {
      // Item is not a favorite, so add it
      try {
        await fetch(`${ApiUrl}/api/favourites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itemId: id, userId }), // Use dynamic userId
        });
        setFavoriteItemIds([...favoriteItemIds, id]); // Update state to reflect addition

        // Only call onFavorite if the item is being added to favorites
        if (onFavorite) {
          onFavorite();
        }
      } catch (error) {
        console.log('Error adding favorite:', error);
      }
    }
  };

  return (
    <div className="relative max-w-xs overflow-hidden cursor-pointer" onClick={onClick}>
      {isLoading ? (
        <Skeleton height={192} />
      ) : (
        <img
          src={`${ApiUrl}${image}`}
          alt={title}
          className="w-full hover:scale-105 ease-in-out duration-2000 h-48 object-cover"
        />
      )}
      <div className="absolute top-2 right-2 bg-customColor-circleColor p-2 rounded">
        {isFavorite ? (
          <AiFillHeart
            className="text-red-500 text-2xl cursor-pointer"
            onClick={handleFavoriteClick} // Only DELETE will be triggered
          />
        ) : (
          <AiOutlineHeart
            className="text-white text-2xl cursor-pointer"
            onClick={handleFavoriteClick} // Only POST will be triggered, and onFavorite called
          />
        )}
      </div>
      <h2 className="lg:text-lg text-sm font-semibold">
        {isLoading ? <Skeleton width={100} /> : title}
      </h2>
      <p className="text-gray-500 lg:text-md text-sm">
        {isLoading ? <Skeleton count={2} /> : `${description.substring(0, 50)}.....`}
      </p>
      <p className="lg:text-sm text-xs font-bold text-red-600 mt-2">
        {isLoading ? <Skeleton width={50} /> : `$${price}`}
      </p>
    </div>
  );
};

export default Card;
