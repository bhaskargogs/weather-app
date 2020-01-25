package com.app.weather.webservice.payload;

import com.app.weather.webservice.entity.Location;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeatherResponse {
    private Location coord;

}
