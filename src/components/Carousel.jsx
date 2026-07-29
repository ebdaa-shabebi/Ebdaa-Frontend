import React, { useState } from "react";
import MainPage from "./MainPage";
import Marketing from "./Marketing";
import Printing from "./Printing";
import "./Carousel.css";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const components = [MainPage, Marketing, Printing];

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? components.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <div 
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {components.map((Component, index) => (
          <div key={index} className="carousel-slide">
            <Component />
          </div>
        ))}
      </div>
      
      <button className="carousel-button carousel-button-prev" onClick={goToPrev}>
        <img src="arrow.png" alt="Previous" className="arrow-img prev-arrow" />
      </button>

      <button className="carousel-button carousel-button-next" onClick={goToNext}>
        <img src="arrow.png" alt="Next" className="arrow-img next-arrow" />
      </button>

      <div className="carousel-indicators">
        {components.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;