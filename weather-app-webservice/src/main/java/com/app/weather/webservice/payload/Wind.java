package com.app.weather.webservice.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Wind {
    private double speed;
    private double deg;
}