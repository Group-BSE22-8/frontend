//Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//Axios Imports
import axios from 'axios'

export const adminLogin = createAsyncThunk('appAuth/adminLogin', async (data) => {
  const response = await axios.post('http://127.0.0.1:5000/users/admin_login', data )
  return response.data
})


export const appAuthSlice = createSlice({
  name: 'appAuth',
  initialState: {
    status: '',
    cookie_data: {
      token: '',
      username: '',
      id: ''
    }
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(adminLogin.fulfilled, (state, action) => {
          state.status = action.payload.status
          state.cookie_data.token = action.payload.data.access_token
          state.cookie_data.username = action.payload.data.username
          state.cookie_data.id = action.payload.data.id
          console.log(action.payload.status)
      })
  }
})

export default appAuthSlice.reducer
