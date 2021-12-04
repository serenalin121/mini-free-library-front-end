import React from "react";
import { useDispatch } from "react-redux";
import { deleteBook } from "../../store/bookSlice";

const BookList = (props) => {
  const dispatch = useDispatch();

  const deleteBookHandler = (id) => {
    dispatch(deleteBook({ bookId: id }));
  };

  return (
    <ul>
      {props.books.map((book, i) => {
        return (
          <li key={i}>
            {book.name}
            <img
              src={`https://covers.openlibrary.org/b/isbn/${book.ISBN}-M.jpg`}
              alt={book.name}
            />
            <button onClick={() => deleteBookHandler(book._id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default BookList;
