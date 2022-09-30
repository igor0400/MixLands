import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersSlice = createApi({
   reducerPath: 'users',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8080',
      prepareHeaders: (headers, { getState }) => {
         headers.set('Content-Type', 'application/json');
         headers.set('Accept', 'application/json');
         headers.set('Access-Control-Allow-Origin', '*');
         headers.set('Access-Control-Allow-Credentials', 'true');
         headers.set('Content-Type', 'application/json; charset=utf-8');
         console.log(getState());
         return headers;
      },
      // mode: 'no-cors'
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
