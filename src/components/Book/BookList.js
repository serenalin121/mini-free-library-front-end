import React from "react";
import { Link } from "react-router-dom";

const BookList = (props) => {
  return (
    <ul>
      {props.books.map((book, i) => {
        return (
          <li key={i}>
            <Link to={`/books/${book._id}`}>{book.name} </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default BookList;
