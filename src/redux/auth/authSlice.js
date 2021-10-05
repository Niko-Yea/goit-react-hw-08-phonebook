import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    register: (state, { payload }) => {
      state.user.name = payload.user.name
      state.user.email = payload.user.email
      state.token = payload.token
      state.isLoggedIn = true
    },
    login: (state, { payload }) => {
      state.user.name = payload.user.name
      state.user.email = payload.user.email
      state.token = payload.token
      state.isLoggedIn = true
    },
    logout: (state, { payload }) => {
      state.user.name = null
      state.user.email = null
      state.token = null
      state.isLoggedIn = false
    },
    refresh: (state, action) => {
      state.user = { ...action.payload }
      state.isLoggedIn = true
    },
  },
})

export const { register, login, logout, refresh } = authSlice.actions
export default authSlice.reducer
