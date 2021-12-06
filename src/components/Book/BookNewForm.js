import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../../store/bookSlice";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const BookNewForm = (props) => {
  const [isbn, setIsbn] = useState("");
  const dispatch = useDispatch();

  const ISBNChangeHandler = (e) => {
    setIsbn(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(props.libId);
    console.log(isbn);
    dispatch(
      addBook({
        libId: props.libId,
        ISBN: isbn,
      })
    );
    setIsbn("");
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="ISBN #"
          onChange={ISBNChangeHandler}
          value={isbn}
        />
      </div>
      <Button type="submit" variant="outlined">
        Add New Book
      </Button>
    </Box>
  );
};

export default BookNewForm;
