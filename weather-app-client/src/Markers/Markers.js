import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Marker } from "react-map-gl";

function Markers(props) {
  const { data } = props;
  // return (
  // <div>{console.log(data)}</div>
  // );
  return data.map(location => 
    <Marker
      key={location.id}
      latitude={location.coord.lat}
      longitude={location.coord.lon}
    >
      <img
        src={location.weather[0].icon + ".png"}
        alt={location.weather[0].icon}
      />
    </Marker>
  )
}
export default Markers;
