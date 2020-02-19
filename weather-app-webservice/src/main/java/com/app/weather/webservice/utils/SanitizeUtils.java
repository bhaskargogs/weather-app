package com.app.weather.webservice.utils;

import com.app.weather.webservice.payload.WeatherInfoResponse;
import com.app.weather.webservice.payload.rest.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;

import javax.inject.Named;

@Named
public class SanitizeUtils {

    @Value("${link.map.weather.icon}")
    private String iconLink;

    private double convertToCelsius(double temp) {
        return Math.floor(temp - 273.15);
    }

    public WeatherInfoResponse sanitizeResponse(WeatherResponse response) {
        WeatherInfoResponse weatherInfo = new WeatherInfoResponse();
        weatherInfo.setId(response.getId());
        weatherInfo.setCity(response.getName());
        weatherInfo.setCountry(response.getSys().getCountry());
        weatherInfo.setLatitude(response.getCoord().getLat());
        weatherInfo.setLongitude(response.getCoord().getLon());
        weatherInfo.setInfo(response.getWeather().get(0).getMain());
        weatherInfo.setInfoDetails(response.getWeather().get(0).getDescription());
        weatherInfo.setIconLink(new StringBuilder().append(iconLink).append(response.getWeather().get(0).getIcon()).append(".png").toString());
        weatherInfo.setIcon(response.getWeather().get(0).getIcon());
        weatherInfo.setTemperature(convertToCelsius(response.getMain().getTemp()));
        weatherInfo.setLow(convertToCelsius(response.getMain().getTemp_min()));
        weatherInfo.setHigh(convertToCelsius(response.getMain().getTemp_max()));
        weatherInfo.setFeels_like(convertToCelsius(response.getMain().getFeels_like()));
        weatherInfo.setWindSpeed(response.getWind().getSpeed());
        weatherInfo.setWindDirection(response.getWind().getDeg());
        weatherInfo.setCloudiness(response.getClouds().getAll());
        weatherInfo.setPressure(response.getMain().getPressure());
        weatherInfo.setHumidity(response.getMain().getHumidity());
        weatherInfo.setTimezone(response.getTimezone());
        weatherInfo.setSunrise(response.getSys().getSunrise());
        weatherInfo.setSunset(response.getSys().getSunset());
        return weatherInfo;
    }
}
