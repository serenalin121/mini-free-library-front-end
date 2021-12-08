import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getLibraries } from "./store/librarySlice";

import CustomizedSnackbars from "./components/UI/Snackbar";
import MainHeader from "./components/MainHeader";
import LibraryDetail from "./components/Library/LibraryDetail";
import LibraryContainer from "./components/Library/LibraryContainer";
import LibraryNewForm from "./components/Library/LibraryNewForm";
import Cart from "./components/User/Cart";

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
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
