import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// ── Import all images here ──────────────────────────────────────────
import logoImg from "./assets/logo.jpg";
import heroImg from "./assets/hero-img.jpg";
import overviewImg from "./assets/overview-img.jpg";
import locationImg from "./assets/location-img.jpg";
import videoThumbImg from "./assets/video-thumbnail.jpg";

import residenceImg1 from "./assets/residence-img-1.jpg";
import residenceImg2 from "./assets/residence-img-2.jpg";
import residenceImg3 from "./assets/residence-img-3.jpg";
import residenceImg4 from "./assets/residence-img-4.jpg";

import galleryImg1 from "./assets/gallery-img-1.jpg";
import galleryImg2 from "./assets/gallery-img-2.jpg";
import galleryImg3 from "./assets/gallery-img-3.jpg";
import galleryImg4 from "./assets/gallery-img-4.jpg";
import galleryImg5 from "./assets/gallery-img-5.jpg";
import galleryImg6 from "./assets/gallery-img-6.jpg";
import galleryImg7 from "./assets/gallery-img-7.jpg";
import galleryImg8 from "./assets/gallery-img-8.jpg";

import floorplanStudio from "./assets/floorplan-img-studio.jpg";
import floorplan1bed from "./assets/floorplan-img-1bed.jpg";
import floorplan2bed from "./assets/floorplan-img-2bed.jpg";
import floorplan3bed from "./assets/floorplan-img-3bed.jpg";
// ───────────────────────────────────────────────────────────────────

const IMGS = {
  hero: heroImg,
  logo: logoImg,
  branded: overviewImg,
  location: locationImg,
  ytThumb: videoThumbImg,
};

const RESIDENCES = [
  { img: residenceImg1, title: "Studio Residences", desc: "Smartly designed studios with open layouts, floor-to-ceiling windows, and premium finishes. Ideal for modern urban living with strong rental appeal." },
  { img: residenceImg2, title: "1 Bedroom Residences", desc: "Well-planned 1-bedroom apartments offering spacious living areas, elegant interiors, and city views. Perfect for professionals and end-users." },
  { img: residenceImg3, title: "Branded Living Experience", desc: "Each residence reflects Mercedes-Benz design values with refined details, quality materials, and a seamless living experience." },
  { img: residenceImg4, title: "Lifestyle & Investment Value", desc: "Located in Meydan, these homes combine daily comfort with long-term value, supported by strong connectivity and world-class amenities." },
];

const GALLERY_IMGS = [
  { src: galleryImg1, alt: "Luxury Tower Exterior" },
  { src: galleryImg2, alt: "Mercedes-Benz Architecture" },
  { src: galleryImg3, alt: "Modern Tower" },
  { src: galleryImg4, alt: "Premium Architecture" },
  { src: galleryImg5, alt: "Dubai Skyline" },
  { src: galleryImg6, alt: "Luxury Amenities" },
  { src: galleryImg7, alt: "Interior Design" },
  { src: galleryImg8, alt: "Luxury Living" },
];

const AMENITIES = [
  { icon: "🏊", name: "Infinity Pool" }, { icon: "🌅", name: "Outdoor Decks" },
  { icon: "💆", name: "Wellness Center" }, { icon: "🧘", name: "Yoga Zone" },
  { icon: "🏊‍♂️", name: "Kids' Pool" }, { icon: "🎮", name: "Play Area" },
  { icon: "🏃", name: "Outdoor Fitness" }, { icon: "💪", name: "Indoor Gym" },
  { icon: "💼", name: "Co-Working Lounge" }, { icon: "🛋️", name: "Relaxation Spaces" },
  { icon: "🌊", name: "Waterfront Promenade" }, { icon: "🌇", name: "Sunset Terrace" },
];

