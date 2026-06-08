"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const skills = [
  { name: "Core Java", level: 90 },
  { name: "Advanced Java", level: 85 },
  { name: "JavaScript", level: 85 },
  { name: "Python", level: 80 },
  { name: "HTML / CSS", level: 88 },
  { name: "Data Structures & Algorithms", level: 85 },
  { name: "Object-Oriented Programming", level: 90 },
  { name: "MySQL / DBMS", level: 80 },
  { name: "JDBC", level: 75 },
  { name: "Machine Learning", level: 70 },
  { name: "Git / GitHub", level: 85 },
  { name: "Streamlit", level: 75 },
  { name: "GUI Applications", level: 78 },
  { name: "Web Development", level: 82 },
  { name: "UI/UX Design", level: 70 },
  { name: "NLP", level: 68 },
]

const projects = [
  {
    title: "Live Meeting Summarizer",
    description:
      "Real-time meeting transcription and summarization application leveraging NLP to capture key discussion points, action items, and decisions from live audio streams.",
    tech: ["Python", "NLP", "Whisper AI", "Transformers", "Flask"],
    github: "https://github.com/SurajMoreTech/AI_internship-main",
    live: "https://aiinternship-maingit-7ucbm7rtdxmgrpx6objk69.streamlit.app/",
    gradient: "from-[#6c5ce7] to-[#a29bfe]",
    featured: true,
    icon: "🎙️",
    highlights: ["Whisper AI Transcription", "Auto-Summary Generation", "Action Item Extraction"],
  },
  {
    title: "Electricity Billing System",
    description:
      "Comprehensive billing system with automated bill generation, customer management dashboard, usage analytics, and payment tracking — built with robust Java backend.",
    tech: ["Core Java", "Swing", "JDBC", "MySQL"],
    github: "https://github.com/SurajMoreTech/Electricity-billing-system",
    gradient: "from-[#667eea] to-[#764ba2]",
    featured: true,
    icon: "⚡",
    highlights: ["Auto Bill Generation", "Customer Dashboard", "Usage Analytics"],
  },
  {
    title: "PRObot",
    description:
      "Web-based AI chatbot handling real-time user queries including mental health, business, and career guidance.",
    tech: ["HTML", "CSS", "JavaScript", "Botpress"],
    github: "https://github.com/SurajMoreTech/multi-domain-chatbot",
    live: "https://surajmoretech.github.io/multi-domain-chatbot/",
    gradient: "from-[#f093fb] to-[#f5576c]",
    featured: true,
    icon: "🤖",
    highlights: ["Multi-Domain AI", "Mental Health Support", "Career Guidance"],
  },
  {
    title: "Loan Approval Prediction",
    description:
      "ML-powered web app predicting loan approvals in real-time. Features interactive form inputs, instant probability scoring, and visual analytics dashboard with model accuracy insights.",
    tech: ["Python", "Streamlit", "scikit-learn", "Pandas"],
    github: "https://github.com/SurajMoreTech/loan-prediction",
    gradient: "from-[#4facfe] to-[#00f2fe]",
    icon: "💰",
    highlights: ["Real-Time Predictions", "Visual Analytics", "92% Accuracy"],
  },
  {
    title: "Weather App",
    description:
      "Beautiful weather dashboard with live forecasts, location search, animated weather icons, temperature trends, and responsive design that works seamlessly across all devices.",
    tech: ["HTML", "CSS", "JavaScript", "Weather API"],
    github: "https://github.com/SurajMoreTech/weather-app",
    gradient: "from-[#a18cd1] to-[#fbc2eb]",
    icon: "🌤️",
    highlights: ["Live Forecasts", "Location Search", "Animated Icons"],
  },
  {
    title: "Rock Paper Scissors",
    description:
      "Addictive browser game with sleek animations, real-time score tracking, win/loss streaks, AI opponent with difficulty levels, and satisfying visual feedback on every move.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/SurajMoreTech/RPS-Game",
    gradient: "from-[#ffecd2] to-[#fcb69f]",
    icon: "🎮",
    highlights: ["AI Opponent", "Score Tracking", "Smooth Animations"],
  },
  {
    title: "Portfolio",
    description:
      "This very portfolio — a premium, scroll-driven experience with GSAP animations, glassmorphism UI, horizontal scroll galleries, and an Easter egg Konami code surprise.",
    tech: ["Next.js", "React", "Tailwind CSS", "GSAP"],
    github: "https://github.com/SurajMoreTech/portfolio",
    live: "https://surajmoretech.github.io/portfolio/",
    gradient: "from-[#ffd700] to-[#ff8c00]",
    icon: "✨",
    highlights: ["GSAP Animations", "Glassmorphism", "Easter Egg 🐱"],
  },
  {
    title: "Desktop Notifier",
    description:
      "Cross-platform desktop notification tool that delivers customizable alerts, scheduled reminders, and system tray integration — never miss an important task again.",
    tech: ["Python"],
    github: "https://github.com/SurajMoreTech/Desktop---notifier",
    gradient: "from-[#00b894] to-[#55efc4]",
    icon: "🔔",
    highlights: ["Custom Alerts", "Scheduled Reminders", "System Tray"],
  },
]

