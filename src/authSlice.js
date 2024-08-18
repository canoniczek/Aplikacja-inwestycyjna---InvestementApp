import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  session: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload.user
      state.session = action.payload.session
    },

    signOut: (state) => {
      state.user = null
      state.session = null
    },
  },
})


export const { signIn, signOut } = authSlice.actions

export default authSlice.reducer