import React from "react";
import { BiBrain } from "react-icons/bi";
import { RiLungsLine } from "react-icons/ri";
import { RiBodyScanLine } from "react-icons/ri";

import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const Check = () => {
  return (
    <div className="check">
      <div className="head">
        <Container>
          <div className="text">
            <h1>Our Service</h1>
            <p>Learn more about our Service</p>
          </div>
        </Container>
      </div>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col
            xs={10}
            md={8}
            className="col d-flex gap-3 p-4 mb-5 align-items-center align-items-md-start text-center text-md-start flex-column flex-md-row"
          >
            <RiLungsLine className="icon" />
            <div className="text">
              <h3>Lungs</h3>
              <p>
                We offers a simple and accurate way to assess your health status
                by providing an easy-to-use COVID-19 symptom checker, empowering
                you to stay informed and make informed decisions about your
                well-being.
              </p>
              <Button>
                <Link to="/lungs">Check Now</Link>
              </Button>
            </div>
          </Col>
          <Col
            xs={10}
            md={8}
            className="d-flex gap-3 p-4 mb-5 col align-items-center align-items-md-start text-center text-md-start flex-column flex-md-row"
          >
            <RiBodyScanLine className="icon" />
            <div className="text">
              <h3>Skin</h3>
              <p>
                Explore our website for a reliable, user-friendly tool to assess
                your skin health. Differentiate melanoma, nevus, and seborrheic
                keratosis, empowering informed decisions for your well-being.
              </p>
              <Button>
                <Link to="/skin">Check Now</Link>
              </Button>
            </div>
          </Col>
          <Col
            xs={10}
            md={8}
            className="d-flex gap-3 p-4 col align-items-center align-items-md-start text-center text-md-start flex-column flex-md-row"
          >
            <BiBrain className="icon" />
            <div className="text">
              <h3>Brain</h3>
              <p>
                Our website offers a thorough and comprehensive brain tumor
                assessment, utilizing advanced diagnostic tools and expert
                analysis to determine the presence of any symptoms related to
                brain injury.
              </p>
              <Button>
                <Link to="/brain">Check Now</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Check;
