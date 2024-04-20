import React from "react";
import "../css/Home.css";
import videoSrc from "../assets/homebckk.mp4";

const Validateur = () => {
  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <video width="100%" height="100%" controls autoPlay>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default Validateur;
