import React from "react";
import { Link } from "react-router-dom";

const LibraryList = (props) => {
  return (
    <ul>
      {props.libraries.map((library, i) => {
        return (
          <li key={i}>
            <Link to={`/library/${library._id}`}>{library.location} </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default LibraryList;
