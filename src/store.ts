import { configureStore } from "@reduxjs/toolkit";
import {gallerySlice}  from "./reducers/galleryReducer";

const store = configureStore({
  reducer: {
    gallery: gallerySlice.reducer
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch