import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  onlineUsers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserInfo: (state, action) => {
      state.user = action.payload;
    },
    onlineUserList: (state, action) => {
      state.onlineUsers = action.payload;
    },
    // removeOnlineUser: (state, action) => {
    //   state.onlineUsers =
    // }
  },
});

export const userSelector = (state) => state.userReducer;
export const { addUserInfo, onlineUserList } = userSlice.actions;
export default userSlice.reducer;
