import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import data from '../config.json';

export const usersSlice = createApi({
   reducerPath: 'users',
   baseQuery: fetchBaseQuery({
      baseUrl: data.proxy,
   }),
   // сделать tagTypes
   endpoints: (builder) => ({
      getUsers: builder.query({
         query: () => '/users',
      }),
      getUserByNickname: builder.query({
         query: (nickname) => `/users/${nickname}`,
      }),
   }),
});

export const { useGetUsersQuery, useGetUserByNicknameQuery } = usersSlice;
