import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { proxy } from '../config';

export const usersSlice = createApi({
   reducerPath: 'users',
   baseQuery: fetchBaseQuery({
      baseUrl: proxy,
      prepareHeaders: (headers, { getState }) => {
         headers.set('Content-Security-Policy', 'upgrade-insecure-requests');
         return headers;
      },
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
