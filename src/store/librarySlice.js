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

export const getLibraries = createAsyncThunk(
  "libraries/get",
  async (dispatch, getState) => {
    return await fetch(baseUrl).then((res) => res.json());
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
  reducers: {
    [getLibraries.pending]: (state, action) => {
      console.log(state, action);
      state.status = "loading";
    },
    [getLibraries.fulfilled]: (state, action) => {
      console.log(state, action);
      state.status = "success";
      state.libraries = action.payload;
      console.log(state.libraries);
    },
    [getLibraries.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getLibraries.fulfilled, (state, action) => {
      // Add user to the state array
      state.status = "success";
      state.libraries = action.payload;
      console.log(state.libraries);
    });
  },
});

export default librarySlice;
