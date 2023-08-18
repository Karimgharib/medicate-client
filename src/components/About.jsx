import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import AboutPhoto from "../assets/undraw_medicine_b-1-ol.svg";

const About = () => {
  return (
    <div className="about" id="about">
      <Container>
        <h1 className="special-heading">About Us</h1>
        <Row className="align-items-center">
          <Col md={6}>
            <div className="text">
              <h3>Medicate Healthcare</h3>
              <p>
                We offer free examinations for Corona virus, skin diseases, and
                brain diseases. Our goal is to provide accessible and proactive
                healthcare, empowering you to prioritize your well-being. Join
                us on this journey towards a healthier future.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className="image">
              <img src={AboutPhoto} alt="about" width="70%" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
