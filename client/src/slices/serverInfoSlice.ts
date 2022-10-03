import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const serverInfoSlice = createApi({
   reducerPath: 'serverInfo',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8080/server-info',
   }),
   endpoints: (builder) => ({
      getOnlineCount: builder.query({
         query: (id: string) => `/online-count?server=${id}`,
      }),
      getOnlineUsers: builder.query({
         query: () => '/online-users',
      }),
   }),
});

export const { useGetOnlineCountQuery, useGetOnlineUsersQuery } =
   serverInfoSlice;
