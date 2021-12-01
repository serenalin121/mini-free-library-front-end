import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:3003/library";

// export const createLibrary = createAsyncThunk(
//   "libraries/create",
//   async (dispatch, getState) => {
//     return await fetch(baseUrl, {
//       method: "POST",
//       body: JSON.stringify({
//         location: getState.name,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }).then((res) => res.json());
//   }
// );

export const getLibraries = createAsyncThunk("libraries/get", async () => {
  return await fetch(baseUrl).then((res) => res.json());
});

export const createLibrary = createAsyncThunk(
  "libraries/post",
  async ({ latitude, longitude, location }) => {
    return await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ latitude, longitude, location }),
    }).then((res) => res.json());
  }
);

const librarySlice = createSlice({
  name: "library",
  initialState: {
    libraries: [],
    // latitude: null,
    // longtitude: null,
    // owner: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getLibraries.fulfilled, (state, action) => {
      // Add user to the state array
      state.status = "success";
      state.libraries = action.payload;
    });
    builder.addCase(createLibrary.fulfilled, (state, action) => {
      // Add user to the state array
      state.status = "success";
      state.libraries.push(action.payload);
    });
  },
});

export default librarySlice;
