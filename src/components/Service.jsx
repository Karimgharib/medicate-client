import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { RiLungsLine } from "react-icons/ri";
import { BiBrain } from "react-icons/bi";
import { RiBodyScanLine } from "react-icons/ri";

const Service = () => {
  return (
    <div className="service" id="service">
      <Container>
        <h1 className="special-heading">Our Services</h1>
        <div className="heading">
          We offer you a free examination of all these diseases.
        </div>
        <Row className=" justify-content-between">
          <Col md={4}>
            <div className="box">
              <RiLungsLine className="icons" />
              <h3>Lungs</h3>
              <p>
                We offers a simple and accurate way to assess your health status
                by providing an easy-to-use COVID-19 symptom checker, empowering
                you to stay informed and make informed decisions about your
                well-being.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="box">
              <RiBodyScanLine className="icons" />
              <h3>Skin</h3>
              <p>
                Explore our website for a reliable, user-friendly tool to assess
                your skin health. Differentiate melanoma, nevus, and seborrheic
                keratosis, empowering informed decisions for your well-being.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="box">
              <BiBrain className="icons" />
              <h3>Brain</h3>
              <p>
                Our website offers a thorough and comprehensive brain trauma
                assessment, utilizing advanced diagnostic tools and expert
                analysis to determine the presence of any symptoms related to
                brain injury.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Service;
