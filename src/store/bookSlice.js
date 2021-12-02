import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:3003/books";

export const getBooks = createAsyncThunk("books/get", async ({ libId }) => {
  return await fetch(baseUrl + "/" + libId).then((res) => res.json());
});

export const addBook = createAsyncThunk(
  "books/post",
  async ({ libId, name, ISBN }) => {
    return await fetch(baseUrl + "/" + libId, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        ISBN,
        locationID: libId,
        locationType: "Library",
      }),
    }).then((res) => res.json());
  }
);

export const deleteBook = createAsyncThunk(
  "book/delete",
  async ({ bookId }) => {
    return await fetch(baseUrl + "/" + bookId, {
      method: "DELETE",
    }).then((res) => res.json());
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getBooks.fulfilled, (state, action) => {
      // Add user to the state array
      state.status = "success";
      state.books = action.payload;
    });

    builder.addCase(addBook.fulfilled, (state, action) => {
      // Add user to the state array
      state.status = "success";
      state.books.push(action.payload);
    });

    builder.addCase(deleteBook.fulfilled, (state, action) => {
      // Add user to the state array
      state.status = "success";
      state.books.filter((book) => book._id === action.payload._id);
    });
  },
});

export default bookSlice;
