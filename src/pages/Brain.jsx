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
        "http://127.0.0.1:5000/api/predict/brain",
        formData
      );
      console.log(data);
      setResult(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="mt-4">
        <h3>We offer you a free examination of Brain Tumor :</h3>
        <p>
          brain tumor is an abnormal growth of cells in the brain. It can be
          either non-cancerous (benign) or cancerous (malignant). Brain tumors
          can cause various symptoms such as headaches, seizures, changes in
          thinking or movement, and problems with the senses. It's important to
          get a proper diagnosis from a specialized doctor. Treatment options
          may include surgery, radiation therapy, chemotherapy, or targeted
          therapies. Prompt medical attention is essential for managing brain
          tumors effectively.
        </p>
      </Container>
      <div className="upload py-5 container">
        <div className="text-center">
          <h2>Please upload a brain X-ray image</h2>
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
          {result && <Advice result={result} />}
        </div>
      </div>
    </>
  );
};

export default Lungs;
