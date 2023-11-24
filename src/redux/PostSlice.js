import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
}

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers:{
    setCategory: (state, action) => {
      state.category = action.payload
    }
  }
})

export const {setCategory} = postSlice.actions

export default postSlice.reducer