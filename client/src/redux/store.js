import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import chatReducer from "../redux/chatSlice";
import toggleReducer from "../redux/toggleSlice";

export const store = configureStore({
  reducer: {
    userReducer,
    chatReducer,
    toggleReducer,
  },
});
