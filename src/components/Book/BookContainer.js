import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks } from "../../store/bookSlice";
import React from "react";
import BookList from "./BookList";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";

const BookContainer = (props) => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books);
  console.log(books);

  useEffect(() => {
    dispatch(getBooks({ libId: props.libId }));
  }, [dispatch, props.libId]);

  return (
    <ThemeProvider theme={theme}>
      <hr />
      <h2 style={{ color: "#7d6b44" }}>All Books</h2>
      <BookList books={books} />
    </ThemeProvider>
  );
};

export default BookContainer;
