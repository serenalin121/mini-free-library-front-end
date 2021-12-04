import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../../store/bookSlice";

const BookNewForm = (props) => {
  const [isbn, setIsbn] = useState("");
  const dispatch = useDispatch();

  const ISBNChangeHandler = (e) => {
    setIsbn(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(props.libId);
    // console.log(isbn);
    dispatch(
      addBook({
        libId: props.libId,
        ISBN: isbn,
      })
    );
    setIsbn("");
  };

  return (
    <Fragment>
      <h3>Add a new book </h3>
      <form onSubmit={submitHandler}>
        <label htmlFor="isbn">ISBN</label>
        <input type="text" onChange={ISBNChangeHandler} value={isbn} />
        <button type="submit">Add New Book</button>
      </form>
    </Fragment>
  );
};

export default BookNewForm;
