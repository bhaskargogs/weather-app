import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import { Marker } from "react-map-gl";
import "./Markers.css";



function Markers(props) {
  const { data, onClick } = props;
  return data.map(location => (
    <Marker
      key={location.id}
      latitude={location.latitude}
      longitude={location.longitude}
    >
      <img
        className="location-img"
        src={location.iconLink}
        alt={location.icon}
        onClick={() => onClick(location)}
      ></img>
      
    </Marker>
  ));
}
export default Markers;
