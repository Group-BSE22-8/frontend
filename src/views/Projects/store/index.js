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

export const getApps = createAsyncThunk('appProjects/getApps', async () => {
  const response = await axios.get('http://127.0.0.1:5000/applications')
  return response.data
})
  

export const appProjectsSlice = createSlice({
  name: 'appProjects',
  initialState: {
    projects: [],
    applications: 0,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProjects.fulfilled, (state, action) => {
          state.projects = action.payload.data.projects
          console.log(action.payload)
      })
      .addCase(getApps.fulfilled, (state, action) => {
          console.log(action.payload)
      })
  }
})

export default appProjectsSlice.reducer
