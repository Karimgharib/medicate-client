import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Doctor from "../assets/doctor-1.jpg";
import { ChatState } from "../context/chatContext";
import axios from "axios";

const Doctors = () => {
  const { doctorData, setDoctorData } = ChatState();

  useEffect(() => {
    const getDoctorData = async () => {
      // setLoading(true);

      try {
        const { data } = await axios(
          "http://127.0.0.1:3001/api/user/get-doctors"
        );
        setDoctorData(data);
        // setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getDoctorData();
  }, [setDoctorData]);

  const doctor = doctorData.slice(0, 3);
  return (
    <div className="doctor">
      <Container>
        <h1 className="special-heading">Our Doctors</h1>
        <Row>
          {doctor.map((d) => (
            <Col md={4} key={d._id}>
              <div className="box">
                <img src={Doctor} alt="doctor" />
                <div className="text">
                  <h3 className="name">
                    Dr. {d.name.charAt(0).toUpperCase() + d.name.slice(1)}
                  </h3>
                  <p className="job">{d.specialization}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Doctors;
