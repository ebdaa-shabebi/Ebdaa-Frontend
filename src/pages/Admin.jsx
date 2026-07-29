import React, { useEffect, useState } from "react";
import "./Admin.css";

const Admin = () => {

  const API = "https://newback-jul8.onrender.com";

  // ================= AUTH =================

  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ================= PANELS =================

  const [activePanel, setActivePanel] = useState("images");

  // ================= IMAGES =================

  const [images, setImages] = useState([]);

  const [file, setFile] = useState(null);

  const [category, setCategory] = useState("digital");

  const [loading, setLoading] = useState(false);

  // ================= VIDEO MANAGEMENT =================

  const [selectedImage, setSelectedImage] = useState(null);

  const [imageVideos, setImageVideos] = useState([]);

  const [videoUrl, setVideoUrl] = useState("");

  // ================= LOGIN =================

  const handleLogin = () => {

    if (
      username === "admin" &&
      password === "Ebdaa@2026Admin!"
    ) {

      setLoggedIn(true);

    } else {

      alert("Wrong username or password");

    }

  };

  // ================= FETCH IMAGES =================

  const fetchImages = async () => {

    try {

      const res = await fetch(
        `${API}/images/${category}`
      );

      const data = await res.json();

      setImages(data);

    } catch (err) {

      console.error(err);

    }

  };

  // ================= FETCH VIDEOS =================

  const fetchVideos = async (imageId) => {

    try {

      const res = await fetch(
        `${API}/image-video/${imageId}`
      );

      const data = await res.json();

      setImageVideos(data);

    } catch (err) {

      console.error(err);

    }

  };

  // ================= EFFECT =================

  useEffect(() => {

    if (loggedIn) {

      fetchImages();

      setSelectedImage(null);

      setImageVideos([]);

    }

  }, [category, loggedIn]);

  // ================= UPLOAD =================

  const handleUpload = async () => {

    if (!file) {
      alert("Please select image");
      return;
    }

    const formData = new FormData();

    formData.append("image", file);
    formData.append("category", category);
    formData.append("key", "Ebdaa@2026Admin!");

    try {

      setLoading(true);

      await fetch(`${API}/upload`, {
        method: "POST",
        body: formData
      });

      alert("Uploaded Successfully ✅");

      setFile(null);

      fetchImages();

    } catch (err) {

      console.error(err);

      alert("Upload Failed ❌");

    } finally {

      setLoading(false);

    }

  };

  // ================= DELETE IMAGE =================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this image?"
    );

    if (!confirmDelete) return;

    try {

      await fetch(`${API}/delete/${id}`, {
        method: "DELETE"
      });

      fetchImages();

      if (selectedImage?.id === id) {

        setSelectedImage(null);
        setImageVideos([]);

      }

    } catch (err) {

      console.error(err);

      alert("Delete failed");

    }

  };

  // ================= ADD VIDEO =================

  const handleAddVideo = async () => {

    if (!selectedImage) {
      alert("Select image first");
      return;
    }

    if (!videoUrl) {
      alert("Enter youtube url");
      return;
    }

    try {

      await fetch(`${API}/add-video`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          key: "Ebdaa@2026Admin!",
          image_id: selectedImage.id,
          youtube_url: videoUrl

        })

      });

      setVideoUrl("");

      fetchVideos(selectedImage.id);

      alert("Video Added ✅");

    } catch (err) {

      console.error(err);

      alert("Failed");

    }

  };

  // ================= DELETE VIDEO =================

  const handleDeleteVideo = async (id) => {

    try {

      await fetch(`${API}/delete-video/${id}`, {
        method: "DELETE"
      });

      fetchVideos(selectedImage.id);

    } catch (err) {

      console.error(err);

    }

  };

  // ================= LOGIN PAGE =================

  if (!loggedIn) {

    return (

      <div className="login-page">

        <div className="login-card">

          <div className="login-left">

            <div>

              <h1>EBDAA</h1>

              <p>
                Creative Media Admin Dashboard
              </p>

              <div className="login-features">

                <div>
                  • Upload portfolio images
                </div>

                <div>
                  • Manage portfolio videos
                </div>

                <div>
                  • Delete content instantly
                </div>

              </div>

            </div>

          </div>

          <div className="login-right">

            <div className="login-form">

              <h2>Admin Login</h2>

              <input
                type="text"
                placeholder="Admin username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button onClick={handleLogin}>
                Login
              </button>

            </div>

          </div>

        </div>

      </div>

    );

  }

  // ================= DASHBOARD =================

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="sidebar-logo">
          <h2>EBDAA</h2>
        </div>

        <div className="sidebar-menu">

          <div
            className={`
              sidebar-item
              ${activePanel === "images"
                ? "active"
                : ""
              }
            `}
            onClick={() =>
              setActivePanel("images")
            }
          >
            Images
          </div>

          <div
            className={`
              sidebar-item
              ${activePanel === "videos"
                ? "active"
                : ""
              }
            `}
            onClick={() =>
              setActivePanel("videos")
            }
          >
            Videos
          </div>

        </div>

        <button
          className="logout-btn"
          onClick={() => setLoggedIn(false)}
        >
          Logout
        </button>

      </aside>

      {/* MAIN */}

      <main className="main-content">

        {/* TOPBAR */}

        <div className="topbar">

          <div>

            <h1>

              {activePanel === "images"
                ? "Image Management"
                : "Video Management"
              }

            </h1>

            <p>
              Manage your portfolio content
            </p>

          </div>

          <div className="topbar-user">
            Admin
          </div>

        </div>

        {/* =========================
            IMAGES PANEL
        ========================= */}

        {activePanel === "images" && (

          <>

            {/* STATS */}

            <div className="stats-grid">

              <div className="stat-card">

                <h3>{images.length}</h3>

                <p>Total Images</p>

              </div>

              <div className="stat-card">

                <h3>{category}</h3>

                <p>Current Category</p>

              </div>

              <div className="stat-card">

                <h3>EBDAA</h3>

                <p>Creative Studio</p>

              </div>

            </div>

            {/* CATEGORY */}

            <div className="upload-card">

              <h2>Select Category</h2>

              <div className="upload-controls">

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                >

                  <option value="digital">
                    Digital
                  </option>

                  <option value="video">
                    Video
                  </option>

                  <option value="motion">
                    Motion
                  </option>

                </select>

              </div>

            </div>

            {/* UPLOAD */}

            <div className="upload-card">

              <h2>Upload New Image</h2>

              <div className="upload-controls">

                <input
                  type="file"
                  onChange={(e) =>
                    setFile(e.target.files[0])
                  }
                />

                <button
                  onClick={handleUpload}
                  disabled={loading}
                >

                  {loading
                    ? "Uploading..."
                    : "Upload"}

                </button>

              </div>

            </div>

            {/* GALLERY */}

            <div className="gallery-section">

              <div className="section-header">

                <h2>Gallery</h2>

              </div>

              {images.length === 0 ? (

                <p className="empty-text">
                  No images found
                </p>

              ) : (

                <div className="gallery-grid">

                  {images.map((img) => (

                    <div
                      className="gallery-card"
                      key={img.id}
                    >

                      <img
                        src={img.url}
                        alt=""
                      />

                      <div className="gallery-overlay">

                        <button
                          onClick={() =>
                            handleDelete(img.id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </>

        )}

        {/* =========================
            VIDEOS PANEL
        ========================= */}

        {activePanel === "videos" && (

          <>

            {/* STATS */}

            <div className="stats-grid">

              <div className="stat-card">

                <h3>
                  {imageVideos.length}
                </h3>

                <p>Videos</p>

              </div>

              <div className="stat-card">

                <h3>{category}</h3>

                <p>Current Category</p>

              </div>

              <div className="stat-card">

                <h3>
                  {selectedImage
                    ? selectedImage.id
                    : "-"
                  }
                </h3>

                <p>Selected Image</p>

              </div>

            </div>

            {/* CATEGORY */}

            <div className="upload-card">

              <h2>Select Category</h2>

              <div className="upload-controls">

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                >

                  <option value="digital">
                    Digital
                  </option>

                  <option value="video">
                    Video
                  </option>

                  <option value="motion">
                    Motion
                  </option>

                </select>

              </div>

            </div>

            {/* IMAGE SELECT */}

            <div className="gallery-section">

              <div className="section-header">

                <h2>
                  Select Image
                </h2>

              </div>

              <div className="gallery-grid">

                {images.map((img) => (

                  <div
                    className={`
                      gallery-card
                      ${selectedImage?.id === img.id
                        ? "active-video-image"
                        : ""
                      }
                    `}
                    key={img.id}
                    onClick={() => {

                      setSelectedImage(img);

                      fetchVideos(img.id);

                    }}
                  >

                    <img
                      src={img.url}
                      alt=""
                    />

                  </div>

                ))}

              </div>

            </div>

            {/* VIDEO MANAGEMENT */}

            {selectedImage && (

              <div className="upload-card">

                <h2>
                  Manage Videos
                </h2>

                {/* SELECTED IMAGE */}

                <div
                  style={{
                    marginBottom: "25px"
                  }}
                >

                  <img
                    src={selectedImage.url}
                    alt=""
                    style={{
                      width: "180px",
                      borderRadius: "18px"
                    }}
                  />

                </div>

                {/* ADD VIDEO */}

                <div className="upload-controls">

                  <input
                    type="text"
                    placeholder="Paste YouTube URL"
                    value={videoUrl}
                    onChange={(e) =>
                      setVideoUrl(e.target.value)
                    }
                  />

                  <button
                    onClick={handleAddVideo}
                  >
                    Add Video
                  </button>

                </div>

                {/* VIDEO LIST */}

                <div className="video-url-list">

                  {imageVideos.length === 0 ? (

                    <p className="empty-text">
                      No videos added yet
                    </p>

                  ) : (

                    imageVideos.map((video) => (

                      <div
                        className="video-url-item"
                        key={video.id}
                      >

                        <span>
                          {video.youtube_url}
                        </span>

                        <button
                          onClick={() =>
                            handleDeleteVideo(video.id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    ))

                  )}

                </div>

              </div>

            )}

          </>

        )}

      </main>

    </div>

  );

};

export default Admin;