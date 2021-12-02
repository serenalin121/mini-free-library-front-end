import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks } from "../../store/bookSlice";
import React from "react";
import BookList from "./BookList";
// import BookNewForm from "./BookNewForm";

const BookContainer = (props) => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books);

  useEffect(() => {
    dispatch(getBooks({ libId: props.libId }));
  }, [dispatch, props.libId, books]);

  return (
    <div>
      <h1>All Books</h1>
      <BookList books={books} />
    </div>
  );
};

export default BookContainer;
