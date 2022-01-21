import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/services/authSlice";
import profileSlice from "../features/profile/services/profileSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
  },
});
export default store;
