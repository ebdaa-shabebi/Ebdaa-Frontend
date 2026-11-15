
import { useEffect } from 'react'

function PageSEO({ title, description, canonical }) {
  useEffect(() => {
    document.title = title

    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    )

    if (!descriptionTag) {
      descriptionTag = document.createElement('meta')
      descriptionTag.setAttribute('name', 'description')
      document.head.appendChild(descriptionTag)
    }

    descriptionTag.setAttribute('content', description)

    let canonicalTag = document.querySelector(
      'link[rel="canonical"]'
    )

    if (!canonicalTag) {
      canonicalTag = document.createElement('link')
      canonicalTag.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalTag)
    }

    canonicalTag.setAttribute('href', canonical)
  }, [title, description, canonical])

  return null
}

export default PageSEO
