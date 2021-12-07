import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import LibraryContainer from "./components/Library/LibraryContainer";
import LibraryNewForm from "./components/Library/LibraryNewForm";
import { getLibraries } from "./store/librarySlice";
import MainHeader from "./components/MainHeader";
import LibraryDetail from "./components/Library/LibraryDetail";
import { useDispatch } from "react-redux";
import CustomizedSnackbars from "./components/UI/Snackbar";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLibraries());
  }, [dispatch]);

  return (
    <div className="App">
      <MainHeader />
      <main>
        <CustomizedSnackbars />
        <Routes>
          <Route path="/" element={<LibraryContainer />} />
          <Route path="/library" element={<LibraryNewForm />} />
          <Route path="/library/:libraryId/" element={<LibraryDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
