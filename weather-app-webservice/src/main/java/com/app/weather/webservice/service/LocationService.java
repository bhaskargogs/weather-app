package com.app.weather.webservice.service;

import com.app.weather.webservice.entity.Location;

import java.io.IOException;
import java.util.List;

public interface LocationService {
    List<Double> generateLatitudes(int num) throws IOException;
    List<Double> generateLongitudes(int num) throws IOException;
    List<Location> getLocations(int num) throws IOException;
}
