import { useEffect, useRef, useState } from "react";
import { EXPERIENCES, PROJECTS, SKILLS, TICKER_ITEMS } from "./constants/constants";

import pfp from "./img/pfp.jpg"
import resume from "./img/SIRRIRAYANECV.pdf"

type menus = "home" | "about" | "experiences" | "projects" | "skills" | "contact";

function useCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return pos;
}

function useTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const idInter = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(idInter);
  }, []);
  return time;
}

function GlitchText({ text, className = '' }: { text: string; className?: string }) {
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    const fire = () => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 300)
    }
    const id = setInterval(fire, 4000 + Math.random() * 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className={`relative inline-block ${className}`}>
      {text}
      {glitching && (
        <>
          <span
            className="absolute inset-0 glitch-layer text-[#57e5ff]"
            aria-hidden
          >
            {text}
          </span>
          <span
            className="absolute inset-0 glitch-layer text-[#ff7857]"
            aria-hidden
            style={{ animationDelay: '0.05s' }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  )
}

function SkillBar({ label, level }: { label: string; level: number }) {
  const [filled, setFilled] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setFilled(level), 100)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [level])

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-xs tracking-widest text-[#888] uppercase">{label}</span>
        <span className="font-mono text-xs text-[#c8ff57]">{filled > 0 ? `${level}%` : '—'}</span>
      </div>
      <div className="h-px bg-[#222] relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-[#c8ff57] transition-all duration-1000 ease-out"
          style={{ width: `${filled}%` }}
        />
      </div>
    </div>
  )
}

