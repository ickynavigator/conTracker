import React from "react";
import { MetaHead } from "../../components/ui";

const index = () => {
  // eslint-disable-next-line no-unused-vars
  const pageTitle = "Report a Crime";

  return (
    <>
      <MetaHead title={pageTitle} />

      <form>Fill a Crime</form>
    </>
  );
};

export default index;
