import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useDispatch } from "react-redux";
import { createLibrary } from "../../store/librarySlice";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const LibraryNewForm = () => {
  const dispatch = useDispatch();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const popupRef = useRef();
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  let result = useRef();

  const createLibraryHandler = (e) => {
    e.preventDefault();
    dispatch(
      createLibrary({
        longitude: result.current.center[0],
        latitude: result.current.center[1],
        location: result.current.place_name,
      })
    );
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
    });

    geocoder.on("result", (e) => {
      console.log(e.result.center);
      console.log(e.result);

      result.current = e.result;

      const popup = new mapboxgl.Popup({ offset: 25 }) // add popups
        .setDOMContent(popupRef.current);
      // .setHTML(`<h3>${e.result.place_name}</h3>
      //  <form onSubmit={createLibraryHandler(e.result)}>
      //   <button type="submit">Add Library</button>
      // </form> `);

      new mapboxgl.Marker()
        .setLngLat(e.result.center)
        .setPopup(popup)
        .addTo(map.current);

      popup.addTo(map.current);
    });

    map.current.addControl(geocoder);
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
    <div>
      <div ref={mapContainer} className="map-container" />
      <div style={{ display: "none" }}>
        <div ref={popupRef}>
          <h3>{result?.current?.place_name}</h3>
          {/* <form onSubmit={createLibraryHandler(result?.current)}> */}
          <form onSubmit={createLibraryHandler}>
            <button type="submit">Add Library</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LibraryNewForm;
