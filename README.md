# weather-app
A Simple Weather Application to get weather of different places based on random latitude and longitude

# Requirements
1. Java 8
2. Maven 3
3. NodeJS (12 or 13)
4. npm
5. `create-react-app`
6. `yarn`

# Installation of `create-react-app` and `yarn`

1. **Start terminal or command prompt after installing NodeJS (npm comes within it)**
```bash
npm install -g create-react-app
npm install -g yarn
```

And that's it. `create-react-app` and `yarn` are installed. You are ready to run the app.

# Project
**The project has 2 parts:**

1. **weather-app-client**
2. **weather-app-webservice**

## Weather-app-webservice

Weather app webservice is a back end simple Spring Boot service to get weather data based on random latitudes and longitudes served.

**Steps to follow**

1. **Clone the project:**
```bash
git clone https://github.com/bhaskargogs/weather-app.git
cd weather-app/weather-app-webservice
```

2. **Clean/Build project**(Optional)
```bash
mvn clean install
```

3. **Run the backend project**
```bash
mvn spring-boot:run
```

Project is run on port 8043

Go to `http://localhost:8043/api/weather/getWeatherData/10` to get the data required

## Weather-app-client

Weather app Client is a Front end simple React app to display data of randomly generated latitudes and longitudes.

**Steps to follow**

1. **Open the Command prompt/terminal and go to folder**
```bash
cd weather-app/weather-app-client
```

2. **Install dependencies**
```bash
yarn install
```

3. **Start the project**
```bash
yarn start
```
And the front end app is running on port 3000.

You can check it out at `http://localhost:3000`

That's it. The `weather-app` is running.
