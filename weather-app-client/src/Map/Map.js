import React, { useState } from "react";
import MapGL, { Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import Markers from "../Markers/Markers";
import WeatherInfo from "./WeatherInfo/WeatherInfo";

function Map(props) {
  const [viewport, setViewport] = useState({
    latitude: props.lat,
    longitude: props.lon,
    width: "100vw",
    height: "100vh",
    zoom: 2.9
  });

  const [popupInfo, setPopupInfo] = useState(null);

  const onClickMarker = location => {
    setPopupInfo({ location });
  };

  const renderPopup = () => {
    return (
      popupInfo && (
        <Popup
          className="popup-style"
          tipSize={5}
          anchor="top"
          longitude={popupInfo.location.longitude}
          latitude={popupInfo.location.latitude}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
        >
          <WeatherInfo info={popupInfo.location} />
        </Popup>
      )
    );
  };

  return (
    <React.Fragment>
      <MapGL
        {...viewport}
        onViewportChange={setViewport}
        mapStyle="mapbox://styles/sbrueck/ck5u5v1bt184i1il6mpii6l4r"
        mapboxApiAccessToken="pk.eyJ1Ijoic2JydWVjayIsImEiOiJjazV1NDQ4OWUwZnNyM2trMDVrNXowMTUwIn0.MEdrm_Mg3JXVefmWtVuaoA"
      >
        <Markers data={props.locations} onClick={onClickMarker} />
        {renderPopup()}
      </MapGL>
    </React.Fragment>
  );
}

export default Map;
