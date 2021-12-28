import Link from "next/link";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { MetaHead, Paginate } from "../../components/ui";
import { getAllMissing } from "../../utils/api";

const fallbackPic = "/assets/images/NoPicture.svg";

export async function getServerSideProps(context) {
  const pageSize = 20;
  const pageNum = context.query.p || 1;
  const search = context.query.k || "";

  const data = await getAllMissing(pageNum, pageSize, search);

  if (!data) return { notFound: true };
  return { props: { ...data, search } };
}

const Person = props => {
  const { missing } = props;
  const { _id: id, nameFirst, nameLast, nameOthers, image } = missing;

  const name = `${nameFirst} ${
    nameOthers && `${nameOthers.split("")[0].toUpperCase()}.`
  } ${nameLast} `;
  return (
    <Card style={{ width: "15rem" }} className="shadow">
      <Card.Img variant="top" src={image || fallbackPic} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Link passHref href={`/misssing/${id}`}>
          <Button variant="primary">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

const index = props => {
  const { page, pages, persons, search } = props;

  const [searchValue, setsearchValue] = useState(search);
  const searchHandler = e => {
    e.preventDefault();
    if (!searchValue) return;

    window.location.href = `/criminals?k=${searchValue}`;
  };

  return (
    <>
      <MetaHead title="List of all Missing Persons" />

      <div className="title-banner w-full">
        <h1 className="text-center">ALL MiSSING</h1>
      </div>
      <Container className="my-3">
        <Row>
          <Col />
          <Col>
            <Form onSubmit={searchHandler}>
              <InputGroup>
                <InputGroup.Text variant="outline-secondary">
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchValue}
                  onChange={e => setsearchValue(e.target.value)}
                />
                <Button variant="outline-secondary">Search</Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>
      {persons && persons.length > 0 ? (
        <Row xs={2} sm={4} md={5} className="m-auto">
          {persons.map(person => {
            const { _id: id } = person;
            return (
              <Col key={id} className="p-4 d-flex justify-content-center">
                <Person missing={person} />
              </Col>
            );
          })}
        </Row>
      ) : (
        <Alert variant="danger" className="text-center my-3 mx-5">
          No Missing found
        </Alert>
      )}
      <Paginate page={page} pages={pages} keyword={searchValue} />
    </>
  );
};

export default index;
