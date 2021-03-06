import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook } from "../../store/bookSlice";
import { checkoutBook } from "../../store/bookSlice";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";

const BookList = (props) => {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.user.isUser);
  const isAdmin = useSelector((state) => state.admin.isAdmin);

  const deleteBookHandler = (id) => {
    dispatch(deleteBook({ bookId: id }));
  };

  const checkoutBookHandler = (id) => {
    dispatch(checkoutBook({ bookId: id }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mx: "auto", width: "80%" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {props.books.map((book, i) => {
            return (
              <Grid item xs={6} sm={4} md={2} key={i}>
                <Card
                  style={{
                    height: "475px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={book.name}
                    style={{
                      height: "300px",
                      objectFit: "contain",
                    }}
                    image={`https://covers.openlibrary.org/b/isbn/${book.ISBN}-M.jpg`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {book.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {isAdmin && (
                      <Button
                        onClick={() => deleteBookHandler(book._id)}
                        variant="outlined"
                        color="error"
                      >
                        Delete
                      </Button>
                    )}
                    {isUser && (
                      <Button
                        onClick={() => checkoutBookHandler(book._id)}
                        variant="outlined"
                        color="primary"
                      >
                        Checkout
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default BookList;
