import { WeatherData } from "../App/App";
import "../App/App.css";
import "./weatherInfo.css";

function WeatherInfo({
  weatherProps,
  cityName,
  tempUnits,
}: {
  weatherProps: WeatherData;
  cityName: string;
  tempUnits: string;
}) {
  // return <p>{JSON.stringify(weatherProps)}</p>

  let temp: number = 0;
  let minTemp: number = 0;
  let maxTemp: number = 0;
  let feelsLikeTemp: number = 0;

  if (weatherProps.main) {
    switch (tempUnits) {
      case "C":
        temp = Math.floor(weatherProps.main.temp - 273.15);
        minTemp = Math.floor(weatherProps.main.temp_min - 273.15);
        maxTemp = Math.floor(weatherProps.main.temp_max - 273.15);
        feelsLikeTemp = Math.floor(weatherProps.main.feels_like - 273.15);

        break;
      case "K":
        temp = weatherProps.main.temp;
        minTemp = weatherProps.main.temp_min;
        maxTemp = weatherProps.main.temp_max;
        feelsLikeTemp = weatherProps.main.feels_like;
        break;
      case "F":
        temp = Math.floor(((weatherProps.main.temp - 273.15) * 9) / 5 + 32);
        minTemp = Math.floor(
          ((weatherProps.main.temp_min - 273.15) * 9) / 5 + 32
        );
        maxTemp = Math.floor(
          ((weatherProps.main.temp_max - 273.15) * 9) / 5 + 32
        );
        feelsLikeTemp = Math.floor(
          ((weatherProps.main.feels_like - 273.15) * 9) / 5 + 32
        );
        break;
      default:
        temp = Math.floor(weatherProps.main.temp - 273.15);
        minTemp = Math.floor(weatherProps.main.temp_min - 273.15);
        maxTemp = Math.floor(weatherProps.main.temp_max - 273.15);
        feelsLikeTemp = Math.floor(weatherProps.main.feels_like - 273.15);
    }
  }

  if (weatherProps.main) {
    return (
      <div className="weather-info">
        <h2>{cityName}</h2>
        <div className="gridcontainer">
          <div className="messagebox">
            <div>
              <p>{weatherProps.weather[0].description}</p>
              <p>{weatherProps.weather[0].main}</p>
              <img
                src={`https://openweathermap.org/img/w/${weatherProps.weather[0].icon}.png`}
                alt="icon"
              />
            </div>

            <p>{`Temperature is ${temp} Degrees ${tempUnits}`}</p>

            <p className="message">
              `
              {(temp >= 18 && tempUnits === "C") ||
              (temp >= 291 && tempUnits === "K") ||
              (temp >= 65 && tempUnits === "F")
                ? "Get your shorts on"
                : "Might need a few layers lad"}
              `
            </p>
          </div>
          <div className="messagebox">
            <p>{`Minimum Temperature is ${minTemp} Degrees ${tempUnits}`}</p>
            <p className="message">
              `
              {(minTemp >= 10 && tempUnits === "C") ||
              (minTemp >= 282 && tempUnits === "K") ||
              (minTemp >= 50 && tempUnits === "F")
                ? "Not too cold, get the BBQ out"
                : "Bit chilly out"}
              `
            </p>
          </div>
          <div className="messagebox">
            <p>{`Maximum Temperature is ${maxTemp} Degrees ${tempUnits}`}</p>
            <p className="message">
              `
              {(maxTemp >= 25 && tempUnits === "C") ||
              (maxTemp >= 298 && tempUnits === "K") ||
              (maxTemp >= 77 && tempUnits === "F")
                ? "If you can't take the heat, get out the kitchen"
                : "Won't get that hot"}
              `
            </p>
          </div>
          <div className="messagebox">
            <p>{`Temperature feels like ${feelsLikeTemp} Degrees ${tempUnits}`}</p>
            <p className="message">
              `
              {(feelsLikeTemp >= 18 && tempUnits === "C") ||
              (feelsLikeTemp >= 291 && tempUnits === "K") ||
              (feelsLikeTemp >= 65 && tempUnits === "F")
                ? "This is fine"
                : "Not worth going outside"}
              `
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>No city by that name in database!</p>;
  }
}

export default WeatherInfo;
