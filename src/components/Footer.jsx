import './footer.css'

import footerBackground from '../assets/footer-background.png'
import logo from '../assets/logo.png'

import webIcon from '../assets/ايقونة ويب.png'
import phoneIcon from '../assets/ايقونة اتصال.png'
import emailIcon from '../assets/ايقونة بريد.png'
import whatsappIcon from '../assets/ايقونة واتس.png'

function Footer() {
    return (
        <footer className="footer" id="contact">

            {/* Background */}
            <img
                className="footer__background"
                src={footerBackground}
                alt=""
                aria-hidden="true"
            />

            {/* Wave */}
            <svg
                className="footer__wave"
                viewBox="0 0 1279.5 117.04"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <g transform="translate(0 -150)">
                    <path
                        d="M1278.5 251.299C1266 242.299 1179.99 209.799 1017.5 209.799C859 209.799 533.259 266.813 291 266.799C68.5 278.299 7.5 206.299 -1 206.299V171.299C11.5 166.799 81.4576 207.071 270 195.799C574 177.623 861.5 143.484 1005.5 152.484C1163.19 162.34 1272.5 182.299 1278.5 199.299V251.299Z"
                        fill="#F0B152"
                    />
                </g>
            </svg>

            <div className="footer__content">

                {/* =========================
            RIGHT — BRAND
        ========================= */}

                <div className="footer__brand">

                    <img
                        className="footer__logo"
                        src={logo}
                        alt="إبداع ميديا"
                    />

                    <p>
                        إبداع ميديا للدعاية والإعلان والتسويق الإبداعي
                    </p>

                </div>

                {/* =========================
            CENTER — FOLLOW US
        ========================= */}

                <div className="footer__center">

                    <h3>تابعنا على ...</h3>

                    <p>www.ebdaa-media.com</p>

                    <div className="footer__socials">

                        {/* Instagram */}
                        <a href="https://www.instagram.com/ebdaa.media_production?igsi=MTRieWNnNTd6bGI1cQ==" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <rect
                                    x="3"
                                    y="3"
                                    width="18"
                                    height="18"
                                    rx="5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com/company/ebdaa-media" aria-label="LinkedIn">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <rect
                                    x="4"
                                    y="4"
                                    width="16"
                                    height="16"
                                    rx="2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <rect x="7" y="10" width="2.5" height="7" fill="currentColor" />
                                <circle cx="8.25" cy="7.5" r="1.3" fill="currentColor" />
                                <path
                                    d="M12 10v7m0-4c0-2 1-3 3-3s3 1 3 3v4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                            </svg>
                        </a>

                        {/* X */}
                        <a href="https://x.com/" aria-label="X">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25h6.826l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>

                    </div>

                </div>

                {/* =========================
            LEFT — CONTACT
        ========================= */}

                <div className="footer__contact">

                    <h3>تواصل معنا...</h3>

                    <a
                        href="tel:02366900"
                        className="footer__item"
                    >
                        <img src={phoneIcon} alt="" />
                        <span>02-366900</span>
                    </a>

                    <a
                        href="https://wa.me/967777730311"
                        className="footer__item"
                    >
                        <img src={whatsappIcon} alt="" />
                        <span>777730311</span>
                    </a>

                    <a
                        href="mailto:info@ebdaa-media.com"
                        className="footer__item"
                    >
                        <img src={emailIcon} alt="" />
                        <span>info@ebdaa-media.com</span>
                    </a>

                    <a
                        href="https://www.ebdaa-media.com"
                        className="footer__item"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={webIcon} alt="" />
                        <span>www.ebdaa-media.com</span>
                    </a>

                </div>

            </div>
        </footer>
    )
}

export default Footer