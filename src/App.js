import { Route, Routes } from "react-router-dom";
import "./App.css";

import LibraryContainer from "./components/Library/LibraryContainer";
import MainHeader from "./components/MainHeader";

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
          {/* <Route path="/library/:libraryId" element={<ProductDetail />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
