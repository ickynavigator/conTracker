import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { MetaHead } from "../components/ui";

const fallbackPic = "/assets/images/NoPicture.svg";
const index = () => {
  const pageTitle = "HomePage";

  const creators = [
    { name: "Ali Nurkan İşeri", picture: fallbackPic },
    { name: "Archibong Victoria", picture: fallbackPic },
    { name: "Habab Tarig", picture: fallbackPic },
    { name: "John Bosco", picture: fallbackPic },
    { name: "Obi Fortune", picture: fallbackPic },
  ];
  return (
    <>
      <MetaHead title={pageTitle} />

      <section className="my-3">
        <Container>
          <h2>ConTracker</h2>

          <p>
            Contracker is a criminal tracking software that also provides the
            ability to track missing people and view complaints from others
          </p>

          <p>
            Core abilities of Contracker
            <ul>
              <li>Report online crimes</li>
              <li>Report complaints </li>
              <li>Report missing people</li>
              <li>Show the most wanted person&apos;s details</li>
              <li>View a Contact us form</li>
              <li>Search Criminal by full name</li>
              <li>Crime file must contain the image of the criminal</li>
              <li>View the List of missing persons</li>
            </ul>
          </p>
        </Container>
      </section>

      <section className="bg-blue">
        <Container>
          <h2 className="text-center">Site Creators</h2>
          <Row xs={1} md={5}>
            {creators.map(({ name, picture }) => (
              <Col className="my-3" key={name}>
                <Card style={{ width: "15rem" }}>
                  <Card.Img alt={name} src={picture} variant="top" />
                  <Card.Body className="card-img-overlay d-flex justify-content-center">
                    <Card.Title className="text-danger">{name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};
export default index;
