// A raw space or comma inside <source srcSet="..."> ends the URL, so the browser
// drops the whole <source> and falls back to the <img>. Always emit an encoded URL.
export default function safeSrcSet(url) {
  const value = String(url)
  let decoded = value
  try {
    decoded = decodeURI(value)
  } catch {
    // keep the original value
  }

  return encodeURI(decoded)
    .replace(/,/g, '%2C')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
}
