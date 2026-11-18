// In a <source srcSet="..."> a raw space (or comma) ends the URL.
// Vite's production build emits asset names unencoded (e.g. "/assets/خلفية طول-abc.webp"),
// so the browser drops the candidate and falls back to the <img>.
// Localhost works because the dev server already returns encoded URLs.
export default function safeSrcSet(url) {
  return String(url)
    .replace(/ /g, '%20')
    .replace(/,/g, '%2C')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
}
