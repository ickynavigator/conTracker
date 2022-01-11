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

  const [errors, setErrors] = useState({});

  const errorValidate = () => {
    const newErrors = {};

    if (!contactAddress || contactAddress.length < 5)
      newErrors.contactAddress =
        "Address is required and should be at least 5 characters";

    if (!contactName || contactName.length < 5)
      newErrors.contactName =
        "Name is required and should be at least 5 characters";

    if (!contactEmail || contactEmail.length < 5)
      newErrors.contactEmail =
        "Email is required and should be at least 5 characters";

    if (!contactPhone || contactPhone.length < 5)
      newErrors.contactPhone = "Phone Number is required";
    else if (!contactPhone.match(/^[0-9]{10}$/))
      newErrors.contactPhone =
        "Phone Number should be 10 digits (Numbers only)";

    if (!crimeAddress || crimeAddress.length < 5)
      newErrors.crimeAddress =
        "Address is required and should be at least 5 characters";

    if (crimeAddress2 && crimeAddress2.length < 5)
      newErrors.crimeAddress2 =
        "Address is required and should be at least 5 characters";

    if (!crimeCity || crimeCity.length < 5)
      newErrors.crimeCity =
        "City is required and should be at least 5 characters";

    if (!crimeZip) newErrors.crimeZip = "Zip is required";

    if (!crimeDesc || crimeDesc.length < 5)
      newErrors.crimeDesc =
        "Description is required and should be at least 5 characters";

    if (!crimeType) newErrors.crimeType = "Please select a crime type";

    if (crimeType === "Other" && !otherCrimeType)
      newErrors.otherCrimeType = "Please define a crime type";

    return newErrors;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    const newErrors = errorValidate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
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
                isInvalid={!!errors.contactAddress}
              />
              <Form.Control.Feedback type="invalid">
                {errors.contactAddress}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="ContactName" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={contactName}
                onChange={e => setContactName(e.target.value)}
                isInvalid={!!errors.contactName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.contactName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="ContactEmail" className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                isInvalid={!!errors.contactEmail}
              />
              <Form.Control.Feedback type="invalid">
                {errors.contactEmail}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="ContactPhone" className="my-2">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                type="tel"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)}
                isInvalid={!!errors.contactPhone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.contactPhone}
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
                isInvalid={!!errors.crimeAddress}
              />
              <Form.Control.Feedback type="invalid">
                {errors.crimeAddress}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="CrimeAddress2" className="my-2">
              <Form.Label>Address Line 2</Form.Label>
              <Form.Control
                type="text"
                value={crimeAddress2}
                onChange={e => setCrimeAddress2(e.target.value)}
                isInvalid={!!errors.crimeAddress2}
              />
              <Form.Control.Feedback type="invalid">
                {errors.crimeAddress2}
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
                isInvalid={!!errors.crimeCity}
              />
              <Form.Control.Feedback type="invalid">
                {errors.crimeCity}
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
                isInvalid={!!errors.crimeZip}
              />
              <Form.Control.Feedback type="invalid">
                {errors.crimeZip}
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
                isInvalid={!!errors.crimeDesc}
              />
              <Form.Control.Feedback type="invalid">
                {errors.crimeDesc}
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
                    isInvalid={!!errors.crimeType}
                  />
                  <Form.Check.Label>{`${type}`}</Form.Check.Label>
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
                  isInvalid={!!errors.crimeType}
                />
                <Form.Check.Label>Other</Form.Check.Label>

                {crimeType === "Other" && (
                  <>
                    <Form.Control
                      required={crimeType === "Other"}
                      disabled={crimeType !== "Other"}
                      type="text"
                      value={otherCrimeType}
                      onChange={e => setOtherCrimeType(e.target.value)}
                      isInvalid={!!errors.otherCrimeType}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.otherCrimeType}
                    </Form.Control.Feedback>
                  </>
                )}

                {!crimeType && (
                  <Form.Control.Feedback type="invalid">
                    {errors.crimeType}
                  </Form.Control.Feedback>
                )}
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
