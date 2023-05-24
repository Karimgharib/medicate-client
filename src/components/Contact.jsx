import { useRef } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import contact from "../assets/undraw_letter_re_8m03.svg";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE,
        process.env.REACT_APP_EMAILJS_TEMPLATE,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          document.getElementById("form").reset();
          alert("Message Sent successfully");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div id="contact" className="contact">
      <Container>
        <h1 className="special-heading mb-4">Contact Us</h1>
        <Row>
          <Col md={6}>
            <img
              src={contact}
              className="mb-2 d-md-inline d-none"
              width={220}
              alt="contact"
            />
          </Col>
          <Col md={6}>
            <form
              id="form"
              ref={form}
              onSubmit={sendEmail}
              className="d-flex flex-column"
            >
              <input type="text" placeholder="Your Name" name="user_name" />
              <input type="email" placeholder="Your E-mail" name="user_email" />
              <textarea placeholder="Message" name="message"></textarea>
              <Button type="submit">Send</Button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
