import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PrivateUserType } from '../utils/types';

type DiscordUserDataType = any;

interface UserState {
   isUserAuth: boolean;
   isDiscordRequired: boolean;
   userData: PrivateUserType | {};
   discordUserData: DiscordUserDataType | {};
   isLoading: boolean;
   isError: boolean;
}

const userAdapter = createEntityAdapter();

const initialState: UserState = {
   isUserAuth: false,
   userData: {},
   isDiscordRequired: false,
   discordUserData: {},
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
      discordLogin: (state, action: PayloadAction<DiscordUserDataType>) => {
         state.isDiscordRequired = true;
         state.discordUserData = action.payload;
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
      addDiscordUserData: (
         state,
         action: PayloadAction<DiscordUserDataType>
      ) => {
         state.discordUserData = {
            ...state.discordUserData,
            ...action.payload,
         };
      },
   },
});

export const {
   userLogin,
   discordLogin,
   userLogout,
   setLoading,
   setError,
   addDiscordUserData,
} = userSlice.actions;

export const { selectAll } = userAdapter.getSelectors(
   (state: any) => state.user
);

export default userSlice.reducer;
