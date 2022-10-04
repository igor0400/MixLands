import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import data from '../config.json';

export const serverInfoSlice = createApi({
   reducerPath: 'serverInfo',
   baseQuery: fetchBaseQuery({
      baseUrl: `${data.proxy}/server-info`,
      prepareHeaders: (headers, { getState }) => {
         headers.set('Content-Security-Policy', 'upgrade-insecure-requests');
         return headers;
      },
   }),
   endpoints: (builder) => ({
      getOnlineCount: builder.query({
         query: (server: string) => `/online-count?server=${server}`,
      }),
      getOnlineUsers: builder.query({
         query: () => '/online-users',
      }),
   }),
});

export const { useGetOnlineCountQuery, useGetOnlineUsersQuery } =
   serverInfoSlice;