function ProjectCard({ p, index }: { p: (typeof PROJECTS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={p.link}
      className="block border border-[#222] p-6 relative overflow-hidden transition-all duration-300 group"
      style={{
        background: hovered ? '#111' : 'transparent',
        borderColor: hovered ? p.color : '#222',
      }}
      target="_blank"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
        style={{ background: p.color }}
      />

      <div className="flex items-start justify-between mb-4">
        <span
          className="font-mono text-xs tracking-widest"
          style={{ color: hovered ? p.color : '#666' }}
        >
          {p.id} / {p.year}
        </span>
        <span
          className="font-mono text-xs transition-transform duration-300 group-hover:translate-x-1"
          style={{ color: p.color, opacity: hovered ? 1 : 0 }}
        >
          ↗
        </span>
      </div>

      <h3
        className="font-display text-2xl font-bold mb-3 transition-colors duration-300"
        style={{
          fontVariationSettings: '"opsz" 72',
          color: hovered ? p.color : '#f0ede8',
        }}
      >
        {p.title}
      </h3>

      <p className="text-sm text-[#888] leading-relaxed mb-4">{p.desc}</p>

      <div className="flex gap-2 flex-wrap">
        {p.tags.map((tag) => (
          <span
            key={tag}
            style={{
              color: hovered ? p.color2 : '#666',
            }}
            className="font-mono text-xs px-2 py-1 border border-[#333] text-[#666]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className="absolute bottom-0 left-0 h-px transition-all duration-500"
        style={{
          background: p.color,
          width: hovered ? '100%' : '0%',
        }}
      />
    </a>
  )
}

function ExperienceCard({ p, index }: { p: (typeof EXPERIENCES)[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      className="block border border-[#222] p-6 relative overflow-hidden transition-all duration-300 group"
      style={{
        background: hovered ? '#111' : 'transparent',
        borderColor: hovered ? p.color : '#222',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
        style={{ background: p.color }}
      />

      <div className="flex items-start justify-between mb-4">
        <span
          className="font-mono text-xs tracking-widest"
          style={{ color: hovered ? p.color : '#666' }}
        >
          {p.id} / {p.year}
        </span>
      </div>

      <h3
        className="font-display text-2xl font-bold mb-3 transition-colors duration-300"
        style={{
          fontVariationSettings: '"opsz" 72',
          color: hovered ? p.color : '#f0ede8',
        }}
      >
        {p.title}
      </h3>

      <p className="text-sm text-[#888] leading-relaxed mb-4">{p.desc}</p>

      <div className="flex gap-2 flex-wrap">
        {p.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2 py-1 border border-[#333] text-[#666]"
            style={{
              color: hovered ? p.color2 : '#666',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className="absolute bottom-0 left-0 h-px transition-all duration-500"
        style={{
          background: p.color,
          width: hovered ? '100%' : '0%',
        }}
      />
    </a>
  )
}

function App() {
  const cursor = useCursor();
  const time = useTime();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<menus>("home");

  const menuList: menus[] = [
    "home",
    "projects",
    "experiences",
    "about",
    "skills",
    "contact",
    ];

  const strTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div className="min-h-screen bg-[#080808] text-[#f0ede8] relative">
      {/* cursor */}
      <div
        className="fixed w-4 h-4 rounded-full border border-[#c8ff57] pointer-events-none z-50 transition-transform duration-100"
        style={{
          left: cursor.x - 8,
          top: cursor.y - 8,
          mixBlendMode: "difference",
        }}
      />
      <div
        className="fixed w-1 h-1 rounded-full bg-[#c8ff57] pointer-events-none z-50"
        style={{ left: cursor.x - 2, top: cursor.y - 2 }}
      />

      {/* navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[#1a1a1a] bg-[#080808]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a
            href="#home"
            className="font-mono text-xs text-[#c8ff57] tracking-widest uppercase"
          >
            RAYANE
          </a>

          <div className="hidden md:flex items-center gap-8">
            {menuList.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="font-mono text-xs tracking-widest uppercase text-[#666] hover:text-[#f0ede8] transition-colors"
              >
                {s}
              </a>
            ))}
          </div>

          {/* timer */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c8ff57] animate-pulse" />
            <span className="font-mono text-xs text-[#666]">{strTime}</span>
          </div>

          <button
            className="md:hidden font-mono text-xs text-[#888]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "[x]" : "[=]"}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-[#1a1a1a] bg-[#080808] px-6 py-4 flex flex-col gap-4">
            {menuList.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="font-mono text-xs tracking-widest uppercase text-[#888]"
                onClick={() => setMenuOpen(false)}
              >
                {s}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="pt-14 min-h-screen flex flex-col justify-between relative overflow-hidden">
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#f0ede8 1px, transparent 1px), linear-gradient(90deg, #f0ede8 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 pt-12 pb-8 max-w-6xl mx-auto w-full">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-2 h-2 bg-[#c8ff57] rounded-full animate-pulse" />
            <span className="font-mono text-xs text-[#666] tracking-widest">
              STUDENT - SE - CLASS OF '26
            </span>
          </div>

          <h1 className="font-display font-black leading-none mb-6" style={{ fontVariationSettings: '"opsz" 144' }}>
            <div className="text-[clamp(56px,10vw,130px)] text-[#f0ede8]">
              <GlitchText text="Rayane" />
            </div>
            <div
              className="text-[clamp(56px,10vw,130px)]"
              style={{ WebkitTextStroke: '2px #c8ff57', color: 'transparent' }}
            >
              SIRRI
            </div>
          </h1>

          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-end">
            <p className="text-lg text-[#666] leading-relaxed max-w-md">
              A Software Engineering student. Focused on building simple, efficient, and reliable applications. I am always learning and aiming to write clean, maintainable code.
            </p>
            <div className="flex flex-col md:items-end gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-3 bg-[#c8ff57] text-[#080808] font-mono text-xs font-bold tracking-widest uppercase px-6 py-3 hover:bg-[#f0ede8] transition-colors self-start md:self-end"
              >
                VIEW WORK
                <span>→</span>
              </a>
              <span className="font-mono text-xs text-[#444]">
                Based in El Jadida, Morocco ·{' '}
                <span className="text-[#c8ff57]">UTC+1</span>
              </span>
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div className="border-t border-[#1a1a1a] py-3 overflow-hidden">
          <div className="flex whitespace-nowrap marquee-track">
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} className="font-mono text-xs text-[#333] tracking-widest uppercase mx-8">
                {item}
                <span className="mx-8 text-[#c8ff57]">◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12 border-b border-[#1a1a1a] pb-6">
          <div>
            <p className="font-mono text-xs text-[#c8ff57] tracking-widest uppercase mb-2">02 / Projects</p>
            <h2 className="font-display font-black text-4xl md:text-6xl" style={{ fontVariationSettings: '"opsz" 72' }}>
              Selected
              <br />
              <span style={{ WebkitTextStroke: '1px #666', color: 'transparent' }}>Projects</span>
            </h2>
          </div>
          <span className="font-mono text-xs text-[#444] hidden md:block">{PROJECTS.length} projects</span>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-[#1a1a1a]">
          {PROJECTS.map((p, i) => (
            <div key={p.id} className="bg-[#080808]">
              <ProjectCard p={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experiences" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12 border-b border-[#1a1a1a] pb-6">
          <div>
            <p className="font-mono text-xs text-[#c8ff57] tracking-widest uppercase mb-2">03 / Experiences</p>
            <h2 className="font-display font-black text-4xl md:text-6xl" style={{ fontVariationSettings: '"opsz" 72' }}>
              Selected
              <br />
              <span style={{ WebkitTextStroke: '1px #666', color: 'transparent' }}>Experiences</span>
            </h2>
          </div>
          <span className="font-mono text-xs text-[#444] hidden md:block">{EXPERIENCES.length} experiences</span>
        </div>

        <div className="grid md:grid-cols-1 gap-px bg-[#1a1a1a]">
          {EXPERIENCES.map((p, i) => (
            <div key={p.id} className="bg-[#080808]">
              <ExperienceCard p={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-5 gap-12 md:gap-24">
            <div className="md:col-span-2">
              <p className="font-mono text-xs text-[#c8ff57] tracking-widest uppercase mb-2">04 / ABOUT</p>
              <h2
                className="font-display font-black text-4xl md:text-5xl mb-8 leading-tight"
                style={{ fontVariationSettings: '"opsz" 72' }}
              >
                Who's
                <br />
                behind
                <br />
                the{' '}
                <span className="italic text-[#c8ff57]">code?</span>
              </h2>

              <div className="relative w-48 h-64 float-anim">
                <div className="absolute inset-0 border border-[#c8ff57] translate-x-2 translate-y-2" />
                <img
                  src={pfp}
                  alt="Alex Reyes — portrait"
                  className="relative w-full h-full object-cover grayscale contrast-125"
                />
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col justify-center">
              <p className="text-lg text-[#aaa] leading-relaxed mb-6">
                I am Rayane. A Software Engineering student. Focused on building simple, efficient, and reliable applications. I am always learning and aiming to write clean, maintainable code.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Projects shipped', value: '3+' },
                  { label: 'Open source PRs', value: '19' }
                ].map((stat) => (
                  <div key={stat.label} className="border-t border-[#1a1a1a] pt-4">
                    <div className="font-display font-black text-3xl text-[#c8ff57]" style={{ fontVariationSettings: '"opsz" 36' }}>
                      {stat.value}
                    </div>
                    <div className="font-mono text-xs text-[#666] uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="font-mono text-xs text-[#c8ff57] tracking-widest uppercase mb-2">05 / SKILLS</p>
          <h2
            className="font-display font-black text-4xl md:text-6xl mb-12"
            style={{ fontVariationSettings: '"opsz" 72' }}
          >
            What I{' '}
            <span style={{ WebkitTextStroke: '1px #666', color: 'transparent' }}>know</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            <div className="flex flex-col gap-6">
              {SKILLS.map((s) => (
                <SkillBar key={s.label} {...s} />
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-mono text-xs text-[#666] uppercase tracking-widest mb-2">Also comfortable with</p>
              {[
                'PostgreSQL',
                'Docker & CI/CD',
                'Figma',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[#888] group cursor-default">
                  <span className="text-[#333] group-hover:text-[#c8ff57] transition-colors font-mono">▸</span>
                  <span className="group-hover:text-[#f0ede8] transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div>
              <p className="font-mono text-xs text-[#c8ff57] tracking-widest uppercase mb-2">06 / CONTACT</p>
              <h2
                className="font-display font-black text-4xl md:text-6xl leading-tight mb-8"
                style={{ fontVariationSettings: '"opsz" 72' }}
              >
                Let's{' '}
                <span className="italic text-[#57e5ff]">build</span>
                <br />
                something.
              </h2>
              <p className="text-[#666] leading-relaxed mb-8 max-w-sm">
                I'm looking for internships, collab projects, and interesting problems. If you have one, let's talk.
              </p>

              <a
                href="mailto:sirri.rayane.ma@gmail.com"
                className="group inline-flex items-center gap-4 border border-[#333] px-6 py-4 hover:border-[#c8ff57] transition-colors"
              >
                <div>
                  <div className="font-mono text-xs text-[#666] uppercase tracking-wider mb-1">Email</div>
                  <div className="text-sm text-[#f0ede8] group-hover:text-[#c8ff57] transition-colors">
                    sirri.rayane.ma@gmail.com
                  </div>
                </div>
                <span className="ml-auto text-[#333] group-hover:text-[#c8ff57] transition-colors">→</span>
              </a>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { platform: 'GitHub', handle: '@real-nox', url: 'https://github.com/real-nox', color: '#f0ede8', target: "_parent" },
                { platform: 'LinkedIn', handle: 'Rayane SIRRI', url: 'https://www.linkedin.com/in/rayane-sirri-925b25371/', color: '#57e5ff', target: "_parent" },
                { platform: 'Resume', handle: 'Download PDF', url: resume, color: '#c8ff57', target: '_blank' },
              ].map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  className="group flex items-center justify-between border border-[#1a1a1a] px-5 py-4 hover:border-[#333] transition-colors"
                  target={link.target}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#444] w-20 uppercase tracking-widest">
                      {link.platform}
                    </span>
                    <span
                      className="text-sm transition-colors"
                      style={{ color: '#666' }}
                    >
                      {link.handle}
                    </span>
                  </div>
                  <span
                    className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: link.color }}
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] py-6 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-[#333]">
            © 2026 Rayane SIRRI — Built with obsession
          </span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c8ff57] animate-pulse" />
            <span className="font-mono text-xs text-[#666]">
              {strTime} UTC+1
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App;
