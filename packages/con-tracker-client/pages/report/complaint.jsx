import React from "react";
import { MetaHead } from "../../components/ui";

const index = () => {
  // eslint-disable-next-line no-unused-vars
  const pageTitle = "Report a Complaint";

  return (
    <>
      <MetaHead title={pageTitle} />

      <form>Fill a Complaint</form>
    </>
  );
};

export default index;
