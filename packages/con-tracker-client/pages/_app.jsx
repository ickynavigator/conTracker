import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Layout } from "../components/ui";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  );
}

export default MyApp;
