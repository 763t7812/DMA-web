
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import ApiUrl from "../../Common/ApiUrl";

// export const fetchFavorites = createAsyncThunk(
//   "favorites/fetchFavorites",
//   async (userId) => {
//     const response = await axios.get(`${ApiUrl}/api/favourites/${userId}`);
//     return response.data;
//   }
// );

// const favoritesSlice = createSlice({
//   name: "favorites",
//   initialState: {
//     items: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {
//     addFavorite: (state, action) => {
//       state.items.push(action.payload);
//     },
//     removeFavorite: (state, action) => {
//       state.items = state.items.filter(
//         (item) => item.itemId._id !== action.payload
//       );
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFavorites.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchFavorites.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(fetchFavorites.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export const { addFavorite, removeFavorite } = favoritesSlice.actions;

// export default favoritesSlice.reducer;


// src/Slice/Favorites/FavoritesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import ApiUrl from '../../Common/ApiUrl';

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async (userId) => {
  const response = await axios.get(`${ApiUrl}/api/favourites/get-favorites/${userId}`);
  return response.data;
});

export const addFavorite = createAsyncThunk('favorites/addFavorite', async ({ itemId, userId }) => {
  const response = await axios.post(`${ApiUrl}/api/favourites/add`, { itemId, userId });
  return { status: response.status, data: response.data };
});

export const removeFavorite = createAsyncThunk('favorites/removeFavorite', async ({ itemId, userId }) => {
  const response = await axios.post(`${ApiUrl}/api/favourites/remove`, { itemId, userId });
  return { status: response.status, data: response.data };
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addFavorite.fulfilled, (state, action) => {
      if (action.payload.status === 201) {
        state.push(action.payload.data);
      }
    });
    builder.addCase(removeFavorite.fulfilled, (state, action) => {
      if (action.payload.status === 201) {
        return state.filter(fav => fav.itemId._id !== action.payload.data.itemId._id);
      }
    });
  },
});

export default favoritesSlice.reducer;
