import { Modal, Carousel, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "./../context/chatContext";
import g from "../assets/003-stay-at-home.png";

const Advice = ({ result }) => {
  const [showModal, setShowModal] = useState(false);

  const [index, setIndex] = useState(0);
  const { setSelectedSpeciality } = ChatState();
  const navigate = useNavigate();

  useEffect(() => {
    setShowModal(true);
  }, [result]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const getResult = () => {
    switch (result) {
      case "normal":
        return <p>Great news! No signs of COVID-19 found in your X-ray</p>;
      case "covid":
        return <p>Possible COVID-19 infection. Consult a doctor</p>;
      case "melanoma":
        return (
          <p>I'm sorry to inform you that the diagnosis indicates melanoma</p>
        );
      case "nevus":
        return <p>You have a nevus, also known as a mole</p>;
      case "seborrheic_keratosis":
        return (
          <p>You have seborrheic keratosis, a common harmless skin condition</p>
        );
      default:
        return <p>Unknown</p>;
    }
  };

  const Direct = () => {
    if (result === "covid") {
      return (
        <Button
          onClick={() => {
            navigate("/doctor");
            setSelectedSpeciality("Pulmonology");
          }}
        >
          Contact With Doctor
        </Button>
      );
    } else if (result === "normal") {
      return (
        <Button
          onClick={() => {
            setShowModal(false);
            setSelectedSpeciality("");
          }}
        >
          Close
        </Button>
      );
    } else if (result === "melanoma" || "nevus" || "seborrheic_keratosis") {
      return (
        <Button
          onClick={() => {
            navigate("/doctor");
            setSelectedSpeciality("Dermatologist");
          }}
        >
          Contact With Doctor
        </Button>
      );
    }
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            controls={false}
            interval={null}
            variant="dark"
          >
            <Carousel.Item>
              <div className="carousel-item-content">{getResult()}</div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="carousel-item-content">
                {result === "covid" ? (
                  <div className="d-flex" width={32}>
                    {/* <img src={g} /> */}
                    <p>Stay home and self-isolate</p>
                  </div>
                ) : result === "normal" ? (
                  <p>Get vaccinated</p>
                ) : result === "melanoma" ? (
                  <p>
                    Consult with a dermatologist or oncologist for specialized
                    care
                  </p>
                ) : result === "nevus" ? (
                  <p>
                    Monitor the nevus for any changes and consult a healthcare
                    professional if concerne
                  </p>
                ) : result === "seborrheic_keratosis" ? (
                  <p>Protect the skin from excessive sun exposure</p>
                ) : (
                  <p>unkown</p>
                )}
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="carousel-item-content">
                {result === "covid" ? (
                  <p>Get medical help if needed</p>
                ) : result === "normal" ? (
                  <p>Wear a mask</p>
                ) : result === "melanoma" ? (
                  <p>Protect from UV radiation with clothing and sunscreen</p>
                ) : result === "nevus" ? (
                  <p>Protect the nevus from excessive sun exposure</p>
                ) : result === "seborrheic_keratosis" ? (
                  <p>Observe the growth and practice good skincare</p>
                ) : (
                  <p>unkown</p>
                )}
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="carousel-item-content">
                {result === "covid" ? (
                  <p>Practice good hygiene</p>
                ) : result === "normal" ? (
                  <p>Practice social distancing</p>
                ) : result === "melanoma" ? (
                  <p>
                    Stay vigilant with self-examinations and report any changes
                  </p>
                ) : result === "nevus" ? (
                  <p>Understand personal risk factors for skin cancer</p>
                ) : result === "seborrheic_keratosis" ? (
                  <p>Avoid self-removal methods</p>
                ) : (
                  <p>unkown</p>
                )}
              </div>
            </Carousel.Item>
          </Carousel>
        </Modal.Body>
        <Modal.Footer
          className={`message ${
            result !== "normal" && "justify-content-between"
          }`}
        >
          {result !== "normal" && (
            <Button onClick={() => navigate("/hospital")}>
              Show Nearby Hospitals
            </Button>
          )}
          {Direct()}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Advice;
