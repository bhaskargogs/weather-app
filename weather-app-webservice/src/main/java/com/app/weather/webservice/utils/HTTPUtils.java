package com.app.weather.webservice.utils;

import com.google.common.collect.Streams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.util.UriComponentsBuilder;

import javax.inject.Named;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Named
public class HTTPUtils {


    @Value("${api.random}")
    private String randomApi;

    public List<String> get(String urlString) throws IOException {
        HttpURLConnection connection;
        BufferedReader reader = null;
        List<String> strings = new ArrayList<>();
        try {
            URL url = new URL(urlString);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line = "";
            while ((line = reader.readLine()) != null) {
                strings.add(line);
            }
        } finally {
            if (reader != null) {
                reader.close();
            }
        }
        return strings;
    }

    private List<Float> getIntegers(int num, int min, int max) throws IOException {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(randomApi + "integers/")
                .queryParam("num", num)
                .queryParam("min", min)
                .queryParam("max", max)
                .queryParam("col", 1)
                .queryParam("base", 10)
                .queryParam("rnd", "new")
                .queryParam("format", "plain");
        return get(builder.toUriString())
                .stream().map(Float::parseFloat).collect(Collectors.toList());
    }

    private List<Float> getFractions(int num) throws IOException {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(randomApi + "decimal-fractions/")
                .queryParam("num", num)
                .queryParam("dec", 2)
                .queryParam("col", 1)
                .queryParam("rnd", "new")
                .queryParam("format", "plain");
        return get(builder.toUriString())
                .stream().map(Float::parseFloat).collect(Collectors.toList());
    }

    public List<Float> combineDoubles(int num, int min, int max) throws IOException {
        return Streams.zip(getIntegers(num, min, max).stream(),
                getFractions(num).stream(),
                (d1, d2) -> d1 + d2)
                .collect(Collectors.toList());
    }

}
