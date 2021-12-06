import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./bookSlice";
import librarySlice from "./librarySlice";
import snackbarSlice from "./snackbarSlice";

const store = configureStore({
  reducer: {
    library: librarySlice.reducer,
    book: bookSlice.reducer,
    snackbar: snackbarSlice.reducer,
  },
});

export default store;
