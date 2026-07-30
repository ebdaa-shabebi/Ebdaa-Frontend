import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import WorksHeader from "../pages/WorksHeader";
import "./Works.css";

const Digital = ({ setPage }) => {

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  // ✅ FETCH DIGITAL IMAGES
  useEffect(() => {

    fetch("https://ebdaa-backend-zbiy.onrender.com/images/digital")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error(err));

  }, []);

  // ✅ HANDLE CLICK
  const handleImageClick = async (img) => {

    if (selectedImage?.id === img.id) {

      setSelectedImage(null);
      setVideos([]);
      setActiveVideo(null);

      return;

    }

    setSelectedImage(img);

    setActiveVideo(null);

    try {

      const res = await fetch(
        `https://ebdaa-backend-zbiy.onrender.com/image-video/${img.id}`
      );

      const data = await res.json();

      const formattedVideos = data.map((video) => {

        let videoId = "";

        // ✅ SHORT YOUTU.BE LINK
        if (
          video.youtube_url.includes("youtu.be/")
        ) {

          videoId =
            video.youtube_url
              .split("youtu.be/")[1]
              ?.split("?")[0];

        }

        // ✅ NORMAL YOUTUBE LINK
        else {

          videoId =
            video.youtube_url
              .split("v=")[1]
              ?.split("&")[0];

        }

        return {

          embed:
            `https://www.youtube.com/embed/${videoId}`,

          thumbnail:
            `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

        };

      });

      setVideos(formattedVideos);

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <div className="motion-page">

      <WorksHeader
        onBack={() =>
          setPage("home", {
            anchor: "ourwork"
          })
        }
        onLogoClick={() => setPage("home")}
      />

      {/* TOP IMAGE */}

      <div className="motion-top-image-container">

        <img
          src="حملات إعلانية.png"
          alt="Digital Campaigns"
          className="motion-top-image"
        />

        <h1 className="motion-top-image-text">
          حملات إعلانية
        </h1>

      </div>

      {/* HEADER */}

      <div className="motion-header-line">

        <div className="motion-line right-line"></div>

        <h1>
          اعمالنا في الحملات الإعلانية
        </h1>

        <div className="motion-line left-line"></div>

      </div>

      {/* MAIN */}

      <div className="motion-section">

        {/* SELECTED IMAGE */}

        {selectedImage && (

          <div className="selected-logo-wrapper">

            <div
              className="selected-motion-logo"
              onClick={() =>
                handleImageClick(selectedImage)
              }
            >

              <img
                src={selectedImage.url}
                alt="selected"
                className="selected-motion-logo-image"
              />

            </div>

            {/* VIDEOS */}

            <div className="dynamic-video-grid">

              {videos.map((video, index) => (

                <div
                  className="dynamic-video-card"
                  key={index}
                >

                  <div className="dynamic-video-preview">

                    {activeVideo === index ? (

                      <iframe
                        src={`${video.embed}?autoplay=1`}
                        title={`video-${index}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="motion-video-iframe"
                      ></iframe>

                    ) : (

                      <div
                        className="video-thumbnail-wrapper"
                        onClick={() =>
                          setActiveVideo(index)
                        }
                      >

                        <img
                          src={video.thumbnail}
                          alt="Video Thumbnail"
                          className="video-thumbnail"
                        />

                        <div className="video-overlay">

                          <div className="play-button">
                            ▶
                          </div>

                        </div>

                      </div>

                    )}

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* LOGOS */}

        <div
          className={`
            motion-card-container
            ${selectedImage
              ? "logos-hidden"
              : ""
            }
          `}
        >

          {images.map((img) => (

            <div
              key={img.id}
              className="motion-card"
              onClick={() =>
                handleImageClick(img)
              }
            >

              <img
                src={img.url}
                className="motion-card-image"
                alt="work"
              />

            </div>

          ))}

        </div>

      </div>

      <div className="motion-bline"></div>

      <Footer />

    </div>

  );

};

export default Digital;