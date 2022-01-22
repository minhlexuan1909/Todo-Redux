import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/services/authSlice";
import profileSlice from "../features/profile/services/profileSlice";
import todoSlice from "../features/todo/services/todoSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    todo: todoSlice.reducer,
  },
});
export default store;
