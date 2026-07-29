import React from "react";
import Footer from "../components/Footer";
import "./VisualIdentity.css"; // Import the CSS file

const VisualIdentity = ({ setPage }) => {
  return (
    <div className="visual-identity-page">
      {/* Top Full Image with Overlay Text */}
      <div className="top-image-container">
        <img
          src="هوية بصرية.png"
          alt="Visual Identity"
          className="top-image"
        />
        <h1 className="top-image-text">تصميم الهوية البصرية</h1>
      </div>

      {/* Header with line */}
      <div className="header-line">
        <div className="line"></div>
        <h1>خدمات تصميم الهوية البصرية</h1>
      </div>

      {/* Description */}
      <p className="description">
        يعمل فريق إبداع ميديا جنبًا إلى جنب لمعـرفة تطلـعاتهم وتوقـعاتهم وطبيـعة
        الخدمـات أو المنـتجـات الـتي سـوف يقـدمونـها بالإضـافة إلى طبيـعة
        الجـمهور المستهدف ليتمكنوا من تصميم هوية تجارية تناسب احتـياجاتهم وتلبي
        رغباتـهم.
      </p>

      {/* Large Image with margins */}
      <div className="large-image-container">
        <img
          src="Untitled design.png"
          alt="Visual Identity Example"
          className="large-image"
        />
      </div>

      {/* Back Button */}
      <div className="back-button-container">
        <button onClick={() => setPage("home", { anchor: "services" })} className="back-button">
           العودة إلى الصفحة الرئيسية
        </button>
      </div>

      <div className="bline"></div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VisualIdentity;
