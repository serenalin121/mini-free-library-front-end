import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLibraries } from "../../store/librarySlice";
import React from "react";
import LibraryList from "./LibraryList";
import LibraryNewForm from "./LibraryNewForm";

const LibraryContainer = () => {
  const dispatch = useDispatch();
  const libraries = useSelector((state) => state.library.libraries);

  useEffect(() => {
    dispatch(getLibraries());
  }, [dispatch]);

  return (
    <div>
      <h1>All the libraries</h1>
      <LibraryList libraries={libraries} />
      <LibraryNewForm />
    </div>
  );
};

export default LibraryContainer;
