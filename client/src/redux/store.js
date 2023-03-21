import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import chatReducer from "../redux/chatSlice";

export const store = configureStore({
  reducer: {
    userReducer,
    chatReducer,
  },
});
