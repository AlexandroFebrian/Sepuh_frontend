import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./UserSlice"
import postReducer from "./PostSlice"

const store = configureStore({
  reducer:{
    user: userReducer,
    post: postReducer,
  }
})

export default store