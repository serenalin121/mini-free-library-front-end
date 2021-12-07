import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
const LibraryList = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-103.5917);
  const [lat, setLat] = useState(40.6699);
  const [zoom, setZoom] = useState(3);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <>
      <ul>
        {props.libraries.map((library, i) => {
          return (
            <li key={i}>
              <Link to={`/library/${library._id}`}>{library.location} </Link>
            </li>
          );
        })}
      </ul>
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  );
};

export default LibraryList;
