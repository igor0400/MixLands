import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../utils/types';

interface UserState {
   userAuth: boolean;
   user: UserType | {};
}

const userAdapter = createEntityAdapter();

const initialState: UserState = {
   userAuth: false,
   user: {},
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      userLogin: (state, action: PayloadAction<UserType | string>) => {
         state.userAuth = true;
         state.user = action.payload;
      },
   },
});

export const { userLogin } = userSlice.actions;

export const { selectAll } = userAdapter.getSelectors(
   (state: any) => state.user
);

export default userSlice.reducer;
