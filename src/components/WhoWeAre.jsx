import React from "react";
import "./WhoWeAre.css";

const WhoWeAre = () => {
  return (
    <div className="who-we-are-section">
      <div className="who-we-are-card">
        {/* Left text */}
        <div className="who-we-are-text">
          <h3 className="green-title">من نحن...؟</h3>
          <h2 className="black-title">إبداع ميديا  للدعاية والإعلان والتسويق الإبداعي</h2>
          <p className="black-paragraph">
            إبداع ميديا هي شركة متخصصة في الدعاية والإعلان والتسويق الإبداعي، نسعى لابتكار حلول إعلانية فعالة تبرز هوية عملائنا، وتوصل رسائلهم بأسلوب فني مؤثر، بخبرة تجمع بين الاحتراف والتجديد. نقدم خدمات تشمل: التصميم الإعلاني، إدارة الحملات التسويقية، صناعة المحتوى البصري، والهوية البصرية المتكاملة. نحن نؤمن بأن كل علامة تجارية تملك قصة تستحق أن تُروى بإبداع... ونحن هنا لنرويها بأفضل صورة
          </p>
        </div>

        {/* Right image */}
        <div className="who-we-are-image">
          <img src="whoweare.png" alt="Who We Are" />
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