const achievements = [
  {
    title: "NLPC-2026 — First Prize Winner",
    description:
      "Won First Prize (₹5,000) at the National Level Project Competition (NLPC-2026) organized by IETE Pune Centre in association with G.H. Raisoni College of Engineering and Management, Pune. April 4, 2026.",
    images: [
      "/achievements/IMG_1357.JPG",
      "/achievements/IMG_1373.JPG",
      "/achievements/IMG_1387.JPG",
    ],
    gradient: "from-[#ffd700] to-[#ff8c00]",
    icon: "🏆",
  },
  {
    title: "Best Idea Competition — Winner",
    description:
      "Won the Best Idea Competition (Final Round) at G.H. Raisoni College of Engineering and Management, Pune, organized by the Institution's Innovation Council. April 11, 2026.",
    images: ["/achievements/IMG_1520.JPG", "/achievements/IMG_1532.JPG"],
    gradient: "from-[#856eff] to-[#a891ff]",
    icon: "💡",
  },
  {
    title: "NLPC-26 National Finals — D.Y. Patil",
    description:
      "Competed in the Innovation Meet & Final Round of the National Level Project Competition (NLPC-26) at D.Y. Patil College of Engineering, Akurdi, Pune. April 24, 2026.",
    images: ["/achievements/IMG_1680.jpg", "/achievements/IMG_1698.JPG"],
    gradient: "from-[#4facfe] to-[#00f2fe]",
    icon: "🎯",
  },
  {
    title: "AI Internship — Infosys Springboard",
    description:
      "Successfully completed a 2-month Artificial Intelligence internship at Infosys Springboard, gaining hands-on experience with modern AI and machine learning technologies.",
    images: [],
    pdfLink: "/certifi/Infosys  intership completion.pdf",
    gradient: "from-[#00b894] to-[#55efc4]",
    icon: "💼",
  },
]

const certifications = [
  {
    title: "Java Programming",
    desc: "Comprehensive Java course covering beginner to advanced concepts",
    color: "from-[#ffd89b] to-[#f5a623]",
    href: "https://drive.google.com/file/d/1idsHXdStQkgGi5u6qU2uHwZAF_rkHd-A/view?pli=1",
  },
  {
    title: "Enhancing Soft Skills & Personality",
    desc: "8-week NPTEL course on communication, leadership, and teamwork",
    color: "from-[#f8a8dd] to-[#f093fb]",
    href: "https://drive.google.com/file/d/1m1Xvh8OlIT9mgpy8nFODN2c_5JVKY9Tc/view",
  },
  {
    title: "Data Science (Infosys)",
    desc: "Comprehensive data science certification covering analytics and machine learning",
    color: "from-[#667eea] to-[#764ba2]",
    href: "https://drive.google.com/file/d/1u3_mk1s6HLUd5sVtATcLDSrJQNq7uFKH/view?usp=sharing",
  },
  {
    title: "NLP (Infosys)",
    desc: "Natural Language Processing certification covering text analysis and language models",
    color: "from-[#4facfe] to-[#00f2fe]",
    href: "https://drive.google.com/file/d/1dmN6a5boH63HlPOd6wqQeWSOMKehMta8/view?usp=sharing",
  },
  {
    title: "AI & Machine Learning (Infosys)",
    desc: "Artificial Intelligence primer and deep learning for developers certification",
    color: "from-[#a18cd1] to-[#fbc2eb]",
  },
  {
    title: "Generative AI (Infosys)",
    desc: "Generative models, OpenAI GPT, and prompt engineering certifications",
    color: "from-[#ff6b6b] to-[#ee5a24]",
  },
  {
    title: "Computer Vision (Infosys)",
    desc: "Computer vision fundamentals and applications certification",
    color: "from-[#6c5ce7] to-[#a29bfe]",
  },
  {
    title: "Data Analytics (Deloitte)",
    desc: "Data analytics certification from Deloitte covering business analytics",
    color: "from-[#00b894] to-[#55efc4]",
  },
  {
    title: "Infosys Internship",
    desc: "Successful completion of Infosys internship program",
    color: "from-[#ffecd2] to-[#fcb69f]",
  },
  {
    title: "Agile & Scrum (Infosys)",
    desc: "Agile Scrum methodology certification for software development",
    color: "from-[#dfe6e9] to-[#b2bec3]",
  },
]

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/suraj-more-476112364/",
  },
  { label: "GitHub", href: "https://github.com/SurajMoreTech" },
  { label: "LeetCode", href: "https://leetcode.com/u/suraj_more27/" },
]

