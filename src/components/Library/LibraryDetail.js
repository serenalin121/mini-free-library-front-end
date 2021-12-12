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
  const isAdmin = useSelector((state) => state.admin.isAdmin);

  const deleteLibraryHandler = () => {
    dispatch(deleteLibrary({ id: params.libraryId }));
    navigate("/");
  };

  return (
    <section>
      <h1>
        This library is located at: {library?.location}
        {"   "}
        {isAdmin && (
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={deleteLibraryHandler}
            color="error"
          >
            Delete
          </Button>
        )}
      </h1>
      {isAdmin && <BookNewForm libId={params.libraryId} />}
      <BookContainer libId={params.libraryId} />
    </section>
  );
};

export default LibraryDetail;
