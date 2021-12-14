import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:3003/books";

export const getBooks = createAsyncThunk("books/get", async ({ libId }) => {
  return await fetch(baseUrl + "/" + libId, { credentials: "include" }).then(
    (res) => res.json()
  );
});

export const getCheckoutBooks = createAsyncThunk(
  "checkoutBooks/get",
  async () => {
    return await fetch(baseUrl + "/myBook", { credentials: "include" }).then(
      (res) => res.json()
    );
  }
);

export const addBook = createAsyncThunk(
  "books/post",
  async ({ libId, ISBN }) => {
    return await fetch(baseUrl + "/" + libId, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
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
      credentials: "include",
    }).then((res) => bookId);
  }
);

export const checkoutBook = createAsyncThunk(
  "checkout/put",
  async ({ bookId }) => {
    return await fetch(baseUrl + "/checkout/" + bookId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((res) => bookId);
  }
);

export const returnBook = createAsyncThunk(
  "return/put",
  async ({ bookId, libId }) => {
    return await fetch(baseUrl + "/return/" + bookId + "/" + libId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((res) => bookId);
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    checkout: [],
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

    builder.addCase(getCheckoutBooks.fulfilled, (state, action) => {
      console.log("getCheckoutBooks", action.payload);
      return {
        ...state,
        status: "success",
        checkout: action.payload,
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
      console.log("deleteBooks", action.payload);
      return {
        ...state,
        status: "success",
        books: state.books.filter((book) => book._id !== action.payload),
      };
      //   state.status = "success";
      //   state.books = state.books.filter((book) => book._id !== action.payload);
    });

    builder.addCase(checkoutBook.fulfilled, (state, action) => {
      console.log("checkoutBooks", action.payload);

      const test = {
        ...state,
        status: "success",
        books: state.books.filter((book) => book._id !== action.payload),
        checkout: [
          ...state.checkout,
          ...state.books.filter((book) => book._id === action.payload),
        ],
      };

      console.log(test);

      return test;
    });

    builder.addCase(returnBook.fulfilled, (state, action) => {
      console.log("returnBooks", action.payload);

      return {
        ...state,
        status: "success",
        books: [
          ...state.books,
          ...state.checkout.filter((book) => book._id === action.payload),
        ],
        checkout: state.checkout.filter((book) => book._id !== action.payload),
      };
    });
  },
});

export default bookSlice;
