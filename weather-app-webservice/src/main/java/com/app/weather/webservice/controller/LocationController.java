package com.app.weather.webservice.controller;

import com.app.weather.webservice.entity.Location;
import com.app.weather.webservice.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/weather")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping("/getLocations/{num}")
    public List<Location> getLocations(@PathVariable("num") int num) throws IOException {
        return locationService.getLocations(num);
    }


}
