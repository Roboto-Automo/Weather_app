import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import InputForm from "../InputForm/InputForm";

export type WeatherData = {
 
     weather: {
      description: string;
      icon: string;
      id: number;
      main: string;
    }[];
  

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
};

function App() {
  const [cityName, setCityName] = useState("London");
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>();
  const [tempUnits, setTempUnits] = useState<string>("C");

  function handleChangeUnits(unit: string) {
    setTempUnits(unit);
  }
  //call Api by CityName
  useEffect(() => {
    async function fetchWeatherData() {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=21877be773e7e74ecb9c636562b1b492`
      );
      const data = await response.json();
      setWeatherData(data);
    }
    fetchWeatherData();
  }, [cityName]);

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  return (
    <div className="App">
      <h1>Weather Or Not...</h1>
      <InputForm
        setCityName={setCityName}
        handleChangeUnits={handleChangeUnits}
      />
      {weatherData && (
        <WeatherInfo
          weatherProps={weatherData}
          cityName={cityName}
          tempUnits={tempUnits}
        />
      )}
    </div>
  );
}

export default App;
