//Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//Axios Imports
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const getUsers = createAsyncThunk('appUsers/getUsers', async () => {
  const response = await axios.get('http://127.0.0.1:5000/users', { headers: {"Authorization" : `Bearer ${cookies.get('cookie_data').token}`} } )
  return response.data
})
  
export const userStatus = createAsyncThunk('appUsers/userStatus', async (data) => {
  const response = await axios.patch('http://127.0.0.1:5000/user/status', data )
  return response.data
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    users: [],
    user_status: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
          //console.log(action.payload)
          state.users = action.payload.data.users
      })
      .addCase(userStatus.fulfilled, (state, action) => {
        state.user_status= action.payload.status
      })
  }
})

export default appUsersSlice.reducer
