package com.app.weather.webservice.controller;

import com.app.weather.webservice.entity.Location;
import com.app.weather.webservice.payload.WeatherInfoResponse;
import com.app.weather.webservice.service.LocationService;
import com.app.weather.webservice.utils.HTTPUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/weather")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @Autowired
    private HTTPUtils utils;

    @GetMapping("/getLocations/{num}")
    public List<Location> getLocations(@PathVariable("num") int num) throws IOException {
        return locationService.getLocations(num);
    }

    @GetMapping("/getWeather")
    public WeatherInfoResponse getWeather(@PathParam("lat") float lat, @PathParam("lon") float lon) {
        return locationService.getWeather(lat, lon);
    }

    @GetMapping("/getWeatherData/{num}")
    public List<WeatherInfoResponse> getWeatherData(@PathVariable("num") int num) throws IOException {
        List<Location> locations = getLocations(num);
        List<WeatherInfoResponse> weatherReport = locations.stream()
                .map(location -> getWeather(location.getLat(), location.getLon()))
                .collect(Collectors.toList());
        return locationService.setIdsAndReturn(weatherReport, num);
    }

}
