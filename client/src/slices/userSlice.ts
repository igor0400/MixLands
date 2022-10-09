import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../utils/types';

interface UserState {
   userAuth: boolean;
   userData: UserType | {};
   isLoading: boolean;
}

const userAdapter = createEntityAdapter();

const initialState: UserState = {
   userAuth: false,
   userData: {},
   isLoading: false,
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      userLogin: (state, action: PayloadAction<any>) => {
         state.userAuth = true;
         state.userData = action.payload;
      },
      userLogout: (state) => {
         state.userAuth = false;
         state.userData = {};
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
         state.isLoading = action.payload;
      },
   },
});

export const { userLogin, userLogout, setLoading } =
   userSlice.actions;

export const { selectAll } = userAdapter.getSelectors(
   (state: any) => state.user
);

export default userSlice.reducer;
