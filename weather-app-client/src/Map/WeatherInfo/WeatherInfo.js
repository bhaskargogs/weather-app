import React from "react";
import "./WeatherInfo.css";
import moment from "moment";
import {
  ZonedDateTime,
  ZoneId,
  Instant,
  DateTimeFormatter
} from "@js-joda/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleUp, faAngleDown, faSun, faCloud, faWind, faRandom} from '@fortawesome/free-solid-svg-icons';

function WeatherInfo(props) {
  const { info } = props;

  const getTimeZone = (zone) => {
    let timezone = moment(zone * 1000).utc();
    let utc = moment(0).utc();
    let duration = moment.duration(timezone.diff(utc));
    let hours =
      duration.hours() >= 0
        ? "+" +
          duration.hours().toLocaleString("en", { minimumIntegerDigits: 2 })
        : duration.hours().toLocaleString("en", { minimumIntegerDigits: 2 });

    let minutes = Math.abs(duration.minutes());
    return hours + ":" + minutes.toLocaleString("en", { minimumIntegerDigits: 2 });
  }

  const getTime = (time, zone) => {
    return ZonedDateTime.ofInstant(
      Instant.ofEpochMilli(time * 1000),
      ZoneId.of("UTC" + getTimeZone(zone))
    ).format(DateTimeFormatter.ofPattern("HH:mm"));
  };

  const getDate = (time, zone) => {
    const date = ZonedDateTime.ofInstant(Instant.ofEpochMilli(time * 1000),ZoneId.of("UTC" + getTimeZone(zone)));
    return date.dayOfMonth() + " " + date.month().toString().substr(0,3) + " " + date.year();
  }

  return (
    <div>
      <div className="d-flex flex-row justify-content-around title">
          <div className="d-flex flex-column info-title">        
          {info.city === "" && info.country === null
            ? ""
            : info.city.toUpperCase() + ", " + info.country.toUpperCase()}
          </div>
          <div className="d-flex flex-column"> {getDate(info.date, info.timezone)} </div>
      </div>
      <div>
        <div className="d-flex flex-row justify-content-around content">
          <div className="d-flex flex-column p-2">
            <div className="d-flex content-info justify-content-around">Humidity {info.humidity}%</div>
            <div className="d-flex flex-row justify-content-center p-1">
              <div className="d-flex flex-column pl-1"><FontAwesomeIcon icon={faAngleUp} /></div>
              <div className="d-flex flex-column pl-1">{info.high}&deg;</div>
              <div className="d-flex flex-column pl-1"><FontAwesomeIcon icon={faAngleDown} /></div>
              <div className="d-flex flex-column pl-1">{info.low}&deg;</div>  
            </div>
            <div className="d-flex flex-row">
              <div className="d-flex flex-column temp-font">{info.temperature}&deg;</div>
              <div className="d-flex flex-column feels-font"> Feels like {info.feels_like}&deg;</div>
            </div>
            <div className="d-flex flex-row justify-content-center p-1">
              <div className="d-flex flex-column p-1">{getTime(info.sunrise, info.timezone)}</div>
              <div className="d-flex flex-column p-1"><FontAwesomeIcon className="weather-icon" icon={faSun} /></div>
              <div className="d-flex flex-column p-1">{getTime(info.sunset, info.timezone)}</div>
            </div>
            <div className="d-flex flex-row justify-content-center p-1">
              <div className="d-flex flex-column pl-1"><FontAwesomeIcon className="weather-icon" icon={faWind} /></div>
              <div className="d-flex flex-column pl-1">{info.windSpeed}</div>
              <div className="d-flex flex-column pl-1"><FontAwesomeIcon className="weather-icon" icon={faRandom} /></div>
              <div className="d-flex flex-column pl-1">{info.windDirection}</div>
              <div className="d-flex flex-column pl-1"><FontAwesomeIcon className="weather-icon" icon={faCloud}/></div>
              <div className="d-flex flex-column pl-1">{info.cloudiness}</div>
            </div>
          </div>
          <div className="d-flex flex-column p-2">
            <div className="d-flex"><img className="img-info" src={info.iconLink} alt={info.icon} /></div> 
            <div className="d-flex justify-content-center weather-details">{info.info}</div>
          </div>
        </div>
      </div>
      {/* <div className="d-flex flex-row mt-2">
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
      </div> */}
    </div>
  );
}

export default WeatherInfo;
