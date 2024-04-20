import React from "react";
import Logo from "../assets/logol.png";
import "../css/Loading.css";

const Loading = () => {
  return (
    <div className="loading-page">
      <img className="loading-logo" src={Logo} alt="Logo" />
    </div>
  );
};

export default Loading;
