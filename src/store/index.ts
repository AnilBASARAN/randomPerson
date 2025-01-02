import {configureStore} from '@reduxjs/toolkit'
import { userSlice } from './slices/user'

// Slices


export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  reducer: {
    user: userSlice.reducer,
    
  },
})
