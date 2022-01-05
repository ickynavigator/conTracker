import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { MetaHead } from "../../components/ui";
import { submitComplaint } from "../../utils/api";

const index = () => {
  const pageTitle = "Report a Complaint";
  const [validated, setValidated] = useState(false);
  const [successMsg, setsuccessMsg] = useState("");
  const [errorMsg, seterrorMsg] = useState("");

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});

  const errorValidate = () => {
    const newErrors = {};
    if (!name || name.length < 5)
      newErrors.name = "Name is required and should be at least 5 characters";

    if (!number || number.length < 5)
      newErrors.number = "Phone Number is required";
    else if (!number.match(/^[0-9]{10}$/))
      newErrors.number = "Phone Number should be 10 digits (Numbers only)";

    if (!message || message.length < 20)
      newErrors.message =
        "Description is required and should be at least 5 characters";

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
      name,
      number,
      message,
    };
    const data = await submitComplaint(formDetails);
    if (data.status === 200)
      setsuccessMsg("Your report has been submitted successfully");
    else seterrorMsg("There was an error submitting your report");
  };

  return (
    <>
      <MetaHead title={pageTitle} />

      <div className="title-banner w-full">
        <h1 className="text-center">FILE A COMPLAINT</h1>
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
              <Form.Label>
                Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="Phone Number" className="my-2">
              <Form.Label>
                Phone Number <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                required
                type="tel"
                value={number}
                onChange={e => setNumber(e.target.value)}
                isInvalid={!!errors.number}
              />
              <Form.Control.Feedback type="invalid">
                {errors.number}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="CrimeDesc" className="my-2">
              <Form.Label>
                Description <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                required
                as="textarea"
                value={message}
                onChange={e => setMessage(e.target.value)}
                isInvalid={!!errors.message}
                rows={10}
              />
              <Form.Control.Feedback type="invalid">
                {errors.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default index;
