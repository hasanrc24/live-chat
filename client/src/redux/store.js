import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice/userSlice";

export const store = configureStore({
  reducer: {
    userReducer,
  },
});
