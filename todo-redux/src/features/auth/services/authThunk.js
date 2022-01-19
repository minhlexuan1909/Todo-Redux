import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthAPI from "../api/index";

export const loginThunk = createAsyncThunk("auth/loginThunk", async (data) => {
  try {
    const response = await AuthAPI.login(data);
    console.log(response.data);

    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

export const registerThunk = createAsyncThunk(
  "auth/registerThunk",
  async (data) => {
    try {
      const response = await AuthAPI.register(data);
      console.log(response.data);

      return response.data;
    } catch (err) {
      console.log(err.response);

      return err.response.data;
    }
  }
);
