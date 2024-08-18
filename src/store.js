import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import fundReducer from './fundSlice.js'
import saveReducer from './saveSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fund: fundReducer,
    save: saveReducer,
  },
})



