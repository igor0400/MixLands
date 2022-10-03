import { configureStore } from '@reduxjs/toolkit';

import { usersSlice } from '../slices/usersSlice';
import { serverInfoSlice } from '../slices/serverInfoSlice';

const stringMiddleware =
   () => (next: Function) => (action: string | object) => {
      if (typeof action === 'string') {
         return next({
            type: action,
         });
      }

      return next(action);
   };

const store = configureStore({
   reducer: {
      [usersSlice.reducerPath]: usersSlice.reducer,
      [serverInfoSlice.reducerPath]: serverInfoSlice.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
         stringMiddleware,
         usersSlice.middleware,
         serverInfoSlice.middleware
      ),
   devTools: process.env.NODE_ENV !== 'production',
});

export default store;
