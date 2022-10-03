import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersSlice = createApi({
   reducerPath: 'users',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://188.225.60.27:8080',
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
