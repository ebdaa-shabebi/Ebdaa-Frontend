import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./Admin.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const API = "https://ebdaa-backend-zbiy.onrender.com";
const BILLBOARD_PORTFOLIO_CATEGORY = "billboard-portfolio";
const ADMIN_SESSION_STORAGE_KEY = "ebdaa_admin_session_v1";
const DEFAULT_ADMIN_SESSION_SECONDS = 8 * 60 * 60;

// Restore a saved admin token after a page refresh, provided it has not expired.
function readSavedAdminSession() {
  try {
    const raw = window.localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw);
    const expiresAt = Number(session?.expiresAt);

    if (!session?.token || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
      window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
      return null;
    }

    return { token: String(session.token), expiresAt };
  } catch (error) {
    console.warn("Could not restore saved admin session:", error);
    try {
      window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
    } catch {
      // Storage may be unavailable in strict privacy mode.
    }
    return null;
  }
}

const EMPTY_BILLBOARD = {
  board_code: "",
  area: "",
  address: "",
  width: "",
  height: "",
  faces: 1,
  total_area: "",
  status: "متاحة",
  notes: "",
};

const EMPTY_RENTAL = {
  billboard_id: "",
  customer_name: "",
  customer_phone: "",
  company_name: "",
  rent_start: "",
  rent_end: "",
  contract_price: "",
  notes: "",
};

const EMPTY_WEBSITE_CLIENT = {
  name: "",
  website_url: "",
  sort_order: 0,
};

const WORK_PANELS = [
  { id: "motion", category: "motion", label: "تصميم موشن جرافيك", icon: "✦" },
  { id: "video", category: "video", label: "تصوير وإنتاج فيديو إعلاني", icon: "▷" },
];

const PANELS = [
  { id: "dashboard", label: "الرئيسية", icon: "⌂" },
  ...WORK_PANELS,
  { id: "billboardPortfolio", label: "حملات إعلانية", icon: "▤" },
  { id: "websiteClients", label: "تصميم مواقع إلكترونية", icon: "◎" },
  { id: "billboards", label: "مخزون اللوحات", icon: "▦" },
  { id: "rentals", label: "عقود الإيجار", icon: "▤" },
  { id: "alerts", label: "تنبيهات العقود", icon: "!" },
];

const PANEL_TITLES = Object.fromEntries(PANELS.map(({ id, label }) => [id, label]));

async function readResponse(response) {
  const raw = await response.text();
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return { message: raw };
  }
}

function getApiError(data, fallback) {
  return data?.message || data?.error || (typeof data === "string" ? data : "") || fallback;
}

function formatDate(date) {
  if (!date) return "—";
  return String(date).slice(0, 10);
}

function getRemainingDays(endDate) {
  if (!endDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(`${String(endDate).slice(0, 10)}T00:00:00`);
  if (Number.isNaN(end.getTime())) return null;
  return Math.ceil((end.getTime() - today.getTime()) / 86400000);
}

function getContractAlert(days) {
  if (days === null || days === undefined) return null;
  if (days < 0) return { text: "انتهى العقد", tone: "expired", icon: "!" };
  if (days <= 30) return { text: `${days} يوم`, tone: "danger", icon: "!" };
  if (days <= 90) return { text: `${days} يوم`, tone: "warning", icon: "•" };
  if (days <= 180) return { text: `${days} يوم`, tone: "success", icon: "•" };
  return null;
}

function EmptyState({ title = "لا توجد بيانات بعد", detail = "ستظهر العناصر هنا بعد إضافتها." }) {
  return (
    <div className="admin-empty">
      <span className="admin-empty__icon" aria-hidden="true">◇</span>
      <strong>{title}</strong>
      <p>{detail}</p>
    </div>
  );
}

function SectionHeading({ title, description, action }) {
  return (
    <div className="admin-section-heading">
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action || null}
    </div>
  );
}

