import React from "react";
import { MetaHead } from "../../components/ui";

const index = props => {
  const { criminal } = props;
  const criminalName = `${criminal?.nameFirst} ${criminal?.nameLast}`;

  return (
    <>
      <MetaHead title={criminalName} />

      <div>Criminal Page</div>
    </>
  );
};

export default index;
