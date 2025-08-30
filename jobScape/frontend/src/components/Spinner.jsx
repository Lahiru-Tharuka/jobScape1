import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner-content">
        <ClipLoader size={60} color="var(--primary)" />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Spinner;