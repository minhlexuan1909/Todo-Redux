import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loginThunk, registerThunk } from "./authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
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

export const authTokenSelector = (state) => state.auth.token;
