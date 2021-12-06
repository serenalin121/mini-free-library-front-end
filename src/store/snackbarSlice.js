import { createSlice } from "@reduxjs/toolkit";
import { addBook, deleteBook } from "./bookSlice";
import { createLibrary, deleteLibrary } from "./librarySlice";

const initialState = {
  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: "",
};

const SHARED_SUCCESS_SNACKBAR = {
  snackbarOpen: true,
  snackbarType: "success",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar(state, action) {
      const { snackbarOpen, snackbarType, snackbarMessage } = action.payload;
      state.snackbarOpen = snackbarOpen;
      state.snackbarType = snackbarType;
      state.snackbarMessage = snackbarMessage;
    },
  },
  extraReducers: (builder) => {
    // BOOK
    builder.addCase(addBook.fulfilled, (state, action) => {
      return {
        ...state,
        ...SHARED_SUCCESS_SNACKBAR,
        snackbarMessage: "Successfully added a book!",
      };
    });

    builder.addCase(deleteBook.fulfilled, (state, action) => {
      return {
        ...state,
        ...SHARED_SUCCESS_SNACKBAR,
        snackbarMessage: "Successfully deleted a book!",
      };
    });

    // LIBRARY
    builder.addCase(createLibrary.fulfilled, (state, action) => {
      return {
        ...state,
        ...SHARED_SUCCESS_SNACKBAR,
        snackbarMessage: "Successfully added a library!",
      };
    });

    builder.addCase(deleteLibrary.fulfilled, (state, action) => {
      return {
        ...state,
        ...SHARED_SUCCESS_SNACKBAR,
        snackbarMessage: "Successfully deleted a library!",
      };
    });
  },
});

export const snackbarActions = snackbarSlice.actions;

export default snackbarSlice;
