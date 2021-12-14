import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:3003/users";

export const signinUser = createAsyncThunk(
  "users/signin",
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

export const signupUser = createAsyncThunk(
  "users/signup",
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

export const renewUser = createAsyncThunk("users/renew", async () => {
  return await fetch(baseUrl + "/renew", {
    method: "POST",
    credentials: "include",
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
});

export const signoutUser = createAsyncThunk("users/signout", async () => {
  return await fetch(baseUrl + "/signout", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isUser: false,
    userInfo: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signinUser.fulfilled, (state, action) => {
      console.log("signinUser", action.payload);

      return {
        ...state,
        status: "success",
        isUser: true,
        userInfo: [action.payload],
      };
    });

    builder.addCase(signupUser.fulfilled, (state, action) => {
      console.log("signupUser", action.payload);

      return {
        ...state,
        status: "success",
        isUser: true,
        userInfo: [action.payload],
      };
    });

    builder.addCase(signoutUser.fulfilled, (state, action) => {
      console.log("signoutUser", action.payload);

      return {
        ...state,
        status: "success",
        isUser: false,
        userInfo: [],
      };
    });

    builder.addCase(renewUser.fulfilled, (state, action) => {
      console.log("renew", action.payload);
      console.log(action.payload.isAdmin);

      return {
        ...state,
        status: "success",
        isUser: !action.payload.isAdmin,
        userInfo: [],
      };
    });
  },
});

export default userSlice;
