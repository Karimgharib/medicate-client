import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import Advice from "../components/Advice";
import l from "../assets/undraw_doctor_kw-5-l.svg";

const Skin = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const [photoUrl, setPhotoUrl] = useState("");

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    const photo = event.target.files[0];
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
        "http://127.0.0.1:5000/api/predict/skin",
        formData
      );
      setResult(data.result);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="mt-4">
        <h3>We offer you a free examination of all these diseases :</h3>
        <p>
          Melanoma is a type of skin cancer that develops from melanocytes, the
          cells responsible for producing the pigment melanin. It can appear as
          an unusual or changing mole, and early detection is crucial for
          effective treatment.
        </p>
        <p>
          A nevus, commonly known as a mole, is a benign growth on the skin. It
          is typically a cluster of melanocytes and can vary in size, shape, and
          color. Most nevi are harmless, but some may require monitoring or
          removal if they show signs of atypical growth or change.
        </p>
        <p>
          Seborrheic keratosis is a noncancerous skin condition characterized by
          the appearance of raised, waxy, or scaly growths on the skin. These
          growths often range in color from tan to dark brown and can have a
          rough or bumpy texture. While seborrheic keratosis is typically
          harmless, it may resemble other skin conditions, so it's important to
          have it evaluated by a healthcare professional.
        </p>
      </Container>
      <div className="upload py-5">
        <div className="text-center">
          <h2>Please Upload a picture of the affected area of the skin</h2>
          <div className="photo pt-3">
            {photoUrl ? (
              <img src={photoUrl} alt="Uploaded" />
            ) : (
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
          {result && <Advice result={result} handle={handleFileUpload} />}
        </div>
      </div>
    </>
  );
};

export default Skin;