function AchievementCard({
  achievement,
}: {
  achievement: (typeof achievements)[0]
}) {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (achievement.images && achievement.images.length > 0) {
      const interval = setInterval(() => {
        setActiveImage((prev) => (prev + 1) % achievement.images.length)
      }, 3500)
      return () => clearInterval(interval)
    }
  }, [achievement.images])

  return (
    <div className="liquid-glass group overflow-hidden rounded-[2rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_80px_rgba(133,110,255,0.15)]">
      <div className="relative h-72 w-full overflow-hidden sm:h-80">
        {achievement.images && achievement.images.length > 0 ? (
          <>
            {achievement.images.map((img, idx) => (
              <img
                key={img}
                src={img}
                alt={`${achievement.title} photo ${idx + 1}`}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
                style={{
                  opacity: activeImage === idx ? 1 : 0,
                  transform: activeImage === idx ? "scale(1)" : "scale(1.08)",
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </>
        ) : (
          <div
            className={`absolute inset-0 h-full w-full bg-gradient-to-br ${achievement.gradient}`}
          />
        )}
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
          <div
            className={`inline-block rounded-full bg-gradient-to-r ${achievement.gradient} px-4 py-1.5 text-xs font-bold text-white shadow-lg`}
          >
            {achievement.icon} {achievement.title.split("—")[0].trim()}
          </div>
          {achievement.images && achievement.images.length > 0 && (
            <div className="flex gap-1.5">
              {achievement.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: activeImage === idx ? 24 : 8,
                    backgroundColor:
                      activeImage === idx
                        ? "white"
                        : "rgba(255,255,255,0.45)",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="p-6 sm:p-7">
        <h3 className="text-lg font-black tracking-tight">
          {achievement.title}
        </h3>
        <p className="mt-2 text-sm font-medium leading-relaxed text-black/55">
          {achievement.description}
        </p>
        {(!achievement.images || achievement.images.length === 0) &&
          "pdfLink" in achievement && (
            <a
              href={achievement.pdfLink}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.16em] text-black/45 transition-colors hover:text-black"
            >
              View Certificate →
            </a>
          )}
      </div>
    </div>
  )
}

function EasterEggCat() {
  const [visible, setVisible] = useState(false)
  const konamiBuffer = useRef<string[]>([])
  const catRef = useRef<HTMLDivElement>(null)
  const konamiRef = useRef([
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    konamiBuffer.current.push(e.key)
    if (konamiBuffer.current.length > konamiRef.current.length) {
      konamiBuffer.current.shift()
    }
    if (
      konamiBuffer.current.length === konamiRef.current.length &&
      konamiBuffer.current.every((k, i) => k === konamiRef.current[i])
    ) {
      setVisible(true)
      konamiBuffer.current = []
    }
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (visible && catRef.current) {
      gsap.fromTo(
        catRef.current,
        { opacity: 0, y: 60, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
        }
      )
    }
  }, [visible])

  if (!visible) return null

  return (
    <section className="px-5 py-32 sm:px-8 lg:px-12 lg:py-48">
      <div ref={catRef} className="mx-auto max-w-[1480px]">
        <div className="mb-12 text-center">
          <p className="section-number text-sm font-bold uppercase tracking-[0.28em] text-black/50">
            🐱 Secret
          </p>
          <h2 className="animated-gradient-text mt-5 bg-gradient-to-r from-[#856eff] via-[#f8a8dd] to-[#4facfe] text-5xl font-black tracking-[-0.06em] sm:text-7xl">
            You found me!
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base font-medium text-black/55">
            Thanks for exploring! Check out my YouTube channel for more
            creative tech content.
          </p>
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="liquid-glass overflow-hidden rounded-[2rem] p-8 text-center sm:p-12">
            <div className="cat-scene mx-auto mb-8 flex items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                className="h-52 w-52 drop-shadow-xl"
                style={{ animation: "cat-float 3s ease-in-out infinite" }}
              >
                <defs>
                  <linearGradient id="catGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#856eff" />
                    <stop offset="50%" stopColor="#f8a8dd" />
                    <stop offset="100%" stopColor="#4facfe" />
                  </linearGradient>
                  <linearGradient id="earGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a891ff" />
                    <stop offset="100%" stopColor="#f093fb" />
                  </linearGradient>
                </defs>
                <polygon points="45,70 60,30 80,65" fill="url(#earGrad)" stroke="#856eff" strokeWidth="2" />
                <polygon points="155,70 140,30 120,65" fill="url(#earGrad)" stroke="#856eff" strokeWidth="2" />
                <polygon points="40,72 56,34 75,67 100,55 125,67 144,34 160,72 170,100 165,140 145,165 100,178 55,165 35,140 30,100" fill="url(#catGrad)" stroke="#7c5ce7" strokeWidth="2.5" strokeLinejoin="round" />
                <polygon points="52,80 62,42 78,70" fill="#f8a8dd" opacity="0.5" />
                <polygon points="148,80 138,42 122,70" fill="#f8a8dd" opacity="0.5" />
                <circle cx="75" cy="100" r="10" fill="white" />
                <circle cx="125" cy="100" r="10" fill="white" />
                <circle cx="78" cy="98" r="5" fill="#111114">
                  <animate attributeName="cx" values="78;80;78;76;78" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="128" cy="98" r="5" fill="#111114">
                  <animate attributeName="cx" values="128;130;128;126;128" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="80" cy="96" r="1.5" fill="white" />
                <circle cx="130" cy="96" r="1.5" fill="white" />
                <polygon points="97,118 103,118 100,123" fill="#f093fb" />
                <path d="M 85 130 Q 92 140 100 130 Q 108 140 115 130" fill="none" stroke="#111114" strokeWidth="2" strokeLinecap="round" />
                <line x1="30" y1="108" x2="68" y2="112" stroke="#bba5ff" strokeWidth="1.5" opacity="0.6" />
                <line x1="25" y1="118" x2="68" y2="118" stroke="#bba5ff" strokeWidth="1.5" opacity="0.6" />
                <line x1="30" y1="128" x2="68" y2="124" stroke="#bba5ff" strokeWidth="1.5" opacity="0.6" />
                <line x1="132" y1="112" x2="170" y2="108" stroke="#bba5ff" strokeWidth="1.5" opacity="0.6" />
                <line x1="132" y1="118" x2="175" y2="118" stroke="#bba5ff" strokeWidth="1.5" opacity="0.6" />
                <line x1="132" y1="124" x2="170" y2="128" stroke="#bba5ff" strokeWidth="1.5" opacity="0.6" />
              </svg>
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-black/40">
              Low-Poly Cat says meow! 🎬
            </p>
            <p className="mt-3 text-xs font-medium text-black/35">
              You entered the Konami Code — you&apos;re a true explorer.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barRef.current) return

    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      onUpdate: (self) => {
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${self.progress})`
        }
      },
    })
  }, [])

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{ transform: "scaleX(0)" }}
    />
  )
}

export function PortfolioContent() {
  const root = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState("")
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutPinRef = useRef<HTMLDivElement>(null)
  const skillsPinRef = useRef<HTMLDivElement>(null)
  const projectsPinRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const heroTl = gsap.timeline()
      heroTl
        .fromTo(
          "[data-hero-sub]",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(
          "[data-hero-title]",
          { opacity: 0, y: 60, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          "[data-hero-desc]",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          "[data-scroll-hint]",
          { opacity: 0 },
          { opacity: 1, duration: 1.0, ease: "power2.out" },
          "-=0.3"
        )

      if (aboutPinRef.current) {
        const aboutTl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutPinRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
            pinSpacing: true,
          },
        })

        aboutTl
          .fromTo(
            "[data-about-label]",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.3 }
          )
          .fromTo(
            "[data-about-heading]",
            { opacity: 0, y: 80, scale: 0.85 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5 },
            "-=0.1"
          )
          .fromTo(
            "[data-about-glass]",
            { opacity: 0, x: 80 },
            { opacity: 1, x: 0, duration: 0.5 },
            "-=0.3"
          )
          .fromTo(
            "[data-about-stat]",
            { opacity: 0, y: 20, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.08 },
            "-=0.2"
          )
      }

      if (skillsPinRef.current) {
        const skillsTl = gsap.timeline({
          scrollTrigger: {
            trigger: skillsPinRef.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1,
            pinSpacing: true,
          },
        })

        skillsTl
          .fromTo(
            "[data-skills-label]",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.2 }
          )
          .fromTo(
            "[data-skills-heading]",
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 0.3 },
            "-=0.1"
          )
          .fromTo(
            "[data-skill]",
            { opacity: 0, y: 30, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.2, stagger: 0.03 },
            "-=0.1"
          )
      }

      if (projectsPinRef.current && horizontalRef.current) {
        const featuredCards = horizontalRef.current.querySelectorAll("[data-featured-card]")
        const totalScrollWidth = horizontalRef.current.scrollWidth - window.innerWidth + 100

        if (totalScrollWidth > 0) {
          gsap.to(horizontalRef.current, {
            x: -totalScrollWidth,
            ease: "none",
            scrollTrigger: {
              trigger: projectsPinRef.current,
              start: "top top",
              end: `+=${totalScrollWidth * 1.5}`,
              pin: true,
              scrub: 1.2,
              pinSpacing: true,
            },
          })

          featuredCards.forEach((card, i) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 40, rotateY: -8 },
              {
                opacity: 1,
                y: 0,
                rotateY: 0,
                duration: 0.5,
                scrollTrigger: {
                  trigger: card,
                  start: "left 80%",
                  end: "left 40%",
                  containerAnimation: gsap.getById?.("horizontal-scroll") || undefined,
                  toggleActions: "play none none reverse",
                },
              }
            )
          })
        }
      }

      gsap.utils.toArray<HTMLElement>("[data-scroll-fade]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 80, rotateX: 8 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>("[data-achievement]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })

      const sectionIds = ["top", "about", "skills", "projects", "achievements"]
      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: "top 40%",
          end: "bottom 40%",
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        })
      })
    }, root)

    return () => context.revert()
  }, [])

  return (
    <main ref={root} className="relative z-10">
      <ScrollProgress />

      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.04] bg-[#F5F5F7]/50 backdrop-blur-[40px]">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a
            href="#top"
            className="flex items-center gap-2"
          >
            <img
              src="/logo.png"
              alt="Suraj More Logo"
              className="h-9 w-auto object-contain"
            />
          </a>
          <nav className="flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.18em] text-black/60 sm:gap-8">
            {[
              { id: "about", label: "About" },
              { id: "skills", label: "Skills" },
              { id: "projects", label: "Projects" },
              { id: "achievements", label: "Wins" },
            ].map((item) => (
              <a
                key={item.id}
                className={`nav-link-underline transition-colors hover:text-black ${
                  activeSection === item.id ? "active text-black" : ""
                } ${item.id === "achievements" ? "hidden sm:block" : ""}`}
                href={`#${item.id}`}
              >
                {item.label}
              </a>
            ))}
            <a
              className="nav-link-underline transition-colors hover:text-black"
              href="mailto:surajmore29732@gmail.com"
            >
              Contact
            </a>
          </nav>
          <div className="hidden items-center gap-4 text-xs font-bold uppercase tracking-[0.12em] text-black/60 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-black"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <section
        id="top"
        className="relative flex min-h-screen flex-col items-center justify-center px-5 sm:px-8 lg:px-12"
      >
        <div className="mx-auto w-full max-w-[1480px] text-center">
          <p
            data-hero-sub
            className="mb-8 text-sm font-semibold uppercase tracking-[0.35em] text-black/50"
          >
            Computer Engineering Student
          </p>
          <h1
            data-hero-title
            className="section-massive mx-auto max-w-[1200px] text-[#111114]"
          >
            Suraj
            <br />
            Mahesh More
          </h1>
          <p
            data-hero-desc
            className="mx-auto mt-10 max-w-2xl text-lg font-medium leading-relaxed text-black/60 sm:text-xl"
          >
            Passionate problem solver building thoughtful software with Java,
            data structures, algorithms, and modern web technologies.
          </p>
          <div
            data-hero-cta
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              className="hero-cta rounded-full bg-[#111114] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-white transition-all hover:bg-[#856eff]"
              href="#about"
            >
              Explore Profile
            </a>
            <a
              className="hero-cta rounded-full border border-black/15 bg-white/55 px-8 py-3.5 text-sm font-bold uppercase tracking-[0.16em] backdrop-blur-xl"
              href="#projects"
            >
              View Projects
            </a>
          </div>
        </div>
        <div
          data-scroll-hint
          className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/30">
              Scroll
            </span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-black/30 to-transparent" />
          </div>
        </div>
      </section>

      <section
        id="about"
        ref={aboutPinRef}
        className="flex min-h-screen items-center px-5 sm:px-8 lg:px-12"
      >
        <div className="mx-auto grid w-full max-w-[1480px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p
              data-about-label
              className="section-number text-sm font-bold uppercase tracking-[0.28em] text-black/50"
            >
              01 About
            </p>
            <h2
              data-about-heading
              className="mt-5 text-[clamp(3rem,8vw,7rem)] font-black leading-[0.88] tracking-[-0.06em]"
            >
              A curious
              <br />
              builder.
            </h2>
          </div>
          <div
            data-about-glass
            className="liquid-glass rounded-[2.5rem] p-8 sm:p-10 lg:p-14"
          >
            <div className="space-y-6 text-base font-medium leading-relaxed text-black/65 sm:text-lg lg:text-xl">
              <p>
                I&apos;m a dedicated Computer Engineering student pursuing my
                degree at G.H. Raisoni College of Engineering and Management,
                Pune, with a strong foundation in Data Structures, Algorithms,
                and Core/Advanced Java.
              </p>
              <p>
                Proficient in Object-Oriented Programming, MySQL, and DBMS, I
                enjoy solving complex problems and turning ideas into useful
                software.
              </p>
              <p>
                I have experience building GUI-based and web applications using
                modern technologies and frameworks, and I&apos;m eager to
                contribute to innovative software development teams.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { value: "7.21", label: "CGPA" },
                { value: "7+", label: "Projects" },
                { value: "3", label: "Wins" },
              ].map((stat) => (
                <div
                  data-about-stat
                  key={stat.label}
                  className="rounded-2xl bg-white/50 p-5 text-center backdrop-blur-sm"
                >
                  <div className="text-3xl font-black tracking-tight text-[#111114] sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="skills"
        ref={skillsPinRef}
        className="flex min-h-screen items-center px-5 sm:px-8 lg:px-12"
      >
        <div className="mx-auto w-full max-w-[1480px]">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p
                data-skills-label
                className="section-number text-sm font-bold uppercase tracking-[0.28em] text-black/50"
              >
                02 Skills
              </p>
              <h2
                data-skills-heading
                className="mt-5 text-[clamp(3rem,8vw,7rem)] font-black leading-[0.88] tracking-[-0.06em]"
              >
                Technical
                <br />
                toolkit.
              </h2>
            </div>
            <p className="max-w-md text-sm font-medium leading-relaxed text-black/50 sm:text-base">
              Programming fundamentals, database fluency, and a growing applied
              machine learning practice.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill) => (
              <div
                data-skill
                className="skill-pill liquid-glass group relative overflow-hidden rounded-2xl px-5 py-5"
                key={skill.name}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-[-0.02em]">
                    {skill.name}
                  </span>
                  <span className="text-xs font-bold text-black/35">
                    {skill.level}%
                  </span>
                </div>
                <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-black/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#856eff] to-[#f8a8dd] transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="px-5 py-32 sm:px-8 lg:px-12 lg:py-48"
      >
        <div className="mx-auto max-w-[1480px]">
          <div data-scroll-fade className="mb-14">
            <p className="section-number text-sm font-bold uppercase tracking-[0.28em] text-black/50">
              03 Projects
            </p>
            <h2 className="mt-5 text-[clamp(3rem,8vw,7rem)] font-black leading-[0.88] tracking-[-0.06em]">
              Selected
              <br />
              work.
            </h2>
          </div>

          <div ref={projectsPinRef} className="relative">
            <div
              ref={horizontalRef}
              className="horizontal-scroll-container mb-14"
            >
              {projects
                .filter((p) => "featured" in p && p.featured)
                .map((project) => (
                  <div
                    data-featured-card
                    className="group w-[85vw] flex-shrink-0 sm:w-[70vw] lg:w-[45vw]"
                    key={project.title}
                    style={{ perspective: "1000px" }}
                  >
                    <div className="liquid-glass overflow-hidden rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_80px_rgba(133,110,255,0.15)]">
                      <div
                        className={`relative h-56 bg-gradient-to-br ${project.gradient} flex items-end p-8 transition-transform duration-500 group-hover:scale-[1.02] sm:h-72`}
                      >
                        <div className="absolute right-6 top-6 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                          Featured
                        </div>
                        {"icon" in project && (
                          <span className="absolute left-6 top-6 text-3xl drop-shadow-lg">
                            {project.icon}
                          </span>
                        )}
                        <h3 className="text-3xl font-black text-white drop-shadow-sm sm:text-4xl">
                          {project.title}
                        </h3>
                      </div>
                      <div className="p-8">
                        <p className="mb-4 text-base font-medium leading-relaxed text-black/60">
                          {project.description}
                        </p>
                        {"highlights" in project && project.highlights && (
                          <div className="mb-5 flex flex-wrap gap-2">
                            {(project.highlights as string[]).map((h) => (
                              <span
                                key={h}
                                className={`rounded-full bg-gradient-to-r ${project.gradient} px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm`}
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="mb-6 flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span
                              className="rounded-full bg-black/[0.04] px-3.5 py-1.5 text-xs font-semibold text-black/55"
                              key={t}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          {"github" in project && project.github && (
                            <a
                              className="rounded-full border border-black/12 bg-white/60 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] backdrop-blur-sm transition-all hover:bg-black hover:text-white"
                              href={project.github}
                              rel="noreferrer"
                              target="_blank"
                            >
                              GitHub
                            </a>
                          )}
                          {"live" in project && project.live && (
                            <a
                              className="rounded-full border border-black/12 bg-gradient-to-r from-[#856eff] to-[#f8a8dd] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all hover:opacity-85"
                              href={project.live}
                              rel="noreferrer"
                              target="_blank"
                            >
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects
              .filter((p) => !("featured" in p) || !p.featured)
              .map((project) => (
                <div
                  data-project
                  className="group liquid-glass overflow-hidden rounded-[2rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_80px_rgba(133,110,255,0.12)]"
                  key={project.title}
                  style={{ perspective: "1000px" }}
                >
                  <div
                    className={`relative h-44 bg-gradient-to-br ${project.gradient} flex items-end p-7 transition-transform duration-500 group-hover:scale-[1.02]`}
                  >
                    {"icon" in project && (
                      <span className="absolute right-5 top-5 text-2xl drop-shadow-lg">
                        {project.icon}
                      </span>
                    )}
                    <h3 className="text-xl font-black text-white drop-shadow-sm">
                      {project.title}
                    </h3>
                  </div>
                  <div className="p-7">
                    <p className="mb-4 text-sm font-medium leading-relaxed text-black/60">
                      {project.description}
                    </p>
                    {"highlights" in project && project.highlights && (
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {(project.highlights as string[]).map((h) => (
                          <span
                            key={h}
                            className={`rounded-full bg-gradient-to-r ${project.gradient} px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm`}
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mb-5 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-semibold text-black/55"
                          key={t}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {"github" in project && project.github && (
                        <a
                          className="rounded-full border border-black/12 bg-white/60 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] backdrop-blur-sm transition-all hover:bg-black hover:text-white"
                          href={project.github}
                          rel="noreferrer"
                          target="_blank"
                        >
                          GitHub
                        </a>
                      )}
                      {"live" in project && project.live && (
                        <a
                          className="rounded-full border border-black/12 bg-gradient-to-r from-[#856eff] to-[#f8a8dd] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all hover:opacity-85"
                          href={project.live}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section
        id="achievements"
        className="px-5 py-32 sm:px-8 lg:px-12 lg:py-48"
      >
        <div className="mx-auto max-w-[1480px]">
          <div data-scroll-fade className="mb-14">
            <p className="section-number text-sm font-bold uppercase tracking-[0.28em] text-black/50">
              04 Achievements
            </p>
            <h2 className="mt-5 text-[clamp(3rem,8vw,7rem)] font-black leading-[0.88] tracking-[-0.06em]">
              Wins &
              <br />
              milestones.
            </h2>
            <p className="mt-8 max-w-xl text-base font-medium leading-relaxed text-black/50">
              Hackathon victories, innovation awards, and national-level
              competition highlights.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <div data-achievement key={achievement.title}>
                <AchievementCard achievement={achievement} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-32 sm:px-8 lg:px-12 lg:py-48">
        <div className="mx-auto max-w-[1480px]">
          <div data-scroll-fade className="mb-14">
            <p className="section-number text-sm font-bold uppercase tracking-[0.28em] text-black/50">
              05 Education
            </p>
            <h2 className="mt-5 text-[clamp(3rem,8vw,7rem)] font-black leading-[0.88] tracking-[-0.06em]">
              Academic
              <br />
              journey.
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div data-scroll-fade className="liquid-glass rounded-[2.5rem] p-8 sm:p-10">
              <div className="mb-3 inline-block rounded-full bg-gradient-to-r from-[#856eff] to-[#a891ff] px-4 py-1.5 text-xs font-bold text-white">
                2022 – 2026
              </div>
              <h3 className="text-xl font-black tracking-tight">
                Computer Engineering
              </h3>
              <p className="mt-2 text-sm font-medium text-black/55">
                G.H. Raisoni College of Engineering and Management, Pune
              </p>
              <div className="mt-5 text-3xl font-black tracking-tight text-[#856eff]">
                7.21 <span className="text-sm font-bold text-black/35">CGPA</span>
              </div>
            </div>
            <div data-scroll-fade className="liquid-glass rounded-[2.5rem] p-8 sm:p-10">
              <div className="mb-3 inline-block rounded-full bg-gradient-to-r from-[#f8a8dd] to-[#f093fb] px-4 py-1.5 text-xs font-bold text-white">
                2020 – 2022
              </div>
              <h3 className="text-xl font-black tracking-tight">Class XII</h3>
              <p className="mt-2 text-sm font-medium text-black/55">
                Assembly of God Church School, Rupaidha, UP
              </p>
              <div className="mt-5 text-3xl font-black tracking-tight text-[#f8a8dd]">
                71.6<span className="text-sm font-bold text-black/35">%</span>
              </div>
            </div>
            <div data-scroll-fade className="liquid-glass rounded-[2.5rem] p-8 sm:p-10">
              <div className="mb-3 inline-block rounded-full bg-gradient-to-r from-[#4facfe] to-[#00f2fe] px-4 py-1.5 text-xs font-bold text-white">
                2019 – 2020
              </div>
              <h3 className="text-xl font-black tracking-tight">Class X</h3>
              <p className="mt-2 text-sm font-medium text-black/55">
                Assembly of God Church School, Rupaidha, UP
              </p>
              <div className="mt-5 text-3xl font-black tracking-tight text-[#4facfe]">
                74.6<span className="text-sm font-bold text-black/35">%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-32 sm:px-8 lg:px-12 lg:py-48">
        <div className="mx-auto max-w-[1480px]">
          <div data-scroll-fade className="mb-14">
            <p className="section-number text-sm font-bold uppercase tracking-[0.28em] text-black/50">
              06 Certifications
            </p>
            <h2 className="mt-5 text-[clamp(3rem,8vw,7rem)] font-black leading-[0.88] tracking-[-0.06em]">
              Always
              <br />
              learning.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <div
                data-scroll-fade
                className="liquid-glass group rounded-[2rem] p-7 transition-all duration-400 hover:-translate-y-1 hover:shadow-lg sm:p-8"
                key={cert.title}
              >
                <div
                  className={`mb-4 inline-block h-2 w-16 rounded-full bg-gradient-to-r ${cert.color}`}
                />
                <h3 className="text-lg font-black tracking-tight">
                  {cert.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-black/55">
                  {cert.desc}
                </p>
                {cert.href && (
                  <a
                    className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.16em] text-black/45 transition-colors hover:text-black"
                    href={cert.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    View Certificate →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <EasterEggCat />

      <footer className="section-dark relative overflow-hidden px-5 pb-12 pt-32 sm:px-8 lg:px-12 lg:pt-48">
        <div className="mx-auto max-w-[1480px]">
          <div data-scroll-fade className="mb-16 text-center">
            <p className="section-number text-sm font-bold uppercase tracking-[0.28em] text-white/40">
              07 Contact
            </p>
            <h2 className="mt-5 text-[clamp(3rem,10vw,9rem)] font-black leading-[0.85] tracking-[-0.06em] text-white">
              Let&apos;s
              <br />
              connect.
            </h2>
            <p className="mx-auto mt-8 max-w-lg text-lg font-medium text-white/50">
              I&apos;m always excited to discuss new opportunities, collaborate
              on projects, or chat about technology.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                className="hero-cta rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-black transition-all hover:bg-[#856eff] hover:text-white"
                href="mailto:surajmore29732@gmail.com"
              >
                Send an Email
              </a>
              <a
                className="hero-cta rounded-full border border-white/20 bg-white/8 px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white backdrop-blur-xl transition-all hover:bg-white/15"
                href="tel:+917068022949"
              >
                +91 7068022949
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-7 border-t border-white/10 pt-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold tracking-[-0.025em] text-white">
                Suraj Mahesh More
              </p>
              <p className="mt-1 text-xs font-medium text-white/35">
                Pune, Maharashtra, India
              </p>
            </div>
            <div className="flex gap-6">
              {links.map((link) => (
                <a
                  className="nav-link-underline text-xs font-bold uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-white"
                  href={link.href}
                  key={link.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
