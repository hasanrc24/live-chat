import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: {},
  chats: [],
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
  },
});

export const chatSelector = (state) => state.chatReducer;
export const { dispatchSelectedChat, dispatchChats } = chatSlice.actions;
export default chatSlice.reducer;
