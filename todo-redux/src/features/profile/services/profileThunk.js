import { createAsyncThunk } from "@reduxjs/toolkit";
import { authTokenSelector } from "../../auth/services/authSlice";
import ProfileAPI from "../api/ProfileAPI";
export const changePasswordThunk = createAsyncThunk(
  "profile/changePasswordThunk",
  async (data) => {
    try {
      console.log(typeof data);
      const token = data.token;
      const APIdata = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
      console.log(APIdata);
      const response = await ProfileAPI.changePassword(APIdata, token);
      const returnData = {
        newPassword: data.newPassword,
      };
      console.log(returnData);
      return returnData;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const getInfoThunk = createAsyncThunk(
  "profile/getInfoThunk",
  async (data) => {
    try {
      const response = await ProfileAPI.getInfo(data.id, data.token);
      // console.log(response.data);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);
export const editInfoThunk = createAsyncThunk(
  "profile/editInfoThunk",
  async (data) => {
    try {
      const id = data.id;
      const token = data.token;
      delete data.id;
      delete data.token;
      console.log(data);
      const response = await ProfileAPI.editInfo(data, id, token);
      console.log(response.data);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);
