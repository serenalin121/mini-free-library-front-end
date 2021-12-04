import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:3003/books";

export const getBooks = createAsyncThunk("books/get", async ({ libId }) => {
  return await fetch(baseUrl + "/" + libId).then((res) => res.json());
});

export const addBook = createAsyncThunk(
  "books/post",
  async ({ libId, ISBN }) => {
    return await fetch(baseUrl + "/" + libId, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ISBN,
        locationID: libId,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }
);

export const deleteBook = createAsyncThunk(
  "book/delete",
  async ({ bookId }) => {
    return await fetch(baseUrl + "/" + bookId, {
      method: "DELETE",
    }).then((res) => bookId);
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
      console.log("getBooks", action.payload);
      return {
        ...state,
        status: "success",
        books: action.payload,
      };
    });

    builder.addCase(addBook.fulfilled, (state, action) => {
      console.log("addBooks", action.payload);
      return {
        ...state,
        status: "success",
        books: [...state.books, action.payload],
      };
    });

    builder.addCase(deleteBook.fulfilled, (state, action) => {
      console.log("addBooks", action.payload);
      return {
        ...state,
        status: "success",
        books: state.books.filter((book) => book._id !== action.payload),
      };
      //   state.status = "success";
      //   state.books = state.books.filter((book) => book._id !== action.payload);
    });
  },
});

export default bookSlice;