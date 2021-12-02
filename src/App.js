import { Route, Routes } from "react-router-dom";
import "./App.css";

import LibraryContainer from "./components/Library/LibraryContainer";
import MainHeader from "./components/MainHeader";
import LibraryDetail from "./components/Library/LibraryDetail";
import BookContainer from "./components/Book/BookContainer";

function App() {
  return (
    <div className="App">
      <MainHeader />
      <main>
        <Routes>
          <Route
            path="/"
            element={<h1>📚 Welcome to Mini Free Library! 📚</h1>}
          />
          <Route path="/library" element={<LibraryContainer />} />
          <Route path="/library/:libraryId" element={<LibraryDetail />}>
            <Route path="books" element={<BookContainer />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
