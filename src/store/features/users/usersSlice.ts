import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import tracks from '@/assets/data/tracks'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    profile: {},
    tracks: tracks,
    lyricShow: false
  },
  reducers: {
    setProfile: (state, action) => {
      // console.log(action.payload);
      state.profile = action.payload
    },
    setTracks: (state, action) => {
      state.tracks = action.payload
    },
    setLyricShow: (state, action) => {
      state.lyricShow = action.payload
    }
  }
})

export const { setProfile, setTracks, setLyricShow } = usersSlice.actions

export const selectProfile = (state: RootState) => state.users.profile
export const selectUid = (state: RootState) => state.users.profile.userId
export const selectTracks = (state: RootState) => state.users.tracks
export const selectLyricShow = (state: RootState) => state.users.lyricShow

export default usersSlice.reducer