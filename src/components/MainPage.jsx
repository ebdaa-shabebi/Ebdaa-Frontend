import React from "react";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="hero-section" id="home">
      {/* Overlay for contrast */}
      <div className="overlay"></div>

      {/* Left side: text */}
      <div className="hero-text">
        <h1>إبداع ميديا  للدعاية والاعلان</h1>
        <img src="text-07.png" alt="Brand Logo" className="hero-logo" />
        <p>
        {`تعد الدعاية والاعلان من أهم الأدوات
        التي تساهم في نجاح الشركات
        والمؤسسات التجارية. يُعَدّ الترويج
        للمنتجات والخدمات وبناء الوعي
        بالعلامة التجارية جزءًا لا يتجزأ من
        عملية النمو والازدهار.`}
        </p>
      </div>

      {/* Right side: building image */}
      <img src="MainPage.png" alt="Building" className="hero-image" />
    </div>
  );
};

export default MainPage;
