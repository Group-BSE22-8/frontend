//Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//Axios Imports
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const getProjects = createAsyncThunk('appApps/getProjects', async () => {
  const response = await axios.get('http://127.0.0.1:5000/projects')
  return response.data
})

export const getApps = createAsyncThunk('appApps/getApps', async (id) => {
  const response = await axios.get('http://127.0.0.1:5000/projects/'+id+'/apps' , { headers: {"Authorization" : `Bearer ${cookies.get('cookie_data').token}`} })
  return response.data
})
  

export const appAppsSlice = createSlice({
  name: 'appApps',
  initialState: {
    projects: 0,
    applications: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProjects.fulfilled, (state, action) => {
          state.projects = action.payload
          console.log(action.payload)
      })
      .addCase(getApps.fulfilled, (state, action) => {
          console.log(action.payload)
      })
  }
})

export default appAppsSlice.reducer
