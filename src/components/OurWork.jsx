import React from "react";
import "./OurWork.css";

const works = [
  { title: "تصوير وإنتاج فيديو إعلاني", page: "video" },
  { title: "تصميم موشن جرافيك", page: "motion" },
  { title: "حملات إعلانية", page: "digital" },
];

export default function OurWork({ setPage }) { // <-- accept setPage as a prop
  return (
    <div className="ourwork-section" id="ourwork">
      <div className="ourwork-container">
        <h2 className="ourwork-title">اعمالنا</h2>
        <div className="ourwork-buttons">
          {works.map((work, idx) => (
            <button
              key={idx}
              className="ourwork-button"
              onClick={() => {
                setPage(work.page); // now works
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {work.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
