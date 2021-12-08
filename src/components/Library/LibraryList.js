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
  const popupRef = useRef();

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

  const createMarker = (library) => {
    new mapboxgl.Marker()
      .setLngLat([library.longitude, library.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          // .setDOMContent(popupRef.current)
          .setHTML(`<h3>${library.location}</h3>`)
      )
      .addTo(map.current);
  };

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
        {props.libraries.map((library, i) => {
          return (
            createMarker(library),
            (
              <div key={i} style={{ display: "none" }}>
                <div ref={popupRef}>
                  <h3>{library.location}</h3>
                  {/* <form onSubmit={createLibraryHandler}>
                  <button type="submit">Add Library</button>
                </form> */}
                </div>
              </div>
            )
          );
        })}
      </div>
    </>
  );
};

export default LibraryList;
