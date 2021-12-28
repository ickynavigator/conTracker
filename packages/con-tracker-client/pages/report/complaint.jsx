import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { MetaHead } from "../../components/ui";
import { submitComplaint } from "../../utils/api";

const index = () => {
  const pageTitle = "Report a Complaint";
  const [validated, setValidated] = useState(false);
  const [successMsg, setsuccessMsg] = useState("");
  const [errorMsg, seterrorMsg] = useState("");

  const handleSubmit = async event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      seterrorMsg("Please fill out all fields");
      return;
    }

    setValidated(true);

    const formDetails = {};
    const data = await submitComplaint(formDetails);
    if (data.status === 200)
      setsuccessMsg("Your report has been submitted successfully");
    else seterrorMsg("There was an error submitting your report");
  };

  return (
    <>
      <MetaHead title={pageTitle} />

      <div className="title-banner w-full">
        <h1 className="text-center">FILE A Complaint</h1>
      </div>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="mx-5 my-3"
      >
        {successMsg && <Alert variant="success">{successMsg}</Alert>}
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default index;
