//Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//Axios Imports
import axios from 'axios'

export const clusterCount = createAsyncThunk('appDash/clusterCount', async () => {
  const response = await axios.get('http://127.0.0.1:5000/clusters/count')
  return response.data
})

export const userCount = createAsyncThunk('appDash/userCount', async () => {
  const response = await axios.get('http://127.0.0.1:5000/users/count')
  return response.data
})

export const projectCount = createAsyncThunk('appDash/projectCount', async () => {
  const response = await axios.get('http://127.0.0.1:5000/projects/count')
  return response.data
})


export const appCount = createAsyncThunk('appDash/appCount', async () => {
  const response = await axios.get('http://127.0.0.1:5000/apps/count')
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
      .addCase(clusterCount.fulfilled, (state, action) => {
          state.clusters = action.payload.data.count 
      })
      .addCase(userCount.fulfilled, (state, action) => {
          state.users = action.payload.data.active + action.payload.data.inactive
      })
      .addCase(projectCount.fulfilled, (state, action) => {
          state.projects = action.payload.data.active + action.payload.data.inactive 
      })
      .addCase(appCount.fulfilled, (state, action) => {
          state.applications = action.payload.data.active + action.payload.data.inactive
      })
  }
})

export default appDashSlice.reducer
