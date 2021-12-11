import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyLibrary = () => {
  const mylibrary = useSelector((state) => state.library.myLibrary);
  console.log(mylibrary);
  return (
    <>
      <h1>My Library</h1>
      <ul>
        {mylibrary?.map((library, i) => {
          return (
            <li key={i}>
              <Link to={`/library/${library._id}`}>{library.location} </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MyLibrary;
