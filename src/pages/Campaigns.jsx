import React from "react";
import Footer from "../components/Footer";
import "./Campaigns.css"; // Import the new CSS file

const Campaigns = ({ setPage }) => {
  return (
    <div className="campaigns-page">
      {/* Top Full Image with Overlay Text */}
      <div className="campaigns-top-image-container">
        <img
          src="حملات إعلانية ابداع.png"
          alt="Campaigns"
          className="campaigns-top-image"
        />
        <h1 className="campaigns-top-text">إدارة الحملات الإعلانية</h1>
      </div>

      {/* Header with line */}
      <div className="campaigns-header-line">
        <div className="campaigns-line"></div>
        <h1>خدمات إدارة الحملات الإعلانية</h1>
      </div>

      {/* Description */}
      <p className="campaigns-description">
      نخطط وننفذ حملات إعلانية فعالة عبر الوسـائط المختلفة , مع التركيز 
      على إيصال الرسالة التسويقية بدقة وتحقيق أقصى تأثير ممكن ضمن
      الأهداف المحددة
      </p>

      <div className="campaigns-image-section">
      <div className="campaigns-image-grid">
        <div className="campaigns-row">
          <div className="campaigns-image-wrapper">
            <div className="campaigns-bg-square"></div>
            <img src="2.png" alt="Campaign 1" className="campaigns-image" />
          </div>
          <div className="campaigns-image-wrapper">
            <div className="campaigns-bg-square"></div>
            <img src="1.png" alt="Campaign 2" className="campaigns-image" />
          </div>
        </div>
        <div className="campaigns-row single">
          <div className="campaigns-image-wrapper">
            <div className="campaigns-bg-square"></div>
            <img src="3.png" alt="Campaign 3" className="campaigns-image large" />
          </div>
        </div>
      </div>
    </div>


      {/* Back Button */}
      <div className="campaigns-back-button-container">
        <button onClick={() => setPage("home", { anchor: "services" })} className="campaigns-back-button">
          العودة إلى الصفحة الرئيسية
        </button>
      </div>

      <div className="campaigns-bline"></div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Campaigns;
