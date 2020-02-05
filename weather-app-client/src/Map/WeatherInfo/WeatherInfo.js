import { Instant, LocalDateTime } from '@js-joda/core';
import React from "react";
import "./WeatherInfo.css";

function WeatherInfo(props) {
  const { info } = props;

  const calcCelcius = (temp) => {
    return Math.floor(temp - 273.15);
  }

  const getTime = (time) => {
    const date = LocalDateTime.ofInstant(Instant.ofEpochMilli(time * 1000)); 
    return date.hour() + ":" + String(date.minute()).substr(-2);
  }

  return (
    <div>
      <div className="info-title">
        {(info.location.name === "" && info.location.sys.country === null)
          ? "Unknown"
          : (info.location.name + ", " + info.location.sys.country)}
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
              Temperature:{calcCelcius(info.location.main.temp)} &deg;
            </div>
            <div className="p2">
              Feels Like: {calcCelcius(info.location.main.feels_like)} &deg;
            </div>
            <div className="p2">
              High: {calcCelcius(info.location.main.temp_max)}&deg;
            </div>
            <div className="p2">
              Low: {calcCelcius(info.location.main.temp_min)}&deg;
            </div>
            <div className="p2"> Humidity: {info.location.main.humidity}%</div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div className="p2">Sunrise: {getTime(info.location.sys.sunrise)}</div>
        <div className="p2">Sunset: {getTime(info.location.sys.sunset)}</div>
      </div>
    </div>
  );
}

export default WeatherInfo;
