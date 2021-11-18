import React from "react";
import Image from "next/image";
import Link from "next/link";

import DelhiImage from "../public/images/delhi.jpg";
import MumbaiImage from "../public/images/mumbai.jpg";
import KolkataImage from "../public/images/kolkata.jpg";
import SrinagarImage from "../public/images/srinagar.jpg";

const places = [
    {
        name: "Delhi",
        image: DelhiImage,
        url: "/location/delhi-1273294",
      },
      {
        name: "Mumbai",
        image: MumbaiImage,
        url: "/location/mumbai-1275339",
      },
      {
        name: "Srinagar",
        image: SrinagarImage,
        url: "/location/srinagar-1255634",
      },
      {
        name: "Kolkata",
        image: KolkataImage,
        url: "/location/kolkata-1275004",
      },
];

export default function Places() {
  return (
    <div className="places">
      <div className="places__row">
        {/* Check if the data exists */}
        {places.length > 0 &&
          places.map((place, index) => (
            <div className="places__box" key={index}>
              <Link href={place.url}>
                <a>
                  <div className="places__image-wrapper">
                    <Image
                      src={place.image}
                      alt={`${place.name} Image`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  <span>{place.name}</span>
                </a>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
