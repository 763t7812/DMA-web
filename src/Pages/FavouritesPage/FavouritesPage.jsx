// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import Card from "../../Components/Card/Card";
// import ApiUrl from "../../Common/ApiUrl";

// const FavouritesPage = () => {
//   const [favoriteItems, setFavoriteItems] = useState([]);
//   const { userId } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       console.log("userId", userId)
//       try {
//         const res = await axios.get(`${ApiUrl}/api/favourites/${userId}`, {

//         });

//         console.log("response of favourite", res.data)
//         setFavoriteItems(res.data);
//       } catch (error) {
//         console.error("Error fetching favorite items:", error);
//       }
//     };

//     fetchFavorites();
//   }, [userId]);

//   return (
//     <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
//       <h1 className="lg:text-4xl md:text-2xl text-xl font-bold mb-8">Your Favorites</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
//         {favoriteItems.length > 0 ? (
//           favoriteItems.map((item, index) => (
//             <Card
//               key={index}
//               image={item.image}
//               title={item.name}
//               description={item.description}
//               price={item.rentalPrice}
//               onClick={() => console.log("View details of:", item)}
//               isFavorite={true}
//             />
//           ))
//         ) : (
//           <p className="text-center col-span-full text-gray-500">No favorite items found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FavouritesPage;

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import Card from "../../Components/Card/Card2";
// import ApiUrl from "../../Common/ApiUrl";

// const FavouritesPage = () => {
//   const [favoriteItems, setFavoriteItems] = useState([]);
//   // const { userId } = useSelector((state) => state.auth);


//   useEffect(() => {
//     const userId = localStorage.getItem('userId');

//     // You can then use the userId as needed
//     console.log(userId);
//     const fetchFavorites = async () => {

//       // Retrieve the userId from localStorage


//       try {
//         const res = await axios.get(`${ApiUrl}/api/favourites/${userId}`);
//         console.log("response of favourite", res.data);
//         setFavoriteItems(res.data);
//       } catch (error) {
//         console.error("Error fetching favorite items:", error);
//       }
//     };

//     if (userId) {
//       fetchFavorites();
//     }
//   }, [userId]);

//   return (
//     <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
//       <h1 className="lg:text-4xl md:text-2xl text-xl font-bold mb-8">Your Favorites</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
//         {favoriteItems.length > 0 ? (
//           favoriteItems.map((item, index) => (
//             <Card
//               key={index}
//               image={item.itemId.image}
//               title={item.itemId.name}
//               description={item.itemId.description}
//               price={item.itemId.rentalPrice}
//               onClick={() => console.log("View details of:", item)}
//               isFavorite={true}
//             />
//           ))
//         ) : (
//           <p className="text-center col-span-full text-gray-500">No favorite items found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FavouritesPage;




import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Components/Card/Card2";
import ApiUrl from "../../Common/ApiUrl";
import { useNavigate } from "react-router-dom";

const FavouritesPage = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`${ApiUrl}/api/favourites/${userId}`);
        console.log("response of favourite", res.data);
        setFavoriteItems(res.data);
      } catch (error) {
        console.error("Error fetching favorite items:", error);
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, []); // Note: Removed `userId` from the dependency array

  const navigate = useNavigate()
  const handleCardClick = (card) => {
    console.log(card , "asdf my cards")
    navigate("/detail", { state: { card } });
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="lg:text-4xl md:text-2xl text-xl font-bold mb-8">Your Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {favoriteItems.length > 0 ? (
          favoriteItems.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.name}
              description={card.description}
              price={card.rentalPrice}
              onClick={() => handleCardClick(card)}
              isFavorite={true}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No favorite items found.</p>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;
