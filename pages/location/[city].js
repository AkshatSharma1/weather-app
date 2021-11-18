//This {name} file helps us to route pages easily
import React from "react";
import Link from "next/link";
import Head from "next/head";
import cities from "../../lib/city.list.json";
import TodaysWeather from "../../components/TodaysWeather";
import HourlyWeather from "../../components/HourlyWeather";
import WeeklyWeather from "../../components/WeeklyWeather";
import SearchBox from "../../components/SearchBox";
import moment from "moment-timezone";


const getCity = (param) => {
  const cityParam = param.trim();
  const formatCity = cityParam.split("-");
  console.log(formatCity);
  //Get id
  const id = formatCity[formatCity.length - 1];

  if (!id) {
    return null;
  }

  const city = cities.find((city) => city.id.toString() == id);

  if (city) {
    return city;
  } else {
    return null;
  }
};

// Get the server side dynamically changing data
export async function getServerSideProps(context) {
  const city = getCity(context.params.city);
  console.log(city);

  //If no city show 404
  if (!city) {
    return {
      notFound: true,
    };
  }

  // console.log(process.env.API_KEY)
  //Make a request to API to get current weather
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&units=metric&exclude=minutely`
  );
  //In this exclude the minutely changing data

  //Data received
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  // console.log(data);

  const urlName = context.params.city;
  const hourlyWeather = getHourlyWeather(data.hourly, data.timezone);

  return {
    props: {
      city: city,
      currentWeather: data.current,
      timezone: data.timezone,
      dailyWeather: data.daily,
      hourlyWeather: hourlyWeather,
    },
  };
}

//Function to get hourly data formatted
const getHourlyWeather = (hourlyData, timezone) => {
  //getting the time data
  const endOfDay = moment().tz(timezone).endOf("day").valueOf();

  const endTimeStamp = Math.floor(endOfDay / 1000);

  //Get present data i.e. get the hour data we need and not the full 48 hr data
  const todayData = hourlyData.filter((data) => data.dt < endTimeStamp);

  return todayData;
};

export default function City({
  currentWeather,
  hourlyWeather,
  dailyWeather,
  city,
  timezone,
}) {
  console.log(hourlyWeather);
  // console.log(weeklyWeather)
  // console.log(currentWeather)
  // console.log(dailyWeather)
  // console.log(city)
  return (
    <div>
      <Head>
        <title>{city.name} Weather Info</title>
      </Head>

      <div className="page-wrapper">
        <div className="pg-container">

          {/* Go back to home link */}
          <Link href="/">
            <a className="back-link">&larr; Home</a>
          </Link>

          <SearchBox placeholder="Search For Another Location . . ." />

          <TodaysWeather
            city={city}
            weather={dailyWeather[0]}
            timezone={timezone}
          />

          <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />

          <WeeklyWeather weeklyWeather={dailyWeather} timezone={timezone} />
        </div>
      </div>
    </div>
  );
}
