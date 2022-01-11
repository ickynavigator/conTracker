import Head from "next/head";
import React from "react";

const MetaHead = props => {
  const { title, description } = props;

  return (
    <Head>
      <title>{title || "ConTracker"}</title>
      <meta name="description" content={description || "Convict tracker"} />

      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
        crossOrigin="anonymous"
      />
    </Head>
  );
};

export default MetaHead;
