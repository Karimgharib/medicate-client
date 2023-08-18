import { Modal, Carousel, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "./../context/chatContext";
import stayHome from "../assets/003-stay-at-home.png";
import covid from "../assets/004-virus.png";
import hospital from "../assets/012-hospital-1.png";
import hygiene from "../assets/002-hand-sanitizer.png";
import vaccine from "../assets/009-vaccination.png";
import nurse from "../assets/nurse.png";
import mask from "../assets/006-face-mask.png";
import distance from "../assets/008-social-distancing.png";
import irritation from "../assets/irritation.png";
import monitoring from "../assets/monitoring.png";
import uv from "../assets/uv.png";
import dermatologist from "../assets/dermatologist.png";
import test from "../assets/test.png";
import allergy from "../assets/allergy.png";
import brainTumor from "../assets/brain.png";
import brain from "../assets/mental-health.png";
import advice from "../assets/advice.png";
import care from "../assets/social-care.png";
import peace from "../assets/peace.png";

const Advice = ({ result, handle }) => {
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
        return (
          <div className="text-center">
            <img src={nurse} width={100} alt="result" />
            <p> Great news! No signs of COVID-19 found in your X-ray</p>
          </div>
        );
      case "covid":
        return (
          <div className="text-center">
            <img src={covid} width={100} alt="result" />
            <p>Possible COVID-19 infection. Consult a doctor</p>
          </div>
        );
      case "melanoma":
        return (
          <div className="text-center">
            <img src={irritation} width={100} alt="result" />
            <p>I'm sorry to inform you that the diagnosis indicates melanoma</p>
          </div>
        );
      case "nevus":
        return (
          <div className="text-center">
            <img src={irritation} width={100} alt="result" />
            <p>You have a nevus, also known as a mole</p>
          </div>
        );
      case "seborrheic_keratosis":
        return (
          <div className="text-center">
            <img src={irritation} width={100} alt="result" />
            <p>
              You have seborrheic keratosis, a common harmless skin condition
            </p>
          </div>
        );
      case "tumor":
        return (
          <div className="text-center">
            <img src={brainTumor} width={100} alt="result" />
            <p>
              I'm sorry to inform you that brain X-ray shows tumor. See a doctor
              for further evaluation and treatment.
            </p>
          </div>
        );
      case "no_tumor":
        return (
          <div className="text-center">
            <img src={brain} width={100} alt="result" />
            <p>
              Good news! Your brain X-ray does not show any signs of a tumor
            </p>
          </div>
        );
      default:
        return <p>Unknown</p>;
    }
  };

  const Direct = () => {
    switch (result) {
      case "normal":
      case "no_tumor":
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
      case "covid":
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
      case "melanoma":
      case "nevus":
      case "seborrheic_keratosis":
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
      case "tumor":
        return (
          <Button
            onClick={() => {
              navigate("/doctor");
              setSelectedSpeciality("Neurologist");
            }}
          >
            Contact With Doctor
          </Button>
        );

      default:
        return <p>Unknown</p>;
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
          <Modal.Title>{index === 0 ? "Your result" : "Advice"}</Modal.Title>
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
                  <div className="text-center">
                    <img src={stayHome} width={100} alt="advice" />
                    <p>Stay home and self-isolate</p>
                  </div>
                ) : result === "normal" ? (
                  <div className="text-center">
                    <img src={vaccine} width={100} alt="advice" />
                    <p>Get vaccinated</p>
                  </div>
                ) : result === "melanoma" ? (
                  <div className="text-center">
                    <img src={dermatologist} width={100} alt="advice" />
                    <p>
                      Consult with a dermatologist or oncologist for specialized
                      care
                    </p>
                  </div>
                ) : result === "nevus" ? (
                  <div className="text-center">
                    <img src={monitoring} width={100} alt="advice" />
                    <p>
                      Monitor the nevus for any changes and consult a healthcare
                      professional if concerne
                    </p>
                  </div>
                ) : result === "seborrheic_keratosis" ? (
                  <div className="text-center">
                    <img src={uv} width={100} alt="advice" />
                    <p>Protect the skin from excessive sun exposure</p>
                  </div>
                ) : result === "tumor" ? (
                  <div className="text-center">
                    <img src={hospital} width={100} alt="advice" />
                    <p>
                      Consult a specialist immediately for proper diagnosis and
                      treatment
                    </p>
                  </div>
                ) : result === "no_tumor" ? (
                  <div className="text-center">
                    <img src={monitoring} width={100} alt="advice" />
                    <p>Continue regular check-ups to monitor your health</p>
                  </div>
                ) : (
                  <p>unkown</p>
                )}
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="carousel-item-content">
                {result === "covid" ? (
                  <div className="text-center">
                    <img src={hospital} width={100} alt="advice" />
                    <p>Get medical help if needed</p>
                  </div>
                ) : result === "normal" ? (
                  <div className="text-center">
                    <img src={mask} width={100} alt="advice" />
                    <p>Wear a mask</p>
                  </div>
                ) : result === "melanoma" ? (
                  <div className="text-center">
                    <img src={uv} width={100} alt="advice" />
                    <p>Protect from UV radiation with clothing and sunscreen</p>
                  </div>
                ) : result === "nevus" ? (
                  <div className="text-center">
                    <img src={uv} width={100} alt="advice" />
                    <p>Protect the nevus from excessive sun exposure</p>
                  </div>
                ) : result === "seborrheic_keratosis" ? (
                  <div className="text-center">
                    <img src={hygiene} width={100} alt="advice" />
                    <p>Observe the growth and practice good skincare</p>
                  </div>
                ) : result === "tumor" ? (
                  <div className="text-center">
                    <img src={care} width={100} alt="advice" />
                    <p>
                      Seek emotional support through therapy or support groups
                    </p>
                  </div>
                ) : result === "no_tumor" ? (
                  <div className="text-center">
                    <img src={advice} width={100} alt="advice" />
                    <p>
                      Rely on medical professionals for accurate information
                    </p>
                  </div>
                ) : (
                  <p>unkown</p>
                )}
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="carousel-item-content">
                {result === "covid" ? (
                  <div className="text-center">
                    <img src={hygiene} width={100} alt="advice" />
                    <p>Practice good hygiene</p>
                  </div>
                ) : result === "normal" ? (
                  <div className="text-center">
                    <img src={distance} width={100} alt="advice" />
                    <p>Practice social distancing</p>
                  </div>
                ) : result === "melanoma" ? (
                  <div className="text-center">
                    <img src={monitoring} width={100} alt="advice" />
                    <p>
                      Stay vigilant with self-examinations and report any
                      changes
                    </p>
                  </div>
                ) : result === "nevus" ? (
                  <div className="text-center">
                    <img src={test} width={100} alt="advice" />
                    <p>Understand personal risk factors for skin</p>
                  </div>
                ) : result === "seborrheic_keratosis" ? (
                  <div className="text-center">
                    <img src={allergy} width={100} alt="advice" />
                    <p>Avoid self-removal methods</p>
                  </div>
                ) : result === "tumor" ? (
                  <div className="text-center">
                    <img src={advice} width={100} alt="advice" />
                    <p>
                      Request a clear explanation of the imaging results from
                      your doctor
                    </p>
                  </div>
                ) : result === "no_tumor" ? (
                  <div className="text-center">
                    <img src={peace} width={100} alt="advice" />
                    <p>Stay calm and avoid jumping to conclusions.</p>
                  </div>
                ) : (
                  <p>unkown</p>
                )}
              </div>
            </Carousel.Item>
          </Carousel>
        </Modal.Body>
        <Modal.Footer
          className={`message ${
            !["normal", "no_tumor"].includes(result) &&
            "justify-content-between"
          }`}
        >
          {!["normal", "no_tumor"].includes(result) && (
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
