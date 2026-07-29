import React from "react";
import "./Features.css";

const Features = () => {
  return (
    <>
    <section
      className="features"
      style={{ backgroundImage: "url('homePage.png')" }}
    >
      <div className="features-container">
        {/* Title */}
        <h2 className="features-title">... ما يجعل إبداع ميديا الأفضل</h2>

        {/* Row of 4 boxes */}
        <div className="features-row">
          <div className="feature-box shift-up">
            <img src="speed.png" alt="Speed" className="feature-icon" />
            <h3>الالتزام والسرعة</h3>
            <p>
              إضافة إلى الجودة العالية التي نحرص على أن نقدم بها خدماتنا،
              فإننا نحرص أيضًا على إنجاز كافة المشاريع في أقل وقت ممكن،
              وتسليمها لعملائنا في المواعيد المتفق عليها.
            </p>
          </div>

          <div className="feature-box shift-up">
            <img src="quality.png" alt="Quality" className="feature-icon" />
            <h3>الجودة العالية</h3>
            <p>
              نعتمد في إبداع ميديا على استخدام أحدث الأدوات وتقديم أنواع
              الخدمات بما يضمن لعملائنا الحصول على الخدمات التي يحتاجونها
              بأعلى جودة ممكنة.
            </p>
          </div>

          <div className="feature-box">
            <img src="team.png" alt="Team" className="feature-icon" />
            <h3>فريق العمل</h3>
            <p>
              نقدم في إبداع ميديا مختلف خدمات الدعاية والإعلان بالاعتماد على فرق
              عملنا المتخصصة في تقديم كل خدمة، مما يوفر لعملائنا الحصول على خدمات
              مقدمة باحترافية عالية.
            </p>
          </div>

          <div className="feature-box">
            <img src="experience.png" alt="Experience" className="feature-icon" />
            <h3>الخبرة الواسعة</h3>
            <p>
              تتمتع إبداع ميديا بخبرة واسعة تمتد لعدد من السنوات، عملت خلالها على
              تنفيذ العديد من المشاريع باحترافية، مكتسبة من ذلك ثقة عملاء كثر.
            </p>
          </div>
        </div>
      </div>
    </section>
    <div style={{ background: "#b9b9b9",
        height: "100px",
        width: "100%",
       }}>
      </div>
      </>
  );
};

export default Features;
