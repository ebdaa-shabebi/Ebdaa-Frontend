import React from "react";
import Footer from "../components/Footer";
import "./ContentCreation.css"; // new CSS file

const ContentCreation = ({ setPage }) => {
  return (
    <div className="content-creation-page">
      {/* Top Full Image with Overlay Text */}
      <div className="content-top-image-container">
        <img
          src="محتوى تسويقي.png"
          alt="Content Creation"
          className="content-top-image"
        />
        <h1 className="content-top-text"> صناعة المحتوى التسويقي</h1>
      </div>

      {/* Header with line */}
      <div className="content-header-line">
        <div className="content-line"></div>
        <h1>خدمات صناعة المحتوى التسويقي</h1>
      </div>

      {/* Description */}
      <p className="content-description">
        عندما يتعلق الأمر بالتسويق الرقمي للشركات والأعمال التجارية فإننا الشريك الأمثل 
        الذي يوفر لك الحلول التسويقية لمساعدة عملائك في الوصول إليك بكل سهولة 
        سواء كان من خلال عملية بحثهم أو من خلال استراتيجيات الاستهداف الذي ينفذها 
        فريقنا المختص يقوم فريق إبـداع مـيديا  بوضع الاستراتيـجيات التـسويقية وخـطط  
        التـنفيذ في الوقـت الذي يـمكن للشـركات وأصحاب المـشاريع التـجارية التركيز على  
        تـطـوير أعمـالهم ونشـاطاتـهم في المـجالات الأخـرى. كن على ثـقة بأن خـدماتنـا  
        التـسويقية تعـمل في الكوالـيس لتـوجـيه إليـك المجمـوعة التـالية مـن العـملاء المحتملين.
      </p>

      {/* Large Image with margins and white border */}
      <div className="content-large-image-container">
        <img
          src="700.jpg"
          alt="Content Example"
          className="content-large-image"
        />
      </div>

      {/* Back Button */}
      <div className="content-back-button-container">
        <button onClick={() => setPage("home", { anchor: "services" })} className="content-back-button">
           العودة إلى الصفحة الرئيسية
        </button>
      </div>

      <div className="content-bline"></div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContentCreation;
