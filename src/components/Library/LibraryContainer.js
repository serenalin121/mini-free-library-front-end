import { useSelector } from "react-redux";

import React from "react";
import LibraryList from "./LibraryList";
import LibraryNewForm from "./LibraryNewForm";

const LibraryContainer = () => {
  const libraries = useSelector((state) => state.library.libraries);

  return (
    <div>
      <h1>All the libraries</h1>
      <LibraryList libraries={libraries} />
      <LibraryNewForm />
    </div>
  );
};

export default LibraryContainer;
