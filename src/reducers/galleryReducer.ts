import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { useTokenContract } from '../hooks/useContract';

interface GalleryState {
  contract: unknown,
  count: number,
  metadata: any,
  owner: any,
  isCommodity: any,
  isUpdating: boolean
}

const initialState = {
  count: 0,
  metadata: [],
  owner: [],
  isCommodity: [],
  isUpdating: false
} as GalleryState;

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setImageCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setGalleryData: (state, action: PayloadAction<any>) => {
      state.count = action.payload.count;
      state.isCommodity = action.payload.isCommodity;
      state.metadata = action.payload.metadata;
      state.owner = action.payload.owner;
      state.isUpdating = false;
    },
    addData: (state, action: PayloadAction<any>) => {
      state.count += 1;
      state.isCommodity.push(false);
      state.metadata.push(action.payload.metadata);
      state.owner.push(action.payload.owner);
    },
    changeOwner: (state, action: PayloadAction<any>) => {
      state.isCommodity[action.payload.tokenId] = false;
      state.owner[action.payload.tokenId] = action.payload.to;
    },
    setCommoditize: (state, action: PayloadAction<any>) => {
      state.isCommodity[action.payload.tokenId] = true;
    },
    setUpdating: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
    }
  }
})

export const {setImageCount, addData, setGalleryData, changeOwner, setCommoditize, setUpdating} = gallerySlice.actions;

export const gallerySelector = (state: any) => state.gallery