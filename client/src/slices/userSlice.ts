import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../utils/types';

interface UserState {
   userAuth: boolean;
   user: UserType | {};
   isLoading: boolean;
   errors: string[];
}

const userAdapter = createEntityAdapter();

const initialState: UserState = {
   userAuth: false,
   user: {},
   isLoading: false,
   errors: [],
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      userLogin: (state, action: PayloadAction<any>) => {
         state.userAuth = true;
         state.user = action.payload;
      },
      userLogout: (state) => {
         state.userAuth = false;
         state.user = {};
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
         state.isLoading = action.payload;
      },
      addError: (state, action: PayloadAction<any>) => {
         state.errors.push(action.payload);
      },
      removeError: (state, action: PayloadAction<string>) => {
         state.errors.filter((item) => item !== action.payload);
      },
   },
});

export const { userLogin, userLogout, setLoading, addError, removeError } =
   userSlice.actions;

export const { selectAll } = userAdapter.getSelectors(
   (state: any) => state.user
);

export default userSlice.reducer;
