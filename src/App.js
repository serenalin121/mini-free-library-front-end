import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLibraries } from "./store/librarySlice";

import CustomizedSnackbars from "./components/UI/Snackbar";
import MainHeader from "./components/MainHeader";
import LibraryDetail from "./components/Library/LibraryDetail";
import LibraryContainer from "./components/Library/LibraryContainer";
import LibraryNewForm from "./components/Library/LibraryNewForm";
import AuthPage from "./pages/AuthPage";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.user.isUser);
  const isAdmin = useSelector((state) => state.admin.isAdmin);

  useEffect(() => {
    if (isUser) {
      dispatch(getLibraries());
    }
  }, [isUser, dispatch]);

  return (
    <div className="App">
      <MainHeader />
      <main className="mainContainer">
        <CustomizedSnackbars />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/library" element={<LibraryContainer />} />
          <Route path="/newLibrary" element={<LibraryNewForm />} />
          <Route path="/library/:libraryId/" element={<LibraryDetail />} />
        </Routes>
      </main>
      <p className="copyright">
        © Copyright 2021 | Designed and Coded by Serena Lin
      </p>
    </div>
  );
}

export default App;
