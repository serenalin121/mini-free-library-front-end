import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signoutAdmin } from "./adminSlice";

const baseUrl = `${process.env.REACT_APP_BASEURL}/library`;

export const getLibraries = createAsyncThunk("libraries/get", async () => {
  return await fetch(baseUrl, {
    credentials: "include",
  }).then((res) => res.json());
});

export const getMyLibrary = createAsyncThunk("mylibrary/get", async () => {
  return await fetch(baseUrl + "/myLibrary", {
    credentials: "include",
  }).then((res) => res.json());
});

export const createLibrary = createAsyncThunk(
  "library/post",
  async ({ latitude, longitude, location }) => {
    return await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ latitude, longitude, location }),
    }).then((res) => res.json());
  }
);

export const deleteLibrary = createAsyncThunk(
  "library/delete",
  async ({ id }) => {
    return await fetch(baseUrl + "/" + id, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => id);
  }
);

const librarySlice = createSlice({
  name: "library",
  initialState: {
    action: "",
    status: "",
    libraries: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getLibraries.fulfilled, (state, action) => {
      // Add user to the state array
      // state.status = "success";
      // state.libraries = action.payload;
      console.log(action);
      return {
        ...state,
        status: "success",
        libraries: action.payload,
      };
    });

    builder.addCase(getMyLibrary.fulfilled, (state, action) => {
      // Add user to the state array
      // state.status = "success";
      // state.libraries = action.payload;
      console.log(action);
      return {
        ...state,
        status: "success",
        libraries: action.payload,
      };
    });

    builder.addCase(createLibrary.fulfilled, (state, action) => {
      // Add user to the state array
      state.action = "add";
      state.status = "success";
      state.libraries.push(action.payload);
    });

    builder.addCase(deleteLibrary.fulfilled, (state, action) => {
      // Add user to the state array
      state.status = "success";
      state.action = "delete";
      state.libraries = state.libraries.filter(
        (lib) => lib._id !== action.payload
      );
    });

    builder.addCase(signoutAdmin.fulfilled, (state, action) => {
      // Add user to the state array
      return {
        ...state,
        myLibrary: [],
      };
    });
  },
});

export default librarySlice;
