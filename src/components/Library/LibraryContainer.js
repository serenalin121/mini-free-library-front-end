import { useSelector } from "react-redux";

import React from "react";
import LibraryList from "./LibraryList";

const LibraryContainer = () => {
  const libraries = useSelector((state) => state.library.libraries);

  return (
    <div>
      <h1>All the libraries</h1>
      <LibraryList libraries={libraries} />
    </div>
  );
};

export default LibraryContainer;
