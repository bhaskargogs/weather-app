import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import { Marker } from "react-map-gl";
import "./Markers.css";



function Markers(props) {
  const { data, onClick } = props;
  return data.map(location => (
    <Marker
      key={location.id}
      latitude={location.coord.lat}
      longitude={location.coord.lon}
    >
      <img
        className="location-img"
        src={
          "http://openweathermap.org/img/w/" + location.weather[0].icon + ".png"
        }
        alt={location.weather[0].icon}
        onClick={() => onClick(location)}
      ></img>
      
    </Marker>
  ));
}
export default Markers;
