import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: {},
  chats: [],
  notification: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    dispatchSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    dispatchChats: (state, action) => {
      state.chats = action.payload;
    },
    dispatchNotification: (state, action) => {
      state.notification = [action.payload, ...state.notification];
    },
  },
});

export const chatSelector = (state) => state.chatReducer;
export const { dispatchSelectedChat, dispatchChats, dispatchNotification } =
  chatSlice.actions;
export default chatSlice.reducer;
