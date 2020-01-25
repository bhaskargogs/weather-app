package com.app.weather.webservice.service;

import com.app.weather.webservice.entity.Location;
import com.app.weather.webservice.payload.WeatherResponse;
import com.app.weather.webservice.repository.LocationRepository;
import com.app.weather.webservice.utils.HTTPUtils;
import com.google.common.collect.Streams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.inject.Inject;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationServiceImpl implements LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Inject
    private HTTPUtils utils;

    @Value("${api.weathermap.data}")
    private String weatherApi;

    @Value("${api.weathermap.key}")
    private String apiKey;

    @Override
    public List<Float> generateLatitudes(int num) throws IOException {
        return utils.combineDoubles(num, -90, 90);
    }

    @Override
    public List<Float> generateLongitudes(int num) throws IOException {
        return utils.combineDoubles(num, -180, 180);
    }

    @Override
    public List<Location> getLocations(int num) throws IOException {
        return Streams.zip(generateLatitudes(num).stream(),
                generateLongitudes(num).stream(), (lat, lon) -> new Location(lat, lon))
                .collect(Collectors.toList());
    }

    @Override
    public WeatherResponse getWeather(float lat, float lon) throws RestClientException {
        ResponseEntity<WeatherResponse> response = null;
        try {
            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(weatherApi)
                    .queryParam("lat", lat)
                    .queryParam("lon", lon)
                    .queryParam("appid", apiKey);
            response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET,
                    null,
                    WeatherResponse.class);
        } catch (RestClientException ex) {
            throw new RestClientException(ex.getMessage());
        }
        return response.getBody();
    }
}
