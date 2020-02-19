import React from "react";
import "./WeatherInfo.css";
import moment from "moment";
import {
  ZonedDateTime,
  ZoneId,
  Instant,
  DateTimeFormatter
} from "@js-joda/core";

function WeatherInfo(props) {
  const { info } = props;

  const getTime = (time, zone) => {
    let timezone = moment(zone * 1000).utc();
    let utc = moment(0).utc();
    let duration = moment.duration(timezone.diff(utc));
    let hours =
      duration.hours() >= 0
        ? "+" +
          duration.hours().toLocaleString("en", { minimumIntegerDigits: 2 })
        : duration.hours().toLocaleString("en", { minimumIntegerDigits: 2 });

    let minutes = Math.abs(duration.minutes());
    let zoneString =
      hours + ":" + minutes.toLocaleString("en", { minimumIntegerDigits: 2 });
    return ZonedDateTime.ofInstant(
      Instant.ofEpochMilli(time * 1000),
      ZoneId.of("UTC" + zoneString)
    ).format(DateTimeFormatter.ofPattern("M/d/yyyy HH:mm"));
  };

  return (
    <div>
      <div className="info-title">
        {info.location.city === "" && info.location.country === null
          ? "Unknown"
          : info.location.city + ", " + info.location.country}
      </div>
      <div className="d-flex flex-row mt-2">
        <div className="p2">
          <img src={info.location.iconLink} alt={info.location.icon} />
        </div>
        <div className="p2 ml-2">
          <div className="d-flex flex-column">
            <div className="p2">{info.location.info}</div>
            <div className="p2">{info.location.infoDetails}</div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row">
        <div className="p2">
          <div className="d-flex flex-column">
            <div className="p2">
              Temperature:{info.location.temperature} &deg;
            </div>
            <div className="p2">
              Feels Like: {info.location.feels_like} &deg;
            </div>
            <div className="p2">High: {info.location.high}&deg;</div>
            <div className="p2">Low: {info.location.low}&deg;</div>
            <div className="p2"> Humidity: {info.location.humidity}%</div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div className="p2">
          Sunrise: {getTime(info.location.sunrise, info.location.timezone)}
        </div>
        <div className="p2">
          Sunset: {getTime(info.location.sunset, info.location.timezone)}
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;
