//Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//Axios Imports
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const getProject = createAsyncThunk('appApps/getProject', async () => {
  const response = await axios.get('http://127.0.0.1:5000/projects')
  return response.data
})

export const getOwner = createAsyncThunk('appApps/getOwner', async (id) => {
  const response = await axios.get('http://127.0.0.1:5000/users/'+id)
  return response.data
})

export const getApps = createAsyncThunk('appApps/getApps', async (id) => {
  const response = await axios.get('http://127.0.0.1:5000/projects/'+id+'/apps' , { headers: {"Authorization" : `Bearer ${cookies.get('cookie_data').token}`} })
  return response.data
})

export const getLogs = createAsyncThunk('appLogs/getLogs', async () => {
  const response = await axios.get('http://127.0.0.1:5000/apps/app_logs')
  return response.data
})

export const applicationStatus = createAsyncThunk('appApps/applicationStatus', async (data) => {
  const response = await axios.patch('http://127.0.0.1:5000/app/status', data)
  return response.data
})

export const appCount = createAsyncThunk('appProjects/appCount', async () => {
  const response = await axios.get('http://127.0.0.1:5000/apps/count')
  return response.data
})


export const appAppsSlice = createSlice({
  name: 'appApps',
  initialState: {
    projects: 0,
    owner: '',
    app_status: '',
    apps: [],
    app_logs: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProject.fulfilled, (state, action) => {
          state.projects = action.payload
      })
      .addCase(getApps.fulfilled, (state, action) => {
          state.apps = action.payload.data.apps
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.app_logs = action.payload.data.logs
        //console.log(action.payload)
      })
      .addCase(getOwner.fulfilled, (state, action) => {
          state.owner = action.payload.data.user.name
      })
      .addCase(applicationStatus.fulfilled, (state, action) => {
          state.app_status = action.payload.status;
      })
      .addCase(appCount.fulfilled, (state, action) => {
        console.log(action.payload)
        state.active_apps = action.payload.data.active
        state.inactive_apps = action.payload.data.inactive
      })
  }
})

export default appAppsSlice.reducer
