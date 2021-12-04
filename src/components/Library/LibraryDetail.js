import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteLibrary } from "../../store/librarySlice";
import BookContainer from "../Book/BookContainer";
import BookNewForm from "../Book/BookNewForm";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const LibraryDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const libraries = useSelector((state) => state.library.libraries);
  const library = libraries.find((lib) => lib._id === params.libraryId);

  const deleteLibraryHandler = () => {
    dispatch(deleteLibrary({ id: params.libraryId }));
    navigate("/");
  };

  return (
    <section>
      <h1>Library Detail</h1>
      <h2>Location: {library?.location}</h2>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={deleteLibraryHandler}
        color="error"
      >
        Delete
      </Button>
      <h3>Add Book: </h3>
      <BookNewForm libId={params.libraryId} />
      <h3>Book List: </h3>
      <BookContainer libId={params.libraryId} />
    </section>
  );
};

export default LibraryDetail;
