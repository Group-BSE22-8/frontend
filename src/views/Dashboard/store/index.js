//Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//Axios Imports
import axios from 'axios'

export const getClusters = createAsyncThunk('appDash/getClusters', async (data) => {
  const response = await axios.get('http://127.0.0.1:5000/clusters', data )
  return response.data
})

export const getProjects = createAsyncThunk('appDash/getProjects', async (data) => {
  const response = await axios.get('http://127.0.0.1:5000/projects', data )
  return response.data
})

export const getApps = createAsyncThunk('appDash/getApps', async (data) => {
  const response = await axios.get('http://127.0.0.1:5000/applications', data )
  return response.data
})
  

export const appDashSlice = createSlice({
  name: 'appDash',
  initialState: {
    clusters: 0,
    projects: 0,
    applications: 0,
    users: 0
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getClusters.fulfilled, (state, action) => {
          console.log(action.payload)
      })
      .addCase(getProjects.fulfilled, (state, action) => {
          console.log(action.payload)
      })
      .addCase(getApps.fulfilled, (state, action) => {
          console.log(action.payload)
      })
  }
})

export default appDashSlice.reducer
