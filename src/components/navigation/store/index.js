//Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const adjustDrawer = createAsyncThunk('appNavigation/adjustDrawer', async (data) => {
  return data
})


export const appNavigationSlice = createSlice({
  name: 'appNavigation',
  initialState: {
    open: true,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(adjustDrawer.fulfilled, (state, action) => {
        state.open = action.payload.open;
      })
  }
})

export default appNavigationSlice.reducer
