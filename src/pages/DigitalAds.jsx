import React from "react";
import Footer from "../components/Footer";
import "./DigitalAds.css"; // Import the CSS file

const DigitalAds = ({ setPage }) => {
  return (
    <div className="digital-ads-page">
      {/* Top Full Image with Overlay Text */}
      <div className="digital-ads-top-image-container">
        <img
          src="تسويق.png"
          alt="Digital Ads"
          className="digital-ads-top-image"
        />
        <h1 className="digital-ads-top-image-text">
          تصميم الإعلانات الرقمية والمطبوعة
        </h1>
      </div>

      {/* Header with line */}
      <div className="digital-ads-header-line">
        <div className="digital-ads-line"></div>
        <h1>خدمات تصميم الإعلانات الرقمية والمطبوعة</h1>
      </div>

      {/* Description */}
      <p className="digital-ads-description">
        نُصمم مواد إعلانية عالية الجودة, سواء للاستخدام الرقمي أو المطبوع,
        تجمع بين الإبداع البصري والوضوح في رسالة الإعلان لضمان تحقيق أفضل تفاعل
        مع الجمهور المستهدف
      </p>

      {/* Four Images in a Grid */}
      <div className="digital-ads-image-grid-container">
        <img src="11.png" alt="Digital Ads 1" className="digital-ads-grid-image" />
        <img src="12.png" alt="Digital Ads 2" className="digital-ads-grid-image" />
        <img src="10.png" alt="Digital Ads 3" className="digital-ads-grid-image" />
        <img src="9.png" alt="Digital Ads 4" className="digital-ads-grid-image" />
      </div>

      {/* Back Button */}
      <div className="digital-ads-back-button-container">
        <button onClick={() => setPage("home", { anchor: "services" })} className="digital-ads-back-button">
           العودة إلى الصفحة الرئيسية
        </button>
      </div>

      <div className="digital-ads-bline"></div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DigitalAds;
