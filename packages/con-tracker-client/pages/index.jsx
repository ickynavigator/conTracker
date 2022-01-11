import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { MetaHead } from "../components/ui";
import styles from "../styles/Home.module.css";

const index = () => {
  const pageTitle = "HomePage";

  const creators = [
    { name: "Ali Nurkan İşeri" },
    { name: "Archibong Victoria" },
    { name: "Habab Tarig" },
    { name: "John Bosco" },
    { name: "Obi Fortune" },
  ];
  return (
    <>
      <MetaHead title={pageTitle} />

      <section className={` ${styles.section1}`}>
        <Container>
          <Row>
            <Col md={4} xs={12}>
              <div className={` ${styles.headerWrapper}`}>
                <h1>Welcome</h1>
              </div>

              <p>
                Today&apos;s ConTracker is an intelligence-driven and
                threat-focused national security organization with both
                intelligence and law enforcement responsibilities that is
                staffed by a dedicated cadre of more than 30,000 agents,
                analysts, and other professionals who work around the clock and
                across the globe to protect the Cyrprus from terrorism,
                espionage, cyber attacks, and major criminal threats, and to
                provide its many partners with services, support, training, and
                leadership.
              </p>
            </Col>
            <Col md={8} xs={12} className="my-auto">
              <img src="assets/images/computer.png" alt="Computer" />
            </Col>
          </Row>
        </Container>
      </section>

      <Container>
        <section className={` ${styles.section2}`}>
          <h3>About conTracker</h3>
          <p>
            Our priority is to help protect you, your children, your
            communities, and your businesses from the most dangerous threats
            facing our nation—from international and domestic terrorists to
            spies on Cyprus soil, from cyber villains to corrupt government
            officials, from mobsters to violent street gangs, from child
            predators to serial killers. Along the way, we help defend and
            uphold our nation&apos;s economy, physical and electronic
            infrastructure, and democracy.
          </p>
        </section>
      </Container>

      <section className="bg-blue">
        <Container>
          <h2 className="text-center">Site Creators</h2>
          <Row xs={1} md={5}>
            {creators.map(({ name }) => (
              <Col className="my-3" key={name}>
                <Card>
                  <Card.Body className="d-flex justify-content-center">
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
