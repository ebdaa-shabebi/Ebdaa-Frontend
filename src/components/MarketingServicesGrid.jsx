import React from "react";
import "./MarketingServicesGrid.css";

const MarketingServicesGrid = ({ setPage }) => {
  const services = [
    {
      image: "asc.png",
      title: "تصميم الهوية البصرية",
      description: `نقدم حلولاً متكاملة لتصميم
            الهوية البصرية , تشمل
            الشعار ,الألوان , والنمط
            البصريه العام , بما يعكس رؤية
            العلامة التجارية ويعزز حضورها
            في أذهان الجمهور`,
      buttonText: "إعرف أكثر",
      position: "up",
      page: "visualIdentity"
    },
    {
      image: "DigitalAdDesign-08.png",
      title: "تصميم الإعلانات الرقمية والمطبوعة ",
      description: `نُصمم مواد إعلانية عالية
        الجودة, سواء للاستخدام 
        الرقمي أو المطبوع, تجمع
        بين الإبداع البصري والوضوح في رسالة الإعلان لضمان تحقيق أفضل
        تفاعل مع الجمهور المستهدف`,
      buttonText: "إعرف أكثر",
      position: "down",
      page: "digitalAds"
    },
    {
      image: "asx.png",
      title: "إدارة الحملات الإعلانية",
      description: `نخطط وننفذ حملات إعلانية 
        فعالة عبر الوسائط المختلفة ,
        مع التركيز على إيصال الرسالة
        التسويقية بدقة وتحقيق
        أقصى تأثير ممكن ضمن
        الأهداف المحددة`,
      buttonText: "إعرف أكثر",
      position: "up",
      page: "campaigns"
    },
    {
      image: "514568-PIMP17-162-01.png",
      title: "صناعة المحتوى التسويقي",
      description: `مع إبداع ميديا نصنع لك
        محتوى تسويقي يلتقط
        انتباه العملاء ويثير
        اهتمامهم. نحن
        من نصنعها!`,
      buttonText: "إعرف أكثر",
      position: "down",
      page: "contentCreation"
    }
  ];

  return (
    <div className="marketing-services-container" id="services">
      <div className="services-header">
        <h2>خدمات تسويقية وإعلانية متكاملة</h2>
        <div className="green-dotted-line-header">
          <div className="thick-green-line"></div>
          <div className="three-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
        <p>
          نقدم العديد من خدمات التسويق والاعلان والخدمات التسويقية المختلفة
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className={`service-card ${service.position}`}>
            <div className="service-icon">
              <img src={service.image} alt={service.title} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <button
              className="service-button"
              onClick={() => {
                setPage(service.page);
                window.scrollTo({ top: 0, behavior: "smooth" }); // scroll smoothly to top
              }}
            >
              {service.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketingServicesGrid;
