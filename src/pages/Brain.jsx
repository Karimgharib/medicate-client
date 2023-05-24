import React from "react";
import { BiBrain } from "react-icons/bi";

const Brain = () => {
  return (
    <div className="upload py-5">
      <div className="text-center">
        <h2>Please upload a picture of the Brain</h2>
        <div className="photo pt-3">
          <BiBrain className="uploadIcon" />
        </div>
        <input type="file" id="file" />
        <button>Check Now</button>
      </div>
    </div>
  );
};

export default Brain;
