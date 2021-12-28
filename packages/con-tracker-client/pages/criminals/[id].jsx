// import Link from "next/link";
import Image from "next/image";
import React from "react";
import {
  // Alert,
  // Button,
  // Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { MetaHead } from "../../components/ui";
import { getAllCriminalById } from "../../utils/api";

const fallbackPic = "/assets/images/NoPicture.svg";

export async function getServerSideProps(context) {
  const { id } = context.params;

  const data = await getAllCriminalById(id);

  if (!data) return { notFound: true };
  return { props: { data } };
}

// const Person = props => {
//   const { criminal } = props;
//   const { _id: id, nameFirst, nameLast, nameOthers, image } = criminal;

//   const name = `${nameFirst} ${
//     nameOthers && `${nameOthers.split("")[0].toUpperCase()}.`
//   } ${nameLast} `;
//   return (
//     <Card style={{ width: "15rem" }} className="shadow">
//       <Card.Img variant="top" src={image || fallbackPic} />
//       <Card.Body>
//         <Card.Title>{name}</Card.Title>
//         <Link passHref href={`/criminals/${id}`}>
//           <Button variant="primary">View</Button>
//         </Link>
//       </Card.Body>
//     </Card>
//   );
// };

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
    residencePermitValidation: rpv,
    sex,
  } = data;
  const name = `${nameFirst} ${
    nameOthers && `${nameOthers.split("")[0].toUpperCase()}.`
  } ${nameLast} `;

  return (
    <>
      <MetaHead title={name || "CRIMINAL"} />

      <div className="title-banner w-full">
        <h1 className="text-center">CRIMINAL PAGE</h1>
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
            <h2>RESIDENCE PERMIT VALIDATION</h2>
            {rpv.toString() || unavailable}
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
