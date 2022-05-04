import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import tracks from '@/assets/data/tracks'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    profile: {
      userId: '',
      avatarUrl: '',
      nickname: ''
    },
    tracks: tracks,
    lyricShow: false,
    loginShow: false
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
    },
    setLoginShow: (state, action) => {
      state.loginShow = action.payload
    }
  }
})

export const { setProfile, setTracks, setLyricShow, setLoginShow } = usersSlice.actions

export const selectProfile = (state: RootState) => state.users.profile
export const selectUid = (state: RootState) => state.users.profile.userId
export const selectTracks = (state: RootState) => state.users.tracks
export const selectLyricShow = (state: RootState) => state.users.lyricShow
export const selectLoginShow = (state: RootState) => state.users.loginShow

export default usersSlice.reducer