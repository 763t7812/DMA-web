
// //11/july/24
// // src/Slice/Cart/CartSlice.js

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: JSON.parse(localStorage.getItem('cartItems')) || [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const existingItem = state.items.find(item => item._id === action.payload._id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(item => item._id !== action.payload.id);
//     },
//     updateQuantity: (state, action) => {
//       const item = state.items.find(item => item._id === action.payload.id);
//       if (item) {
//         item.quantity = action.payload.quantity;
//       }
//     },
//     updateDuration: (state, action) => {
//       const item = state.items.find(item => item._id === action.payload.id);
//       if (item) {
//         item.duration = action.payload.duration;
//       }
//     },
//     clearCart: (state) => {
//       state.items = [];
//     }
//   },
// });

// export const { addToCart, removeFromCart, updateQuantity, updateDuration, clearCart } = cartSlice.actions;

// export const selectCartItems = (state) => state.cart.items;

// export const selectCartItemCount = (state) => 
//   state.cart.items.reduce((total, item) => total + item.quantity, 0);

// export default cartSlice.reducer;

// // Middleware to save cart to localStorage
// const saveCartMiddleware = store => next => action => {
//   const result = next(action);
//   if (cartSlice.actions.addToCart.match(action) || 
//       cartSlice.actions.removeFromCart.match(action) || 
//       cartSlice.actions.updateQuantity.match(action) || 
//       cartSlice.actions.updateDuration.match(action) || 
//       cartSlice.actions.clearCart.match(action)) {
//     const state = store.getState();
//     localStorage.setItem('cartItems', JSON.stringify(state.cart.items));
//   }
//   return result;
// };

// export { saveCartMiddleware };


//24/7/24
// src/Slice/Cart/CartSlice.js

// import { createSlice } from '@reduxjs/toolkit';

// const getCartItemsForUser = (userId) => {
//   const allCartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
//   return allCartItems[userId] || [];
// };

// const saveCartItemsForUser = (userId, items) => {
//   const allCartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
//   allCartItems[userId] = items;
//   localStorage.setItem('cartItems', JSON.stringify(allCartItems));
// };

// const initialState = {
//   userId: '', // Initialize with an empty userId
//   items: [], // Initialize with an empty cart
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     setUserId: (state, action) => {
//       state.userId = action.payload;
//       state.items = getCartItemsForUser(action.payload); // Load cart items for the user
//     },
//     addToCart: (state, action) => {
//       const existingItem = state.items.find(item => item._id === action.payload._id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
//       saveCartItemsForUser(state.userId, state.items); // Save updated cart
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(item => item._id !== action.payload.id);
//       saveCartItemsForUser(state.userId, state.items); // Save updated cart
//     },
//     updateQuantity: (state, action) => {
//       const item = state.items.find(item => item._id === action.payload.id);
//       if (item) {
//         item.quantity = action.payload.quantity;
//       }
//       saveCartItemsForUser(state.userId, state.items); // Save updated cart
//     },
//     updateDuration: (state, action) => {
//       const item = state.items.find(item => item._id === action.payload.id);
//       if (item) {
//         item.duration = action.payload.duration;
//       }
//       saveCartItemsForUser(state.userId, state.items); // Save updated cart
//     },
//     clearCart: (state) => {
//       state.items = [];
//       saveCartItemsForUser(state.userId, state.items); // Save updated cart
//     },
//     logout: (state) => {
//       state.userId = '';
//       state.items = [];
//     }
//   },
// });

// export const { setUserId, addToCart, removeFromCart, updateQuantity, updateDuration, clearCart, logout } = cartSlice.actions;

// export const selectCartItems = (state) => state.cart.items;

// export const selectCartItemCount = (state) =>
//   state.cart.items.reduce((total, item) => total + item.quantity, 0);

// export default cartSlice.reducer;

// const saveCartMiddleware = store => next => action => {
//   const result = next(action);
//   const state = store.getState();
//   if (state.cart.userId) {
//     if (cartSlice.actions.addToCart.match(action) || 
//         cartSlice.actions.removeFromCart.match(action) || 
//         cartSlice.actions.updateQuantity.match(action) || 
//         cartSlice.actions.updateDuration.match(action) || 
//         cartSlice.actions.clearCart.match(action)) {
//       saveCartItemsForUser(state.cart.userId, state.cart.items);
//     }
//   }
//   return result;
// };

// export { saveCartMiddleware };



//latest

import { createSlice } from '@reduxjs/toolkit';

// Utility function to get cart items for a specific user from localStorage
const getCartItemsForUser = (userId) => {
  const allCartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
  return allCartItems[userId] || [];
};

// Utility function to save cart items for a specific user to localStorage
const saveCartItemsForUser = (userId, items) => {
  const allCartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
  allCartItems[userId] = items;
  localStorage.setItem('cartItems', JSON.stringify(allCartItems));
};

const initialState = {
  userId: '', // Initialize with an empty userId
  items: [], // Initialize with an empty cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      state.items = getCartItemsForUser(action.payload); // Load cart items for the user
    },
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id && item.size === action.payload.size);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartItemsForUser(state.userId, state.items); // Save updated cart
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload.id || item.size !== action.payload.size);
      saveCartItemsForUser(state.userId, state.items); // Save updated cart
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload.id && item.size === action.payload.size);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      saveCartItemsForUser(state.userId, state.items); // Save updated cart
    },
    updateDuration: (state, action) => {
      const item = state.items.find(item => item._id === action.payload.id && item.size === action.payload.size);
      if (item) {
        item.duration = action.payload.duration;
      }
      saveCartItemsForUser(state.userId, state.items); // Save updated cart
    },
    clearCart: (state) => {
      state.items = [];
      saveCartItemsForUser(state.userId, state.items); // Save updated cart
    },
    logout: (state) => {
      state.userId = '';
      state.items = [];
    }
  },
});

export const { setUserId, addToCart, removeFromCart, updateQuantity, updateDuration, clearCart, logout } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartItemCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export default cartSlice.reducer;

// Middleware to save cart to localStorage for a specific user
const saveCartMiddleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  if (state.cart.userId) {
    if (cartSlice.actions.addToCart.match(action) || 
        cartSlice.actions.removeFromCart.match(action) || 
        cartSlice.actions.updateQuantity.match(action) || 
        cartSlice.actions.updateDuration.match(action) || 
        cartSlice.actions.clearCart.match(action)) {
      saveCartItemsForUser(state.cart.userId, state.cart.items);
    }
  }
  return result;
};

export { saveCartMiddleware };
