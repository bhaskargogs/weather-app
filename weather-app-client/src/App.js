/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import "./App.css";
import Map from "./Map/Map";
import "mapbox-gl/dist/mapbox-gl.css";

class App extends Component {
  state = {
    isLoading: true,
    lat: null,
    lon: null,
    locations: null,
    error: null
  };

  componentDidMount() {
    this.getRandomCoords();
  }

  getRandomCoords = () => {
    fetch("http://127.0.0.1:8043/api/weather/getWeatherData/10")
      .then(response => response.json())
      .then(locations => {
        this.setState({
          isLoading: false,
          lat: locations[0].coord.lat,
          lon: locations[0].coord.lon,
          locations: locations
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  };

  render() {
    const { error, isLoading, lat, lon, locations } = this.state;
    return (
      <div className="App">
        {error ? <p> {error.message} </p> : null}
        {!isLoading ? (
          <div className="App">
            <div id="map" className="map pad2">
              <Map lat={lat} lon={lon} isLoading={isLoading} locations={locations} />
            </div>
          </div>
        ) : (
          <h3>Loading ...</h3>
        )}
      </div>
    );
  }
}

export default App;