const FLOOR_PLANS = {
  studio: { img: floorplanStudio, title: "Studio Apartment", area: "450 sq ft", bath: "1", balcony: "1", features: ["Open-plan living space", "Modern kitchen", "Floor-to-ceiling windows", "Premium finishes"] },
  "1bed": { img: floorplan1bed, title: "1 Bedroom Apartment", area: "750 sq ft", bath: "2", balcony: "1", features: ["Separate bedroom suite", "Spacious living area", "Gourmet kitchen", "Master en-suite"] },
  "2bed": { img: floorplan2bed, title: "2 Bedroom Apartment", area: "1,200 sq ft", bath: "3", balcony: "2", features: ["Two master bedrooms", "Open plan dining", "Premium kitchen", "Two balconies"] },
  "3bed": { img: floorplan3bed, title: "3 Bedroom Apartment", area: "1,800 sq ft", bath: "4", balcony: "2", features: ["Three suites", "Maid's room", "Chef's kitchen", "Private lounge"] },
};

const COUNTRY_CODES = [
  { code: "+971", flag: "🇦🇪", label: "🇦🇪 +971" },
  { code: "+1", flag: "🇺🇸", label: "🇺🇸 +1" },
  { code: "+44", flag: "🇬🇧", label: "🇬🇧 +44" },
  { code: "+91", flag: "🇮🇳", label: "🇮🇳 +91" },
  { code: "+966", flag: "🇸🇦", label: "🇸🇦 +966" },
  { code: "+20", flag: "🇪🇬", label: "🇪🇬 +20" },
  { code: "+974", flag: "🇶🇦", label: "🇶🇦 +974" },
  { code: "+965", flag: "🇰🇼", label: "🇰🇼 +965" },
];

/* ─────────────────────────── SVGs ─────────────────────────── */
const WhatsappSVG = ({ size = 28 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const PhoneSVG = ({ size = 28 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
  </svg>
);

const DownloadSVG = () => (
  <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  </svg>
);

const CheckSVG = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="#d4af37">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

const EmailSVG = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const PlaySVG = () => (
  <svg width={32} height={32} viewBox="0 0 24 24" fill="white">
    <path d="M8 5v14l11-7z" />
  </svg>
);

/* ─────────────────────────── FORM HOOK ─────────────────────────── */
function useForm(initial) {
  const [values, setValues] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const set = (e) => setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  const reset = () => { setValues(initial); setSubmitted(false); };
  return { values, set, submitted, setSubmitted, reset };
}

function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= breakpoint);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoint]);
  return isMobile;
}

