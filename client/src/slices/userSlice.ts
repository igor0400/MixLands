import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PrivateUserType } from '../utils/types';

interface UserState {
   isUserAuth: boolean;
   userData: PrivateUserType | {};
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
   },
});

export const { userLogin, userLogout, setLoading, setError } =
   userSlice.actions;

export const { selectAll } = userAdapter.getSelectors(
   (state: any) => state.user
);

export default userSlice.reducer;
