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
    removeNotification: (state, action) => {
      state.notification = state.notification.filter(
        (noti) => noti.chat._id !== action.payload._id
      );
    },
  },
});

export const chatSelector = (state) => state.chatReducer;
export const {
  dispatchSelectedChat,
  dispatchChats,
  dispatchNotification,
  removeNotification,
} = chatSlice.actions;
export default chatSlice.reducer;
