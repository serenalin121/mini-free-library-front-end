import { useSelector } from "react-redux";

import React from "react";
import LibraryList from "./LibraryList";

const LibraryContainer = () => {
  const libraries = useSelector((state) => state.library.libraries);
  const x = useSelector((state) => state.library.action);

  return (
    <div>
      <h1>All the libraries</h1>
      <LibraryList libraries={libraries} x={x} />
    </div>
  );
};

export default LibraryContainer;
