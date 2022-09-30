import { configureStore } from '@reduxjs/toolkit';

import { usersSlice } from '../slices/usersSlice';

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
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(stringMiddleware, usersSlice.middleware),
   devTools: process.env.NODE_ENV !== 'production',
});

export default store;
