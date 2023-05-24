import React from "react";
import flogo from "../assets/footer_logo.png";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaWhatsappSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="text-center">
          <Col md={6}>
            <img src={flogo} alt="..." width={200} />
            <div className="p-3">
              <a href="...">
                <FaFacebookSquare />
              </a>
              <a href="...">
                <FaTwitterSquare />
              </a>
              <a href="...">
                <FaLinkedin />
              </a>
              <a href="https://wa.me/+201017648667">
                <FaWhatsappSquare />
              </a>
            </div>
            {/* <a href="https://www.vezeeta.com">vezeeta.com</a> */}
          </Col>
          <Col md={6}>
            <ul className="list-unstyled">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/#about">About Us</Link>
              </li>
              <li>
                <Link to="/#service">Service</Link>
              </li>
              <li>
                <Link to="/check">Check</Link>
              </li>
              <li>
                <Link to="/hospital">Hospitals</Link>
              </li>
              <li>
                <Link to="/doctor">Doctors</Link>
              </li>
              <li>
                <Link to="/#contact">Contact</Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
