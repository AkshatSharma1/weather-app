import React from "react";
import moment from "moment-timezone";
import Image from "next/image";

export default function TodaysWeather({ city, weather, timezone }) {
  console.log(city);
  console.log(weather);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="today">
      <div  className={`${weather.weather[0].main == "Clouds" ? "today__clouds" : "today"}`}>
        <div className="today__inner">
          <div className="today__left-content">
            <h1>
              {city.name} ({city.country})
            </h1>

            <h2>
              <span>{Math.floor(weather.temp.max)}&deg;C</span>
              <span>{Math.floor(weather.temp.min)}&deg;C</span>
            </h2>

            <h4 id="real">
              RealFeel&reg; {Math.floor(weather.feels_like.day)}&deg;C{" "}
            </h4>

            <div className="today__sun-times">
              <div>
                <span>Sunrise</span>
                <span>
                  {moment.unix(weather.sunrise).tz(timezone).format("LT")}
                </span>
              </div>

              <div>
                <span>Sunset</span>
                <span>
                  {moment.unix(weather.sunset).tz(timezone).format("LT")}
                </span>
              </div>
            </div>
          </div>

          <div className="today__right-content">
            <div className="today__icon-wrapper">
              <div>
                {/* Icon */}
                <Image
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather icon"
                  layout="fill"
                />
                {/*  */}
              </div>
            </div>
            <h3>
              {/* Weather info */}
              {capitalizeFirstLetter(weather.weather[0].description)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
