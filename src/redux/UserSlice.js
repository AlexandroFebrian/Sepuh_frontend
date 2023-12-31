import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: null,
  userDetail: null
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
    setUserDetail: (state, action) => {
      state.userDetail = action.payload
    }
  }
})

export const {setIsLogin, setUserDetail} = userSlice.actions

export default userSlice.reducer