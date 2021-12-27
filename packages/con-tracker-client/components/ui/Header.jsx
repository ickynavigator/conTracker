import Image from "next/image";
import React, { useState } from "react";
import {
  Container,
  Form,
  FormControl,
  InputGroup,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const [searchValue, setsearchValue] = useState("");
  const searchHandler = e => {
    e.preventDefault();
    if (!searchValue) return;

    window.location.href = `/?q=${searchValue}`;
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">
          <Image
            src="/assets/images/logo.svg"
            width="300"
            height="80"
            className="d-inline-block align-top"
            alt="ConTracker"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Report" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/report/complaint">
                Report a Complaint
              </NavDropdown.Item>
              <NavDropdown.Item href="/report/crime">
                Report a Crime
              </NavDropdown.Item>
              <NavDropdown.Item href="/report/missing">
                Report a Missing Person
              </NavDropdown.Item>
              {/* <NavDropdown.Divider />
            <NavDropdown.Item href="/contact/us">
              Contact Us
            </NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link href="/missing">Missing Persons</Nav.Link>
            <Nav.Link href="/criminals/wanted">Wanted Persons</Nav.Link>
            <Nav.Link href="/criminals">All Criminals</Nav.Link>
          </Nav>
          <Form onSubmit={searchHandler}>
            <InputGroup>
              <FormControl
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchValue}
                onChange={e => setsearchValue(e.target.value)}
              />
              <InputGroup.Text variant="outline-success">
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