/* ─────────────────────────── CONTACT FORM ─────────────────────────── */
function ContactForm() {
  const form = useForm({ name: "", email: "", phoneCode: "+971", phone: "", message: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    form.setSubmitted(true);
    setTimeout(form.reset, 3000);
  };
  if (form.submitted) return (
    <div className="bmp-success">
      <div className="bmp-success-icon">✅</div>
      <h3>Message Sent!</h3>
      <p>We'll be in touch shortly.</p>
    </div>
  );
  return (
    <form className="bmp-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Your Name *" required value={form.values.name} onChange={form.set} />
      <input name="email" type="email" placeholder="Email Address *" required value={form.values.email} onChange={form.set} />
      <div className="bmp-phone-group">
        <select name="phoneCode" value={form.values.phoneCode} onChange={form.set} required>
          {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
        </select>
        <input name="phone" type="tel" placeholder="Phone Number *" required value={form.values.phone} onChange={form.set} />
      </div>
      <textarea name="message" rows={4} placeholder="Your Message" value={form.values.message} onChange={form.set} />
      <button type="submit" className="bmp-btn full">Send Message</button>
    </form>
  );
}

/* ─────────────────────────── POPUP FORM ─────────────────────────── */
function PopupForm({ onSuccess }) {
  const isMobile = useIsMobile();
  const form = useForm({ name: "", email: "", country: "", phoneCode: "+971", phone: "", message: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    form.setSubmitted(true);
    if (onSuccess) onSuccess();
  };
  if (form.submitted) return (
    <div className="bmp-success">
      <div className="bmp-success-icon">✅</div>
      <h3>Thank You!</h3>
      <p>Our team will contact you soon with exclusive information.</p>
    </div>
  );
  return (
    <form className="bmp-form" onSubmit={handleSubmit}>
      <div className="bmp-form-row" style={isMobile ? { flexDirection: "column" } : undefined}>
        <input name="name" placeholder="Full Name *" required value={form.values.name} onChange={form.set} />
        <input name="email" type="email" placeholder="Email *" required value={form.values.email} onChange={form.set} />
      </div>
      <div className="bmp-form-row" style={isMobile ? { flexDirection: "column" } : undefined}>
        <input name="country" placeholder="Resident of *" required value={form.values.country} onChange={form.set} />
        <div className="bmp-phone-group">
          <select name="phoneCode" value={form.values.phoneCode} onChange={form.set} required>
            {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
          </select>
          <input name="phone" type="tel" placeholder="Phone Number *" required value={form.values.phone} onChange={form.set} />
        </div>
      </div>
      <textarea name="message" rows={4} placeholder="Your Message" value={form.values.message} onChange={form.set} />
      <button type="submit" className="bmp-btn full">Get Information</button>
      <p className="bmp-consent">By submitting this form, you consent to being contacted via phone, email, or WhatsApp regarding this property.</p>
    </form>
  );
}

/* ─────────────────────────── DOWNLOAD POPUP ─────────────────────────── */
function DownloadPopup({ open, onClose }) {
  const isMobile = useIsMobile();
  if (!open) return null;
  return (
    <div className="bmp-popup-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bmp-popup-box">
        <button className="bmp-popup-close" onClick={onClose}>×</button>
        <div className="bmp-popup-split" style={isMobile ? { flexDirection: "column" } : undefined}>
          <div className="bmp-popup-info">
            <h2>Get Information On</h2>
            <div className="bmp-info-items">
              {["📄 Project Brochure", "💳 Payment Plan", "📐 Floor Plans", "🏢 Available Units"].map(i => (
                <div className="bmp-info-item" key={i}>{i}</div>
              ))}
            </div>
            <a
              href="https://wa.me/971509611671?text=Hi, I'm interested in Binghatti Mercedes Place. Please send me information about the project."
              target="_blank"
              rel="noreferrer"
              className="bmp-wa-cta"
            >
              WhatsApp Us Now
            </a>
          </div>
          <div className="bmp-popup-form">
            <h2>Contact Us</h2>
            <p>Leave your contact details below to register your interest.</p>
            <PopupForm onSuccess={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── WELCOME POPUP ─────────────────────────── */
function WelcomePopup({ open, onClose }) {
  const isMobile = useIsMobile();
  const form = useForm({ name: "", email: "", phoneCode: "+971", phone: "" });
  const handleSubmit = (e) => { e.preventDefault(); form.setSubmitted(true); setTimeout(onClose, 2000); };
  if (!open) return null;
  return (
    <div className="bmp-popup-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bmp-welcome-box">
        <button className="bmp-popup-close" onClick={onClose}>×</button>
        <div className="bmp-welcome-split" style={isMobile ? { flexDirection: "column" } : undefined}>
          <div className="bmp-welcome-img">
            <img src={IMGS.hero} alt="Binghatti Mercedes Place" />
            <div className="bmp-welcome-overlay">
              <h2>Binghatti Mercedes Place</h2>
              <p>Exclusive Pre-Launch Offer</p>
            </div>
          </div>
          <div className="bmp-welcome-form">
            {form.submitted ? (
              <div className="bmp-success">
                <div className="bmp-success-icon">✅</div>
                <h3>Registered!</h3>
                <p>We'll be in touch with exclusive info.</p>
              </div>
            ) : (
              <>
                <h3>Register Your Interest</h3>
                <p>Get exclusive information about Dubai's first Mercedes-Benz branded residences.</p>
                <form className="bmp-form" onSubmit={handleSubmit}>
                  <input name="name" placeholder="Full Name *" required value={form.values.name} onChange={form.set} />
                  <input name="email" type="email" placeholder="Email Address *" required value={form.values.email} onChange={form.set} />
                  <div className="bmp-phone-group">
                    <select name="phoneCode" value={form.values.phoneCode} onChange={form.set} required>
                      {COUNTRY_CODES.slice(0, 5).map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                    </select>
                    <input name="phone" type="tel" placeholder="Phone Number *" required value={form.values.phone} onChange={form.set} />
                  </div>
                  <button type="submit" className="bmp-btn full">Submit</button>
                  <p className="bmp-consent">By submitting, you agree to be contacted about this property.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── LIGHTBOX ─────────────────────────── */
function Lightbox({ imgs, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  if (index === null) return null;
  const img = imgs[index];
  return (
    <div className="bmp-lightbox">
      <button className="bmp-lb-close" onClick={onClose}>×</button>
      <button className="bmp-lb-prev" onClick={onPrev}>&#8249;</button>
      <button className="bmp-lb-next" onClick={onNext}>&#8250;</button>
      <div className="bmp-lb-content">
        <img src={img.src} alt={img.alt} />
        <div className="bmp-lb-info">
          <p>{img.alt}</p>
          <span>{index + 1} / {imgs.length}</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── NEWSLETTER ─────────────────────────── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 3000);
  };
  return (
    <div className="bmp-newsletter">
      <h3>Subscribe to Newsletter</h3>
      <p>Get the latest updates and exclusive offers</p>
      {done ? (
        <p className="bmp-newsletter-success">✅ Subscribed!</p>
      ) : (
        <form className="bmp-newsletter-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} required />
          <button type="submit" className="bmp-btn">Subscribe</button>
        </form>
      )}
    </div>
  );
}

/* ─────────────────────────── MAIN APP ─────────────────────────── */
export default function BinghattiApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [activeFP, setActiveFP] = useState("studio");
  const welcomeShown = useRef(false);
  const isMobile = useIsMobile();

  // Welcome popup on load
  useEffect(() => {
    if (!welcomeShown.current) {
      welcomeShown.current = true;
      const t = setTimeout(() => setWelcomeOpen(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  // Lock scroll when popup open
  useEffect(() => {
    document.body.style.overflow = (downloadOpen || welcomeOpen || lightboxIdx !== null) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [downloadOpen, welcomeOpen, lightboxIdx]);

  const openLightbox = useCallback((idx) => setLightboxIdx(idx), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevLightbox = useCallback(() => setLightboxIdx(i => (i - 1 + GALLERY_IMGS.length) % GALLERY_IMGS.length), []);
  const nextLightbox = useCallback(() => setLightboxIdx(i => (i + 1) % GALLERY_IMGS.length), []);

  const navLinks = [
    { href: "#overview", label: "Overview" },
    { href: "#residences", label: "Residences" },
    { href: "#payment-plan", label: "Payment Plan" },
    { href: "#gallery", label: "Gallery" },
    { href: "#amenities", label: "Amenities" },
    { href: "#location", label: "Location" },
    { href: "#floor-plan", label: "Floor Plans" },
  ];

  const fp = FLOOR_PLANS[activeFP];

  const mobileSectionColumn = isMobile ? { flexDirection: "column", gap: "1.5rem" } : undefined;
  const mobileButtonsColumn = isMobile ? { flexDirection: "column", gap: "1rem", alignItems: "stretch" } : undefined;
  const mobileCenterText = isMobile ? { textAlign: "center", alignItems: "center" } : undefined;
  const mobileFullWidth = isMobile ? { width: "100%" } : undefined;

  return (
    <>
      {/* ── HEADER ── */}
      <header className="bmp-header">
        <nav className="bmp-nav">
          <div className="bmp-logo">
            <img src={IMGS.logo} alt="Binghatti Mercedes Place" />
          </div>

          {/* Desktop nav links */}
          <ul className={`bmp-nav-links${menuOpen ? " open" : ""}`}>
            {navLinks.map(n => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setMenuOpen(false)}>{n.label}</a>
              </li>
            ))}
            {/* Register button inside mobile menu */}
            <li className="bmp-nav-mobile-cta">
              <button className="bmp-btn" onClick={() => { setDownloadOpen(true); setMenuOpen(false); }}>
                Register Interest
              </button>
            </li>
          </ul>

          {/* Desktop CTA — separate from nav list */}
          <div className="bmp-nav-cta">
            <button className="bmp-btn" onClick={() => setDownloadOpen(true)}>
              Register Interest
            </button>
          </div>

          {/* Hamburger */}
          <button
            className={`bmp-hamburger${menuOpen ? " active" : ""}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </nav>
      </header>

      {/* ── FLOATING CONTACTS ── */}
      <div className="bmp-floating">
        <a href="https://wa.me/971509611671" target="_blank" rel="noreferrer" className="bmp-float-icon bmp-float-wa" aria-label="WhatsApp">
          <WhatsappSVG size={26} />
        </a>
        <a href="tel:+971509611671" className="bmp-float-icon bmp-float-ph" aria-label="Call">
          <PhoneSVG size={26} />
        </a>
      </div>

      {/* ── HERO ── */}
      <section className="bmp-hero">
        <div className="bmp-hero-bg">
          <img src={IMGS.hero} alt="Binghatti Mercedes Place" />
        </div>
        <div className="bmp-hero-overlay" />
        <div className="bmp-hero-container">
          <div className="bmp-hero-center" style={isMobile ? { padding: "2rem 1.25rem", alignItems: "center", textAlign: "center" } : undefined}>
            <div className="bmp-hero-label">✦ Dubai's First Mercedes-Benz Branded Residences ✦</div>
            <h1 className="bmp-hero-title">Binghatti Mercedes Place</h1>
            <p className="bmp-hero-subtitle">
              Where automotive excellence meets architectural mastery. Experience a life of unparalleled luxury in the heart of Meydan, Dubai.
            </p>
            <div className="bmp-stats-compact" style={isMobile ? { flexDirection: "column", gap: "1rem" } : undefined}>
              {[
                { val: "40%", lbl: "On Booking" },
                { val: "AED 800K", lbl: "Starting Price" },
                { val: "2026", lbl: "Handover" },
              ].map(s => (
                <div className="bmp-stat" key={s.lbl}>
                  <div className="bmp-stat-val">{s.val}</div>
                  <div className="bmp-stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
            <div className="bmp-hero-ctas" style={isMobile ? { flexDirection: "column", gap: "1rem", width: "100%" } : undefined}>
              <button className="bmp-btn hero-primary" onClick={() => setDownloadOpen(true)}>
                Register Interest
              </button>
              <button className="bmp-btn hero-secondary" onClick={() => setDownloadOpen(true)}>
                <DownloadSVG /> Download Brochure
              </button>
            </div>
          </div>
        </div>
        <a href="#overview" className="bmp-scroll-indicator">
          <span>Scroll</span>
          <div className="bmp-scroll-arrow" />
        </a>
      </section>

      {/* ── OVERVIEW / VIDEO ── */}
      <section id="overview" className="bmp-video-section">
        <div className="bmp-container">
          <h2 className="bmp-section-title centered white">Project Overview</h2>
          <div className="bmp-video-content" style={isMobile ? { flexDirection: "column" } : undefined}>
            <div className="bmp-video-text">
              <p>
                Binghatti Mercedes Place stands as a testament to the fusion of two iconic brands — Binghatti's visionary architecture and Mercedes-Benz's timeless elegance. Located in the prestigious Meydan district, this development redefines luxury living in Dubai.
              </p>
              <p>
                Each residence is meticulously crafted with Mercedes-Benz inspired design elements, featuring premium finishes, cutting-edge technology, and exclusive amenities that cater to the most discerning residents.
              </p>
              <div className="bmp-cta-buttons" style={mobileButtonsColumn}>
                <button className="bmp-btn" onClick={() => setDownloadOpen(true)}>
                  <DownloadSVG /> Download Brochure
                </button>
                <button className="bmp-btn outline" onClick={() => setDownloadOpen(true)}>
                  Schedule Viewing
                </button>
              </div>
            </div>
            <div className="bmp-video-wrapper">
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noreferrer"
                className="bmp-video-link"
              >
                <img src={IMGS.ytThumb} alt="Binghatti Mercedes Place Video" />
                <div className="bmp-play-overlay">
                  <div className="bmp-play-btn"><PlaySVG /></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRANDED SECTION ── */}
      <section className="bmp-branded-section">
        <div className="bmp-container">
          <h2 className="bmp-section-title left">A New Era of Branded Living</h2>
          <div className="bmp-branded-content" style={isMobile ? { flexDirection: "column" } : undefined}>
            <div className="bmp-branded-image">
              <img src={IMGS.branded} alt="Branded Living Experience" loading="lazy" />
              <div className="bmp-img-overlay">
                <p>Inspired by the iconic Mercedes-Benz design philosophy, precision, performance, and luxury.</p>
              </div>
            </div>
            <div className="bmp-highlights">
              <h3>Why Binghatti Mercedes Place?</h3>
              <div className="bmp-highlights-grid" style={isMobile ? { display: "grid", gridTemplateColumns: "1fr", gap: "1rem" } : undefined}>
                {[
                  { icon: "🏆", title: "Iconic Brand Partnership", desc: "The world's first Mercedes-Benz branded residential tower in Dubai." },
                  { icon: "📍", title: "Prime Meydan Location", desc: "Strategically located with excellent connectivity to Dubai's key destinations." },
                  { icon: "💰", title: "Strong Investment Returns", desc: "Projected 8-12% annual rental yields with significant capital appreciation." },
                  { icon: "🎨", title: "Signature Design", desc: "Interiors inspired by Mercedes-Benz's iconic design language and luxury aesthetic." },
                ].map(h => (
                  <div className="bmp-highlight-item" key={h.title}>
                    <div className="bmp-highlight-icon">{h.icon}</div>
                    <div className="bmp-highlight-content">
                      <h4>{h.title}</h4>
                      <p>{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bmp-cta-buttons" style={mobileButtonsColumn}>
                <button className="bmp-btn" onClick={() => setDownloadOpen(true)}>
                  Get Full Details
                </button>
                <button className="bmp-btn outline" onClick={() => setDownloadOpen(true)}>
                  View Floor Plans
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESIDENCES ── */}
      <section id="residences" className="bmp-residences-section">
        <div className="bmp-container">
          <h2 className="bmp-section-title centered">Our Residences</h2>
          <p className="bmp-section-subtitle centered">
            From thoughtfully designed studios to expansive three-bedroom suites — every home is a masterpiece.
          </p>
          <div className="bmp-residences-grid" style={isMobile ? { gridTemplateColumns: "1fr", gap: "1rem" } : undefined}>
            {RESIDENCES.map(r => (
              <div className="bmp-residence-card" key={r.title}>
                <div className="bmp-residence-image">
                  <img src={r.img} alt={r.title} loading="lazy" />
                </div>
                <div className="bmp-residence-info">
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bmp-cta-center">
            <button className="bmp-btn large" onClick={() => setDownloadOpen(true)}>
              <DownloadSVG /> View All Residences
            </button>
          </div>
        </div>
      </section>

      {/* ── PAYMENT PLAN ── */}
      <section id="payment-plan" className="bmp-payment-section">
        <div className="bmp-container">
          <h2 className="bmp-section-title centered white">Flexible Payment Plan</h2>
          <p className="bmp-payment-intro">
            Designed to make luxury accessible. Our straightforward payment plan allows you to secure your dream residence with ease.
          </p>
          <div className="bmp-payment-timeline" style={isMobile ? { flexDirection: "column", gap: "1rem" } : undefined}>
            {[
              { step: "01", pct: "40%", title: "On Booking", desc: "Secure your unit with just 40% down payment" },
              { step: "02", pct: "20%", title: "During Construction", desc: "Spread payments during construction phase" },
              { step: "03", pct: "40%", title: "On Handover", desc: "Final payment upon completion in 2026" },
            ].map(t => (
              <div className="bmp-timeline-item" key={t.step}>
                <div className="bmp-timeline-step">{t.step}</div>
                <div className="bmp-timeline-content">
                  <div className="bmp-payment-pct">{t.pct}</div>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bmp-payment-benefits">
            <h3>Why Invest Now?</h3>
            <ul className="bmp-benefits-list">
              {[
                "No commission fees", "Post-handover payment options",
                "High rental yield potential", "0% Property Tax in Dubai",
                "Residency visa eligibility", "Fully managed rental program",
              ].map(b => (
                <li key={b}><CheckSVG /> {b}</li>
              ))}
            </ul>
          </div>
          <div className="bmp-cta-center">
            <button className="bmp-btn large" onClick={() => setDownloadOpen(true)}>
              <DownloadSVG /> Get Full Payment Plan
            </button>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="bmp-gallery-section">
        <div className="bmp-container">
          <h2 className="bmp-section-title centered">Gallery</h2>
          <p className="bmp-section-subtitle centered">Explore the stunning aesthetics of Binghatti Mercedes Place</p>
        </div>
        <div className="bmp-gallery-scroll-container">
          <div className="bmp-gallery-scroll" style={isMobile ? { flexWrap: "wrap", justifyContent: "center", gap: "0.75rem" } : undefined}>
            {GALLERY_IMGS.map((img, i) => (
              <div
                className="bmp-gallery-item"
                key={img.alt}
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === "Enter" && openLightbox(i)}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section id="amenities" className="bmp-amenities-section">
        <div className="bmp-container">
          <h2 className="bmp-section-title centered">World-Class Amenities</h2>
          <p className="bmp-section-subtitle centered">
            Every amenity curated for a life of comfort, wellness, and indulgence.
          </p>
          <div className="bmp-amenities-grid" style={isMobile ? { gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" } : undefined}>
            {AMENITIES.map(a => (
              <div className="bmp-amenity-card" key={a.name}>
                <div className="bmp-amenity-icon">{a.icon}</div>
                <h3>{a.name}</h3>
              </div>
            ))}
          </div>
          <div className="bmp-cta-center">
            <button className="bmp-btn" onClick={() => setDownloadOpen(true)}>
              <DownloadSVG /> View All Amenities
            </button>
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section id="location" className="bmp-location-section">
        <div className="bmp-container">
          <h2 className="bmp-section-title centered">Prime Location</h2>
          <div className="bmp-location-content" style={isMobile ? { flexDirection: "column" } : undefined}>
            <div className="bmp-location-map">
              <iframe
                title="Binghatti Mercedes Place Location"
                src="https://www.google.com/maps?q=Binghatti%20Mercedes%20Benz%20Places%20Dubai&output=embed" src="https://www.google.com/maps?q=Binghatti%20Mercedes%20Benz%20Places%20Dubai&output=embed" loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="bmp-location-details">
              <h3>Strategically Located in Meydan, Dubai</h3>
              <p>Binghatti Mercedes Place is strategically located in Meydan, offering excellent connectivity to Dubai's key destinations.</p>
              <ul className="bmp-location-list">
                {[
                  "5 minutes to Dubai International Airport",
                  "10 minutes to Downtown Dubai",
                  "12 minutes to Business Bay",
                  "15 minutes to Dubai Mall",
                  "20 minutes to Palm Jumeirah",
                  "Easy access to Sheikh Zayed Road",
                  "Close to metro stations",
                  "Surrounded by shopping, dining & entertainment",
                ].map(l => <li key={l}>{l}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FLOOR PLANS ── */}
      <section id="floor-plan" className="bmp-floorplan-section">
        <div className="bmp-container">
          <h2 className="bmp-section-title centered">Floor Plans</h2>
          <div className="bmp-fp-tabs">
            {[["studio", "Studio"], ["1bed", "1 Bedroom"], ["2bed", "2 Bedroom"], ["3bed", "3 Bedroom"]].map(([key, label]) => (
              <button
                key={key}
                className={`bmp-fp-tab${activeFP === key ? " active" : ""}`}
                onClick={() => setActiveFP(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="bmp-fp-display" style={isMobile ? { flexDirection: "column" } : undefined}>
            <div className="bmp-fp-map">
              <img src={fp.img} alt={fp.title} loading="lazy" />
            </div>
            <div className="bmp-fp-panel">
              <h3>{fp.title}</h3>
              <div className="bmp-fp-specs">
                <div className="bmp-spec">
                  <div className="bmp-spec-label">Area</div>
                  <div className="bmp-spec-value">{fp.area}</div>
                </div>
                <div className="bmp-spec">
                  <div className="bmp-spec-label">Bathrooms</div>
                  <div className="bmp-spec-value">{fp.bath}</div>
                </div>
                <div className="bmp-spec">
                  <div className="bmp-spec-label">Balconies</div>
                  <div className="bmp-spec-value">{fp.balcony}</div>
                </div>
              </div>
              <div className="bmp-fp-features">
                <h4>Features</h4>
                <ul>
                  {fp.features.map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>
              <div className="bmp-fp-actions">
                <button className="bmp-btn" onClick={() => setDownloadOpen(true)}>
                  <DownloadSVG /> Download Floor Plan
                </button>
                <button className="bmp-btn outline" onClick={() => setDownloadOpen(true)}>
                  Schedule Viewing
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="bmp-contact-section">
        <div className="bmp-container">
          <h2 className="bmp-section-title centered white">Get in Touch</h2>
          <p className="bmp-contact-intro">
            Ready to make Binghatti Mercedes Place your new home? Our team is here to assist you every step of the way.
          </p>
          <div className="bmp-contact-content" style={isMobile ? { flexDirection: "column" } : undefined}>
            <div>
              <div className="bmp-contact-info">
                <div className="bmp-contact-card">
                  <div className="bmp-contact-icon"><PhoneSVG size={24} /></div>
                  <div>
                    <div className="bmp-contact-lbl">Call Us</div>
                    <a href="tel:+971509611671">+971 50 961 1671</a>
                  </div>
                </div>
                <div className="bmp-contact-card">
                  <div className="bmp-contact-icon wa"><WhatsappSVG size={24} /></div>
                  <div>
                    <div className="bmp-contact-lbl">WhatsApp</div>
                    <a href="https://wa.me/971509611671" target="_blank" rel="noreferrer">Chat with Us</a>
                  </div>
                </div>
                <div className="bmp-contact-card">
                  <div className="bmp-contact-icon"><EmailSVG /></div>
                  <div>
                    <div className="bmp-contact-lbl">Email Us</div>
                    <a href="mailto:info@matricardiestate.com">info@matricardiestate.com</a>
                  </div>
                </div>
              </div>
              <Newsletter />
            </div>
            <div className="bmp-form-wrapper">
              <h3>Quick Contact</h3>
              <p>Fill out the form and we'll get back to you shortly</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bmp-footer">
        <div className="bmp-container">
          <div className="bmp-footer-content" style={isMobile ? { flexDirection: "column", gap: "1.5rem", alignItems: "center", textAlign: "center" } : undefined}>
            <div className="bmp-footer-brand">
              <img src={IMGS.logo} alt="Binghatti Mercedes Place" style={{ height: 48, width: "auto", marginBottom: "1rem" }} />
              <p>Experience the fusion of automotive excellence and architectural brilliance in Dubai's most prestigious address.</p>
              <div className="bmp-footer-contact">
                <p>📞 +971 50 961 1671</p>
                <p>✉️ <a href="mailto:info@matricardiestate.com">info@matricardiestate.com</a></p>
                <p>📍 Meydan, Dubai, UAE</p>
              </div>
            </div>
            <div className="bmp-footer-links" style={isMobile ? { flexDirection: "column", gap: "1.5rem" } : undefined}>
              <div className="bmp-footer-col">
                <h4>Quick Links</h4>
                <ul>
                  {[["#overview", "Overview"], ["#residences", "Residences"], ["#payment-plan", "Payment Plan"], ["#amenities", "Amenities"], ["#floor-plan", "Floor Plans"]].map(([h, l]) => (
                    <li key={h}><a href={h}>{l}</a></li>
                  ))}
                </ul>
              </div>
              <div className="bmp-footer-col">
                <h4>Other Projects</h4>
                <ul>
                  {["Binghatti Hills", "Binghatti Skyrise", "Elle Residences", "Palm Central", "Sunset Bay"].map(p => (
                    <li key={p}><a href="#">{p}</a></li>
                  ))}
                </ul>
              </div>
              <div className="bmp-footer-col">
                <h4>Connect</h4>
                <ul>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setDownloadOpen(true); }}>Schedule Viewing</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setDownloadOpen(true); }}>Download Brochure</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setDownloadOpen(true); }}>Investment Guide</a></li>
                  <li><a href="https://wa.me/971509611671" target="_blank" rel="noreferrer">Contact Agent</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bmp-footer-bottom">
            <p>© Matricardi Estate 2026 — All Rights Reserved</p>
          </div>
        </div>
      </footer>

      {/* ── POPUPS ── */}
      <DownloadPopup open={downloadOpen} onClose={() => setDownloadOpen(false)} />
      <WelcomePopup open={welcomeOpen} onClose={() => setWelcomeOpen(false)} />
      <Lightbox imgs={GALLERY_IMGS} index={lightboxIdx} onClose={closeLightbox} onPrev={prevLightbox} onNext={nextLightbox} />
    </>
  );
}
