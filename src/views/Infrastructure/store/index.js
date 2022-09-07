//Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//Axios Imports
import axios from 'axios'

export const clusterStatus = createAsyncThunk('appInfrastructure/clusterStatus', async (data) => {
    const response = await axios.post('http://127.0.0.1:4000/status', data)
    return response.data
})

export const clusterLogs = createAsyncThunk('appInfrastructure/clusterLogs', async () => {
  const response = await axios.get('http://127.0.0.1:4000/status/cluster_data')
  return response.data
})

export const appInfrastructureSlice = createSlice({
  name: 'appInfrastructure',
  initialState: {
    status: [],
    cluster_logs: [],
    clusters: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(clusterStatus.fulfilled, (state, action) => {
        state.status = action.payload.data.logs
        //console.log(action.payload)
      })
      .addCase(clusterLogs.fulfilled, (state, action) => {
        state.cluster_logs = action.payload.data.logs.reverse()
        state.clusters = action.payload.data.clusters
        //console.log(action.payload)
      })
  }
})

export default appInfrastructureSlice.reducer
