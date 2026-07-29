import React from "react";
import "./ServicesBar.css";

const services = [
    {
    title: "خدمات التصميم",
    desc: "خدمات تصميم إحترافية",
  },
  
   {
    title: "خدمات إحترافية",
    desc: "مختصون دعاية وتسويق",
  },

  {
    title: "خدمات الطباعة",
    desc: "جميع خدمات الطباعة بمختلف أنواعها",
  },
  
];

export default function Services() {
  return (
    <>
    <div className="background">
    

    <div className="services-container">
      {services.map((service, idx) => (
        <div key={idx} className="service-item">
          <span className="icon-circle">
            <img src={"checkmark.png"} alt="check" />
          </span>


          <div className="service-text">
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        </div>
      ))}
    </div>
    </div>

    
    </>
  );
}
