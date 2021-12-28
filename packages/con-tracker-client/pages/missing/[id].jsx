import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MetaHead } from "../../components/ui";
import { getMissingPersonById } from "../../utils/api";

const fallbackPic = "/assets/images/NoPicture.svg";

export async function getServerSideProps(context) {
  const { id } = context.params;

  const data = await getMissingPersonById(id);

  if (!data) return { notFound: true };
  return { props: { data } };
}

const index = props => {
  const unavailable = "UNAVAILABLE";

  const { data } = props;
  const {
    _id: id,
    nameFirst,
    nameLast,
    nameOthers,
    updatedAt,
    dob,
    race,
    picture,
    sex,
  } = data;

  const name = `${nameFirst} ${
    nameOthers && `${nameOthers.split("")[0].toUpperCase()}.`
  } ${nameLast} `;

  return (
    <>
      <MetaHead title={name || "Missing"} />

      <div className="title-banner w-full">
        <h1 className="text-center">MISSING</h1>
      </div>

      <Container className="my-3">
        <Row>
          <Col>
            <h2>ID</h2>
            {id}
            <h2>LAST UPDATED AT</h2>
            {new Date(updatedAt).toString() || unavailable}
            <h2>FIRST NAME</h2>
            {nameFirst}
            <h2>LAST NAME</h2>
            {nameLast}
            <h2>OTHER NAMES</h2>
            {nameOthers || unavailable}
            <h2>DATE OF BIRTH</h2>
            {new Date(dob).toString() || unavailable}
            <h2>RACE</h2>
            {race || unavailable}
            <h2>GENDER</h2>
            {sex || unavailable}
          </Col>
          <Col className="d-flex justify-content-center">
            <Image
              src={picture || fallbackPic}
              width={500}
              height={500}
              alt={name}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default index;
