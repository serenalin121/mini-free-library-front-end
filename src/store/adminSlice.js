import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:3003/admins";

export const signinAdmin = createAsyncThunk(
  "admins/signin",
  async ({ email, password }) => {
    return await fetch(baseUrl + "/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }
);

export const signupAdmin = createAsyncThunk(
  "admins/signup",
  async ({ email, password }) => {
    return await fetch(baseUrl + "/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }
);

export const signoutAdmin = createAsyncThunk("users/signout", async () => {
  return await fetch(baseUrl + "/signout", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isAdmin: false,
    adminInfo: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signinAdmin.fulfilled, (state, action) => {
      console.log("signinAdmin", action.payload);

      return {
        ...state,
        status: "success",
        isUser: true,
        userInfo: [action.payload],
      };
    });

    builder.addCase(signupAdmin.fulfilled, (state, action) => {
      console.log("signupAdmin", action.payload);

      return {
        ...state,
        status: "success",
        isUser: true,
        userInfo: [action.payload],
      };
    });

    builder.addCase(signoutAdmin.fulfilled, (state, action) => {
      console.log("signoutAdmin", action.payload);

      return {
        ...state,
        status: "success",
        isUser: false,
        userInfo: [],
      };
    });
  },
});

export default adminSlice;
