package com.app.weather.webservice.service;

import com.app.weather.webservice.entity.Location;
import com.app.weather.webservice.payload.WeatherResponse;
import org.springframework.web.client.RestClientException;

import java.io.IOException;
import java.util.List;

public interface LocationService {
    List<Float> generateLatitudes(int num) throws IOException;
    List<Float> generateLongitudes(int num) throws IOException;
    List<Location> getLocations(int num) throws IOException;
    WeatherResponse getWeather(float lat, float lon) throws RestClientException;
    List<WeatherResponse> setIdsAndReturn(List<WeatherResponse> weatherReport, int num) throws IOException;
}