const Admin = () => {
  const [initialSession] = useState(() => readSavedAdminSession());
  const [token, setToken] = useState(() => initialSession?.token || "");
  const [sessionExpiresAt, setSessionExpiresAt] = useState(() => initialSession?.expiresAt || 0);
  const [loggedIn, setLoggedIn] = useState(() => Boolean(initialSession?.token));
  const [loginLoading, setLoginLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activePanel, setActivePanel] = useState("dashboard");
  const activeWorkPanel = WORK_PANELS.find((panel) => panel.id === activePanel) || null;
  const category = activeWorkPanel?.category || "motion";
  const [globalError, setGlobalError] = useState("");

  // Standard image and video portfolio.
  const [images, setImages] = useState([]);
  const imagesRequestId = useRef(0);
  const [file, setFile] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageVideos, setImageVideos] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);
  const [selectedImageLoading, setSelectedImageLoading] = useState(false);

  // Campaign logos and each logo's billboard photos use category-specific rows in images.
  const [billboardImages, setBillboardImages] = useState([]);
  const [billboardImageFile, setBillboardImageFile] = useState(null);
  const [billboardImageLoading, setBillboardImageLoading] = useState(false);
  const [selectedBillboardLogo, setSelectedBillboardLogo] = useState(null);
  const [billboardPhotos, setBillboardPhotos] = useState([]);
  const [billboardPhotoFile, setBillboardPhotoFile] = useState(null);
  const [billboardPhotoLoading, setBillboardPhotoLoading] = useState(false);
  const [billboardPhotosLoading, setBillboardPhotosLoading] = useState(false);

  // Website logo + URL records use website_clients.
  const [websiteClients, setWebsiteClients] = useState([]);
  const [websiteForm, setWebsiteForm] = useState(EMPTY_WEBSITE_CLIENT);
  const [websiteLogo, setWebsiteLogo] = useState(null);
  const [editingWebsiteClient, setEditingWebsiteClient] = useState(null);
  const [websiteSaving, setWebsiteSaving] = useState(false);

  // Existing physical billboard inventory + rental features.
  const [billboards, setBillboards] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [billboardForm, setBillboardForm] = useState(EMPTY_BILLBOARD);
  const [editingBillboard, setEditingBillboard] = useState(null);
  const [showBillboardForm, setShowBillboardForm] = useState(false);
  const [rentalForm, setRentalForm] = useState(EMPTY_RENTAL);
  const [editingRental, setEditingRental] = useState(null);
  const [showRentalForm, setShowRentalForm] = useState(false);
  const [recordSaving, setRecordSaving] = useState(false);

  const clearAdminSession = useCallback(() => {
    try {
      window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
    } catch (error) {
      console.warn("Could not clear saved admin session:", error);
    }
    setToken("");
    setSessionExpiresAt(0);
    setLoggedIn(false);
  }, []);

  const apiRequest = useCallback(async (path, options = {}, requiresAuth = true) => {
    const headers = new Headers(options.headers || {});
    if (requiresAuth && token) headers.set("Authorization", `Bearer ${token}`);

    const response = await fetch(`${API}${path}`, { ...options, headers });
    const data = await readResponse(response);

    if (!response.ok) {
      if (requiresAuth && response.status === 401) {
        clearAdminSession();
      }
      throw new Error(getApiError(data, `فشل الطلب (HTTP ${response.status})`));
    }
    return data;
  }, [token, clearAdminSession]);

  // Expire the saved session at the same time as the server-issued token.
  useEffect(() => {
    if (!loggedIn || !token || !sessionExpiresAt) return undefined;

    const remainingMs = sessionExpiresAt - Date.now();
    if (remainingMs <= 0) {
      clearAdminSession();
      window.alert("انتهت صلاحية جلسة الإدارة. يرجى تسجيل الدخول مجددًا.");
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      clearAdminSession();
      window.alert("انتهت صلاحية جلسة الإدارة. يرجى تسجيل الدخول مجددًا.");
    }, remainingMs);

    return () => window.clearTimeout(timeoutId);
  }, [loggedIn, token, sessionExpiresAt, clearAdminSession]);

  const fetchImages = useCallback(async (requestedCategory) => {
    const requestId = ++imagesRequestId.current;
    try {
      const data = await apiRequest(`/images/${encodeURIComponent(requestedCategory)}`, {}, false);
      if (!Array.isArray(data)) throw new Error("استجابة الصور غير صحيحة من الخادم.");
      if (requestId !== imagesRequestId.current) return;
      setImages(data);
      setGlobalError("");
    } catch (error) {
      if (requestId !== imagesRequestId.current) return;
      console.error("Fetch images failed:", error);
      setImages([]);
      setGlobalError(`تعذر تحميل الصور: ${error.message}`);
    }
  }, [apiRequest]);

  const fetchVideos = useCallback(async (imageId) => {
    setSelectedImageLoading(true);
    try {
      const data = await apiRequest(`/image-video/${imageId}`, {}, false);
      if (!Array.isArray(data)) throw new Error("استجابة الفيديوهات غير صحيحة من الخادم.");
      setImageVideos(data);
    } catch (error) {
      console.error("Fetch videos failed:", error);
      setImageVideos([]);
      window.alert(`تعذر تحميل الفيديوهات: ${error.message}`);
    } finally {
      setSelectedImageLoading(false);
    }
  }, [apiRequest]);

  const fetchBillboardImages = useCallback(async () => {
    try {
      const data = await apiRequest(`/images/${BILLBOARD_PORTFOLIO_CATEGORY}`, {}, false);
      if (!Array.isArray(data)) throw new Error("استجابة صور اللوحات غير صحيحة.");
      setBillboardImages(data);
    } catch (error) {
      console.error("Fetch billboard portfolio failed:", error);
      setBillboardImages([]);
      setGlobalError(`تعذر تحميل صور معرض اللوحات: ${error.message}`);
    }
  }, [apiRequest]);

  const fetchBillboardPhotos = useCallback(async (logoId) => {
    if (!logoId) {
      setBillboardPhotos([]);
      return;
    }
    setBillboardPhotosLoading(true);
    try {
      const categoryName = `${BILLBOARD_PORTFOLIO_CATEGORY}-${logoId}`;
      const data = await apiRequest(`/images/${encodeURIComponent(categoryName)}`, {}, false);
      if (!Array.isArray(data)) throw new Error("استجابة صور اللوحة غير صحيحة.");
      setBillboardPhotos(data);
    } catch (error) {
      console.error("Fetch campaign billboard photos failed:", error);
      setBillboardPhotos([]);
      setGlobalError(`تعذر تحميل صور الحملة: ${error.message}`);
    } finally {
      setBillboardPhotosLoading(false);
    }
  }, [apiRequest]);

  const fetchWebsiteClients = useCallback(async () => {
    try {
      const data = await apiRequest("/website-clients", {}, false);
      if (!Array.isArray(data)) throw new Error("استجابة المواقع الإلكترونية غير صحيحة.");
      setWebsiteClients(data);
    } catch (error) {
      console.error("Fetch website clients failed:", error);
      setWebsiteClients([]);
      setGlobalError(`تعذر تحميل المواقع الإلكترونية: ${error.message}`);
    }
  }, [apiRequest]);

  const fetchBillboards = useCallback(async () => {
    try {
      const data = await apiRequest("/billboards");
      if (!Array.isArray(data)) throw new Error("استجابة اللوحات غير صحيحة.");
      setBillboards(data);
    } catch (error) {
      console.error("Fetch billboards failed:", error);
      setGlobalError(`تعذر تحميل مخزون اللوحات: ${error.message}`);
    }
  }, [apiRequest]);

  const fetchRentals = useCallback(async () => {
    try {
      const data = await apiRequest("/rentals");
      if (!Array.isArray(data)) throw new Error("استجابة العقود غير صحيحة.");
      setRentals(data);
    } catch (error) {
      console.error("Fetch rentals failed:", error);
      setGlobalError(`تعذر تحميل عقود الإيجار: ${error.message}`);
    }
  }, [apiRequest]);

  useEffect(() => {
    if (!loggedIn || !token) return;
    fetchBillboards();
    fetchRentals();
    fetchBillboardImages();
    fetchWebsiteClients();
  }, [loggedIn, token, fetchBillboards, fetchRentals, fetchBillboardImages, fetchWebsiteClients]);

  useEffect(() => {
    if (!loggedIn || !token || !activeWorkPanel) return;
    setImages([]);
    fetchImages(activeWorkPanel.category);
    setFile(null);
    setSelectedImage(null);
    setImageVideos([]);
    setVideoUrl("");
    const input = document.getElementById("portfolio-image-file");
    if (input) input.value = "";
    return () => {
      imagesRequestId.current += 1;
    };
  }, [loggedIn, token, activeWorkPanel, fetchImages]);

  const handleLogin = async (event) => {
    event?.preventDefault();
    if (!username.trim() || !password) {
      window.alert("أدخل اسم المستخدم وكلمة المرور.");
      return;
    }
    setLoginLoading(true);
    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await readResponse(response);
      if (!response.ok || !data?.success || !data?.token) {
        throw new Error(getApiError(data, "اسم المستخدم أو كلمة المرور غير صحيحة."));
      }
      const providedLifetime = Number(data.expiresIn);
      const lifetimeSeconds = Number.isFinite(providedLifetime) && providedLifetime > 0
        ? providedLifetime
        : DEFAULT_ADMIN_SESSION_SECONDS;
      const expiresAt = Date.now() + lifetimeSeconds * 1000;

      // Persist the server-issued bearer token so refresh does not log the admin out.
      // If browser storage is disabled, the current tab can still stay logged in.
      try {
        window.localStorage.setItem(
          ADMIN_SESSION_STORAGE_KEY,
          JSON.stringify({ token: data.token, expiresAt }),
        );
      } catch (storageError) {
        console.warn("Admin session could not be saved in browser storage:", storageError);
      }

      setToken(data.token);
      setSessionExpiresAt(expiresAt);
      setLoggedIn(true);
      setPassword("");
      setActivePanel("dashboard");
      setGlobalError("");
    } catch (error) {
      console.error("Admin login failed:", error);
      window.alert(error.message || "تعذر الاتصال بالخادم.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setPassword("");
    setSelectedImage(null);
    setImageVideos([]);
    setSelectedBillboardLogo(null);
    setBillboardPhotos([]);
    setActivePanel("dashboard");
  };

  const handleUpload = async (event) => {
    event?.preventDefault();
    if (!file) {
      window.alert("يرجى اختيار صورة أولاً.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", category);

    try {
      setImageLoading(true);
      const data = await apiRequest("/upload", { method: "POST", body: formData });
      await fetchImages(category);
      setFile(null);
      const input = document.getElementById("portfolio-image-file");
      if (input) input.value = "";
      window.alert(data.message || "تم رفع الصورة وحفظها بنجاح.");
    } catch (error) {
      console.error("Image upload failed:", error);
      window.alert(`لم يتم حفظ الصورة: ${error.message}`);
    } finally {
      setImageLoading(false);
    }
  };

  const handleDeleteImage = async (image) => {
    if (!window.confirm("هل تريد حذف هذه الصورة؟ سيتم حذف الفيديوهات المرتبطة بها أيضًا.")) return;
    try {
      const data = await apiRequest(`/delete/${image.id}`, { method: "DELETE" });
      if (selectedImage?.id === image.id) {
        setSelectedImage(null);
        setImageVideos([]);
      }
      await fetchImages(category);
      window.alert(data.message || "تم حذف الصورة بنجاح.");
    } catch (error) {
      console.error("Delete image failed:", error);
      window.alert(`لم يتم حذف الصورة: ${error.message}`);
    }
  };

  const handleSelectImageForVideos = async (image) => {
    setSelectedImage(image);
    setImageVideos([]);
    await fetchVideos(image.id);
  };

  const handleAddVideo = async (event) => {
    event?.preventDefault();
    if (!selectedImage) {
      window.alert("اختر صورة العمل أولاً.");
      return;
    }
    if (!videoUrl.trim()) {
      window.alert("أدخل رابط فيديو YouTube.");
      return;
    }
    try {
      setVideoLoading(true);
      const data = await apiRequest("/add-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_id: selectedImage.id, youtube_url: videoUrl.trim() }),
      });
      await fetchVideos(selectedImage.id);
      setVideoUrl("");
      window.alert(data.message || "تم حفظ الفيديو بنجاح.");
    } catch (error) {
      console.error("Add video failed:", error);
      window.alert(`لم يتم حفظ الفيديو: ${error.message}`);
    } finally {
      setVideoLoading(false);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm("هل تريد حذف هذا الفيديو؟")) return;
    try {
      const data = await apiRequest(`/delete-video/${videoId}`, { method: "DELETE" });
      if (selectedImage) await fetchVideos(selectedImage.id);
      window.alert(data.message || "تم حذف الفيديو بنجاح.");
    } catch (error) {
      console.error("Delete video failed:", error);
      window.alert(`لم يتم حذف الفيديو: ${error.message}`);
    }
  };

  const handleUploadBillboardImage = async (event) => {
    event?.preventDefault();
    if (!billboardImageFile) {
      window.alert("اختر شعار الشركة أولاً.");
      return;
    }
    const formData = new FormData();
    formData.append("image", billboardImageFile);
    formData.append("category", BILLBOARD_PORTFOLIO_CATEGORY);
    try {
      setBillboardImageLoading(true);
      const data = await apiRequest("/upload", { method: "POST", body: formData });
      await fetchBillboardImages();
      setBillboardImageFile(null);
      const input = document.getElementById("billboard-image-file");
      if (input) input.value = "";
      window.alert(data.message || "تم حفظ شعار الشركة بنجاح.");
    } catch (error) {
      console.error("Campaign logo upload failed:", error);
      window.alert(`لم يتم حفظ الشعار: ${error.message}`);
    } finally {
      setBillboardImageLoading(false);
    }
  };

  const handleSelectBillboardLogo = async (logo) => {
    setSelectedBillboardLogo(logo);
    setBillboardPhotos([]);
    await fetchBillboardPhotos(logo.id);
  };

  const handleUploadBillboardPhoto = async (event) => {
    event?.preventDefault();
    if (!selectedBillboardLogo) {
      window.alert("اختر شعار الشركة أولاً.");
      return;
    }
    if (!billboardPhotoFile) {
      window.alert("اختر صورة اللوحة الإعلانية أولاً.");
      return;
    }
    const formData = new FormData();
    formData.append("image", billboardPhotoFile);
    formData.append("category", `${BILLBOARD_PORTFOLIO_CATEGORY}-${selectedBillboardLogo.id}`);
    try {
      setBillboardPhotoLoading(true);
      const data = await apiRequest("/upload", { method: "POST", body: formData });
      await fetchBillboardPhotos(selectedBillboardLogo.id);
      setBillboardPhotoFile(null);
      const input = document.getElementById("billboard-photo-file");
      if (input) input.value = "";
      window.alert(data.message || "تم حفظ صورة اللوحة بنجاح.");
    } catch (error) {
      console.error("Campaign billboard photo upload failed:", error);
      window.alert(`لم يتم حفظ صورة اللوحة: ${error.message}`);
    } finally {
      setBillboardPhotoLoading(false);
    }
  };

  const handleDeleteBillboardPhoto = async (photo) => {
    if (!window.confirm("هل تريد حذف صورة هذه اللوحة من الحملة؟")) return;
    try {
      const data = await apiRequest(`/delete/${photo.id}`, { method: "DELETE" });
      if (selectedBillboardLogo) await fetchBillboardPhotos(selectedBillboardLogo.id);
      window.alert(data.message || "تم حذف صورة اللوحة بنجاح.");
    } catch (error) {
      console.error("Delete campaign billboard photo failed:", error);
      window.alert(`لم يتم حذف الصورة: ${error.message}`);
    }
  };

  const handleDeleteBillboardImage = async (logo) => {
    if (!window.confirm(`هل تريد حذف شعار ${logo.name || `الشركة رقم ${logo.id}`} وكل صور اللوحات المرتبطة به؟`)) return;
    try {
      const photoCategory = `${BILLBOARD_PORTFOLIO_CATEGORY}-${logo.id}`;
      const photos = await apiRequest(`/images/${encodeURIComponent(photoCategory)}`, {}, false);
      if (Array.isArray(photos)) {
        for (const photo of photos) {
          await apiRequest(`/delete/${photo.id}`, { method: "DELETE" });
        }
      }
      const data = await apiRequest(`/delete/${logo.id}`, { method: "DELETE" });
      if (selectedBillboardLogo?.id === logo.id) {
        setSelectedBillboardLogo(null);
        setBillboardPhotos([]);
        setBillboardPhotoFile(null);
      }
      await fetchBillboardImages();
      window.alert(data.message || "تم حذف الشركة وصور لوحاتها بنجاح.");
    } catch (error) {
      console.error("Delete campaign logo failed:", error);
      window.alert(`لم يتم حذف الشعار أو الصور المرتبطة به: ${error.message}`);
    }
  };

  const resetWebsiteForm = () => {
    setWebsiteForm(EMPTY_WEBSITE_CLIENT);
    setWebsiteLogo(null);
    setEditingWebsiteClient(null);
    const input = document.getElementById("website-client-logo");
    if (input) input.value = "";
  };

  const startEditWebsiteClient = (client) => {
    setEditingWebsiteClient(client);
    setWebsiteForm({ name: client.name, website_url: client.website_url, sort_order: client.sort_order ?? 0 });
    setWebsiteLogo(null);
    const input = document.getElementById("website-client-logo");
    if (input) input.value = "";
    document.getElementById("website-client-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleWebsiteSubmit = async (event) => {
    event?.preventDefault();
    if (!websiteForm.name.trim() || !websiteForm.website_url.trim()) {
      window.alert("أدخل اسم العميل ورابط الموقع.");
      return;
    }
    if (!editingWebsiteClient && !websiteLogo) {
      window.alert("اختر شعار العميل.");
      return;
    }
    const formData = new FormData();
    formData.append("name", websiteForm.name.trim());
    formData.append("website_url", websiteForm.website_url.trim());
    formData.append("sort_order", String(websiteForm.sort_order ?? 0));
    if (websiteLogo) formData.append("logo", websiteLogo);
    const path = editingWebsiteClient ? `/website-clients/${editingWebsiteClient.id}` : "/website-clients";

    try {
      setWebsiteSaving(true);
      const data = await apiRequest(path, {
        method: editingWebsiteClient ? "PUT" : "POST",
        body: formData,
      });
      await fetchWebsiteClients();
      resetWebsiteForm();
      window.alert(data.message || (editingWebsiteClient ? "تم تحديث الموقع بنجاح." : "تمت إضافة الموقع بنجاح."));
    } catch (error) {
      console.error("Save website client failed:", error);
      window.alert(`لم يتم حفظ بيانات الموقع: ${error.message}`);
    } finally {
      setWebsiteSaving(false);
    }
  };

  const handleDeleteWebsiteClient = async (client) => {
    if (!window.confirm(`هل تريد حذف موقع ${client.name}؟`)) return;
    try {
      const data = await apiRequest(`/website-clients/${client.id}`, { method: "DELETE" });
      await fetchWebsiteClients();
      if (editingWebsiteClient?.id === client.id) resetWebsiteForm();
      window.alert(data.message || "تم حذف الموقع بنجاح.");
    } catch (error) {
      console.error("Delete website client failed:", error);
      window.alert(`لم يتم حذف الموقع: ${error.message}`);
    }
  };

  const handleBillboardSubmit = async (event) => {
    event?.preventDefault();
    const payload = {
      ...billboardForm,
      board_code: String(billboardForm.board_code || "").trim(),
      area: String(billboardForm.area || "").trim(),
      address: String(billboardForm.address || "").trim(),
      width: Number(billboardForm.width),
      height: Number(billboardForm.height),
      faces: Number(billboardForm.faces),
      total_area: Number(billboardForm.width) * Number(billboardForm.height),
    };
    try {
      setRecordSaving(true);
      const data = await apiRequest(editingBillboard ? `/billboards/${editingBillboard.id}` : "/billboards", {
        method: editingBillboard ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await fetchBillboards();
      setShowBillboardForm(false);
      setEditingBillboard(null);
      setBillboardForm(EMPTY_BILLBOARD);
      window.alert(data.message || (editingBillboard ? "تم تحديث اللوحة بنجاح." : "تمت إضافة اللوحة بنجاح."));
    } catch (error) {
      console.error("Save billboard failed:", error);
      window.alert(`لم يتم حفظ بيانات اللوحة: ${error.message}`);
    } finally {
      setRecordSaving(false);
    }
  };

  const handleDeleteBillboard = async (billboard) => {
    if (!window.confirm(`هل تريد حذف اللوحة ${billboard.board_code}؟`)) return;
    try {
      const data = await apiRequest(`/billboards/${billboard.id}`, { method: "DELETE" });
      await Promise.all([fetchBillboards(), fetchRentals()]);
      window.alert(data.message || "تم حذف اللوحة بنجاح.");
    } catch (error) {
      console.error("Delete billboard failed:", error);
      window.alert(`لم يتم حذف اللوحة: ${error.message}`);
    }
  };

  const handleRentalSubmit = async (event) => {
    event?.preventDefault();
    try {
      setRecordSaving(true);
      const data = await apiRequest(editingRental ? `/rentals/${editingRental.id}` : "/rentals", {
        method: editingRental ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...rentalForm,
          billboard_id: Number(rentalForm.billboard_id),
          contract_price: rentalForm.contract_price === "" ? null : Number(rentalForm.contract_price),
        }),
      });
      await Promise.all([fetchRentals(), fetchBillboards()]);
      setShowRentalForm(false);
      setEditingRental(null);
      setRentalForm(EMPTY_RENTAL);
      window.alert(data.message || (editingRental ? "تم تحديث العقد بنجاح." : "تمت إضافة العقد بنجاح."));
    } catch (error) {
      console.error("Save rental failed:", error);
      window.alert(`لم يتم حفظ العقد: ${error.message}`);
    } finally {
      setRecordSaving(false);
    }
  };

  const handleDeleteRental = async (rental) => {
    if (!window.confirm("هل تريد حذف عقد الإيجار هذا؟")) return;
    try {
      const data = await apiRequest(`/rentals/${rental.id}`, { method: "DELETE" });
      await Promise.all([fetchRentals(), fetchBillboards()]);
      window.alert(data.message || "تم حذف العقد بنجاح.");
    } catch (error) {
      console.error("Delete rental failed:", error);
      window.alert(`لم يتم حذف العقد: ${error.message}`);
    }
  };

  const dashboardStats = useMemo(() => ({
    total: billboards.length,
    rented: billboards.filter((item) => item.status === "مؤجرة").length,
    available: billboards.filter((item) => item.status === "متاحة" || item.status === "Available").length,
    maintenance: billboards.filter((item) => item.status === "تحت الصيانة").length,
    alerts: rentals.filter((item) => getContractAlert(getRemainingDays(item.rent_end))).length,
  }), [billboards, rentals]);

  const chartData = useMemo(() => ({
    labels: ["مؤجرة", "متاحة", "تحت الصيانة"],
    datasets: [{
      data: [dashboardStats.rented, dashboardStats.available, dashboardStats.maintenance],
      backgroundColor: ["#2456a6", "#22a06b", "#f1a43c"],
      borderWidth: 0,
      hoverOffset: 5,
    }],
  }), [dashboardStats]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { usePointStyle: true, pointStyle: "circle", padding: 22, font: { family: "Tajawal, sans-serif", size: 13 } },
      },
    },
  }), []);

  if (!loggedIn) {
    return (
      <div className="admin-login-page" dir="rtl">
        <section className="admin-login-card">
          <div className="admin-login-brand">
            <p className="admin-eyebrow">إبداع ميديا</p>
            <h1>مساحة إدارة المحتوى</h1>
            <p className="admin-login-description">إدارة معرض الأعمال، مواقع العملاء، واللوحات والعقود من مكان واحد.</p>
            <div className="admin-login-list">
              <span>✓ إدارة المحتوى المرئي</span>
              <span>✓ تنظيم بيانات العملاء</span>
              <span>✓ متابعة اللوحات والعقود</span>
            </div>
          </div>
          <form className="admin-login-form" onSubmit={handleLogin}>
            <span className="admin-eyebrow">مرحبًا بعودتك</span>
            <h2>تسجيل الدخول</h2>
            <p>أدخل بيانات المشرف للمتابعة.</p>
            <label htmlFor="admin-username">اسم المستخدم</label>
            <input id="admin-username" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="اسم المستخدم" />
            <label htmlFor="admin-password">كلمة المرور</label>
            <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="كلمة المرور" />
            <button className="admin-button admin-button--primary admin-login-submit" type="submit" disabled={loginLoading}>
              {loginLoading ? "جارٍ تسجيل الدخول..." : "دخول إلى لوحة التحكم"}
            </button>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className="admin-shell" dir="rtl">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div><strong>إبداع ميديا</strong><small>لوحة الإدارة</small></div>
        </div>
        <div className="admin-nav-label">القائمة الرئيسية</div>
        <nav className="admin-nav" aria-label="التنقل داخل لوحة الإدارة">
          {PANELS.map((panel) => (
            <button key={panel.id} type="button" className={`admin-nav-item ${activePanel === panel.id ? "is-active" : ""}`} onClick={() => { setActivePanel(panel.id); setGlobalError(""); }}>
              <span className="admin-nav-icon" aria-hidden="true">{panel.icon}</span>
              <span>{panel.label}</span>
              {panel.id === "alerts" && dashboardStats.alerts > 0 ? <span className="admin-nav-count">{dashboardStats.alerts}</span> : null}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-user"><span className="admin-avatar">م</span><div><strong>المشرف</strong><small>صلاحية الإدارة</small></div></div>
          <button className="admin-logout" type="button" onClick={handleLogout}>↪ تسجيل الخروج</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <div className="admin-breadcrumb">إبداع ميديا <span>/</span> {PANEL_TITLES[activePanel]}</div>
            <h1>{PANEL_TITLES[activePanel]}</h1>
          </div>
          <div className="admin-topbar-meta"><span className="admin-online-dot" /> متصل بالخادم</div>
        </header>

        {globalError ? <div className="admin-inline-error" role="alert"><span>!</span><div>{globalError}</div><button type="button" onClick={() => setGlobalError("")} aria-label="إغلاق">×</button></div> : null}

        {activePanel === "dashboard" && (
          <>
            <section className="admin-welcome-banner">
              <div><p>نظرة عامة</p><h2>أهلًا بك في لوحة إدارة إبداع ميديا</h2><span>تابع أعمالك ومخزون اللوحات والعقود من لوحة واحدة.</span></div>
            </section>
            <section className="admin-stats-grid">
              <article className="admin-stat-card"><span className="admin-stat-icon admin-stat-icon--blue">▦</span><div><p>إجمالي اللوحات</p><strong>{dashboardStats.total}</strong></div></article>
              <article className="admin-stat-card"><span className="admin-stat-icon admin-stat-icon--green">✓</span><div><p>اللوحات المتاحة</p><strong>{dashboardStats.available}</strong></div></article>
              <article className="admin-stat-card"><span className="admin-stat-icon admin-stat-icon--orange">▣</span><div><p>اللوحات المؤجرة</p><strong>{dashboardStats.rented}</strong></div></article>
              <article className="admin-stat-card"><span className="admin-stat-icon admin-stat-icon--blue">⚒</span><div><p>تحت الصيانة</p><strong>{dashboardStats.maintenance}</strong></div></article>
              <article className="admin-stat-card"><span className="admin-stat-icon admin-stat-icon--red">!</span><div><p>العقود التي تحتاج متابعة</p><strong>{dashboardStats.alerts}</strong></div></article>
            </section>
            <section className="admin-dashboard-grid">
              <div className="admin-panel-card">
                <SectionHeading title="حالة اللوحات" description="توزيع اللوحات حسب حالتها الحالية." />
                <div className="admin-chart-wrap"><Doughnut data={chartData} options={chartOptions} /></div>
              </div>
              <div className="admin-panel-card">
                <SectionHeading title="إجراءات سريعة" description="انتقل مباشرة إلى القسم المطلوب." />
                <div className="admin-quick-links">
                  {WORK_PANELS.map((panel) => (
                    <button key={panel.id} type="button" onClick={() => setActivePanel(panel.id)}>
                      <span>{panel.icon}</span><div><strong>{panel.label}</strong><small>إدارة الصور والفيديوهات الخاصة بهذا القسم</small></div><b>←</b>
                    </button>
                  ))}
                  <button type="button" onClick={() => setActivePanel("billboardPortfolio")}><span>▤</span><div><strong>حملات إعلانية</strong><small>إدارة شعارات الشركات وصور اللوحات</small></div><b>←</b></button>
                  <button type="button" onClick={() => setActivePanel("websiteClients")}><span>◎</span><div><strong>تصميم مواقع إلكترونية</strong><small>إدارة شعارات العملاء وروابطهم</small></div><b>←</b></button>
                </div>
              </div>
            </section>
          </>
        )}

        {activeWorkPanel && (
          <section className="admin-panel-card admin-content-panel">
            <SectionHeading
              title={activeWorkPanel.label}
              description={`إدارة صور الأعمال وروابط الفيديو الخاصة بقسم ${activeWorkPanel.label} فقط. هذا القسم محدد مسبقًا ولا يحتاج إلى تغيير التصنيف.`}
            />
            <form className="admin-upload-row" onSubmit={handleUpload}>
              <label className="admin-field admin-file-field">
                <span>اختر صورة لهذا القسم</span>
                <input id="portfolio-image-file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </label>
              <button className="admin-button admin-button--primary" type="submit" disabled={imageLoading}>
                {imageLoading ? "جارٍ الرفع..." : "+ رفع صورة"}
              </button>
            </form>
            <div className="admin-grid-heading">
              <h3>صور {activeWorkPanel.label}</h3>
              <span>{images.length} صورة</span>
            </div>
            {images.length ? (
              <div className="admin-media-grid">
                {images.map((image) => (
                  <article className={`admin-media-card ${selectedImage?.id === image.id ? "admin-media-card--selected" : ""}`} key={image.id}>
                    <img src={image.url} alt="" loading="lazy" />
                    <div className="admin-media-card__footer admin-work-card__footer">
                      <span>#{image.id}</span>
                      <button className="admin-button admin-button--secondary admin-button--small" type="button" onClick={() => handleSelectImageForVideos(image)}>
                        {selectedImage?.id === image.id ? "محددة" : "إدارة الفيديوهات"}
                      </button>
                      <button className="admin-button admin-button--danger admin-button--small" type="button" onClick={() => handleDeleteImage(image)}>حذف</button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState title={`لا توجد صور في ${activeWorkPanel.label}`} detail="ارفع صورة من الأعلى لتظهر هنا ويمكنك ربط فيديوهات بها." />
            )}
            {selectedImage ? (
              <div className="admin-video-manager">
                <div className="admin-video-manager__title">
                  <img src={selectedImage.url} alt="" />
                  <div><h3>الفيديوهات المرتبطة بالصورة #{selectedImage.id}</h3><p>{activeWorkPanel.label}</p></div>
                </div>
                <form className="admin-upload-row admin-video-form" onSubmit={handleAddVideo}>
                  <label className="admin-field"><span>رابط YouTube</span><input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." required /></label>
                  <button className="admin-button admin-button--primary" type="submit" disabled={videoLoading}>{videoLoading ? "جارٍ الحفظ..." : "+ إضافة فيديو"}</button>
                </form>
                {selectedImageLoading ? <p className="admin-loading-text">جارٍ تحميل الفيديوهات...</p> : imageVideos.length ? (
                  <div className="admin-video-list">
                    {imageVideos.map((video) => (
                      <div className="admin-video-row" key={video.id}>
                        <span className="admin-video-play">▷</span>
                        <a href={video.youtube_url} target="_blank" rel="noreferrer" title={video.youtube_url}>{video.youtube_url}</a>
                        <button className="admin-button admin-button--danger admin-button--small" type="button" onClick={() => handleDeleteVideo(video.id)}>حذف</button>
                      </div>
                    ))}
                  </div>
                ) : <EmptyState title="لا توجد فيديوهات مرتبطة" detail="أضف رابط YouTube من الحقل أعلاه." />}
              </div>
            ) : null}
          </section>
        )}

        {activePanel === "billboardPortfolio" && (
          <>
            <section className="admin-panel-card admin-content-panel">
              <SectionHeading title="شعارات الشركات في الحملات الإعلانية" description="أضف شعار كل شركة أولاً، ثم اختره لإضافة صور اللوحات التابعة للحملة. هذا القسم منفصل عن مخزون اللوحات الفعلي." />
              <form className="admin-upload-row" onSubmit={handleUploadBillboardImage}>
                <label className="admin-field admin-file-field"><span>اختر شعار الشركة</span><input id="billboard-image-file" type="file" accept="image/*" onChange={(e) => setBillboardImageFile(e.target.files?.[0] || null)} /></label>
                <button className="admin-button admin-button--primary" type="submit" disabled={billboardImageLoading}>{billboardImageLoading ? "جارٍ الرفع..." : "+ إضافة شعار شركة"}</button>
              </form>
              <div className="admin-grid-heading"><h3>اختر الشركة لإدارة صور لوحاتها</h3><span>{billboardImages.length} شركة</span></div>
              {billboardImages.length ? (
                <div className="admin-media-grid">
                  {billboardImages.map((logo) => (
                    <article className={`admin-media-card ${selectedBillboardLogo?.id === logo.id ? "admin-media-card--selected" : ""}`} key={logo.id}>
                      <button className="admin-campaign-logo-select" type="button" onClick={() => handleSelectBillboardLogo(logo)} aria-label={`إدارة صور لوحات الشركة رقم ${logo.id}`}>
                        <img src={logo.url} alt={`شعار الشركة ${logo.id}`} loading="lazy" />
                        <span>{selectedBillboardLogo?.id === logo.id ? "الشركة المحددة ✓" : `الشركة #${logo.id} — إدارة الصور`}</span>
                      </button>
                      <div className="admin-media-card__footer"><span>شعار #{logo.id}</span><button className="admin-button admin-button--danger admin-button--small" type="button" onClick={() => handleDeleteBillboardImage(logo)}>حذف الشركة</button></div>
                    </article>
                  ))}
                </div>
              ) : <EmptyState title="لا توجد شركات مضافة" detail="أضف شعار الشركة أولاً، ثم أضف صور اللوحات الخاصة بها." />}
            </section>

            {selectedBillboardLogo ? (
              <section className="admin-panel-card admin-content-panel">
                <SectionHeading title={`صور لوحات الشركة #${selectedBillboardLogo.id}`} description="الصور المضافة هنا ستظهر تحت شعار الشركة نفسه في صفحة الحملات الإعلانية." action={<button className="admin-button admin-button--secondary" type="button" onClick={() => { setSelectedBillboardLogo(null); setBillboardPhotos([]); setBillboardPhotoFile(null); }}>إلغاء تحديد الشركة</button>} />
                <div className="admin-video-manager__title admin-campaign-selected-logo"><img src={selectedBillboardLogo.url} alt="" /><div><h3>الشركة المحددة</h3><p>أي صورة ترفعها الآن ستُربط بهذه الشركة فقط.</p></div></div>
                <form className="admin-upload-row" onSubmit={handleUploadBillboardPhoto}>
                  <label className="admin-field admin-file-field"><span>اختر صورة لوحة إعلانية</span><input id="billboard-photo-file" type="file" accept="image/*" onChange={(e) => setBillboardPhotoFile(e.target.files?.[0] || null)} /></label>
                  <button className="admin-button admin-button--primary" type="submit" disabled={billboardPhotoLoading}>{billboardPhotoLoading ? "جارٍ الرفع..." : "+ إضافة صورة لوحة"}</button>
                </form>
                <div className="admin-grid-heading"><h3>اللوحات المرتبطة بهذه الشركة</h3><span>{billboardPhotos.length} صورة</span></div>
                {billboardPhotosLoading ? <p className="admin-loading-text">جارٍ تحميل صور اللوحات...</p> : billboardPhotos.length ? (
                  <div className="admin-media-grid">
                    {billboardPhotos.map((photo) => (
                      <article className="admin-media-card" key={photo.id}>
                        <img src={photo.url} alt="صورة لوحة إعلانية" loading="lazy" />
                        <div className="admin-media-card__footer"><span>لوحة #{photo.id}</span><button className="admin-button admin-button--danger admin-button--small" type="button" onClick={() => handleDeleteBillboardPhoto(photo)}>حذف</button></div>
                      </article>
                    ))}
                  </div>
                ) : <EmptyState title="لا توجد صور لوحات لهذه الشركة" detail="ارفع أول صورة لوحة من الحقل أعلاه." />}
              </section>
            ) : null}
          </>
        )}

        {activePanel === "websiteClients" && (
          <>
            <section className="admin-panel-card admin-content-panel" id="website-client-form">
              <SectionHeading title={editingWebsiteClient ? "تعديل موقع إلكتروني" : "إضافة موقع إلكتروني"} description="أضف شعار العميل ورابط موقعه لعرضه ضمن أعمال تصميم المواقع." />
              <form className="admin-website-form" onSubmit={handleWebsiteSubmit}>
                <label className="admin-field"><span>اسم العميل</span><input value={websiteForm.name} onChange={(e) => setWebsiteForm({ ...websiteForm, name: e.target.value })} maxLength={150} placeholder="مثال: أنيس فون" required /></label>
                <label className="admin-field"><span>رابط الموقع</span><input type="url" value={websiteForm.website_url} onChange={(e) => setWebsiteForm({ ...websiteForm, website_url: e.target.value })} placeholder="https://example.com" required /></label>
                <label className="admin-field"><span>ترتيب العرض</span><input type="number" min="0" step="1" value={websiteForm.sort_order} onChange={(e) => setWebsiteForm({ ...websiteForm, sort_order: e.target.value })} /></label>
                <label className="admin-field admin-file-field"><span>شعار العميل {editingWebsiteClient ? "(اختياري عند التعديل)" : ""}</span><input id="website-client-logo" type="file" accept="image/*" onChange={(e) => setWebsiteLogo(e.target.files?.[0] || null)} required={!editingWebsiteClient} /></label>
                {editingWebsiteClient && !websiteLogo ? <div className="admin-current-logo"><img src={editingWebsiteClient.logo_url} alt="" /><span>سيتم الاحتفاظ بالشعار الحالي إذا لم تختر شعارًا جديدًا.</span></div> : null}
                <div className="admin-form-actions"><button className="admin-button admin-button--primary" type="submit" disabled={websiteSaving}>{websiteSaving ? "جارٍ الحفظ..." : editingWebsiteClient ? "حفظ التعديلات" : "+ إضافة الموقع"}</button>{editingWebsiteClient ? <button className="admin-button admin-button--secondary" type="button" onClick={resetWebsiteForm}>إلغاء التعديل</button> : null}</div>
              </form>
            </section>
            <section className="admin-panel-card admin-content-panel">
              <SectionHeading title="المواقع المضافة" description="يمكنك تعديل بيانات أي عميل أو حذفه من المعرض." />
              <div className="admin-grid-heading"><h3>عملاء تصميم المواقع</h3><span>{websiteClients.length} موقع</span></div>
              {websiteClients.length ? <div className="admin-website-grid">{websiteClients.map((client) => <article className="admin-website-card" key={client.id}><div className="admin-website-card__logo"><img src={client.logo_url} alt={client.name} loading="lazy" /></div><div className="admin-website-card__details"><strong>{client.name}</strong><a href={client.website_url} target="_blank" rel="noreferrer">زيارة الموقع ↗</a><small>ترتيب العرض: {client.sort_order}</small></div><div className="admin-website-card__actions"><button className="admin-button admin-button--secondary admin-button--small" type="button" onClick={() => startEditWebsiteClient(client)}>تعديل</button><button className="admin-button admin-button--danger admin-button--small" type="button" onClick={() => handleDeleteWebsiteClient(client)}>حذف</button></div></article>)}</div> : <EmptyState title="لا توجد مواقع مضافة" detail="أضف أول شعار ورابط موقع ليظهرا هنا بعد الحفظ." />}
            </section>
          </>
        )}

        {activePanel === "billboards" && (
          <section className="admin-panel-card admin-content-panel">
            <SectionHeading title="مخزون اللوحات الإعلانية" description="إدارة بيانات اللوحات الفعلية ومواقعها وأبعادها وحالتها." action={<button type="button" className="admin-button admin-button--primary" onClick={() => { setEditingBillboard(null); setBillboardForm(EMPTY_BILLBOARD); setShowBillboardForm(true); }}>+ إضافة لوحة</button>} />
            {billboards.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>كود اللوحة</th><th>المنطقة</th><th>المقاس</th><th>الوجوه</th><th>الحالة</th><th>الإجراءات</th></tr></thead><tbody>{billboards.map((board) => <tr key={board.id}><td><strong>{board.board_code}</strong></td><td>{board.area}</td><td>{board.width} × {board.height} م</td><td>{board.faces}</td><td><span className={`admin-status admin-status--${board.status === "مؤجرة" ? "rented" : board.status === "تحت الصيانة" ? "maintenance" : "available"}`}>{board.status}</span></td><td className="admin-table-actions"><button className="admin-button admin-button--secondary admin-button--small" type="button" onClick={() => { setEditingBillboard(board); setBillboardForm({ ...board, width: String(board.width), height: String(board.height), faces: String(board.faces), notes: board.notes || "" }); setShowBillboardForm(true); }}>تعديل</button><button className="admin-button admin-button--danger admin-button--small" type="button" onClick={() => handleDeleteBillboard(board)}>حذف</button></td></tr>)}</tbody></table></div> : <EmptyState title="لا توجد لوحات مسجلة" detail="أضف بيانات أول لوحة باستخدام زر إضافة لوحة." />}
          </section>
        )}

        {activePanel === "rentals" && (
          <section className="admin-panel-card admin-content-panel">
            <SectionHeading title="عقود الإيجار" description="تسجيل العقود ومتابعة بيانات العملاء وتواريخ الإيجار." action={<button className="admin-button admin-button--primary" type="button" onClick={() => { setEditingRental(null); setRentalForm(EMPTY_RENTAL); setShowRentalForm(true); }}>+ إضافة عقد</button>} />
            {rentals.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>كود اللوحة</th><th>العميل</th><th>الهاتف</th><th>الشركة</th><th>بداية العقد</th><th>نهاية العقد</th><th>قيمة العقد</th><th>الإجراءات</th></tr></thead><tbody>{rentals.map((rental) => <tr key={rental.id}><td><strong>{rental.board_code || `#${rental.billboard_id}`}</strong><small className="admin-cell-subtitle">{rental.area || ""}</small></td><td>{rental.customer_name}</td><td>{rental.customer_phone || "—"}</td><td>{rental.company_name || "—"}</td><td>{formatDate(rental.rent_start)}</td><td>{formatDate(rental.rent_end)}</td><td>{rental.contract_price == null ? "—" : Number(rental.contract_price).toLocaleString()}</td><td className="admin-table-actions"><button className="admin-button admin-button--secondary admin-button--small" type="button" onClick={() => { setEditingRental(rental); setRentalForm({ billboard_id: String(rental.billboard_id), customer_name: rental.customer_name || "", customer_phone: rental.customer_phone || "", company_name: rental.company_name || "", rent_start: formatDate(rental.rent_start), rent_end: formatDate(rental.rent_end), contract_price: rental.contract_price ?? "", notes: rental.notes || "" }); setShowRentalForm(true); }}>تعديل</button><button className="admin-button admin-button--danger admin-button--small" type="button" onClick={() => handleDeleteRental(rental)}>حذف</button></td></tr>)}</tbody></table></div> : <EmptyState title="لا توجد عقود مسجلة" detail="أضف عقدًا جديدًا لبدء متابعة مواعيد الإيجار." />}
          </section>
        )}

        {activePanel === "alerts" && (
          <section className="admin-panel-card admin-content-panel">
            <SectionHeading title="تنبيهات العقود" description="العقود المنتهية أو التي اقترب موعد انتهائها." />
            {rentals.filter((rental) => getContractAlert(getRemainingDays(rental.rent_end))).length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>الحالة</th><th>العميل</th><th>الشركة</th><th>اللوحة</th><th>تاريخ الانتهاء</th><th>المتبقي</th></tr></thead><tbody>{rentals.map((rental) => ({ rental, days: getRemainingDays(rental.rent_end) })).filter(({ days }) => getContractAlert(days)).sort((a, b) => a.days - b.days).map(({ rental, days }) => { const alert = getContractAlert(days); return <tr key={rental.id}><td><span className={`admin-status admin-status--${alert.tone}`}>{alert.text}</span></td><td>{rental.customer_name}</td><td>{rental.company_name || "—"}</td><td>{rental.board_code || `#${rental.billboard_id}`}</td><td>{formatDate(rental.rent_end)}</td><td>{days < 0 ? "انتهى" : `${days} يوم`}</td></tr>; })}</tbody></table></div> : <EmptyState title="لا توجد تنبيهات حاليًا" detail="ستظهر هنا العقود التي تقترب من تاريخ انتهائها." />}
          </section>
        )}
      </main>

      {showBillboardForm ? <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowBillboardForm(false); }}><section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="billboard-modal-title"><div className="admin-modal-header"><div><p className="admin-eyebrow">مخزون اللوحات</p><h2 id="billboard-modal-title">{editingBillboard ? "تعديل بيانات اللوحة" : "إضافة لوحة جديدة"}</h2></div><button className="admin-modal-close" type="button" onClick={() => setShowBillboardForm(false)} aria-label="إغلاق">×</button></div><form className="admin-form-grid" onSubmit={handleBillboardSubmit}>
        <label className="admin-field"><span>كود اللوحة *</span><input value={billboardForm.board_code} onChange={(e) => setBillboardForm({ ...billboardForm, board_code: e.target.value })} required /></label>
        <label className="admin-field"><span>المنطقة *</span><input value={billboardForm.area} onChange={(e) => setBillboardForm({ ...billboardForm, area: e.target.value })} required /></label>
        <label className="admin-field admin-field--full"><span>العنوان *</span><input value={billboardForm.address} onChange={(e) => setBillboardForm({ ...billboardForm, address: e.target.value })} required /></label>
        <label className="admin-field"><span>العرض (متر) *</span><input type="number" min="0.01" step="0.01" value={billboardForm.width} onChange={(e) => setBillboardForm({ ...billboardForm, width: e.target.value })} required /></label>
        <label className="admin-field"><span>الارتفاع (متر) *</span><input type="number" min="0.01" step="0.01" value={billboardForm.height} onChange={(e) => setBillboardForm({ ...billboardForm, height: e.target.value })} required /></label>
        <label className="admin-field"><span>عدد الوجوه</span><input type="number" min="1" step="1" value={billboardForm.faces} onChange={(e) => setBillboardForm({ ...billboardForm, faces: e.target.value })} required /></label>
        <label className="admin-field"><span>الحالة</span><select value={billboardForm.status} onChange={(e) => setBillboardForm({ ...billboardForm, status: e.target.value })}><option value="متاحة">متاحة</option><option value="مؤجرة">مؤجرة</option><option value="تحت الصيانة">تحت الصيانة</option></select></label>
        <div className="admin-total-area"><span>المساحة الإجمالية</span><strong>{((Number(billboardForm.width) || 0) * (Number(billboardForm.height) || 0)).toLocaleString()} م²</strong></div>
        <label className="admin-field admin-field--full"><span>ملاحظات</span><textarea rows="3" value={billboardForm.notes || ""} onChange={(e) => setBillboardForm({ ...billboardForm, notes: e.target.value })} /></label>
        <div className="admin-form-actions admin-field--full"><button className="admin-button admin-button--primary" type="submit" disabled={recordSaving}>{recordSaving ? "جارٍ الحفظ..." : "حفظ البيانات"}</button><button className="admin-button admin-button--secondary" type="button" onClick={() => setShowBillboardForm(false)}>إلغاء</button></div>
      </form></section></div> : null}

      {showRentalForm ? <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowRentalForm(false); }}><section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="rental-modal-title"><div className="admin-modal-header"><div><p className="admin-eyebrow">عقود الإيجار</p><h2 id="rental-modal-title">{editingRental ? "تعديل عقد الإيجار" : "إضافة عقد جديد"}</h2></div><button className="admin-modal-close" type="button" onClick={() => setShowRentalForm(false)} aria-label="إغلاق">×</button></div><form className="admin-form-grid" onSubmit={handleRentalSubmit}>
        <label className="admin-field admin-field--full"><span>اللوحة *</span><select value={rentalForm.billboard_id} onChange={(e) => setRentalForm({ ...rentalForm, billboard_id: e.target.value })} required><option value="">اختر اللوحة</option>{billboards.map((board) => <option key={board.id} value={board.id}>{board.board_code} — {board.area}</option>)}</select></label>
        <label className="admin-field"><span>اسم العميل *</span><input value={rentalForm.customer_name} onChange={(e) => setRentalForm({ ...rentalForm, customer_name: e.target.value })} required /></label>
        <label className="admin-field"><span>رقم الهاتف</span><input type="tel" value={rentalForm.customer_phone} onChange={(e) => setRentalForm({ ...rentalForm, customer_phone: e.target.value })} /></label>
        <label className="admin-field"><span>اسم الشركة</span><input value={rentalForm.company_name} onChange={(e) => setRentalForm({ ...rentalForm, company_name: e.target.value })} /></label>
        <label className="admin-field"><span>قيمة العقد</span><input type="number" min="0" step="0.01" value={rentalForm.contract_price} onChange={(e) => setRentalForm({ ...rentalForm, contract_price: e.target.value })} /></label>
        <label className="admin-field"><span>تاريخ البداية *</span><input type="date" value={rentalForm.rent_start} onChange={(e) => setRentalForm({ ...rentalForm, rent_start: e.target.value })} required /></label>
        <label className="admin-field"><span>تاريخ الانتهاء *</span><input type="date" min={rentalForm.rent_start || undefined} value={rentalForm.rent_end} onChange={(e) => setRentalForm({ ...rentalForm, rent_end: e.target.value })} required /></label>
        <label className="admin-field admin-field--full"><span>ملاحظات</span><textarea rows="3" value={rentalForm.notes} onChange={(e) => setRentalForm({ ...rentalForm, notes: e.target.value })} /></label>
        <div className="admin-form-actions admin-field--full"><button className="admin-button admin-button--primary" type="submit" disabled={recordSaving}>{recordSaving ? "جارٍ الحفظ..." : "حفظ العقد"}</button><button className="admin-button admin-button--secondary" type="button" onClick={() => setShowRentalForm(false)}>إلغاء</button></div>
      </form></section></div> : null}
    </div>
  );
};

export default Admin;
