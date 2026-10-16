import { useEffect, useRef, useState } from 'react'
import './DynamicPortfolio.css'

const API_URL = 'https://ebdaa-backend-zbiy.onrender.com'

function getYouTubeId(url = '') {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      return parsed.pathname.split('/').filter(Boolean)[0] || null
    }

    if (
      host !== 'youtube.com' &&
      host !== 'm.youtube.com' &&
      host !== 'youtube-nocookie.com'
    ) {
      return null
    }

    if (parsed.pathname.startsWith('/shorts/')) {
      return parsed.pathname.split('/')[2] || null
    }

    if (parsed.pathname.startsWith('/embed/')) {
      return parsed.pathname.split('/')[2] || null
    }

    if (parsed.pathname.startsWith('/live/')) {
      return parsed.pathname.split('/')[2] || null
    }

    return parsed.searchParams.get('v')
  } catch {
    return null
  }
}

function LoadingIndicator({ label = 'جارٍ التحميل' }) {
  return (
    <div
      className="dynamic-portfolio__loading"
      role="status"
      aria-live="polite"
    >
      <div className="dynamic-portfolio__loader" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

function DynamicPortfolio({ category }) {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [videos, setVideos] = useState([])
  const [activeVideo, setActiveVideo] = useState(null)

  const [loadingImages, setLoadingImages] = useState(true)
  const [loadingVideos, setLoadingVideos] = useState(false)

  const [imagesError, setImagesError] = useState(false)
  const [videosError, setVideosError] = useState(false)

  const requestId = useRef(0)

  useEffect(() => {
    const controller = new AbortController()

    setLoadingImages(true)
    setImagesError(false)
    setImages([])

    async function loadImages() {
      try {
        const response = await fetch(`${API_URL}/images/${category}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Images request failed: ${response.status}`)
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Unexpected images response')
        }

        if (!controller.signal.aborted) {
          setImages(data)
        }
      } catch (error) {
        if (error.name !== 'AbortError' && !controller.signal.aborted) {
          console.error('Portfolio images error:', error)
          setImagesError(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingImages(false)
        }
      }
    }

    loadImages()

    return () => controller.abort()
  }, [category])

  async function handleImageClick(image) {
    // Close the selected logo and return to the complete grid.
    if (selectedImage?.id === image.id) {
      requestId.current += 1

      setSelectedImage(null)
      setVideos([])
      setActiveVideo(null)
      setLoadingVideos(false)
      setVideosError(false)
      return
    }

    // Ignore results from earlier requests if another logo is selected.
    const currentRequest = ++requestId.current

    setSelectedImage(image)
    setVideos([])
    setActiveVideo(null)
    setLoadingVideos(true)
    setVideosError(false)

    try {
      const response = await fetch(
        `${API_URL}/image-video/${image.id}`
      )

      if (!response.ok) {
        throw new Error(`Videos request failed: ${response.status}`)
      }

      const data = await response.json()

      if (!Array.isArray(data)) {
        throw new Error('Unexpected videos response')
      }

      const formattedVideos = data
        .map((video) => {
          const videoId = getYouTubeId(video.youtube_url)

          if (!videoId) return null

          return {
            id: video.id ?? videoId,
            videoId,
            thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          }
        })
        .filter(Boolean)

      if (currentRequest === requestId.current) {
        setVideos(formattedVideos)
      }
    } catch (error) {
      if (currentRequest === requestId.current) {
        console.error('Portfolio videos error:', error)
        setVideosError(true)
      }
    } finally {
      if (currentRequest === requestId.current) {
        setLoadingVideos(false)
      }
    }
  }

  function retryImages() {
    setImagesError(false)
    setLoadingImages(true)

    // Re-trigger the image-loading effect by reloading the page's data.
    // The helper below keeps the existing component and backend intact.
    loadImagesAgain()
  }

  async function loadImagesAgain() {
    try {
      const response = await fetch(`${API_URL}/images/${category}`)

      if (!response.ok) throw new Error('Images request failed')

      const data = await response.json()

      if (!Array.isArray(data)) throw new Error('Invalid response')

      setImages(data)
      setImagesError(false)
    } catch (error) {
      console.error('Portfolio retry error:', error)
      setImagesError(true)
    } finally {
      setLoadingImages(false)
    }
  }

  return (
    <div className="dynamic-portfolio">
      {/* Initial loading state */}
      {loadingImages && (
        <div className="dynamic-portfolio__loading-area">
          <LoadingIndicator label="نجهّز لكم أعمالنا" />
        </div>
      )}

      {/* Image loading error */}
      {!loadingImages && imagesError && !selectedImage && (
        <div className="dynamic-portfolio__notice dynamic-portfolio__notice--error">
          <div className="dynamic-portfolio__notice-icon" aria-hidden="true">
            !
          </div>

          <h3>يبدو أن الاتصال تأخّر قليلًا</h3>

          <p>
            لم نتمكن من تحميل الأعمال الآن. تأكد من اتصالك بالإنترنت
            وحاول مرة أخرى.
          </p>

          <button
            type="button"
            className="dynamic-portfolio__retry"
            onClick={retryImages}
          >
            إعادة المحاولة
          </button>
        </div>
      )}

      {/* Empty portfolio */}
      {!loadingImages &&
        !imagesError &&
        images.length === 0 &&
        !selectedImage && (
          <div className="dynamic-portfolio__notice">
            <div className="dynamic-portfolio__notice-icon" aria-hidden="true">
              ✦
            </div>

            <h3>أعمالنا في انتظاركم</h3>

            <p>نعمل على تجهيز معرض الأعمال. ترقبوا جديدنا قريبًا.</p>
          </div>
        )}

      {/* Selected logo and associated videos */}
      {selectedImage && (
        <div className="dynamic-portfolio__selected">
          <button
            type="button"
            className="dynamic-portfolio__selected-logo"
            onClick={() => handleImageClick(selectedImage)}
            aria-label="العودة إلى جميع الأعمال"
            title="العودة إلى جميع الأعمال"
          >
            <img
              src={selectedImage.url}
              alt="العمل المحدد"
            />
          </button>

          <button
            type="button"
            className="dynamic-portfolio__back"
            onClick={() => handleImageClick(selectedImage)}
          >
            <span aria-hidden="true">→</span>
            عرض جميع الأعمال
          </button>

          {loadingVideos && (
            <LoadingIndicator label="نجهّز لكم الفيديوهات" />
          )}

          {!loadingVideos && videosError && (
            <div className="dynamic-portfolio__notice dynamic-portfolio__notice--error">
              <div className="dynamic-portfolio__notice-icon" aria-hidden="true">
                !
              </div>

              <h3>الفيديوهات تأخّرت قليلًا</h3>

              <p>
                تعذّر تحميل الفيديوهات المرتبطة بهذا العمل. يمكنك المحاولة
                مجددًا.
              </p>

              <button
                type="button"
                className="dynamic-portfolio__retry"
                onClick={() => handleImageClick({ ...selectedImage, id: `retry-${selectedImage.id}` })}
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          {!loadingVideos &&
            !videosError &&
            videos.length === 0 && (
              <div className="dynamic-portfolio__notice">
                <div className="dynamic-portfolio__notice-icon" aria-hidden="true">
                  ▶
                </div>

                <h3>قريبًا نعرض لكم المزيد</h3>

                <p>
                  لا توجد فيديوهات مضافة لهذا العمل حاليًا.
                </p>
              </div>
            )}

          {!loadingVideos && videos.length > 0 && (
            <div className="dynamic-portfolio__videos">
              {videos.map((video, index) => (
                <div
                  className="dynamic-portfolio__video-card"
                  key={`${video.id}-${video.videoId}`}
                  style={{ '--video-index': index }}
                >
                  {activeVideo === video.id ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1`}
                      title={`فيديو ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      className="dynamic-portfolio__thumbnail"
                      onClick={() => setActiveVideo(video.id)}
                      aria-label={`تشغيل الفيديو ${index + 1}`}
                    >
                      <img
                        src={video.thumbnail}
                        alt={`معاينة الفيديو ${index + 1}`}
                        loading="lazy"
                      />

                      <span
                        className="dynamic-portfolio__play"
                        aria-hidden="true"
                      >
                        ▶
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Complete logo grid */}
      {!loadingImages &&
        !imagesError &&
        !selectedImage &&
        images.length > 0 && (
          <div className="service-page__logo-grid dynamic-portfolio__grid">
            {images.map((image, index) => (
              <button
                type="button"
                key={image.id}
                className="service-page__logo-card dynamic-portfolio__logo-card"
                onClick={() => handleImageClick(image)}
                aria-label="عرض الفيديوهات المرتبطة بهذا العمل"
                style={{ '--logo-index': index }}
              >
                <span className="service-page__logo-card-inner">
                  <img
                    src={image.url}
                    alt="أحد أعمالنا"
                    loading="lazy"
                  />
                </span>
              </button>
            ))}
          </div>
        )}
    </div>
  )
}

export default DynamicPortfolio