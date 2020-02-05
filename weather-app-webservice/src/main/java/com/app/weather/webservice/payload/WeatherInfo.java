package com.app.weather.webservice.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeatherInfo {
    private Long id;
    private int type;
    private double message;
    private String country;
    private Long sunrise;
    private Long sunset;
}
