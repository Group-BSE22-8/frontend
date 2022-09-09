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

export const getApps = createAsyncThunk('appApps/getProjectActivity', async (id) => {
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

export const disableProject = createAsyncThunk('appApps/disableProject', async (data) => {
  const response = await axios.patch('http://127.0.0.1:5000/project/status', data)
  return response.data
})

export const appCount = createAsyncThunk('appProjects/appCount', async () => {
  const response = await axios.get('http://127.0.0.1:5000/apps/count')
  return response.data
})

export const databaseCount = createAsyncThunk('appProjects/databaseCount', async (data) => {
  const response = await axios.post('http://127.0.0.1:5000/projects/specific_databases', data)
  return response.data
})

export const appAppsSlice = createSlice({
  name: 'appApps',
  initialState: {
    project: [],
    owner: '',
    app_status: 0,
    databases: 0,
    apps: [],
    app_logs: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
       .addCase(applicationStatus.fulfilled, (state, action) => {
          state.app_status = state.app_status + 1;
          //console.log(action.payload)
       })
      .addCase(getProject.fulfilled, (state, action) => {
          state.project = action.payload.data.project
      })
      .addCase(getApps.fulfilled, (state, action) => {
          state.apps = action.payload.data.apps
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.app_logs = action.payload.data.logs.reverse()
        //console.log(action.payload)
      })
      .addCase(getOwner.fulfilled, (state, action) => {
          state.owner = action.payload.data.user.name
      })
      .addCase(disableProject.fulfilled, (state, action) => {
        state.app_status = state.app_status + 1;
        //console.log(action.payload)
      })
      .addCase(appCount.fulfilled, (state, action) => {
        //console.log(action.payload)
        state.active_apps = action.payload.data.active
        state.inactive_apps = action.payload.data.inactive
      })
      .addCase(databaseCount.fulfilled, (state, action) => {
        //console.log(action.payload)
        state.databases = action.payload.data.databases
      })
  }
})

export default appAppsSlice.reducer
