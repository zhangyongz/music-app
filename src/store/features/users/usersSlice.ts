import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    profile: {},
    tracks: []
  },
  reducers: {
    setProfile: (state, action) => {
      console.log(action.payload);
      state.profile = action.payload
    },
    setTracks: (state, action) => {
      state.tracks = action.payload
    }
  }
})

export const { setProfile, setTracks } = usersSlice.actions

export const selectProfile = (state: RootState) => state.users.profile
export const selectUid = (state: RootState) => state.users.profile.userId
export const selectTracks = (state: RootState) => state.users.tracks

export default usersSlice.reducer