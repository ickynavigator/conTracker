import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { MetaHead } from "../../components/ui";
import { submitMissing } from "../../utils/api";
// import styles from "../../styles/Crime.module.css";

const index = () => {
  const pageTitle = "Report a Missing Person";
  const [validated, setValidated] = useState(false);
  const [successMsg, setsuccessMsg] = useState("");
  const [errorMsg, seterrorMsg] = useState("");

  const [name, setname] = useState("");
  const [dob, setdob] = useState("");
  const [location, setlocation] = useState("");
  const [height, setheight] = useState("");
  const [weight, setweight] = useState("");
  const [eyeColor, seteyeColor] = useState("");
  const [hairColor, sethairColor] = useState("");
  const [race, setrace] = useState("");
  const [gender, setgender] = useState("");

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
      name,
      dob,
      location,
      height,
      weight,
      eyeColor,
      hairColor,
      race,
      gender,
    };
    const data = await submitMissing(formDetails);

    if (data.status === 200)
      setsuccessMsg("Your report has been submitted successfully");
    else seterrorMsg("There was an error submitting your report");
  };

  return (
    <>
      <MetaHead title={pageTitle} />

      <div className="title-banner w-full">
        <h1 className="text-center">REPORT A MISSING PERSON</h1>
      </div>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="mx-5 my-3"
      >
        {successMsg && <Alert variant="success">{successMsg}</Alert>}
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        <Row xs={1} md={2}>
          <Col>
            <Form.Group controlId="Name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={name}
                onChange={e => setname(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="dob" className="my-2">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                required
                type="date"
                value={dob}
                onChange={e => setdob(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Date of Birth.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="location" className="my-2">
              <Form.Label>Location (Last Seen)</Form.Label>
              <Form.Control
                required
                type="text"
                value={location}
                onChange={e => setlocation(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Location.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="height" className="my-2">
              <Form.Label>Height (cm)</Form.Label>
              <Form.Control
                required
                type="number"
                value={height}
                onChange={e => setheight(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Height.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="weight" className="my-2">
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control
                required
                type="number"
                value={weight}
                onChange={e => setweight(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Weight.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="eyeColor" className="my-2">
              <Form.Label>Eye Color</Form.Label>
              <Form.Control
                required
                type="text"
                value={eyeColor}
                onChange={e => seteyeColor(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Eye Color.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="hairColor" className="my-2">
              <Form.Label>Hair Color</Form.Label>
              <Form.Control
                required
                type="text"
                value={hairColor}
                onChange={e => sethairColor(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Hair Color.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="race" className="my-2">
              <Form.Label>Race</Form.Label>
              <Form.Control
                required
                type="text"
                value={race}
                onChange={e => setrace(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Race.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="gender" className="my-2">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                required
                value={gender}
                onChange={e => setgender(e.target.value)}
              >
                <option disabled>Choose a Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="OTHER">Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide a valid Gender.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* <Col></Col> */}
        </Row>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default index;
