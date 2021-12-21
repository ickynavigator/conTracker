import Head from "next/head";
import React from "react";

const MetaHead = props => {
  const { title, description } = props;

  return (
    <Head>
      <title>{title || "ConTracker"}</title>
      <meta name="description" content={description || "Convict tracker"} />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default MetaHead;
