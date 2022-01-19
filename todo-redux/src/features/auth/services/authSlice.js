import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk } from "./authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    errLoginMessage: "",
    errRegisterMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        state.errLoginMessage = action.payload.error.message;
      } else {
        state.token = action.payload.id;
        state.errLoginMessage = "";
      }
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        state.errRegisterMessage = action.payload.error.message;
      } else {
        state.errRegisterMessage = "";
      }
    });
  },
});

export default authSlice;
export const authAction = authSlice.actions;

export const authTokenSelector = (state) => state.auth.token;
export const errLoginMessageSelector = (state) => state.auth.errLoginMessage;
export const errRegisterMessageSelector = (state) =>
  state.auth.errRegisterMessage;
