import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLibraries } from "./store/librarySlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLibraries());
  }, [dispatch]);

  const libraries = useSelector((state) => state.library.libraries);
  console.log("libraries: " + libraries);
  return (
    <div className="App">
      <h1>Hello</h1>
      <ul>
        {libraries &&
          libraries.map((library, i) => <li key={i}>{library.location}</li>)}
      </ul>
    </div>
  );
}

export default App;
