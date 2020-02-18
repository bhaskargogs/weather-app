package com.app.weather.webservice.service;

import com.app.weather.webservice.entity.Location;
import com.app.weather.webservice.payload.WeatherInfoResponse;
import org.springframework.web.client.RestClientException;

import java.io.IOException;
import java.util.List;

public interface LocationService {
    List<Float> generateLatitudes(int num) throws IOException;
    List<Float> generateLongitudes(int num) throws IOException;
    List<Location> getLocations(int num) throws IOException;
    WeatherInfoResponse getWeather(float lat, float lon) throws RestClientException;
    List<WeatherInfoResponse> setIdsAndReturn(List<WeatherInfoResponse> weatherReport, int num) throws IOException;
}
