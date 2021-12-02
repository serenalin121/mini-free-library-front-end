import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteLibrary } from "../../store/librarySlice";
import BookContainer from "../Book/BookContainer";

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
      <h2>Location: {library.location}</h2>
      <button onClick={deleteLibraryHandler}>Delete</button>
      <h3>Book List: </h3>
      <BookContainer libId={params.libraryId} />
    </section>
  );
};

export default LibraryDetail;
