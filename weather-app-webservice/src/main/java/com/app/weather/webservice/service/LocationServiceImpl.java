package com.app.weather.webservice.service;

import com.app.weather.webservice.entity.Location;
import com.app.weather.webservice.payload.WeatherInfoResponse;
import com.app.weather.webservice.payload.rest.WeatherResponse;
import com.app.weather.webservice.repository.LocationRepository;
import com.app.weather.webservice.utils.HTTPUtils;
import com.app.weather.webservice.utils.SanitizeUtils;
import com.google.common.collect.Streams;
import one.util.streamex.EntryStream;
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
import java.util.stream.IntStream;

@Service
public class LocationServiceImpl implements LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Inject
    private HTTPUtils restUtils;

    @Inject
    private SanitizeUtils utils;

    @Value("${api.map.weather.data}")
    private String weatherApi;

    @Value("${api.map.weather.key}")
    private String apiKey;

    @Override
    public List<Float> generateLatitudes(int num) throws IOException {
        return restUtils.combineDoubles(num, -90, 90);
    }

    @Override
    public List<Float> generateLongitudes(int num) throws IOException {
        return restUtils.combineDoubles(num, -180, 180);
    }

    @Override
    public List<Location> getLocations(int num) throws IOException {
        return Streams.zip(generateLatitudes(num).stream(),
                generateLongitudes(num).stream(), (lat, lon) -> new Location(lat, lon))
                .collect(Collectors.toList());
    }

    @Override
    public WeatherInfoResponse getWeather(float lat, float lon) throws RestClientException {
        ResponseEntity<WeatherResponse> response = null;
        WeatherInfoResponse info = null;
        try {
            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(weatherApi)
                    .queryParam("lat", lat)
                    .queryParam("lon", lon)
                    .queryParam("appid", apiKey);
            response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET,
                    null,
                    WeatherResponse.class);
            info = utils.sanitizeResponse(response.getBody());
        } catch (RestClientException ex) {
            throw new RestClientException(ex.getMessage());
        }
        return info;
    }

    @Override
    public List<WeatherInfoResponse> setIdsAndReturn(List<WeatherInfoResponse> weatherReport, int num) throws IOException {
        List<Long> ids = IntStream.range(0, num).mapToLong(index -> (long) index)
                .boxed().collect(Collectors.toList());
        List<Long> emptyIdList = weatherReport.stream().map(weatherResponse -> weatherResponse.getId())
                .collect(Collectors.toList());
        List<Long> idList = Streams.zip(emptyIdList.stream(), ids.stream(),
                (val1, val2) -> val1 + val2).collect(Collectors.toList());
        return EntryStream.of(weatherReport)
                .filterKeyValue((index, weatherResponse) -> {
                    weatherResponse.setId(idList.get(index));
                    return index == index;
                })
                .values()
                .collect(Collectors.toList());
    }
}
