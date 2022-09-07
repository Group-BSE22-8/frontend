//Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//Axios Imports
import axios from 'axios'

export const adminLogin = createAsyncThunk('appAuth/adminLogin', async (data) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/users/admin_login', data )
    return response.data
  
  } catch(err){
    return err.response.data
  }
})

export const setStatus = createAsyncThunk('appAuth/setStatus', () => {
    return 'reset'
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
          if (action.payload.status && action.payload.status == "success") {
            state.status = action.payload.status
            state.cookie_data.token = action.payload.data.access_token
            state.cookie_data.username = action.payload.data.username
            state.cookie_data.id = action.payload.data.id
          } else {
            state.status = action.payload.status
          }
      })
      .addCase(setStatus.fulfilled, (state, action) => {
        state.status = ''
      })
  }
})

export default appAuthSlice.reducer
