import Image from "next/image";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { FiMail, FiPhone } from "react-icons/fi";
import styles from "../../styles/components/Footer.module.css";

const Footer = () => {
  const phone = "+1 (844) 567-8989";
  const mail = "ReactiveCoders@SE.com";

  return (
    <>
      <div className={styles.contactWrapper}>
        <Row xs={1} md={2}>
          <Col>contact us</Col>
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
