import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface GalleryState {
  count: number,
  metadatas: any

}

const initialState = {
  count: 0
} as GalleryState;

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    imageMinted: (state) => {
      console.log("HEY", state.count)
      state.count += 1;
    },
    setImageCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    }
  }
})

export const {imageMinted, setImageCount} = gallerySlice.actions;

export const gallerySelector = (state: any) => state.gallery