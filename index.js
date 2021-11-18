import Head from "next/head";
import SearchBox from "../components/SearchBox";
import Nav from "../components/Nav";
import Places from "../components/Places";
import dynamic from 'next/dynamic'
import Map from '../components/Map'

 
export default function Home() {

  const DynamicComponentWithNoSSR = dynamic(() => import('../components/Map'), {
    ssr: false
  });
  

  return (
    <div className="wrapper">
      <Head>
        <title>Weather App</title>
      </Head>
      <div className="home">
        <div class="snow1"></div>
        <div class="snow2"></div>
        <div class="snow3"></div>
        <Nav />
        <div className="container">
          <SearchBox placeholder="Search Location..."></SearchBox>
          <Places />
        </div>
      </div>

      {/* <div className="lower">
        <h2>India Map</h2>
        <div className="mapP">
          <Map />
        </div>
      </div> */}
    </div>
  );
}
