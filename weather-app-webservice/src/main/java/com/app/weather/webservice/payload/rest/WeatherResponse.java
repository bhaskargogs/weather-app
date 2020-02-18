package com.app.weather.webservice.payload.rest;

import com.app.weather.webservice.entity.Location;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WeatherResponse {
    private Long id;
    private String name;
    private Long cod;
    private Location coord;
    private List<WeatherData> weather;
    private String base;
    private Temperature main;
    private Wind wind;
    private Clouds clouds;
    private Long dt;
    private Long timezone;
    private WeatherInfo sys;
}
