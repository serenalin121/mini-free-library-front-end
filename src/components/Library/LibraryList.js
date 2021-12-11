import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const LibraryList = (props) => {
  console.log(props.libraries);
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [lng, setLng] = useState(-95.6917);
  const [lat, setLat] = useState(38.6699);
  const [zoom, setZoom] = useState(4);
  const popupRef = useRef();
  const [selectedLibraryLocation, setSelectedLibraryLocation] = useState();
  const [selectedLibraryId, setSelectedLibraryId] = useState();
  // const [markers, setMarkers] = useState([]);
  const markers = useRef([]);

  useEffect(() => {
    if (map) return; // initialize map only once
    setMap(
      new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
      })
    );
  }, [map, lng, lat, zoom]);

  useEffect(() => {
    if (!map) return; // wait for map to initialize
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
  });

  const createMarker = useCallback(
    (library) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([library.longitude, library.latitude])
        // .setPopup(
        // new mapboxgl.Popup({ offset: 25 }) // add popups
        // .setDOMContent(popupRef.current)
        // .setHTML(`<h3>${library.location}</h3>`)
        // )
        .addTo(map);

      marker.getElement().addEventListener("click", () => {
        setSelectedLibraryLocation(library.location);
        setSelectedLibraryId(library._id);

        const popup = new mapboxgl.Popup({ offset: 25 }) // add popups
          .setDOMContent(popupRef.current);

        marker.setPopup(popup);
      });

      return marker;
    },
    [map]
  );

  useEffect(() => {
    if (!map) return;
    if (markers.current.length > 0) {
      markers.current.forEach((marker) => marker.remove());
    }
    markers.current = props.libraries.map((library) => createMarker(library));
  }, [props.libraries, createMarker, map]);

  // const createMarker = (library) => {
  //   const marker = new mapboxgl.Marker()
  //     .setLngLat([library.longitude, library.latitude])
  //     // .setPopup(
  //     // new mapboxgl.Popup({ offset: 25 }) // add popups
  //     // .setDOMContent(popupRef.current)
  //     // .setHTML(`<h3>${library.location}</h3>`)
  //     // )
  //     .addTo(map);

  //   marker.getElement().addEventListener("click", () => {
  //     setSelectedLibraryLocation(library.location);
  //     setSelectedLibraryId(library._id);

  //     const popup = new mapboxgl.Popup({ offset: 25 }) // add popups
  //       .setDOMContent(popupRef.current);

  //     marker.setPopup(popup);
  //   });
  // };

  return (
    <>
      <ul>
        {props.libraries?.map((library, i) => {
          return (
            <li key={i}>
              <Link to={`/library/${library._id}`}>{library.location} </Link>
            </li>
          );
        })}
      </ul>
      <div>
        <div ref={mapContainer} className="map-container" />
        {/* {map &&
          props.libraries.map((library, i) => {
            return createMarker(library);
          })} */}
        <div style={{ display: "none" }}>
          <div ref={popupRef}>
            <h3>{selectedLibraryLocation}</h3>
            <Link to={`/library/${selectedLibraryId}`}>Check Library </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LibraryList;
