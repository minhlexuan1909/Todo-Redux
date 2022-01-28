import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loginThunk, logoutThunk, registerThunk } from "./authThunk";

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
    builder.addCase(registerThunk.pending, () => {
      toast.warn("Creating account...");
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        const errRegisterMessage = action.payload.error.message;
        toast.error(errRegisterMessage);
      } else {
        toast.success("Account created");
      }
    });
    builder.addCase(logoutThunk.fulfilled, (state, action) => {
      if (typeof payload == "Object" && "error" in action.payload) {
        const errMessage = action.payload.error.message;
        toast.error(errMessage);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    });
  },
});

export default authSlice;
export const authAction = authSlice.actions;

export const userIdSelector = (state) => state.auth.userId;
export const authTokenSelector = (state) => state.auth.token;
