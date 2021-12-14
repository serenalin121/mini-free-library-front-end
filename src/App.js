import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLibraries, getMyLibrary } from "./store/librarySlice";
import { getCheckoutBooks } from "./store/bookSlice";

import CustomizedSnackbars from "./components/UI/Snackbar";
import MainHeader from "./components/MainHeader";
import LibraryDetail from "./components/Library/LibraryDetail";
import LibraryContainer from "./components/Library/LibraryContainer";
import LibraryNewForm from "./components/Library/LibraryNewForm";
import AuthPage from "./pages/AuthPage";
import MyLibrary from "./components/Library/MyLibrary";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.user.isUser);
  const isAdmin = useSelector((state) => state.admin.isAdmin);

  useEffect(() => {
    if (isUser) {
      dispatch(getLibraries());
      dispatch(getCheckoutBooks());
    } else if (isAdmin) {
      dispatch(getMyLibrary());
    }
  }, [isUser, isAdmin, dispatch]);

  return (
    <div className="App">
      <MainHeader />
      <main className="mainContainer">
        <CustomizedSnackbars />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          {isUser && <Route path="/library" element={<LibraryContainer />} />}
          {isAdmin && <Route path="/newLibrary" element={<LibraryNewForm />} />}
          {isAdmin && <Route path="/myLibrary" element={<MyLibrary />} />}
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
