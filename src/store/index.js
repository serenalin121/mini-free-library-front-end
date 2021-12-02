import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./bookSlice";
import librarySlice from "./librarySlice";

const store = configureStore({
  reducer: {
    library: librarySlice.reducer,
    book: bookSlice.reducer,
  },
});

export default store;
