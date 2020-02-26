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
        {info.city === "" && info.country === null
          ? "Unknown"
          : info.city + ", " + info.country}
      </div>
      <div className="d-flex flex-row mt-2">
        <div className="p2">
          <img src={info.iconLink} alt={info.icon} />
        </div>
        <div className="p2 ml-2">
          <div className="d-flex flex-column">
            <div className="p2">{info.info}</div>
            <div className="p2">{info.infoDetails}</div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row">
        <div className="p2">
          <div className="d-flex flex-column">
            <div className="p2">
              Temperature:{info.temperature} &deg;
            </div>
            <div className="p2">
              Feels Like: {info.feels_like} &deg;
            </div>
            <div className="p2">High: {info.high}&deg;</div>
            <div className="p2">Low: {info.low}&deg;</div>
            <div className="p2"> Humidity: {info.humidity}%</div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div className="p2">
          Sunrise: {getTime(info.sunrise, info.timezone)}
        </div>
        <div className="p2">
          Sunset: {getTime(info.sunset, info.timezone)}
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;
