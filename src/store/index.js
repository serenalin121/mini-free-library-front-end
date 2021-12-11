import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./bookSlice";
import librarySlice from "./librarySlice";
import snackbarSlice from "./snackbarSlice";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";

const store = configureStore({
  reducer: {
    library: librarySlice.reducer,
    book: bookSlice.reducer,
    snackbar: snackbarSlice.reducer,
    user: userSlice.reducer,
    admin: adminSlice.reducer,
  },
});

export default store;
