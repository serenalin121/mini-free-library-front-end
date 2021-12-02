import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteLibrary } from "../../store/librarySlice";

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
      <h3>Location: {library.location}</h3>
      <button onClick={deleteLibraryHandler}>Delete</button>
    </section>
  );
};

export default LibraryDetail;
