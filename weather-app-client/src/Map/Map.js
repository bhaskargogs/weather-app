import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "../Markers/Markers";

function Map(props) {
  const [viewport, setViewport] = useState({
    latitude: props.lat,
    longitude: props.lon,
    width: "100vw",
    height: "100vh",
    zoom: 3
  });

  return (
    <React.Fragment>
      <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        mapStyle="mapbox://styles/sbrueck/ck5u5v1bt184i1il6mpii6l4r"
        mapboxApiAccessToken="pk.eyJ1Ijoic2JydWVjayIsImEiOiJjazV1NDQ4OWUwZnNyM2trMDVrNXowMTUwIn0.MEdrm_Mg3JXVefmWtVuaoA"
      >
        <Markers data={props.locations} />
      </ReactMapGL>
    </React.Fragment>
  );
}
export default Map;
