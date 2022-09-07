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
  
export const getLogs = createAsyncThunk('appUsers/getLogs', async () => {
  const response = await axios.get('http://127.0.0.1:5000/users/user_logs')
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
    user_logs: [],
    user_status: 0
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
          //console.log(action.payload)
          state.users = action.payload.data.users
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.user_logs = action.payload.data.logs.reverse()
        //console.log(action.payload)
      })
      .addCase(userStatus.fulfilled, (state, action) => {
        state.user_status = state.user_status + 1 
      })
  }
})

export default appUsersSlice.reducer
