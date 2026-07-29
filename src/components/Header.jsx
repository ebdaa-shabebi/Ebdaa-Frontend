import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo">
          <div className="logo-top">
            <img src="new-04.png" alt="إبداع ميديا" />
            <img src="new-03.png" alt="إبداع ميديا" />
          </div>
          <img className="tagline" src="new-05.png" alt="إبداع ميديا" />
        </div>

        {/* Navigation */}
        <nav className="nav">
          <ul>
            <li><a href="#home">الصفحة الرئيسية</a></li>
            <li><a href="#home/services">خدماتنا</a></li>
            <li><a href="#home/ourwork">اعمالنا</a></li>
            <li><a href="#home/contact">تواصل معنا</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
