import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Mail,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Zap,
  BadgeCheck,
  FolderGit2,
  Sparkles,
  Github,
  Network,
  Share2,
} from 'lucide-react'
import { translations, seo, type Lang } from './i18n'
import { useHomeSeo } from './articles/use-article-seo'

function LinkedInLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
    </svg>
  )
}

function useHydrated() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}

function useInView(threshold = 0.1) {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, threshold])

  return { ref: setRef, isInView }
}

const HEAL_PARTICLES = [
  { char: '+', left: '10%', delay: '0s', dur: '2.8s', size: '24px' },
  { char: '·', left: '30%', delay: '0.6s', dur: '2.2s', size: '20px' },
  { char: '✦', left: '55%', delay: '1.2s', dur: '3s', size: '18px' },
  { char: '0', left: '75%', delay: '0.3s', dur: '2.5s', size: '22px' },
  { char: '+', left: '90%', delay: '1.8s', dur: '2.6s', size: '20px' },
  { char: '1', left: '20%', delay: '2.1s', dur: '2.4s', size: '22px' },
  { char: '·', left: '65%', delay: '0.9s', dur: '3.2s', size: '18px' },
  { char: '✦', left: '45%', delay: '1.5s', dur: '2.7s', size: '20px' },
]

function BeamPill({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated()
  return (
    <span className={`relative inline-block pl-0 pr-0 ${hydrated ? 'beam-pill' : ''}`}>
      <span className="relative z-10">{children}</span>
      {hydrated && HEAL_PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: p.left,
            bottom: '50%',
            fontSize: p.size,
            color: '#4ade80',
            opacity: 0,
            animation: `heal-float ${p.dur} ease-out ${p.delay} infinite`,
          }}
          aria-hidden="true"
        >
          {p.char}
        </span>
      ))}
    </span>
  )
}

const HERO_STYLES_ID = 'hero-beam-styles'
function useHeroStyles() {
  useEffect(() => {
    if (document.getElementById(HERO_STYLES_ID)) return
    const style = document.createElement('style')
    style.id = HERO_STYLES_ID
    style.textContent = `
      @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
      @keyframes heal-float {
        0% { opacity: 0; transform: translateY(0) scale(0.6); }
        12% { opacity: 0.25; }
        40% { opacity: 0.15; }
        100% { opacity: 0; transform: translateY(-65px) scale(0.2); }
      }
    `
    document.head.appendChild(style)
  }, [])
}

function useTypewriterRotation(roles: readonly string[]) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState(roles[0] || '')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentFull = roles[roleIndex] || ''
    const speed = isDeleting ? 30 : 50

    if (!isDeleting && displayText === currentFull) {
      const timeout = setTimeout(() => setIsDeleting(true), 2500)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
      return
    }

    const timer = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting ? prev.slice(0, -1) : currentFull.slice(0, prev.length + 1)
      )
    }, speed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex, roles])

  return { displayText, roleIndex }
}

