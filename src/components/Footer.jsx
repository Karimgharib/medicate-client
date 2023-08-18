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
              <a href="https://www.facebook.com/kariim.gharib">
                <FaFacebookSquare />
              </a>
              <a href="https://www.twitter.com/">
                <FaTwitterSquare />
              </a>
              <a href="https://www.linkedin.com/in/karim-gharib/">
                <FaLinkedin />
              </a>
              <a href="https://wa.me/+201017648667">
                <FaWhatsappSquare />
              </a>
            </div>
          </Col>
          <Col md={6}>
            <ul className="list-unstyled">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="../#about">About Us</a>
              </li>
              <li>
                <a href="../#service">Service</a>
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
                <a href="../#contact">Contact</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
