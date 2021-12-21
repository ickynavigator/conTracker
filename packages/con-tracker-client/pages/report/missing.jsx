import React from "react";
import { MetaHead } from "../../components/ui";

const index = () => {
  // eslint-disable-next-line no-unused-vars
  const pageTitle = "Report a Missing Person";

  return (
    <>
      <MetaHead title={pageTitle} />

      <form>Fill a Missing Person</form>
    </>
  );
};

export default index;