function AnimatedSection({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, isInView } = useInView(0.1)
  const hydrated = useHydrated()

  return (
    <motion.div
      ref={ref as any}
      initial={hydrated ? { opacity: 0, y: 20 } : false}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StorySection({ t }: { t: (typeof translations)[Lang] }) {
  return (
    <section className="py-12 border-y border-border/40 bg-card/20">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="font-display text-xl font-bold">{t.story.context}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
              {t.story.why}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.story.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

function App() {
  const lang: Lang = 'en'
  const t = translations[lang]
  const hydrated = useHydrated()
  useHeroStyles()
  const { displayText: roleText, roleIndex } = useTypewriterRotation(t.greetingRoles)

  const seoData = seo[lang]
  useHomeSeo({ lang, title: seoData.title, description: seoData.description })

  return (
    <main className="min-h-screen bg-background bg-[length:24px_24px] [background-image:radial-gradient(circle,hsl(var(--dot-grid))_1px,transparent_1px)]">
      {/* Header / Hero */}
      <header className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-12 md:pt-32 md:pb-16">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Photo */}
            <motion.div
              initial={hydrated ? { opacity: 0, scale: 0.8 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative w-40 h-40 md:w-48 md:h-48">
                <div className="absolute inset-0 rounded-full bg-gradient-theme-30 blur-xl" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-white/5 md:backdrop-blur-sm border border-white/20 shadow-2xl" />
                <div className="absolute inset-2 rounded-full bg-gradient-theme-50 p-[2px]">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src="/foto-avatar.jpg"
                      alt="Prakhar Mishra"
                      className="w-full h-full object-cover"
                      width={192}
                      height={192}
                      fetchPriority="high"
                    />
                  </div>
                </div>
              </div>
              <motion.div
                initial={hydrated ? { scale: 0 } : false}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-gradient-theme flex items-center justify-center shadow-lg border-2 border-background"
              >
                <BadgeCheck className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={hydrated ? { opacity: 0, x: -20 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center md:text-left"
            >
              <p className="text-lg text-muted-foreground mb-2">
                {"Hi, I'm"}{' '}
                <span className="text-gradient-theme font-bold">Prakhar Mishra</span>
              </p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
                <span className="text-gradient-theme">{hydrated ? roleText : t.greetingRoles[0]}</span>
                {hydrated && <span className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 rounded-sm translate-y-[2px]" style={{ animation: 'blink 1s step-end infinite' }} />}
                <br />
                {t.greeting}
                <br />
                {'with '}<BeamPill>Claude Architect <span className="opacity-60">+</span> FinOps <span className="opacity-60">+</span> Control Towers</BeamPill>
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {t.pillLabels.map((label, i) => (
                  <span
                    key={label}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                      hydrated && i === roleIndex
                        ? 'border border-[#20d6ee] bg-[#20d6ee]/15 text-foreground scale-105'
                        : 'border border-[#20d6ee]/30 bg-background/80 text-muted-foreground'
                    }`}
                  >
                    {label}
                  </span>
                ))}
                <a
                  href="https://github.com/prakharmishra2026/RoutingMagic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-[#20d6ee]/30 bg-background/80 text-muted-foreground hover:text-foreground transition-all duration-300"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>RoutingMagic</span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">OSS</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Metrics Banner */}
      <section className="py-8 bg-muted/40 border-b border-border/40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-card border border-border/50">
              <p className="font-display text-3xl font-bold text-gradient-theme">2,500+</p>
              <p className="text-xs text-muted-foreground mt-1">Senior Leaders Enablement Mandate</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/50">
              <p className="font-display text-3xl font-bold text-gradient-theme">4</p>
              <p className="text-xs text-muted-foreground mt-1">Promotions in 6 Years</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/50">
              <p className="font-display text-3xl font-bold text-gradient-theme">$1.5M–$3M+</p>
              <p className="text-xs text-muted-foreground mt-1">Bench Holding Costs De-risked</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/50">
              <p className="font-display text-3xl font-bold text-gradient-theme">74%</p>
              <p className="text-xs text-muted-foreground mt-1">AI Token Burn Reduction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <StorySection t={t} />

      {/* Experience */}
      <section id="experience" className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              {t.experience.title}
            </h2>
          </AnimatedSection>

          {/* Competencies */}
          <AnimatedSection delay={0.1}>
            <div className="mb-12 p-6 rounded-2xl bg-card/50">
              <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-6">
                {t.summary.p1} <span className="text-foreground font-medium">{t.summary.p1Highlight}</span>{t.summary.p1End}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
                {t.coreCompetencies.items.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 sm:p-4 rounded-xl bg-background/50 border border-border hover:border-accent/30 transition-colors group"
                  >
                    <div className="flex items-center sm:items-start gap-2 sm:mb-1 sm:min-h-[2.5rem]">
                      <Zap className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-sm font-semibold group-hover:text-accent transition-colors leading-tight">{item.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6 hidden sm:block">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Capgemini C&CA */}
          <AnimatedSection delay={0.1}>
            <div className="mb-16 p-8 rounded-2xl bg-card border border-primary/20">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-display text-2xl font-bold">{t.experience.capgemini.company}</h3>
                  <p className="text-primary font-medium">{t.experience.capgemini.role}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground block">{t.experience.capgemini.location}</span>
                  <span className="text-xs text-primary font-mono">{t.experience.capgemini.period}</span>
                </div>
              </div>
              <p className="text-muted-foreground mt-2 mb-6">{t.experience.capgemini.desc}</p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                {t.experience.capgemini.highlights.map((h, hi) => (
                  <li key={hi} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* DEX Business Analyst & Earlier Roles */}
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedSection delay={0.2}>
              <div className="p-6 rounded-2xl bg-card border border-border h-full flex flex-col">
                <span className="text-xs text-primary font-mono">{t.experience.dex.period}</span>
                <h4 className="font-display text-xl font-bold mt-1">{t.experience.dex.role}</h4>
                <p className="text-xs text-muted-foreground mb-3">{t.experience.dex.company} · {t.experience.dex.location}</p>
                <p className="text-sm text-muted-foreground mb-4">{t.experience.dex.desc}</p>
                <ul className="text-xs text-muted-foreground space-y-1.5 mt-auto">
                  {t.experience.dex.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="p-6 rounded-2xl bg-card border border-border h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs text-primary font-mono">{t.experience.reelSwipe.period}</span>
                  <h4 className="font-display text-xl font-bold mt-1">{t.experience.reelSwipe.role}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{t.experience.reelSwipe.company} · {t.experience.reelSwipe.location}</p>
                  <p className="text-sm text-muted-foreground mb-6">{t.experience.reelSwipe.desc}</p>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <span className="text-xs text-primary font-mono">{t.experience.etap.period}</span>
                  <h4 className="font-display text-lg font-bold mt-1">{t.experience.etap.role}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{t.experience.etap.company} · {t.experience.etap.location}</p>
                  <p className="text-sm text-muted-foreground">{t.experience.etap.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-display text-2xl font-semibold flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FolderGit2 className="w-5 h-5 text-primary" />
                </div>
                {t.projects.title}
              </h2>
              <a
                href={`https://${t.projects.githubLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                {t.projects.githubLink}
              </a>
            </div>
          </AnimatedSection>

          {/* Agent Infrastructure */}
          <AnimatedSection delay={0.03} className="mb-12">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-gold/15 via-gold/5 to-transparent border border-gold/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center shrink-0">
                  <Network className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">{t.projects.agentInfra.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground mt-1">{t.projects.agentInfra.subtitle}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {t.projects.agentInfra.agents.map((agent) => (
                  <div key={agent.name} className="p-3.5 rounded-xl bg-background/50 border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{agent.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{agent.tag}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{agent.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {t.projects.items.map((project, i) => (
              <AnimatedSection key={project.title} delay={0.1 + i * 0.05}>
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors h-full flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-display text-xl font-bold">{project.title}</h4>
                    <span className="badge px-2 py-0.5 bg-primary/10 text-primary text-xs shrink-0">{project.badge}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">{tech}</span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={(project as any).linkUrl ?? `https://${project.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline mt-auto"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {project.link}
                    </a>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Claude Code Power User Card */}
          <AnimatedSection delay={0.3}>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display font-bold">{t.claudeCode.title}</h3>
                    <span className="badge px-2 py-0.5 bg-accent/10 text-accent">{t.claudeCode.badge}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.claudeCode.desc}</p>
                  <ul className="mt-3 space-y-1.5">
                    {t.claudeCode.highlights.map((h: string, i: number) => (
                      <li key={i} className="text-xs text-muted-foreground flex gap-2">
                        <span className="text-accent mt-0.5 shrink-0">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Speaking & Thought Leadership */}
      <section id="speaking" className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Share2 className="w-5 h-5 text-primary" />
              </div>
              {t.speaking.title}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {t.speaking.items.map((item, i) => (
              <AnimatedSection key={i} delay={0.1 + i * 0.1}>
                <div className="p-6 rounded-2xl bg-card border border-border h-full flex flex-col">
                  <span className="text-xs text-primary font-mono">{item.event}</span>
                  <h3 className="font-display text-lg font-bold mt-1 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section id="education" className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <AnimatedSection>
                <h2 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  {t.education.title}
                </h2>
              </AnimatedSection>
              <div className="space-y-4">
                {t.education.items.map((item, i) => (
                  <AnimatedSection key={i} delay={0.1 + i * 0.1}>
                    <div className="p-5 rounded-2xl bg-card border border-border">
                      <span className="text-xs text-primary font-mono">{item.period}</span>
                      <h3 className="font-display font-semibold mt-1">{item.degree}</h3>
                      <p className="text-sm text-muted-foreground">{item.institution}</p>
                      <p className="text-xs text-muted-foreground/80 mt-2">{item.highlights}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <AnimatedSection>
                <h2 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-accent" />
                  </div>
                  {t.certifications.title}
                </h2>
              </AnimatedSection>
              <div className="space-y-2.5">
                {t.certifications.items.map((cert, i) => (
                  <AnimatedSection key={i} delay={0.1 + i * 0.05}>
                    {'credlyUrl' in cert && cert.credlyUrl ? (
                      <a
                        href={cert.credlyUrl as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all duration-300 flex items-center justify-between gap-3 block"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                              {cert.name}
                            </p>
                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              ✓ Verified on Credly
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-accent flex-shrink-0">{cert.year}</span>
                      </a>
                    ) : (
                      <div className="p-4 rounded-xl bg-card border border-border flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-sm">{cert.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                        </div>
                        <span className="text-xs font-mono text-accent flex-shrink-0">{cert.year}</span>
                      </div>
                    )}
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code className="w-5 h-5 text-primary" />
              </div>
              {t.techStack.title}
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {t.techStack.categories.map((cat) => (
              <div key={cat.name} className="p-5 rounded-2xl bg-card border border-border">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">{cat.name}</span>
                <div className="flex flex-wrap gap-2 mt-4">
                  {cat.items.map((item) => (
                    <span key={item} className="px-2.5 py-1 rounded-md text-xs bg-muted text-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer id="contact" className="relative py-16 md:py-24 border-t border-border/40">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t.cta.title}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t.cta.subtitle}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${t.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:brightness-110 shadow-lg shadow-primary/25 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                {t.cta.emailBtn}
              </a>
              <a
                href="https://www.linkedin.com/in/prakhar-mishra-b74b85124-mishra-b74b85124/-mishra-b74b85124/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary/50 transition-colors duration-200 hover:bg-primary/5"
              >
                <LinkedInLogo className="w-4 h-4 text-[hsl(var(--linkedin))]" />
                {t.cta.linkedinBtn}
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              <a
                href="https://github.com/prakharmishra2026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary/50 transition-colors duration-200 hover:bg-primary/5"
              >
                <Github className="w-4 h-4" />
                {t.cta.githubBtn}
              </a>
            </div>
          </AnimatedSection>
          <p className="mt-12 text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Prakhar Mishra
            <span className="mx-2 text-border">|</span>
            Chief of Staff & AI Transformation Lead
            <span className="mx-2 text-border">|</span>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </main>
  )
}

export default App
