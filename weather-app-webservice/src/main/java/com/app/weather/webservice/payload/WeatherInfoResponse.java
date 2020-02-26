package com.app.weather.webservice.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeatherInfoResponse {
    private Long id;
    private float latitude;
    private float longitude;
    private String city;
    private String country;
    private String iconLink;
    private String icon;
    private String info;
    private double temperature;
    private double low;
    private double high;
    private double feels_like;
    private double windSpeed;
    private double windDirection;
    private int cloudiness;
    private Long humidity;
    private Long timezone;
    private Long sunrise;
    private Long sunset;
    private Long date;
}
