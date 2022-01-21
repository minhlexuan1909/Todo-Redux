import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loginThunk, registerThunk } from "./authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: localStorage.getItem("userId"),
    token: localStorage.getItem("token"),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        const errLoginMessage = action.payload.error.message;
        toast.error(errLoginMessage);
      } else {
        state.token = action.payload.id;
        state.userId = action.payload.userId;
        localStorage.setItem("token", action.payload.id);
        localStorage.setItem("userId", action.payload.userId);
      }
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        const errRegisterMessage = action.payload.error.message;
        toast.error(errRegisterMessage);
      }
    });
  },
});

export default authSlice;
export const authAction = authSlice.actions;

export const userIdSelector = (state) => state.auth.userId;
export const authTokenSelector = (state) => state.auth.token;
