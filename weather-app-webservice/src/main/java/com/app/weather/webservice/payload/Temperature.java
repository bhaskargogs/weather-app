package com.app.weather.webservice.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Temperature {
    private float temp;
    private float feels_like;
    private float temp_max;
    private float temp_min;
    private Long pressure;
    private Long humidity;
}
