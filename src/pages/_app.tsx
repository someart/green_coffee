import "../styles/globals.css";
 {/*import { Navbar, Footer } from "../components";*/}
import React from "react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
     {/*  <Navbar />*/}
      <div>
      <h1>Welcome to the Coffee Shop</h1>
      {/* <Navbar /> */}
      <p>Enjoy our delicious coffee!</p>
    </div>
      <Component {...pageProps} />
      {/* <Footer />*/}
    </>
  );
}
export default MyApp;