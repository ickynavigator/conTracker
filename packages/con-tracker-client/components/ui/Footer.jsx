import Image from "next/image";
import React, { useState } from "react";
import { Col, Row, Form, Container, Button } from "react-bootstrap";
import { FiMail, FiPhone } from "react-icons/fi";
import styles from "../../styles/components/Footer.module.css";

const Footer = () => {
  const phone = "+1 (844) 567-8989";
  const mail = "ReactiveCoders@SE.com";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [validated, setValidated] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    setValidated(true);
  };

  return (
    <>
      <div className={styles.contactWrapper}>
        <Row xs={1} md={2}>
          <Col>
            <h2>Contact Us</h2>

            <Container className="ms-2 my-3 ps-0 w-50">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="ContactUsName" className="my-2">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    name required
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="ContactUsEmail" className="my-2">
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter a valid email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="ContactUsEmail" className="my-2">
                  <Form.Control
                    required
                    as="textarea"
                    placeholder="Your message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Form>
            </Container>
          </Col>
          <Col>
            <Image
              src="/assets/images/noTextLogo.svg"
              width="100"
              height="100"
              alt="ConTracker"
            />
            <p>
              <FiPhone className="fs-3" />
              <span className="ms-2">{phone}</span>
            </p>
            <p>
              <FiMail className="fs-3" />
              <span className="ms-2">{mail}</span>
            </p>
          </Col>
        </Row>
      </div>
      <div className={styles.copyrightWrapper}>
        <h5>Copyright &copy; 2021 ConTracker. All rights reserved.</h5>
      </div>
    </>
  );
};

export default Footer;
