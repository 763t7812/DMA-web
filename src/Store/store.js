// src/Store/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer, {saveCartMiddleware } from '../Slice/Cart/CartSlice';
// import authReducer from '../Slice/Auth/AuthSlice'; // Import the auth slice

// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     auth:authReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveCartMiddleware),
// });

// export default store;


// src/Store/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { saveCartMiddleware } from '../Slice/Cart/CartSlice';
import authReducer from '../Slice/Auth/AuthSlice';
import favoritesReducer from '../Slice/FavouriteSlice/FavouriteSlice'; // Import the favorites slice
import orderReducer from '../Slice/OrderDataSlice'; 
const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    favorites: favoritesReducer, // Add the favorites reducer
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveCartMiddleware),
});

export default store;
