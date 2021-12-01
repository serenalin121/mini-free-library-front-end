import React from "react";

const LibraryList = (props) => {
  return (
    <ul>
      {props.libraries.map((library, i) => {
        return <li key={i}>{library.location} </li>;
      })}
    </ul>
  );
};

export default LibraryList;
