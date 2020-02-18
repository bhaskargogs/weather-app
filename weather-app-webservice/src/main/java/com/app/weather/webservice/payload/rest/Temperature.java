package com.app.weather.webservice.payload.rest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Temperature {
    private double temp;
    private double feels_like;
    private double temp_max;
    private double temp_min;
    private Long pressure;
    private Long humidity;
}
