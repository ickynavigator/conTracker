import Link from "next/link";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { MetaHead, Paginate } from "../../../components/ui";
import styles from "../../../styles/Wanted.module.css";
import { getWantedCriminals } from "../../../utils/api";

const fallbackPic = "/assets/images/NoPicture.svg";

export async function getServerSideProps(context) {
  const pageNum = context.query.p || 1;
  const pageSize = 8;
  const data = await getWantedCriminals(pageNum, pageSize);

  if (!data) return { notFound: true };
  return { props: { data } };
}

const Person = props => {
  const { criminal } = props;
  const { _id: id, nameFirst, nameLast, nameOthers, image, crime } = criminal;

  const name = `${nameFirst} ${
    nameOthers && `${nameOthers.split("")[0].toUpperCase()}.`
  } ${nameLast} `;
  return (
    <Card style={{ width: "18rem" }} className="shadow">
      <Card.Img variant="top" src={image || fallbackPic} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <span className="text-danger">{crime || "Crime Not Specified"}</span>
        </Card.Text>
        <Link passHref href={`/criminals/${id}`}>
          <Button variant="primary">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

const index = props => {
  const criminalList = props.data;
  const { page, pages, persons } = criminalList;

  return (
    <>
      <MetaHead title="List of most wanted criminals" />

      <div className={`${styles.WantedHeader} w-full`}>
        <h1 className="text-center">MOST WANTED</h1>
      </div>
      <Row xs={2} md={4} className="m-auto">
        {persons.map(person => {
          const { _id: id } = person;
          return (
            <Col key={id} className="p-4 d-flex justify-content-center">
              <Person criminal={person} />
            </Col>
          );
        })}
      </Row>
      <Paginate page={page} pages={pages} />
    </>
  );
};

export default index;
