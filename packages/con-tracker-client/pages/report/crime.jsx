import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { MetaHead } from "../../components/ui";
import styles from "../../styles/Crime.module.css";
import { submitCrime } from "../../utils/api";

const index = () => {
  const pageTitle = "Report a Crime";
  const crimeTypes = [
    "Theft",
    "Sexual Assault",
    "Hit and Run",
    "Knife Violence",
    "Gun Violence",
  ];

  const [validated, setValidated] = useState(false);
  const [successMsg, setsuccessMsg] = useState("");
  const [errorMsg, seterrorMsg] = useState("");

  // contact details
  const [contactAddress, setContactAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // crime details
  const [crimeAddress, setCrimeAddress] = useState("");
  const [crimeAddress2, setCrimeAddress2] = useState("");
  const [crimeCity, setCrimeCity] = useState("");
  const [crimeZip, setCrimeZip] = useState("");
  const [crimeDesc, setCrimeDesc] = useState("");
  const [crimeType, setCrimeType] = useState("");
  const [otherCrimeType, setOtherCrimeType] = useState("");

  const handleSubmit = async event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      seterrorMsg("Please fill out all fields");
      return;
    }

    setValidated(true);

    const formDetails = {
      contactAddress,
      contactName,
      contactEmail,
      contactPhone,

      crimeAddress,
      crimeAddress2,
      crimeCity,
      crimeZip,
      crimeDesc,
      crimeType,
    };
    if (crimeType === "Other") {
      formDetails.otherCrimeType = otherCrimeType;
    }
    const data = await submitCrime(formDetails);
    if (data.status === 200)
      setsuccessMsg("Your report has been submitted successfully");
    else seterrorMsg("There was an error submitting your report");
  };

  return (
    <>
      <MetaHead title={pageTitle} />

      <div className="title-banner w-full">
        <h1 className="text-center">FILE A CRIME</h1>
      </div>
      <Container className="my-5">
        <p className="w-75 ps-3">
          Filing a false police report is a crime. Anyone filing a false police
          report may be prosecuted . Filing a false police report is punishable
          by imprisonment in county jail not exceeding 6 months, or by fine not
          exceeding $1,000, or by both.
        </p>

        <p className="w-75 ps-3">Fill out as much information as possible.</p>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {successMsg && <Alert variant="success">{successMsg}</Alert>}
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          <Container className={`ms-0 my-3 ${styles.Container}`}>
            <h3>Your Contact Information (optional)</h3>
            <Form.Group controlId="ContactStreetAddress" className="my-2">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                required
                type="text"
                value={contactAddress}
                onChange={e => setContactAddress(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="ContactName" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={contactName}
                onChange={e => setContactName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="ContactEmail" className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="ContactPhone" className="my-2">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                type="tel"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid phone number.
              </Form.Control.Feedback>
            </Form.Group>
          </Container>

          <Container className={`ms-0 my-3 ${styles.Container}`}>
            <h3>
              Location of crime (<span className="text-danger">*</span>{" "}
              required)
            </h3>
            <Form.Group controlId="CrimeAddress" className="my-2">
              <Form.Label>
                Street Address <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                value={crimeAddress}
                onChange={e => setCrimeAddress(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="CrimeAddress2" className="my-2">
              <Form.Label>Address Line 2</Form.Label>
              <Form.Control
                type="text"
                value={crimeAddress2}
                onChange={e => setCrimeAddress2(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="CrimeCity" className="my-2">
              <Form.Label>
                City <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                value={crimeCity}
                onChange={e => setCrimeCity(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid City.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="CrimeZip" className="my-2">
              <Form.Label>
                Zip Code <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                value={crimeZip}
                onChange={e => setCrimeZip(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Zip Code.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="CrimeDesc" className="my-2">
              <Form.Label>
                Description <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                required
                as="textarea"
                value={crimeDesc}
                onChange={e => setCrimeDesc(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Description.
              </Form.Control.Feedback>
            </Form.Group>
          </Container>

          <Container className={`ms-0 my-3 ${styles.Container}`}>
            <h3>
              Type of Crime <span className="text-danger">*</span>
            </h3>
            {crimeTypes.map(type => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check id={`crimeType-${type}`}>
                  <Form.Check.Input
                    required
                    name="crimeType"
                    type="radio"
                    onChange={e => setCrimeType(e.target.id.split("-")[1])}
                  />
                  <Form.Check.Label>{`${type}`}</Form.Check.Label>
                  <Form.Control.Feedback type="invalid">
                    Please select a crime type.
                  </Form.Control.Feedback>
                </Form.Check>
              </div>
            ))}
            <div key="default-Other" className="mb-3">
              <Form.Check id="crimeType-Other">
                <Form.Check.Input
                  required
                  name="crimeType"
                  type="radio"
                  onChange={e => setCrimeType(e.target.id.split("-")[1])}
                />
                <Form.Check.Label>Other</Form.Check.Label>
                <Form.Control
                  required={crimeType === "Other"}
                  disabled={crimeType !== "Other"}
                  type="text"
                  value={otherCrimeType}
                  onChange={e => setOtherCrimeType(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please select a crime type.
                </Form.Control.Feedback>
              </Form.Check>
            </div>
          </Container>

          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </>
  );
};

export default index;
