import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import Advice from "../components/Advice";
import l from "../assets/undraw_doctor_kw-5-l.svg";

const Lungs = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const [photoUrl, setPhotoUrl] = useState("");

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    const photo = event.target.files[0];
    console.log(photo.name.split(".")[0]);
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = () => {
      const url = reader.result;
      setPhotoUrl(url);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object and append the file data
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post(
        "http://127.0.0.1:5000/api/predict/chest",
        formData
      );
      console.log(data);
      setResult(data.result);
    } catch (error) {
      console.log(error);
    }
    // setShowComponent(true);
  };

  return (
    <>
      <Container className="mt-4">
        <h3>We offer you a free examination of Covid-19 :</h3>
        <p>
          COVID-19 is a highly contagious illness caused by a virus called
          SARS-CoV-2. It spreads through respiratory droplets and can cause a
          range of symptoms, from mild to severe. The most common symptoms
          include fever, cough, and difficulty breathing. To prevent the spread
          of COVID-19, it's important to practice good hand hygiene, wear face
          masks in public settings, and maintain social distancing. Vaccines
          have been developed and authorized for emergency use to provide
          protection against COVID-19.
        </p>
      </Container>
      <div className="upload py-5 container">
        <div className="text-center">
          <h2>Please upload a chest X-ray image</h2>
          <div className="photo pt-3">
            {photoUrl ? (
              <img src={photoUrl} alt="Uploaded" />
            ) : (
              // <RiLungsLine className="uploadIcon" />
              <img src={l} alt="Uploaded" />
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="d-flex align-items-center mt-4 flex-column"
          >
            <Form.Control
              type="file"
              onChange={handleFileUpload}
              style={{ width: "30%" }}
            />

            <input
              className="d-none"
              type="file"
              id="file"
              onChange={handleFileUpload}
            />
            <Button type="submit">Check Now</Button>
          </form>
          {result && <Advice result={result} />}
        </div>
      </div>
    </>
  );
};

export default Lungs;
