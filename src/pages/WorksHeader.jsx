import React from "react";
import "./WorksHeader.css";
import { FaArrowLeft } from "react-icons/fa";

const WorksHeader = ({ onBack, onLogoClick }) => {
  return (
    <header
      className="works-header"
      style={{ backgroundImage: `url("shiny-metal-plate-grunge-background.jpg")` }}
    >
      {/* Top-left icon button */}
      <button className="works-header-back" onClick={onBack}>
        <FaArrowLeft />
      </button>

      {/* Centered clickable logo */}
      <img
        src="logoSide-06.png"
        alt="Ebdaa Media Logo"
        className="works-header-logo"
        onClick={onLogoClick}
        style={{ cursor: "pointer" }}
      />
    </header>
  );
};

export default WorksHeader;
