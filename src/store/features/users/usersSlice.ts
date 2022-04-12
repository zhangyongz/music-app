import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    account: {},
    profile: {}
  },
  reducers: {
    setProfile: (state, action) => {
      console.log(action.payload);
      state.profile = action.payload
    }
  }
})

export const { setProfile } = usersSlice.actions

export const selectProfile = (state: RootState) => state.users.profile

export default usersSlice.reducer