import React from "react";
import { MetaHead } from "../../components/ui";

const index = props => {
  // eslint-disable-next-line no-unused-vars
  const { criminalList } = props;

  return (
    <>
      <MetaHead title="List of most wanted criminals" />

      <div>Most Wanted Criminals</div>
    </>
  );
};

export default index;
