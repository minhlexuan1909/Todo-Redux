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
    createdAt: "",
    loading: false,
    isEdit: false,
  },
  reducers: {
    toggleIsEdit: (state, action) => {
      state.isEdit = !state.isEdit;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changePasswordThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePasswordThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        const errChangePasswordMess = action.payload.error.message;
        toast.error(errChangePasswordMess);
      } else {
        state.password = action.payload.newPassword;
        toast.success("Change password successfully");
      }
      state.loading = false;
    });
    builder.addCase(getInfoThunk.pending, (state) => {
      // toast.warn("Loading informations...");
      state.loading = true;
    });
    builder.addCase(getInfoThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        console.log(action.payload.error.message);
      } else {
        toast.success("Informations loaded");
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.createdAt = action.payload.createdAt;
      }
      state.loading = false;
    });
    builder.addCase(editInfoThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editInfoThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        const errEditInfoMess = action.payload.error.message;
        toast.error(errEditInfoMess);
      } else {
        state.isEdit = false;

        toast.success("Change informations successfully");
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.username = action.payload.username;
        state.email = action.payload.email;
      }
      state.loading = false;
    });
  },
});

export default profileSlice;

export const usernameSelector = (state) => state.profile.username;
export const nameSelector = (state) => state.profile.name;
export const emailSelector = (state) => state.profile.email;
export const createAtSelector = (state) => state.profile.createdAt;
export const loadingProfileSelector = (state) => state.profile.loading;
export const isEditSelector = (state) => state.profile.isEdit;
