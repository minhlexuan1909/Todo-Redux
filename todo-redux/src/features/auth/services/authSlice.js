import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loginThunk, logoutThunk, registerThunk } from "./authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: localStorage.getItem("userId"),
    token: localStorage.getItem("token"),
    isRegisteredSuccessfully: false,
    loadingLogin: false,
    loadingRegister: false,
  },
  reducers: {
    // Use this when user move to other site than register to make loading effect still work
    setFalseIsRegis: (state) => {
      state.isRegisteredSuccessfully = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.loadingLogin = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loadingLogin = false;
      if ("error" in action.payload) {
        const errLoginMessage = action.payload.error.message;
        toast.error(errLoginMessage);
      } else {
        state.token = action.payload.data.id;
        state.userId = action.payload.data.userId;
        localStorage.setItem("token", action.payload.id);
        localStorage.setItem("userId", action.payload.userId);
      }
    });
    builder.addCase(registerThunk.pending, (state) => {
      state.loadingRegister = true;
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.loadingRegister = false;
      if ("error" in action.payload) {
        const errRegisterMessage = action.payload.error.message;
        toast.error(errRegisterMessage);
      } else {
        toast.success("Account created");
        state.isRegisteredSuccessfully = true;
      }
    });
    builder.addCase(logoutThunk.fulfilled, (state, action) => {
      if (typeof payload === "Object" && "error" in action.payload) {
        const errMessage = action.payload.error.message;
        toast.error(errMessage);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        state.token = "";
        state.userId = 0;
      }
    });
  },
});

export default authSlice;
export const authAction = authSlice.actions;

export const userIdSelector = (state) => state.auth.userId;
export const authTokenSelector = (state) => state.auth.token;
export const isRegisteredSuccessfullySelector = (state) =>
  state.auth.isRegisteredSuccessfully;
export const loadingLoginSelector = (state) => state.auth.loadingLogin;
export const loadingRegisterSelector = (state) => state.auth.loadingRegister;
