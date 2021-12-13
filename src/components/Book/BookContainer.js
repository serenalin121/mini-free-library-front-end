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
  const isUser = useSelector((state) => state.user.isUser);
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  console.log(books);

  useEffect(() => {
    if (isUser || isAdmin) {
      dispatch(getBooks({ libId: props.libId }));
    }
  }, [dispatch, props.libId, isUser, isAdmin]);

  return (
    <ThemeProvider theme={theme}>
      <hr />
      <h2 style={{ color: "#7d6b44" }}>All Books</h2>
      <BookList books={books} />
    </ThemeProvider>
  );
};

export default BookContainer;
