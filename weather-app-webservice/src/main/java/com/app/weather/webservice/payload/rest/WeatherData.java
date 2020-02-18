package com.app.weather.webservice.payload.rest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeatherData {
    private Long id;
    private String main;
    private String description;
    private String icon;
}
