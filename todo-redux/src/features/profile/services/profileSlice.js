import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  changePasswordThunk,
  editInfoThunk,
  getInfoThunk,
} from "./profileThunk";
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    id: 0,
    name: "",
    username: "",
    email: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changePasswordThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        const errChangePasswordMess = action.payload.error.message;
        toast.error(errChangePasswordMess);
      } else {
        state.password = action.payload.newPassword;
        toast.success("Change password successfully");
      }
    });
    builder.addCase(getInfoThunk.pending, () => {
      toast.warn("Loading informations...");
    });
    builder.addCase(getInfoThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        console.log(action.payload.error.message);
      } else {
        // console.log("dafuq");
        toast.success("Informations loaded");
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.username = action.payload.username;
        state.email = action.payload.email;
      }
    });
    builder.addCase(editInfoThunk.pending, () => {
      toast.warn("Changing informations...");
    });
    builder.addCase(editInfoThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        const errEditInfoMess = action.payload.error.message;
        toast.error(errEditInfoMess);
      } else {
        toast.success("Change informations successfully");
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.username = action.payload.username;
        state.email = action.payload.email;
      }
    });
  },
});

export default profileSlice;

export const usernameSelector = (state) => state.profile.username;
export const nameSelector = (state) => state.profile.name;
export const emailSelector = (state) => state.profile.email;
