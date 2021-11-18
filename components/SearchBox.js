import React from "react";
import cities from "../lib/city.list.json";
import Link from "next/link";
import Router from 'next/router';

export default function SearchBox({placeholder}) {
  //State default state and getting state as inputed
  const [data, setData] = React.useState("");
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    const clearQuery = () => setData("");

    Router.events.on("routeChangeComplete", clearQuery);

    return ()=> {
      Router.events.off("routeChangeComplete", clearQuery)
    }
  },[])

  //On changing the text input update the state
  const onChangeData = (e) => {
    const { value } = e.target;
    setData(value);
    //or do simply setData(e.target.value)
    // console.log(e)
    // console.log(e.target)
    // console.log(e.target.value);

    let matchedCities = [];

    if (value.length > 3) {
      for (let city of cities) {
        if (matchedCities.length >= 5) {
          break;
        }

        const matchFound = city.name
          .toLowerCase()
          .startsWith(value.toLowerCase());

        //If found
          if (matchFound) {
              const cityData = {
                  ...city, 
                //   replace every empty space with "-", g means globally
                  urlName: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
            }
              matchedCities.push(cityData);
              continue;
        }
      }
    }

    // console.log(cityData.urlName)
    // console.log(matchedCities);
    return setResults(matchedCities);
  };

  return (
    <div>
      <div className="search">
        <img className="searchIco" src="https://img.icons8.com/material-outlined/50/000000/search--v2.png"/>
        <input
          type="text"
          placeholder={placeholder?placeholder:""}
          value={data}
          onChange={onChangeData}
        />

        {data.length > 3 && (
          <ul>
            {results.length > 0 ? (
              results.map((city) => (
                <li key={city.urlName}>
                  {/* return the link to specific city page */}
                  <Link href={`/location/${city.urlName}`}>
                    <a>
                      {city.name}
                      {/* If state name is present then display it also */}
                      {city.state ? `, ${city.state} ` : " "}
                      <span>({city.country})</span>
                    </a>
                  </Link>
                </li>
              ))
            ) : (
              <li className="search__no-results">No result</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
