package com.app.weather.webservice.service;

import com.app.weather.webservice.entity.Location;
import com.app.weather.webservice.repository.LocationRepository;
import com.app.weather.webservice.utils.HTTPUtils;
import com.google.common.collect.Streams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationServiceImpl implements LocationService {

    @Autowired
    private LocationRepository locationRepository;


    @Inject
    private HTTPUtils utils;

    @Value("${api.weathermap.data}")
    private String weatherApi;

    @Value("${api.weathermap.key}")
    private String apiKey;

    @Override
    public List<Double> generateLatitudes(int num) throws IOException {
        return utils.combineDoubles(num, -90, 90);
    }

    @Override
    public List<Double> generateLongitudes(int num) throws IOException {
        return utils.combineDoubles(num, -180, 180);
    }

    @Override
    public List<Location> getLocations(int num) throws IOException {
        return Streams.zip(generateLatitudes(num).stream(),
                generateLongitudes(num).stream(), (lat, lon) -> new Location(lat, lon))
                .collect(Collectors.toList());
    }
}
