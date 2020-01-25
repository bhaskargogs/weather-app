package com.app.weather.webservice.payload;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class WeatherInfo {
    private Long id;
    private int type;
    private double message;
    private String country;
    private Instant sunrise;
    private Instant sunset;
}
