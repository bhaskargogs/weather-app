import React from "react";
import "./WeatherInfo.css";

function WeatherInfo(props) {
  const { info } = props;
  return (
    <div>
      <div className="info-title">
        {info.location.name === " " && info.location.sys.country === null
          ? info.location.name + ", " + info.location.sys.country
          : "Unknown"}
      </div>
      <div className="d-flex flex-row mt-2">
        <div className="p2">
          <img
            src={
              "http://openweathermap.org/img/w/" +
              info.location.weather[0].icon +
              ".png"
            }
            alt={info.location.weather[0].icon}
          />
        </div>
        <div className="p2 ml-2">
          <div className="d-flex flex-column">
            <div className="p2">{info.location.weather[0].main}</div>
            <div className="p2">{info.location.weather[0].description}</div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row">
        <div className="p2">
          <div className="d-flex flex-column">
            <div className="p2">
              Temperature:{" "}
              {(Math.round(info.location.main.temp - 273) * 100) / 100.0}C
            </div>
            <div className="p2">
              Feels Like:{" "}
              {(Math.round(info.location.main.feels_like - 273) * 100) / 100.0}C
            </div>
            <div className="p2">
              High:{" "}
              {(Math.round(info.location.main.temp_max - 273) * 100) / 100.0}C
            </div>
            <div className="p2">
              Low:{" "}
              {(Math.round(info.location.main.temp_min - 273) * 100) / 100.0}C
            </div>
            <div className="p2">Pressure:{info.location.main.pressure}</div>
            <div className="p2"> Humidity: {info.location.main.humidity}%</div>
          </div>
        </div>
        <div className="p2">
          <div className="d-flex flex-column">
            <div className="p2 text-center">Wind</div>
            <div className="p2">Speed: {info.location.wind.speed}</div>
            <div className="p2">Degree: {info.location.wind.deg}</div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div className="p2">Sunrise: {info.location.sys.sunrise}</div>
        <div className="p2">Sunset: {info.location.sys.sunset}</div>
      </div>
    </div>
  );
}

export default WeatherInfo;
