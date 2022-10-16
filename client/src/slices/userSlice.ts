import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PrivateUserType } from '../utils/types';

interface UserState {
   isUserAuth: boolean;
   userData: any;
   isLoading: boolean;
   isError: boolean;
}

const userAdapter = createEntityAdapter();

const initialState: UserState = {
   isUserAuth: false,
   userData: {},
   isLoading: false,
   isError: false,
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      userLogin: (state, action: PayloadAction<PrivateUserType | string>) => {
         state.isUserAuth = true;
         state.userData = action.payload;
      },
      userLogout: (state) => {
         state.isUserAuth = false;
         state.userData = {};
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
         state.isLoading = action.payload;
      },
      setError: (state, action: PayloadAction<boolean>) => {
         state.isError = action.payload;
      },
      changeUserSiteInfo: (
         state,
         action: PayloadAction<{ bio: string; lor: string }>
      ) => {
         state.userData.siteData.bio = action.payload.bio;
         state.userData.siteData.lor = action.payload.lor;
      },
   },
});

export const {
   userLogin,
   userLogout,
   setLoading,
   setError,
   changeUserSiteInfo,
} = userSlice.actions;

export const { selectAll } = userAdapter.getSelectors(
   (state: any) => state.user
);

export default userSlice.reducer;
