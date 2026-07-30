import React, { useEffect, useState } from "react";
import "./Admin.css";

const Admin = () => {

  const API = "https://ebdaa-backend-zbiy.onrender.com";

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

  // ================= BILLBOARDS =================

  const [billboards, setBillboards] = useState([]);

  const [rentals, setRentals] = useState([]);

  const [showRentalForm, setShowRentalForm] = useState(false);

  const [editingRental, setEditingRental] = useState(null);

  const [rentalForm, setRentalForm] = useState({
    billboard_id: "",
    customer_name: "",
    customer_phone: "",
    company_name: "",
    rent_start: "",
    rent_end: "",
    contract_price: "",
    notes: ""
  });

  const [billboardForm, setBillboardForm] = useState({
    board_code: "",
    area: "",
    address: "",
    width: "",
    height: "",
    faces: 1,
    total_area: "",
    status: "متاحة",
    notes: ""
  });

  const [editingBillboard, setEditingBillboard] = useState(null);

  const [showBillboardForm, setShowBillboardForm] = useState(false);

  // ================= LOGIN =================

  const handleLogin = async () => {

  try {

    const res = await fetch("https://ebdaa-backend-zbiy.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    const data = await res.json();

    if (res.ok && data.success) {

      setLoggedIn(true);

    } else {

      alert("اسم المستخدم أو كلمة المرور غير صحيحة");

    }

  } catch (err) {

    alert("تعذر الاتصال بالخادم");

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

  const fetchBillboards = async () => {
    try {

      const res = await fetch(`${API}/billboards`);

      const data = await res.json();

      setBillboards(data);

    } catch (err) {
      console.error(err);
    }
  };

  const fetchRentals = async () => {

    try {

      const res = await fetch(`${API}/rentals`);

      console.log("Status:", res.status);

      const text = await res.text();

      console.log("Response:", text);

      const data = JSON.parse(text);

      setRentals(data);

    } catch (err) {

      console.error("FETCH RENTALS ERROR:", err);

    }

  };

  // ================= ADD BILLBOARD =================

  const handleBillboardSubmit = async () => {

    try {

      const payload = {
        ...billboardForm,
        width: Number(billboardForm.width),
        height: Number(billboardForm.height),
        faces: Number(billboardForm.faces),
        total_area:
          Number(billboardForm.width) *
          Number(billboardForm.height)
      };

      if (editingBillboard) {

        await fetch(`${API}/billboards/${editingBillboard.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        alert("تم تعديل اللوحة بنجاح");

      } else {

        await fetch(`${API}/billboards`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        alert("تمت إضافة اللوحة");

      }

      fetchBillboards();

      setShowBillboardForm(false);

      setEditingBillboard(null);

      setBillboardForm({
        board_code: "",
        area: "",
        address: "",
        width: "",
        height: "",
        faces: 1,
        total_area: "",
        status: "متاحة",
        notes: ""
      });

    } catch (err) {

      console.error(err);

      alert("حدث خطأ");

    }

  };

  const handleRentalSubmit = async () => {

    try {

      const method = editingRental ? "PUT" : "POST";

      const url = editingRental
        ? `${API}/rentals/${editingRental.id}`
        : `${API}/rentals`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(rentalForm)
      });

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        alert(data.error || "حدث خطأ");
        return;
      }

      alert(
        editingRental
          ? "تم تعديل العقد"
          : "تمت إضافة العقد"
      );

      fetchRentals();
      fetchBillboards();

      setShowRentalForm(false);

    } catch (err) {

      console.error(err);
      alert("حدث خطأ في الاتصال بالخادم");

    }

  };


  // ================= DELETE BILLBOARD =================

  const handleDeleteBillboard = async (id) => {

    if (!window.confirm("هل تريد حذف اللوحة؟")) return;

    try {

      await fetch(`${API}/billboards/${id}`, {
        method: "DELETE"
      });

      fetchBillboards();

    } catch (err) {

      console.error(err);

    }

  };

  const handleDeleteRental = async (id) => {

    if (!window.confirm("هل تريد حذف هذا العقد؟"))
      return;

    await fetch(`${API}/rentals/${id}`, {
      method: "DELETE"
    });

    fetchRentals();
  };


  // ================= EDIT BILLBOARD =================

  const handleEditBillboard = (billboard) => {

    setEditingBillboard(billboard);

    setBillboardForm(billboard);

    setShowBillboardForm(true);

  };

  // ================= EFFECT =================

  useEffect(() => {

    if (loggedIn) {

      fetchImages();

      fetchBillboards();

      fetchRentals();

      setSelectedImage(null);

      setImageVideos([]);

    }

  }, [category, loggedIn]);

  // ================= UPLOAD =================

  const handleUpload = async () => {

    if (!file) {
      alert("يرجى اختيار صورة");
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

      alert("تم رفع الصورة بنجاح ✅");

      setFile(null);

      fetchImages();

    } catch (err) {

      console.error(err);

      alert("فشل رفع الصورة ❌");

    } finally {

      setLoading(false);

    }

  };

  // ================= DELETE IMAGE =================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "هل أنت متأكد من حذف هذه الصورة؟"
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

      alert("فشل حذف الصورة");

    }

  };

  // ================= ADD VIDEO =================

  const handleAddVideo = async () => {

    if (!selectedImage) {
      alert("يرجى اختيار صورة أولاً");
      return;
    }

    if (!videoUrl) {
      alert("يرجى إدخال رابط يوتيوب");
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

      alert("تمت إضافة الفيديو بنجاح ✅");

    } catch (err) {

      console.error(err);

      alert("حدث خطأ");

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

              <h1>إبداع ميديا</h1>

              <p>
                لوحة إدارة مؤسسة إبداع ميديا
              </p>

              <div className="login-features">

                <div>
                  • إدارة معرض الصور
                </div>

                <div>
                  • إدارة فيديوهات الأعمال
                </div>

                <div>
                  • إدارة اللوحات الإعلانية
                </div>

                <div>
                  • إدارة المحتوى بسهولة وأمان
                </div>

              </div>

            </div>

          </div>

          <div className="login-right">

            <div className="login-form">

              <h2>تسجيل الدخول</h2>

              <input
                type="text"
                placeholder="اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button onClick={handleLogin}>
                دخول
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
          <h2>إبداع ميديا</h2>
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
            الصور
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
            الفيديوهات
          </div>

          <div
            className={`
              sidebar-item
              ${activePanel === "billboards" ? "active" : ""}
            `}
            onClick={() => setActivePanel("billboards")}
          >
            اللوحات الإعلانية
          </div>

          <div
            className={`
              sidebar-item
              ${activePanel === "rentals" ? "active" : ""}
            `}
            onClick={() => setActivePanel("rentals")}
          >
            عقود الإيجار
          </div>

        </div>

        <button
          className="logout-btn"
          onClick={() => setLoggedIn(false)}
        >
          تسجيل الخروج
        </button>

      </aside>

      {/* MAIN */}

      <main className="main-content">

        {/* TOPBAR */}

        <div className="topbar">

          <div>

            <h1>
              {
                activePanel === "images"
                  ?
                  "إدارة الصور"
                  :
                  activePanel === "videos"
                    ?
                    "إدارة الفيديوهات"
                    :
                    activePanel === "billboards"
                      ?
                      "إدارة اللوحات الإعلانية"
                      :
                      "إدارة عقود الإيجار"
              }
            </h1>

            <p>
              إدارة محتوى مؤسسة إبداع ميديا
            </p>

          </div>

          <div className="topbar-user">
            المشرف
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

                <p>إجمالي الصور</p>

              </div>

              <div className="stat-card">

                <h3>{category}</h3>

                <p>القسم الحالي</p>

              </div>

              <div className="stat-card">

                <h3>إبداع ميديا</h3>

                <p>مؤسسة إبداع ميديا</p>

              </div>

            </div>

            {/* CATEGORY */}

            <div className="upload-card">

              <h2>اختر القسم</h2>

              <div className="upload-controls">

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                >

                  <option value="digital">
                    التصميم الرقمي
                  </option>

                  <option value="video">
                    إنتاج الفيديو
                  </option>

                  <option value="motion">
                    الموشن جرافيك
                  </option>

                </select>

              </div>

            </div>

            {/* UPLOAD */}

            <div className="upload-card">

              <h2>رفع صورة جديدة</h2>

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
                    ? "جاري الرفع..."
                    : "رفع الصورة"}

                </button>

              </div>

            </div>

            {/* GALLERY */}

            <div className="gallery-section">

              <div className="section-header">

                <h2>معرض الصور</h2>

              </div>

              {images.length === 0 ? (

                <p className="empty-text">
                  لا توجد صور
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
                          حذف
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

                <p>الفيديوهات</p>

              </div>

              <div className="stat-card">

                <h3>{category}</h3>

                <p>القسم الحالي</p>

              </div>

              <div className="stat-card">

                <h3>
                  {selectedImage
                    ? selectedImage.id
                    : "-"
                  }
                </h3>

                <p>الصورة المحددة</p>

              </div>

            </div>

            {/* CATEGORY */}

            <div className="upload-card">

              <h2>اختر القسم</h2>

              <div className="upload-controls">

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >

                  <option value="digital">
                    التصميم الرقمي
                  </option>

                  <option value="video">
                    إنتاج الفيديو
                  </option>

                  <option value="motion">
                    الموشن جرافيك
                  </option>

                </select>

              </div>

            </div>

            {/* IMAGE SELECT */}

            <div className="gallery-section">

              <div className="section-header">

                <h2>
                  اختر الصورة
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
                  إدارة الفيديوهات
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
                    placeholder="ألصق رابط يوتيوب"
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
                      لا توجد فيديوهات
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
        {
          activePanel === "billboards" && (

            <div className="gallery-section">

              <div
                className="section-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >

                <h2>إدارة اللوحات الإعلانية</h2>

                <button
                  onClick={() => {
                    setEditingBillboard(null);

                    setBillboardForm({
                      board_code: "",
                      area: "",
                      address: "",
                      width: "",
                      height: "",
                      faces: 1,
                      total_area: "",
                      status: "Available",
                      notes: ""
                    });

                    setShowBillboardForm(true);

                  }}
                >

                  إضافة لوحة

                </button>

              </div>

              <table className="billboard-table">

                <thead>

                  <tr>

                    <th>الكود</th>

                    <th>المنطقة</th>

                    <th>المقاس</th>

                    <th>الوجوه</th>

                    <th>الحالة</th>

                    <th>تعديل</th>

                    <th>حذف</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    billboards.map(board => (

                      <tr key={board.id}>

                        <td>{board.board_code}</td>

                        <td>{board.area}</td>

                        <td>

                          {board.width} × {board.height}

                        </td>

                        <td>{board.faces}</td>

                        <td>{board.status}</td>

                        <td>

                          <button
                            className="edit-btn"
                            onClick={() => handleEditBillboard(board)}
                          >

                            تعديل

                          </button>

                        </td>

                        <td>

                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteBillboard(board.id)}
                          >

                            حذف

                          </button>

                        </td>

                      </tr>

                    ))
                  }

                </tbody>

              </table>

            </div>

          )
        }


        {
          showBillboardForm && (

            <div className="modal-overlay">

              <div className="modal">

                <h2>

                  {
                    editingBillboard
                      ?

                      "تعديل لوحة"

                      :

                      "إضافة لوحة"

                  }

                </h2>

                <div className="billboard-form">

                  <input
                    placeholder="كود اللوحة"
                    value={billboardForm.board_code}
                    onChange={(e) =>
                      setBillboardForm({
                        ...billboardForm,
                        board_code: e.target.value
                      })
                    }
                  />

                  <input
                    placeholder="المنطقة"
                    value={billboardForm.area}
                    onChange={(e) =>
                      setBillboardForm({
                        ...billboardForm,
                        area: e.target.value
                      })
                    }
                  />

                  <input
                    placeholder="العنوان"
                    value={billboardForm.address}
                    onChange={(e) =>
                      setBillboardForm({
                        ...billboardForm,
                        address: e.target.value
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="العرض (متر)"
                    value={billboardForm.width}
                    onChange={(e) =>
                      setBillboardForm({
                        ...billboardForm,
                        width: e.target.value
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="الارتفاع (متر)"
                    value={billboardForm.height}
                    onChange={(e) =>
                      setBillboardForm({
                        ...billboardForm,
                        height: e.target.value
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="عدد الوجوه"
                    value={billboardForm.faces}
                    onChange={(e) =>
                      setBillboardForm({
                        ...billboardForm,
                        faces: e.target.value
                      })
                    }
                  />

                  <select
                    value={billboardForm.status}
                    onChange={(e) =>
                      setBillboardForm({
                        ...billboardForm,
                        status: e.target.value
                      })
                    }
                  >
                    <option>متاحة</option>
                    <option>مؤجرة</option>
                    <option>تحت الصيانة</option>
                  </select>

                  <textarea
                    placeholder="ملاحظات"
                    value={billboardForm.notes}
                    onChange={(e) =>
                      setBillboardForm({
                        ...billboardForm,
                        notes: e.target.value
                      })
                    }
                  />

                  <div className="total-area-preview">
                    المساحة الإجمالية:{" "}
                    {(Number(billboardForm.width) || 0) *
                      (Number(billboardForm.height) || 0)} م²
                  </div>

                  <div className="form-buttons">

                    <button onClick={handleBillboardSubmit}>
                      حفظ
                    </button>

                    <button
                      onClick={() => setShowBillboardForm(false)}
                    >
                      إلغاء
                    </button>

                  </div>

                </div>

              </div>

            </div>

          )
        }

        {
          activePanel === "rentals" && (

            <div className="gallery-section">

              <div
                className="section-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >

                <h2>إدارة عقود الإيجار</h2>

                <button
                  onClick={() => {

                    setEditingRental(null);

                    setRentalForm({
                      billboard_id: "",
                      customer_name: "",
                      customer_phone: "",
                      company_name: "",
                      rent_start: "",
                      rent_end: "",
                      contract_price: "",
                      notes: ""
                    });

                    setShowRentalForm(true);

                  }}
                >


                  إضافة عقد

                </button>

              </div>

              <table className="billboard-table">

                <thead>

                  <tr>

                    <th>كود اللوحة</th>

                    <th>المنطقة</th>

                    <th>العميل</th>

                    <th>الهاتف</th>

                    <th>الشركة</th>

                    <th>بداية العقد</th>

                    <th>نهاية العقد</th>

                    <th>تعديل</th>

                    <th>حذف</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    rentals.map(rental => (

                      <tr key={rental.id}>

                        <td>{rental.board_code}</td>

                        <td>{rental.area}</td>

                        <td>{rental.customer_name}</td>

                        <td>{rental.customer_phone}</td>

                        <td>{rental.company_name}</td>

                        <td>{rental.rent_start?.slice(0, 10)}</td>

                        <td>{rental.rent_end?.slice(0, 10)}</td>

                        <td>

                          <button
                            className="edit-btn"
                            onClick={() => {

                              setEditingRental(rental);

                              setRentalForm({
                                billboard_id: rental.billboard_id,
                                customer_name: rental.customer_name,
                                customer_phone: rental.customer_phone,
                                company_name: rental.company_name,
                                rent_start: rental.rent_start.slice(0, 10),
                                rent_end: rental.rent_end.slice(0, 10),
                                contract_price: rental.contract_price,
                                notes: rental.notes
                              });

                              setShowRentalForm(true);

                            }}
                          >

                            تعديل

                          </button>

                        </td>

                        <td>

                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteRental(rental.id)}
                          >

                            حذف

                          </button>

                        </td>

                      </tr>

                    ))
                  }

                </tbody>

              </table>

            </div>

          )
        }

        {
          showRentalForm && (

            <div className="modal-overlay">

              <div className="modal">

                <h2>

                  {
                    editingRental
                      ?
                      "تعديل عقد"
                      :
                      "إضافة عقد جديد"
                  }

                </h2>

                <div className="billboard-form">

                  <select
                    value={rentalForm.billboard_id}
                    onChange={(e) =>
                      setRentalForm({
                        ...rentalForm,
                        billboard_id: e.target.value
                      })
                    }
                  >

                    <option value="">
                      اختر اللوحة
                    </option>

                    {
                      billboards.map(board => (

                        <option
                          key={board.id}
                          value={board.id}
                        >

                          {board.board_code} - {board.area}

                        </option>

                      ))
                    }

                  </select>

                  <input
                    placeholder="اسم العميل"
                    value={rentalForm.customer_name}
                    onChange={(e) =>
                      setRentalForm({
                        ...rentalForm,
                        customer_name: e.target.value
                      })
                    }
                  />

                  <input
                    placeholder="رقم الهاتف"
                    value={rentalForm.customer_phone}
                    onChange={(e) =>
                      setRentalForm({
                        ...rentalForm,
                        customer_phone: e.target.value
                      })
                    }
                  />

                  <input
                    placeholder="اسم الشركة"
                    value={rentalForm.company_name}
                    onChange={(e) =>
                      setRentalForm({
                        ...rentalForm,
                        company_name: e.target.value
                      })
                    }
                  />

                  <input
                    type="date"
                    value={rentalForm.rent_start}
                    onChange={(e) =>
                      setRentalForm({
                        ...rentalForm,
                        rent_start: e.target.value
                      })
                    }
                  />

                  <input
                    type="date"
                    value={rentalForm.rent_end}
                    onChange={(e) =>
                      setRentalForm({
                        ...rentalForm,
                        rent_end: e.target.value
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="قيمة العقد"
                    value={rentalForm.contract_price}
                    onChange={(e) =>
                      setRentalForm({
                        ...rentalForm,
                        contract_price: e.target.value
                      })
                    }
                  />

                  <textarea
                    placeholder="ملاحظات"
                    value={rentalForm.notes}
                    onChange={(e) =>
                      setRentalForm({
                        ...rentalForm,
                        notes: e.target.value
                      })
                    }
                  />

                  <div className="form-buttons">

                    <button onClick={handleRentalSubmit}>
                      حفظ
                    </button>

                    <button
                      onClick={() =>
                        setShowRentalForm(false)
                      }
                    >
                      إلغاء
                    </button>

                  </div>

                </div>

              </div>

            </div>

          )
        }
      </main>

    </div>

  );

};

export default Admin;