import { StrictMode, lazy, Suspense, useState, useEffect, useRef, Component, type ReactNode, type ComponentType } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.tsx'
import GlobalNav from './GlobalNav.tsx'
import { articleRegistry } from './articles/registry'

const FloatingChat = lazy(() => import('./FloatingChat'))
const MusicToggle = lazy(() => import('./MusicToggle'))
const OpsDashboard = lazy(() => import('./ops/OpsDashboard'))
const PrivacyPolicy = lazy(() => import('./PrivacyPolicy'))
const AboutPage = lazy(() => import('./AboutPage'))

// Lazy-load article components from registry
const articleComponents: Record<string, React.LazyExoticComponent<ComponentType<{ lang: 'es' | 'en' }>>> = {}
for (const article of articleRegistry) {
  articleComponents[article.id] = lazy(article.component)
}

class ChatErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? null : this.props.children }
}

/** Reset scroll + fade-in on route change (no animation on initial load to match prerender) */
function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { pathname } = location
  const initialPathname = useRef(pathname)
  const [hasNavigated, setHasNavigated] = useState(false)

  useEffect(() => {
    if (pathname !== initialPathname.current) {
      setHasNavigated(true)
    }

    if (location.hash) {
      // Hash scroll: multi-pass to handle async rendering + highlight on final pass
      const hash = location.hash
      const scroll = () => {
        const el = document.querySelector(hash)
        el?.scrollIntoView({ behavior: 'instant' })
        return el
      }
      const t1 = setTimeout(scroll, 50)
      const t2 = setTimeout(scroll, 300)
      const t3 = setTimeout(() => {
        const el = scroll()
        if (el instanceof HTMLElement) {
          el.classList.add('hash-highlight')
          el.addEventListener('animationend', () => el.classList.remove('hash-highlight'), { once: true })
        }
      }, 800)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, location.hash, location.key])

  return (
    <div key={pathname} style={hasNavigated ? { animation: 'page-fade-in 0.25s ease-out' } : undefined}>
      {children}
    </div>
  )
}

function GlobalChat() {
  const { pathname } = useLocation()
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  if (!hydrated || pathname.startsWith('/ops')) return null

  const lang = 'en'

  return (
    <ChatErrorBoundary>
      <Suspense fallback={null}>
        <FloatingChat lang={lang} />
      </Suspense>
    </ChatErrorBoundary>
  )
}

function GlobalMusic() {
  const { pathname } = useLocation()
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  if (!hydrated || pathname.startsWith('/ops')) return null
  return (
    <Suspense fallback={null}>
      <MusicToggle />
    </Suspense>
  )
}

function ConditionalNav() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/ops')) return null
  return <GlobalNav />
}

// Console easter egg
console.log('%c PRAKHAR MISHRA | AI TRANSFORMATION & SYSTEMS ', 'background: #0ea5e9; color: #ffffff; font-size: 14px; font-weight: bold; padding: 4px 8px; border-radius: 3px;')
console.log('%cEnterprise AI Transformation · Chief of Staff · Anthropic Claude Architect', 'color: #94a3b8; font-size: 13px;')
console.log('%c Let\'s build exponential systems together → prakharmishra2015@gmail.com ', 'background: #0ea5e9; color: #ffffff; font-size: 13px; font-weight: bold; padding: 4px 8px; border-radius: 3px;')

// Debug API for technical recruiters — type window.__prakhar in console
Object.defineProperty(window, '__prakhar', {
  value: Object.freeze({
    stack: 'React 19 + TypeScript + Vite + Tailwind v4 + Motion',
    certifications: 'Anthropic Claude Certified Architect (Foundations) · 24-Week AI Catalyst Certification · AWS Solutions Architect · SAFe 5 POPM',
    experience: 'Senior Manager & Chief of Staff at Capgemini India (~20,000 practice)',
    governance: '9 Strategic Transformation Programs · PMO Control Tower · AI FinOps',
    contact: 'prakharmishra2015@gmail.com',
    linkedin: 'https://www.linkedin.com/in/prakhar-mishra-b74b85124-mishra-b74b85124/-mishra-b74b85124/',
    github: 'https://github.com/prakharmishra2026',
  }),
  configurable: false,
})

function NotFound() {
  const { pathname } = useLocation()
  const isEn = pathname.startsWith('/en') || /^\/[a-z]+-[a-z]+-[a-z]+/.test(pathname)

  useEffect(() => {
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement
    if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.appendChild(robots) }
    robots.content = 'noindex, nofollow'
    document.title = '404 — Page not found | Prakhar Mishra'
    return () => { robots.content = 'index, follow' }
  }, [])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-8xl font-display font-bold text-primary mb-4">404</p>
      <h1 className="text-2xl font-display font-semibold text-foreground mb-2">
        {isEn ? 'Page not found' : 'Página no encontrada'}
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        {isEn
          ? "The page you're looking for doesn't exist or has been moved."
          : 'La página que buscas no existe o ha sido movida.'}
      </p>
      <Link
        to={isEn ? '/en' : '/'}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
      >
        {isEn ? '← Back to home' : '← Volver al inicio'}
      </Link>
    </div>
  )
}

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <ConditionalNav />
      <PageTransition>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/en" element={<App />} />
            <Route path="/ops" element={<OpsDashboard />} />
            <Route path="/sobre-mi" element={<AboutPage lang="es" />} />
            <Route path="/about" element={<AboutPage lang="en" />} />
            <Route path="/privacidad" element={<PrivacyPolicy lang="es" />} />
            <Route path="/privacy" element={<PrivacyPolicy lang="en" />} />
            {articleRegistry.map((article) => {
              const ArticleComponent = articleComponents[article.id]
              return [
                <Route key={`${article.id}-es`} path={`/${article.slugs.es}`} element={<ArticleComponent lang="es" />} />,
                <Route key={`${article.id}-en`} path={`/${article.slugs.en}`} element={<ArticleComponent lang="en" />} />,
              ]
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageTransition>
      <GlobalChat />
      <GlobalMusic />
      <Analytics />
    </BrowserRouter>
  </StrictMode>
)

// Hydrate if pre-rendered content exists, createRoot for dev mode
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
