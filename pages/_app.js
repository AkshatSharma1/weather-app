import "../styles/main.scss";
import "../styles/Nav.scss";
import "../styles/Snow.scss";
import "../styles/Map.scss";
import React from "react";
import Router from "next/router";
import NProgress from "nprogress";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  <Head>
    <link
      href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
      rel="stylesheet"
    />
  </Head>;

  //Loading Bar on top Progress display
  React.useEffect(() => {
    const start = () => NProgress.start();
    const end = () => NProgress.done();

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    //Backtrack
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
