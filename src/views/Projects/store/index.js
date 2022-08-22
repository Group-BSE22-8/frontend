//Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//Axios Imports
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const getProjects = createAsyncThunk('appProjects/getProjects', async () => {
  const response = await axios.get('http://127.0.0.1:5000/projects', { headers: {"Authorization" : `Bearer ${cookies.get('cookie_data').token}`} })
  return response.data
})

export const getLogs = createAsyncThunk('appProjects/getLogs', async () => {
  const response = await axios.get('http://127.0.0.1:5000/projects/project_logs')
  return response.data
})

export const projectStatus = createAsyncThunk('appProjects/projectStatus', async (data) => {
  const response = await axios.patch('http://127.0.0.1:5000/project/status', data)
  return response.data
})

export const projectCount = createAsyncThunk('appProjects/projectCount', async () => {
  const response = await axios.get('http://127.0.0.1:5000/projects/count')
  return response.data
})

export const appCount = createAsyncThunk('appProjects/appCount', async () => {
  const response = await axios.get('http://127.0.0.1:5000/apps/count')
  return response.data
})


export const appProjectsSlice = createSlice({
  name: 'appProjects',
  initialState: {
    projects: [],
    project_logs: [],
    project_status: 0,
    active_projects: 0,
    inactive_projects: 0,
    active_apps: 0,
    inactive_apps: 0
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProjects.fulfilled, (state, action) => {
          state.projects = action.payload.data.projects
          //console.log(action.payload)
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.project_logs = action.payload.data.logs
      })
      .addCase(projectStatus.fulfilled, (state, action) => {
          state.project_status = state.project_status + 1;
      })
      .addCase(projectCount.fulfilled, (state, action) => {
        state.active_projects = action.payload.data.active
        state.inactive_projects = action.payload.data.inactive
      })
      .addCase(appCount.fulfilled, (state, action) => {
        //console.log(action.payload)
        state.active_apps = action.payload.data.active
        state.inactive_apps = action.payload.data.inactive
      })
  }
})

export default appProjectsSlice.reducer
