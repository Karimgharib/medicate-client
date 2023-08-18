import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Spinner, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import doctorP from "../assets/doctor-1.jpg";
import { HiArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import { ChatState } from "../context/chatContext";

const Doctor = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    selectedSpeciality,
    setSelectedSpeciality,
    setSelectedChat,
    userInfo,
  } = ChatState();

  const navigate = useNavigate();

  const accessChat = async (userId) => {
    try {
      if (localStorage.getItem("userInfo")) {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.post(
          `http://127.0.0.1:3001/api/chat/`,
          {
            userId,
          },
          config
        );
        setSelectedChat(data);
        navigate("/chathome");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getDoctorData = async () => {
      setLoading(true);

      try {
        const { data } = await axios(
          "http://127.0.0.1:3001/api/user/get-doctors"
        );
        setDoctorData(data);
        console.log(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getDoctorData();
  }, [setDoctorData]);

  const filteredDoctors = selectedSpeciality
    ? doctorData.filter(
        (doctor) => doctor.specialization === selectedSpeciality
      )
    : doctorData;

  return (
    <div className="doctors">
      <div className="head">
        <Container className=" flex-md-row flex-column">
          <div className="text">
            <h1>Our Doctors</h1>
            <p>Learn more about our Doctors</p>
          </div>
          <div>
            <Form.Select
              value={selectedSpeciality}
              onChange={(e) => setSelectedSpeciality(e.target.value)}
            >
              <option value="">All Doctors</option>
              <option value="Pulmonology">Pulmonology</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Neurologist">Neurologist</option>
            </Form.Select>
          </div>
        </Container>
      </div>
      {loading ? (
        <div
          className=" d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner
            animation="border"
            role="status"
            style={{ color: "#008fe2" }}
          />
        </div>
      ) : (
        <Container>
          <Row className="justify-content-center">
            {filteredDoctors.map((doctor) => (
              <Col xs={10} md={8} key={doctor._id}>
                <div className="box d-flex align-items-center align-items-md-start text-center text-md-start gap-2 flex-column flex-md-row">
                  <img
                    src={doctorP}
                    alt="doctorP"
                    width={150}
                    height={150}
                    className="border-5"
                  />
                  <div className="text">
                    <h2 className="name">
                      Dr.{" "}
                      {doctor.name.charAt(0).toUpperCase() +
                        doctor.name.slice(1)}
                    </h2>
                    <p className="specialty">{doctor.specialization}</p>
                    <p className="a">{doctor?.about}</p>
                    {/* <p className="experience">
                      <a href={`mailto:${doctor.email}`}> {doctor.email}</a>
                    </p> */}
                    <Button
                      onClick={() => accessChat(doctor._id)}
                      style={{ color: "#fff" }}
                    >
                      Chat <HiArrowNarrowRight />
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Doctor;
