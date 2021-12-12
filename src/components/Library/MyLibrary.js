import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteLibrary } from "../../store/librarySlice";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocationOn } from "@mui/icons-material";

const MyLibrary = () => {
  const mylibrary = useSelector((state) => state.library.libraries);
  const dispatch = useDispatch();

  const deleteLibraryHandler = (id) => {
    dispatch(deleteLibrary({ id: id }));
  };

  return (
    <>
      <h1>My Library</h1>
      <ul className="my-library-ul">
        {mylibrary?.map((library, i) => {
          return (
            <li key={i}>
              <LocationOn style={{ color: "#b49962" }} />
              <Link to={`/library/${library._id}`}>
                {library.location}{" "}
              </Link>{" "}
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => deleteLibraryHandler(library._id)}
                color="error"
              >
                Delete
              </Button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MyLibrary;
