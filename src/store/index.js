import { configureStore } from "@reduxjs/toolkit";

import librarySlice from "./librarySlice";

const store = configureStore({
  reducer: {
    library: librarySlice.reducer,
  },
});

export default store;
